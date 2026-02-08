'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    subtext: string;
    color: 'emerald' | 'purple' | 'amber';
    icon?: LucideIcon;
}

export const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    subtext,
    color,
    icon: Icon
}) => {
    // strict color mapping
    const colorMap = {
        emerald: 'text-emerald-400',
        purple: 'text-violet-400',
        amber: 'text-amber-400'
    };

    const accentClass = colorMap[color];

    return (
        <div className="bg-[#14161F] border border-white/5 rounded-2xl p-6 h-[140px] flex flex-col justify-between shadow-sm relative group transition-all hover:bg-[#1A1D29] hover:border-white/10">
            {/* Top Row: Label & Optional Icon */}
            <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
                    {label}
                </span>
                {Icon && (
                    <Icon
                        size={14}
                        className="text-slate-600 group-hover:text-slate-400 transition-colors"
                    />
                )}
            </div>

            {/* Middle: Value */}
            <div className={`text-4xl font-semibold tracking-tight ${accentClass}`}>
                {value}
            </div>

            {/* Bottom: Subtext */}
            <div className="text-xs text-slate-500 font-medium truncate">
                {subtext}
            </div>
        </div>
    );
};
