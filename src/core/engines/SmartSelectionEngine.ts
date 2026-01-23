import { Lecture } from '../types';

export const SmartSelectionEngine = {
    /**
     * Detects if the student is queuing up too much high-load work.
     * "Detect consecutive high-load selections"
     */
    detectHighLoadSequence: (selectedQueue: Lecture[]): string | null => {
        // Return warning message or null
        for (let i = 0; i < selectedQueue.length - 1; i++) {
            const current = selectedQueue[i];
            const next = selectedQueue[i + 1];

            // High load is difficulty >= 8
            if (current.relativeDifficulty >= 8 && next.relativeDifficulty >= 8) {
                return "You are attempting multiple high-load lectures consecutively. This significantly increases failure and burnout risk.";
            }
        }
        return null;
    },

    /**
     * Recommends the next lecture based on balance.
     * If last was High, recommend Low/Medium.
     */
    recommendNextLecture: (available: Lecture[], lastCompleted?: Lecture): Lecture | null => {
        if (!available.length) return null;

        if (lastCompleted && lastCompleted.relativeDifficulty >= 8) {
            // Find a Low load one (difficulty <= 3)
            const low = available.find(l => l.relativeDifficulty <= 3);
            if (low) return low;
        }

        // Default: Sort by weight (do heaviest first? No, do manageable first?)
        // "Smart" usually implies maintaining momentum. 
        // Return the one with moderate difficulty.
        return available[0];
    }
};
