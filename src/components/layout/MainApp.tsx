"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // NEW
import { FlowEngine, FlowContext } from '@/core/engines/FlowEngine';
import { SingleQuestionView } from '@/components/layout/SingleQuestionView';
import { ControlLayout } from '@/components/dashboard/ControlLayout';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { SubjectDetailView } from '@/components/dashboard/SubjectDetailView';
import { SubjectSettingsView } from '@/components/dashboard/SubjectSettingsView';
import { SessionTimerView } from '@/components/layout/SessionTimerView';
import { HistoryView } from '@/components/history/HistoryView';
import { SystemConfigView } from '@/components/dashboard/SystemConfigView';
import { AccountSettingsView } from '@/components/dashboard/AccountSettingsView';
import { ToolsView } from '@/components/dashboard/ToolsView';
import { AcademicStructureEngine } from '@/core/engines/AcademicStructureEngine';
import { PreStudyEngine } from '@/core/engines/PreStudyEngine';
import { StudentProfilerEngine } from '@/core/engines/StudentProfilerEngine';
import { EndSessionEngine } from '@/core/engines/EndSessionEngine';
import { CapacityEngine } from '@/core/engines/CapacityEngine';
import { useStore } from '@/store/useStore';
import { translations, Language } from '@/core/i18n/translations';
import { Lecture, StudySession, LectureStudyMode } from '@/core/types';
import { StudyModeSelector } from '@/components/dashboard/StudyModeSelector';
import { ModeWarningModal } from '@/components/dashboard/ModeWarningModal';
import { checkModeWarning } from '@/lib/studyModeHelpers';

import { useRestoreActiveSession } from '@/hooks/useRestoreActiveSession';

// Helper to get translated string
const t = (key: string, lang: Language) => {
    // @ts-ignore
    return translations[lang][key] || key;
};

export function MainApp() {
    // 1. Session Persistence Hook
    useRestoreActiveSession();

    const [context, setContext] = useState<FlowContext>(FlowEngine.getInitialState());
    const [inputValue, setInputValue] = useState<any>(null);

    // Warning Modal State
    const [showWarning, setShowWarning] = useState(false);
    const [warningType, setWarningType] = useState<'hard_achievement' | 'easy_importance' | null>(null);
    const [pendingModeSelection, setPendingModeSelection] = useState<LectureStudyMode | null>(null);

    // App State
    const [language, setLanguage] = useState<Language>('en');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    // Zustand Store
    const { subjects, lectures, addSubject, registerSession, setProfile, profile, sessions, dailyLoad, addLecture, syncAuth, setHighlightLectureId } = useStore();

    // Theme Effect
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('dir', 'ltr'); // Force LTR for consistency
    }, [theme]); // Removed language dependency to enforce LTR

    // Keyboard listener for mode selection
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (context.currentState === 'REG_MODE_SELECT' && e.key === 'Enter' && inputValue) {
                e.preventDefault();
                handleNext(inputValue);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [context.currentState, inputValue]);

    // Timeout Modal State
    const [timeoutModal, setTimeoutModal] = useState(false);

    //Active Session Persistence Check & GLOBAL GUARD
    const { activeSession, endActiveSession } = useStore();
    useEffect(() => {
        // 1. HARD LOCK: If active session exists, FORCE Execution View
        // This runs on refresh, new tab, any mount
        if (activeSession && activeSession.isActive) {
            console.log("[MainApp] 🔒 HARD LOCK: Active session detected, forcing STUDY_EXECUTION");
            // URL Persistence
            if (typeof window !== 'undefined') {
                const url = new URL(window.location.href);
                if (!url.searchParams.has('mode')) {
                    url.searchParams.set('mode', 'session');
                    window.history.replaceState({}, '', url.toString());
                }
            }

            if (context.currentState !== 'STUDY_EXECUTION') {
                setContext(prev => ({
                    ...prev,
                    currentState: 'STUDY_EXECUTION',
                    selectedSubjectId: activeSession.lectureId
                }));
            }
        } else {
            // Cleanup URL if no session
            if (typeof window !== 'undefined') {
                const url = new URL(window.location.href);
                if (url.searchParams.has('mode')) {
                    url.searchParams.delete('mode');
                    window.history.replaceState({}, '', url.toString());
                }
            }
        }
        // REMOVED: Premature dashboard redirect
        // SessionTimerView will handle result display and navigation via handleSessionComplete

        // 2. SAFETY GUARD: 12-Hour Limit Check (Global)
        let interval: NodeJS.Timeout;
        if (activeSession && activeSession.isActive) {
            // Initial check immediately
            const check = () => {
                const now = Date.now();
                const elapsed = now - activeSession.startTime - activeSession.totalPausedTime;
                // 12 Hours = 43,200,000 ms
                if (elapsed > 43200000) {
                    console.warn("[Global Guard] Session exceeded 12 hours. Force closing.");
                    endActiveSession(true); // Persists to Firestore now
                    setTimeoutModal(true); // Show UI Overlay

                    // Force Context Reset to Dashboard
                    setContext(prev => ({ ...prev, currentState: 'DASHBOARD_HOME' }));

                    return true;
                }
                return false;
            };

            if (!check()) {
                interval = setInterval(check, 60000); // Check every 60 seconds
            }
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeSession]); // Removed context.currentState to trigger on ANY activeSession change

    // --- HELPER FUNCTIONS ---
    const handleNext = (overrideInput?: any) => {
        const input = overrideInput !== undefined ? overrideInput : inputValue;
        let nextContext = { ...context };

        try {
            // --- AUTH & SETUP ---
            if (context.currentState === 'SUBJECT_LIST') {
                if (input === 'ADD_SUBJECT') {
                    nextContext.currentState = 'SUBJECT_ADD_NAME';
                } else {
                    // Input is Subject ID
                    nextContext.selectedSubjectId = input;
                }
            }

            if (context.currentState === 'SUBJECT_ADD_NAME') {
                const subjectName = input;
                if (subjectName) {
                    const newSubject = AcademicStructureEngine.createSubject(subjectName, new Date().toISOString(), 'Medium');
                    addSubject(newSubject);
                    nextContext.selectedSubjectId = newSubject.id;
                }
            }

            if (context.currentState === 'SUBJECT_SETUP_DATE') {
                console.log(`[System] Exam Date: ${input}`);
                // Save date logic...
            }

            if (context.currentState === 'INTENT_ACTION') {
                nextContext.actionType = input === 'ACTION_REGISTER' ? 'REGISTER' : 'STUDY';
            }

            // --- REGISTRATION FLOW ---
            if (context.currentState === 'REG_TYPE') nextContext.tempRegistration = { ...nextContext.tempRegistration!, type: input };
            if (context.currentState === 'REG_DURATION') nextContext.tempRegistration = { ...nextContext.tempRegistration!, duration: input };
            if (context.currentState === 'REG_UNDERSTANDING') {
                // Store understanding but DON'T create lecture yet
                nextContext.tempRegistration = { ...nextContext.tempRegistration!, understanding: input };
                // Transition to mode selection state
            }

            // NEW: Mode Selection Step
            if (context.currentState === 'REG_MODE_SELECT') {
                const selectedMode = input as LectureStudyMode;
                nextContext.tempRegistration = { ...nextContext.tempRegistration!, studyMode: selectedMode };

                // NOW CREATE LECTURE with all data including mode
                const mentalLoadVal: 'Low' | 'Medium' | 'High' = 'Medium';
                const understandingScore = Number(nextContext.tempRegistration!.understanding);

                const studentState = {
                    phase: profile ? (profile.learningPhase || 'INIT') : 'INIT',
                    index: profile ? (profile.consistencyIndex / 10) : 0
                };

                const newLecture = AcademicStructureEngine.createLecture(
                    context.selectedSubjectId!,
                    `Registered Class`,
                    nextContext.tempRegistration!.duration,
                    understandingScore,
                    mentalLoadVal,
                    nextContext.tempRegistration!.type as any,
                    studentState,
                    selectedMode  // NEW: Pass mode
                );
                addLecture(newLecture);

                // Store new lecture ID for highlighting (Persisted)
                setHighlightLectureId(newLecture.id);
                // nextContext.newlyCreatedLectureId = newLecture.id; // Kept for legacy compatibility if needed
                nextContext.feedbackMessage = t('cycle_complete', language);
            }

            // --- STUDY FLOW ---
            if (context.currentState === 'CALIBRATION_TIME') {
                const studentState = {
                    phase: profile ? (profile.learningPhase || 'INIT') : 'INIT',
                    index: profile ? (profile.consistencyIndex / 10) : 0
                };

                const adHocLecture = AcademicStructureEngine.createLecture(
                    context.selectedSubjectId!,
                    `Session`,
                    inputValue,
                    5,
                    'Medium',
                    'Theory',
                    studentState
                );
                addLecture(adHocLecture);

                const focusLevel = context.tempCalibration.focus > 66 ? 'High' : 'Medium';
                // REMOVED: PreStudyEngine.registerSession (Integrity Fix)
                // Session is now created ONLY by SessionTimerView -> startActiveSession
                nextContext.currentSessionId = undefined; // No ID yet
            }

            if (context.currentState === 'REFLECTION_CHECK') {
                if (context.currentSessionId && profile && dailyLoad) {
                    const endedSession = EndSessionEngine.evaluateSession(
                        sessions.find(s => s.id === context.currentSessionId)!,
                        context.tempCalibration.time
                    );
                    const newProfile = StudentProfilerEngine.updateProfile(profile, endedSession);
                    setProfile(newProfile);
                }
                nextContext.feedbackMessage = t('cycle_complete', language);
            }

            const nextState = FlowEngine.nextState(context.currentState, input);

            // If we are going to DASHBOARD_SUBJECT, ensure we have the ID for highlighting
            // The newlyCreatedLectureId is already set in the context during creation

            setContext({ ...nextContext, currentState: nextState });

        } catch (e) {
            console.error("Engine Error:", e);
        }
    };

    const handleSessionComplete = (endedSession: StudySession) => {
        // [MODIFIED] Immediate Completion Logic (Skips "Session Outcome" Step)

        if (!endedSession) {
            console.warn("[MainApp] Session completed without data (Force Ended?). Returning to Dashboard.");
            setContext(prev => ({
                ...prev,
                currentState: prev.selectedSubjectId ? 'DASHBOARD_SUBJECT' : 'SUBJECT_LIST',
                feedbackMessage: 'Session Terminated'
            }));
            return;
        }

        // 1. Run Profiler Logic immediately
        if (profile && dailyLoad) {
            const newProfile = StudentProfilerEngine.updateProfile(profile, endedSession);
            setProfile(newProfile);
        }

        // 2. Return to Dashboard immediately
        setContext(prev => ({
            ...prev,
            currentState: prev.selectedSubjectId ? 'DASHBOARD_SUBJECT' : 'SUBJECT_LIST',
            feedbackMessage: t('cycle_complete', language)
        }));
    };

    const getQuestionProps = () => {
        // ... Logic preserved from page.tsx ...
        switch (context.currentState) {
            case 'ORIENTATION': return { inputType: 'none' as const };
            case 'SUBJECT_LIST':
                return {
                    inputType: 'grid' as const,
                    options: [
                        ...subjects.map(s => ({ label: s.name, value: s.id })),
                        { label: t('add_subject', language), value: 'ADD_SUBJECT' }
                    ]
                };
            case 'SUBJECT_ADD_NAME': return { inputType: 'text' as const, placeholder: t('subject_name', language) };
            case 'SUBJECT_SETUP_DATE': return { inputType: 'date' as const };
            case 'INTENT': return { inputType: 'none' as const };
            case 'INTENT_ACTION':
                return {
                    inputType: 'grid' as const,
                    options: [
                        { label: t('study_now', language), value: 'ACTION_STUDY' },
                        { label: t('register_class', language), value: 'ACTION_REGISTER' }
                    ]
                };
            case 'REG_TYPE':
                return {
                    inputType: 'grid' as const,
                    options: [
                        { label: t('theory', language), value: 'Theory' },
                        { label: t('practical', language), value: 'Practical' },
                        { label: t('revision', language), value: 'Revision' }
                    ]
                };
            case 'REG_DURATION':
                return {
                    inputType: 'grid' as const,
                    options: [
                        { label: t('min_15', language), value: 15 },
                        { label: t('min_30', language), value: 30 },
                        { label: t('min_45', language), value: 45 },
                        { label: t('hr_1', language), value: 60 },
                        { label: t('hr_1_15', language), value: 75 },
                        { label: t('hr_1_30', language), value: 90 },
                        { label: t('hr_1_45', language), value: 105 },
                        { label: t('hr_2', language), value: 120 },
                    ]
                };
            case 'REG_UNDERSTANDING': return { inputType: 'slider' as const };
            case 'REG_DEMAND':
                return {
                    inputType: 'grid' as const,
                    options: [
                        { label: t('very_light', language), value: 'Very Light' },
                        { label: t('light', language), value: 'Light' },
                        { label: t('moderate', language), value: 'Moderate' },
                        { label: t('heavy', language), value: 'Heavy' },
                        { label: t('very_heavy', language), value: 'Very Heavy' },
                    ]
                };
            case 'CALIBRATION_FAMILIARITY': return { inputType: 'slider' as const };
            case 'CALIBRATION_FOCUS': return { inputType: 'slider' as const };
            case 'CALIBRATION_TIME': return { inputType: 'slider' as const };
            case 'REFLECTION_CHECK': return { inputType: 'binary' as const };
            case 'REFLECTION_REASON': return { inputType: 'text' as const, placeholder: 'Briefly explain...' };
            case 'SUMMARY': return { inputType: 'none' as const };
            default: return { inputType: 'none' as const };
        }
    };

    // Reset input when state changes (MOVED BELOW DECLARATIONS)
    useEffect(() => {
        setInputValue(null); // Clear input on every state change

        // Reset inputs based on state defaults...
        if (context.currentState === 'CALIBRATION_FAMILIARITY') setInputValue(50);
        if (context.currentState === 'CALIBRATION_FOCUS') setInputValue(50);
        if (context.currentState === 'CALIBRATION_TIME') setInputValue(30);
        if (context.currentState === 'REG_UNDERSTANDING') setInputValue(5);
        if (context.currentState === 'REG_DURATION') setInputValue(60);

        // Orientation Auto-Advance
        if (context.currentState === 'ORIENTATION') {
            const timer = setTimeout(() => handleNext('AUTO_ORIENT'), 4000);
            return () => clearTimeout(timer);
        }

        // Summary Auto-Advance
        if (context.currentState === 'SUMMARY') {
            const timer = setTimeout(() => handleNext(), 2000); // 2s delay
            return () => clearTimeout(timer);
        }
    }, [context.currentState]);

    // --- TIMEOUT MODAL OVERLAY ---
    const renderTimeoutModal = () => {
        if (!timeoutModal) return null;
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-[#0f1523] border border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Session Terminated</h2>
                    <p className="text-slate-400 mb-6">
                        Your session exceeded the 12-hour active limit and was automatically closed with a penalty (Grade C).
                    </p>
                    <button
                        onClick={() => setTimeoutModal(false)}
                        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                    >
                        Acknowledge & Return
                    </button>
                </div>
            </div>
        );
    };

    // --- APP CONTENT ---
    return (
        <>
            {renderTimeoutModal()}
            {renderContent()}
        </>
    );

    function renderContent() {


        // --- DASHBOARD ROUTER ---
        if (['SUBJECT_LIST', 'DASHBOARD_SUBJECT', 'DASHBOARD_SETTINGS', 'DASHBOARD_HOME', 'DASHBOARD_TOOLS', 'DASHBOARD_HISTORY', 'DASHBOARD_CONFIG', 'DASHBOARD_ACCOUNT'].includes(context.currentState)) {
            // ... View Logic ...
            if (context.currentState === 'DASHBOARD_SETTINGS' && context.selectedSubjectId) {
                const subject = subjects.find(s => s.id === context.selectedSubjectId)!;
                return (
                    <ControlLayout
                        currentView={context.currentState}
                        onNavigate={(state) => setContext(prev => ({ ...prev, currentState: state }))}
                        lang={language}
                        onToggleLang={() => setLanguage(l => l === 'en' ? 'ar' : 'en')}
                        theme={theme}
                        onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                    >
                        <SubjectSettingsView
                            subject={subject}
                            lang={language}
                            onSave={(config) => {
                                console.log("Saving Config:", config);
                                setContext(prev => ({ ...prev, currentState: 'DASHBOARD_SUBJECT' }));
                            }}
                            onCancel={() => setContext(prev => ({ ...prev, currentState: 'DASHBOARD_SUBJECT' }))}
                        />
                    </ControlLayout>
                );
            }

            if (context.currentState === 'DASHBOARD_SUBJECT' && context.selectedSubjectId) {
                const subject = subjects.find(s => s.id === context.selectedSubjectId)!;
                return (
                    <ControlLayout
                        currentView={context.currentState}
                        onNavigate={(state) => setContext(prev => ({ ...prev, currentState: state }))}
                        lang={language}
                        onToggleLang={() => setLanguage(l => l === 'en' ? 'ar' : 'en')}
                        theme={theme}
                        onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                    >
                        <SubjectDetailView
                            subjectId={subject.id}
                            onQuestionFlowStart={(flowType, contextId, predictedDuration) => {
                                if (flowType === 'SESSION_START') {
                                    const lecture = lectures.find(l => l.id === contextId)!;
                                    // REMOVED: PreStudyEngine.registerSession (Integrity Fix)
                                    // registerSession(session);
                                    setContext(prev => ({
                                        ...prev,
                                        currentState: 'STUDY_EXECUTION',
                                        actionType: 'STUDY',
                                        selectedSubjectId: subject.id,
                                        activeLectureId: contextId,
                                        currentSessionId: undefined, // No ID yet
                                        tempCalibration: { familiarity: 5, focus: 50, time: predictedDuration || lecture.duration * 2 }
                                    }));
                                } else {
                                    setContext(prev => ({ ...prev, currentState: 'REG_TYPE', actionType: 'REGISTER', selectedSubjectId: subject.id }));
                                }
                            }}
                            onBack={() => setContext(prev => ({ ...prev, currentState: 'SUBJECT_LIST' }))}
                            highlightLectureId={context.newlyCreatedLectureId}
                        />
                    </ControlLayout>
                );
            }

            if (context.currentState === 'DASHBOARD_HISTORY') {
                return (
                    <ControlLayout
                        currentView={context.currentState}
                        onNavigate={(state) => setContext(prev => ({ ...prev, currentState: state }))}
                        lang={language}
                        onToggleLang={() => setLanguage(l => l === 'en' ? 'ar' : 'en')}
                        theme={theme}
                        onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                    >
                        <HistoryView />
                    </ControlLayout>
                );
            }

            if (context.currentState === 'DASHBOARD_CONFIG') {
                return (
                    <ControlLayout
                        currentView={context.currentState}
                        onNavigate={(state) => setContext(prev => ({ ...prev, currentState: state }))}
                        lang={language}
                        onToggleLang={() => setLanguage(l => l === 'en' ? 'ar' : 'en')}
                        theme={theme}
                        onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                    >
                        <SystemConfigView lang={language} />
                    </ControlLayout>
                );
            }

            if (context.currentState === 'DASHBOARD_TOOLS') {
                return (
                    <ControlLayout
                        currentView={context.currentState}
                        onNavigate={(state) => setContext(prev => ({ ...prev, currentState: state }))}
                        lang={language}
                        onToggleLang={() => setLanguage(l => l === 'en' ? 'ar' : 'en')}
                        theme={theme}
                        onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                    >
                        <ToolsView />
                    </ControlLayout>
                );
            }

            if (context.currentState === 'DASHBOARD_ACCOUNT') {
                return (
                    <ControlLayout
                        currentView={context.currentState}
                        onNavigate={(state) => setContext(prev => ({ ...prev, currentState: state }))}
                        lang={language}
                        onToggleLang={() => setLanguage(l => l === 'en' ? 'ar' : 'en')}
                        theme={theme}
                        onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                    >
                        <AccountSettingsView lang={language} />
                    </ControlLayout>
                );
            }

            return (
                <ControlLayout
                    currentView={context.currentState}
                    onNavigate={(state) => setContext(prev => ({ ...prev, currentState: state }))}
                    lang={language}
                    onToggleLang={() => setLanguage(l => l === 'en' ? 'ar' : 'en')}
                    theme={theme}
                    onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                >
                    <DashboardView
                        onSelectSubject={(id) => setContext(prev => ({ ...prev, currentState: 'DASHBOARD_SUBJECT', selectedSubjectId: id }))}
                        onAddSubject={() => handleNext('ADD_SUBJECT')}
                        lang={language}
                    />
                </ControlLayout>
            );
        }

        if (context.currentState === 'STUDY_EXECUTION') {
            const allocated = context.tempCalibration.time;
            return (
                <ControlLayout
                    currentView={context.currentState}
                    onNavigate={(state) => setContext(prev => ({ ...prev, currentState: state }))}
                    lang={language}
                    onToggleLang={() => setLanguage(l => l === 'en' ? 'ar' : 'en')}
                    theme={theme}
                    onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                >
                    <SessionTimerView
                        allocatedMinutes={allocated}
                        lectureId={context.activeLectureId || context.selectedSubjectId || 'unknown_lecture'}
                        subjectId={context.selectedSubjectId || 'unknown_subject'}
                        lang={language}
                        onComplete={handleSessionComplete}
                    />
                </ControlLayout>
            );
        }

        const props = getQuestionProps();
        const questionKey = FlowEngine.getQuestionKey(context.currentState);
        const questionText = t(questionKey, language);

        return (
            <ControlLayout
                currentView={context.currentState}
                onNavigate={(state) => setContext(prev => ({ ...prev, currentState: state }))}
                lang={language}
                onToggleLang={() => setLanguage(l => l === 'en' ? 'ar' : 'en')}
                theme={theme}
                onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            >
                {/* Special Case: Study Mode Selector */}
                {context.currentState === 'REG_MODE_SELECT' ? (
                    <div className="flex flex-col items-center min-h-screen p-8 pt-4">
                        <h1 className="text-3xl font-bold text-white mb-8 text-center">{translations[language].select_study_mode}</h1>
                        <div className="w-full max-w-5xl">
                            <StudyModeSelector
                                lectureDuration={context.tempRegistration!.duration}
                                difficulty={11 - context.tempRegistration!.understanding}  // Convert understanding to difficulty
                                selectedMode={(inputValue as LectureStudyMode) || 'standard'}
                                language={language}
                                onSelect={(mode) => {
                                    setInputValue(mode);
                                }}
                            />
                        </div>

                        {/* Enter Button */}
                        <button
                            onClick={() => {
                                const selectedMode = inputValue || 'standard';
                                const difficulty = 11 - context.tempRegistration!.understanding;
                                const warningCheck = checkModeWarning(difficulty, selectedMode);

                                if (warningCheck.shouldWarn) {
                                    // Show warning modal
                                    setWarningType(warningCheck.warningKey);
                                    setPendingModeSelection(selectedMode);
                                    setShowWarning(true);
                                } else {
                                    // No warning, proceed directly
                                    handleNext(selectedMode);
                                }
                            }}
                            disabled={!inputValue}
                            className={`
                                mt-12 px-10 py-3 rounded-xl font-bold text-base tracking-wider
                                transition-all duration-300 transform
                                ${inputValue
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-400/60 hover:scale-105'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                                }
                            `}
                        >
                            <span className="text-white font-bold">{translations[language].enter_btn}</span>
                        </button>

                        {/* Warning Modal */}
                        <ModeWarningModal
                            isOpen={showWarning}
                            warningType={warningType}
                            language={language}
                            translations={translations}
                            onCancel={() => {
                                // User chose "لن استخدمه" - close modal and reset selection
                                setShowWarning(false);
                                setWarningType(null);
                                setPendingModeSelection(null);
                                setInputValue(null); // Reset selection so user can pick again
                            }}
                            onProceed={() => {
                                // User chose "أفهم ذلك لكن سأستخدمه" - proceed with selection
                                setShowWarning(false);
                                handleNext(pendingModeSelection || 'standard');
                                setWarningType(null);
                                setPendingModeSelection(null);
                            }}
                        />
                    </div>
                ) : (
                    <SingleQuestionView
                        question={questionText}
                        subtitle={context.currentState === 'REG_DURATION' ? t('duration_note', language) : undefined}
                        warning={context.currentState === 'REG_DURATION' ? t('duration_warning', language) : undefined}
                        inputType={props.inputType}
                        value={inputValue}
                        onChange={setInputValue}
                        onConfirm={handleNext}
                        placeholder={props.placeholder}
                        options={props.options}
                        lang={language}
                    />
                )}
            </ControlLayout>
        );
    }
}
