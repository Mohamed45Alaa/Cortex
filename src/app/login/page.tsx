"use client";

import React from 'react';
import { AuthModal } from '@/components/auth/AuthModal'; // Assuming specific login component or reusing AuthModal logic
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { authState } = useStore();
    const router = useRouter();

    React.useEffect(() => {
        if (authState.status === 'AUTHENTICATED') {
            if (authState.user?.completed) {
                router.replace('/dashboard');
            } else {
                router.replace('/onboarding/academic');
            }
        }
    }, [authState.status, authState.user?.completed, router]);

    return (
        <div className="min-h-screen bg-[#0f1523] flex items-center justify-center">
            <AuthModal
                open={true}
                initialMode="LOGIN"
                onClose={() => { }}
                onSuccess={() => {
                    const currentUser = useStore.getState().authState.user;
                    if (currentUser?.completed) {
                        router.push('/dashboard');
                    } else {
                        router.push('/onboarding/academic');
                    }
                }}
            />
        </div>
    );
}
