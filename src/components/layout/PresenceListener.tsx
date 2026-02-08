'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { RealtimePresenceService } from '@/core/services/RealtimePresenceService';
import { usePathname } from 'next/navigation';

export const PresenceListener = () => {
    const { authState, activeSession } = useStore();
    const user = authState.user;
    const pathname = usePathname();

    // --- 0. DEV ENVIRONMENT GUARD ---
    // In production, we might want to disable this check or make it robust.
    // For now, we allow localhost to write to RTDB (assuming correct config).

    // --- 1. PRESENCE LAYER (Adaptive Heartbeat) ---
    useEffect(() => {
        if (!user?.id) return;

        // A. Initialize Connection Listeners
        RealtimePresenceService.initialize(user.id);

        // PHASE 2: Init Write Buffer
        import('@/core/services/WriteBufferService').then(({ WriteBufferService }) => WriteBufferService.init());

        // PHASE 4: Auto Archive
        import('@/core/services/ArchiveService').then(({ ArchiveService }) => ArchiveService.runCleanup(user.id));

        // B. State for Smart Engine
        let heartbeatTimer: NodeJS.Timeout | null = null;
        let lastInteraction = Date.now();
        let isIdle = false;

        // C. The Smart Engine
        const scheduleHeartbeat = () => {
            if (heartbeatTimer) clearTimeout(heartbeatTimer);

            const now = Date.now();
            const timeSinceInteraction = now - lastInteraction;
            const IDLE_THRESHOLD = 2 * 60 * 1000; // 2 Minutes

            // DECISION MATRIX
            let interval = 90000; // Default: Browsing (90s)

            // CASE 1: Active Session (High Priority)
            if (activeSession) {
                interval = 25000; // 25s
            }
            // CASE 2: Idle (Stop Heartbeat)
            else if (timeSinceInteraction > IDLE_THRESHOLD) {
                if (!isIdle) {
                    console.log("[Presence] User Idle. halting heartbeat.");
                    isIdle = true;
                    // Optional: Send one last "Idle" status update?
                }
                return; // STOP LOOP
            }

            // Execute Heartbeat
            heartbeatTimer = setTimeout(() => {
                RealtimePresenceService.heartbeat(user.id); // Payload optimized in Service
                scheduleHeartbeat(); // Recurse
            }, interval);
        };

        // D. Interaction Listeners (Resume Logic)
        const handleInteraction = () => {
            lastInteraction = Date.now();
            if (isIdle) {
                console.log("[Presence] User Active. Resuming heartbeat.");
                isIdle = false;
                RealtimePresenceService.heartbeat(user.id, {
                    lastInteraction,
                    activeSessionId: activeSession?.id
                }); // Immediate pulse
                scheduleHeartbeat(); // Restart loop
            }
        };

        // Events to track
        const events = ['mousedown', 'keydown', 'scroll', 'visibilitychange'];
        const throttledInteraction = () => {
            // Simple throttle to avoid spamming Date.now()
            if (Date.now() - lastInteraction > 1000) handleInteraction();
        };

        events.forEach(e => window.addEventListener(e, throttledInteraction));

        // Start Loop
        scheduleHeartbeat();

        // Cleanup
        const handleUnload = () => RealtimePresenceService.setOffline(user.id);
        window.addEventListener('beforeunload', handleUnload);

        return () => {
            events.forEach(e => window.removeEventListener(e, throttledInteraction));
            window.removeEventListener('beforeunload', handleUnload);
            if (heartbeatTimer) clearTimeout(heartbeatTimer);
        };
    }, [user?.id, activeSession?.id]); // Re-run if session status changes (to update interval)

    // --- 2. STUDY STATE LAYER (RTDB) ---
    // Tracks "In Session" status via Session ID persistence
    useEffect(() => {
        if (!user?.id) return;

        if (activeSession) {
            // Start/Update Session in RTDB
            // Writes strict object: { sessionId, lectureId, subjectId, startedAt }
            RealtimePresenceService.startSession(
                user.id,
                activeSession.lectureId,
                activeSession.subjectId
            );
        } else {
            // End Session in RTDB (Atomic Wipe)
            RealtimePresenceService.endSession(user.id);
        }

    }, [user?.id, activeSession?.lectureId, activeSession?.subjectId]);

    // --- 3. FOCUS DETECTION SYSTEM (Non-Invasive) ---
    const { uiState, autoPauseSession, autoResumeSession } = useStore();
    const GRACE_PERIOD_MS = 30000; // 30 Seconds
    const graceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!activeSession) return; // Only track during session

        const handleStateChange = () => {
            const isHidden = document.hidden;
            const hasActiveTool = !!uiState.activeToolId;

            // CLEAR EXISTING TIMER ON ANY STATE CHANGE
            if (graceTimeoutRef.current) {
                clearTimeout(graceTimeoutRef.current);
                graceTimeoutRef.current = null;
            }

            if (isHidden) {
                // USER LEFT TAB
                if (hasActiveTool) {
                    // SAFE: Tool is open, assume intent. Do nothing.
                    console.log("[Focus] Backgrounded but Tool Open (Safe)");
                } else {
                    // RISK: No tool. Start Grace Period.
                    console.log(`[Focus] Backgrounded. Grace period starting (${GRACE_PERIOD_MS}ms)...`);
                    graceTimeoutRef.current = setTimeout(() => {
                        console.log("[Focus] Grace Period Exceeded -> Auto Pause");
                        autoPauseSession();
                    }, GRACE_PERIOD_MS);
                }
            } else {
                // USER RETURNED
                console.log("[Focus] User Returned -> Attempting Resume");
                autoResumeSession(); // Will only resume if isAutoPaused is true
            }
        };

        // Listeners
        document.addEventListener('visibilitychange', handleStateChange);
        window.addEventListener('blur', () => {
            // Optional: Treat blur same as hidden? 
            // Often blur happens when clicking iframe or second monitor. 
            // Let's stick to visibilityState for now as it's more robust for "Tab Switching".
            // If user just clicks a different window on same screen, visibility might stay 'visible'.
            // Strict mode: Treat blur as hidden too?
            // "The system must NOT attempt to detect external websites... Instead, infer intent..."
            // Let's rely on visibilitychange for Tab Switching. Blur is too noisy.
        });
        window.addEventListener('focus', handleStateChange);

        return () => {
            document.removeEventListener('visibilitychange', handleStateChange);
            window.removeEventListener('focus', handleStateChange);
            if (graceTimeoutRef.current) clearTimeout(graceTimeoutRef.current);
        };
    }, [activeSession?.isActive, uiState.activeToolId]);

    return null;
};
