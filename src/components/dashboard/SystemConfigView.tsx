import React, { useState, useEffect } from 'react';
import { Settings, Save, Smartphone, Shield, Globe, Database, Zap, AlertTriangle } from 'lucide-react';

interface SystemConfigViewProps {
    lang: 'en' | 'ar';
}

export function SystemConfigView({ lang }: SystemConfigViewProps) {
    // const isRtl = lang === 'ar'; // REMOVED Strict LTR Rule
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
        <div style={{ padding: '2rem', color: '#F8FAFC', maxWidth: '800px', margin: '0 auto' }}>
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

                {/* Version Info */}
                <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
                    {t.version}
                </div>

                {/* ACCOUNT MANAGEMENT SECTION - DANGER ZONE */}
                <AccountManagementSection lang={lang} />

            </div>
        </div>
    );
}

// --- SUB-COMPONENT: ACCOUNT MANAGEMENT ---
import { Trash2, RotateCcw, X, AlertOctagon } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

function AccountManagementSection({ lang }: { lang: 'en' | 'ar' }) {
    const { authState, logout } = useStore();
    const router = useRouter();

    // Modal State
    const [actionType, setActionType] = useState<'RESET' | 'DELETE' | null>(null);
    const [confirmText, setConfirmText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Undo State
    const [undoToken, setUndoToken] = useState<string | null>(null);
    const [undoExpiry, setUndoExpiry] = useState<number | null>(null);

    // Timer for Undo Expiry
    useEffect(() => {
        if (undoExpiry) {
            const timer = setInterval(() => {
                if (Date.now() > undoExpiry) {
                    setUndoToken(null);
                    setUndoExpiry(null);
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [undoExpiry]);

    const t = {
        title: lang === 'en' ? 'Account Management' : 'إدارة الحساب',
        reset_btn: lang === 'en' ? 'Reset Platform Data' : 'إعادة ضبط البيانات',
        delete_btn: lang === 'en' ? 'Delete Account Permanently' : 'حذف الحساب نهائياً',

        // List Items
        reset_info: lang === 'en' ? 'What will be reset?' : 'ماذا سيتم حذفه؟',
        list: lang === 'en' ? [
            'All study sessions history',
            'Cognitive Load records',
            'Collection Efficiency metrics',
            'Total sessions counter',
            'Session analytics & grades',
            'Timeline / activity logs'
        ] : [
            'جميع سجلات جلسات الدراسة',
            'سجلات الحمل المعرفي',
            'مقاييس كفاءة التجميع',
            'عداد الجلسات الكلي',
            'تحليلات الجلسات والدرجات',
            'سجلات النشاط والجدول الزمني'
        ],
        safe_note: lang === 'en' ?
            'Profile data will remain untouched: name – university – faculty – year – phone' :
            'سيتم الاحتفاظ ببيانات الملف الشخصي: الاسم – الجامعة – الكلية – السنة – الهاتف',

        // Modal
        confirm_reset_title: lang === 'en' ? 'Confirm Data Reset' : 'تأكيد إعادة الضبط',
        confirm_delete_title: lang === 'en' ? 'Confirm Account Deletion' : 'تأكيد حذف الحساب',
        type_to_confirm: lang === 'en' ? 'Type the following to confirm:' : 'اكتب العبارة التالية للتأكيد:',
        cancel: lang === 'en' ? 'Cancel' : 'إلغاء',
        confirm: lang === 'en' ? 'Confirm Action' : 'تأكيد الإجراء',

        phrases: {
            RESET: 'RESET MY DATA',
            DELETE: 'DELETE ACCOUNT'
        }
    };

    const handleExecute = async () => {
        if (!authState.user?.id || !actionType) return;

        // Strict Text Match Check
        if (confirmText !== t.phrases[actionType]) return;

        setIsProcessing(true);

        try {
            if (actionType === 'RESET') {
                const res = await fetch('/api/account/reset-data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ uid: authState.user.id })
                });

                const data = await res.json();

                if (res.ok) {
                    // Success! Show Undo Option
                    if (data.undoToken) {
                        setUndoToken(data.undoToken);
                        setUndoExpiry(Date.now() + 5 * 60 * 1000); // 5 mins
                    }
                    // We don't force reload immediately if we want to show Undo? 
                    // Actually, reset clears data, so UI might look broken if we don't reload.
                    // But if we reload, we lose state (undoToken).
                    // STRATEGY: Persist undoToken in localStorage or url?
                    // User requirement: "CLEAR ALL LOCAL CACHE ON NEXT LOGIN".
                    // Let's just create a "Fresh State" on client side manually or just show toast.
                    // The AppGate recovery might trigger if we reload though.
                    // Let's reload but pass undoToken? No, that's complex.
                    // Let's NOT reload automatically for 'RESET', but reset local stores?
                    // Or simplified: Just show success message and "Undo". Dashboard will be empty.

                    // Actually, let's keep it simple. Only reload if they navigate away or manual.
                    // We can rely on next fetch to get empty data.
                    alert("Reset Complete. You have 5 minutes to Undo.");
                    // WAIT. If we reload, we lose the token state!
                    // We must save token to localStorage to survive reload if we want "Undo" to persist.
                    if (data.undoToken) {
                        localStorage.setItem('undo_token', data.undoToken);
                        localStorage.setItem('undo_expiry', (Date.now() + 5 * 60 * 1000).toString());
                    }
                    window.location.reload(); // We Reload.

                } else {
                    alert('Reset Failed. Please try again.');
                }
            }

            else if (actionType === 'DELETE') {
                const res = await fetch('/api/account/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ uid: authState.user.id })
                });

                if (res.ok) {
                    logout();
                    router.replace('/');
                } else {
                    alert('Deletion Failed. Please try again.');
                }
            }

        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred.');
        } finally {
            setIsProcessing(false);
            setActionType(null);
            setConfirmText('');
        }
    };

    const handleUndo = async () => {
        const token = undoToken || localStorage.getItem('undo_token');
        if (!token) return;

        if (confirm("Restore your data from backup?")) {
            setIsProcessing(true);
            try {
                const res = await fetch('/api/account/undo-reset', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ undoToken: token })
                });
                if (res.ok) {
                    alert("Restoration Complete!");
                    localStorage.removeItem('undo_token');
                    localStorage.removeItem('undo_expiry');
                    setUndoToken(null);
                    window.location.reload();
                } else {
                    alert("Restore Failed/Expired.");
                }
            } catch (e) {
                alert("Error restoring data.");
            } finally {
                setIsProcessing(false);
            }
        }
    };

    // Check for existing undo token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('undo_token');
        const storedExpiry = localStorage.getItem('undo_expiry');
        if (storedToken && storedExpiry) {
            if (Date.now() < parseInt(storedExpiry)) {
                setUndoToken(storedToken);
                setUndoExpiry(parseInt(storedExpiry));
            } else {
                localStorage.removeItem('undo_token');
                localStorage.removeItem('undo_expiry');
            }
        }
    }, []);


    return (
        <div style={{
            background: 'rgba(30, 41, 59, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '4rem' // Bottom spacer
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <AlertOctagon size={20} color="#F87171" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{t.title}</h3>
            </div>

            {/* Information List */}
            <div className="bg-slate-950/50 rounded-xl p-4 mb-6 border border-white/5">
                <h4 className="text-slate-400 text-sm font-medium mb-3">{t.reset_info}</h4>
                <ul className="space-y-2 mb-4">
                    {t.list.map((item, i) => (
                        <li key={i} className="text-slate-500 text-xs flex items-center gap-2">
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            {item}
                        </li>
                    ))}
                </ul>
                <div className="text-emerald-500/80 text-xs border-t border-white/5 pt-3">
                    {t.safe_note}
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => setActionType('RESET')}
                    className="flex justify-center items-center gap-2 py-3 px-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 hover:bg-yellow-500/10 transition-colors text-sm font-medium"
                >
                    <RotateCcw size={16} />
                    {t.reset_btn}
                </button>

                <button
                    onClick={() => setActionType('DELETE')}
                    className="flex justify-center items-center gap-2 py-3 px-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10 transition-colors text-sm font-medium"
                >
                    <Trash2 size={16} />
                    {t.delete_btn}
                </button>
            </div>

            {/* CONFIRMATION MODAL */}
            {actionType && (
                <div className="fixed inset-0 z[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
                    <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl transform scale-100 animate-in fade-in zoom-in duration-200">

                        <div className="flex justify-between items-start mb-6">
                            <h3 className={`text-lg font-bold ${actionType === 'DELETE' ? 'text-red-500' : 'text-yellow-500'}`}>
                                {actionType === 'DELETE' ? t.confirm_delete_title : t.confirm_reset_title}
                            </h3>
                            <button onClick={() => setActionType(null)} className="text-slate-500 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-slate-300">
                                {t.type_to_confirm}
                                <span className="block mt-2 font-mono font-bold text-white bg-slate-950 p-2 rounded text-center select-all">
                                    {t.phrases[actionType]}
                                </span>
                            </p>

                            <input
                                type="text"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors text-center font-mono"
                                placeholder={t.phrases[actionType]}
                                autoFocus
                            />

                            <button
                                disabled={confirmText !== t.phrases[actionType] || isProcessing}
                                onClick={handleExecute}
                                className={`w-full py-3 rounded-xl font-bold transition-all flex justify-center items-center gap-2 ${confirmText === t.phrases[actionType]
                                    ? (actionType === 'DELETE' ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20' : 'bg-yellow-600 hover:bg-yellow-500 text-white shadow-lg shadow-yellow-900/20')
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                    }`}
                            >
                                {isProcessing && <RotateCcw className="animate-spin" size={16} />}
                                {t.confirm}
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* UNDO BANNER */}
            {undoToken && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-emerald-500/50 shadow-2xl rounded-full py-3 px-6 flex items-center gap-4 z-[100] animate-in slide-in-from-bottom-5">
                    <div className="flex flex-col">
                        <span className="text-emerald-400 font-bold text-sm">Data Reset Active</span>
                        <span className="text-xs text-slate-400">You can undo this within 5 mins</span>
                    </div>
                    <button
                        onClick={handleUndo}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-emerald-900/20 transition-all flex items-center gap-2"
                    >
                        <RotateCcw size={14} />
                        UNDO
                    </button>
                </div>
            )}
        </div>
    );
}
