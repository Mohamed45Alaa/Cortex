import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    deleteDoc,
    serverTimestamp,
    collection,
    onSnapshot,
    writeBatch
} from 'firebase/firestore';
import { getFirestoreInstance } from './firebase';

/**
 * Firestore Service - Silent Sync Layer
 * 
 * Philosophy: 
 * 1. Local-first: If Firestore fails, we ignore it.
 * 2. Unobtrusive: Never throw errors to the main app.
 * 3. Specific: Only touch define paths users/{uid}/...
 */

export const FirestoreService = {

    /**
     * Save basic user profile data (silently)
     */
    saveUserProfile: async (uid: string, profile: Partial<any>) => {
        try {
            const db = getFirestoreInstance();
            if (!db) return;

            const userRef = doc(db, 'users', uid, 'profile', 'main');
            await setDoc(userRef, {
                ...profile,
                lastActive: serverTimestamp(),
            }, { merge: true });

            console.log("[Firestore] Profile saved successfully.");

        } catch (error) {
            console.warn("[Firestore] Failed to save profile:", error);
            throw error; // Propagate to UI
        }
    },

    saveSubject: async (uid: string, subjectId: string, subjectData: any) => {
        try {
            const db = getFirestoreInstance();
            if (!db) return;

            const subjectRef = doc(db, 'users', uid, 'subjects', subjectId);
            await setDoc(subjectRef, {
                ...subjectData,
                lastUpdated: serverTimestamp()
            }, { merge: true });

        } catch (error) {
            console.warn("[Firestore] Failed to save subject:", error);
        }
    },

    deleteSubject: async (uid: string, subjectId: string) => {
        try {
            const db = getFirestoreInstance();
            if (!db) return;

            const subjectRef = doc(db, 'users', uid, 'subjects', subjectId);
            await deleteDoc(subjectRef);

        } catch (error) {
            console.warn("[Firestore] Failed to delete subject:", error);
        }
    },

    saveLecture: async (uid: string, subjectId: string, lectureId: string, lectureData: any) => {
        try {
            const db = getFirestoreInstance();
            if (!db) return;

            const lectureRef = doc(db, 'users', uid, 'subjects', subjectId, 'lectures', lectureId);
            await setDoc(lectureRef, {
                ...lectureData,
                updatedAt: serverTimestamp()
            }, { merge: true });

            const subjectRef = doc(db, 'users', uid, 'subjects', subjectId);
            await setDoc(subjectRef, {
                lastUpdated: serverTimestamp()
            }, { merge: true });

        } catch (error) {
            console.warn("[Firestore] Failed to save lecture:", error);
        }
    },

    /**
     * ATOMIC SAVE: Session + Snapshot
     * Ensures UI and Data never drift.
     */
    saveSessionWithSnapshot: async (uid: string, session: any, snapshot: any) => {
        try {
            const db = getFirestoreInstance();
            if (!db) return;

            const batch = writeBatch(db);

            // 1. Session Ref
            const sessionRef = doc(db, 'users', uid, 'subjects', session.subjectId, 'lectures', session.lectureId, 'sessions', session.id);
            batch.set(sessionRef, {
                ...session,
                syncedAt: serverTimestamp()
            });

            // 2. Snapshot Ref (Authority)
            const snapshotRef = doc(db, 'users', uid, 'stateSnapshot', 'main');
            batch.set(snapshotRef, {
                ...snapshot,
                lastUpdatedAt: serverTimestamp(),
                snapshotVersion: 1
            }, { merge: true });

            // 3. Cognitive Index Ref (Parallel Sync)
            if (session.performanceIndex) {
                const indexRef = doc(db, 'users', uid, 'cognitiveIndex', 'main');
                batch.set(indexRef, {
                    value: session.performanceIndex, // Simplified for now
                    totalSessions: snapshot.profile.totalSessions,
                    lastUpdated: serverTimestamp()
                }, { merge: true });
            }

            // Execute Atomic Commit
            await batch.commit();
            console.log("[Firestore] Atomic Save Complete: Session + Snapshot");

        } catch (error) {
            console.warn("[Firestore] Failed to atomic save:", error);
        }
    },

    /**
     * ATOMIC SUBJECT SAVE: Subject + Snapshot Touch
     */
    saveSubjectWithSnapshot: async (uid: string, subjectId: string, subjectData: any, snapshot: any) => {
        try {
            const db = getFirestoreInstance();
            if (!db) return;

            const batch = writeBatch(db);

            // 1. Subject Ref
            const subjectRef = doc(db, 'users', uid, 'subjects', subjectId);
            batch.set(subjectRef, {
                ...subjectData,
                lastUpdated: serverTimestamp()
            }, { merge: true });

            // 2. Snapshot Ref (Beacon)
            const snapshotRef = doc(db, 'users', uid, 'stateSnapshot', 'main');
            batch.set(snapshotRef, {
                ...snapshot,
                lastUpdatedAt: serverTimestamp(),
                snapshotVersion: 1
            }, { merge: true });

            await batch.commit();
            console.log("[Firestore] Atomic Save: Subject + Snapshot");

        } catch (error) {
            console.warn("[Firestore] Failed to save subject:", error);
        }
    },

    /**
     * RECURSIVE DELETE: Subject + Lectures + Sessions + Snapshot
     */
    deleteSubjectRecursive: async (uid: string, subjectId: string, snapshot: any) => {
        try {
            const db = getFirestoreInstance();
            if (!db) return;

            console.log("[Firestore] Starting Recursive Delete for:", subjectId);
            const batch = writeBatch(db);

            // 1. Delete Subject Document
            const subjectRef = doc(db, 'users', uid, 'subjects', subjectId);
            batch.delete(subjectRef);

            // 2. Find and Delete All Lectures
            const lecturesColl = collection(db, 'users', uid, 'subjects', subjectId, 'lectures');
            const lecturesSnap = await getDocs(lecturesColl);

            for (const lecDoc of lecturesSnap.docs) {
                // 3. Find and Delete All Sessions for this Lecture
                const sessionsColl = collection(db, 'users', uid, 'subjects', subjectId, 'lectures', lecDoc.id, 'sessions');
                const sessionsSnap = await getDocs(sessionsColl);

                sessionsSnap.forEach(sessDoc => {
                    batch.delete(sessDoc.ref);
                });

                batch.delete(lecDoc.ref);
            }

            // 4. Update Snapshot (Beacon)
            const snapshotRef = doc(db, 'users', uid, 'stateSnapshot', 'main');
            batch.set(snapshotRef, {
                ...snapshot,
                lastUpdatedAt: serverTimestamp(),
                snapshotVersion: 1
            }, { merge: true });

            await batch.commit();
            console.log("[Firestore] Recursive Delete Complete");

        } catch (error) {
            console.warn("[Firestore] Failed to delete subject recursively:", error);
        }
    },

    saveStateSnapshot: async (uid: string, snapshot: any) => {
        try {
            const db = getFirestoreInstance();
            if (!db) return;

            const snapshotRef = doc(db, 'users', uid, 'stateSnapshot', 'main');
            await setDoc(snapshotRef, {
                ...snapshot,
                lastUpdatedAt: serverTimestamp(),
                snapshotVersion: 1
            }, { merge: true });

        } catch (error) {
            console.warn("[Firestore] Failed to save state snapshot:", error);
        }
    },

    /**
     * Load FULL user data on login to hydrate local store.
     * Recursively fetches Subjects -> Lectures -> Sessions.
     * Includes Raw Data Normalization to prevent undefined errors.
     */
    loadUserData: async (uid: string) => {
        try {
            const db = getFirestoreInstance();
            if (!db) return null;

            console.log("[Firestore] Starting deep hydration for:", uid);
            const startTime = Date.now();

            // 1. Load Cognitive Index, State Snapshot, AND Identity Profile (Parallel)
            const indexRef = doc(db, 'users', uid, 'cognitiveIndex', 'main');
            const snapshotRef = doc(db, 'users', uid, 'stateSnapshot', 'main');
            const profileRef = doc(db, 'users', uid, 'profile', 'main');

            const [indexSnap, snapshotSnap, profileSnap] = await Promise.all([
                getDoc(indexRef),
                getDoc(snapshotRef),
                getDoc(profileRef)
            ]);

            const cognitiveIndex = indexSnap.exists() ? indexSnap.data() : null;
            const stateSnapshot = snapshotSnap.exists() ? snapshotSnap.data() : null;
            const identityProfile = profileSnap.exists() ? profileSnap.data() : null;

            // 2. Load Subjects
            const subjectsColl = collection(db, 'users', uid, 'subjects');
            const subjectsSnap = await getDocs(subjectsColl);

            const subjects: any[] = [];
            const lectures: any[] = [];
            const sessions: any[] = [];

            // 3. Traverse Hierarchy (Parallelized at subject level)
            await Promise.all(subjectsSnap.docs.map(async (subDoc) => {
                const subData: any = subDoc.data();

                // NORMALIZE SUBJECT
                const validSubject = {
                    ...subData,
                    id: subDoc.id,
                    name: subData.name || "Unnamed Subject",
                    config: subData.config || { strictnessLevel: 0, preferredDays: [], sessionDurationTarget: 0 },
                    metrics: subData.metrics || { stability: 0, readiness: 0, totalWeight: 0 }
                };
                subjects.push(validSubject);

                // Fetch Lectures for this Subject
                const lecturesColl = collection(db, 'users', uid, 'subjects', subDoc.id, 'lectures');
                const lecturesSnap = await getDocs(lecturesColl);

                await Promise.all(lecturesSnap.docs.map(async (lecDoc) => {
                    const lecData: any = lecDoc.data();

                    // NORMALIZE LECTURE
                    const validLecture = {
                        ...lecData,
                        id: lecDoc.id,
                        subjectId: subDoc.id,
                        stability: lecData.stability ?? 0,
                        status: lecData.status || 'Pending',
                        cognitiveIndex: lecData.cognitiveIndex ?? 0,
                        duration: lecData.duration || 0,
                        relativeDifficulty: lecData.relativeDifficulty || 5
                    };
                    lectures.push(validLecture);

                    // Fetch Sessions for this Lecture
                    const sessionsColl = collection(db, 'users', uid, 'subjects', subDoc.id, 'lectures', lecDoc.id, 'sessions');
                    const sessionsSnap = await getDocs(sessionsColl);

                    sessionsSnap.forEach(sessDoc => {
                        const sessData: any = sessDoc.data();
                        // NORMALIZE SESSION
                        sessions.push({
                            ...sessData,
                            id: sessDoc.id,
                            lectureId: lecDoc.id,
                            subjectId: subDoc.id,
                            performanceIndex: sessData.performanceIndex ?? 0,
                            cognitiveCost: sessData.cognitiveCost ?? 0
                        });
                    });
                }));
            }));

            console.log(`[Firestore] Hydration complete in ${Date.now() - startTime}ms. Found: ${subjects.length} Subjects, ${lectures.length} Lectures.`);

            return {
                cognitiveIndex,
                stateSnapshot,
                identityProfile, // Normalized Identity Data
                subjects,
                lectures,
                sessions
            };

        } catch (error) {
            console.warn("[Firestore] Failed to load deep data:", error);
            return null;
        }
    },

    /**
     * Real-time Listener for State Snapshot
     * Returns an unsubscribe function.
     */
    subscribeToSnapshot: (uid: string, onUpdate: (snapshot: any) => void) => {
        const db = getFirestoreInstance();
        if (!db) return () => { };

        const snapshotRef = doc(db, 'users', uid, 'stateSnapshot', 'main');

        console.log("[Firestore] Attaching real-time listener to:", uid);
        const unsubscribe = onSnapshot(snapshotRef, (docSnap) => {
            if (docSnap.exists()) {
                onUpdate(docSnap.data());
            }
        });

        return unsubscribe;
    },
};
