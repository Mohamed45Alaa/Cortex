import React from 'react';
import styles from './Dashboard.module.css'; // Shared styles
import {
    ArrowLeft,
    Book,
    Clock,
    Play,
    PlusCircle,
    CheckCircle,
    ChevronDown,
    Edit,
    Trash2
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { SessionIntelligenceTable } from './SessionIntelligenceTable';
import { translations, Language } from '@/core/i18n/translations';
import { useSubject, useSubjectLectures } from '@/core/hooks';
import { SystemAPI } from '@/core/SystemAPI';

interface SubjectDetailViewProps {
    subjectId: string;
    onBack: () => void;
    onQuestionFlowStart: (flowType: 'LECTURE_INTENT' | 'SESSION_START', contextId?: string, predictedDuration?: number) => void;
    highlightLectureId?: string; // NEW: Prop for highlighting
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
    subjectId,
    onBack,
    onQuestionFlowStart,
    highlightLectureId
}) => {
    const subject = useSubject(subjectId);
    const lectures = useSubjectLectures(subjectId);

    // --- CONNECT TO STORE FOR SESSIONS ---
    const { sessions, authState, openAuthModal, renameSubject, deleteSubject } = useStore();
    const subjectSessions = sessions.filter(s => s.subjectId === subjectId);

    // Guard: Subject missing
    if (!subject) return <div className={styles.errorState}>Subject Not Found</div>;

    const handleRename = () => {
        const newName = prompt("Rename Subject:", subject.name);
        if (newName && newName.trim() !== "") {
            renameSubject(subject.id, newName.trim());
        }
    };

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${subject.name}"? This cannot be undone.`)) {
            deleteSubject(subject.id);
            onBack(); // Return to dashboard
        }
    };

    const handleStartSession = async (lectureId: string) => {
        try {
            const context = await SystemAPI.requestSessionStart(lectureId);
            onQuestionFlowStart('SESSION_START', lectureId, context.predictedDuration);
        } catch (e: any) {
            alert(`SYSTEM LOCKOUT: ${e.reason}`);
        }
    };

    return (
        <div className={styles.detailView}>

            {/* Header with Metrics */}
            <div className={styles.detailHeader}>
                <button onClick={onBack} className={styles.backBtn}>
                    <ArrowLeft size={20} />
                </button>
                <div className={styles.headerInfo}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h1 className={styles.subjectTitle}>{subject.name}</h1>
                        <button onClick={handleRename} className={styles.iconBtn} title="Rename Subject">
                            <Edit size={16} />
                        </button>
                        <button onClick={handleDelete} className={styles.iconBtn} style={{ color: '#EF4444' }} title="Delete Subject">
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <div className={styles.metaRow}>
                        <span className={`${styles.metaBadge} ${styles.strictnessBadge}`}>
                            {subject.config?.strictnessLevel ?? 0}
                        </span>
                    </div>
                </div>
                {/* Stats removed as per user request */}
            </div>

            {/* Control Toolbar */}
            <div className={styles.toolbar}>
                <span className={styles.sectionTitle}>ACADEMIC INPUTS</span>
                <button
                    className={styles.actionBtn}
                    onClick={() => onQuestionFlowStart('LECTURE_INTENT', subjectId)}
                >
                    <PlusCircle size={16} /> Add Lecture
                </button>
            </div>

            {/* NEW: SESSION INTELLIGENCE TABLE */}
            <SessionIntelligenceTable
                subjectId={subjectId}
                lectures={lectures}
                sessions={subjectSessions}
                onStartSession={handleStartSession}
                lang={'en'} // Should be prop, but for now hardcoded or passed from parent? passed props don't have it.
                // Actually SubjectDetailView doesn't receive lang. I should use default or get from somewhere.
                // Assuming 'en' for now or context.
                highlightLectureId={highlightLectureId}
            />
        </div>
    );
};
