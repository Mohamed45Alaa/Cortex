import React from 'react';
import { Lecture, StudySession } from '@/core/types';
import { X, Calendar, Clock, TrendingUp, BarChart3 } from 'lucide-react';
import { getModeLabel, getModeIcon } from '@/lib/studyModeHelpers';
import { translations, Language } from '@/core/i18n/translations';
import styles from './LectureDetailsModal.module.css';

interface LectureDetailsModalProps {
    lecture: Lecture | null;
    sessions: StudySession[];
    isOpen: boolean;
    onClose: () => void;
    language?: Language;
}

export const LectureDetailsModal: React.FC<LectureDetailsModalProps> = ({
    lecture,
    sessions,
    isOpen,
    onClose,
    language = 'ar'
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
                    <h2 className={styles.title}>{translations[language].lecture_details_title}</h2>
                    <button onClick={onClose} className={styles.closeBtn} aria-label="Close">
                        <X size={20} />
                    </button>
                </div>

                {/* Lecture Info Card */}
                <div className={styles.infoCard}>
                    <h3 className={styles.sectionTitle}>📚 {translations[language].lecture_info_section}</h3>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>{translations[language].lecture_title_label}</span>
                            <span className={styles.infoValue}>{lecture.title}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>{translations[language].lecture_duration_label}</span>
                            <span className={styles.infoValue}>{lecture.duration} {translations[language].minutes_unit}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>{translations[language].lecture_difficulty_label}</span>
                            <span className={styles.infoValue}>{lecture.relativeDifficulty.toFixed(1)}/10</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>{translations[language].lecture_type_label}</span>
                            <span className={styles.infoValue}>
                                {lecture.type === 'Theory' ? translations[language].lecture_type_theory : lecture.type === 'Practical' ? translations[language].lecture_type_practical : translations[language].lecture_type_revision}
                            </span>
                        </div>
                        {lecture.studyMode && (
                            <>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>{translations[language].lecture_study_mode_label}</span>
                                    <span className={styles.infoValue}>
                                        {getModeIcon(lecture.studyMode)} {getModeLabel(lecture.studyMode)}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>{translations[language].lecture_expected_time_label}</span>
                                    <span className={styles.infoValue}>
                                        {lecture.customExpectedTime || lecture.expectedDuration} {translations[language].minutes_unit}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Sessions History */}
                <div className={styles.sessionsSection}>
                    <h3 className={styles.sectionTitle}>
                        📊 {translations[language].sessions_history_title} ({lectureSessions.length} {lectureSessions.length === 1 ? translations[language].sessions_count : translations[language].sessions_count_plural})
                    </h3>

                    {lectureSessions.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>{translations[language].no_sessions_yet}</p>
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
                                            <span>{session.actualDuration} {translations[language].minutes_unit}</span>
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
