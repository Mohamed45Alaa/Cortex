"use client";

import { useState, useEffect } from 'react';
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
import { AcademicStructureEngine } from '@/core/engines/AcademicStructureEngine';
import { PreStudyEngine } from '@/core/engines/PreStudyEngine';
import { StudentProfilerEngine } from '@/core/engines/StudentProfilerEngine';
import { EndSessionEngine } from '@/core/engines/EndSessionEngine';
import { CapacityEngine } from '@/core/engines/CapacityEngine';
import { useStore } from '@/store/useStore';
import { translations, Language } from '@/core/i18n/translations';
import { Lecture } from '@/core/types';

// Helper to get translated string
const t = (key: string, lang: Language) => {
    // @ts-ignore
    return translations[lang][key] || key;
};

export function MainApp() {
    const [context, setContext] = useState<FlowContext>(FlowEngine.getInitialState());
    const [inputValue, setInputValue] = useState<any>(null);

    // App State
    const [language, setLanguage] = useState<Language>('en');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    // Zustand Store
    const { subjects, lectures, addSubject, registerSession, setProfile, profile, sessions, dailyLoad, addLecture, syncAuth } = useStore();

    // Theme Effect
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    }, [theme, language]);

    // Timeout Modal State
    const [timeoutModal, setTimeoutModal] = useState(false);

    // Active Session Persistence Check & GLOBAL GUARD
    const { activeSession, endActiveSession } = useStore();
    useEffect(() => {
        // 1. Navigation Logic (If active, force Execution View)
        if (activeSession && activeSession.isActive && context.currentState !== 'STUDY_EXECUTION') {
            setContext(prev => ({
                ...prev,
                currentState: 'STUDY_EXECUTION',
                selectedSubjectId: activeSession.lectureId
            }));
        }

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
    }, [activeSession, context.currentState]); // Added dependency

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
                nextContext.tempRegistration = { ...nextContext.tempRegistration!, understanding: input };

                // AUTO-COMPLETE REGISTRATION
                const mentalLoadVal: 'Low' | 'Medium' | 'High' = 'Medium';
                const understandingScore = Number(input);

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
                    studentState
                );
                addLecture(newLecture);
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
                const session = PreStudyEngine.registerSession(adHocLecture, context.tempCalibration.familiarity, focusLevel);
                registerSession(session);
                nextContext.currentSessionId = session.id;
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
            setContext({ ...nextContext, currentState: nextState });

        } catch (e) {
            console.error("Engine Error:", e);
        }
    };

    const handleSessionComplete = (actualMinutes: number) => {
        setContext(prev => {
            const updated = {
                ...prev,
                tempCalibration: {
                    ...prev.tempCalibration,
                    time: actualMinutes
                }
            };
            const nextState = FlowEngine.nextState('STUDY_EXECUTION', null);
            return { ...updated, currentState: nextState };
        });
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
        if (['SUBJECT_LIST', 'DASHBOARD_SUBJECT', 'DASHBOARD_SETTINGS', 'DASHBOARD_HOME', 'DASHBOARD_HISTORY', 'DASHBOARD_CONFIG', 'DASHBOARD_ACCOUNT'].includes(context.currentState)) {
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
                                    const session = PreStudyEngine.registerSession(lecture, 5, 'Medium');
                                    registerSession(session);
                                    setContext(prev => ({
                                        ...prev,
                                        currentState: 'STUDY_EXECUTION',
                                        actionType: 'STUDY',
                                        selectedSubjectId: subject.id,
                                        activeLectureId: contextId,
                                        currentSessionId: session.id,
                                        tempCalibration: { familiarity: 5, focus: 50, time: predictedDuration || lecture.duration * 2 }
                                    }));
                                } else {
                                    setContext(prev => ({ ...prev, currentState: 'REG_TYPE', actionType: 'REGISTER', selectedSubjectId: subject.id }));
                                }
                            }}
                            onBack={() => setContext(prev => ({ ...prev, currentState: 'SUBJECT_LIST' }))}
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
            </ControlLayout>
        );
    }
}
