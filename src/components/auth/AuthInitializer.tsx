'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

/**
 * AuthInitializer
 * 
 * A headless component that mounts once to start the Firebase Auth Listener.
 * This ensures that on page reload, we silently restore the user session
 * without needing every page to check separately.
 */
export function AuthInitializer() {
    const { syncAuth, initializeRealtimeSync, authState } = useStore();
    const initialized = useRef(false);

    // 1. Initial Auth Sync
    useEffect(() => {
        if (!initialized.current) {
            console.log("[System] Initializing Auth Listener...");
            syncAuth();
            initialized.current = true;
        }
    }, [syncAuth]);

    // 2. Real-Time Data Sync when Authenticated
    useEffect(() => {
        if (authState.status === 'AUTHENTICATED' && authState.user) {
            initializeRealtimeSync(authState.user.id);
        }
    }, [authState.status, authState.user?.id, initializeRealtimeSync]);

    return null; // Render nothing
}
