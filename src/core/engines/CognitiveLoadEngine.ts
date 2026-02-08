import { StudentProfile, StudySession } from '@/core/types';

// ------------------------------------------------------------------
// TYPES
// ------------------------------------------------------------------

export interface CognitiveEvaluation {
    cognitiveLoadIndex: number;     // 0-10
    performanceGrade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D';
    isValid: boolean;               // Anti-abuse flag
    difficultyPenalty: number;
    rawIndex: number;
    timeRatio: number;
    message?: string;               // Arabic feedback message
    color?: 'green' | 'blue' | 'red'; // Color indicator for UI
}

export interface AdaptiveResult {
    nextExpectedTimeMinutes: number;
    multiplier: number;
    cumulativeIndex: number;
}


// ------------------------------------------------------------------
// CONFIGURATION (STRICT)
// ------------------------------------------------------------------

const BASE_MULTIPLIER = 2.0; // Standard Academic Baseline (2x)
const MIN_VALID_RATIO = 0.25; // 25% of lecture duration minimum
const WINDOW_SIZE = 5; // Rolling window size


// ------------------------------------------------------------------
// CORE ENGINE
// ------------------------------------------------------------------

export const CognitiveLoadEngine = {
    /**
     * Calculates the EXPECTED study time for a specific lecture.
     * Applies Study Mode multiplier first, then "Adaptive Multiplier" based on student performance.
     */
    calculateExpectedTime: (
        lectureDurationMinutes: number,
        profile: StudentProfile,
        difficulty: number, // 0-10
        customMultiplier?: number // From Study Mode (1.5, 2.0, 2.5)
    ): number => {
        // STUDY MODE MULTIPLIER (1.5x, 2x, 2.5x)
        // If provided, use it. Otherwise default to BASE_MULTIPLIER (2x)
        const studyModeMultiplier = customMultiplier || BASE_MULTIPLIER;
        const baseExpected = lectureDurationMinutes * studyModeMultiplier;

        // 🚨 RULE: FIRST-TIME STUDENT
        // If this is the student's first session ever, force baseline.
        if (profile.totalSessions === 0) {
            return Math.round(baseExpected);
        }

        // CALCULATE ADAPTIVE MULTIPLIER
        // Based on Cumulative Index (0-10)
        let adaptiveMultiplier = 1.0;
        const ci = profile.cumulativeIndex || 5.0; // Default to 5.0 (Average) if missing

        if (ci >= 8.5) adaptiveMultiplier = 0.85;       // High Score (Efficient) -> Reduced Time
        else if (ci >= 7.0) adaptiveMultiplier = 0.95;
        else if (ci >= 5.5) adaptiveMultiplier = 1.0;   // Normal
        else if (ci >= 4.0) adaptiveMultiplier = 1.15;
        else adaptiveMultiplier = 1.3;                  // Low Score (Struggles) -> Increased Time

        // Safety Clamp (Strict Bounds)
        if (adaptiveMultiplier < 0.85) adaptiveMultiplier = 0.85;
        if (adaptiveMultiplier > 1.3) adaptiveMultiplier = 1.3;

        // DIFF ADJUSTMENT (Soft)
        // Harder lectures get +5% per difficulty point above neutral
        const difficultyFactor = 1 + (difficulty * 0.05);

        // FINAL CALCULATION
        let adaptiveTime = baseExpected * adaptiveMultiplier * difficultyFactor;

        return Math.round(adaptiveTime);
    },

    /**
     * STUDY MODE EVALUATION SYSTEM (v3.0)
     * 
     * Philosophy aligned with Study Mode multipliers:
     * - Achievement Mode (1.5×): Fast but thorough
     * - Standard Mode (2×): Official evaluation baseline
     * - Importance Mode (2.5×): Deep work encouraged
     * 
     * Rules:
     * 1. A < L → Anti-cheating (gradual penalty)
     * 2. L ≤ A ≤ E → Perfect zone (full mark)
     * 3. A > E → Deep learner (slight penalty but still good)
     */
    evaluateSession: (
        actualMinutes: number,
        expectedMinutes: number,
        lectureDuration: number,
        difficulty: number
    ): CognitiveEvaluation => {
        // 🚨 RULE: 1-MINUTE MINIMUM
        if (actualMinutes < 1) {
            return {
                cognitiveLoadIndex: 0,
                performanceGrade: 'D',
                isValid: false,
                difficultyPenalty: 0,
                rawIndex: 0,
                timeRatio: actualMinutes / expectedMinutes,
                message: 'الوقت قصير جداً، الجلسة غير صالحة.',
                color: 'red'
            };
        }

        const A = actualMinutes;
        const L = lectureDuration;
        const E = expectedMinutes; // Can be L × 1.5, 2.0, or 2.5 depending on mode

        let score = 5.0;
        let message = '';
        let color: 'green' | 'blue' | 'red' = 'green';

        // ==========================================
        // RULE 1: EARLY FINISH (A < L)
        // Anti-Cheating Zone
        // ==========================================
        if (A < L) {
            // Gradual reduction starting from 9.0 down to 5.0
            // The closer to 0, the worse the score
            const missingRatio = (L - A) / L; // 0.0 to 1.0
            score = Math.max(5, 9 - (missingRatio * 4)); // Range: 5.0 to 9.0

            color = 'red';
            message = 'يبدو أنك أنهيت المحاضرة بسرعة أقل من زمنها الطبيعي، حاول التعمق أكثر.';
        }
        // ==========================================
        // RULE 2: PERFECT ZONE (L ≤ A ≤ E)
        // Golden Zone - Full Mark
        // ==========================================
        else if (A >= L && A <= E) {
            // Check if slightly earlier than expected (within 10 min)
            const earlyMargin = E - A;

            if (earlyMargin >= 10) {
                // Finished significantly before expected → slight reduction
                score = 9.8;
                message = 'أنهيت قبل المتوقع بقليل، حاول زيادة التعمق في المحاضرات القادمة.';
            } else {
                // Perfect timing
                score = 10.0;
                message = 'ممتاز! أنهيت المحاضرة في الوقت المتوقع أو أقل – استمر هكذا.';
            }

            color = 'green';
        }
        // ==========================================
        // RULE 3: DEEP LEARNER ZONE (A > E)
        // Overtime but not heavily penalized
        // ==========================================
        else if (A > E) {
            // Apply soft penalty based on how much over expected
            const overRatio = (A - E) / E; // 0.0 to infinity
            score = Math.max(6, 10 - (overRatio * 3)); // Gentler than old formula

            color = 'blue';
            message = 'استغرقت وقتًا أطول من المتوقع لكن يبدو أنك فهمت جيدًا – استمر.';
        }

        // Clamp 0-10
        score = Math.max(0, Math.min(10, score));

        // PERFORMANCE GRADE (Direct Mapping)
        let grade: CognitiveEvaluation['performanceGrade'] = 'D';
        if (score >= 9.0) grade = 'A+';
        else if (score >= 7.5) grade = 'A';
        else if (score >= 6.0) grade = 'B+';
        else if (score >= 5.0) grade = 'B';
        else if (score >= 4.0) grade = 'C+';
        else if (score >= 3.0) grade = 'C';
        else grade = 'D';

        return {
            cognitiveLoadIndex: Number(score.toFixed(1)),
            performanceGrade: grade,
            isValid: true,
            difficultyPenalty: 0,
            rawIndex: score,
            timeRatio: A / E,
            message,
            color
        };
    },

    /**
     * Updates the Student Profile with the new Cumulative Index.
     * Uses a Rolling Window of the last 5 VALID sessions.
     */
    computeNewCumulativeIndex: (
        currentCumulative: number,
        newSessionIndex: number, // Validation: This is now COST
        previousSessions: StudySession[]
    ): number => {
        // Collect last 4 VALID indices + new one
        const validHistory = previousSessions
            .filter(s =>
                s.isValid !== false &&
                // STRICT: 1 Minute Rule
                (s.actualDuration >= 1) &&
                s.status !== 'INTERRUPTED' &&
                s.status !== 'FORCED_END' &&
                s.isValidForMetrics !== false &&
                s.cognitiveCost !== undefined
            )
            .slice(-4) // Take last 4
            .map(s => s.cognitiveCost || 0);

        const window = [...validHistory, newSessionIndex];

        // Average
        const sum = window.reduce((a, b) => a + b, 0);
        const avg = sum / window.length;

        return Number(avg.toFixed(1));
    }
};
