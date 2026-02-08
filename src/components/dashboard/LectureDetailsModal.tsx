import React from 'react';
import { Lecture, StudySession } from '@/core/types';
import { X, Calendar, Clock, TrendingUp, BarChart3 } from 'lucide-react';
import { getModeLabel, getModeIcon } from '@/lib/studyModeHelpers';
import styles from './LectureDetailsModal.module.css';

interface LectureDetailsModalProps {
    lecture: Lecture | null;
    sessions: StudySession[];
    isOpen: boolean;
    onClose: () => void;
}

export const LectureDetailsModal: React.FC<LectureDetailsModalProps> = ({
    lecture,
    sessions,
    isOpen,
    onClose
}) => {
    if (!isOpen || !lecture) return null;

    // Filter sessions for this specific lecture
    const lectureSessions = sessions
        .filter(s => s.lectureId === lecture.id && s.status !== 'IN_PROGRESS')
        .sort((a, b) => {
            const aDate = a.date || a.endTime;
            const bDate = b.date || b.endTime;
            if (!aDate || !bDate) return 0;
            return new Date(bDate).getTime() - new Date(aDate).getTime();
        });

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Helper to get color based on message color from evaluation
    const getMessageColor = (session: StudySession & { message?: string }): string => {
        if (!session.message) return '#94A3B8'; // slate-400
        if (session.message.includes('ممتاز') || session.message.includes('Perfect')) return '#10B981'; // green
        if (session.message.includes('استغرقت') || session.message.includes('longer')) return '#3B82F6'; // blue
        return '#EF4444'; // red
    };

    // Helper to get grade color
    const getGradeColor = (grade: string): string => {
        if (grade === 'A+' || grade === 'A') return '#10B981';
        if (grade === 'B+' || grade === 'B') return '#3B82F6';
        if (grade === 'C+' || grade === 'C') return '#F59E0B';
        return '#EF4444';
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>تفاصيل المحاضرة</h2>
                    <button onClick={onClose} className={styles.closeBtn} aria-label="Close">
                        <X size={20} />
                    </button>
                </div>

                {/* Lecture Info Card */}
                <div className={styles.infoCard}>
                    <h3 className={styles.sectionTitle}>📚 معلومات المحاضرة</h3>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>العنوان:</span>
                            <span className={styles.infoValue}>{lecture.title}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>المدة:</span>
                            <span className={styles.infoValue}>{lecture.duration} دقيقة</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>الصعوبة:</span>
                            <span className={styles.infoValue}>{lecture.relativeDifficulty.toFixed(1)}/10</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>النوع:</span>
                            <span className={styles.infoValue}>
                                {lecture.type === 'Theory' ? 'نظري' : lecture.type === 'Practical' ? 'عملي' : 'مراجعة'}
                            </span>
                        </div>
                        {lecture.studyMode && (
                            <>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>نظام المذاكرة:</span>
                                    <span className={styles.infoValue}>
                                        {getModeIcon(lecture.studyMode)} {getModeLabel(lecture.studyMode)}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>الوقت المتوقع:</span>
                                    <span className={styles.infoValue}>
                                        {lecture.customExpectedTime || lecture.expectedDuration} دقيقة
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Sessions History */}
                <div className={styles.sessionsSection}>
                    <h3 className={styles.sectionTitle}>
                        📊 سجل الجلسات ({lectureSessions.length} جلسة)
                    </h3>

                    {lectureSessions.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>لم يتم إكمال أي جلسة لهذه المحاضرة بعد</p>
                        </div>
                    ) : (
                        <div className={styles.sessionsTable}>
                            {lectureSessions.map((session, index) => (
                                <div key={session.id} className={styles.sessionCard}>
                                    <div className={styles.sessionHeader}>
                                        <span className={styles.sessionNumber}>#{lectureSessions.length - index}</span>
                                        <span className={styles.sessionDate}>
                                            <Calendar size={14} />
                                            {(() => {
                                                const dateValue = session.date || session.endTime;
                                                if (!dateValue) return 'N/A';
                                                return new Date(dateValue).toLocaleDateString('ar-EG', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                });
                                            })()}
                                        </span>
                                    </div>

                                    <div className={styles.sessionMetrics}>
                                        <div className={styles.metric}>
                                            <Clock size={16} />
                                            <span>{session.actualDuration} دقيقة</span>
                                        </div>
                                        <div className={styles.metric}>
                                            <TrendingUp size={16} />
                                            <span style={{ color: getGradeColor(session.performanceGrade || 'D') }}>
                                                {session.performanceGrade || 'N/A'}
                                            </span>
                                        </div>
                                        <div className={styles.metric}>
                                            <BarChart3 size={16} />
                                            <span>{session.cognitiveCost.toFixed(1)}/10</span>
                                        </div>
                                    </div>

                                    {(session as any).message && (
                                        <div
                                            className={styles.sessionMessage}
                                            style={{
                                                color: getMessageColor(session as any),
                                                borderColor: getMessageColor(session as any) + '40'
                                            }}
                                        >
                                            {(session as any).message}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
