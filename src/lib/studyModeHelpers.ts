import { LectureStudyMode } from '@/core/types';

// ==========================================
// STUDY MODE SYSTEM - Helper Functions
// ==========================================

/**
 * Gets the multiplier for a given study mode
 */
export function getModeMultiplier(mode: LectureStudyMode): number {
    switch (mode) {
        case 'achievement':
            return 1.5;
        case 'importance':
            return 2.5;
        case 'standard':
        default:
            return 2.0;
    }
}

/**
 * Recommends a study mode based on lecture difficulty
 * @param difficulty 0-10 scale
 * @returns recommended mode and reason
 */
export function recommendStudyMode(difficulty: number): {
    mode: LectureStudyMode;
    reason: string;
} {
    if (difficulty <= 4) {
        return {
            mode: 'achievement',
            reason: 'المحاضرة سهلة، نوصي بوضع الإنجاز.'
        };
    }

    if (difficulty <= 7) {
        return {
            mode: 'standard',
            reason: 'صعوبة متوسطة، الوضع الأساسي مناسب.'
        };
    }

    return {
        mode: 'importance',
        reason: 'محاضرة صعبة، نوصي بوضع الأهمية للتعمق.'
    };
}

/**
 * Gets the Arabic label for a study mode
 */
export function getModeLabel(mode?: LectureStudyMode): string {
    switch (mode) {
        case 'achievement':
            return 'وضع الإنجاز';
        case 'importance':
            return 'وضع الأهمية';
        case 'standard':
        default:
            return 'الوضع الأساسي';
    }
}

/**
 * Gets the icon for a study mode
 */
export function getModeIcon(mode: LectureStudyMode): string {
    switch (mode) {
        case 'achievement':
            return '🚀';
        case 'importance':
            return '🧠';
        case 'standard':
        default:
            return '⚖️';
    }
}

/**
 * Gets the description for a study mode
 */
export function getModeDescription(mode: LectureStudyMode): string {
    switch (mode) {
        case 'achievement':
            return 'اختر هذا للمحاضرات السهلة التي لا تتطلب أدوات الذكاء الاصطناعي أو الترجمة أو البحث العميق.';
        case 'importance':
            return 'للمحاضرات الصعبة أو الطويلة التي تتطلب أدوات الذكاء الاصطناعي والترجمة والفيديوهات الخارجية والتركيز العميق.';
        case 'standard':
        default:
            return 'موصى به – هذا هو وضع التقييم الرسمي.';
    }
}

/**
 * Calculates expected time for a lecture given its mode
 */
export function calculateCustomExpectedTime(
    duration: number,
    mode: LectureStudyMode
): number {
    const multiplier = getModeMultiplier(mode);
    return Math.round(duration * multiplier);
}

/**
 * Checks if a mode selection is inappropriate for the lecture difficulty
 * @param difficulty 0-10 scale
 * @param selectedMode The mode the student wants to select
 * @returns Warning object if inappropriate, null if ok
 */
export function checkModeWarning(
    difficulty: number,
    selectedMode: LectureStudyMode
): {
    shouldWarn: boolean;
    warningKey: 'hard_achievement' | 'easy_importance' | null;
} {
    // Hard lecture (difficulty > 7) + Achievement mode → Warning
    if (difficulty > 7 && selectedMode === 'achievement') {
        return {
            shouldWarn: true,
            warningKey: 'hard_achievement'
        };
    }

    // Easy lecture (difficulty <= 4) + Importance mode → Warning
    if (difficulty <= 4 && selectedMode === 'importance') {
        return {
            shouldWarn: true,
            warningKey: 'easy_importance'
        };
    }

    return {
        shouldWarn: false,
        warningKey: null
    };
}
