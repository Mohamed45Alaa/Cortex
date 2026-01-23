import React, { useState, useEffect, useRef } from 'react';
import styles from './SessionTimerView.module.css'; // NEW MODULE
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

            // 12-Hour Limit Check (43,200,000 ms)
            if (elapsed > 43200000) {
                // Trigger Penalty End
                endActiveSession(true);
                if (typeof window !== 'undefined') {
                    window.alert("Session exceeded 12 hours limit! You forgot the timer. (Grade C Assigned)");
                }
            }
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



    // Results State
    const [sessionResult, setSessionResult] = useState<{ grade: string; index: number; duration: number } | null>(null);

    // [HARDENING] Immediate React to Termination State
    // If the store says "Terminated", we MUST show the screen, even if activeSession is null.
    // The previous logic relied on local `sessionResult`. We need to hydrate it.
    const { terminationState } = useStore();

    useEffect(() => {
        if (terminationState) {
            // Force Show Result Screen
            setSessionResult({
                grade: 'N/A', // Default for interrupted
                index: 0.0,
                duration: Math.max(1, Math.round(displayTime / 1000 / 60))
            });
            setHasStarted(false);
            setIsPaused(false);
        }
    }, [terminationState, displayTime]);


    // Format Expected Time
    const formatExpectedTime = (minutes: number) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        let timePart = '';
        if (h > 0) timePart += `${h} ${t.hours || 'hours'} `;
        if (m > 0 || h === 0) timePart += `${m} ${t.minutes || 'minutes'}`;
        return `Expected study time for this lecture is '${timePart.trim()}'`;
    };

    // Actions
    const handleStart = () => {
        if (activeSession) {
            resumeActiveSession();
        } else {
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
        if (!activeSession) return;

        // 1. Calculate final actual duration (Local Display)
        const now = Date.now();
        let endTime = now;
        let finalPaused = activeSession.totalPausedTime;
        if (activeSession.pausedAt) endTime = activeSession.pausedAt;
        const actualDurationMs = endTime - activeSession.startTime - finalPaused;
        const actualMinutes = Math.max(1, Math.round(actualDurationMs / 1000 / 60));

        // 2. Persist to Store
        endActiveSession();

        // 3. Display Result (Delayed for store update simulation)
        setTimeout(() => {
            const currentSessions = useStore.getState().sessions;
            const lastSession = currentSessions[currentSessions.length - 1];
            if (lastSession) {
                setSessionResult({
                    grade: (lastSession as any).grade || 'B',
                    index: (lastSession as any).performanceIndex ? (lastSession as any).performanceIndex / 10 : 8.5,
                    duration: actualMinutes
                });
            }
        }, 50);
    };

    const handleDismissReport = () => {
        if (sessionResult) {
            onComplete(sessionResult.duration);
        }
    };

    if (sessionResult) {
        return (
            <div className={styles.container}>
                <div className={styles.reportCard}>

                    {/* [HARDENING] RED WARNING BANNER */}
                    {terminationState && (
                        <div style={{
                            backgroundColor: '#EF4444',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '16px',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            border: '1px solid #B91C1C',
                            boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.3)'
                        }}>
                            <div>⚠️ SESSION NOTICE</div>
                            <div style={{ fontSize: '11px', fontWeight: 'normal', marginTop: '4px' }}>
                                {terminationState.message}
                            </div>
                            <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.9 }}>
                                Progress saved. No penalties applied.
                            </div>
                        </div>
                    )}

                    <div className={styles.reportHeader}>SESSION COMPLETE</div>

                    <div className={styles.gradeDisplay}>
                        <span className={styles.gradeLabel}>PERFORMANCE GRADE</span>
                        <span className={styles.gradeValue}>{sessionResult.grade}</span>
                    </div>

                    <div className={styles.indexDisplay}>
                        <span className={styles.indexLabel}>COGNITIVE INDEX</span>
                        <span className={styles.indexValue}>{sessionResult.index.toFixed(1)}</span>
                    </div>

                    <div className={styles.statsRow}>
                        <div>⏱ {sessionResult.duration} min</div>
                        <div>🎯 Target: {allocatedMinutes} min</div>
                    </div>

                    <button className={styles.dismissBtn} onClick={handleDismissReport}>
                        RETURN TO DASHBOARD
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* TIMER DISPLAY */}
            <div className={styles.timerDisplay}>
                {formatTime(displayTime)}
            </div>

            {/* EXECUTIVE CONTROLS */}
            <div className={styles.controls}>

                {/* GREEN: START / RESUME */}
                <button
                    onClick={handleStart}
                    disabled={hasStarted && !isPaused}
                    className={`${styles.controlBtn} ${styles.btnStart}`}
                    style={{
                        cursor: (hasStarted && !isPaused) ? 'not-allowed' : 'pointer',
                        opacity: (hasStarted && !isPaused) ? 0.3 : 1,
                        transform: (hasStarted && !isPaused) ? 'scale(0.9)' : 'scale(1)'
                    }}
                >
                    <Play fill="currentColor" />
                </button>

                {/* YELLOW: PAUSE */}
                <button
                    onClick={handlePause}
                    disabled={!hasStarted || isPaused}
                    className={`${styles.controlBtn} ${styles.btnPause}`}
                    style={{
                        cursor: (!hasStarted || isPaused) ? 'not-allowed' : 'pointer',
                        opacity: (!hasStarted || isPaused) ? 0.3 : 1,
                    }}
                >
                    <Pause fill="currentColor" />
                </button>

                {/* RED: STOP */}
                <button
                    onClick={handleStop}
                    disabled={!hasStarted}
                    className={`${styles.controlBtn} ${styles.btnStop}`}
                    style={{
                        cursor: !hasStarted ? 'not-allowed' : 'pointer',
                        opacity: !hasStarted ? 0.3 : 1,
                    }}
                >
                    <Square fill="currentColor" />
                </button>
            </div>

            {/* EXPECTED TIME DISPLAY (Moved Below Controls) */}
            <div className={styles.expectedTime}>
                {displayTime > allocatedMinutes * 60 * 1000 ? (
                    <span style={{ color: '#F87171', fontWeight: 600, animation: 'pulse 2s infinite' }}>
                        Expected time finished. Continue studying freely — time is still recorded.
                    </span>
                ) : (
                    formatExpectedTime(allocatedMinutes)
                )}
            </div>
        </div>
    );
};
