'use client';

import React, { useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { translations } from '@/core/i18n/translations';
import { Activity } from 'lucide-react';
import { StatCard } from './StatCard';

export const CollectionRateCard = ({ lang }: { lang: 'en' | 'ar' }) => {
    const { sessions } = useStore();
    const t = translations[lang];

    const rate = useMemo(() => {
        if (!sessions || sessions.length === 0) return 0;

        let totalActive = 0;
        let totalTime = 0;

        sessions.forEach(s => {
            // If session has legacy data, skip or infer?
            // If new session, we have segments.
            // If old session, we assume 100% active? No, let's just count known segments if exist.
            if (s.segments && s.segments.length > 0) {
                s.segments.forEach(seg => {
                    totalTime += seg.duration;
                    if (seg.type === 'ACTIVE' || seg.type === 'TOOL') {
                        totalActive += seg.duration;
                    }
                });
            } else {
                // Legacy Fallback (Optional): 
                // Maybe count as 50%? Or ignore? 
                // Let's ignore old sessions for this metric to be accurate going forward.
            }
        });

        if (totalTime === 0) return 0;
        return Math.round((totalActive / totalTime) * 100);
    }, [sessions]);

    return (
        <StatCard
            label={t.COLLECTION_EFFICIENCY}
            value={`${rate}%`}
            subtext={rate >= 75 ? t.OPTIMAL_STATE : t.CALIBRATION_NEEDED}
            color="emerald"
            icon={Activity}
        />
    );
};
