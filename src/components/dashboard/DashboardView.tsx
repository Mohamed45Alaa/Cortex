import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import {
    Clock,
    Brain,
    Zap,
    Play
} from 'lucide-react';
import { CollectionRateCard } from '@/components/dashboard/CollectionRateCard';
import { StatCard } from '@/components/dashboard/StatCard';
import { CognitiveLoadHistoryModal } from '@/components/dashboard/CognitiveLoadHistoryModal';
import { useStudentProfile, useDailyLoad, useSubjectList } from '@/core/hooks';
import { useStore } from '@/store/useStore';

import { translations, Language } from '@/core/i18n/translations';
import { formatCognitiveLoad } from '@/core/utils/formatting';

interface DashboardViewProps {
    onSelectSubject: (id: string) => void;
    onAddSubject: () => void;
    lang: Language;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
    onSelectSubject,
    onAddSubject,
    lang
}) => {
    const profile = useStudentProfile();
    const dailyLoad = useDailyLoad();
    const subjects = useSubjectList();
    const t = translations[lang];

    const [showCognitiveHistoryModal, setShowCognitiveHistoryModal] = useState(false);

    // Get Auth User for Academic Year and Lectures for Progress Calculation
    const authUser = useStore(state => state.authState.user);
    const lectures = useStore(state => state.lectures);
    const sessions = useStore(state => state.sessions);

    const academicYear = authUser?.academicYear || 'Academic Module';

    // -- Derived Visuals --
    const capacityColor = profile.currentCapacity > 50 ? '#10B981' : profile.currentCapacity > 20 ? '#F59E0B' : '#EF4444';

    // Helper to get translated dynamic values
    const getTranslatedStatus = (status?: string) => {
        if (!status) return '';
        const key = status.toUpperCase();
        // @ts-ignore
        return t[key] || status;
    };

    const getTranslatedDifficulty = (diff?: string) => {
        if (!diff) return '';
        const key = diff.toLowerCase();
        // @ts-ignore
        return t[key] || diff;
    };

    const getGradeFromScore = (score: number) => {
        if (score >= 9.0) return 'A+';
        if (score >= 7.5) return 'A';
        if (score >= 6.0) return 'B+';
        if (score >= 5.0) return 'B';
        if (score >= 4.0) return 'C+';
        if (score >= 3.0) return 'C';
        return 'D';
    };

    return (
        <div className={styles.dashboardContainer}> {/* Wrapper for max-width */}

            {/* HERO ROW: TELEMETRY */}
            {/* HERO ROW: TELEMETRY */}
            <section className={styles.heroGrid}>
                {/* METRIC 1: CUMULATIVE COLLECTION RATE */}
                <CollectionRateCard lang={lang} />

                {/* METRIC 2: LOAD (Historical Average) */}
                <StatCard
                    label={t.COGNITIVE_LOAD}
                    value={<span dir="ltr">{formatCognitiveLoad(profile.cumulativeIndex)} ({getGradeFromScore(profile.cumulativeIndex || 0)})</span>}
                    subtext={`${t.SYSTEM_STATUS} · ${getTranslatedStatus(dailyLoad.status)}`}
                    color="purple"
                    icon={Brain}
                    onDoubleClick={() => setShowCognitiveHistoryModal(true)}
                    tooltipContent={
                        <>
                            <p className="text-gray-200 font-bold text-sm mb-1">مؤشر الحمل المعرفي (0 - 10)</p>
                            <p className="text-gray-400 text-xs leading-relaxed">
                                يقيس هذا المؤشر جودة المذاكرة بناءً على التزامك بالوقت المحدد للمحاضرة.
                            </p>
                            <div className="flex flex-col gap-1.5 mt-2 bg-black/20 p-2 rounded-lg border border-white/5">
                                {/* A+ */}
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-emerald-400 font-bold w-6 text-left" dir="ltr">A+</span>
                                    <span className="text-emerald-500/80 font-mono w-16 text-center" dir="ltr">9.0 - 10.0</span>
                                    <span className="text-gray-400 w-24 text-right">التزام مثالي بالوقت</span>
                                </div>
                                {/* A */}
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-emerald-400 font-bold w-6 text-left" dir="ltr">A</span>
                                    <span className="text-emerald-500/80 font-mono w-16 text-center" dir="ltr">7.5 - 8.9</span>
                                    <span className="text-gray-400 w-24 text-right"></span>
                                </div>

                                <div className="w-full h-px bg-white/5 my-0.5" />

                                {/* B+ */}
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-blue-400 font-bold w-6 text-left" dir="ltr">B+</span>
                                    <span className="text-blue-500/80 font-mono w-16 text-center" dir="ltr">6.0 - 7.4</span>
                                    <span className="text-gray-400 w-24 text-right">تجاوز مسموح</span>
                                </div>
                                {/* B */}
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-blue-400 font-bold w-6 text-left" dir="ltr">B</span>
                                    <span className="text-blue-500/80 font-mono w-16 text-center" dir="ltr">5.0 - 5.9</span>
                                    <span className="text-gray-400 w-24 text-right">(فهم أعمق)</span>
                                </div>
                                {/* C+ */}
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-blue-400 font-bold w-6 text-left" dir="ltr">C+</span>
                                    <span className="text-blue-500/80 font-mono w-16 text-center" dir="ltr">4.0 - 4.9</span>
                                    <span className="text-gray-400 w-24 text-right"></span>
                                </div>

                                <div className="w-full h-px bg-white/5 my-0.5" />

                                {/* C */}
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-red-400 font-bold w-6 text-left" dir="ltr">C</span>
                                    <span className="text-red-500/80 font-mono w-16 text-center" dir="ltr">3.0 - 3.9</span>
                                    <span className="text-gray-400 w-24 text-right">تسرع أو إنهاء مبكر</span>
                                </div>
                                {/* D */}
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-red-400 font-bold w-6 text-left" dir="ltr">D</span>
                                    <span className="text-red-500/80 font-mono w-16 text-center" dir="ltr">&lt; 3.0</span>
                                    <span className="text-gray-400 w-24 text-right"></span>
                                </div>
                            </div>
                        </>
                    }
                />

                {/* METRIC 3: VELOCITY */}
                <StatCard
                    label={t.TOTAL_SESSIONS}
                    value={profile.totalSessions}
                    subtext={`${t.COMPLETED}`}
                    color="amber"
                    icon={Clock}
                />
            </section>

            {/* OVERVIEW SECTION & ACTION */}
            <div className={styles.overviewSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className={styles.sectionTitle}>{t.active_subjects}</h3>
                    <button className={styles.addSubjectButton} onClick={onAddSubject}>
                        + {t.ENROLL_COURSE}
                    </button>
                </div>
            </div>

            {/* CONTENT GRID */}
            <section className={styles.subjectGrid}>
                {subjects.map(subject => {
                    // Calculate Lecture Progress
                    const subjectLectures = lectures.filter(l => l.subjectId === subject.id);
                    const totalLectures = subjectLectures.length;

                    // A lecture is considered complete if it has at least one COMPLETED session
                    const completedLectures = subjectLectures.filter(l =>
                        sessions.some(s => s.lectureId === l.id && s.status === 'COMPLETED')
                    ).length;

                    // If 0 lectures, show 0%. If 1 or more, calculate ratio.
                    const progressRatio = totalLectures === 0 ? 0 : (completedLectures / totalLectures) * 100;
                    const displayProgress = Math.round(progressRatio);

                    return (
                        <div
                            key={subject.id}
                            className="relative w-full rounded-2xl p-5 flex flex-col justify-between group transition-all duration-500 ease-out backdrop-blur-md overflow-hidden border border-indigo-500/20 shadow-lg shadow-black/40 bg-[#14161F] hover:bg-[#1A1D29] hover:border-indigo-400/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.3),inset_0_0_20px_rgba(99,102,241,0.05)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            onClick={() => onSelectSubject(subject.id)}
                        >
                            {/* Animated Background Gradients on Hover - Unified Colors */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 ease-in-out pointer-events-none" />
                            <div className="absolute -top-20 -left-20 w-48 h-48 bg-blue-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 ease-in-out pointer-events-none" />

                            <div className="relative z-10 flex flex-col gap-4">
                                {/* Top Header */}
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xl font-bold tracking-wide text-gray-100">{subject.name}</span>
                                        <span className="text-[13px] text-gray-500 font-medium">{academicYear}</span>
                                    </div>
                                    <div className="flex items-center gap-2 pt-1">
                                        <div
                                            className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
                                            style={{ backgroundColor: displayProgress > 75 ? '#10B981' : '#F59E0B', color: displayProgress > 75 ? '#10B981' : '#F59E0B' }}
                                        />
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{t.stability}</span>
                                    </div>
                                </div>

                                {/* Divider & Middle */}
                                <div className="w-full h-[1px] bg-white/5 my-1" />

                                {/* Bottom Section */}
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex flex-col gap-2 w-1/2">
                                        <span className="text-[13px] font-medium text-gray-400">Progress {displayProgress}%</span>
                                        <div className="w-full h-1.5 bg-indigo-950/40 border border-indigo-500/20 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                                                style={{ width: `${displayProgress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <button className="flex items-center gap-2 px-5 py-2 rounded-xl border border-white/10 bg-[#1e2130] text-gray-300 text-sm font-semibold transition-all group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 group-hover:text-indigo-200 hover:scale-105 active:scale-95">
                                        {t.ACCESS} <Play size={12} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </section>

            {showCognitiveHistoryModal && (
                <CognitiveLoadHistoryModal onClose={() => setShowCognitiveHistoryModal(false)} />
            )}
        </div>
    );
};
