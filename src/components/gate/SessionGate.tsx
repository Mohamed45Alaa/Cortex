'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

/**
 * SessionGate - HARD SESSION LOCK (State-Based)
 * 
 * This app uses STATE-BASED routing (FlowEngine context), NOT Next.js routes.
 * When activeSession exists, MainApp.tsx automatically forces STUDY_EXECUTION state.
 * 
 * MainApp.tsx logic (line 59-65):
 * - Detects activeSession
 * - Forces context.currentState = 'STUDY_EXECUTION'
 * 
 * This gate ensures activeSession persists via:
 * - useRestoreActiveSession hook (runs on bootstrap)
 * - Zustand persistence (localStorage)
 * 
 * HARD LOCK enforced by MainApp state logic, not routing redirects.
 */
export function SessionGate({ children }: { children: React.ReactNode }) {
    const { activeSession, creationWindowUntil } = useStore();

    useEffect(() => {
        const now = Date.now();

        // Log session state for debugging
        if (activeSession) {
            const inCreationWindow = now < creationWindowUntil;
            console.log(`[SessionGate] Active session detected:`, {
                lectureId: activeSession.lectureId,
                inCreationWindow,
                startTime: new Date(activeSession.startTime).toISOString()
            });
        } else {
            console.log("[SessionGate] No active session. Free navigation.");
        }

    }, [activeSession, creationWindowUntil]);

    // SessionGate doesn't redirect - state locking happens in MainApp
    return <>{children}</>;
}
