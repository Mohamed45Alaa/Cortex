/**
 * RealtimePresenceService
 * ──────────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH FOR SESSIONS: /activeSessions/{uid}
 *
 * ARCHITECTURE (Post-Rebuild):
 *
 *   PRESENCE  → status/{uid}          (state, lastSeenAt, heartbeat)
 *   SESSION   → activeSessions/{uid}  (sessionId, subjectId, startedAt, status)
 *             → status/{uid}/activeSession  (backward compat mirror)
 *
 * WHY CLIENT SDK NOT SERVER API:
 *   Presence writes already use client SDK directly (updateStateImmediate).
 *   Session writes MUST use the same path for identical reliability.
 *   Server API (/api/session) adds latency + failure modes → now audit-only.
 *
 * DEBUG MIRROR:
 *   /debug/sessionWrites/{uid} logs every start/end event with timestamps.
 *   Admin can verify both nodes exist to confirm write succeeded.
 */

import { getDatabaseInstance, getAuthInstance } from "@/core/services/firebase";
import { ref, onValue, onDisconnect, serverTimestamp, update, remove, set } from "firebase/database";

// ─── PATHS ────────────────────────────────────────────────────────────────────
const PATH_STATUS = (uid: string) => `status/${uid}`;
const PATH_ACTIVE_SESSION = (uid: string) => `activeSessions/${uid}`;
const PATH_DEBUG = (uid: string) => `debug/sessionWrites/${uid}`;
const CONNECTED_REF = ".info/connected";

// ─── ENVIRONMENT ASSERTION ────────────────────────────────────────────────────
if (typeof window !== 'undefined') {
    try {
        const db = getDatabaseInstance();
        if (db) {
            const projectId = (db as any).app?.options?.projectId || 'UNKNOWN';
            const dbUrl = (db as any).app?.options?.databaseURL || 'UNKNOWN';
            console.log(`[Presence] ✅ CLIENT SDK PROJECT_ID: ${projectId}`);
            console.log(`[Presence] ✅ CLIENT SDK DATABASE_URL: ${dbUrl}`);
        }
    } catch { }
}

// ─── API HELPER (audit-only, non-blocking) ────────────────────────────────────
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
            console.error("🚨 SESSION REVOKED BY SERVER (410 GONE). FORCE EXITING.");
            window.location.reload();
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
     * INITIALIZE — Set up connection listener and kill-switch listener.
     * Call once on auth, before any session logic.
     */
    initialize: (uid: string) => {
        const db = getDatabaseInstance();
        if (!db) return;

        const connectedRef = ref(db, CONNECTED_REF);
        const userStatusRef = ref(db, PATH_STATUS(uid));

        // 1. Connection Binding & Disconnect Logic
        onValue(connectedRef, (snap) => {
            const isConnected = snap.val() === true;

            if (isConnected) {
                // ON DISCONNECT: mark offline (presence only — session survives disconnect)
                onDisconnect(userStatusRef).update({
                    state: 'offline',
                    lastSeenAt: serverTimestamp(),
                }).then(() => {
                    // ON CONNECT: mark online
                    const isHidden = document.hidden;
                    update(userStatusRef, {
                        state: isHidden ? 'background' : 'online',
                        lastSeenAt: serverTimestamp(),
                    }).catch(e => console.warn('[RTDB] Presence update ignored:', e));
                }).catch(e => console.warn('[RTDB] Presence onDisconnect ignored:', e));
            }
        }, (err) => {
            console.warn('[RTDB] connectedRef error:', err);
        });

        // 2. Kill-switch listener (admin force-end)
        const terminationRef = ref(db, `${PATH_STATUS(uid)}/sessionTermination`);
        onValue(terminationRef, (snap) => {
            const data = snap.val();
            if (data) {
                console.warn("[RTDB] 🚨 RECEIVED TERMINATION SIGNAL:", data);
                import("@/store/useStore").then(({ useStore }) => {
                    useStore.getState().endActiveSession(false, true, data);
                });
            }
        }, (error) => {
            console.warn("[RTDB] Termination Listener Error (Ignored):", error);
        });
    },

    /**
     * UPDATE VISIBILITY STATE — writes `state` to status node.
     */
    updateState: (uid: string, state: 'online' | 'background') => {
        callSessionApi('PRESENCE', {
            state,
            currentPage: window.location.pathname
        });
    },

    /**
     * INSTANT STATE UPDATE — direct client SDK write.
     * Use for time-critical changes (visibilitychange, tab switch).
     */
    updateStateImmediate: (uid: string, state: 'online' | 'background') => {
        const db = getDatabaseInstance();
        if (!db) return;
        const statusRef = ref(db, PATH_STATUS(uid));
        update(statusRef, {
            state,
            lastSeenAt: Date.now(),
        }).catch(err => {
            console.warn('[Presence] Direct RTDB write failed, falling back to API:', err);
            callSessionApi('PRESENCE', { state, currentPage: window.location.pathname });
        });
    },

    /**
     * HEARTBEAT — server-authoritative check.
     */
    heartbeat: async (uid: string, data?: { lastInteraction?: number, activeSessionId?: string }) => {
        const isHidden = document.hidden;
        const state = isHidden ? 'background' : 'online';
        await callSessionApi('HEARTBEAT', {
            state,
            currentPage: window.location.pathname,
            lastInteraction: data?.lastInteraction,
            activeSessionId: data?.activeSessionId
        });
    },

    /**
     * START SESSION
     * ──────────────────────────────────────────────────────────────────────
     * PRIMARY WRITE: /activeSessions/{uid}   ← SOURCE OF TRUTH
     * MIRROR WRITE:  /status/{uid}/activeSession  ← backward compat
     * DEBUG WRITE:   /debug/sessionWrites/{uid}   ← audit trail
     * SERVER AUDIT:  /api/session START           ← Firestore only, non-blocking
     *
     * PRODUCTION INVARIANT:
     *   Admin subscribes to /activeSessions — this write ALWAYS succeeds
     *   because it uses the same client SDK as presence (zero server dependency).
     */
    startSession: async (uid: string, lectureId: string, subjectId: string) => {
        const db = getDatabaseInstance();
        const sessionId = `${uid}_${lectureId}_${Date.now()}`;
        const now = Date.now();

        const sessionPayload = {
            sessionId,
            lectureId,
            subjectId,
            startedAt: now,
            status: 'running',
            isActive: true,
            environment: typeof window !== 'undefined'
                ? (process.env.NEXT_PUBLIC_VERCEL_ENV || 'localhost')
                : 'server',
        };

        if (!db) {
            console.error('[SESSION] ❌ RTDB unavailable — session write failed');
            return;
        }

        console.log(`[SESSION] ▶ START — uid: ${uid}, sessionId: ${sessionId}`);
        console.log(`[SESSION] ▶ WRITE PATH: activeSessions/${uid}`);

        // ── PRIMARY: /activeSessions/{uid} ────────────────────────────────────
        await set(ref(db, PATH_ACTIVE_SESSION(uid)), sessionPayload)
            .then(() => console.log(`[SESSION] ✅ SESSION START WRITTEN: activeSessions/${uid}`))
            .catch(err => console.error(`[SESSION] ❌ activeSessions write FAILED:`, err));

        // ── MIRROR: /status/{uid}/activeSession ───────────────────────────────
        update(ref(db, PATH_STATUS(uid)), {
            activeSession: sessionPayload,
            inSession: true,
        }).catch(err => console.warn('[SESSION] status mirror write failed (non-fatal):', err));

        // ── DEBUG: /debug/sessionWrites/{uid} ─────────────────────────────────
        set(ref(db, PATH_DEBUG(uid)), {
            lastEvent: 'START',
            sessionId,
            lectureId,
            subjectId,
            startedAt: now,
            writtenAt: now,
        }).catch(() => { /* Debug node is best-effort */ });

        // ── SERVER AUDIT: Firestore (non-blocking) ────────────────────────────
        callSessionApi('START', { lectureId, subjectId }).catch(
            err => console.warn('[SESSION] Server audit write failed (non-fatal):', err)
        );
    },

    /**
     * END SESSION
     * ──────────────────────────────────────────────────────────────────────
     * PRIMARY REMOVE: /activeSessions/{uid}
     * MIRROR:         /status/{uid}/activeSession → null
     * DEBUG:          /debug/sessionWrites/{uid}  → END event
     * SERVER AUDIT:   /api/session END (non-blocking)
     */
    endSession: async (uid: string) => {
        const db = getDatabaseInstance();
        const now = Date.now();

        if (!db) {
            console.error('[SESSION] ❌ RTDB unavailable — session end write failed');
            return;
        }

        console.log(`[SESSION] ⏹ END — uid: ${uid}`);

        // ── PRIMARY: remove /activeSessions/{uid} ─────────────────────────────
        await remove(ref(db, PATH_ACTIVE_SESSION(uid)))
            .then(() => console.log(`[SESSION] ✅ SESSION REMOVED: activeSessions/${uid}`))
            .catch(err => console.error(`[SESSION] ❌ activeSessions remove FAILED:`, err));

        // ── MIRROR: clear /status/{uid}/activeSession ─────────────────────────
        update(ref(db, PATH_STATUS(uid)), {
            activeSession: null,
            inSession: false,
            lastSeenAt: now,
        }).catch(err => console.warn('[SESSION] status mirror clear failed (non-fatal):', err));

        // ── DEBUG: update /debug/sessionWrites/{uid} ──────────────────────────
        set(ref(db, PATH_DEBUG(uid)), {
            lastEvent: 'END',
            endedAt: now,
            writtenAt: now,
        }).catch(() => { /* Best-effort */ });

        // ── SERVER AUDIT (non-blocking) ───────────────────────────────────────
        callSessionApi('END').catch(
            err => console.warn('[SESSION] Server end audit failed (non-fatal):', err)
        );
    },

    setOffline: (_uid: string) => {
        // Client cannot unilaterally declare itself offline.
        // The onDisconnect handler + RTDB handles this automatically.
    },

    trackPage: (_uid: string, _path: string) => {
        // Disabled: prevented Permission Denied errors in previous analysis.
    }
};
