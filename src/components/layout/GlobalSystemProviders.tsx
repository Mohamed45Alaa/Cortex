'use client';

import React from 'react';
import { PresenceListener } from '@/components/layout/PresenceListener';
import { GlobalSessionTimer } from '@/components/layout/GlobalSessionTimer';
import { SessionTracker } from '@/components/session/SessionTracker';

export const GlobalSystemProviders = ({ children }: { children: React.ReactNode }) => {
    // This component handles global subsystems that must be active
    // regardless of the specific view (Auth, Onboarding, MainApp)

    return (
        <>
            <PresenceListener />
            <GlobalSessionTimer />
            <SessionTracker />
            {children}
        </>
    );
};
