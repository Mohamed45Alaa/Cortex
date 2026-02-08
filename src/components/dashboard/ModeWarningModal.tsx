"use client";

import { Language } from '@/core/i18n/translations';

interface ModeWarningModalProps {
    isOpen: boolean;
    warningType: 'hard_achievement' | 'easy_importance' | null;
    language: Language;
    translations: any;
    onCancel: () => void;
    onProceed: () => void;
}

export function ModeWarningModal({
    isOpen,
    warningType,
    language,
    translations,
    onCancel,
    onProceed
}: ModeWarningModalProps) {
    if (!isOpen || !warningType) return null;

    const warningMessage = warningType === 'hard_achievement'
        ? translations[language].mode_warning_hard_lecture
        : translations[language].mode_warning_easy_lecture;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={onCancel}
        >
            <div
                className="bg-gradient-to-br from-red-900/90 to-red-950/90 border-2 border-red-500 rounded-2xl p-8 max-w-lg w-full shadow-2xl shadow-red-500/30"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Warning Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center border-4 border-red-500">
                        <span className="text-5xl">⚠️</span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white text-center mb-4">
                    {translations[language].mode_warning_title}
                </h2>

                {/* Warning Message */}
                <p className="text-red-100 text-lg text-center mb-8 leading-relaxed">
                    {warningMessage}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    {/* Cancel Button - Primary Action */}
                    <button
                        onClick={onCancel}
                        className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-400/50 hover:scale-[1.02]"
                    >
                        {translations[language].mode_warning_btn_cancel}
                    </button>

                    {/* Proceed Button - Secondary Action */}
                    <button
                        onClick={onProceed}
                        className="w-full py-3 px-6 bg-red-800/50 hover:bg-red-700/60 text-red-200 font-semibold rounded-xl border border-red-600/50 transition-all duration-200 hover:border-red-500"
                    >
                        {translations[language].mode_warning_btn_proceed}
                    </button>
                </div>
            </div>
        </div>
    );
}
