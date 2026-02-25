'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number | React.ReactNode;
    subtext: string;
    color: 'emerald' | 'purple' | 'amber';
    icon?: LucideIcon;
    tooltipContent?: React.ReactNode;
    tooltipWidth?: string;
    onDoubleClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    subtext,
    color,
    icon: Icon,
    tooltipContent,
    tooltipWidth = 'w-64',
    onDoubleClick
}) => {
    // Complex color mapping for glowing borders and gradients
    const colorStyles = {
        emerald: {
            text: 'text-emerald-400',
            bg: 'bg-emerald-950/20',
            border: 'border-emerald-500/50',
            shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.3),inset_0_0_20px_rgba(16,185,129,0.1)]',
            hoverShadow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.5),inset_0_0_30px_rgba(16,185,129,0.2)]',
            icon: 'text-emerald-300'
        },
        purple: {
            text: 'text-purple-400',
            bg: 'bg-purple-950/20',
            border: 'border-purple-500/50',
            shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.3),inset_0_0_20px_rgba(168,85,247,0.1)]',
            hoverShadow: 'group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5),inset_0_0_30px_rgba(168,85,247,0.2)]',
            icon: 'text-purple-300'
        },
        amber: {
            text: 'text-amber-400',
            bg: 'bg-amber-950/20',
            border: 'border-amber-500/50',
            shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.3),inset_0_0_20px_rgba(245,158,11,0.1)]',
            hoverShadow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.5),inset_0_0_30px_rgba(245,158,11,0.2)]',
            icon: 'text-amber-300'
        }
    };

    const style = colorStyles[color];

    return (
        <div
            className={`relative w-full h-[150px] group transition-all duration-500 ease-out transform scale-[0.95] hover:scale-[0.97] active:scale-[0.93] hover:hue-rotate-15 cursor-pointer ${style.hoverShadow} rounded-2xl z-10 hover:z-50`}
            onDoubleClick={onDoubleClick}
        >

            <div className={`w-full h-full rounded-2xl p-6 flex flex-col justify-center items-center gap-5 backdrop-blur-md overflow-hidden border ${style.bg} ${style.border} ${style.shadow} relative`}>
                {/* Inner ambient glow (simulating the curves in the reference image) */}
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-${color}-500/20 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 group-hover:scale-[1.8] group-hover:-translate-x-4 transition-all duration-700 ease-in-out pointer-events-none`} />
                <div className={`absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-${color}-500/10 to-transparent rounded-full blur-xl opacity-40 group-hover:opacity-90 group-hover:scale-150 transition-all duration-700 ease-in-out pointer-events-none`} />

                {/* Top section: Title and Icon */}
                <div className="flex w-full justify-center items-center relative z-10">
                    <span className="text-[23px] font-bold tracking-wide text-gray-200 text-center" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {label}
                    </span>

                    {Icon && (
                        <div className="absolute right-0 inset-y-0 flex items-center opacity-70">
                            <Icon size={20} className={style.icon} strokeWidth={1.5} />
                        </div>
                    )}
                </div>

                {/* Middle section: Value */}
                <div className="flex w-full justify-center items-center z-10">
                    <div className={`text-[40px] font-bold tracking-tight ${style.text} text-center leading-none`} style={{ textShadow: `0 0 10px var(--tw-shadow-color)` }}>
                        {value}
                    </div>
                </div>
            </div>

            {/* Tooltip Content */}
            {tooltipContent && (
                <div className={`absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 top-full left-1/2 -translate-x-1/2 mt-4 ${tooltipWidth} bg-[#14161F]/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-4 shadow-2xl flex flex-col gap-2 pointer-events-auto`}>
                    {/* Tooltip Arrow */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#14161F] border-t border-l border-indigo-500/30 transform rotate-45" />

                    <div className="relative z-10 text-right space-y-2" dir="rtl">
                        {tooltipContent}
                    </div>
                </div>
            )}
        </div >
    );
};
