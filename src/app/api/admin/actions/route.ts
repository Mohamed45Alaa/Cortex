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

        // --- ACTION: DELETE_STUDENT (NUCLEAR OPTION) ---
        if (action === "DELETE_STUDENT") {
            console.warn(`[API] 🚨 NUCLEAR DELETE INITIATED FOR: ${uid}`);

            // 1. Delete Auth User (Prevents login immediately)
            try {
                await auth.deleteUser(uid);
            } catch (e: any) {
                console.warn(`[API] Auth user deletion failed (possibly already deleted): ${e.message}`);
            }

            // 2. Kill any Active Session first
            const statusRef = rtdb.ref(`status/${uid}`);
            const statusSnap = await statusRef.get();
            const activeSession = statusSnap.val()?.activeSession;

            if (activeSession) {
                await db.collection('activeSessions').doc(activeSession.sessionId).set({
                    status: 'FORCED_END',
                    endedBy: 'ADMIN_DELETE',
                    isValidForMetrics: false,
                    cognitiveLoad: 0,
                    endedAt: FieldValue.serverTimestamp()
                }, { merge: true });
            }

            // 3. Wipe RTDB
            await statusRef.remove();

            // 4. Recursive Delete Firestore
            // Localhost safe: Batch delete known collections.
            const collections = ['profile', 'sessions', 'activity', 'presence', 'study', 'subjects', 'stateSnapshot', 'cognitiveIndex', 'metrics', 'history', 'dailyLoad'];

            for (const col of collections) {
                const snap = await db.collection('users').doc(uid).collection(col).get();
                if (!snap.empty) {
                    const batch = db.batch();
                    snap.docs.forEach(doc => batch.delete(doc.ref));
                    await batch.commit();
                }
            }

            // Delete the User Root Doc
            await db.collection('users').doc(uid).delete();

            return NextResponse.json({ success: true });
        }

        // --- ACTION: RESET STUDENT ---
        else if (action === "RESET_STUDENT") {
            // 1. Delete Study Data Collections (Recursive)
            const subcols = ['subjects', 'sessions', 'metrics', 'history', 'dailyLoad', 'study', 'activity', 'stateSnapshot', 'cognitiveIndex'];

            for (const colName of subcols) {
                const ref = db.collection(`users/${uid}/${colName}`);
                const snap = await ref.get();
                if (!snap.empty) {
                    const batch = db.batch();
                    snap.docs.forEach(d => batch.delete(d.ref));
                    await batch.commit();
                }
            }

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
                        lastSessionDate: null
                    });
                });
                await batch.commit();
            }

            // 3. Wipe RTDB Status (Force Offline)
            await rtdb.ref(`status/${uid}`).update({
                activeSession: null,
                state: 'offline', // Force offline
                lastSeenAt: Date.now()
            });

            return NextResponse.json({ success: true });
        }

        // --- ACTION: FORCE_END_SESSION ---
        else if (action === "FORCE_END_SESSION") {
            // 1. READ RTDB (The Authority)
            const sessionRef = rtdb.ref(`status/${uid}/activeSession`);
            const sessionSnap = await sessionRef.get();
            const activeSession = sessionSnap.val();

            if (activeSession) {
                console.log(`[API] Terminating Active Session: ${activeSession.sessionId}`);

                // 2. ARCHIVE IN FIRESTORE (New Authority)
                // Use SET with Merge: "Make it forced end, creating if necessary"
                await db.collection('activeSessions').doc(activeSession.sessionId).set({
                    uid: uid,
                    status: 'FORCED_END',
                    endedBy: 'ADMIN',
                    isValidForMetrics: false, // PROTECTION
                    cognitiveLoad: 0,
                    endedAt: FieldValue.serverTimestamp()
                }, { merge: true });

            } else {
                console.warn(`[API] Force End requested but no active session found in RTDB. Ensuring System is Clean.`);
            }

            // 3. RESET COGNITIVE LOADS (Mercy Rule) - OPTIONAL
            // If we want to really ensure no load for today:
            // const dailyLoadRef = db.collection(`users/${uid}/dailyLoad`);
            // await db.recursiveDelete(dailyLoadRef);

            // 4. AUTHORITATIVE TERMINATION SIGNAL (The Notification)
            await rtdb.ref(`status/${uid}/sessionTermination`).set({
                reason: 'ADMIN_FORCE_CLOSE',
                message: 'Session Force Ended by Administrator',
                endedAt: Date.now(),
                severity: 'warning'
            });

            // 5. CLEAR RTDB ACTIVE SESSION (The Kill)
            // Do NOT touch Presence State (User might still be browsing)
            await rtdb.ref(`status/${uid}`).update({
                activeSession: null
            });

            return NextResponse.json({ success: true });
        }

        // --- ACTION: REPAIR_DATA (EMERGENCY SANITIZATION) ---
        else if (action === "REPAIR_DATA") {
            console.log(`[API] 🚨 STARTING DATA REPAIR FOR: ${uid}`);

            // PHASE 1: RTDB HARD CLEANUP
            // "DELETE the following paths completely"
            await rtdb.ref(`status/${uid}/sessionTermination`).remove();
            await rtdb.ref(`status/${uid}/forcedEnd`).remove();
            await rtdb.ref(`status/${uid}/killReason`).remove();
            await rtdb.ref(`status/${uid}/activeSession`).remove();

            // PHASE 2: FIRESTORE SESSION SANITIZATION
            // Query: activeSessions where uid == USER and status IN ["RUNNING", "FORCED_END", "ACTIVE"]
            const sessionsRef = db.collection('activeSessions');
            const stuckSessionsQuery = sessionsRef
                .where('uid', '==', uid)
                .where('status', 'in', ['RUNNING', 'FORCED_END', 'ACTIVE']);

            const snap = await stuckSessionsQuery.get();

            if (!snap.empty) {
                const batch = db.batch();
                snap.docs.forEach(doc => {
                    batch.update(doc.ref, {
                        status: 'INTERRUPTED',
                        isValidForMetrics: false, // "set isValidForMetrics = false"
                        cognitiveLoad: 0,         // "set cognitiveLoad = 0"
                        endedAt: FieldValue.serverTimestamp() // "set endedAt = now"
                    });
                });
                await batch.commit();
                console.log(`[API] Repaired ${snap.size} firestore sessions.`);
            }

            console.log(`[API] Repair Complete for ${uid}`);
            return NextResponse.json({ success: true, message: "Data Repaired" });
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
