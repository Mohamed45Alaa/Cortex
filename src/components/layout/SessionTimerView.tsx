import React, { useState, useEffect, useRef } from 'react';
import styles from './SessionTimerView.module.css'; // NEW MODULE
import { SessionAnalysisView } from '@/components/analysis/SessionAnalysisView';

import { InSessionTools } from '../session/InSessionTools';
import { FloatingTimerPill } from '../session/FloatingTimerPill';
import { translations, Language } from '@/core/i18n/translations';
import { useStore } from '@/store/useStore';
import { Play, Pause, Square } from 'lucide-react';
import { StudySession, LectureStudyMode } from '@/core/types';
import { getModeLabel, getModeIcon } from '@/lib/studyModeHelpers';

interface SessionTimerViewProps {
    allocatedMinutes: number;
    // We pass lectureId now for persistence
    lectureId: string;
    subjectId: string; // New Prop
    onComplete: (session: StudySession) => void;
    lang: Language;
}

export const SessionTimerView: React.FC<SessionTimerViewProps> = ({
    allocatedMinutes,
    lectureId,
    subjectId,
    onComplete,
    lang
}) => {
    // ... (rest of imports/vars) ...

    const t = translations[lang];
    const { activeSession, startActiveSession, pauseActiveSession, resumeActiveSession, endActiveSession, lectures } = useStore();

    // Local display state to avoid jitter from store subscription, although store is fast.
    const [displayTime, setDisplayTime] = useState<number>(0); // ms, start at 00:00:00
    const [isPaused, setIsPaused] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // [STABILIZATION] Refs for Timer Loop (Prevents Render Storm)
    const sessionRef = useRef(activeSession);
    const pausedRef = useRef(isPaused);

    // Sync Refs (Cheap, no re-render loop triggers)
    useEffect(() => {
        sessionRef.current = activeSession;
        pausedRef.current = isPaused;
    }, [activeSession, isPaused]);

    // Initialize or Sync with Store (Keep this for initial hydrate)
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
            const now = Date.now();
            const effectiveEnd = activeSession.pausedAt || now;
            const elapsed = effectiveEnd - activeSession.startTime - activeSession.totalPausedTime;

            setDisplayTime(Math.max(0, elapsed));
        }
    }, [activeSession, allocatedMinutes]);

    // STABLE TIMER LOOP (1Hz)
    useEffect(() => {
        if (!hasStarted) return;

        const interval = setInterval(() => {
            const session = sessionRef.current;
            // Valid session and NOT paused
            if (!session || pausedRef.current) return;

            const now = Date.now();

            // [FIX] CALCULATION LOGIC: now - start - totalPaused
            // Use activeSession from store as source of truth if possible, or ref? 
            // sessionRef is reliable.
            // If session.pausedAt is set, we don't count current time delta since pause? 
            // Logic: If paused, pausedRef is true, we return early. 
            // So if here, we run.

            const elapsed = now - session.startTime - session.totalPausedTime;

            setDisplayTime(elapsed);

            // 12-hour safety cap
            if (elapsed > 43200000) {
                endActiveSession(true);
            }
        }, 1000); // 1Hz — stable & sufficient

        return () => clearInterval(interval);
    }, [hasStarted]);

    // Format HH:MM:SS
    const formatTime = (ms: number) => {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        const timeString = `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
        return timeString;
    };



    // Results State
    const [finalSession, setFinalSession] = useState<StudySession | null>(null);
    const [showAnalysis, setShowAnalysis] = useState(false);

    // [HARDENING] Immediate React to Termination State
    const { terminationState, sessions } = useStore();

    useEffect(() => {
        if (terminationState) {
            // [UX FIX] If terminated externally, the session is likely gone from the store (Hard Abort).
            // Do NOT fetch the last session (it might be yesterday's).
            // Instead, construct a Synthetic Result based on LOCAL state.

            // Calculate accurate elapsed time from local tracker
            const finalDurationMs = displayTime > 0 ? displayTime : 0;
            const finalDurationMinutes = Math.max(1, Math.floor(finalDurationMs / 60000));

            // Create Synthetic Session for Display Only
            const syntheticSession = {
                id: 'terminated-session',
                subjectId: subjectId,
                lectureId: lectureId,
                date: new Date().toISOString(),
                startTime: activeSession?.startTime || Date.now(),
                endTime: Date.now(), // Estimate
                status: 'FORCED_END',
                expectedDuration: allocatedMinutes,
                actualDuration: finalDurationMinutes,
                cognitiveCost: 0,
                performanceIndex: 0,
                performanceGrade: '-', // Distinct from D
                isValid: false,
                isValidForMetrics: false,
                endedBy: 'ADMIN', // or SYSTEM, inferred
                focusPerformance: 0,
                parentId: activeSession?.lectureId, // Explicit mapping
                segments: [],
                collectionRate: 0
            } as StudySession;

            console.warn("[SessionTimer] displaying Synthetic Result for Terminated Session:", syntheticSession);
            setFinalSession(syntheticSession);

            setHasStarted(false);
            setIsPaused(false);
        }
    }, [terminationState]); // Remove 'sessions' dependency to avoid reacting to unrelated store updates


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

        // 2. Persist to Store & GET THE RESULT DIRECTLY
        const completedSession = endActiveSession();

        // 3. Display Result Immediately
        if (completedSession) {
            console.log("[SessionTimer] Session completed successfully:", completedSession.id);
            setFinalSession(completedSession);
        } else {
            console.warn("[SessionTimer] Session was discarded (phantom or invalid). Returning to dashboard.");
            // Session was discarded - call onComplete with a minimal session object
            // to trigger dashboard return without crashing
            onComplete({
                id: 'discarded',
                lectureId: '',
                subjectId: '',
                startTime: Date.now(),
                endTime: Date.now(),
                actualDuration: 0,
                expectedDuration: 0,
                cognitivePerformance: 0,
                isActive: false,
                segments: [],
                status: 'INTERRUPTED',
                totalPausedTime: 0,
                cognitiveCost: 0,
                performanceGrade: 'D',
                isValid: false
            } as any);
        }
    };

    const handleExit = () => {
        if (finalSession) {
            onComplete(finalSession);
        } else {
            // Safety: If somehow handleExit is called without finalSession
            console.warn("[SessionTimer] handleExit called without finalSession");
        }
    };

    // [FLOATING TIMER] Scroll/Visibility Detection with Store Sync
    const timerRef = useRef<HTMLDivElement>(null);
    const { setMainTimerVisibility } = useStore();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Sync with Global Store
                // We use a small delay to prevent flickering during rapid scroll
                setMainTimerVisibility(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (timerRef.current) observer.observe(timerRef.current);

        // Cleanup: active session might unmount, ensure we reset visibility to TRUE (default)
        return () => {
            observer.disconnect();
            setMainTimerVisibility(true);
        };
    }, []);

    // Get lecture data for mode info
    const currentLecture = lectures.find(l => l.id === lectureId);
    const studyMode = currentLecture?.studyMode || 'standard';
    const customExpectedTime = currentLecture?.customExpectedTime || allocatedMinutes;

    if (finalSession) {
        if (showAnalysis) {
            // [STEP 2] RENDER ANALYSIS VIEW
            return (
                <div className="fixed inset-0 z-[200] bg-[#020617] overflow-auto">
                    <SessionAnalysisView
                        session={finalSession}
                        onClose={handleExit}
                    />
                </div>
            );
        } else {
            // [STEP 1] RESTORED SESSION COMPLETE CARD
            // Extract Metrics safely
            const grade = finalSession.performanceGrade || 'B';
            // cognitiveCost is already 0-10 scale
            const displayIndex = finalSession.cognitiveCost || 0;
            const duration = finalSession.actualDuration || 0;

            return (
                <div className={styles.container}>
                    <div className={styles.reportCard}>
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

                        <div className={styles.reportHeader} style={{ color: grade === '-' ? '#EF4444' : undefined }}>
                            {grade === '-' ? 'SESSION TERMINATED' : 'SESSION COMPLETE'}
                        </div>

                        <div className={styles.gradeDisplay}>
                            <span className={styles.gradeLabel}>
                                {grade === '-' ? 'STATUS' : 'PERFORMANCE GRADE'}
                            </span>
                            <span className={styles.gradeValue} style={{ fontSize: grade === '-' ? '2rem' : undefined, color: grade === '-' ? '#EF4444' : undefined }}>
                                {grade === '-' ? 'FORCE END' : grade}
                            </span>
                        </div>

                        <div className={styles.indexDisplay}>
                            <span className={styles.indexLabel}>COGNITIVE INDEX</span>
                            <span className={styles.indexValue}>{displayIndex.toFixed(1)}</span>
                        </div>

                        <div className={styles.statsRow}>
                            <div>⏱ {duration} min</div>
                            <div>🎯 Target: {allocatedMinutes} min</div>
                        </div>

                        <button
                            className={styles.dismissBtn}
                            onClick={() => setShowAnalysis(true)}
                        >
                            GO TO ANALYSIS
                        </button>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className={styles.container}>
            {/* GLOBAL FLOATING TIMER is now handled by GlobalSessionTimer.tsx at App Root.
                We no longer render it here to avoid z-index/stacking context issues.
            */}

            {/* TIMER DISPLAY (Source of Truth for Intersection) */}
            <div id="main-session-timer" className={styles.timerDisplay} ref={timerRef}>
                {formatTime(displayTime)}
            </div>

            {/* PROGRESS BAR (LTR) */}
            <div className="w-full max-w-md mx-auto mb-6 px-4">
                <div className="flex justify-between text-xs text-slate-400 font-mono mb-1">
                    <span>Start</span>
                    <span>End</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-500 transition-all duration-1000 ease-linear"
                        style={{
                            width: `${Math.min(100, (displayTime / (allocatedMinutes * 60 * 1000)) * 100)}%`
                        }}
                    />
                </div>
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

            {/* IN-SESSION TOOLS PANEL (Receives Timer State) */}
            {activeSession && (
                <InSessionTools
                    elapsedTime={displayTime}
                    isPaused={isPaused}
                />
            )}
        </div>
    );
};
