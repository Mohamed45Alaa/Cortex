'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import CompleteProfileView from '@/components/profile/CompleteProfileView';
import { MainApp } from '@/components/layout/MainApp';

export default function AppGate() {
    // 1. ALL Hooks must run unconditionally
    const { authState, syncAuth } = useStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        syncAuth(); // Ensure auth is synced on mount
    }, []);

    // 2. Loading State (prevent flicker)
    if (!isMounted) return null; // Or a loading spinner

    // 3. Logic: Determine which tree to render
    const isAuthenticated = authState.status === 'AUTHENTICATED';
    const isProfileComplete = authState.user?.completed === true;

    // 4. Render ONE of the trees
    // If Authenticated AND Profile Incomplete -> Show Onboarding
    if (isAuthenticated && authState.user && !isProfileComplete) {
        return <CompleteProfileView />;
    }

    // Otherwise -> Show Main App (Login screen logic is handled inside MainApp flow or layout)
    // Note: If user is NOT authenticated, MainApp usually handles showing the "Login" flow or Question 1.
    return <MainApp />;
}
