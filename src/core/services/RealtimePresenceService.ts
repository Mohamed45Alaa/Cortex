import { getDatabaseInstance } from "@/core/services/firebase";
import { ref, onValue, onDisconnect, serverTimestamp, update } from "firebase/database";

// ROOT PATHS
const STATUS_ROOT = (uid: string) => `status/${uid}`;
const CONNECTED_REF = ".info/connected";

export const RealtimePresenceService = {

    /**
     * INITIALIZE CONNECTION LISTENER
     * Call this once on app mount (AuthState listener).
     * Sets up the "Kill Switch" (onDisconnect) mechanics.
     */
    initialize: (uid: string) => {
        const db = getDatabaseInstance();
        if (!db) return;

        const connectedRef = ref(db, CONNECTED_REF);
        const userStatusRef = ref(db, STATUS_ROOT(uid));

        // Listen to connection state
        onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
                // 1. Establish "Kill Switch" FIRST
                // If we lose connection, update status to 'offline' but PRESERVE SESSION.
                onDisconnect(userStatusRef).update({
                    state: 'offline',
                    lastSeenAt: serverTimestamp()
                    // activeSession: null (REMOVED: Session survives disconnect)
                });

                // 2. Set Initial Online State
                update(userStatusRef, {
                    state: 'online',
                    lastSeenAt: serverTimestamp(),
                });
            }
        });

        // 3. LISTEN FOR AUTHORITATIVE REPORT (Admin Force End)
        // This is the SINGLE SOURCE OF TRUTH for forced termination.
        const terminationRef = ref(db, `status/${uid}/sessionTermination`);
        onValue(terminationRef, (snap) => {
            const data = snap.val();
            if (data) {
                console.warn("[RTDB] 🚨 RECEIVED AUTHORITATIVE TERMINATION SIGNAL:", data);
                // Force End Local Session (Remote Kill)
                // Pass payload to display warning in UI
                import("@/store/useStore").then(({ useStore }) => {
                    useStore.getState().endActiveSession(false, true, data);
                });
            }
        });
    },

    /**
     * UPDATE VISIBILITY STATE
     * 'online' (Focused) vs 'background' (Blurred)
     */
    updateState: (uid: string, state: 'online' | 'background') => {
        const db = getDatabaseInstance();
        if (!db) return;

        const userStatusRef = ref(db, STATUS_ROOT(uid));
        update(userStatusRef, {
            state,
            lastSeenAt: serverTimestamp()
        });
    },

    /**
     * HEARTBEAT (Keep-Alive)
     * Updates timestamps every 30-60s.
     * MUST NOT overwrite 'background' state.
     */
    heartbeat: (uid: string) => {
        const db = getDatabaseInstance();
        if (!db) return;

        const userStatusRef = ref(db, STATUS_ROOT(uid));
        // We only update lastSeenAt. We rely on updateState to manage online/background.
        update(userStatusRef, {
            lastSeenAt: serverTimestamp()
        });
    },

    /**
     * SESSION MANAGEMENT
     * Writes full activeSession object.
     */
    startSession: (uid: string, lectureId: string, subjectId: string) => {
        const db = getDatabaseInstance();
        if (!db) return;

        const userStatusRef = ref(db, STATUS_ROOT(uid));
        const sessionId = `${uid}_${lectureId}_${Date.now()}`;

        // 1. Write FULL Active Session Object
        update(userStatusRef, {
            // Force online when starting session (usually user is active)
            state: 'online',
            lastSeenAt: serverTimestamp(),
            activeSession: {
                sessionId,
                lectureId,
                subjectId,
                startedAt: serverTimestamp()
            }
        });
    },

    endSession: (uid: string) => {
        const db = getDatabaseInstance();
        if (!db) return;

        const userStatusRef = ref(db, STATUS_ROOT(uid));

        // Atomic Wipe of Session -> effectively "Not Studying"
        update(userStatusRef, {
            activeSession: null,
            lastSeenAt: serverTimestamp()
        });
    },

    /**
     * MANUAL OFFLINE (Cleanup)
     * e.g. Logout or Tab Close
     * STRICT: Must PRESERVE activeSession if one exists.
     */
    setOffline: (uid: string) => {
        const db = getDatabaseInstance();
        if (!db) return;

        const userStatusRef = ref(db, STATUS_ROOT(uid));
        update(userStatusRef, {
            state: 'offline',
            lastSeenAt: serverTimestamp()
            // activeSession: null (REMOVED: Session persists until explicitly ended)
        });
    },

    /**
     * TRACK PAGE NAVIGATION
     */
    trackPage: (uid: string, path: string) => {
        const db = getDatabaseInstance();
        if (!db) return;

        const userStatusRef = ref(db, STATUS_ROOT(uid));
        update(userStatusRef, {
            currentPage: path,
            lastSeenAt: serverTimestamp()
        });
    }
};
