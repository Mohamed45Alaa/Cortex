import { translations, Language } from '@/core/i18n/translations';
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
 * @param lang Language
 * @returns recommended mode and reason
 */
export function recommendStudyMode(difficulty: number, lang: Language = 'ar'): {
    mode: LectureStudyMode;
    reason: string;
} {
    const t = translations[lang];
    if (difficulty <= 4) {
        return {
            mode: 'achievement',
            reason: t.reason_easy
        };
    }

    if (difficulty <= 7) {
        return {
            mode: 'standard',
            reason: t.reason_standard
        };
    }

    return {
        mode: 'importance',
        reason: t.reason_hard
    };
}

/**
 * Gets the label for a study mode
 */
export function getModeLabel(mode: LectureStudyMode | undefined, lang: Language = 'ar'): string {
    const t = translations[lang];
    switch (mode) {
        case 'achievement':
            return t.mode_achievement;
        case 'importance':
            return t.mode_importance;
        case 'standard':
        default:
            return t.mode_standard;
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
export function getModeDescription(mode: LectureStudyMode, lang: Language = 'ar'): string {
    const t = translations[lang];
    switch (mode) {
        case 'achievement':
            return t.desc_achievement;
        case 'importance':
            return t.desc_importance;
        case 'standard':
        default:
            return t.desc_standard;
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
