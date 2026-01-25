import { NextRequest, NextResponse } from "next/server";
import { createFirebaseAdminApp } from "@/core/services/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const dynamic = 'force-dynamic';

// CONFIGURATION
const HEARTBEAT_TTL_MS = 60 * 1000; // 60 Seconds allowed before death

export async function POST(req: NextRequest) {
    try {
        // 1. AUTHENTICATION
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const idToken = authHeader.split("Bearer ")[1];
        const adminApp = createFirebaseAdminApp();
        const auth = adminApp.auth();
        const rtdb = adminApp.database();
        const db = adminApp.firestore();

        // Verify Token
        const decodedToken = await auth.verifyIdToken(idToken);
        const uid = decodedToken.uid;

        const body = await req.json();
        const { action, payload } = body;

        console.log(`[API/Session] User: ${uid} | Action: ${action}`);

        // 2. ROUTING LOGIC

        // --- ACTION: START SESSION ---
        if (action === 'START') {
            const { lectureId, subjectId } = payload;

            // Check for existing session first
            const statusRef = rtdb.ref(`status/${uid}`);
            const statusSnap = await statusRef.get();
            const statusData = statusSnap.val();

            if (statusData?.activeSession) {
                // Determine if it's a zombie or valid
                const lastHeartbeat = statusData.heartbeat || statusData.lastSeenAt || 0;
                const timeDiff = Date.now() - lastHeartbeat;

                if (timeDiff < HEARTBEAT_TTL_MS) {
                    return NextResponse.json({
                        success: false,
                        error: "Active session already exists.",
                        code: "SESSION_BUSY"
                    }, { status: 409 });
                } else {
                    console.warn(`[API] Found Zombie Session for ${uid}. Overwriting.`);
                }
            }

            const activeSession = {
                sessionId: `${uid}_${lectureId}_${Date.now()}`,
                lectureId,
                subjectId,
                startedAt: Date.now(),
                expiresAt: Date.now() + (4 * 60 * 60 * 1000) // 4 Hour Hard Cap
            };

            await statusRef.update({
                state: 'online',
                activeSession,
                heartbeat: Date.now(),
                lastSeenAt: Date.now(),
                sessionTermination: null // Clear any old kill signals
            });

            // Persist to Firestore (Audit Trail)
            await db.collection('activeSessions').doc(activeSession.sessionId).set({
                uid,
                ...activeSession,
                status: 'RUNNING',
                createdAt: FieldValue.serverTimestamp()
            });

            return NextResponse.json({ success: true, session: activeSession });
        }

        // --- ACTION: HEARTBEAT ---
        else if (action === 'HEARTBEAT') {
            const statusRef = rtdb.ref(`status/${uid}`);
            const statusSnap = await statusRef.get();
            const statusData = statusSnap.val();

            if (!statusData || !statusData.activeSession) {
                return NextResponse.json({
                    success: false,
                    error: "No active session found. Terminating.",
                    code: "SESSION_INVALID"
                }, { status: 410 });
            }

            const { sessionId } = statusData.activeSession;
            const lastHeartbeat = statusData.heartbeat || 0;
            const timeSinceLast = Date.now() - lastHeartbeat;

            // 1. STRICT TTL CHECK (RTDB Layer)
            if (timeSinceLast > HEARTBEAT_TTL_MS) {
                console.warn(`[API] Session TTL Refusal for ${sessionId}. Gap: ${timeSinceLast}ms`);

                await statusRef.update({ activeSession: null, state: 'offline' });
                // Attempt to update Firestore (if it exists)
                await db.collection('activeSessions').doc(sessionId).set({
                    status: 'FORCED_END',
                    reason: 'TTL_EXPIRED',
                    endedAt: FieldValue.serverTimestamp()
                }, { merge: true });

                return NextResponse.json({
                    success: false,
                    error: "Session expired due to inactivity.",
                    code: "SESSION_TIMEOUT"
                }, { status: 410 });
            }

            // 2. CANONICAL RECONCILIATION (Firestore Layer)
            // "A session exists ONLY if a server document exists."
            const sessionDocRef = db.collection('activeSessions').doc(sessionId);
            const sessionDoc = await sessionDocRef.get();

            if (!sessionDoc.exists) {
                console.error(`[API] 🚨 GHOST SESSION DETECTED: ${sessionId}. RTDB is alive, but Firestore is empty. KILLING.`);

                // Nuclear Cleanup
                await statusRef.update({ activeSession: null, state: 'offline' });

                // Return 410 to force client reset
                return NextResponse.json({
                    success: false,
                    error: "System Integrity Check Failed. Session Missing on Server.",
                    code: "SESSION_INTEGRITY_FAIL"
                }, { status: 410 });
            }

            // 3. RENEW LEASE (Success)
            // Update RTDB for Client Presence
            await statusRef.update({
                heartbeat: Date.now(),
                lastSeenAt: Date.now()
            });

            // Update Firestore for Audit (Optional: Can throttle this to every 5 mins if expensive)
            await sessionDocRef.update({
                lastHeartbeat: FieldValue.serverTimestamp()
            });

            return NextResponse.json({ success: true });
        }

        // --- ACTION: END SESSION ---
        else if (action === 'END') {
            const statusRef = rtdb.ref(`status/${uid}`);
            const statusSnap = await statusRef.get();
            const activeSession = statusSnap.val()?.activeSession;

            if (activeSession) {
                // Archive in Firestore (Idempotent Set)
                await db.collection('activeSessions').doc(activeSession.sessionId).set({
                    status: 'COMPLETED',
                    endedAt: FieldValue.serverTimestamp()
                }, { merge: true });
            }

            // Wipe RTDB (Always succeed)
            await statusRef.update({
                activeSession: null,
                lastSeenAt: Date.now()
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: "Invalid Action" }, { status: 400 });

    } catch (error: any) {
        console.error("[API/Session] Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
