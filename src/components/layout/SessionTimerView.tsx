import React, { useState, useEffect, useRef } from 'react';
import styles from './SingleQuestionView.module.css'; // Reusing layout styles for consistency
import { translations, Language } from '@/core/i18n/translations';
import { useStore } from '@/store/useStore';
import { Play, Pause, Square } from 'lucide-react';

interface SessionTimerViewProps {
    allocatedMinutes: number;
    // We pass lectureId now for persistence
    lectureId: string;
    subjectId: string; // New Prop
    onComplete: (actualMinutes: number) => void;
    lang: Language;
}

export const SessionTimerView: React.FC<SessionTimerViewProps> = ({
    allocatedMinutes,
    lectureId,
    subjectId,
    onComplete,
    lang
}) => {
    const t = translations[lang];
    const { activeSession, startActiveSession, pauseActiveSession, resumeActiveSession, endActiveSession } = useStore();

    // Local display state to avoid jitter from store subscription, although store is fast.
    const [displayTime, setDisplayTime] = useState<number>(0); // ms, start at 00:00:00
    const [isPaused, setIsPaused] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // Initialize or Sync with Store
    useEffect(() => {
        if (!activeSession) {
            // No active session. Reset to 00:00:00
            setHasStarted(false);
            setDisplayTime(0);
        } else {
            // Resuming existing session
            setHasStarted(true);
            setIsPaused(!!activeSession.pausedAt);

            // Calculate current elapsed time
            // Logic: current elapsed = now - start - totalPaused
            // If paused, elapsed = pausedAt - start - totalPaused (captured at pause moment)

            const now = Date.now();
            const effectiveEnd = activeSession.pausedAt || now;
            const elapsed = effectiveEnd - activeSession.startTime - activeSession.totalPausedTime;

            setDisplayTime(Math.max(0, elapsed));
        }
    }, [activeSession, allocatedMinutes]);

    // Timer Loop
    useEffect(() => {
        if (!hasStarted || isPaused || !activeSession) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const elapsed = now - activeSession.startTime - activeSession.totalPausedTime;

            // Stopwatch Mode: Count Up
            setDisplayTime(elapsed);
        }, 200); // 5Hz update

        return () => clearInterval(interval);
    }, [hasStarted, isPaused, activeSession]);

    // Format HH:MM:SS
    const formatTime = (ms: number) => {
        const totalSeconds = Math.ceil(ms / 1000);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        const timeString = `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;

        if (lang === 'ar') {
            return timeString.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
        }
        return timeString;
    };

    // Actions
    const handleStart = () => {
        if (activeSession) {
            // It's a resume
            resumeActiveSession();
        } else {
            // New Start
            startActiveSession(lectureId, allocatedMinutes, subjectId);
        }
        setHasStarted(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        if (activeSession && !activeSession.pausedAt) {
            pauseActiveSession();
            setIsPaused(true);
        }
    };
    const handleStop = () => {
        if (!activeSession) return; // Should not happen if stop enabled

        // 1. Calculate final actual duration (Local Display / Callback only)
        // Store will recalculate for persistence source-of-truth.
        const now = Date.now();
        let endTime = now;
        let finalPaused = activeSession.totalPausedTime;

        if (activeSession.pausedAt) {
            endTime = activeSession.pausedAt;
        }

        const actualDurationMs = endTime - activeSession.startTime - finalPaused;
        const actualMinutes = Math.ceil(actualDurationMs / 1000 / 60);

        // 2. Persist & Clear Store
        endActiveSession(); // <--- CRITICAL FIX: Saves data to 'sessions' array

        // 3. Callback (Updates UI Flow)
        onComplete(Math.max(1, actualMinutes));
    };

    return (
        <div className={styles.container}>
            {/* TIMER DISPLAY */}
            <div style={{
                fontSize: '5rem', // Large
                fontWeight: 700,
                fontFamily: 'monospace', // Tabular
                color: 'var(--foreground)',
                marginBottom: '4rem',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '0.05em',
                textShadow: '0 4px 30px rgba(0,0,0,0.3)'
            }}>
                {formatTime(displayTime)}
            </div>

            {/* EXECUTIVE CONTROLS */}
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>

                {/* GREEN: START / RESUME */}
                <button
                    onClick={handleStart}
                    disabled={hasStarted && !isPaused} // Disable if running
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: 'none',
                        background: '#10B981', // Green
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: (hasStarted && !isPaused) ? 'not-allowed' : 'pointer',
                        opacity: (hasStarted && !isPaused) ? 0.3 : 1,
                        boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: (hasStarted && !isPaused) ? 'scale(0.9)' : 'scale(1)'
                    }}
                >
                    <Play size={32} fill="currentColor" />
                </button>

                {/* YELLOW: PAUSE */}
                <button
                    onClick={handlePause}
                    disabled={!hasStarted || isPaused} // Disable if not started or already paused
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: 'none',
                        background: '#F59E0B', // Yellow
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: (!hasStarted || isPaused) ? 'not-allowed' : 'pointer',
                        opacity: (!hasStarted || isPaused) ? 0.3 : 1,
                        boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    <Pause size={32} fill="currentColor" />
                </button>

                {/* RED: STOP */}
                <button
                    onClick={handleStop}
                    disabled={!hasStarted} // Can't stop what hasn't started
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: 'none',
                        background: '#EF4444', // Red
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: !hasStarted ? 'not-allowed' : 'pointer',
                        opacity: !hasStarted ? 0.3 : 1,
                        boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    <Square size={32} fill="currentColor" />
                </button>
            </div>
        </div>
    );
};
