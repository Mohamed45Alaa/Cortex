import { getDatabaseInstance, getAuthInstance } from "@/core/services/firebase";
import { ref, onValue, onDisconnect, serverTimestamp, update, get } from "firebase/database";

// ROOT PATHS
const STATUS_ROOT = (uid: string) => `status/${uid}`;
const CONNECTED_REF = ".info/connected";

// API HELPER
async function callSessionApi(action: 'START' | 'END' | 'HEARTBEAT', payload: any = {}) {
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

        // 1. Connection Binding (Allowed Client Write? NO. Server-Only Rules applied)
        // We only LISTEN to the connection state to know if we *should* be sending heartbeats.
        onValue(connectedRef, (snap) => {
            const isConnected = snap.val() === true;
            console.log("[Presence] Connection State:", isConnected);
            // We no longer write to RTDB here.
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
     * UPDATE VISIBILITY (Disabled - Strict Server Authority)
     */
    updateState: (uid: string, state: 'online' | 'background') => {
        // Disabled to prevent Permission Denied errors.
        // If focus tracking is needed, it must go through API.
    },

    /**
     * HEARTBEAT -> NOW SERVER AUTHORITATIVE
     * "I am still here. Am I allowed to be?"
     */
    heartbeat: async (uid: string) => {
        // Server Verification ONLY regarding "Last Seen"
        await callSessionApi('HEARTBEAT');
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
