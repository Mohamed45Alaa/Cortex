'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { SegmentType } from '@/core/types';

export const SessionTracker = () => {
    const { activeSession, uiState, logSegment } = useStore();
    const { isMainTimerVisible, activeToolId, isMediaPlaying } = uiState;

    // Config
    const IDLE_THRESHOLD = 60000; // 60s
    const DEBOUNCE_MS = 2000;

    // State Refs
    const lastInteractionRef = useRef<number>(Date.now());
    const currentTypeRef = useRef<SegmentType>('ACTIVE');
    const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // --- 1. INTERACTION LISTENER ---
    useEffect(() => {
        if (!activeSession?.isActive) return;

        const handleInteraction = () => {
            lastInteractionRef.current = Date.now();
            checkState(); // Re-evaluate immediately on interaction
        };

        window.addEventListener('mousemove', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        window.addEventListener('click', handleInteraction);
        window.addEventListener('scroll', handleInteraction);

        return () => {
            window.removeEventListener('mousemove', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
        };
    }, [activeSession?.isActive]);

    // --- 2. CORE LOGIC ---
    const checkState = () => {
        if (!activeSession?.isActive) return;

        const now = Date.now();
        const isHidden = document.hidden;
        const timeSinceInteraction = now - lastInteractionRef.current;

        let newType: SegmentType = 'ACTIVE';

        // PRIORITY 1: DISENGAGED (RED)
        // Hidden AND No Tool -> RED
        if (isHidden && !activeToolId) {
            newType = 'DISENGAGED';
        }
        // PRIORITY 2: TOOL USAGE (BLUE/GREEN)
        // Tool Open -> BLUE (Even if hidden, we assume tool focus)
        // SPECIAL: Player is tracked as TOOL only when media is PLAYING
        else if (activeToolId && activeToolId !== 'player') {
            newType = 'TOOL';
        }
        // PRIORITY 2.5: PLAYER PLAYING (GREEN)
        // Player is open AND media is playing -> GREEN (TOOL)
        else if (activeToolId === 'player' && isMediaPlaying) {
            newType = 'TOOL';
        }
        // PRIORITY 3: IDLE (YELLOW)
        // Player opened but NOT playing OR No Media + No Interaction > 60s -> YELLOW
        else if (
            (activeToolId === 'player' && !isMediaPlaying) ||
            (!isMediaPlaying && timeSinceInteraction > IDLE_THRESHOLD)
        ) {
            newType = 'IDLE';
        }
        // PRIORITY 4: ACTIVE (GREEN)
        // Fallback (Visible + Interaction OR Media Playing)
        else {
            newType = 'ACTIVE';
        }

        // DEBOUNCED UPDATE
        if (newType !== currentTypeRef.current) {
            if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);

            updateTimeoutRef.current = setTimeout(() => {
                // Double check state hasn't flipped back
                if (newType !== currentTypeRef.current) {
                    console.log(`[Tracker] State Change: ${currentTypeRef.current} -> ${newType}`);
                    currentTypeRef.current = newType;
                    logSegment(newType);
                }
            }, DEBOUNCE_MS);
        }
    };

    // --- 3. POLL & REACTION ---
    useEffect(() => {
        if (!activeSession?.isActive) return;

        // Poll for Idle checks every 5s
        const interval = setInterval(checkState, 5000);

        // React to immediate state changes (Visibility default handled by poll/interaction, but let's add specific listeners)
        const handleVisibility = () => checkState();
        document.addEventListener('visibilitychange', handleVisibility);

        // Initial Check
        checkState();

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibility);
            if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
        };
    }, [activeSession?.isActive, activeToolId, isMediaPlaying]);

    // React to store changes immediately
    useEffect(() => {
        checkState();
    }, [activeToolId, isMediaPlaying]);

    return null;
};
