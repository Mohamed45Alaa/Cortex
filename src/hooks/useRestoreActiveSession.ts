import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

export const useRestoreActiveSession = () => {
    const { authState, activeSession, restoreSessionFromRTDB, endActiveSession } = useStore();
    const router = useRouter();
    const hasChecked = useRef(false);

    useEffect(() => {
        // Only run if authenticated and NO local session
        if (authState.status !== 'AUTHENTICATED' || !authState.user || activeSession) return;
        if (hasChecked.current) return;

        const checkPersistence = async () => {
            hasChecked.current = true;
            try {
                // 1. Call RESTORE Endpoint
                const res = await fetch('/api/session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authState.token}`
                    },
                    body: JSON.stringify({ action: 'RESTORE', payload: {} })
                });

                const data = await res.json();

                if (data.success && data.session) {
                    console.log("[Persistence] Found active session in RTDB. Restoring...");
                    restoreSessionFromRTDB(data.session);
                    // restoreSessionFromRTDB already sets isServerConfirmedSession = true
                } else if (data.isTerminated) {
                    // 2. Handle System Termination (12h / 2h Rules)
                    console.warn("[Persistence] Session was terminated remotely:", data.reason);
                    endActiveSession(false, true, {
                        reason: data.reason,
                        message: data.message,
                        severity: 'warning'
                    });
                } else {
                    // No session found or invalid - ensure flags are reset
                    console.log("[Persistence] No valid session found in RTDB.");
                }


            } catch (e) {
                console.error("[Persistence] Failed to restore session:", e);
            }
        };

        checkPersistence();
    }, [authState.status, activeSession, authState.token, restoreSessionFromRTDB, endActiveSession]);
};
