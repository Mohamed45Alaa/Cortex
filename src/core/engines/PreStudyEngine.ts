import { Lecture, StudySession, MentalLoad } from '../types';
import { CognitiveEngine } from './CognitiveEngine';

export const PreStudyEngine = {
    /**
     * Helper: Converts numerical difficulty (0-10) to MentalLoad category.
     */
    getMentalLoad: (difficulty: number): MentalLoad => {
        if (difficulty >= 8) return 'High';
        if (difficulty >= 4) return 'Medium';
        return 'Low';
    },

    /**
     * Calculates the Initial Cognitive Resistance (ICR).
     * Range: 0 (No resistance) to 1.0 (Maximum resistance/friction)
     * High resistance means the student is likely to procrastinate or find it hard to start.
     */
    calculateInitialResistance: (
        attentionLevel: 'Low' | 'Medium' | 'High',
        lectureMentalLoad: MentalLoad
    ): number => {
        let resistance = 0.5; // Base friction

        // Mental Load Impact
        if (lectureMentalLoad === 'High') resistance += 0.2;
        if (lectureMentalLoad === 'Low') resistance -= 0.1;

        // Attention Impact (Inverse: Low attention = High resistance)
        if (attentionLevel === 'Low') resistance += 0.3; // Hard to study what you ignored
        if (attentionLevel === 'High') resistance -= 0.2; // Easy to study what you focused on

        return Math.min(Math.max(resistance, 0.1), 1.0);
    },

    /**
     * Registers a session and returns the valid session object.
     * Throws error if pre-conditions are not met.
     */
    registerSession: (
        lecture: Lecture,
        preUnderstanding: number, // 0-100
        attentionLevel: 'Low' | 'Medium' | 'High'
    ): StudySession => {
        if (preUnderstanding < 0 || preUnderstanding > 100) {
            throw new Error("Understanding must be 0-100");
        }

        // Logic: If resistance is too high, maybe warn? (Handled by UI/Smart Warning Engine)

        // Derive Mental Load
        const mentalLoad = PreStudyEngine.getMentalLoad(lecture.relativeDifficulty);

        // We calculate these for the predictive engines later
        const resistance = PreStudyEngine.calculateInitialResistance(attentionLevel, mentalLoad);

        const startTime = Date.now();

        return {
            id: crypto.randomUUID(),
            lectureId: lecture.id,
            parentId: lecture.id,
            subjectId: lecture.subjectId,
            date: new Date(startTime).toISOString(), // Temporary, usually completion date

            startTime: startTime,
            endTime: null,
            status: 'IN_PROGRESS',

            expectedDuration: CognitiveEngine.calculateExpectedStudyTime(lecture.duration, lecture.relativeDifficulty),
            actualDuration: 0,
            cognitiveCost: 0,
            performanceGrade: 'C',
            focusPerformance: 100,

            preUnderstanding,
            // focusWindowAttempted: 25, // Removed as it is not in StudySession type
        };
    }
};
