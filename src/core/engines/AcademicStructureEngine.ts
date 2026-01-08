import { Subject, Lecture, Difficulty, MentalLoad, LectureType } from '../types';

export const AcademicStructureEngine = {
    createSubject: (name: string, examDate: string, difficulty: Difficulty): Subject => {
        if (!name) throw new Error("Subject name is required");
        if (!examDate) throw new Error("Exam date is required");

        return {
            id: crypto.randomUUID(),
            name,
            examDate,
            difficulty, // Normalized from globalDifficulty matching strict types
            config: {
                lectureTreatment: 'Standard',
                cognitiveThreshold: 100,
                revisionRule: 'Spaced-Repetition',
                strictnessLevel: 'Standard',
                maxDailyLoad: 'Medium'
            },
            metrics: {
                stability: 0,
                readiness: 0,
                totalWeight: 0,
                nextExamCountdown: 90 // Default mock
            }
        };
    },

    createLecture: (
        subjectId: string,
        title: string,
        duration: number,
        understandingScore: number, // 1-10
        mentalLoad: MentalLoad,
        type: LectureType
    ): Lecture => {
        // Basic validation
        if (duration <= 0) throw new Error("Duration must be positive");

        // --- 1. DURATION SCORE NORMALIZATION ---
        // Step = 1.667 per 15 min block
        let durationScore = 0;
        if (duration <= 15) durationScore = 1.667;
        else if (duration <= 30) durationScore = 3.334;
        else if (duration <= 45) durationScore = 5.001;
        else if (duration <= 60) durationScore = 6.668;
        else if (duration <= 75) durationScore = 8.335;
        else if (duration <= 90) durationScore = 10.002;
        else durationScore = 10; // Cap at 10

        // Cap strict inputs if needed, though logic above handles ranges
        if (durationScore > 10) durationScore = 10;

        // --- 2. DIFF CALCULATION ---
        // Diff = (durationScore + (11 - understandingScore)) / 2
        // understandingScore is 1-10 (1=Low understanding/High Diff, 10=High understanding/Low Diff)

        // Guard understandingScore bounds
        const safeUnderstanding = Math.max(1, Math.min(10, understandingScore));

        // Invert Scale: 1 -> 10, 10 -> 1 using (11 - score)
        const understandingDifficulty = 11 - safeUnderstanding;

        const rawDiff = (durationScore + understandingDifficulty) / 2;

        console.log("[DEBUG] CreateLecture Calc:", {
            duration,
            durationScore,
            understandingScore,
            understandingDifficulty,
            rawDiff
        });

        // Round to 1 decimal place and clamp
        const relativeDifficulty = Math.max(0, Math.min(10, Math.round(rawDiff * 10) / 10));

        // Calculate basic weight
        const weight = duration * relativeDifficulty;

        return {
            id: crypto.randomUUID(),
            subjectId,
            title,
            duration,
            type,
            status: 'Pending',
            cognitiveWeight: weight,
            stability: 0,
            relativeDifficulty, // Persisted Strictly
            createdAt: new Date().toISOString()
        };
    }
};
