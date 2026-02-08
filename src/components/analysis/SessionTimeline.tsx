'use client';

import React from 'react';
import { SessionSegment, SegmentType } from '@/core/types';

interface SessionTimelineProps {
    segments: SessionSegment[];
    totalDuration: number; // ms
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

const getLabel = (type: SegmentType) => {
    switch (type) {
        case 'ACTIVE': return 'Deep Focus';
        case 'TOOL': return 'Tool Usage';
        case 'IDLE': return 'Idle / Passive';
        case 'DISENGAGED': return 'Context Loss';
        default: return 'Unknown';
    }
};

export const SessionTimeline: React.FC<SessionTimelineProps> = ({ segments, totalDuration }) => {
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
                            title={`${getLabel(segment.type)}: ${Math.round(duration / 1000)}s`}
                        >
                            {/* Hover Tooltip (Simple browser native 'title' used above, could enhance) */}
                        </div>
                    );
                })}
            </div>

            {/* Legend / Metrics Below (Optional, can be separate) */}
            <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500 px-1 font-mono uppercase tracking-wider">
                <span>0m</span>
                <span>{Math.round(totalDuration / 60000)}m Session</span>
            </div>
        </div>
    );
};
