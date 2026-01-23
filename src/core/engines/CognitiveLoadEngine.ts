import { DailyLoad, SubjectConfig, Lecture, StudySession } from '../types';

/**
 * ENGINEERING: COGNITIVE LOAD ENGINE
 * Reference: PHASE_3_LOGIC_SPECIFICATION.md (Section 3)
 * 
 * ROLE:
 * The "Hydraulic System" of the platform.
 * Tracks mental fatigue accumulation and enforces Lockouts.
 * 
 * INPUTS:
 * - Session Data (Duration, Focus)
 * - SubjectConfig (Thresholds)
 * - Current DailyLoad
 * 
 * OUTPUTS:
 * - Calculated Session Cost
 * - Updated DailyLoad Status (Safe/Warning/Risk)
 */
export const CognitiveLoadEngine = {

    /**
     * Calculates the "Cost" of a specific session.
     * Logic: Cost = (Duration * Strictness) * (Weight / 5)
     */
    calculateSessionCost: (
        session: StudySession,
        lecture: Lecture,
        config: SubjectConfig
    ): number => {
        let cost = session.actualDuration;

        // 1. Strictness Impact
        // High strictness implies high intensity per minute
        if (config.strictnessLevel === 'Military') cost *= 1.2;
        if (config.strictnessLevel === 'Relaxed') cost *= 0.8;

        // 2. Cognitive Weight Scaling
        // Weight 5 is baseline. Weight 10 is double cost.
        cost *= (lecture.relativeDifficulty / 5);

        // 3. Treatment Scaling
        if (config.lectureTreatment === 'Intensive') cost *= 1.5;

        // 4. Focus Performance Impact
        // Low focus (<50%) actually INCREASES cognitive cost (fighting distractions is expensive)
        // High focus (>90%) is efficient (Net zero or slight reduction)
        if (session.focusPerformance < 50) cost *= 1.2;
        if (session.focusPerformance > 90) cost *= 0.95;

        return Math.round(cost);
    },

    /**
     * Updates the Daily Load accumulator and determines System Status.
     * Enforces the "Safety Valve".
     */
    analyzeLoadState: (
        currentLoad: DailyLoad,
        addedCost: number,
        subjectConfig: SubjectConfig
    ): DailyLoad => {
        const newTotal = currentLoad.totalCognitiveCost + addedCost;

        // Base System Capacity is 100 "Standard Units" (approx 4 hours of intense work)
        // This can be scaled by the subject's MaxDailyLoad setting.
        let systemLimit = 240; // Minutes equivalent baseline

        switch (subjectConfig.maxDailyLoad) {
            case 'Low': systemLimit = 120; break;
            case 'Medium': systemLimit = 240; break;
            case 'High': systemLimit = 360; break;
        }

        // Apply Personal Threshold (e.g., Stop at 80% of Max)
        const safetyValve = systemLimit * (subjectConfig.cognitiveThreshold / 100);

        // Status Determination
        let status: DailyLoad['status'] = 'Safe';

        if (newTotal > safetyValve) {
            // Critical Breach -> Soft Lockout
            status = 'Risk';
        } else if (newTotal > (safetyValve * 0.8)) {
            // Warning Zone
            status = 'Warning';
        }

        return {
            ...currentLoad,
            totalCognitiveCost: newTotal,
            status
        };
    },

    /**
     * Checks if a specific action is blocked by the regulator.
     * [PRODUCT CHANGE]: ALWAYS FALSE. Analytics only.
     */
    isLockedOut: (currentLoad: DailyLoad): boolean => {
        return false;
    }
};
