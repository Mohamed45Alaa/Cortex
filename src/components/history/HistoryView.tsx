import React, { useMemo, useState } from 'react';
import { useStore } from '@/store/useStore';
import { HistoryEngine, WeeklyBlock, StudyRecord } from '@/core/engines/HistoryEngine';
import styles from './HistoryView.module.css';
import { ChevronDown, ChevronRight, CheckCircle, Clock, Calendar } from 'lucide-react';
import { formatCognitiveLoad } from '@/core/utils/formatting';
import { Language, translations } from '@/core/i18n/translations';

// Helper to get translated string
const t = (key: string, lang: Language) => {
    // @ts-ignore
    return translations[lang][key] || key;
};

export const HistoryView: React.FC<{ lang: Language }> = ({ lang }) => {
    const { sessions, lectures, subjects, markLectureComplete } = useStore();
    const weeklyHistory = useMemo(() => {
        return HistoryEngine.getWeeklyHistory(sessions, lectures, subjects, lang);
    }, [sessions, lectures, subjects, lang]);

    return (
        <div className={styles.container}>
            <header className={`${styles.header} font-[MadaniArabic-Bold]`}>
                <h1 className={`${styles.title} font-[MadaniArabic-Bold]`}>{t('academic_timeline', lang)}</h1>
                <p className={`${styles.subtitle} font-[MadaniArabic-Bold]`}>{t('timeline_subtitle', lang)}</p>
            </header>

            <div className={styles.timeline}>
                {weeklyHistory.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Clock size={48} className="text-slate-600 mb-4" />
                        <p>{t('timeline_empty', lang)}</p>
                    </div>
                ) : (
                    weeklyHistory.map(block => (
                        <WeekBlock key={block.weekIndex} block={block} markLectureComplete={markLectureComplete} lang={lang} />
                    ))
                )}
            </div>
        </div>
    );
};

const WeekBlock: React.FC<{ block: WeeklyBlock; markLectureComplete: (id: string) => void; lang: Language }> = ({ block, markLectureComplete, lang }) => {
    const [expanded, setExpanded] = useState(block.isCurrentWeek);

    return (
        <div className={`${styles.weekBlock} ${expanded ? styles.expanded : ''}`}>
            <div
                className={styles.weekHeader}
                onClick={() => setExpanded(!expanded)}
            >
                <div className={styles.weekInfo}>
                    <div className={styles.weekLabel}>
                        <span className={styles.weekIndex}>{block.label}</span>
                        {block.isCurrentWeek && <span className={styles.currentBadge}>{t('current_badge', lang)}</span>}
                    </div>
                    <div className={styles.dateRange}>
                        <Calendar size={14} className="mr-2 opacity-50" />
                        {block.startDate} - {block.endDate}
                    </div>
                </div>

                <div className={styles.weekStatus}>
                    {block.isCompleted ? (
                        <CheckCircle size={20} className="text-emerald-500" />
                    ) : (
                        <div className={styles.pendingCount}>
                            {block.records.filter(r => r.status !== 'COMPLETED').length} {t('pending_count', lang)}
                        </div>
                    )}
                    {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
            </div>

            {expanded && (
                <div className={styles.weekContent}>
                    <table className={styles.historyTable}>
                        <thead>
                            <tr>
                                <th className="font-[MadaniArabic-Bold]">{t('col_day', lang)}</th>
                                <th className="font-[MadaniArabic-Bold]">{t('subject_name', lang).split(' ')[1] || t('subject_name', lang)}</th>
                                <th className="font-[MadaniArabic-Bold]">{t('col_item', lang)}</th>
                                <th className="font-[MadaniArabic-Bold]">{t('col_duration', lang)}</th>
                                <th className="font-[MadaniArabic-Bold]">{t('col_grade', lang)}</th>
                                <th className="font-[MadaniArabic-Bold]">{t('col_index', lang)}</th>
                                <th className="font-[MadaniArabic-Bold]">{t('col_status', lang)}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {block.records.map(record => (
                                <tr key={record.id} className={styles.recordRow}>
                                    <td className={styles.dayCell}>
                                        <div className={styles.dayName}>{record.dateMeta.dayName}</div>
                                        <div className={styles.fullDate}>{record.dateMeta.fullDate}</div>
                                    </td>
                                    <td>
                                        <span className={styles.subjectBadge}>{record.subjectName}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <span className={getTypeBadgeClass(record.itemType)}>
                                                {record.itemType === 'LECTURE' ? t('lecture_label', lang) : record.itemType === 'SESSION' ? t('section_label', lang) : record.itemType}
                                            </span>
                                            <span className="font-medium">
                                                {record.itemName === 'Registered Class' ? '' : record.itemName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="font-mono text-sm opacity-70">
                                        {record.durationMinutes}m
                                    </td>
                                    <td className="font-bold text-sm">
                                        {record.grade || '-'}
                                    </td>
                                    <td className="font-mono text-xs opacity-60">
                                        {formatCognitiveLoad(record.cognitiveCost)}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <StatusBadge status={record.status} lang={lang} />
                                            {record.status === 'PENDING' && record.itemType === 'LECTURE' && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        markLectureComplete(record.id);
                                                    }}
                                                    className="p-1 rounded-full hover:bg-emerald-500/20 text-emerald-400/50 hover:text-emerald-400 transition-colors"
                                                    title="Mark as Complete manually"
                                                >
                                                    <CheckCircle size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const StatusBadge = ({ status, lang }: { status: string, lang: Language }) => {
    const colors = {
        'COMPLETED': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'PENDING': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        'IN_PROGRESS': 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    };

    // @ts-ignore
    const css = colors[status] || colors['PENDING'];

    let displayStatus = status;
    if (status === 'COMPLETED') displayStatus = t('status_completed', lang);
    if (status === 'PENDING') displayStatus = t('action_required', lang).split(' ')[0] || t('pending_count', lang); // Using generic translation for pending
    if (lang === 'ar' && status === 'PENDING') displayStatus = "قيد الانتظار";
    if (lang === 'ar' && status === 'IN_PROGRESS') displayStatus = "قيد التنفيذ";
    if (lang === 'en' && status === 'IN_PROGRESS') displayStatus = "IN PROGRESS";
    if (lang === 'en' && status === 'PENDING') displayStatus = "PENDING";

    return (
        <span className={`px-2 py-1 rounded text-[10px] font-bold border ${css}`}>
            {displayStatus}
        </span>
    );
};

const getTypeBadgeClass = (type: string) => {
    // Just returning a class string or inline style for simplicity in this demo
    return "text-[10px] uppercase tracking-wider opacity-60 mr-2";
};
