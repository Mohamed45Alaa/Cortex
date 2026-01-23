import React, { useState } from 'react';
import { Settings, Save, Smartphone, Shield, Globe, Database, Zap, AlertTriangle } from 'lucide-react';

interface SystemConfigViewProps {
    lang: 'en' | 'ar';
}

export function SystemConfigView({ lang }: SystemConfigViewProps) {
    const isRtl = lang === 'ar';
    const t = {
        title: lang === 'en' ? 'System Configuration' : 'إعدادات النظام',
        subtitle: lang === 'en' ? 'Global settings and system detection' : 'الإعدادات العامة والكشف عن النظام',
        detect_device: lang === 'en' ? 'Device Detection' : 'كشف الجهاز',
        device_status: lang === 'en' ? 'System Status: Optimal' : 'حالة النظام: مثالية',
        sync_status: lang === 'en' ? 'Cloud Sync: Active' : 'مزامنة سحابية: نشطة',
        version: lang === 'en' ? 'Version 1.0.0-PROD' : 'الإصدار 1.0.0-PROD',
        data_management: lang === 'en' ? 'Data Management' : 'إدارة البيانات',
        clear_cache: lang === 'en' ? 'Clear Local Cache' : 'مسح التخزين المحلي',
        reset_system: lang === 'en' ? 'Reset System State' : 'إعادة ضبط النظام',

        // Study Logic
        sys_strictness: lang === 'en' ? 'System Strictness' : 'صرامة النظام',
        level_relaxed: lang === 'en' ? 'Relaxed' : 'مرن',
        level_standard: lang === 'en' ? 'Standard' : 'قياسي',
        level_military: lang === 'en' ? 'Military' : 'عسكري',
        cog_thresholds: lang === 'en' ? 'Cognitive Thresholds' : 'الحدود المعرفية',
        load_limit_label: lang === 'en' ? 'Daily Load Limit' : 'حد الحمل اليومي',
        limit_conservative: lang === 'en' ? 'Conservative' : 'محافظ',
        limit_none: lang === 'en' ? 'No Limit' : 'بلا حدود',
        revision_strategy: lang === 'en' ? 'Revision Strategy' : 'استراتيجية المراجعة',
        strat_spaced: lang === 'en' ? 'Spaced Repetition' : 'التكرار المتباعد',
        strat_jit: lang === 'en' ? 'Just-in-Time' : 'في الوقت المناسب',
        strat_aggressive: lang === 'en' ? 'Aggressive' : 'هجومي',
        sys_override: lang === 'en' ? 'System Override Zone' : 'منطقة تجاوز النظام',
        override_warning: lang === 'en' ? 'Modifying these presets affects the core algorithm of the Agent. Proceed with caution.' : 'تعديل هذه الإعدادات المسبقة يؤثر على الخوارزمية الأساسية للوكيل. تابع بحذر.'
    };

    const [deviceStatus, setDeviceStatus] = useState(t.device_status);

    // Mock Config State for UI Demo
    const [config, setConfig] = useState({
        strictnessLevel: 'Standard',
        cognitiveThreshold: 75,
        revisionRule: 'Spaced-Repetition'
    });

    const handleChange = (field: string, value: any) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleClearCache = () => {
        if (confirm('Are you sure you want to clear local storage? This will reset your session history.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div style={{ padding: '2rem', color: '#F8FAFC', maxWidth: '800px', margin: '0 auto', direction: isRtl ? 'rtl' : 'ltr' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Settings size={22} color="#94A3B8" />
                    {t.title}
                </h1>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {t.subtitle}
                </p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>

                {/* System Status Panel */}
                <div style={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    padding: '1.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Smartphone size={20} color="#3B82F6" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{t.detect_device}</h3>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: '#CBD5E1', marginBottom: '0.5rem' }}>
                        {deviceStatus}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                        User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'Server'}
                    </div>
                </div>

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

                {/* Data Management */}
                <div style={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    padding: '1.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Database size={20} color="#F59E0B" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{t.data_management}</h3>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={handleClearCache}
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#EF4444',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.85rem'
                            }}
                        >
                            {t.clear_cache}
                        </button>
                    </div>
                </div>

                {/* Version Info */}
                <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
                    {t.version}
                </div>

            </div>
        </div>
    );
}
