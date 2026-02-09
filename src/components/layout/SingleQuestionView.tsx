import React from 'react';
import styles from './SingleQuestionView.module.css';
import { ArrowRight, CornerDownLeft } from 'lucide-react';
import { translations, Language } from '@/core/i18n/translations';

interface SingleQuestionViewProps {
    question: string;
    subtitle?: string;
    warning?: string; // New Prop
    inputType: 'text' | 'slider' | 'binary' | 'none' | 'date' | 'grid';
    value?: any;
    onChange?: (value: any) => void;
    onConfirm?: () => void;
    placeholder?: string;
    options?: { label: string; value: any }[];
    lang: Language;
}

export function SingleQuestionView({
    question,
    subtitle,
    warning,
    inputType,
    value,
    onChange,
    onConfirm,
    placeholder,
    options,
    lang
}: SingleQuestionViewProps) {
    const t = translations[lang];

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && onConfirm) {
            onConfirm();
        }
    };

    // Global Enter Key Handler for Grid/None types
    React.useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && onConfirm) {
                // Only trigger for Grid or None (Message) types
                // Inputs like Text/Slider handle their own Enter key events via onKeyDown prop
                // to avoid double-firing.
                if (inputType === 'grid' || inputType === 'none') {
                    // Check if value is selected for grid?
                    // Usually safe to call confirm, page logic handles validation if needed.
                    if (inputType === 'grid' && (value === undefined || value === null)) return;
                    onConfirm();
                }
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [inputType, value, onConfirm]);

    return (
        <div className={styles.container}>
            <h1 className={styles.question}>{question}</h1>

            {/* Subtitle: White, slightly dimmed */}
            {subtitle && (
                <div style={{
                    fontSize: '1rem',
                    color: '#ffffff',
                    marginTop: '-1rem',
                    marginBottom: '0.5rem',
                    opacity: 0.8,
                    textAlign: 'center'
                }}>
                    {subtitle}
                </div>
            )}

            {/* Warning: Red, larger, prominent */}
            {warning && (
                <div style={{
                    fontSize: '1.05rem',
                    color: '#ef4444',
                    marginTop: '0.5rem',
                    marginBottom: '1.5rem',
                    fontWeight: 500,
                    maxWidth: '600px',
                    textAlign: 'center',
                    lineHeight: '1.5'
                }}>
                    {warning}
                </div>
            )}

            <div className={styles.inputArea}>
                {inputType === 'text' && (
                    <input
                        type="text"
                        className={styles.textInput}
                        value={value || ''}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        autoFocus
                    />
                )}

                {inputType === 'slider' && (
                    <div className={styles.sliderContainer}>
                        <div className={styles.sliderValueDisplay}>
                            {value === 0 ? t.did_not_attend : `${value || 5} / 10`}
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="1"
                            value={value !== undefined ? value : 5}
                            onChange={(e) => onChange && onChange(Number(e.target.value))}
                            onKeyDown={handleKeyDown}
                            className={styles.slider}
                            autoFocus
                        />
                        <div className={styles.sliderScale}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <span
                                    key={num}
                                    className={value === num ? styles.scaleNumberActive : styles.scaleNumber}
                                    onClick={() => onChange && onChange(num)}
                                >
                                    {num}
                                </span>
                            ))}
                        </div>
                        <div className={styles.sliderLabels}>
                            <span>{t.understanding_low}</span>
                            <span>{t.understanding_high}</span>
                        </div>
                        {/* Special label for 0 (did not attend) - centered under 0 */}
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '30px',
                            marginTop: '-40px'
                        }}>
                            <span style={{
                                fontSize: '0.75rem',
                                opacity: 0.6,
                                fontStyle: 'italic',
                                position: 'absolute',
                                left: '16px',
                                transform: 'translateX(-50%)',
                                textAlign: 'center',
                                lineHeight: '1.3'
                            }}>
                                {t.did_not_attend.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && <br />}
                                        {line}
                                    </React.Fragment>
                                ))}
                            </span>
                        </div>
                    </div>
                )}

                {inputType === 'binary' && (
                    <div className={styles.binaryOptions}>
                        <button className={styles.binaryBtn} onClick={() => { onChange && onChange(true); onConfirm && onConfirm(); }}>{t.yes}</button>
                        <button className={styles.binaryBtn} onClick={() => { onChange && onChange(false); onConfirm && onConfirm(); }}>{t.no}</button>
                    </div>
                )}

                {inputType === 'grid' && options && (
                    <div className={styles.gridContainer}>
                        {options.map((opt) => (
                            <button
                                key={opt.label}
                                className={`${styles.gridBtn} ${value === opt.value ? styles.gridBtnActive : ''}`}
                                onClick={() => { onChange && onChange(opt.value); }}
                                onDoubleClick={() => { onChange && onChange(opt.value); onConfirm && onConfirm(); }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}

                {inputType === 'date' && (
                    <input
                        type="date"
                        className={styles.dateInput}
                        value={value || ''}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                )}
            </div>

            {inputType !== 'binary' && inputType !== 'none' && (
                <button className={styles.enterBtn} onClick={() => onConfirm && onConfirm()}>
                    {t.enter_btn} <CornerDownLeft size={16} />
                </button>
            )}

            {inputType === 'grid' && (
                <div className={styles.hint}>
                    {t.select_option_hint}
                </div>
            )}
        </div>
    );
}
