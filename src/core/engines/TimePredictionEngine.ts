import { Lecture, StudentProfile, SubjectConfig } from '../types';

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
        // 1. Calculate Historical Baseline (The "Personal Constant")
        // "How long does this student typically take to finish a lecture?"
        let baselineMinutes = 60; // Default fallback

        if (pastSessions.length > 0) {
            const validSessions = pastSessions.filter(s => s.actualDuration > 10); // Ignore noise < 10m
            if (validSessions.length > 0) {
                const totalDuration = validSessions.reduce((sum, s) => sum + s.actualDuration, 0);
                baselineMinutes = totalDuration / validSessions.length;
            }
        }

        // 2. Apply Relative Difficulty (The "Variable Multiplier")
        // Formula: Expected = Baseline * (Difficulty / 5)
        // Difficulty 5 = Neutral (1.0x)
        const difficultyMultiplier = Math.max(0.1, lecture.relativeDifficulty / 5.0);

        let projectedMinutes = baselineMinutes * difficultyMultiplier;

        // If no history, we might fallback to lecture.duration?
        // Spec says: "BaselineTime represents... standardized lecture". 
        // If system is new, we rely on lecture.duration as the "proxy baseline".
        if (pastSessions.length === 0) {
            projectedMinutes = lecture.duration * difficultyMultiplier;
        }

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
