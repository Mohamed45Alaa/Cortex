import React from 'react';
import { Play, Pause } from 'lucide-react';

interface FloatingTimerPillProps {
    ms: number;
    isPaused: boolean;
    onClick?: () => void;
    onTogglePause?: () => void; // Added for controls
    className?: string; // Allow custom positioning overrides if needed
}

export const FloatingTimerPill: React.FC<FloatingTimerPillProps> = ({
    ms,
    isPaused,
    onClick,
    onTogglePause,
    className
}) => {
    // We still check activeSession existance for safety if needed, 
    // but the Parent usually controls rendering.

    const formatTime = (ms: number) => {
        const totalSeconds = Math.ceil(ms / 1000);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Default positioning class if none provided
    const positionClass = className || "fixed top-6 left-1/2 -translate-x-1/2";

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Don't trigger the scroll-to-timer click
        onTogglePause?.();
    };

    return (
        <div
            onClick={onClick}
            className={`${positionClass} flex items-center bg-black/80 backdrop-blur-xl border border-white/10 p-1.5 pr-4 rounded-full shadow-2xl animate-in slide-in-from-top-4 fade-in duration-500 cursor-pointer hover:bg-black/90 hover:scale-105 transition-all z-[9999] select-none group`}
        >
            {/* CONTROL BUTTON */}
            <button
                onClick={handleToggle}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all mr-2 ${isPaused
                        ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                    }`}
            >
                {isPaused ? (
                    <Play size={14} fill="currentColor" />
                ) : (
                    <Pause size={14} fill="currentColor" />
                )}
            </button>

            {/* STATUS DOT */}
            <div className="mr-3">
                {isPaused ? (
                    <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                ) : (
                    <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
                    </div>
                )}
            </div>

            <div className="flex items-center space-x-2">
                <span className={`font-mono text-sm font-bold ${isPaused ? 'text-amber-500' : 'text-emerald-400'}`}>
                    {formatTime(ms)}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    {isPaused ? 'PAUSED' : 'FOCUS'}
                </span>
            </div>
        </div>
    );
};
