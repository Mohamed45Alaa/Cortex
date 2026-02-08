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

                {/* Strictness Panel */}
                <div style={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    padding: '1.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Shield size={20} color="#F59E0B" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{t.sys_strictness}</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        {[
                            { id: 'Relaxed', label: t.level_relaxed },
                            { id: 'Standard', label: t.level_standard },
                            { id: 'Military', label: t.level_military }
                        ].map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleChange('strictnessLevel', item.id)}
                                style={{
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: config.strictnessLevel === item.id ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.05)',
                                    background: config.strictnessLevel === item.id ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.02)',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ fontSize: '0.9rem', fontWeight: 500, color: config.strictnessLevel === item.id ? '#F59E0B' : '#94A3B8' }}>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cognitive Load Limits */}
                <div style={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    padding: '1.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Zap size={20} color="#3B82F6" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{t.cog_thresholds}</h3>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#94A3B8', marginBottom: '0.75rem' }}>
                            {t.load_limit_label}
                        </label>
                        <input
                            type="range"
                            min="50"
                            max="100"
                            value={config.cognitiveThreshold}
                            onChange={(e) => handleChange('cognitiveThreshold', parseInt(e.target.value))}
                            style={{ width: '100%', marginBottom: '0.5rem', direction: 'ltr' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748B', direction: 'ltr' }}>
                            <span>{t.limit_conservative}</span>
                            <span style={{ color: '#3B82F6', fontWeight: 600 }}>{config.cognitiveThreshold}%</span>
                            <span>{t.limit_none}</span>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#94A3B8', marginBottom: '0.75rem' }}>
                            {t.revision_strategy}
                        </label>
                        <select
                            value={config.revisionRule}
                            onChange={(e) => handleChange('revisionRule', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#0F172A',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                color: '#F8FAFC',
                                outline: 'none'
                            }}
                        >
                            <option value="Spaced-Repetition">{t.strat_spaced}</option>
                            <option value="Just-in-Time">{t.strat_jit}</option>
                            <option value="Aggressive">{t.strat_aggressive}</option>
                        </select>
                    </div>
                </div>

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
