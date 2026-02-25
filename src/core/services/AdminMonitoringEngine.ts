/**
 * AdminMonitoringEngine
 * ─────────────────────────────────────────────────────────────────────────────
 * Singleton that manages RTDB real-time student monitoring.
 *
 * KEY INVARIANT: ALL data caches live at MODULE LEVEL — they survive
 * start() → stop() → start() cycles without losing data.
 *
 * Rules:
 *  • stop() ONLY detaches RTDB listeners. NEVER wipes cache or profiles.
 *  • clearCache() is the ONLY way to wipe profiles. Call it on logout ONLY.
 *  • If RTDB snapshot is empty → do nothing (never overwrite with empty).
 *  • Profiles state can NEVER be reset to [] inside effect cleanup.
 */

import { getDatabaseInstance, getFirestoreInstance } from '@/core/services/firebase';
import { ref, onValue, off } from 'firebase/database';
import { doc, onSnapshot } from 'firebase/firestore';
import { CacheService } from '@/core/services/CacheService';

// ─── TYPES ───────────────────────────────────────────────────────────────────
export type RefreshSpeed = 'realtime' | number;

export interface DashboardData {
    students: any[];
    total: number;
    subscribed: number;
    onlineCount: number;
    stats: {
        onlineCount: number;
        inSessionCount: number;
        backgroundStudyingCount: number;
        offlineRecentCount: number;
        inactiveCount: number;
    };
}

// ─── MODULE-LEVEL PERSISTENT CACHES ─────────────────────────────────────────
// These survive subscribe/stop/re-subscribe cycles. NEVER reset on cleanup.
const _rtdbStatusMap = new Map<string, any>();
const _rtdbUsersMap = new Map<string, any>();
const _firestoreProfileCache = new Map<string, any>();
const _pendingProfileFetches = new Set<string>();
// Real-time Firestore onSnapshot unsubscribe functions per UID
const _profileListeners = new Map<string, () => void>();

// ─── MODULE-LEVEL ENGINE STATE ────────────────────────────────────────────────
let _callback: ((data: DashboardData) => void) | null = null;
let _isRunning = false;

// Refresh throttle (controlled by AdminHeartbeatEngine via setRefreshSpeed())
let _refreshInterval: RefreshSpeed = 'realtime';
let _lastEmitTime = 0;
let _pendingEmitTimer: ReturnType<typeof setTimeout> | null = null;

// Staleness threshold — used ONLY as crash-fallback (network drops with no onDisconnect)
// Default: 5 minutes. Do NOT set below student heartbeat × 3.
// Normal offline detection comes from RTDB state field via onDisconnect — instant.
let _stalenessMs = 5 * 60 * 1000; // 5 minutes

// Stale-checking interval ref
let _stalenessIntervalId: ReturnType<typeof setInterval> | null = null;

// Initial load window — bypass throttle for first 5s after start()
let _startedAt = 0;
const BOOT_WINDOW_MS = 5_000;

// ─── INTERNAL: REAL-TIME FIRESTORE PROFILE LISTENER ─────────────────────────
// Uses onSnapshot so any profile change (by student OR admin) fires immediately.
function _subscribeToProfile(uid: string) {
    if (_profileListeners.has(uid)) return; // Already listening

    const dbFirestore = getFirestoreInstance();
    if (!dbFirestore) return;

    _pendingProfileFetches.add(uid);

    const profileRef = doc(dbFirestore, 'users', uid, 'profile', 'main');
    const unsub = onSnapshot(profileRef, (snap) => {
        if (snap.exists()) {
            const data = snap.data();
            _firestoreProfileCache.set(uid, data);
            CacheService.set(`profile_${uid}`, data, 20);
            _emit(); // Re-render admin dashboard instantly
        }
        _pendingProfileFetches.delete(uid);
    }, (err) => {
        console.warn(`[ADMIN MONITOR] Profile listener error: ${uid}`, err);
        _pendingProfileFetches.delete(uid);
    });

    _profileListeners.set(uid, unsub);
}

// ─── INTERNAL: CORE EMIT ─────────────────────────────────────────────────────
function _doEmit() {
    if (!_callback) return;
    if (!_isRunning) return;

    const combined: any[] = [];
    let stats = {
        onlineCount: 0,
        inSessionCount: 0,
        backgroundStudyingCount: 0,
        offlineRecentCount: 0,
        inactiveCount: 0,
    };

    const NOW = Date.now();
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

    // Populate from both maps
    const allUids = new Set<string>();
    _rtdbUsersMap.forEach((_, key) => allUids.add(key));
    _rtdbStatusMap.forEach((_, key) => allUids.add(key));

    // Safety: if both maps are empty, don't wipe the displayed data
    if (allUids.size === 0) {
        console.log('[ADMIN MONITOR] Prevented State Wipe — snapshot empty, skipping emit');
        return;
    }

    allUids.forEach(uid => {
        const rtdbUser = _rtdbUsersMap.get(uid) || {};
        const rtdbStatus = _rtdbStatusMap.get(uid);
        const fsProfile = _firestoreProfileCache.get(uid);

        // Subscribe to Firestore real-time listener for this student's profile.
        // This fires immediately with current data AND on every future update.
        // One listener per UID — idempotent.
        if (!fsProfile && !rtdbUser.fullName) {
            _subscribeToProfile(uid); // Initial subscription
        } else if (!_profileListeners.has(uid)) {
            _subscribeToProfile(uid); // Attach listener if not yet attached
        }

        // Merge profile: Firestore (real-time, fresh) MUST overwrite RTDB (legacy, stale)
        const profile = { ...rtdbUser, ...fsProfile };

        // Presence
        let rawState = rtdbStatus?.state || 'offline';
        const lastSeen = rtdbStatus?.lastSeenAt || rtdbStatus?.lastChanged || profile.lastLoginAt || 0;
        const timeSinceSeen = NOW - lastSeen;

        // TRUST RTDB STATE — onDisconnect handler writes 'offline' instantly when
        // the student's WebSocket closes. No staleness override needed for normal cases.
        // Staleness is ONLY a fallback for network-crash (onDisconnect delayed > 5min).
        if (timeSinceSeen > _stalenessMs && rawState !== 'offline') {
            rawState = 'offline'; // Crash fallback only
        }

        // Session detection
        const sessionContext = rtdbStatus?.activeSession || rtdbStatus?.currentSession || null;
        const isSessionActive = !!(sessionContext || rtdbStatus?.inSession === true);

        // Classification
        let mode = 'none';
        let sortRank = 7;
        let dotColor = 'gray';
        let statusLabel = 'Offline';

        if (isSessionActive) {
            stats.inSessionCount++;
            if (rawState === 'online') {
                mode = 'in_session'; sortRank = 1; dotColor = 'green'; statusLabel = 'Studying';
                stats.onlineCount++;
            } else if (rawState === 'background') {
                mode = 'background_session'; sortRank = 3; dotColor = 'blue'; statusLabel = 'Background (Studying)';
                stats.backgroundStudyingCount++;
            } else {
                mode = 'offline_session'; sortRank = 5; dotColor = 'purple'; statusLabel = 'Session Open';
            }
        } else {
            if (rawState === 'online') {
                mode = 'browsing'; sortRank = 2; dotColor = 'green'; statusLabel = 'Online (No Session)';
                stats.onlineCount++;
            } else if (rawState === 'background') {
                mode = 'idle'; sortRank = 4; dotColor = 'blue'; statusLabel = 'Background (No Session)';
            } else {
                if (NOW - lastSeen > SEVEN_DAYS_MS) {
                    mode = 'inactive'; sortRank = 8; dotColor = 'red'; statusLabel = 'Inactive';
                    stats.inactiveCount++;
                } else {
                    mode = 'offline_recent'; sortRank = 7; dotColor = 'gray'; statusLabel = 'Offline';
                    stats.offlineRecentCount++;
                }
            }
        }

        // Last seen text
        let lastSeenText = 'Never';
        if (lastSeen > 0) {
            const diff = NOW - lastSeen;
            if (diff < 60000) lastSeenText = 'Just now';
            else if (diff < 3600000) lastSeenText = `${Math.floor(diff / 60000)}m ago`;
            else if (diff < 86400000) lastSeenText = `${Math.floor(diff / 3600000)}h ago`;
            else lastSeenText = `${Math.floor(diff / 86400000)}d ago`;
        }

        const displayName = profile.identity?.fullName || profile.fullName || profile.name || profile.email || `Student (${uid.substring(0, 5)})`;

        combined.push({
            id: uid,
            ...profile,
            name: displayName,
            role: profile.role || 'STUDENT',
            presence: {
                status: rawState,
                lastSeenAt: lastSeen,
                dotStatus: rawState.toUpperCase(),
                currentPage: rtdbStatus?.currentPage || null,
            },
            study: {
                mode,
                sessionActive: isSessionActive,
                lastInteractionAt: lastSeen,
                sessionContext,
                startTime: sessionContext?.startedAt || sessionContext?.startTime || sessionContext?.createdAt || null,
                badge: isSessionActive ? { label: 'In Session', color: 'indigo' } : null,
            },
            dotColor,
            lastSeenText,
            sortRank,
            sortTimestamp: lastSeen,
        });
    });

    combined.sort((a, b) => {
        if (a.sortRank !== b.sortRank) return a.sortRank - b.sortRank;
        return b.sortTimestamp - a.sortTimestamp;
    });

    _callback({
        students: combined,
        total: combined.length,
        subscribed: combined.filter(s => s.isPremium === true).length,
        onlineCount: stats.onlineCount,
        stats,
    });
}

// ─── INTERNAL: THROTTLED DISPATCHER ──────────────────────────────────────────
function _emit() {
    // Always fire immediately during the boot window (first 5s after start())
    const isBooting = Date.now() - _startedAt < BOOT_WINDOW_MS;
    if (_refreshInterval === 'realtime' || isBooting) {
        _doEmit();
        return;
    }
    const now = Date.now();
    const elapsed = now - _lastEmitTime;
    if (elapsed >= _refreshInterval) {
        _lastEmitTime = now;
        _doEmit();
    } else if (!_pendingEmitTimer) {
        _pendingEmitTimer = setTimeout(() => {
            _pendingEmitTimer = null;
            _lastEmitTime = Date.now();
            _doEmit();
        }, (_refreshInterval as number) - elapsed);
    }
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────────
export const AdminMonitoringEngine = {

    /**
     * Start RTDB listeners and begin emitting to callback.
     * Safe to call multiple times — idempotent.
     * Profile cache is PRESERVED from previous sessions.
     */
    start(callback: (data: DashboardData) => void) {
        if (_isRunning) {
            // Already running — just update the callback
            _callback = callback;
            _doEmit(); // Immediately emit current cached state
            return;
        }

        const dbRTDB = getDatabaseInstance();
        if (!dbRTDB) {
            console.error('[ADMIN MONITOR] RTDB init failed');
            return;
        }

        _callback = callback;
        _isRunning = true;
        _startedAt = Date.now(); // Start boot window — all emits for 5s bypass throttle

        console.log('[ADMIN MONITOR] Subscription Started');

        // Emit cached data immediately so UI shows last known state
        if (_rtdbStatusMap.size > 0 || _rtdbUsersMap.size > 0) {
            console.log('[ADMIN MONITOR] Profiles Rehydrated from cache');
            _doEmit();
        }

        const statusRef = ref(dbRTDB, 'status');
        const usersRef = ref(dbRTDB, 'users');

        onValue(statusRef, (snap) => {
            const val = snap.val();
            if (val) {
                // Merge — never clear existing entries on partial snapshot
                Object.keys(val).forEach(key => _rtdbStatusMap.set(key, val[key]));
                _emit();
            } else {
                console.log('[ADMIN MONITOR] Prevented State Wipe — status snapshot null');
            }
        });

        onValue(usersRef, (snap) => {
            const val = snap.val();
            if (val) {
                Object.keys(val).forEach(key => {
                    const d = val[key];
                    const p = d.profile?.main || d.profile || d;
                    _rtdbUsersMap.set(key, p);
                });
                _emit();
            } else {
                console.log('[ADMIN MONITOR] Prevented State Wipe — users snapshot null');
            }
        });

        // No polling interval needed — RTDB onValue fires instantly on any state change.
        // Staleness is checked in _doEmit when onValue fires.
    },

    /**
     * Stop RTDB listeners.
     * DOES NOT wipe profile cache — data survives for next start().
     */
    stop() {
        if (!_isRunning) return;

        const dbRTDB = getDatabaseInstance();
        if (dbRTDB) {
            off(ref(dbRTDB, 'status'));
            off(ref(dbRTDB, 'users'));
        }

        if (_stalenessIntervalId !== null) {
            clearInterval(_stalenessIntervalId);
            _stalenessIntervalId = null;
        }

        if (_pendingEmitTimer !== null) {
            clearTimeout(_pendingEmitTimer);
            _pendingEmitTimer = null;
        }

        _isRunning = false;
        _callback = null;
        console.log('[ADMIN MONITOR] Subscription Stopped — cache preserved');
    },

    /**
     * EXPLICIT LOGOUT ONLY — wipes all cached data.
     * Never call this from effect cleanup.
     */
    clearCache() {
        // Unsubscribe all Firestore profile listeners first
        _profileListeners.forEach(unsub => unsub());
        _profileListeners.clear();

        _rtdbStatusMap.clear();
        _rtdbUsersMap.clear();
        _firestoreProfileCache.clear();
        _pendingProfileFetches.clear();
        _lastEmitTime = 0;
        console.log('[ADMIN MONITOR] Cache Cleared (Logout) — all listeners detached');
    },

    // ─── Speed/Staleness controls (called by AdminHeartbeatEngine) ───────────
    setRefreshSpeed(speed: RefreshSpeed) {
        _refreshInterval = speed;
        _lastEmitTime = 0;
        if (_pendingEmitTimer) {
            clearTimeout(_pendingEmitTimer);
            _pendingEmitTimer = null;
        }
    },

    setStalenessMs(ms: number) {
        _stalenessMs = ms;
    },

    isRunning() { return _isRunning; },
};
