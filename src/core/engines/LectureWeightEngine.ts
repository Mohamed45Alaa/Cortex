import { Lecture, StudentProfile } from '../types';

export const LectureWeightEngine = {
    /**
     * Calculates the "Effective Load" of a lecture.
     * Uses Relative Difficulty (0-10) as the primary scalar.
     */
    calculateEffectiveLoad: (lecture: Lecture): number => {
        // Formula: Duration * (Difficulty / 5)
        // 1.0x at Diff 5. 2.0x at Diff 10.
        const difficultyScalar = Math.max(0.1, lecture.relativeDifficulty / 5.0);
        return lecture.duration * difficultyScalar;
    },

    /**
     * Calculates the Personal Difficulty Score (0-10 Scale).
     * Adjusts the raw relativeDifficulty based on student profile.
     */
    calculatePersonalDifficulty: (lecture: Lecture, profile: StudentProfile): number => {
        let personalDiff = lecture.relativeDifficulty;

        // Consistency Modifier:
        // If consistency < 40, everything feels 20% harder.
        // If consistency > 80, everything feels 10% easier.
        if (profile.consistencyIndex < 40) personalDiff *= 1.2;
        if (profile.consistencyIndex > 80) personalDiff *= 0.9;

        // Clamp to 0-10
        return Math.min(10, Math.max(0, personalDiff));
    }
};
