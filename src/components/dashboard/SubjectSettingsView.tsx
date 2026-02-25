import React, { useState } from 'react';
import { Subject, SubjectConfig } from '@/core/types';
import { Settings, Save, AlertTriangle, Shield, Zap } from 'lucide-react';
import { translations, Language } from '@/core/i18n/translations';

interface SubjectSettingsProps {
    subject: Subject;
    onSave: (config: SubjectConfig) => void;
    onCancel: () => void;
    lang: Language;
}

export function SubjectSettingsView({ subject, onSave, onCancel, lang }: SubjectSettingsProps) {
    const t = translations[lang];
    // const isRtl = lang === 'ar'; // REMOVED Strict LTR Rule

    const [config, setConfig] = useState<SubjectConfig>(subject.config || {
        lectureTreatment: 'Standard',
        cognitiveThreshold: 75,
        revisionRule: 'Spaced-Repetition',
        strictnessLevel: 'Standard',
        maxDailyLoad: 'Medium'
    });

    const handleChange = (field: keyof SubjectConfig, value: any) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div style={{ padding: '2rem', color: '#F8FAFC', maxWidth: '800px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Settings size={22} color="#94A3B8" />
                        {t.physio_config}
                    </h1>
                    <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                        {t.sys_regulation}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={onCancel}
                        style={{ background: 'transparent', border: '1px solid #334155', color: '#94A3B8', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        {t.cancel}
                    </button>
                    <button
                        onClick={() => onSave(config)}
                        style={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                            border: 'none',
                            color: 'white',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '8px',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            fontWeight: 500,
                            cursor: 'pointer'
                        }}
                    >
                        <Save size={16} /> {t.save_changes}
                    </button>
                </div>
            </div>

            {/* Panels */}
            <div style={{ display: 'grid', gap: '1.5rem' }}>

                {/* Alert Area */}
                <div style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                }}>
                    <AlertTriangle size={20} color="#EF4444" style={{ marginTop: '0.2rem', minWidth: '20px' }} />
                    <div>
                        <h4 style={{ color: '#EF4444', fontWeight: 600, fontSize: '0.95rem' }}>{t.sys_override}</h4>
                        <p style={{ color: '#FECACA', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                            {t.override_warning}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
