'use client';

import React from 'react';
import { SessionSegment, SegmentType } from '@/core/types';

interface SessionTimelineProps {
    segments: SessionSegment[];
    totalDuration: number; // ms
    lang?: 'ar' | 'en';
}

const getColor = (type: SegmentType) => {
    switch (type) {
        case 'ACTIVE': return '#10B981'; // Green-500
        case 'TOOL': return '#3B82F6'; // Blue-500
        case 'IDLE': return '#EAB308'; // Yellow-500
        case 'DISENGAGED': return '#EF4444'; // Red-500
        default: return '#6B7280';
    }
};

const getLabel = (type: SegmentType, lang: 'ar' | 'en') => {
    switch (type) {
        case 'ACTIVE': return lang === 'ar' ? 'مذاكرة عميقة' : 'Deep Focus';
        case 'TOOL': return lang === 'ar' ? 'استخدام الأدوات' : 'Tool Usage';
        case 'IDLE': return lang === 'ar' ? 'خمول الطور السلبي' : 'Idle / Passive';
        case 'DISENGAGED': return lang === 'ar' ? 'فقدان تركيزك / تشتت' : 'Context Loss';
        default: return lang === 'ar' ? 'غير معروف' : 'Unknown';
    }
};

export const SessionTimeline: React.FC<SessionTimelineProps> = ({ segments, totalDuration, lang = 'ar' }) => {
    if (!segments || segments.length === 0 || totalDuration === 0) {
        return <div className="w-full h-4 bg-slate-800 rounded-full animate-pulse" />;
    }

    return (
        <div className="w-full relative group">
            {/* The Bar */}
            <div className="flex w-full h-8 rounded-lg overflow-hidden border border-slate-700/50 shadow-inner bg-slate-900">
                {segments.map((segment, idx) => {
                    const duration = segment.duration || 0;
                    const widthPercent = (duration / totalDuration) * 100;

                    // Don't render tiny slivers
                    if (widthPercent < 0.5) return null;

                    return (
                        <div
                            key={idx}
                            style={{ width: `${widthPercent}%`, backgroundColor: getColor(segment.type) }}
                            className="h-full relative transition-all duration-300 hover:brightness-110"
                            title={`${getLabel(segment.type, lang)}: ${Math.round(duration / 1000)}${lang === 'ar' ? 'ث' : 's'}`}
                        >
                            {/* Hover Tooltip (Simple browser native 'title' used above, could enhance) */}
                        </div>
                    );
                })}
            </div>

            {/* Legend / Metrics Below (Optional, can be separate) */}
            <div className={`flex justify-between items-center mt-2 text-[10px] text-slate-500 px-1 font-mono uppercase tracking-wider ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span>0{lang === 'ar' ? 'د' : 'm'}</span>
                <span>{Math.round(totalDuration / 60000)} {lang === 'ar' ? 'د جلسة' : 'm Session'}</span>
            </div>
        </div>
    );
};
