import React from 'react';
import { useStore } from '@/store/useStore';

interface FloatingTimerPillProps {
    ms: number;
    isPaused: boolean;
    onClick?: () => void;
    className?: string; // Allow custom positioning overrides if needed
}

export const FloatingTimerPill: React.FC<FloatingTimerPillProps> = ({
    ms,
    isPaused,
    onClick,
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

    return (
        <div
            onClick={onClick}
            className={`${positionClass} flex items-center space-x-3 bg-black/80 backdrop-blur-xl border border-white/10 p-2 pl-3 pr-4 rounded-full shadow-2xl animate-in slide-in-from-top-4 fade-in duration-500 cursor-pointer hover:bg-black/90 hover:scale-105 transition-all z-[9999] select-none`}
        >
            {isPaused ? (
                <div className="w-2 h-2 rounded-full bg-amber-500/50" />
            ) : (
                <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
                </div>
            )}

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
