import { useStore } from '../store/useStore';
import { TimePredictionEngine } from './engines/TimePredictionEngine';
import { CognitiveLoadEngine } from './engines/CognitiveLoadEngine';
import { CapacityEngine } from './engines/CapacityEngine';
import { StudySession, Lecture, StudentProfile, SubjectConfig } from './types';

/**
 * ENGINEERING: SYSTEM ORCHESTRATOR
 * Reference: PHASE_1_SYSTEM_ARCHITECTURE.md (Layer 2)
 * 
 * ROLE:
 * The "Traffic Controller" of the system.
 * It is the ONLY module authorized to trigger complex state mutations involving multiple engines.
 * It enforces the "System Authority" by applying Guard Logic before allowing actions.
 */
export const SystemOrchestrator = {

    // --- 1. GUARDS (The Gatekeepers) ---

    /**
     * Checks if a session can legally start.
     * Enforces: Hard Lockouts, Bankruptcies, and Stability Gates.
     */
    canStartSession: (lectureId: string): { allowed: boolean; reason?: string; overrideRequired?: boolean } => {
        // [PRODUCT CHANGE] 2024-01-XX
        // Guards removed. Analytics only.
        return { allowed: true };
    },

    // --- 2. ORCHESTRATION EVENT: SESSION START ---

    /**
     * Prepares the system for a session.
     * Calculates predictions and sets execution context.
     */
    prepareSession: (lectureId: string) => {
        const state = useStore.getState();
        const lecture = state.lectures.find(l => l.id === lectureId);
        const subject = state.subjects.find(s => s.id === lecture?.subjectId);
        const profile = state.profile;

        if (!lecture || !subject) throw new Error("Invalid Session Context");

        // 1. Run Prediction Engine
        // [REFACTOR] Single Source of Truth: Use stored expectedDuration.
        // We DO NOT recalculate this at session start.
        const predictedDuration = lecture.expectedDuration;

        // 2. Return the Contract
        return {
            lecture,
            subject,
            predictedDuration,
            strictness: subject.config.strictnessLevel
        };
    },

    // --- 3. ORCHESTRATION EVENT: SESSION END ---

    /**
     * The atomic commit of a study session.
     * Chains: Load Analysis -> Store Update -> Capacity Recalculation -> Persistence.
     */
    finalizeSession: (
        sessionBase: Omit<StudySession, 'cognitiveCost' | 'id'>,
        config: SubjectConfig
    ) => {
        const state = useStore.getState();
        const engine = CognitiveLoadEngine;

        // 1. Calculate the Biological Cost
        const lecture = state.lectures.find(l => l.id === sessionBase.lectureId)!;

        // We reconstruct a temporary session object for the engine
        const tempSessionForCalc = { ...sessionBase, id: 'temp', cognitiveCost: 0 } as StudySession;

        const cost = engine.calculateSessionCost(
            tempSessionForCalc,
            lecture,
            config
        );

        // 2. Construct Final Session Object
        const finalSession: StudySession = {
            ...sessionBase,
            id: crypto.randomUUID(),
            cognitiveCost: cost
        };

        // 3. ATOMIC UPDATE: Register Session
        // This updates 'sessions' log AND 'dailyLoad' accumulator
        state.registerSession(finalSession);

        // 4. SIDE EFFECT: Recalculate Capacity
        // We must fetch the *new* state because registerSession just mutated it
        const nextState = useStore.getState();
        const newCapacity = CapacityEngine.calculateCurrentCapacity(
            nextState.profile,
            nextState.dailyLoad
        );

        // 5. Update Profile with new Capacity
        state.updateCapacity(newCapacity);

        // 6. SIDE EFFECT: Update Logic Stability (Forgetting Curve Reset)
        // If focus was high enough (>50), we consider it a successful review
        if (sessionBase.focusPerformance > 50) {
            state.updateLectureStability(lecture.id, 100);
        }

        return {
            success: true,
            costIncurred: cost,
            remainingCapacity: newCapacity
        };
    },

    // --- 4. ORCHESTRATION EVENT: DAY ROLLOVER ---

    /**
     * Handles the "Sleep" cycle.
     * Resets DailyLoad, decays consistency if idle, calculates recovery.
     */
    processRecovery: () => {
        const state = useStore.getState();

        // 1. Reset Daily Load
        state.resetDailyLoad();

        // 2. Apply "Sleep" Recovery to Capacity
        // (Simple reset to 100 for now, could be logic based on sleep duration later)
        state.updateCapacity(100);

        // 3. Decay Stability on all Lectures (The Forgetting Curve)
        // This is a heavy operation, effectively "Aging" the database.
        // We'll iterate all lectures and apply a decay factor.
        state.lectures.forEach(lecture => {
            // Decay 5% per day by default
            // This should ideally use an action that batch updates, 
            // but for now we'll iterate.
            const newStab = Math.max(0, lecture.stability * 0.95);
            state.updateLectureStability(lecture.id, newStab);
        });

        console.log("SYSTEM: Recovery Cycle Complete. Day Reset.");
    }
};
