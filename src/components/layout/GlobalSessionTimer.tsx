import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { FloatingTimerPill } from '../session/FloatingTimerPill';

/**
 * GLOBAL TIMER OVERLAY
 * 
 * Logic:
 * - Lives at App Root Level (Layout)
 * - Always stays mounted
 * - Watches 'activeSession' from Store (Single Source of Truth)
 * - Watches 'uiState' for visibility triggers (Scroll / Tools)
 * - Renders strict read-only UI
 * 
 * Z-Index: 9999 (Above everything, including Tool Overlays)
 */
export const GlobalSessionTimer: React.FC = () => {
    const { activeSession, uiState } = useStore();
    const { isMainTimerVisible, activeToolId } = uiState;

    const [displayTime, setDisplayTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Derived Visibility State
    // Show if: Session Active AND (Main Timer Hidden OR Tool Open)
    const shouldShow = activeSession && (!isMainTimerVisible || !!activeToolId);

    // [SYNC LOGIC]
    // We run a local interval only when visible to keep UI fresh.
    // We derive time strictly from activeSession start/pause timestamps.
    useEffect(() => {
        if (!activeSession) return;

        setIsPaused(!!activeSession.pausedAt);

        const updateTime = () => {
            const now = Date.now();
            const effectiveEnd = activeSession.pausedAt || now;
            const elapsed = effectiveEnd - activeSession.startTime - activeSession.totalPausedTime;
            setDisplayTime(Math.max(0, elapsed));
        };

        // Initial update
        updateTime();

        // 10Hz Smooth Update Loop (Low CPU, High Responsiveness)
        const interval = setInterval(updateTime, 100);

        return () => clearInterval(interval);
    }, [activeSession, activeSession?.pausedAt, activeSession?.totalPausedTime]);

    // Scroll Handler (To Main Timer)
    const handleScrollToTimer = () => {
        // We need to find the main timer element. 
        // Since we are decoupled, we can use a DOM ID selector.
        // We'll trust SessionTimerView to put an ID on its container or use 'scrollIntoView' on the top.
        // Actually, scrolling to top of page usually brings timer into view in this layout.

        // Strategy: Try to find the timer container, fallback to top.
        // NOTE: SessionTimerView needs an ID.
        const timerEl = document.getElementById('main-session-timer');
        if (timerEl) {
            timerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            // Fallback for isolated layout
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (!shouldShow) return null;

    return (
        <FloatingTimerPill
            ms={displayTime}
            isPaused={isPaused}
            onClick={handleScrollToTimer}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999]"
        />
    );
};
