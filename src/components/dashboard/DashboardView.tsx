import React from 'react';
import styles from './Dashboard.module.css';
import {
    Clock,
    Brain,
    Zap,
    Play
} from 'lucide-react';
import { useStudentProfile, useDailyLoad, useSubjectList } from '@/core/hooks';

import { translations, Language } from '@/core/i18n/translations';

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
        const key = status.toLowerCase();
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
            <section className={styles.heroGrid}>
                {/* METRIC 1: CAPACITY */}
                <div className={styles.heroCard}>
                    <div className={styles.heroHeader}>
                        <div className={`${styles.heroIconBox} ${styles.tealIcon}`}>
                            <Zap size={24} />
                        </div>
                        <span className={styles.heroLabel}>{t.system_capacity}</span>
                    </div>
                    <div className={styles.heroMainContent}>
                        <span className={styles.heroValue} style={{ color: capacityColor }}>
                            {profile.currentCapacity}%
                        </span>
                        <span className={styles.heroSubtext}>
                            {profile.currentCapacity > 80 ? t.nominal_state : t.depleted_state}
                        </span>
                    </div>
                </div>

                {/* METRIC 2: LOAD */}
                <div className={styles.heroCard}>
                    <div className={styles.heroHeader}>
                        <div className={`${styles.heroIconBox} ${styles.purpleIcon}`}>
                            <Brain size={24} />
                        </div>
                        <span className={styles.heroLabel}>{t.cognitive_load}</span>
                    </div>
                    <div className={styles.heroMainContent}>
                        <div className={styles.heroValueRow}>
                            <span className={styles.heroValue}>{dailyLoad.totalCognitiveCost}</span>
                            <span className={styles.heroUnit}>{t.units}</span>
                        </div>
                        <span className={styles.heroSubtext}>
                            {t.status}: {getTranslatedStatus(dailyLoad.status).toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* METRIC 3: VELOCITY */}
                <div className={styles.heroCard}>
                    <div className={styles.heroHeader}>
                        <div className={`${styles.heroIconBox} ${styles.orangeIcon}`}>
                            <Clock size={24} />
                        </div>
                        <span className={styles.heroLabel}>{t.velocity}</span>
                    </div>
                    <div className={styles.heroMainContent}>
                        <div className={styles.heroValueRow}>
                            <span className={styles.heroValue}>{profile.totalSessions}</span>
                            <span className={styles.heroUnit}>{t.cycles}</span>
                        </div>

                    </div>
                </div>
            </section>

            {/* OVERVIEW SECTION & ACTION */}
            <div className={styles.overviewSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className={styles.sectionTitle}>{t.active_subjects}</h3>
                    <button className={styles.addSubjectButton} onClick={onAddSubject}>
                        + {t.add_subject}
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
                                {t.inspect} <Play size={14} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};
