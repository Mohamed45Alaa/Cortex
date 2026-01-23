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
    const { authState, syncAuth, initializeRealtimeSync } = useStore();
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
    // If not mounted (SSR/Hydration) OR Auth is still figuring itself out
    if (!isMounted || authState.status === 'LOADING') {
        return (
            <div className="fixed inset-0 z-[999999] bg-[#020617] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    // --- 3. STATE MACHINE DECISIONS ---
    const isAuth = authState.status === 'AUTHENTICATED';
    // STRICT: Profile is only complete if fullName is present in Store (from Firestore)
    const isProfileComplete = authState.user?.completed === true && !!authState.user?.fullName;

    // SCENARIO A: AUTHENTICATED & INCOMPLETE -> ONBOARDING
    // Strictly isolate "Onboarding" flow so incomplete profiles can't access MainApp
    if (isAuth && !isProfileComplete) {
        return (
            <>
                <PresenceListener />
                <CompleteProfileView />
            </>
        );
    }

    // SCENARIO B: MAIN APPLICATION
    // Renders for both GUESTS and COMPLETE AUTH users.
    // Guests see "Sign In" button (Handled by ControlLayout within MainApp).
    return (
        <>
            <PresenceListener />
            <MainApp />
        </>
    );
}
