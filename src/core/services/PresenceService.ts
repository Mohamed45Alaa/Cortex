import { getFirestoreInstance } from "@/core/services/firebase";
import { doc, serverTimestamp, setDoc, updateDoc, writeBatch, collection, addDoc } from "firebase/firestore";


const db = getFirestoreInstance()!;


const PRESENCE_PATH = (uid: string) => `users/${uid}/presence/main`;
const STUDY_PATH = (uid: string) => `users/${uid}/study/state`;

// THROTTLE STATE
let lastPresenceWrite = 0;
let lastStudyWrite = 0;
const THROTTLE_MS = 30000; // 30s Hard Throttle

export const PresenceService = {

    // --- LAYER 1: PRESENCE (Low Level) ---

    // Called on Mount, VisibilityChange, and Heartbeat
    updatePresence: async (uid: string, status: 'online' | 'background' | 'offline', force: boolean = false) => {
        const now = Date.now();
        // FORCE Write if status is 'offline' OR 'force' is true
        if (!force && status !== 'offline' && (now - lastPresenceWrite < THROTTLE_MS)) {
            return; // Skip write
        }

        try {
            lastPresenceWrite = now;
            const ref = doc(db, PRESENCE_PATH(uid));
            await setDoc(ref, {
                status,
                lastSeenAt: serverTimestamp()
            }, { merge: true });
        } catch (e) { } // Silent fail
    },

    // --- LAYER 2: STUDY STATE (High Level) ---

    // Called on Interaction (throttled) or Session Start/End
    // ONLY reports RAW activity. Does NOT decide "Browsing" vs "Idle".
    updateStudyActivity: async (uid: string, sessionActive: boolean, force: boolean = false) => {
        const now = Date.now();
        if (!force && (now - lastStudyWrite < THROTTLE_MS)) {
            return; // Skip write to prevent storming
        }

        try {
            lastStudyWrite = now;
            const ref = doc(db, STUDY_PATH(uid));
            await setDoc(ref, {
                sessionActive,
                lastInteractionAt: serverTimestamp()
            }, { merge: true });
        } catch (e) { }
    },

    // --- UTILS ---

    trackPage: async (uid: string, path: string) => {
        // Only updates presence metadata, does NOT change status logic
        // Also throttled
        const now = Date.now();
        if (now - lastPresenceWrite < THROTTLE_MS) return;

        try {
            lastPresenceWrite = now;
            const ref = doc(db, PRESENCE_PATH(uid));
            await setDoc(ref, { currentPage: path }, { merge: true });
        } catch (e) { }
    },

    setOffline: async (uid: string) => {
        try {
            // Always allow clean exit
            const ref = doc(db, PRESENCE_PATH(uid));
            await setDoc(ref, { status: 'offline' }, { merge: true });

            // DO NOT TOUCH STUDY STATE (Persist Session)
            // Users might close tab while timer is running - intended behavior is to keep session active.
        } catch (e) { }
    }
};
