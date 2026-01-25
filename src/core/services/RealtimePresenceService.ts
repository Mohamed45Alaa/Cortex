import { getDatabaseInstance, getAuthInstance } from "@/core/services/firebase";
import { ref, onValue, onDisconnect, serverTimestamp, update, get } from "firebase/database";

// ROOT PATHS
const STATUS_ROOT = (uid: string) => `status/${uid}`;
const CONNECTED_REF = ".info/connected";

// API HELPER
async function callSessionApi(action: 'START' | 'END' | 'HEARTBEAT' | 'PRESENCE', payload: any = {}) {
    const auth = getAuthInstance();
    const user = auth?.currentUser;
    if (!user) return;

    try {
        const token = await user.getIdToken();
        const response = await fetch('/api/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ action, payload })
        });

        if (response.status === 410) {
            // CRITICAL: Server says we are dead.
            console.error("🚨 SESSION REVOKED BY SERVER (410 GONE). FORCE EXITING.");
            window.location.reload(); // Simple nuclear option for now
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Session API Error:", error);
        return null;
    }
}

export const RealtimePresenceService = {

    /**
     * INITIALIZE CONNECTION LISTENER
     * Listen ONLY. Do not write session state directly.
     */
    initialize: (uid: string) => {
        const db = getDatabaseInstance();
        if (!db) return;

        const connectedRef = ref(db, CONNECTED_REF);
        const userStatusRef = ref(db, STATUS_ROOT(uid));

        // 1. Connection Binding & Disconnect Logic
        onValue(connectedRef, (snap) => {
            const isConnected = snap.val() === true;

            if (isConnected) {
                // A. ON DISCONNECT: Set 'offline' + Timestamp
                // CRITICAL: We DO NOT touch activeSession. It survives disconnect.
                // STRICT SCHEMA ENFORCEMENT: Only presence nodes.
                onDisconnect(userStatusRef).update({
                    state: 'offline',
                    lastSeenAt: serverTimestamp(),
                    // We purposefully do NOT touch inSession or activeSession
                }).then(() => {
                    // B. ON CONNECT: Set 'online' (or correct state via heartbeat later)
                    // We set initial state to Online to ensure dashboard lights up.
                    const isHidden = document.hidden;

                    // STRICT SCHEMA INITIALIZATION
                    update(userStatusRef, {
                        state: isHidden ? 'background' : 'online',
                        lastSeenAt: serverTimestamp(),
                        // We preserve existing inSession/currentPage if any
                    });
                });
            }
        });

        // 2. LISTEN FOR KILL SWITCH (Admin / Zombie Reaper)
        const terminationRef = ref(db, `status/${uid}/sessionTermination`);
        onValue(terminationRef, (snap) => {
            const data = snap.val();
            if (data) {
                console.warn("[RTDB] 🚨 RECEIVED TERMINATION SIGNAL:", data);
                // Call Store to handle UI cleanup
                import("@/store/useStore").then(({ useStore }) => {
                    useStore.getState().endActiveSession(false, true, data);
                });
            }
        });
    },

    /**
     * UPDATE VISIBILITY (API)
     */
    updateState: (uid: string, state: 'online' | 'background') => {
        // Optimistic local state tracking could handle 'heartbeat' payload consistency
        // But for now, we just fire the immediate change.
        callSessionApi('PRESENCE', {
            state,
            currentPage: window.location.pathname // Tracking Page Context
        });
    },

    /**
     * HEARTBEAT -> NOW SERVER AUTHORITATIVE
     * "I am still here. Am I allowed to be?"
     */
    heartbeat: async (uid: string) => {
        // Send current visibility state
        const isHidden = document.hidden;
        const state = isHidden ? 'background' : 'online';
        await callSessionApi('HEARTBEAT', {
            state,
            currentPage: window.location.pathname
        });
    },

    /**
     * START SESSION -> API CALL
     */
    startSession: async (uid: string, lectureId: string, subjectId: string) => {
        return callSessionApi('START', { lectureId, subjectId });
    },

    /**
     * END SESSION -> API CALL
     */
    endSession: async (uid: string) => {
        return callSessionApi('END');
    },

    setOffline: (uid: string) => {
        // Client cannot declare itself offline. It just stops heartbeating.
    },

    trackPage: (uid: string, path: string) => {
        // Disabled to prevent Permission Denied errors.
    }
};
