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

    // --- 1. PRESENCE LAYER (RTDB) ---
    useEffect(() => {
        if (!user?.id) return;

        // A. Initialize Connection Listeners (Kill Switch)
        RealtimePresenceService.initialize(user.id);

        // B. Visibility Handler (Online <-> Background)
        const handleVisibility = () => {
            const status = document.hidden ? 'background' : 'online';
            RealtimePresenceService.updateState(user.id, status);
        };
        document.addEventListener('visibilitychange', handleVisibility);

        // C. Heartbeat Loop (30s)
        // GLOBAL PRESENCE: Unconditionally send heartbeat every 30s
        const heartbeat = setInterval(() => {
            RealtimePresenceService.heartbeat(user.id);
        }, 30000); // 30s (Half of Server TTL to be safe)

        // D. Cleanup (Offline)
        const handleUnload = () => {
            RealtimePresenceService.setOffline(user.id);
        };
        window.addEventListener('beforeunload', handleUnload);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
            window.removeEventListener('beforeunload', handleUnload);
            clearInterval(heartbeat);
        };
    }, [user?.id]);

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

    // Track Page Changes as Interactions
    useEffect(() => {
        if (user?.id) {
            RealtimePresenceService.trackPage(user.id, pathname);
        }
    }, [pathname, user?.id]);

    return null;
};
