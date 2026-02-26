'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { RealtimePresenceService } from '@/core/services/RealtimePresenceService';
import { getDatabaseInstance } from '@/core/services/firebase';
import { ref, get } from 'firebase/database';
import { usePathname } from 'next/navigation';

export const PresenceListener = () => {
    const { authState, activeSession, restoreSessionFromRTDB } = useStore();
    const user = authState.user;
    const pathname = usePathname();

    // --- 0. SESSION RESTORE ON APP BOOT ──────────────────────────────────────
    // When user opens/reopens the app, check /activeSessions/{uid} in RTDB.
    // If a session exists there, restore it with the ORIGINAL startedAt so the
    // timer continues from where it was — not from zero.
    // Guard: only restore if store doesn't already have an active session.
    useEffect(() => {
        if (!user?.id) return;

        const db = getDatabaseInstance();
        if (!db) return;

        const activeSessionRef = ref(db, `activeSessions/${user.id}`);
        get(activeSessionRef).then((snap) => {
            const sessionData = snap.val();

            if (!sessionData?.startedAt || !sessionData?.lectureId) {
                console.log('[Presence] Boot: no active session in RTDB to restore');
                return;
            }

            // Check if store already has this session running (hot reload / already restored)
            const currentSession = useStore.getState().activeSession;
            if (currentSession?.id === sessionData.sessionId) {
                console.log('[Presence] Boot: session already in store, skipping restore');
                return;
            }

            // ✅ Restore: timer will resume from session.startedAt
            console.log('[Presence] Boot: RESTORING SESSION from /activeSessions →', sessionData.sessionId);
            restoreSessionFromRTDB(sessionData);
        }).catch(err => {
            console.warn('[Presence] Boot: failed to check /activeSessions:', err);
        });

    }, [user?.id]); // Run ONCE when user authenticates

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

            if (activeSession) {
                interval = 5000; // 5s for active session (was 25s)
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
                // Write state directly to RTDB (instant) then send heartbeat via API
                const currentRtdbState = document.hidden ? 'background' : 'online';
                RealtimePresenceService.updateStateImmediate(user.id, currentRtdbState);
                RealtimePresenceService.heartbeat(user.id, { lastInteraction, activeSessionId: activeSession?.id });
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

        // Events to track (interaction tracking only - NOT visibility)
        const generalEvents = ['mousedown', 'keydown', 'scroll'];
        const throttledInteraction = () => {
            // Simple throttle to avoid spamming Date.now()
            if (Date.now() - lastInteraction > 1000) handleInteraction();
        };

        generalEvents.forEach(e => window.addEventListener(e, throttledInteraction));

        // --- IMMEDIATE VISIBILITY CHANGE (New: separate from interaction loop) ---
        // Fires instantly when user switches tabs — does NOT wait for next heartbeat
        const handleVisibilityChange = () => {
            const newState = document.hidden ? 'background' : 'online';
            // DIRECT RTDB write — bypasses HTTP API for instant effect
            RealtimePresenceService.updateStateImmediate(user.id, newState);
            // Also send a full heartbeat (async, non-blocking)
            RealtimePresenceService.heartbeat(user.id, {
                lastInteraction: Date.now(),
                activeSessionId: activeSession?.id
            });
            // Restart heartbeat loop with fresh interval
            handleInteraction();
            scheduleHeartbeat();
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Send initial state immediately on mount (direct RTDB write)
        RealtimePresenceService.updateStateImmediate(user.id, document.hidden ? 'background' : 'online');

        // Start Loop
        scheduleHeartbeat();

        // Cleanup
        const handleUnload = () => RealtimePresenceService.setOffline(user.id);
        window.addEventListener('beforeunload', handleUnload);

        return () => {
            generalEvents.forEach((e: string) => window.removeEventListener(e, throttledInteraction));
            document.removeEventListener('visibilitychange', handleVisibilityChange);
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

    // --- 3. FOCUS DETECTION SYSTEM (Authoritative Engine) ---
    const { uiState, setFocusState, incrementActiveStudyTime } = useStore();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastInputTime = useRef<number>(Date.now());

    useEffect(() => {
        // Track Input for Idle/Disengaged Calculation (Secondary Signal)
        const handleInput = () => {
            lastInputTime.current = Date.now();
        };

        const events = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'];
        events.forEach(e => window.addEventListener(e, handleInput, { passive: true }));

        return () => {
            events.forEach(e => window.removeEventListener(e, handleInput));
        };
    }, []);

    useEffect(() => {
        if (!activeSession || !activeSession.isActive) return;

        // THE ENGINE LOOP (100ms)
        intervalRef.current = setInterval(() => {
            // 1. Gather Signals
            const isMediaPlaying = uiState.playerState.isPlaying;
            const isToolActive = !!uiState.activeToolId; // AI Tools / Translate open = active

            // 2. Determine State
            import('@/core/engines/FocusEngine').then(({ FocusEngine }) => {
                const newState = FocusEngine.determineState(
                    isMediaPlaying,
                    isToolActive,
                    lastInputTime.current
                );

                // 3. Dispatch Updates
                // Only dispatch if changed? Or always to ensure freshness?
                // Dispatching every 100ms to store might be heavy if using strict equality checks.
                // But simplified: Store handles diffing usually.
                // Optimization: Check local state before dispatching?
                // Let's trust Zustand's diffing for now or do a quick check? Used to be safe.
                if (uiState.focusState !== newState) {
                    setFocusState(newState);
                }

                // 4. Accumulate Active Time
                // Only if ACTIVE (Green)
                if (newState === 'ACTIVE') {
                    // 100ms increment
                    incrementActiveStudyTime(100);
                    // Note: This is discrete accumulation. 
                    // Player time might be better source of truth for "Video Time", 
                    // but "Active Study Time" includes Tool usage too.
                    // So we must accumulate wall-clock time WHILE in Active State.
                }
            });

        }, 100);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [activeSession?.isActive, uiState.playerState.isPlaying, uiState.activeToolId, uiState.focusState]);

    return null;
};
