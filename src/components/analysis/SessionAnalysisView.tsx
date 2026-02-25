'use client';

import React, { useState } from 'react';
import { StudySession } from '@/core/types';
import { formatCognitiveLoad } from '@/core/utils/formatting';
import { SessionTimeline } from './SessionTimeline';
import { Globe } from 'lucide-react';

const texts = {
    ar: {
        reportTag: 'التقرير الجنائي للجلسة',
        title: 'اكتمل التحليل',
        subtitle: 'راجع تفاصيل أدائك المعرفي ضمن هذه الجلسة.',
        collectionRate: 'معدل التحصيل',
        collectionDesc: 'نسبة الوقت المقضي في المذاكرة الفعالة أو استخدام الأدوات.',
        targetDuration: 'المدة المستهدفة',
        actualDuration: 'المدة الفعلية',
        cognitiveCost: 'التكلفة المعرفية',
        grade: 'التقييم',
        focusArchitecture: 'هيكلة التركيز',
        activeStudy: 'مذاكرة فعالة',
        toolUsage: 'استخدام الأدوات',
        idleTime: 'وقت خامل',
        disengaged: 'تشتت وانفصال',
        min: 'دقيقة',
        m: 'د',
        s: 'ث',
        returnBtn: 'العودة للوحة الرئيسية'
    },
    en: {
        reportTag: 'SESSION FORENSIC REPORT',
        title: 'Analysis Complete',
        subtitle: 'Review your cognitive performance breakdown.',
        collectionRate: 'Collection Rate',
        collectionDesc: 'Percentage of time spent in Active Study or Tool Usage.',
        targetDuration: 'Target Duration',
        actualDuration: 'Actual Duration',
        cognitiveCost: 'Cognitive Cost',
        grade: 'Grade',
        focusArchitecture: 'Focus Architecture',
        activeStudy: 'Active Study',
        toolUsage: 'Tool Usage',
        idleTime: 'Idle Time',
        disengaged: 'Disengaged',
        min: 'min',
        m: 'm',
        s: 's',
        returnBtn: 'RETURN TO DASHBOARD'
    }
};


const getGradeColor = (grade?: string) => {
    if (!grade) return 'text-slate-400';
    if (grade.startsWith('A')) return 'text-emerald-400';
    if (grade.startsWith('B')) return 'text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-400';
    return 'text-red-400';
};



interface SessionAnalysisViewProps {
    session: StudySession;
    onClose: () => void;
}

export const SessionAnalysisView: React.FC<SessionAnalysisViewProps> = ({ session, onClose }) => {
    const [lang, setLang] = useState<'ar' | 'en'>('ar');
    const t = texts[lang];

    // 1. Data Prep
    const segments = session.segments || [];
    const totalDuration = session.actualDuration * 60 * 1000; // stored as minutes, converting to ms for timeline logic? 
    // Wait, session.actualDuration is minutes (rounded). 
    // But segments have precise ms. Let's re-sum segments for precision.
    const preciseTotal = segments.reduce((acc, s) => acc + s.duration, 0);
    const durationMs = preciseTotal || (totalDuration);

    const activeMs = segments.filter(s => s.type === 'ACTIVE').reduce((acc, s) => acc + s.duration, 0);
    const toolMs = segments.filter(s => s.type === 'TOOL').reduce((acc, s) => acc + s.duration, 0);
    const idleMs = segments.filter(s => s.type === 'IDLE').reduce((acc, s) => acc + s.duration, 0);
    const disengagedMs = segments.filter(s => s.type === 'DISENGAGED').reduce((acc, s) => acc + s.duration, 0);

    const collectionRate = session.collectionRate || 0;

    const formatTime = (ms: number) => {
        const m = Math.floor(ms / 60000);
        const s = Math.floor((ms % 60000) / 1000);
        return `${m}${t.m} ${s}${t.s}`;
    };

    return (
        <div className={`min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-500 ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {/* Translation Toggle */}
            <div className="absolute top-6 left-6 z-50" style={{ left: lang === 'ar' ? '24px' : 'auto', right: lang === 'en' ? '24px' : 'auto' }}>
                <button
                    onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full hover:bg-slate-700 transition border border-slate-700"
                >
                    <Globe size={18} className="text-indigo-400" />
                    <span className="font-bold font-mono text-sm">{lang === 'ar' ? 'EN' : 'عربي'}</span>
                </button>
            </div>

            <div className="max-w-4xl w-full space-y-8">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-block px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-400 mb-2 border border-slate-700">
                        {t.reportTag}
                    </div>
                    <h1 className={`text-4xl font-bold tracking-tight ${lang === 'ar' ? 'font-[MadaniArabic-Bold]' : ''}`}>{t.title}</h1>
                    <p className="text-slate-400">{t.subtitle}</p>
                </div>

                {/* Main Card */}
                <div className="bg-[#0f1523] border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8 relative overflow-hidden">

                    {/* Top Row: Cumulative Load & Session Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Collection Rate (Hero) - [STRICT SESSION SCOPE ONLY] */}
                        <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center text-center">
                            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-4">{t.collectionRate}</h3>
                            <div className="relative">
                                {/* Session-Only Metric. No Cumulative Data Allowed. */}
                                <span className={`text-6xl font-black ${collectionRate >= 80 ? 'text-emerald-400' : collectionRate >= 50 ? 'text-yellow-400' : 'text-red-400'} ${lang === 'ar' ? 'font-[MadaniArabic-Bold]' : ''}`}>
                                    {collectionRate}%
                                </span>
                            </div>
                            <p className="mt-2 text-xs text-slate-500 max-w-[200px]">
                                {t.collectionDesc}
                            </p>
                        </div>

                        {/* Session Stats */}
                        <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 flex justify-between items-center">
                                <span className="text-slate-400 text-sm font-medium">{t.targetDuration}</span>
                                <span className="font-mono text-xl" dir="ltr">{session.expectedDuration} {t.min}</span>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 flex justify-between items-center">
                                <span className="text-slate-400 text-sm font-medium">{t.actualDuration}</span>
                                <span className="font-mono text-xl" dir="ltr">{Math.round(durationMs / 60000)} {t.min}</span>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 flex justify-between items-center">
                                <span className="text-slate-400 text-sm font-medium">{t.cognitiveCost}</span>
                                <span className="font-mono text-xl text-blue-400" dir="ltr">
                                    {formatCognitiveLoad(session.cognitiveCost)}
                                </span>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 flex justify-between items-center">
                                <span className="text-slate-400 text-sm font-medium">{t.grade}</span>
                                <span className={`font-mono text-xl font-bold ${getGradeColor(session.performanceGrade)}`} dir="ltr">
                                    {session.performanceGrade || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="pt-4 border-t border-slate-800/50">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">{t.focusArchitecture}</h3>
                        <SessionTimeline segments={segments} totalDuration={durationMs} lang={lang} />
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                        <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                            <div className="text-[10px] text-emerald-400 font-bold uppercase mb-1">{t.activeStudy}</div>
                            <div className="text-lg font-mono text-emerald-200" dir="ltr">{formatTime(activeMs)}</div>
                        </div>
                        <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                            <div className="text-[10px] text-blue-400 font-bold uppercase mb-1">{t.toolUsage}</div>
                            <div className="text-lg font-mono text-blue-200" dir="ltr">{formatTime(toolMs)}</div>
                        </div>
                        <div className="p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-lg">
                            <div className="text-[10px] text-yellow-400 font-bold uppercase mb-1">{t.idleTime}</div>
                            <div className="text-lg font-mono text-yellow-200" dir="ltr">{formatTime(idleMs)}</div>
                        </div>
                        <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                            <div className="text-[10px] text-red-400 font-bold uppercase mb-1">{t.disengaged}</div>
                            <div className="text-lg font-mono text-red-200" dir="ltr">{formatTime(disengagedMs)}</div>
                        </div>
                    </div>

                </div>

                {/* Action */}
                <button
                    onClick={onClose}
                    className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-slate-200 transition-colors shadow-lg shadow-white/5 active:scale-[0.99]"
                >
                    {t.returnBtn}
                </button>

            </div>
        </div>
    );
};
