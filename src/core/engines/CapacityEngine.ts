import { StudentProfile, DailyLoad } from '../types';

/**
 * ENGINEERING: CAPACITY ENGINE
 * Reference: PHASE_3_LOGIC_SPECIFICATION.md (Section 5)
 * 
 * ROLE:
 * Tracks the user's "Battery Level" (0-100).
 * Determines "Cognitive Bankruptcy".
 * 
 * INPUTS:
 * - StudentProfile (Current State)
 * - DailyLoad (Fatigue)
 * 
 * OUTPUTS:
 * - CurrentCapacity (0-100)
 * - Recommendation String
 */
export const CapacityEngine = {

    /**
     * Re-calculates the Student's Capacity based on today's load.
     * Should be called after every Session.
     */
    calculateCurrentCapacity: (
        profile: StudentProfile,
        dailyLoad: DailyLoad
    ): number => {
        // 1. Start with Profile Max (Conceptually 100%)
        let capacity = 100;

        // 2. Subtract Daily Load Impact
        // We normalize Load Units to Capacity Percentage.
        // Assuming 240 Load Units = 100% depletion.
        const depletion = (dailyLoad.totalCognitiveCost / 240) * 100;
        capacity -= depletion;

        // 3. Consistency Bonus (Recovery Efficiency)
        // High consistency users recover faster / resist fatigue better.
        // Bonus: up to +10% resilience.
        if (profile.consistencyIndex > 80) capacity += 5;

        // 4. Circadian Factor (Time of Day)
        // Late night (post 10 PM) incurs extra penalty
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 5) {
            capacity -= 15; // "The Sleep Tax"
        }

        // 5. Clamp
        return Math.max(0, Math.min(100, Math.round(capacity)));
    },

    /**
     * Determines if the user is Bankrupt.
     * Triggers "Hard Lockout".
     */
    isBankrupt: (capacity: number): boolean => {
        return capacity <= 5; // 5% buffer is functionally dead
    },

    /**
     * Generates the system's voice based on capacity.
     */
    getConsultation: (capacity: number): string => {
        if (capacity > 80) return "Systems Nominal. Ready for Heavy Load.";
        if (capacity > 50) return "Capacity Sustained. Proceed with Caution.";
        if (capacity > 20) return "Reserves Critical. Recommendation: Review Only.";
        return "SYSTEM FAILURE. IMMEDIATE RECOVERY REQUIRED.";
    }
};
