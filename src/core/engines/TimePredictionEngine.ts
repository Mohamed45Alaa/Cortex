import { Lecture, StudentProfile, SubjectConfig } from '../types';
import { CognitiveEngine } from './CognitiveEngine';

/**
 * ENGINEERING: TIME PREDICTION ENGINE
 * Reference: PHASE_3_LOGIC_SPECIFICATION.md (Section 2)
 * 
 * ROLE:
 * Deterministic calculation of expected study duration.
 * It enforces "Time Dilation" or "Compression" based on the Subject's Strictness.
 * 
 * INPUTS:
 * - Lecture (Base Duration, Complexity)
 * - SubjectConfig (Strictness Level, Treatment)
 * - StudentProfile (Consistency Index)
 * 
 * OUTPUTS:
 * - Predicted Time (Minutes)
 */
export const TimePredictionEngine = {

    predictDuration: (
        lecture: Lecture,
        profile: StudentProfile,
        config: SubjectConfig,
        pastSessions: any[] = [] // Typed as any[] to avoid circular dependency, cast to StudySession internally
    ): number => {
        // 1. Determine Effective Student Index for Cognitive Engine
        // CRITICAL FIX: If totalSessions is 0, explicitly pass 0 to trigger "First-Time Rule" (x2 Base).
        // Otherwise, use the Lecture's mastery index if available.
        const effectiveIndex = (profile.totalSessions === 0)
            ? 0
            : (lecture.relativeDifficulty ?? null);

        // 2. Get Deterministic Base from Cognitive Engine (The "Truth")
        let projectedMinutes = CognitiveEngine.calculateExpectedStudyTime(
            lecture.duration,
            lecture.relativeDifficulty,
            effectiveIndex
        );

        // 3. Apply Historical Correction (Optional / Advanced)
        // If we have history, maybe we average the "Cognitive Base" with "Historical Actuals"?
        // For now, let's trust the Cognitive Engine as the Primary Logic per the Critical Fix prompt.
        // We will Apply the PHYSICS factors (Strictness, Treatment) to this base.

        // 3. Strictness Physics (The Global Variable)
        // See Phase 3 Spec: "Time Dilation" vs "Compression"
        switch (config.strictnessLevel) {
            case 'Relaxed':
                // The Exploratory State: +20% buffer for tangents
                projectedMinutes *= 1.2;
                break;
            case 'Standard':
                // The Baseline State: 1.0x
                projectedMinutes *= 1.0;
                break;
            case 'Military':
                // The Compression State: -15% forced efficiency
                // "Cram Mode" operationalized.
                projectedMinutes *= 0.85;
                break;
        }

        // 4. Lecture Treatment (Type Specifics)
        switch (config.lectureTreatment) {
            case 'Intensive':
                // Deep Dive: Requires 50% more time
                projectedMinutes *= 1.5;
                break;
            case 'Review-Only':
                // Skimming: Requires 50% less time
                projectedMinutes *= 0.5;
                break;
            case 'Standard':
            default:
                break;
        }

        // 5. Student Speed Factor (The Biological Variable)
        // High Consistency (>80) implies flow state capability -> 10% speed bonus
        // Low Consistency (<40) implies distraction -> 10% penalty
        if (profile.consistencyIndex > 80) projectedMinutes *= 0.9;
        if (profile.consistencyIndex < 40) projectedMinutes *= 1.1;

        // Round to nearest minute to avoid fractional display
        return Math.round(projectedMinutes);
    },

    /**
     * Calculates the confidence interval (Margin of Error).
     * Returns the +/- minutes range.
     * Military strictness tightens this window.
     */
    calculateConfidence: (predicted: number, config: SubjectConfig): number => {
        switch (config.strictnessLevel) {
            case 'Military': return 0; // No margin allowed.
            case 'Standard': return Math.round(predicted * 0.1); // +/- 10%
            case 'Relaxed': return Math.round(predicted * 0.2); // +/- 20%
        }
    }
};
