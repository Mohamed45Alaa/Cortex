import { StudentProfile, StudySession } from '../types';

export const StudentProfilerEngine = {
    /**
     * Updates the invisible profile stats based on the last session.
     * "Build an internal, invisible profile including: Study speed, Efficiency, etc."
     */
    updateProfile: (profile: StudentProfile, session: StudySession): StudentProfile => {
        // 1. Consistency Index Update
        // If session completed -> +0.02
        // If session abandoned -> -0.05
        let newConsistency = profile.consistencyIndex;
        if (session.endTime) {
            newConsistency = Math.min(newConsistency + 0.02, 1.0);
        } else {
            newConsistency = Math.max(newConsistency - 0.05, 0.0);
        }

        // 2. Base Speed / Efficiency Update (Simplistic for now)
        // If actualDuration < predicted -> Speed might be higher
        // Need access to lecture duration/weights to calculate true speed.

        // 3. Fatigue Recovery Rate
        // Dynamic adjustment based on consecutive sessions?

        return {
            ...profile,
            consistencyIndex: Number(newConsistency.toFixed(3))
        };
    }
};
