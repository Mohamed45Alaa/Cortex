import { Lecture, StudySession } from '../types';

export const ProgressEngine = {
    /**
     * Calculates valid academic progress.
     * "Never calculate progress using: Lecture count, Time alone, Completion checklists"
     */
    calculateProgress: (lecture: Lecture, sessions: StudySession[]): number => {
        if (!sessions.length) return 0;

        // Get latest valid session
        const latest = sessions[sessions.length - 1];

        // Base Metric: Understanding
        let progress = latest.postUnderstanding || 0;

        // Penalty for instability (Time Decay)
        // If last session was > 7 days ago, decay progress
        const daysSince = (Date.now() - latest.startTime) / (1000 * 60 * 60 * 24);
        if (daysSince > 7) {
            progress *= 0.9; // 10% decay
        }

        // Penalty for "Fake Progress" (Short duration but high understanding claim)
        if (latest.actualDuration && latest.actualDuration < (lecture.duration * 0.2)) {
            // If studied for < 20% of length but claims high understanding -> Suspicious
            // Cap progress
            progress = Math.min(progress, 30);
        }

        return Math.round(progress);
    }
};
