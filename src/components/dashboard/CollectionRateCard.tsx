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
            tooltipWidth="w-auto min-w-[340px]"
            tooltipContent={
                <>
                    <p className="text-gray-200 font-bold text-sm mb-1">كفاءة الالتزام والتركيز</p>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        يقيس هذا المؤشر متوسط نسبة الوقت الفعلي لمذاكرتك للمحاضرة من إجمالي وقت جلسة المذاكرة كلها.
                    </p>
                    <div className="flex flex-col gap-2 mt-2 bg-black/20 p-2.5 rounded-xl border border-white/5 text-[11px] whitespace-nowrap w-full">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-emerald-400 font-bold shrink-0">معدل المذاكرة الفعالة</span>
                            <span className="text-gray-400 text-right ml-3 text-[10.5px]">
                                (المذاكرة + أدوات الترجمة والـ AI)
                            </span>
                        </div>
                        <div className="w-full h-px bg-white/5" />
                        <div className="flex justify-between items-center w-full">
                            <span className="text-red-400 font-bold shrink-0">معدل التشتت</span>
                            <span className="text-gray-400 text-right ml-3 text-[10.5px]">
                                (معدل السرحان + الوقت الضائع)
                            </span>
                        </div>
                    </div>
                    <p className="text-indigo-300/80 text-[10px] mt-2 leading-relaxed text-center bg-indigo-500/10 p-1.5 rounded border border-indigo-500/20">
                        كلما زادت نسبتك المئوية، زاد تركيزك في المحاضرة وزادت إنتاجيتك، وقل وقتك المهدر.
                    </p>
                </>
            }
        />
    );
};
