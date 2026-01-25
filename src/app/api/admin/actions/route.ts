import { NextRequest, NextResponse } from "next/server";
import { createFirebaseAdminApp } from "@/core/services/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

// Force Dynamic because we use Request body & Headers
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        // 1. AUTHENTICATION CHAIN (Strict)
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, error: "Unauthorized: Missing Token" }, { status: 401 });
        }

        const idToken = authHeader.split("Bearer ")[1];
        const adminApp = createFirebaseAdminApp();
        const auth = adminApp.auth();
        const db = adminApp.firestore();
        const rtdb = adminApp.database();

        // Verify Token & Check Role
        const decodedToken = await auth.verifyIdToken(idToken);
        const role = decodedToken.role;

        if (role !== 'ADMIN') {
            console.error(`[API] Access Denied. User ${decodedToken.uid} role is ${role}`);
            return NextResponse.json({ success: false, error: "Forbidden: insufficient permissions" }, { status: 403 });
        }

        const body = await req.json();
        const { action, uid } = body;

        console.log(`[API] Admin Action: ${action} | Target: ${uid} | Admin: ${decodedToken.email}`);

        if (!uid || !action) {
            return NextResponse.json({ success: false, error: "Missing Parameters" }, { status: 400 });
        }

        // --- ACTION: DELETE STUDENT ---
        if (action === "DELETE_STUDENT") {
            const userRef = db.collection('users').doc(uid);

            // 1. Recursive Delete (Firestore)
            await db.recursiveDelete(userRef);

            // 2. Clear Realtime Status
            await rtdb.ref(`status/${uid}`).set(null);

            // 3. Clear Auth (Optional - per prompt, we preserve Auth for re-registration)
            // If explicit hard delete of account is needed: await auth.deleteUser(uid);

            return NextResponse.json({ success: true });
        }

        // --- ACTION: RESET STUDENT ---
        else if (action === "RESET_STUDENT") {
            // 1. Delete Study Data Collections (Recursive)
            const subcols = ['subjects', 'sessions', 'metrics', 'history', 'dailyLoad'];
            // Execute in parallel
            await Promise.all(subcols.map(async (colName) => {
                const ref = db.collection(`users/${uid}/${colName}`);
                const snap = await ref.limit(1).get();
                if (!snap.empty) {
                    await db.recursiveDelete(ref as any);
                }
            }));

            // 2. Reset Profile Document (Preserving Identity)
            const profileRef = db.collection(`users/${uid}/profile`);
            const profileSnap = await profileRef.get();
            if (!profileSnap.empty) {
                const batch = db.batch();
                profileSnap.docs.forEach(doc => {
                    batch.update(doc.ref, {
                        totalSessions: 0,
                        learningPhase: 'INIT',
                        currentCapacity: 100,
                        consistencyIndex: 100,
                        lastSessionDate: null,
                        metrics: FieldValue.delete() // Remove old metrics map if exists
                    });
                });
                await batch.commit();
            }

            // 3. Wipe RTDB Status (Force Offline)
            await rtdb.ref(`status/${uid}`).update({
                activeSession: null,
                state: 'offline',
                lastSeenAt: FieldValue.serverTimestamp() // Sync timestamp
            });

            return NextResponse.json({ success: true });
        }

        // --- ACTION: FORCE END SESSION ---
        else if (action === "FORCE_END_SESSION") {
            // 1. READ RTDB (The Authority)
            const sessionRef = rtdb.ref(`status/${uid}/activeSession`);
            const sessionSnap = await sessionRef.get();
            const activeSession = sessionSnap.val();

            let targetSessionId = activeSession?.sessionId;

            // IDEMPOTENCY: If RTDB is empty, check if we have a provided sessionId in payload? 
            // Or just assume job is done. But we want to be sure Firestore is clean too.

            if (activeSession) {
                console.log(`[API] Terminating Active Session: ${activeSession.sessionId}`);

                // 2. CALCULATE DURATION (Best Effort)
                const startTime = activeSession.startedAt;
                const endTime = Date.now();
                const durationMinutes = Math.max(0, Math.floor((endTime - startTime) / 60000));

                // 3. PROVISIONAL LOGGING (Firestore)
                // Use SET with Merge for Idempotency (Update throws if missing)
                const sessionDocRef = db.collection(`users/${uid}/sessions`).doc(activeSession.sessionId as string);

                await sessionDocRef.set({
                    id: activeSession.sessionId,
                    subjectId: activeSession.subjectId,
                    lectureId: activeSession.lectureId,
                    startTime: new Date(startTime).toISOString(),
                    endTime: new Date(endTime).toISOString(),
                    duration: durationMinutes,
                    status: 'INTERRUPTED_BY_ADMIN',
                    createdAt: new Date().toISOString()
                }, { merge: true });

                // 4. ARCHIVE IN FIRESTORE (New Authority)
                // Use SET with Merge: "Make it forced end, creating if necessary"
                await db.collection('activeSessions').doc(activeSession.sessionId).set({
                    uid: uid, // Ensure UID is present for audit
                    status: 'FORCED_END',
                    endedBy: 'ADMIN',
                    endedAt: FieldValue.serverTimestamp()
                }, { merge: true });

            } else {
                console.warn(`[API] Force End requested but no active session found in RTDB. Ensuring System is Clean.`);
                // Check if there are ANY running sessions in Firestore for this user? 
                // For now, if RTDB is clean, we assume the user is "Offline/Idle".
                // We still emit the Kill Signal just in case the Client is caching something.
            }

            // 5. RESET COGNITIVE LOADS (Mercy Rule)
            const dailyLoadRef = db.collection(`users/${uid}/dailyLoad`);
            await db.recursiveDelete(dailyLoadRef);

            const profileRef = db.collection(`users/${uid}/profile`).doc('main');
            await profileRef.set({
                currentCapacity: 100,
                status: 'Safe'
            }, { merge: true }); // Merge prevents overwrite of name/email

            // 6. AUTHORITATIVE TERMINATION SIGNAL (The Notification)
            // Always send this, even if we didn't find a session. Clears client UI.
            await rtdb.ref(`status/${uid}/sessionTermination`).set({
                reason: 'ADMIN_FORCE_CLOSE',
                message: 'Session Force Ended by Administrator',
                endedAt: FieldValue.serverTimestamp(),
                severity: 'warning'
            });

            // 7. CLEAR RTDB ACTIVE SESSION (The Kill)
            await rtdb.ref(`status/${uid}`).update({
                activeSession: null
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: "Invalid Action" }, { status: 400 });

    } catch (error: any) {
        console.error("[API] Admin Action Failed:", error);

        // Specific Error Mapping
        if (error.code === 'auth/argument-error') {
            return NextResponse.json({ success: false, error: "Invalid Auth Token Configuration" }, { status: 401 });
        }
        if (error.message && error.message.includes("Server Misconfiguration")) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
