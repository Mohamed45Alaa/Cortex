import { StudySession } from '../types';

export const EndSessionEngine = {
    /**
     * Completes a session and calculates the Performance Index.
     */
    evaluateSession: (
        session: StudySession,
        actualDuration: number
    ): StudySession => {
        // Basic validation
        if (actualDuration < 0) throw new Error("Duration cannot be negative");

        const expected = session.expectedDuration || actualDuration; // Fallback if 0

        // --- PERFORMANCE INDEX CALCULATION ---
        // Definition:
        // Index = Efficiency Score (0-100)

        let performanceIndex = 0;

        if (expected <= 0) {
            // Edge case: No expectation set. Neutral score.
            performanceIndex = 50;
        } else {
            if (actualDuration <= expected) {
                // Efficient!
                // Ratio > 1.0 implies we were faster than expected.
                // However, user spec says: PerformanceRatio = Same / Same
                // Wait, spec logic:
                // "PerformanceRatio = ExpectedTime / ActualTime"
                // If Actual=30, Expected=60 -> Ratio=2.0 -> Score=200?? Clamp to 100.

                const ratio = expected / Math.max(1, actualDuration);
                performanceIndex = Math.min(100, ratio * 100);

                // Correction per spec:
                // "If ActualTime <= ExpectedTime: Index = min(100, PerformanceRatio * 100)"
                // Example: Exp 60, Act 30. Ratio = 2. Index = 200 -> 100.
                // Example: Exp 60, Act 50. Ratio = 1.2. Index = 120 -> 100.
                // Example: Exp 60, Act 60. Ratio = 1. Index = 100.
                // This implies ANY time faster than expected is 100% score?
                // Spec say: "Do NOT gamify. Do NOT reward." 
                // But logically, finishing early is good?
                // Yes, clamp to 100.

            } else {
                // Slower than expected (Overtime)
                // "If ActualTime > ExpectedTime: Index = max(0, 100 - ((ActualTime - ExpectedTime) / ExpectedTime) * 100)"

                const overtime = actualDuration - expected;
                const penaltyPercentage = (overtime / expected) * 100;
                performanceIndex = Math.max(0, 100 - penaltyPercentage);

                // Example: Exp 60, Act 90. Overtime 30. Penalty 50%. Index = 50.
                // Example: Exp 60, Act 120. Overtime 60. Penalty 100%. Index = 0.
            }
        }

        return {
            ...session,
            actualDuration,
            performanceIndex: Math.round(performanceIndex),
            // postUnderstanding removed as it requires user input not present in this flow yet
        };
    }
};
