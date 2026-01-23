import React, { useMemo, useState } from 'react';
import { useStore } from '@/store/useStore';
import { HistoryEngine, WeeklyBlock, StudyRecord } from '@/core/engines/HistoryEngine';
import styles from './HistoryView.module.css';
import { ChevronDown, ChevronRight, CheckCircle, Clock, Calendar } from 'lucide-react';

export const HistoryView: React.FC = () => {
    const { sessions, lectures, subjects } = useStore();

    const weeklyHistory = useMemo(() => {
        return HistoryEngine.getWeeklyHistory(sessions, lectures, subjects);
    }, [sessions, lectures, subjects]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Academic Timeline</h1>
                <p className={styles.subtitle}>Track your regulation across time.</p>
            </header>

            <div className={styles.timeline}>
                {weeklyHistory.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Clock size={48} className="text-slate-600 mb-4" />
                        <p>No study history yet. Start your first session to build your academic timeline.</p>
                    </div>
                ) : (
                    weeklyHistory.map(block => (
                        <WeekBlock key={block.weekIndex} block={block} />
                    ))
                )}
            </div>
        </div>
    );
};

const WeekBlock: React.FC<{ block: WeeklyBlock }> = ({ block }) => {
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
                        {block.isCurrentWeek && <span className={styles.currentBadge}>CURRENT</span>}
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
                            {block.records.filter(r => r.status !== 'COMPLETED').length} Pending
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
                                <th>Day</th>
                                <th>Subject</th>
                                <th>Item</th>
                                <th>Duration</th>
                                <th>Grade</th>
                                <th>Index</th>
                                <th>Status</th>
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
                                                {record.itemType}
                                            </span>
                                            <span className="font-medium">{record.itemName}</span>
                                        </div>
                                    </td>
                                    <td className="font-mono text-sm opacity-70">
                                        {record.durationMinutes}m
                                    </td>
                                    <td className="font-bold text-sm">
                                        {record.grade || '-'}
                                    </td>
                                    <td className="font-mono text-xs opacity-60">
                                        {record.cognitiveIndex?.toFixed(1) || '-'}
                                    </td>
                                    <td>
                                        <StatusBadge status={record.status} />
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

const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
        'COMPLETED': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'PENDING': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        'IN_PROGRESS': 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    };

    // @ts-ignore
    const css = colors[status] || colors['PENDING'];

    return (
        <span className={`px-2 py-1 rounded text-[10px] font-bold border ${css}`}>
            {status}
        </span>
    );
};

const getTypeBadgeClass = (type: string) => {
    // Just returning a class string or inline style for simplicity in this demo
    return "text-[10px] uppercase tracking-wider opacity-60 mr-2";
};
