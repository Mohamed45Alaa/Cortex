import React from 'react';
import styles from './Dashboard.module.css';
import {
    Clock,
    Brain,
    Zap,
    Play
} from 'lucide-react';
import { CollectionRateCard } from '@/components/dashboard/CollectionRateCard';
import { StatCard } from '@/components/dashboard/StatCard';
import { useStudentProfile, useDailyLoad, useSubjectList } from '@/core/hooks';

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

    // -- Derived Visuals --
    const capacityColor = profile.currentCapacity > 50 ? '#10B981' : profile.currentCapacity > 20 ? '#F59E0B' : '#EF4444';

    // Helper to get translated dynamic values
    const getTranslatedStatus = (status: string) => {
        const key = status.toUpperCase();
        // @ts-ignore
        return t[key] || status;
    };

    const getTranslatedDifficulty = (diff: string) => {
        const key = diff.toLowerCase();
        // @ts-ignore
        return t[key] || diff;
    };

    return (
        <div className={styles.dashboardContainer}> {/* Wrapper for max-width */}

            {/* HERO ROW: TELEMETRY */}
            {/* HERO ROW: TELEMETRY */}
            <section className={styles.heroGrid}>
                {/* METRIC 1: CUMULATIVE COLLECTION RATE */}
                <CollectionRateCard lang={lang} />

                {/* METRIC 2: LOAD */}
                <StatCard
                    label={t.COGNITIVE_LOAD}
                    value={formatCognitiveLoad(dailyLoad.totalCognitiveCost)}
                    subtext={`${t.SYSTEM_STATUS} · ${getTranslatedStatus(dailyLoad.status)}`}
                    color="purple"
                    icon={Brain}
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
                {subjects.map(subject => (
                    <div
                        key={subject.id}
                        className={styles.subjectCard}
                        onClick={() => onSelectSubject(subject.id)}
                    >
                        <div className={styles.cardTop}>
                            <div className={styles.subjectHeader}>
                                <div className={styles.titleBlock}>
                                    <span className={styles.subjectName}>{subject.name}</span>
                                    {/* Countdown removed */}
                                </div>
                                <div className={styles.readinessBlock}>
                                    <span className={styles.readinessLabel}>{t.stability}</span>
                                    <div
                                        className={styles.readinessDot}
                                        style={{ backgroundColor: (subject.metrics?.stability ?? 0) > 75 ? '#10B981' : '#F59E0B' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ACTION ZONE */}
                        <div className={styles.cardBottom}>
                            <button className={styles.inspectBtn}>
                                {t.ACCESS} <Play size={14} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};
