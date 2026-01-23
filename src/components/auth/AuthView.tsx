'use client';

import { AuthModal } from './AuthModal';

/**
 * AuthView
 * 
 * Wraps the AuthModal in a persistent state for the RootGate "GUEST" route.
 * This effectively turns the modal into a full page Login Screen.
 */
export function AuthView() {
    return (
        <div className="fixed inset-0 w-screen h-screen bg-[#020617] overflow-hidden">
            {/* Ambient Background (Matches Onboarding Vibe) */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-indigo-500/[0.06] blur-[120px] pointer-events-none" />

            {/* Render Modal - Forced Open */}
            <AuthModal
                open={true}
                onClose={() => { /* Prevent Closing */ }}
                initialMode="LOGIN"
            />
        </div>
    );
}
