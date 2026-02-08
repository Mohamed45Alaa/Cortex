import { StudySession } from '../types';
import { CognitiveLoadEngine } from './CognitiveLoadEngine';

export const EndSessionEngine = {
    /**
     * Completes a session using the Unified CognitiveLoadEngine.
     * STRICT 0-10 Scale.
     */
    evaluateSession: (
        session: StudySession,
        actualDuration: number
    ): StudySession => {
        // Basic validation
        if (actualDuration < 0) actualDuration = 0;

        const expected = session.expectedDuration || actualDuration || 30;
        const lectureDuration = expected / 2; // Approximate if missing, or we need lecture data?
        // Limitation: Session object might not have lecture relativeDifficulty if ad-hoc.
        // We assume 'Moderate' (5) if missing.
        const difficulty = 5;

        // Delegate to Master Engine
        const evaluation = CognitiveLoadEngine.evaluateSession(
            actualDuration,
            expected,
            lectureDuration,
            difficulty
        );

        return {
            ...session,
            actualDuration,
            cognitiveCost: evaluation.cognitiveLoadIndex,
            performanceGrade: evaluation.performanceGrade,
            isValid: evaluation.isValid,
            isValidForMetrics: true, // Ad-hoc sessions considered valid if completed?
            endedBy: 'USER',
            focusPerformance: 100 // Default/Placeholder
        };
    }
};
