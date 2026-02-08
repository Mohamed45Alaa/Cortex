'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import CompleteProfileView from '@/components/profile/CompleteProfileView';
import { MainApp } from '@/components/layout/MainApp';
import { SessionGate } from '@/components/gate/SessionGate';
import { useRouter } from 'next/navigation';

export default function AppGate() {
    // 1. ALL Hooks must run unconditionally
    const { authState, syncAuth, healAccount, isHydrated, openAuthModal } = useStore();
    const [isMounted, setIsMounted] = useState(false);
    const [isRecovering, setIsRecovering] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
        syncAuth(); // Ensure auth is synced on mount which triggers loadUserData
    }, []);

    // RECOVERY MIDDLEWARE
    useEffect(() => {
        // Condition: Auth is valid, Hydration done, but User Profile is missing (null)
        if (authState.status === 'AUTHENTICATED' && isHydrated && authState.user === null) {
            console.warn("[AppGate] 🚨 Profile Missing. Auto-Healing from Auth...");
            setIsRecovering(true);

            // Attempt to heal using store action (which calls API or rebuilds state)
            healAccount()
                .then(() => {
                    console.log("[AppGate] ✅ Healing Successful. Reloading...");
                    window.location.reload();
                })
                .catch(err => {
                    console.error("[AppGate] ❌ Healing Failed:", err);
                    // Force logout if healing fails to avoid infinite loop
                    // logout(); 
                    setIsRecovering(false);
                });
        }
    }, [authState.status, isHydrated, authState.user, healAccount]);

    // AUTH REDIRECT
    useEffect(() => {
        // Allow time for auth to settle or redirect?
        // If strictly unauthenticated (GUEST) after loading, redirect.
        if (isMounted && authState.status === 'GUEST') {
            openAuthModal('LOGIN');
            router.replace('/');
        }
    }, [isMounted, authState.status, router, openAuthModal]);

    // 2. Loading State (prevent flicker)
    if (!isMounted || (authState.status === 'LOADING' && !isHydrated) || isRecovering) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center flex-col gap-4">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                {isRecovering && <p className="text-indigo-400 text-sm animate-pulse">Recovering Account Structure...</p>}
            </div>
        );
    }

    // 3. Logic: Determine which tree to render
    const isAuthenticated = authState.status === 'AUTHENTICATED';
    // const isProfileComplete = authState.user?.completed === true; // Ensure optional chaining

    // 4. Render ONE of the trees
    // If Authenticated AND Profile Incomplete -> Show Onboarding
    // Note: If profile is missing (null), and we passed recovery, we treat as incomplete or handle above.
    if (isAuthenticated && authState.user && authState.user.completed === false) {
        return <CompleteProfileView />;
    }

    // Otherwise -> Show Main App (Login screen logic is handled inside MainApp flow or layout)
    return (
        <SessionGate>
            <MainApp />
        </SessionGate>
    );
}
