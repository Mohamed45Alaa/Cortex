import { NextResponse } from 'next/server';
import { createFirebaseAdminApp } from '@/core/services/firebase-admin';
import * as admin from 'firebase-admin';
import { BackupService } from '@/core/services/BackupService';
import { AdminLogger } from '@/core/services/AdminLogger';

export async function POST(req: Request) {
    try {
        const { uid } = await req.json();

        if (!uid) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        const app = createFirebaseAdminApp();
        const db = app.firestore();
        const rtdb = app.database();
        const batch = db.batch();

        console.log(`[API] Starting ENTERPRISE HARD RESET for user: ${uid}`);

        // ─────────────────────────────────────────────────────────────
        // PART 0: SAFETY LAYER (BACKUP)
        // ─────────────────────────────────────────────────────────────
        const snapshotId = await BackupService.createSnapshot(uid);
        if (!snapshotId) {
            return NextResponse.json({ error: 'Backup Failed. Operation Aborted.' }, { status: 500 });
        }

        const undoToken = Buffer.from(JSON.stringify({
            uid,
            snapshotId,
            expiresAt: Date.now() + 5 * 60 * 1000 // 5 mins
        })).toString('base64');


        // ─────────────────────────────────────────────────────────────
        // PART 1: TRUE HARD RESET (DELETION)
        // ─────────────────────────────────────────────────────────────

        // A. Realtime Database Cleanup
        const rtdbPaths = [
            `status/${uid}`,
            `presence/${uid}`,
            `sessions/${uid}`,
            `studyState/${uid}`
        ];

        await Promise.all(rtdbPaths.map(path => rtdb.ref(path).remove()));

        // B. Firestore Deletion (Recursive Wipe)
        const collectionsToWipe = [
            'sessions', 'history', 'metrics', 'dailyLoad',
            'cognitiveIndex', 'stateSnapshot', 'activity',
            'study', 'subjects', 'activeSessions'
        ];

        // We can use a helper or just iterate top-level knowns
        const userRef = db.collection('users').doc(uid);

        for (const colName of collectionsToWipe) {
            if (colName === 'subjects') {
                // Specialized recursive delete for subjects -> lectures -> sessions
                const subjects = await userRef.collection('subjects').get();
                for (const sub of subjects.docs) {
                    const lectures = await sub.ref.collection('lectures').get();
                    for (const lec of lectures.docs) {
                        const sessions = await lec.ref.collection('sessions').get();
                        for (const sess of sessions.docs) {
                            await sess.ref.delete();
                        }
                        await lec.ref.delete();
                    }
                    await sub.ref.delete();
                }
            } else {
                // Flat delete for others
                const snapshot = await userRef.collection(colName).limit(500).get();
                // Simple batch delete
                const deleteBatch = db.batch(); // New batch
                snapshot.forEach(doc => deleteBatch.delete(doc.ref));
                await deleteBatch.commit();
            }
        }


        // ─────────────────────────────────────────────────────────────
        // PART 2: PROFILE REWRITE (STRICT PRESERVATION)
        // ─────────────────────────────────────────────────────────────

        const profileRef = userRef.collection('profile').doc('main');
        const profileSnap = await profileRef.get();
        const currentProfile = profileSnap.exists ? profileSnap.data() : {};

        // Explicit strict allow-list
        const preservedIdentity = {
            fullName: currentProfile?.fullName || null,
            email: currentProfile?.email || null,
            university: currentProfile?.university || null,
            faculty: currentProfile?.faculty || null,
            academicYear: currentProfile?.academicYear || null,
            phone: currentProfile?.phone || null,
            createdAt: currentProfile?.createdAt || admin.firestore.FieldValue.serverTimestamp(),
            role: currentProfile?.role || 'STUDENT'
        };

        const resetProfile = {
            ...preservedIdentity,
            totalSessions: 0,
            cognitiveCost: 0,
            cumulativeIndex: 0,
            collectionEfficiency: 0,
            lastSessionDate: null,
            learningPhase: "INIT",
            currentCapacity: 100,
            consistencyIndex: 100
        };

        // We use Set (not merge) to ensure no stray fields remain
        await profileRef.set(resetProfile);


        // ─────────────────────────────────────────────────────────────
        // PART 3: RE-INITIALIZATION (Prevent 404)
        // ─────────────────────────────────────────────────────────────
        const initBatch = db.batch();
        initBatch.set(userRef.collection('study').doc('status'), { initialized: true, mode: 'idle' });
        initBatch.set(userRef.collection('presence').doc('status'), { state: 'offline' });
        initBatch.set(userRef.collection('metrics').doc('status'), { initialized: true });

        // Reset Snapshot 
        initBatch.set(userRef.collection('stateSnapshot').doc('main'), {
            cumulativeIndex: 0,
            dailyLoad: { totalCognitiveCost: 0, status: 'Safe', date: new Date().toISOString().split('T')[0] },
            lastUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        await initBatch.commit();


        // ─────────────────────────────────────────────────────────────
        // PART 4: LOGGING
        // ─────────────────────────────────────────────────────────────
        await AdminLogger.logAction({
            performedBy: 'user', // or auth context
            targetUid: uid,
            type: 'HARD_RESET',
            timestamp: Date.now(),
            undoToken: undoToken
        });

        console.log(`[API] Hard Reset Complete for ${uid}. Undo Token generated.`);

        return NextResponse.json({
            success: true,
            undoToken
        });

    } catch (error) {
        console.error('[API] Reset Data Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
