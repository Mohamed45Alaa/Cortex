/**
 * ENGINEERING: COGNITIVE ENGINE (DETERMINISTIC)
 * Reference: Cognitive System Implementation Plan
 * 
 * ROLE:
 * Pure mathematical engine for calculating:
 * 1. Time Difficulty (Linear Mapping)
 * 2. Understanding Difficulty (Inversion)
 * 3. Relative Difficulty (Mean)
 * 4. Expected Study Time (Standard & Adaptive)
 * 5. Cognitive Index & Grading
 * 6. Cognitive Load Score (Biological Cost)
 * 
 * PRINCIPLES:
 * - Deterministic: Same Input = Same Output
 * - No Fuzzy Logic: Strict Linear Scaling
 * - 0-10 Scale for all indices
 */

// PART 8: GRADE MAPPING CONSTANTS
export type Grade = 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D';

export const CognitiveEngine = {

    /**
     * MASTER CALCULATION (STRICT CONTRACT)
     * Returns the full set of metrics required for System Persistence.
     */
    calculate: (params: {
        lectureDuration: number,
        actualDuration: number,
        relativeDifficulty: number, // 0-10
        studentIndex?: number | null // Optional for adaptive baseline
    }) => {
        const { lectureDuration, actualDuration, relativeDifficulty, studentIndex } = params;

        // 1. Calculate Expected Time
        const expected = CognitiveEngine.calculateExpectedStudyTime(lectureDuration, relativeDifficulty, studentIndex);

        // 2. Calculate Cognitive Load Score (Biological Cost)
        const loadScore = CognitiveEngine.calculateCognitiveLoadScore(expected, actualDuration, relativeDifficulty);

        // 3. Determine Grade (Based on Efficiency/Cost)
        // strict 0-10 Scale
        const grade = CognitiveEngine.determineGrade(loadScore);

        return {
            expectedStudyTimeMinutes: expected,
            relativeDifficulty: relativeDifficulty,
            cognitiveLoadIndex: Math.round(loadScore * 10) / 10, // 1 decimal place
            performanceGrade: grade,
            // DELETED: performanceIndex
        };
    },

    /**
     * PART 1: TIME DIFFICULTY
     * Maps duration 15m -> 1.667 to 120m -> 10.000
     * Linear Scale.
     */
    calculateTimeDifficulty: (durationMinutes: number): number => {
        const minTime = 15;
        const maxTime = 120;
        const minDiff = 1.667;
        const maxDiff = 10.0;

        // Clamp input
        if (durationMinutes < minTime) return minDiff;
        if (durationMinutes > maxTime) return maxDiff;

        // MEDICAL GRADE = FOLLOW THE TABLE DATA.
        const mapping: Record<number, number> = {
            15: 1.667,
            30: 3.334,
            45: 5.001,
            60: 6.668,
            75: 8.335,
            90: 9.168,
            105: 9.584,
            120: 10.000
        };

        if (mapping[durationMinutes]) return mapping[durationMinutes];

        // Piecewise Interpolation for non-standard times
        const breakpoints = [15, 30, 45, 60, 75, 90, 105, 120];

        // 1. Find range
        for (let i = 0; i < breakpoints.length - 1; i++) {
            const low = breakpoints[i];
            const high = breakpoints[i + 1];
            if (durationMinutes >= low && durationMinutes <= high) {
                const range = high - low;
                const progress = (durationMinutes - low) / range;
                const valLow = mapping[low];
                const valHigh = mapping[high];
                return valLow + progress * (valHigh - valLow);
            }
        }

        // Out of bounds
        if (durationMinutes < 15) return 1.667 * (durationMinutes / 15);
        return 10.0;
    },

    /**
     * PART 2: UNDERSTANDING INVERSION
     * Understanding 1 -> Difficulty 10
     * Understanding 10 -> Difficulty 1
     */
    calculateUnderstandingDifficulty: (understandingLevel: number): number => {
        // Clamp input 1-10
        const level = Math.max(1, Math.min(10, understandingLevel));
        const difficulty = 11 - level;
        return difficulty;
    },

    /**
     * PART 3: RELATIVE DIFFICULTY
     * Mean of TimeDifficulty and UnderstandingDifficulty
     */
    calculateRelativeDifficulty: (timeDiff: number, undDiff: number): number => {
        const mean = (timeDiff + undDiff) / 2;
        // Clamp 0-10 and Round 1 decimal
        const result = Math.min(10, Math.max(0, mean));
        return Math.round(result * 10) / 10;
    },

    /**
     * PART 5 & 9: SCALE EXPECTED STUDY TIME (ADAPTIVE)
     * Base = Duration * 2
     * Final = Base * (RelativeDifficulty / 5) * AdaptiveFactor(Index)
     * 
     * Adaptive Rules:
     * - Index > 9 (Fast): x0.9 (Reward efficiency)
     * - Index < 4 (Struggling): x1.2 (Remedial buffer)
     * - Constraint: Diff 10 is typically max, but individual adaptation allows variation.
     */
    calculateExpectedStudyTime: (lectureDuration: number, relativeDifficulty: number, studentIndex: number | null = null): number => {
        // Step 1: Base Expected Time (x2 rule)
        const base = lectureDuration * 2;

        /**
         * CRITICAL RULE: FIRST-TIME STUDENT (ONBOARDING CONTRACT)
         * If studentIndex is 0 (New Student), we MUST NOT apply strictly physics.
         * The student has no history, so difficulty scaling is unfair/inaccurate.
         * We simply double the time to ensure they have enough buffer.
         */
        if (studentIndex === 0) {
            return Math.round(base);
        }

        // Step 2: Difficulty Scaling
        // 5 = x1 (Standard)
        // 10 = x2 (Hard)
        const difficultyMultiplier = relativeDifficulty / 5;

        let final = base * difficultyMultiplier;

        // Step 3: Adaptive Logic (Part 9)
        if (studentIndex !== null) {
            // Adaptive logic uses Cost now? 
            // Previous: Index (Performance). High Index = Good. 
            // New: Cost (Load). Low Cost = Good.
            // If Cost < 3 (Efficient) -> x0.9
            // If Cost > 8 (Struggling) -> x1.2

            // NOTE: studentIndex param passed here. Caller must pass Cost-compatible value?
            // "studentIndex" usually refers to cumulativeIndex.
            // If cumulativeIndex is now Cost, we invert logic here.

            if (studentIndex <= 3.0) { // Efficient
                final *= 0.9;
            } else if (studentIndex >= 8.0) { // Struggling
                final *= 1.2;
            }
        }

        return Math.round(final);
    },

    /**
     * PART 10: COGNITIVE LOAD SCORE
     * Formula: (Actual / Expected) * (RelativeDifficulty / 10) * 10
     * Range: 0 - 10
     * Interpretation: High Score = High Mental Cost.
     */
    calculateCognitiveLoadScore: (expectedMinutes: number, actualMinutes: number, relativeDifficulty: number): number => {
        if (expectedMinutes <= 0) return 0;

        // Ratio > 1 means Slower (More time taken) -> Higher cost
        const timeRatio = actualMinutes / expectedMinutes;

        // Difficulty factor (0-1)
        const diffFactor = relativeDifficulty / 10;

        // Raw Score (0-10 Scale)
        const score = timeRatio * diffFactor * 10;

        // Cap at 10 for UI consistency
        return Math.min(10, Math.max(0, score));
    },

    /**
     * PART 8: GRADE MAPPING (COST BASED)
     * Low Cost = High Grade
     */
    determineGrade: (cost: number): Grade => {
        // Cost 0-10
        if (cost <= 2.5) return 'A+';
        if (cost <= 4.0) return 'A';
        if (cost <= 6.0) return 'B+';
        if (cost <= 7.5) return 'B';
        if (cost <= 8.5) return 'C+';
        if (cost <= 9.5) return 'C';
        return 'D';
    }
};
