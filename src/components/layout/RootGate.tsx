'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import CompleteProfileView from '@/components/profile/CompleteProfileView';
import { MainApp } from '@/components/layout/MainApp';
import { PresenceListener } from '@/components/layout/PresenceListener';

/**
 * ROOT GATE KEEPER
 * 
 * The single source of truth for Application State.
 * Handles Auth Initialization internally.
 */
export default function RootGate() {
    // --- 1. UNCONDITIONAL HOOKS ---
    const { authState, syncAuth, initializeRealtimeSync, isHydrated } = useStore();
    const [isMounted, setIsMounted] = useState(false);

    // Initial Mount & Auth Subscription (RUNS ONCE)
    useEffect(() => {
        setIsMounted(true);
        // Initialize Auth Listener
        syncAuth();
    }, []); // Empty dependency array = Runs once on mount

    // Real-time Data Sync (Optimization: Only when auth'd)
    useEffect(() => {
        if (authState.status === 'AUTHENTICATED' && authState.user?.id) {
            initializeRealtimeSync(authState.user.id);
        }
    }, [authState.status, authState.user?.id]);


    // --- 2. LOADING STATE (Hydration & Auth Check) ---
    // If not mounted (SSR/Hydration) OR Auth is still figuring itself out OR Firestore hasn't probed yet
    if (!isMounted || authState.status === 'LOADING' || !isHydrated) {
        return (
            <div className="fixed inset-0 z-[999999] bg-[#020617] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    // --- 3. STATE MACHINE DECISIONS ---

    // LAW 1: ONBOARDING GATE
    // Only blocked if explicitly FALSE (Brand New User).
    // Undefined (Legacy) -> Allowed (Auto-migrates eventually or ignored).
    if (authState.status === 'AUTHENTICATED' && authState.user?.completed === false) {
        return (
            <>
                <PresenceListener />
                <CompleteProfileView />
            </>
        );
    }

    // LAW 2: DASHBOARD ACCESS
    // Default Fallback
    return (
        <>
            <PresenceListener />
            <MainApp />
        </>
    );
}
