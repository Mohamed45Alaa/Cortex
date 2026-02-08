import { NextResponse } from 'next/server';
import { createFirebaseAdminApp } from '@/core/services/firebase-admin';
import * as admin from 'firebase-admin';

export async function POST(req: Request) {
    try {
        const { uid } = await req.json();

        if (!uid) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        const app = createFirebaseAdminApp();
        const auth = app.auth();
        const db = app.firestore();

        console.log(`[API] Starting Permanent Account Deletion for user: ${uid}`);

        // 1. DELETE FROM AUTHENTICATION
        try {
            await auth.deleteUser(uid);
            console.log(`[API] Auth user deleted`);
        } catch (e: any) {
            // Context: User might already be deleted or not found
            if (e.code === 'auth/user-not-found') {
                console.warn('[API] Auth user not found, proceeding to data cleanup');
            } else {
                throw e;
            }
        }

        // 2. DELETE FIRESTORE DATA (Recursive)
        // Since we want to wipe EVERYTHING under users/{uid}, we can use a recursive delete utility if available,
        // or iterate through known collections.

        const userRef = db.collection('users').doc(uid);

        // Manual "best effort" recursive delete for known structure
        const collections = await userRef.listCollections();

        for (const col of collections) {
            // If it's subjects, we go deeper
            if (col.id === 'subjects') {
                const subjects = await col.get();
                for (const sub of subjects.docs) {
                    const subCollections = await sub.ref.listCollections();
                    for (const subCol of subCollections) {
                        if (subCol.id === 'lectures') {
                            const lectures = await subCol.get();
                            for (const lec of lectures.docs) {
                                const lecturesSubCols = await lec.ref.listCollections();
                                for (const lecSubCol of lecturesSubCols) {
                                    // Sessions
                                    const docs = await lecSubCol.get();
                                    const batch = db.batch(); // Mini batch
                                    docs.forEach(d => batch.delete(d.ref));
                                    await batch.commit();
                                }
                                await lec.ref.delete();
                            }
                        }
                    }
                    await sub.ref.delete();
                }
            } else {
                // Generic collection delete (Profile, StateSnapshot)
                // Limit batch size if needed, but for single user it should be fine
                const docs = await col.get();
                const batch = db.batch();
                docs.forEach(d => batch.delete(d.ref));
                await batch.commit();
            }
        }

        // Finally delete the user doc itself
        await userRef.delete();

        console.log(`[API] Account Deletion Complete for ${uid}`);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('[API] Delete Account Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
