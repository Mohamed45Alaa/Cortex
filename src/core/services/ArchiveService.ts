import { getFirestoreInstance } from "./firebase";
import { collection, query, where, getDocs, writeBatch, Timestamp, doc } from "firebase/firestore";

const ARCHIVE_AGE_MS = 90 * 24 * 60 * 60 * 1000; // 90 Days

export const ArchiveService = {
    runCleanup: async (uid: string) => {
        try {
            const db = getFirestoreInstance();
            if (!db) return;

            const cutoffDate = new Date(Date.now() - ARCHIVE_AGE_MS);
            console.log(`[Archive] Running cleanup for sessions before ${cutoffDate.toISOString()}...`);

            // QUERY STRATEGY:
            // We need to traverse subjects -> lectures -> sessions.
            // OR use Collection Group Query if index exists.
            // "sessions" where "startTime" < cutoff?
            // Let's assume we traverse (safest without index knowledge).
            // Actually, for "Performance Mission", we want to avoid massive reads.
            // If we don't have an index, we shouldn't scan everything.

            // Let's try a Collection Group Query. If it fails (requires index), we catch and warn.
            // users/{uid}/.../sessions
            // We can't filter by parent UID in collection group easily without a userId field.
            // Assuming sessions have `userId` or we accept scanning all if rules allow (Rules usually enforce auth.uid == resource.userId).

            // Safer: We only run this if we have loaded the sessions in memory? No, that's heavy.
            // Let's rely on `useStore` having loaded history?
            // "Archive sessions older than 90 days".

            // For this implementation, I will implement a LIGHTWEIGHT traversal (Subject -> Session).
            // Optimization: Only check this once per week? (Store lastRun in local storage).

            const lastRun = localStorage.getItem('last_archive_run');
            if (lastRun && (Date.now() - parseInt(lastRun)) < 604800000) { // 7 Days
                return; // Skip
            }

            // TRAVERSAL
            const subjectsColl = collection(db, 'users', uid, 'subjects');
            const subSnap = await getDocs(subjectsColl);

            let archivedCount = 0;
            const batch = writeBatch(db);
            let batchCount = 0;

            for (const subDoc of subSnap.docs) {
                const lecturesColl = collection(db, 'users', uid, 'subjects', subDoc.id, 'lectures');
                const lecSnap = await getDocs(lecturesColl);

                for (const lecDoc of lecSnap.docs) {
                    const sessionsColl = collection(db, 'users', uid, 'subjects', subDoc.id, 'lectures', lecDoc.id, 'sessions');
                    // OPTIMIZATION: Query only old ones? 
                    // where('startTime', '<', cutoff.getTime())
                    const q = query(sessionsColl, where('startTime', '<', cutoffDate.getTime()));

                    try {
                        const oldSessions = await getDocs(q);
                        oldSessions.forEach(sessDoc => {
                            const data = sessDoc.data();
                            // CHECK: Already archived? (Check for missing segments)
                            if (!data.segments || data.segments.length === 0) return;

                            // COMPRESS
                            const summary = {
                                ...data,
                                segments: [], // DELETE SEGMENTS
                                isArchived: true,
                                archivedAt: Timestamp.now()
                            };

                            batch.set(sessDoc.ref, summary, { merge: true });
                            batchCount++;
                            archivedCount++;
                        });
                    } catch (e) {
                        // Index might be missing for query. Skip.
                    }
                }
            }

            if (batchCount > 0) {
                await batch.commit();
                console.log(`[Archive] Archived ${archivedCount} old sessions.`);
            }

            localStorage.setItem('last_archive_run', Date.now().toString());

        } catch (e) {
            console.warn("[Archive] Cleanup failed", e);
        }
    }
};
