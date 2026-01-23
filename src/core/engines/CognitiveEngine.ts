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

        // 3. Calculate Performance Index (0-10)
        const index = CognitiveEngine.calculateCognitiveIndex(expected, actualDuration);

        // 4. Determine Grade
        const grade = CognitiveEngine.determineGrade(index);

        return {
            expectedStudyTimeMinutes: expected,
            relativeDifficulty: relativeDifficulty,
            cognitiveLoadIndex: Math.round(loadScore), // Integer for UI
            performanceGrade: grade,
            performanceIndex: index
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
            if (studentIndex >= 9.0) {
                final *= 0.9;
            } else if (studentIndex <= 4.0) {
                final *= 1.2;
            }
        }

        return Math.round(final);
    },

    /**
     * PART 10: COGNITIVE LOAD SCORE
     * Formula: (Actual / Expected) * (RelativeDifficulty / 10) * 100
     * Range: 0 - 100+
     * Interpretation: High Score = High Mental Cost.
     */
    calculateCognitiveLoadScore: (expectedMinutes: number, actualMinutes: number, relativeDifficulty: number): number => {
        if (expectedMinutes <= 0) return 0;

        // Ratio > 1 means Slower (More time taken) -> Higher cost
        const timeRatio = actualMinutes / expectedMinutes;

        // Difficulty factor (0-1)
        const diffFactor = relativeDifficulty / 10;

        // Raw Score
        const score = timeRatio * diffFactor * 100;

        // Cap for UI sanity (e.g. 200)? Or leave uncapped?
        // Prompt typically implies 0-100 scale, but logic allows overflow.
        // We will clamp to 100 as "Max Load" usually implies "Full Capacity".
        return Math.min(100, Math.round(score));
    },

    /**
     * PART 7: COGNITIVE INDEX
     * TimeRatio = Expected / Actual
     * Normalized 0-10
     */
    calculateCognitiveIndex: (expectedMinutes: number, actualMinutes: number): number => {
        if (actualMinutes <= 0) return 0;

        // 1. Apply Tolerance Cap (No bonus beyond 10 mins early)
        const cappedActual = Math.max(actualMinutes, expectedMinutes - 10);

        // 2. Calculate Ratio
        const ratio = expectedMinutes / cappedActual;

        // 3. Dynamic Normalization
        // Goal: Ratio 1.0 (On Time) -> Score 9.0 (A)
        // Goal: Max Ratio (10m early) -> Score 10.0 (A+)
        const maxRatio = expectedMinutes / (expectedMinutes - 10);

        // Slope calculation
        // Index = 9 + slope * (ratio - 1)
        // 10 = 9 + slope * (maxRatio - 1)
        // 1 = slope * (maxRatio - 1)
        // slope = 1 / (maxRatio - 1)

        const slope = 1 / (maxRatio - 1);

        let index = 9 + slope * (ratio - 1);

        // Fallback for very slow students
        return Math.min(10, Math.max(0, parseFloat(index.toFixed(2))));
    },

    /**
     * PART 8: GRADE MAPPING
     */
    determineGrade: (index: number): Grade => {
        if (index >= 9.5) return 'A+';
        if (index >= 8.5) return 'A';
        if (index >= 7.5) return 'B+';
        if (index >= 6.5) return 'B';
        if (index >= 5.5) return 'C+';
        if (index >= 4.0) return 'C';
        return 'D';
    }
};
