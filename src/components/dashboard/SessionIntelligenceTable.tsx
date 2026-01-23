import React, { useMemo } from 'react';
import { Lecture, StudySession } from '@/core/types';
import styles from './SessionIntelligenceTable.module.css';
import {
    Clock,
    Flame,
    Layers,
    Eye,
    Trash2,
    Play,
    TrendingUp,
    TrendingDown,
    Minus,
    CornerDownRight,
    Square,
    PauseCircle
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { translations, Language } from '@/core/i18n/translations';

interface SessionIntelligenceTableProps {
    subjectId: string;
    lectures: Lecture[];
    sessions: StudySession[];
    onStartSession: (lectureId: string) => void;
    lang: Language;
}

export const SessionIntelligenceTable: React.FC<SessionIntelligenceTableProps> = ({
    subjectId,
    lectures,
    sessions,
    onStartSession,
    lang
}) => {
    const { activeSession, deleteLecture } = useStore();

    // Helper for Translation
    const t = translations[lang] || translations.en;

    // --- 1. METRICS COMPUTE (Global Subject Level) ---
    const metrics = useMemo(() => {
        const completedSessions = sessions.filter(s => s.status === 'COMPLETED' || s.status === 'INTERRUPTED');
        const count = completedSessions.length;

        if (count === 0) return { avgTime: 0, avgDiff: "0.0", total: 0, baseline: 0 };

        const totalDuration = completedSessions.reduce((acc, s) => acc + s.actualDuration, 0);

        let totalDiff = 0;
        let diffCount = 0;

        completedSessions.forEach(s => {
            const lecture = lectures.find(l => l.id === s.lectureId);
            if (lecture) {
                // Fix potential NaN if relativeDifficulty is missing
                const diff = lecture.relativeDifficulty ?? 0;
                totalDiff += diff;
                diffCount++;
            }
        });

        const avgTime = Math.round(totalDuration / count);
        // Fix NaN: Check diffCount > 0 AND totalDiff is not NaN
        const avgDiffVal = diffCount > 0 ? (totalDiff / diffCount) : 0;
        const avgDiff = isNaN(avgDiffVal) ? "0.0" : avgDiffVal.toFixed(1);

        return {
            avgTime,
            avgDiff,
            total: count,
            baseline: avgTime || 60
        };
    }, [sessions, lectures]);

    // --- 2. HIERARCHY BUILDER (Aggregates) ---
    const tableRows = useMemo(() => {
        const rows: any[] = [];

        const theorystreams = lectures.filter(l => l.type === 'Theory');
        const sectionStreams = lectures.filter(l => l.type !== 'Theory');

        const processStream = (stream: Lecture[], prefix: string) => {
            stream.forEach((lecture, index) => {
                const autoName = `${prefix}_${(lecture.index || index + 1)}`; // Support stored index

                // Find Children
                const children = sessions
                    .filter(s => s.lectureId === lecture.id)
                    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());

                // Compute Parent Aggregates
                const completedChildren = children.filter(s => s.status !== 'IN_PROGRESS');
                const totalDuration = completedChildren.reduce((acc, s) => acc + s.actualDuration, 0);

                const showDiff = true; // Always show diff as it is calculated on creation
                const displayDiff = lecture.relativeDifficulty ?? 0;

                // Status
                const isRunning = activeSession?.lectureId === lecture.id;
                const hasHistory = completedChildren.length > 0;

                let status = t.status_ready;
                let statusKey = 'READY';
                if (isRunning) { status = t.status_progress; statusKey = 'IN PROGRESS'; }
                else if (hasHistory) { status = t.status_completed; statusKey = 'COMPLETED'; }

                // Add Parent
                rows.push({
                    id: lecture.id,
                    isParent: true,
                    name: autoName,
                    type: lecture.type === 'Theory' ? t.lecture_label : t.section_label,
                    duration: hasHistory ? totalDuration : 0,
                    difficulty: displayDiff,
                    statusLabel: status, // Localized
                    statusKey: statusKey, // Logic
                    showZeroState: !hasHistory && !isRunning,
                    original: lecture,
                    indent: 0
                });

                // Add Children (Sessions)
                children.forEach(session => {
                    let childStatus = t.status_completed;
                    let childStatusKey = session.status || 'COMPLETED';

                    if (session.status === 'INTERRUPTED') childStatus = t.status_interrupted;
                    if (session.status === 'IN_PROGRESS') childStatus = t.status_progress; // Should match parent active

                    const dateObj = new Date(session.startTime);
                    const dateStr = dateObj.toLocaleDateString('en-GB'); // DD/MM/YYYY format preference

                    rows.push({
                        id: session.id,
                        isParent: false,
                        name: dateStr, // Show Date instead of "Study Session"
                        type: t.study_session_label,
                        duration: session.actualDuration,
                        difficulty: displayDiff, // Inherit
                        statusLabel: childStatus,
                        statusKey: childStatusKey,
                        original: session,
                        indent: 1
                    });
                });
            });
        };

        processStream(theorystreams, 'LEC');
        processStream(sectionStreams, 'SEC');

        return rows;
    }, [lectures, sessions, activeSession, t]);

    // --- 3. HELPER: Effort Delta ---
    const getEffortDelta = (duration: number, isZeroState: boolean) => {
        return { text: "—", class: styles.effortNeutral };
    };

    // Child Delta Helper
    const getSessionDelta = (duration: number) => {
        if (metrics.baseline === 0) return { text: "—", class: styles.effortNeutral };
        const delta = duration - metrics.baseline;
        const percent = Math.round((delta / metrics.baseline) * 100);

        if (percent > 5) return { text: `+${percent}%`, class: styles.effortHarder, icon: <TrendingUp size={14} /> };
        if (percent < -5) return { text: `${percent}%`, class: styles.effortEasier, icon: <TrendingDown size={14} /> };
        return { text: t.diff_avg, class: styles.effortNeutral, icon: <Minus size={14} /> };
    };

    return (
        <div className={styles.container}>
            {/* HEADER METRICS */}
            <div className={styles.metricsHeader}>
                <div className={styles.metricBlock}>
                    <div className={styles.metricLabel}><Clock size={16} /> {t.avg_session}</div>
                    <div className={styles.metricValue}>
                        {metrics.avgTime}<span className={styles.metricUnit}>min</span>
                    </div>
                </div>
                <div className={styles.metricBlock}>
                    <div className={styles.metricLabel}><Flame size={16} /> {t.avg_diff}</div>
                    <div className={styles.metricValue}>{metrics.avgDiff}</div>
                </div>
                <div className={styles.metricBlock}>
                    <div className={styles.metricLabel}><Layers size={16} /> {t.total_sessions}</div>
                    <div className={styles.metricValue}>{metrics.total}</div>
                </div>
            </div>

            {/* TABLE */}
            <div className={styles.tableGrid}>
                <div className={styles.tableHeader}>
                    <span>{t.col_item}</span>
                    <span>{t.col_type}</span>
                    <span>{t.col_duration}</span>
                    <span>{t.col_diff}</span>
                    <span>{t.col_delta}</span>
                    <span>Grade</span>
                    <span>Index</span>
                    <span>{t.col_status}</span>
                    <span>{t.col_actions}</span>
                </div>

                {tableRows.length === 0 && (
                    <div className={styles.emptyState}>
                        {t.empty_state}
                    </div>
                )}

                {tableRows.map((row, idx) => {
                    const isParent = row.isParent;
                    const delta = isParent ? { text: "—", class: styles.effortNeutral } : getSessionDelta(row.duration);

                    // Difficulty Class
                    let diffClass = styles.diffMed;
                    if (row.difficulty <= 3) diffClass = styles.diffLow;
                    if (row.difficulty >= 7) diffClass = styles.diffHigh;

                    // Zero State Rendering
                    const showZero = row.showZeroState;

                    // Status Styles (Based on Key, not Label)
                    let statusClass = styles.statusPending; // Gray
                    if (row.statusKey === 'IN PROGRESS') statusClass = styles.statusProgress; // Blue
                    if (row.statusKey === 'COMPLETED') statusClass = styles.statusCompleted; // Green
                    if (row.statusKey === 'INTERRUPTED') statusClass = styles.statusInterrupted; // Yellow

                    return (
                        <div key={`${row.id}_${idx}`} className={`${styles.tableRow} ${isParent ? styles.parentRow : styles.childRow}`}>

                            {/* NAME */}
                            <div className={styles.colName}>
                                {!isParent && <div className={styles.treeLine}></div>}
                                {isParent && <Layers size={16} color="#64748B" />}
                                {!isParent && <CornerDownRight size={14} color="#64748B" />}
                                {row.name}
                            </div>

                            {/* TYPE */}
                            <div className={styles.colType}>
                                {row.type}
                            </div>

                            {/* DURATION */}
                            <div className={styles.colDuration}>
                                {showZero ? <span style={{ opacity: 0.3 }}>—</span> : `${row.duration} min`}
                            </div>

                            {/* DIFFICULTY (Stacked) */}
                            <div className={styles.colDifficulty}>
                                <div className={styles.stackCell}>
                                    {isParent ? (
                                        <span className={`${styles.diffBadge} ${diffClass}`}>
                                            {row.difficulty}
                                        </span>
                                    ) : (
                                        <span className={`${styles.diffBadge} ${diffClass}`} style={{ opacity: 0.5 }}>
                                            {row.difficulty}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* DELTA */}
                            <div className={`${styles.colEffort} ${delta.class}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {delta.icon} {delta.text}
                            </div>

                            {/* GRADE */}
                            <div className={styles.colDuration}>
                                {row.original.grade || '—'}
                            </div>

                            {/* INDEX */}
                            <div className={styles.colDuration} style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                {row.original.cognitiveIndex?.toFixed(1) || '—'}
                            </div>

                            {/* STATUS (Stacked) */}
                            <div className={styles.colStatus}>
                                <div className={styles.stackCell}>
                                    {isParent && row.statusKey === 'READY' ? (
                                        <span className={styles.statusPending}>{row.statusLabel}</span>
                                    ) : (
                                        <span className={`${styles.statusPill} ${statusClass}`}>
                                            {row.statusLabel}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className={styles.colActions}>
                                {isParent && (
                                    <>
                                        {row.statusKey === 'IN PROGRESS' ? (
                                            <div title="Starting... (Go to Timer)">
                                                <PauseCircle size={18} color="#60A5FA" />
                                            </div>
                                        ) : (
                                            <div
                                                className={styles.actionIcon}
                                                onClick={() => onStartSession(row.id)}
                                                title={t.sess_start}
                                            >
                                                <Play size={18} />
                                            </div>
                                        )}

                                        <div className={styles.actionIcon} title={t.sess_scan}>
                                            <Eye size={18} />
                                        </div>
                                        <div
                                            className={styles.actionIcon}
                                            title={t.sess_del}
                                            onClick={() => deleteLecture(row.id)}
                                        >
                                            <Trash2 size={18} />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
