'use client';

import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface Props {
    children: React.ReactNode;
}

/**
 * ADMIN AUTHORITY GATE
 * 
 * A strict security boundary that prevents ANY child component from mounting
 * until the user is definitively verified as an Admin.
 * 
 * Philosophy:
 * - Silent Denial: If not logged in, wait or redirect.
 * - Explicit Verification: Role must be 'ADMIN'.
 * - No Leaks: Children are null until verified.
 */
export const AdminAuthorityGate = ({ children }: Props) => {
    const { authState, openAuthModal } = useStore();
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // 1. Wait for Auth Initialization
        if (authState.status === 'LOADING') {
            return;
        }

        // 2. Check Identity
        const user = authState.user;

        if (!user) {
            console.warn('[AdminGate] Access Denied: No User');
            // Allow time for auth to settle or redirect?
            // If strictly unauthenticated after loading, redirect.
            if (authState.status === 'GUEST') {
                openAuthModal('LOGIN');
                router.replace('/');
            }
            setIsChecking(false);
            return;
        }

        // 3. Check Privilege (Role-Based Access Control)
        if (user.role !== 'ADMIN') {
            console.error('[AdminGate] Security Violation: Non-Admin User attempted access', user.id);
            setIsChecking(false);
            return; // Render Unauthorized
        }

        // 4. Authority Established
        console.log('[AdminGate] Authority Context Established. Granting Access.');
        setIsVerified(true);
        setIsChecking(false);

    }, [authState.status, authState.user?.id, authState.user?.role, router]);

    // RENDER STATES

    // A. LOADING (Establishing Context)
    // We show this while Auth is loading OR while we are verifying the role.
    if (isChecking || authState.status === 'LOADING') {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#0B1120] text-slate-400">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin text-indigo-500" size={32} />
                    <span className="text-xs font-mono tracking-widest uppercase opacity-70">Verifying Authority</span>
                </div>
            </div>
        );
    }

    // B. UNAUTHORIZED (Access Denied)
    if (!isVerified) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#0B1120] text-red-500">
                <div className="flex flex-col items-center gap-4 p-8 border border-red-900/30 bg-red-900/10 rounded-2xl">
                    <ShieldAlert size={48} />
                    <h1 className="text-xl font-bold tracking-tight text-red-400">Restricted Area</h1>
                    <p className="text-sm text-red-400/60 font-mono">Insufficient Privileges</p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded text-xs uppercase tracking-wide transition-colors"
                    >
                        Return to Safety
                    </button>
                </div>
            </div>
        );
    }

    // C. GRANTED (Render Protected Content)
    return <>{children}</>;
};
