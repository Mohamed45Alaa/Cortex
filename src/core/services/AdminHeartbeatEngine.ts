/**
 * AdminHeartbeatEngine
 * ─────────────────────────────────────────────────────────────────────────────
 * Singleton that manages the Admin's own heartbeat to /adminPresence/{adminId}.
 *
 * Also controls AdminMonitoringEngine refresh speed + staleness threshold
 * so both engines stay in sync with the admin-selected interval.
 *
 * Rules:
 *  • Admin Mode OFF → ZERO network activity.
 *  • Speed change → immediately clears old interval, starts new one.
 *  • No duplicate intervals. No memory leaks.
 */

import { getDatabaseInstance } from '@/core/services/firebase';
import { ref, update } from 'firebase/database';
import { AdminMonitoringEngine, RefreshSpeed } from '@/core/services/AdminMonitoringEngine';

// ─── APP VERSION ─────────────────────────────────────────────────────────────
const APP_VERSION = '1.0.2';

// ─── SPEED DEFINITIONS ───────────────────────────────────────────────────────
export type AdminSpeedOption = 'instant' | 'default' | '1min' | '5min' | '1hour';

export interface AdminSpeedConfig {
    key: AdminSpeedOption;
    label: string;
    description: string;
    intervalMs: number;
    monitorRefresh: RefreshSpeed;
}

export const ADMIN_SPEED_OPTIONS: AdminSpeedConfig[] = [
    { key: 'instant', label: 'فوري 🔴', description: 'كل ثانية', intervalMs: 1_000, monitorRefresh: 'realtime' },
    { key: 'default', label: 'افتراضي', description: 'كل 25 ثانية', intervalMs: 25_000, monitorRefresh: 25_000 },
    { key: '1min', label: 'دقيقة', description: 'كل دقيقة', intervalMs: 60_000, monitorRefresh: 60_000 },
    { key: '5min', label: '5 دقائق', description: 'كل 5 دقائق', intervalMs: 300_000, monitorRefresh: 300_000 },
    { key: '1hour', label: 'ساعة', description: 'كل ساعة', intervalMs: 3_600_000, monitorRefresh: 3_600_000 },
];

// ─── SINGLETON STATE ─────────────────────────────────────────────────────────
let _adminId: string | null = null;
let _currentSpeed: AdminSpeedOption = 'default';
let _isRunning = false;
let _intervalRef: ReturnType<typeof setInterval> | null = null;

// ─── INTERNAL ────────────────────────────────────────────────────────────────
function _clearTick() {
    if (_intervalRef !== null) {
        clearInterval(_intervalRef);
        _intervalRef = null;
    }
}

function _writePulse() {
    if (!_adminId || !_isRunning) return;
    const db = getDatabaseInstance();
    if (!db) return;
    update(ref(db, `adminPresence/${_adminId}`), {
        lastActive: Date.now(),
        status: 'admin-online',
        updateSpeed: _currentSpeed,
        version: APP_VERSION,
    }).catch(err => console.warn('[ADMIN HEARTBEAT] Write failed:', err));
}

function _applyConfig(config: AdminSpeedConfig) {
    // Speed controls only the dashboard UI refresh rate.
    // Staleness (offline detection) is handled by RTDB onDisconnect natively — always instant.
    // AdminMonitoringEngine has its own fixed 5-min crash-fallback staleness.
    AdminMonitoringEngine.setRefreshSpeed(config.monitorRefresh);
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────────
export const AdminHeartbeatEngine = {

    /** Start heartbeat. Safe to call multiple times. */
    start(adminId: string, speed?: AdminSpeedOption) {
        if (!adminId) return;
        _adminId = adminId;
        _isRunning = true;
        if (speed) _currentSpeed = speed;

        _clearTick();
        const config = ADMIN_SPEED_OPTIONS.find(s => s.key === _currentSpeed)!;
        _applyConfig(config);
        _writePulse(); // Immediate
        _intervalRef = setInterval(_writePulse, config.intervalMs);

        console.log(`[ADMIN HEARTBEAT] Started — Interval: ${config.intervalMs}ms (${config.key}) | Staleness: ${config.intervalMs * 3}ms`);
    },

    /** Stop all activity. Writes admin-offline to RTDB. */
    stop() {
        _clearTick();
        _isRunning = false;

        if (_adminId) {
            const db = getDatabaseInstance();
            if (db) {
                update(ref(db, `adminPresence/${_adminId}`), {
                    status: 'admin-offline',
                    lastActive: Date.now(),
                }).catch(() => { });
            }
        }

        console.log('[ADMIN HEARTBEAT] Stopped');
    },

    /** Change speed while running. Immediately restarts interval. */
    setSpeed(speed: AdminSpeedOption) {
        if (_currentSpeed === speed && _isRunning) return;
        _currentSpeed = speed;

        if (_isRunning && _adminId) {
            _clearTick();
            const config = ADMIN_SPEED_OPTIONS.find(s => s.key === speed)!;
            _applyConfig(config);
            console.log(`[ADMIN HEARTBEAT] Speed Changed → Restarting (${speed}) | Staleness: ${config.intervalMs * 3}ms`);
            _writePulse();
            _intervalRef = setInterval(_writePulse, config.intervalMs);
        }

        try { localStorage.setItem('admin_heartbeat_speed', speed); } catch { }
    },

    getSavedSpeed(): AdminSpeedOption {
        try {
            const saved = localStorage.getItem('admin_heartbeat_speed') as AdminSpeedOption | null;
            if (saved && ADMIN_SPEED_OPTIONS.find(s => s.key === saved)) return saved;
        } catch { }
        return 'default';
    },

    getCurrentSpeed(): AdminSpeedOption { return _currentSpeed; },
    isRunning(): boolean { return _isRunning; },
};
