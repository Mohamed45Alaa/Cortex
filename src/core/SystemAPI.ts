import { SystemOrchestrator } from './SystemOrchestrator';
import { useStore } from '../store/useStore';
import { Lecture, SubjectConfig, StudySession } from './types';
import { TimePredictionEngine } from './engines/TimePredictionEngine';
import { EndSessionEngine } from './engines/EndSessionEngine';

/**
 * ENGINEERING: PUBLIC SYSTEM API
 * Reference: PHASE_1_SYSTEM_ARCHITECTURE.md
 * 
 * ROLE:
 * The "Control Panel" interface.
 * UI Components MUST use this API for all state mutations.
 * Direct access to Store.setState or Engine logic from UI is FORBIDDEN.
 */
export const SystemAPI = {

    // --- 1. OPERATIONAL COMMANDS ---

    /**
     * Attempts to initiate a study session.
     * @returns Promise resolving to the session context or rejecting with a Lockout reason.
     */
    requestSessionStart: async (lectureId: string) => {
        // 1. Run Guards
        const check = SystemOrchestrator.canStartSession(lectureId);

        if (!check.allowed) {
            // UI Handler should catch this and display the Lockout/Override Modal
            return Promise.reject({
                reason: check.reason,
                canOverride: check.overrideRequired
            });
        }

        // 2. Prepare Context (Predictions)
        return SystemOrchestrator.prepareSession(lectureId);
    },

    /**
     * Commits a finished session to the permanent log.
     */
    submitSession: (data: {
        lectureId: string;
        subjectId: string;
        actualDuration: number;
        focusPerformance: number;
    }) => {
        const state = useStore.getState();
        const subject = state.subjects.find(s => s.id === data.subjectId);
        const lecture = state.lectures.find(l => l.id === data.lectureId);
        const profile = state.profile;

        if (!subject || !lecture) throw new Error("System Error: Subject context lost during session.");

        // Re-calculate expectation to grade performance
        // (We do this here to keep the API stateless, trusting the Engine's determinism)
        const expectedDuration = TimePredictionEngine.predictDuration(lecture, profile, subject.config);

        const endTime = Date.now();
        // Infer start time (minutes -> ms)
        const startTime = endTime - (data.actualDuration * 60 * 1000);

        // Construct Base Session
        const sessionBase: StudySession = {
            id: 'temp', // Will be replaced by Finalizer
            lectureId: data.lectureId,
            parentId: data.lectureId, // Defaulting parent to lecture
            subjectId: data.subjectId,
            date: new Date(endTime).toISOString(),

            startTime,
            endTime,
            status: 'COMPLETED',

            expectedDuration,
            actualDuration: data.actualDuration,

            cognitiveCost: 0, // Will be calculated by Finalizer
            performanceIndex: 0, // Will be calculated by EndSessionEngine
            focusPerformance: data.focusPerformance
        };

        // Calculate Performance Index
        const scoredSession = EndSessionEngine.evaluateSession(sessionBase, data.actualDuration);

        // Atomic commit via Orchestrator
        return SystemOrchestrator.finalizeSession(
            scoredSession,
            subject.config
        );
    },

    /**
     * Signals the end of the academic day.
     * Triggers Sleep Cycle and Recovery logic.
     */
    performDailyRecovery: () => {
        SystemOrchestrator.processRecovery();
    },

    // --- 2. INVENTORY COMMANDS ---

    /**
     * Registers a new academic input (Lecture) into the system.
     */
    registerInput: (
        subjectId: string,
        input: Omit<Lecture, 'id' | 'status' | 'stability' | 'subjectId' | 'createdAt'>
    ) => {
        const state = useStore.getState();
        const subject = state.subjects.find(s => s.id === subjectId);

        // Validation: Cannot add input to a locked subject? 
        // Logic Phase 3 Spec: "Gatekeeper Logic" could go here or in store.

        const newLecture: Lecture = {
            id: crypto.randomUUID(),
            subjectId,
            status: 'Pending',
            stability: 0, // Brand new
            createdAt: new Date().toISOString(),
            ...input
        };

        state.addLecture(newLecture);
    },

    // --- 3. CONFIGURATION COMMANDS ---

    /**
     * Adjusts the "Physics" of a specific Subject.
     * High strictness changes will immediately affect future predictions.
     */
    configureSubject: (subjectId: string, config: Partial<SubjectConfig>) => {
        useStore.getState().updateSubjectConfig(subjectId, config);
    },

    /**
     * Creates a new Subject Container.
     */
    initializeSubject: (name: string, difficulty: 'Easy' | 'Medium' | 'Hard') => {
        const newSubject = {
            id: crypto.randomUUID(),
            name,
            examDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // Mock 90 days
            difficulty,
            config: {
                // Default "Standard" Physics
                lectureTreatment: 'Standard',
                cognitiveThreshold: 100,
                revisionRule: 'Spaced-Repetition',
                strictnessLevel: 'Standard',
                maxDailyLoad: 'Medium'
            },
            metrics: {
                stability: 0,
                readiness: 0,
                totalWeight: 0,
                nextExamCountdown: 90
            }
        };

        // @ts-ignore - TS types mismatch between 'Subject' partials in store vs strict here?
        // Actually types should align.
        useStore.getState().addSubject(newSubject as any);
    }
};
