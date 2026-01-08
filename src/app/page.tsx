"use client";

import { useState, useEffect } from 'react';
import { FlowEngine, FlowState, FlowContext } from '@/core/engines/FlowEngine';
import { SingleQuestionView } from '@/components/layout/SingleQuestionView';
import { ControlLayout } from '@/components/dashboard/ControlLayout';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { SubjectDetailView } from '@/components/dashboard/SubjectDetailView';
import { SubjectSettingsView } from '@/components/dashboard/SubjectSettingsView';
import { SessionTimerView } from '@/components/layout/SessionTimerView';
import { HistoryView } from '@/components/history/HistoryView';
import { SystemConfigView } from '@/components/dashboard/SystemConfigView';


// ... (imports)


import { AcademicStructureEngine } from '@/core/engines/AcademicStructureEngine';
import { PreStudyEngine } from '@/core/engines/PreStudyEngine';
import { TimePredictionEngine } from '@/core/engines/TimePredictionEngine';
import { CognitiveLoadEngine } from '@/core/engines/CognitiveLoadEngine';
import { MetaAwarenessEngine } from '@/core/engines/MetaAwarenessEngine';
import { StudentProfile, Subject, DailyLoad, Lecture } from '@/core/types';
import { StudentProfilerEngine } from '@/core/engines/StudentProfilerEngine';
import { EndSessionEngine } from '@/core/engines/EndSessionEngine';
import { CapacityEngine } from '@/core/engines/CapacityEngine';
import { useStore } from '@/store/useStore';
import { translations, Language } from '@/core/i18n/translations';

// Helper to get translated string
const t = (key: string, lang: Language) => {
    // @ts-ignore
    return translations[lang][key] || key;
};

export default function Home() {
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

    // Auth Sync Effect
    useEffect(() => {
        syncAuth();
    }, []);

    // Reset input when state changes
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

    // Active Session Persistence Check
    const { activeSession } = useStore();
    useEffect(() => {
        // If there is an active session in the store, immediately jump to Execution
        // This handles "Refresh Block".
        if (activeSession && activeSession.isActive && context.currentState !== 'STUDY_EXECUTION') {
            setContext(prev => ({
                ...prev,
                currentState: 'STUDY_EXECUTION',
                selectedSubjectId: activeSession.lectureId // Restore ID if needed?
                // Actually lectureID might be needed for context, but store has it.
            }));
        }
    }, [activeSession]);

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

                // AUTO-COMPLETE REGISTRATION (Skipped Demand Question)
                const mentalLoadVal: 'Low' | 'Medium' | 'High' = 'Medium';
                // Default demand to 'Moderate'

                console.log("[DEBUG] REG_UNDERSTANDING Input:", input);
                console.log("[DEBUG] Stored Duration:", nextContext.tempRegistration?.duration);

                const understandingScore = Number(input);
                console.log("[DEBUG] Passing Understanding Score:", understandingScore);

                const newLecture = AcademicStructureEngine.createLecture(
                    context.selectedSubjectId!,
                    `Registered Class`,
                    nextContext.tempRegistration!.duration,
                    understandingScore, // Pass Understanding Score
                    mentalLoadVal,
                    nextContext.tempRegistration!.type as any
                );
                addLecture(newLecture);
                nextContext.feedbackMessage = t('cycle_complete', language);
            }

            if (context.currentState === 'REG_DEMAND') {
                // Dead code - kept for safety or handle if flow somehow reaches here
            }



            // --- STUDY FLOW ---
            if (context.currentState === 'CALIBRATION_TIME') {
                const adHocLecture = AcademicStructureEngine.createLecture(
                    context.selectedSubjectId!,
                    `Session`,
                    inputValue,
                    5, // Neutral Understanding for Ad-Hoc
                    'Medium',
                    'Theory'
                );
                console.log("[DEBUG] Adding Ad-Hoc Lecture:", adHocLecture);
                addLecture(adHocLecture); // PERSISTENCE FIX

                const focusLevel = context.tempCalibration.focus > 66 ? 'High' : 'Medium';
                const session = PreStudyEngine.registerSession(adHocLecture, context.tempCalibration.familiarity, focusLevel);
                registerSession(session);
                nextContext.currentSessionId = session.id;
            }

            if (context.currentState === 'REFLECTION_CHECK') {
                const isSuccess = input === true;
                if (context.currentSessionId && profile && dailyLoad) { // Added dailyLoad check
                    const endedSession = EndSessionEngine.evaluateSession(
                        sessions.find(s => s.id === context.currentSessionId)!,
                        context.tempCalibration.time
                    );
                    const newProfile = StudentProfilerEngine.updateProfile(profile, endedSession);
                    setProfile(newProfile);

                    const capacity = CapacityEngine.calculateCurrentCapacity(newProfile, dailyLoad);
                    // In real app, translate recommendation or use logic to pick key
                    nextContext.feedbackMessage = t('cycle_complete', language);
                }
            }

            const nextState = FlowEngine.nextState(context.currentState, input);
            setContext({ ...nextContext, currentState: nextState });

        } catch (e) {
            console.error("Engine Error:", e);
        }
    };

    const handleSessionComplete = (actualMinutes: number) => {
        // Update the context with the actual time spent
        setContext(prev => {
            const updated = {
                ...prev,
                tempCalibration: {
                    ...prev.tempCalibration,
                    time: actualMinutes
                }
            };

            // Proceed to next state (Reflection)
            // We need to calculate the next state based on current (STUDY_EXECUTION)
            const nextState = FlowEngine.nextState('STUDY_EXECUTION', null);
            return { ...updated, currentState: nextState };
        });
    };

    const getQuestionProps = () => {
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

            case 'INTENT': return { inputType: 'none' as const }; // Should be skipped in nextState?

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



    // --- DASHBOARD ROUTER ---
    if (['SUBJECT_LIST', 'DASHBOARD_SUBJECT', 'DASHBOARD_SETTINGS', 'DASHBOARD_HOME', 'DASHBOARD_HISTORY', 'DASHBOARD_CONFIG'].includes(context.currentState)) {

        // 1. Subject Settings
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
                            // Save Logic (Update store - placeholder)
                            console.log("Saving Config:", config);
                            setContext(prev => ({ ...prev, currentState: 'DASHBOARD_SUBJECT' }));
                        }}
                        onCancel={() => setContext(prev => ({ ...prev, currentState: 'DASHBOARD_SUBJECT' }))}
                    />
                </ControlLayout>
            );
        }

        // 2. Subject Detail
        if (context.currentState === 'DASHBOARD_SUBJECT' && context.selectedSubjectId) {
            const subject = subjects.find(s => s.id === context.selectedSubjectId)!;
            // Mock lectures for now or filter real ones
            const subjectLectures: Lecture[] = [];
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
                        subjectId={subject.id} // Updated prop name to match component definition
                        onQuestionFlowStart={(flowType, contextId) => {
                            if (flowType === 'SESSION_START') {
                                // DIRECT START (Skip Questions)
                                const lecture = lectures.find(l => l.id === contextId)!;

                                // Create & Register Session immediately with defaults
                                const session = PreStudyEngine.registerSession(
                                    lecture,
                                    5, // Default Familiarity (Neutral)
                                    'Medium' // Default Focus
                                );
                                registerSession(session);

                                setContext(prev => ({
                                    ...prev,
                                    currentState: 'STUDY_EXECUTION', // Go straight to Timer
                                    actionType: 'STUDY',
                                    selectedSubjectId: subject.id,
                                    activeLectureId: contextId,
                                    currentSessionId: session.id, // Bind session 
                                    tempCalibration: { // meaningful defaults if needed
                                        familiarity: 5,
                                        focus: 50,
                                        time: lecture.duration // default to lecture duration
                                    }
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

        // 3. Main Dashboard (Default)
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
                    onSelectSubject={(id) => {
                        setContext(prev => ({
                            ...prev,
                            currentState: 'DASHBOARD_SUBJECT',
                            selectedSubjectId: id
                        }));
                    }}
                    onAddSubject={() => handleNext('ADD_SUBJECT')}
                    lang={language}
                />
            </ControlLayout>
        );
    }

    // Execution View (Real Timer)
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
                    subjectId={context.selectedSubjectId || 'unknown_subject'} // Propagating SubjectID
                    lang={language}
                    onComplete={(actualMinutes) => {
                        handleSessionComplete(actualMinutes);
                    }}
                />
            </ControlLayout>
        );
    }

    const props = getQuestionProps();
    const questionKey = FlowEngine.getQuestionKey(context.currentState);
    const questionText = t(questionKey, language);

    // Question Flow View (Overlay or Full Screen)
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
