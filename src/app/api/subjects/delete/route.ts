import { NextResponse } from 'next/server';
import { createFirebaseAdminApp } from '@/core/services/firebase-admin';
import * as admin from 'firebase-admin';
import { AdminLogger } from '@/core/services/AdminLogger';

export async function POST(req: Request) {
    try {
        const { uid, subjectId } = await req.json();

        if (!uid || !subjectId) {
            return NextResponse.json({ error: 'Missing params' }, { status: 400 });
        }

        const app = createFirebaseAdminApp();
        const db = app.firestore();
        const userRef = db.collection('users').doc(uid);
        const subjectRef = userRef.collection('subjects').doc(subjectId);

        console.log(`[API] Safe Deleting Subject ${subjectId} for ${uid}`);

        // 1. DELETE OPERATIONS (Manual Recursive)

        // A. Delete Lectures & Sessions inside Subject
        const batch = db.batch();
        const lectures = await subjectRef.collection('lectures').get();

        for (const lec of lectures.docs) {
            const sessions = await lec.ref.collection('sessions').get();
            sessions.forEach(s => batch.delete(s.ref));
            batch.delete(lec.ref);
        }

        // B. Delete Subject Itself
        batch.delete(subjectRef);
        await batch.commit(); // Commit deletion first to ensure reliable recalc

        // 2. RECALCULATION IDENTITY
        // We must query ALL remaining sessions to rebuild truth.
        // This effectively "wipes" the influence of the deleted subject.

        // Query ALL sessions (Group Config might be needed if sessions are subcollections deep)
        // However, sessions are strictly hierarchical: subjects -> lectures -> sessions.
        // We need to iterate all subjects to find all sessions? That's expensive.
        // OPTION B: Does user have a root 'sessions' collection? 
        // Plan says: "Recursive delete sessions (if global)".
        // If sessions are ONLY nested, we must traverse remaining subjects.

        // Let's assume we iterate remaining subjects.
        const remainingSubjects = await userRef.collection('subjects').get();
        let validSessions: any[] = [];

        for (const sub of remainingSubjects.docs) {
            const lecs = await sub.ref.collection('lectures').get();
            for (const lec of lecs.docs) {
                const sess = await lec.ref.collection('sessions').get();
                sess.forEach(doc => {
                    validSessions.push(doc.data());
                });
            }
        }

        // 3. COMPUTE METRICS
        const totalSessions = validSessions.length;

        // Cognitive Cost (Avg of last 5? or All?)
        // "cognitiveCost = avg(last 5 valid)"
        // Sort by date desc
        validSessions.sort((a, b) => {
            const da = a.date ? (a.date.seconds ? a.date.seconds : new Date(a.date).getTime()) : 0;
            const db = b.date ? (b.date.seconds ? b.date.seconds : new Date(b.date).getTime()) : 0;
            return db - da;
        });

        const last5 = validSessions.slice(0, 5);
        const sumCost = last5.reduce((acc, curr) => acc + (curr.cognitiveCost || 0), 0);
        const avgCost = last5.length > 0 ? (sumCost / last5.length) : 0;

        // Collection Efficiency (Avg of all?)
        // "collectionEfficiency = from existing only"
        const sumEff = validSessions.reduce((acc, curr) => acc + (curr.collectionRate || 0), 0);
        const avgEff = validSessions.length > 0 ? (sumEff / validSessions.length) : 0;


        // 4. UPDATE PROFILE
        await userRef.collection('profile').doc('main').set({
            totalSessions: totalSessions,
            cumulativeIndex: parseFloat(avgCost.toFixed(2)),
            collectionEfficiency: Math.round(avgEff),
            // consistencyIndex? We might leave it or recalc generic
            // lastSessionDate?
            lastSessionDate: validSessions.length > 0 ? validSessions[0].date : null
        }, { merge: true });


        // 5. LOG
        await AdminLogger.logAction({
            performedBy: 'user',
            targetUid: uid,
            type: 'SUBJECT_DELETE',
            timestamp: Date.now(),
            metadata: { subjectId }
        });

        return NextResponse.json({ success: true, newStats: { totalSessions, avgCost, avgEff } });

    } catch (error) {
        console.error('[API] Subject Delete Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
