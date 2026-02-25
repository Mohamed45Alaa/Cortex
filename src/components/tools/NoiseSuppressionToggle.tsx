import React from 'react';
import { useProfessionalNoiseElimination } from '@/hooks/useProfessionalNoiseElimination';
import { Mic2, MicOff, Loader2 } from 'lucide-react';

interface NoiseSuppressionToggleProps {
    onStreamReady?: (stream: MediaStream) => void;
    className?: string;
}

export const NoiseSuppressionToggle: React.FC<NoiseSuppressionToggleProps> = ({
    onStreamReady,
    className = ''
}) => {
    // Added Nuclear Mode Slider State
    const [noiseReductionLevel, setNoiseReductionLevel] = React.useState(100);
    const [showNoiseSlider, setShowNoiseSlider] = React.useState(false);

    const {
        isNoiseCanceling,
        setIsNoiseCanceling,
        isInitializing,
        error,
        processedStream,
        initMicrophone
    } = useProfessionalNoiseElimination(noiseReductionLevel);

    // Notify parent component when the processed conferencing stream is ready
    React.useEffect(() => {
        if (processedStream && onStreamReady) {
            onStreamReady(processedStream);
        }
    }, [processedStream, onStreamReady]);

    const handleToggle = () => {
        if (!processedStream && !isInitializing) {
            initMicrophone();
            // Start with it enabled if they click while off
            setIsNoiseCanceling(true);
            setShowNoiseSlider(false);
        } else {
            setIsNoiseCanceling(!isNoiseCanceling);
            if (isNoiseCanceling) setShowNoiseSlider(false); // Hide slider when toggling off
        }
    };

    if (error) {
        return (
            <div className="text-red-500 text-xs flex items-center gap-1">
                <MicOff size={14} />
                <span>Microphone Error</span>
            </div>
        );
    }

    return (
        <div className={`relative inline-flex flex-col ${className}`}>
            <button
                type="button"
                role="menuitemcheckbox"
                aria-checked={isNoiseCanceling}
                aria-label="Noise Suppression"
                onClick={handleToggle}
                disabled={isInitializing}
                title="Toggle Noise Suppression (Alt + A)"
                className={`
                relative flex items-center justify-between px-4 py-2 rounded-lg 
                font-medium transition-all duration-200 outline-none
                focus-visible:ring-2 focus-visible:ring-emerald-500
                ${isInitializing ? 'opacity-70 cursor-wait bg-slate-800 text-slate-400' : ''}
                ${!isInitializing && isNoiseCanceling
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30'
                        : ''}
                ${!isInitializing && !isNoiseCanceling
                        ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                        : ''}
            `}
            >
                <div className="flex items-center gap-2">
                    {isInitializing ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : isNoiseCanceling ? (
                        <MicOff size={18} />
                    ) : (
                        <Mic2 size={18} />
                    )}
                    <span className="text-sm">
                        {isInitializing
                            ? 'Starting Mic...'
                            : isNoiseCanceling
                                ? 'Studio Noise Elimination'
                                : 'Raw Microphone'}
                    </span>
                    {isNoiseCanceling && !isInitializing && (
                        <span
                            className="ml-2 text-[10px] text-slate-400 bg-slate-900/50 px-2 py-0.5 rounded shadow-inner hover:text-emerald-400"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowNoiseSlider(!showNoiseSlider);
                            }}
                        >
                            (Click for Slider)
                        </span>
                    )}
                </div>

                {/* Custom Checkbox Indicator for Accessibility/Visuals */}
                <div className={`
                ml-3 w-8 h-4 rounded-full relative transition-colors duration-300
                ${isNoiseCanceling ? 'bg-emerald-500' : 'bg-slate-600'}
            `}>
                    <div className={`
                    absolute top-[2px] w-3 h-3 bg-white rounded-full transition-transform duration-300
                    ${isNoiseCanceling ? 'left-[18px]' : 'left-[2px]'}
                `} />
                </div>
            </button>

            {/* Slider Dropdown Menu */}
            {showNoiseSlider && isNoiseCanceling && (
                <div className="absolute top-14 left-0 w-64 bg-slate-800 rounded-lg p-3 shadow-xl border border-slate-700/50 z-[100] animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-300 font-medium">قوة طمس الضوضاء</span>
                        <span className="text-xs font-mono text-emerald-400">{noiseReductionLevel}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={noiseReductionLevel}
                        onChange={(e) => setNoiseReductionLevel(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                    />
                </div>
            )}
        </div>
    );
};
