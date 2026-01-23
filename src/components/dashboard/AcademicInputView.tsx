import React from 'react';
import { translations, Language } from '@/core/i18n/translations';
import { Zap, Database, ArrowRight, LayoutGrid, List } from 'lucide-react';
import styles from './AcademicInput.module.css';

interface AcademicInputViewProps {
    lang: Language;
    onInject: () => void;
}

export const AcademicInputView: React.FC<AcademicInputViewProps> = ({
    lang,
    onInject
}) => {
    const t = translations[lang];

    return (
        <div className={styles.container}>
            {/* Header: Control Panel Style */}
            <header className={styles.header}>
                <div className={styles.titleBlock}>
                    <h1 className={styles.pageTitle}>{t.academic_input || 'Academic Input'}</h1>
                    <span className={styles.subTitle}>Knowledge Injection Control</span>
                </div>
                <div className={styles.actions}>
                    <button className={styles.primaryAction} onClick={onInject}>
                        <Zap size={18} />
                        <span>{t.inject_input || 'Inject Input'}</span>
                    </button>
                </div>
            </header>

            {/* Empty State / Control Area */}
            <div className={styles.controlPanel}>
                <div className={styles.emptyState}>
                    <div className={styles.iconRing}>
                        <Database size={48} strokeWidth={1} />
                    </div>
                    <h2 className={styles.emptyTitle}>System Database is Empty</h2>
                    <p className={styles.emptyDesc}>
                        Inject raw academic data to begin processing.
                        The system requires input to generate cognitive load metrics.
                    </p>

                    <button className={styles.ghostButton} onClick={onInject}>
                        <span>Initialize Injection Sequence</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
