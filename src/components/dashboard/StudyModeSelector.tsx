import React from 'react';
import { LectureStudyMode } from '@/core/types';
import {
    getModeMultiplier,
    getModeLabel,
    getModeIcon,
    getModeDescription,
    calculateCustomExpectedTime,
    recommendStudyMode,
    checkModeWarning
} from '@/lib/studyModeHelpers';

interface StudyModeSelectorProps {
    lectureDuration: number;
    difficulty: number;
    selectedMode?: LectureStudyMode;
    onSelect: (mode: LectureStudyMode) => void;
}

export const StudyModeSelector: React.FC<StudyModeSelectorProps> = ({
    lectureDuration,
    difficulty,
    selectedMode = 'standard',
    onSelect
}) => {
    const recommendation = recommendStudyMode(difficulty);
    const modes: LectureStudyMode[] = ['achievement', 'standard', 'importance'];

    return (
        <div className="study-mode-selector" dir="rtl">
            {/* Recommendation Banner */}
            <div className="recommendation-banner mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-blue-400 text-sm font-semibold mb-1">
                    <span>🤖</span>
                    <span>توصية المنصة</span>
                </div>
                <p className="text-slate-300 text-sm text-center">
                    {getModeIcon(recommendation.mode)} {recommendation.reason}
                </p>
            </div>

            {/* Mode Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {modes.map((mode) => {
                    const isSelected = selectedMode === mode;
                    const isRecommended = mode === recommendation.mode;
                    const multiplier = getModeMultiplier(mode);
                    const expectedTime = calculateCustomExpectedTime(lectureDuration, mode);

                    // Check if this mode is inappropriate for the difficulty
                    const warningCheck = checkModeWarning(difficulty, mode);
                    const isInappropriate = warningCheck.shouldWarn;

                    return (
                        <button
                            key={mode}
                            onClick={() => onSelect(mode)}
                            className={`
                                relative p-6 rounded-xl border-2 transition-all duration-300
                                ${isSelected
                                    ? 'border-indigo-500 bg-indigo-500/20 shadow-xl shadow-indigo-500/30'
                                    : isInappropriate
                                        ? 'border-slate-700/50 bg-slate-900/50 opacity-50 hover:opacity-70'
                                        : 'border-slate-700 bg-slate-800/40 hover:border-indigo-400/50 hover:bg-slate-800/60'
                                }
                            `}
                        >
                            {/* Recommended Badge */}
                            {isRecommended && (
                                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                    موصى به
                                </div>
                            )}

                            {/* Icon */}
                            <div className="text-4xl mb-3">
                                {getModeIcon(mode)}
                            </div>

                            {/* Label */}
                            <h3 className="text-lg font-bold text-white mb-2">
                                {getModeLabel(mode)}
                            </h3>

                            {/* Multiplier */}
                            <div className="text-2xl font-bold text-indigo-400 mb-2">
                                {multiplier}×
                            </div>

                            {/* Expected Time */}
                            <div className="text-sm text-slate-400 mb-3">
                                الوقت المتوقع: <span className="text-white font-semibold">{expectedTime}</span> دقيقة
                            </div>

                            {/* Description */}
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {getModeDescription(mode)}
                            </p>
                            {/* Selection Indicator */}
                            {isSelected && (
                                <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                            )}

                            {/* Warning Badge for Inappropriate Modes */}
                            {isInappropriate && (
                                <div className="absolute top-3 left-3 px-3 py-1 bg-red-500/90 rounded-full flex items-center gap-1 shadow-lg">
                                    <span className="text-xs">⚠️</span>
                                    <span className="text-white text-xs font-bold">غير مناسب</span>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Info Footer */}
            <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-white/5">
                <p className="text-xs text-slate-400 text-center">
                    💡 يمكنك تغيير نظام التقييم بعد إنشاء المحاضرة، لكن سيظهر لك تحذير
                </p>
            </div>
        </div>
    );
};
