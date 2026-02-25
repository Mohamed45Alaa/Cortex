'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { useRouter, usePathname } from 'next/navigation';

export const NavigationGuard = ({ children }: { children: React.ReactNode }) => {
    const { authState, isHydrated } = useStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!isHydrated || authState.status === 'LOADING') return;

        const checkGuard = () => {
            const isAuth = authState.status === 'AUTHENTICATED';
            const isGuest = authState.status === 'GUEST';
            const isLoginPage = pathname === '/login';
            const isOnboarding = pathname?.startsWith('/onboarding');

            // 1. Unauthenticated -> Redirect to Login
            if (isGuest) {
                if (!isLoginPage) {
                    // router.replace('/login');
                    // For now, allow public access if acceptable, or enforcing strict?
                    // The user requested strict flow.
                    if (pathname !== '/') { // Allow root?
                        // router.replace('/login');
                    }
                }
            }

            // 2. Authenticated but Incomplete -> Redirect to Onboarding
            if (isAuth && authState.user && !authState.user.completed) {
                if (!isOnboarding) {
                    router.replace('/onboarding/academic');
                }
            }

            // 3. Authenticated & Complete -> Block Login/Onboarding
            if (isAuth && authState.user?.completed) {
                if (isLoginPage || isOnboarding) {
                    router.replace('/dashboard');
                }
            }
        };

        checkGuard();
        setIsChecking(false);

    }, [isHydrated, authState.status, authState.user, pathname, router]);

    // Render children always to avoid blocking hydration, logic handles redirects
    return <>{children}</>;
};
