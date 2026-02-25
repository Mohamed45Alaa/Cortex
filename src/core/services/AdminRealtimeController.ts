/**
 * AdminRealtimeController
 * ─────────────────────────────────────────────────────────────────────────────
 * PRODUCTION-SAFE singleton that manages the Admin Mode heartbeat engine.
 *
 * Rules:
 *  • If admin mode is OFF → ZERO network activity (no reads, no writes).
 *  • If admin mode is ON  → heartbeat writes to /adminPresence/{adminId}
 *    at the selected speed interval.
 *  • Speed change → immediately clears old interval, starts new one.
 *  • No overlapping intervals. No memory leaks.
 */

import { getDatabaseInstance } from '@/core/services/firebase';
import { ref, update, serverTimestamp } from 'firebase/database';
import { AdminMetricsService, RefreshSpeed } from '@/core/services/AdminMetricsService';

// ─── APP VERSION ─────────────────────────────────────────────────────────────
const APP_VERSION = '1.0.2';

// ─── SPEED DEFINITIONS ───────────────────────────────────────────────────────
export type AdminSpeedOption = 'instant' | 'default' | '1min' | '5min' | '1hour';

export interface AdminSpeedConfig {
    key: AdminSpeedOption;
    label: string;
    description: string;
    intervalMs: number;          // heartbeat write interval
    monitorRefresh: RefreshSpeed; // AdminMetricsService refresh speed
}

export const ADMIN_SPEED_OPTIONS: AdminSpeedConfig[] = [
    {
        key: 'instant',
        label: 'فوري 🔴',
        description: 'كل ثانية',
        intervalMs: 1_000,
        monitorRefresh: 'realtime',
    },
    {
        key: 'default',
        label: 'افتراضي',
        description: 'كل 25 ثانية',
        intervalMs: 25_000,
        monitorRefresh: 25_000,
    },
    {
        key: '1min',
        label: 'دقيقة',
        description: 'كل دقيقة',
        intervalMs: 60_000,
        monitorRefresh: 60_000,
    },
    {
        key: '5min',
        label: '5 دقائق',
        description: 'كل 5 دقائق',
        intervalMs: 300_000,
        monitorRefresh: 300_000,
    },
    {
        key: '1hour',
        label: 'ساعة',
        description: 'كل ساعة',
        intervalMs: 3_600_000,
        monitorRefresh: 3_600_000,
    },
];

// ─── SINGLETON STATE ─────────────────────────────────────────────────────────
let _adminId: string | null = null;
let _currentSpeed: AdminSpeedOption = 'default';
let _isRunning = false;
let _heartbeatRef: ReturnType<typeof setInterval> | null = null;

// ─── INTERNAL WRITE ──────────────────────────────────────────────────────────
function _writeHeartbeat() {
    if (!_adminId || !_isRunning) return;

    const db = getDatabaseInstance();
    if (!db) return;

    const path = ref(db, `adminPresence/${_adminId}`);
    const speedConfig = ADMIN_SPEED_OPTIONS.find(s => s.key === _currentSpeed);

    update(path, {
        lastActive: Date.now(), // Use client timestamp to avoid serverTimestamp() async issues
        status: 'admin-online',
        updateSpeed: _currentSpeed,
        version: APP_VERSION,
    }).catch(err => {
        console.warn('[ADMIN HEARTBEAT] Write failed:', err);
    });
}

// ─── INTERNAL CLEANUP ────────────────────────────────────────────────────────
function _clearInterval() {
    if (_heartbeatRef !== null) {
        clearInterval(_heartbeatRef);
        _heartbeatRef = null;
    }
}

// ─── PUBLIC API ──────────────────────────────────────────────────────────────
export const AdminRealtimeController = {

    /**
     * Start the heartbeat engine.
     * Safe to call multiple times — deduplicates automatically.
     */
    start(adminId: string, speed?: AdminSpeedOption) {
        if (!adminId) return;

        _adminId = adminId;
        _isRunning = true;

        if (speed) _currentSpeed = speed;

        // Prevent duplicate intervals
        _clearInterval();

        const config = ADMIN_SPEED_OPTIONS.find(s => s.key === _currentSpeed)!;

        // Configure monitoring refresh rate AND staleness threshold together
        AdminMetricsService.setRefreshInterval(config.monitorRefresh);
        // Staleness = 3 missed heartbeats: if heartbeat is every 1s, stale after 3s, etc.
        AdminMetricsService.setStalenessMs(config.intervalMs * 3);

        // Immediate write on start
        _writeHeartbeat();

        // Start repeating interval
        _heartbeatRef = setInterval(_writeHeartbeat, config.intervalMs);

        console.log(`[ADMIN HEARTBEAT] Started — Interval: ${config.intervalMs}ms (${config.key}) | Staleness: ${config.intervalMs * 3}ms`);
    },

    /**
     * Stop all engine activity.
     * Clears interval + listeners. Sets status to admin-offline in RTDB.
     */
    stop() {
        _clearInterval();
        _isRunning = false;

        // Write offline status
        if (_adminId) {
            const db = getDatabaseInstance();
            if (db) {
                update(ref(db, `adminPresence/${_adminId}`), {
                    status: 'admin-offline',
                    lastActive: Date.now(),
                }).catch(() => { });
            }
        }

        // Reset AdminMetricsService to realtime (no throttle) so it doesn't hold state
        AdminMetricsService.setRefreshInterval('realtime');

        console.log('[ADMIN HEARTBEAT] Stopped');
    },

    /**
     * Change speed while running. Immediately restarts with new interval.
     */
    setSpeed(speed: AdminSpeedOption) {
        if (_currentSpeed === speed && _isRunning) return; // No-op if same

        _currentSpeed = speed;

        console.log(`[ADMIN HEARTBEAT] Speed Changed → Restarting (${speed})`);

        if (_isRunning && _adminId) {
            // Restart with new speed
            _clearInterval();
            const config = ADMIN_SPEED_OPTIONS.find(s => s.key === speed)!;
            AdminMetricsService.setRefreshInterval(config.monitorRefresh);
            AdminMetricsService.setStalenessMs(config.intervalMs * 3);
            console.log(`[ADMIN HEARTBEAT] Speed Changed → Restarting (${speed}) | Staleness: ${config.intervalMs * 3}ms`);
            _writeHeartbeat(); // Immediate pulse
            _heartbeatRef = setInterval(_writeHeartbeat, config.intervalMs);
        }

        // Persist selection
        try { localStorage.setItem('admin_heartbeat_speed', speed); } catch { }
    },

    /** Restore last-used speed from localStorage */
    getSavedSpeed(): AdminSpeedOption {
        try {
            const saved = localStorage.getItem('admin_heartbeat_speed') as AdminSpeedOption | null;
            if (saved && ADMIN_SPEED_OPTIONS.find(s => s.key === saved)) return saved;
        } catch { }
        return 'default';
    },

    getCurrentSpeed(): AdminSpeedOption {
        return _currentSpeed;
    },

    isRunning(): boolean {
        return _isRunning;
    },
};
