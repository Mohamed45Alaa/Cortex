'use client';

import React, { useState, useEffect } from 'react';
import { User, Phone, Save, Shield, Smartphone, AlertCircle, Check, Loader2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { FirestoreService } from '@/core/services/FirestoreService';
import { translations, Language } from '@/core/i18n/translations';

interface AccountSettingsViewProps {
    lang: Language;
}

export function AccountSettingsView({ lang }: AccountSettingsViewProps) {
    const { authState, setProfile } = useStore();
    const user = authState.user;
    const isRtl = lang === 'ar';

    // Normalized Identity State
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        countryCode: '+20'
    });

    const [status, setStatus] = useState<'IDLE' | 'SAVING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

    // Initialize Form from Store
    useEffect(() => {
        if (user) {
            // Prioritize Identity Object -> Fallback to Root Fields
            const identityName = user.identity?.fullName || user.fullName || user.name || '';
            const identityPhone = user.identity?.phone || '';

            setFormData(prev => ({
                ...prev,
                fullName: identityName,
                phone: identityPhone
            }));
        }
    }, [user]);

    // Validation Logic
    const validate = () => {
        const newErrors: { name?: string; phone?: string } = {};
        let isValid = true;

        // 1. Triple Name Regex: At least 3 parts separated by spaces
        // ^(\S+\s){2}\S+$ matches "Word Space Word Space Word..."
        const nameRegex = /^(\S+\s){2,}\S+$/;
        if (!formData.fullName.trim() || !nameRegex.test(formData.fullName.trim())) {
            newErrors.name = lang === 'en'
                ? "Full legal name required (at least 3 valid names)."
                : "الاسم الثلاثي مطلوب (على الأقل 3 أسماء).";
            isValid = false;
        }

        // 2. Phone Validation (Simple Length Check for now)
        if (!formData.phone.trim() || formData.phone.length < 9) {
            newErrors.phone = lang === 'en'
                ? "Valid phone number required."
                : "رقم هاتف صالح مطلوب.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Ref for Academic Section Scroll
    const academicRef = React.useRef<HTMLDivElement>(null);

    const handleSave = async () => {
        if (!validate()) return;
        if (!user?.id) return;

        setStatus('SAVING');
        try {
            // PHASE 2: STRICT UNIQUENESS CHECK
            const isPhoneUnique = await FirestoreService.checkPhoneUnique(user.id, formData.phone.trim());
            if (!isPhoneUnique) {
                setErrors({ phone: lang === 'en' ? "Phone number already in use." : "رقم الهاتف مستخدم بالفعل." });
                setStatus('IDLE');
                return;
            }

            const updates = {
                fullName: formData.fullName.trim(),
                phone: formData.phone.trim()
            };

            await FirestoreService.saveUserProfile(user.id, updates);

            // Optimistic Update Store
            setProfile({
                ...user,
                // Update flat fields for compatibility
                fullName: updates.fullName,
                // Update identity object for strictness
                identity: {
                    fullName: updates.fullName,
                    phone: updates.phone,
                    email: user.identity?.email || user.email || ''
                }
            } as any);

            setStatus('SUCCESS');

            // UX: Auto-scroll to Academic Section if incomplete (Onboarding Flow)
            // Check if faculty or university is missing
            const isAcademicIncomplete = !user.faculty || !user.university;

            if (isAcademicIncomplete) {
                setTimeout(() => {
                    academicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 1000); // Small delay to let success status be seen
            }

            setTimeout(() => setStatus('IDLE'), 2000);

        } catch (error) {
            console.error(error);
            setStatus('ERROR');
        }
    };

    const t = {
        title: lang === 'en' ? 'Account Identity' : 'هوية الحساب',
        subtitle: lang === 'en' ? 'Manage your strict legal identity' : 'إدارة الهوية القانونية الصارمة',
        name_label: lang === 'en' ? 'Full Legal Name' : 'الاسم القانوني الكامل',
        phone_label: lang === 'en' ? 'Phone Number' : 'رقم الهاتف',
        save: lang === 'en' ? 'Save Changes' : 'حفظ التغييرات',
        saving: lang === 'en' ? 'Saving...' : 'جاري الحفظ...',
        success: lang === 'en' ? 'Identity Updated' : 'تم تحديث الهوية',
        privacy_note: lang === 'en' ? 'Your identity is encrypted and used solely for academic verification.' : 'هويتك مشفرة وتستخدم فقط للتحقق الأكاديمي.'
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', direction: isRtl ? 'rtl' : 'ltr' }}>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#F8FAFC' }}>
                    <Shield size={22} className="text-emerald-500" />
                    {t.title}
                </h1>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {t.subtitle}
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">

                {/* Full Name */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                        {t.name_label}
                    </label>
                    <div className="relative group">
                        <div className={`absolute top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors ${isRtl ? 'right-4' : 'left-4'}`}>
                            <User size={18} />
                        </div>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                            className={`w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-950/80 transition-all ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} ${errors.name ? 'border-red-500/50' : ''}`}
                            placeholder="ex. Mohamed Ahmed Mahmoud"
                        />
                    </div>
                    {errors.name && (
                        <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle size={12} /> {errors.name}
                        </p>
                    )}
                </div>

                {/* Phone Number */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                        {t.phone_label}
                    </label>
                    <div className="flex gap-3">
                        {/* Country Code Selector (Mock for Phase 2) */}
                        <div className="relative w-28 shrink-0">
                            <select
                                value={formData.countryCode}
                                onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                                className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 px-4 text-white appearance-none focus:outline-none focus:border-indigo-500/50 cursor-pointer"
                            >
                                <option value="+20">🇪🇬 +20</option>
                                <option value="+966">🇸🇦 +966</option>
                            </select>
                        </div>

                        <div className="relative group flex-1">
                            <div className={`absolute top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors ${isRtl ? 'right-4' : 'left-4'}`}>
                                <Phone size={18} />
                            </div>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/[^0-9]/g, '') }))}
                                className={`w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-950/80 transition-all ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} ${errors.phone ? 'border-red-500/50' : ''}`}
                                placeholder="100 123 4567"
                            />
                        </div>
                    </div>
                    {errors.phone && (
                        <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle size={12} /> {errors.phone}
                        </p>
                    )}
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                        <Shield size={12} /> {t.privacy_note}
                    </p>

                    <button
                        onClick={handleSave}
                        disabled={status === 'SAVING' || status === 'SUCCESS'}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${status === 'SUCCESS'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {status === 'SAVING' && <Loader2 size={16} className="animate-spin" />}
                        {status === 'SUCCESS' && <Check size={16} />}
                        {status === 'IDLE' && <Save size={16} />}

                        {status === 'SAVING' ? t.saving : status === 'SUCCESS' ? t.success : t.save}
                    </button>
                </div>

            </div>

            {/* ACADEMIC PROFILE EXTENSION (PHASE 3) */}
            <AcademicProfileSection
                sectionRef={academicRef}
                user={user}
                lang={lang}
                onUpdate={(updates) => {
                    // Optimistic update for nested component
                    setProfile({ ...user, ...updates } as any);
                    FirestoreService.saveUserProfile(user?.id || '', updates);
                }}
            />
        </div>
    );
}

// --- SUB-COMPONENT: ACADEMIC PROFILE ---
import { GraduationCap, School, BookOpen } from 'lucide-react';
import { universities } from '@/config/universities';
import { faculties } from '@/config/faculties';

function AcademicProfileSection({ user, lang, onUpdate, sectionRef }: { user: any, lang: Language, onUpdate: (d: any) => void, sectionRef?: React.RefObject<HTMLDivElement | null> }) {
    const isRtl = lang === 'ar';

    // Search States
    const [uniSearch, setUniSearch] = useState('');
    const [showUniList, setShowUniList] = useState(false);

    const [facSearch, setFacSearch] = useState('');
    const [showFacList, setShowFacList] = useState(false);

    // Local State initialized from User
    const [academicData, setAcademicData] = useState({
        university: user?.university || '',
        faculty: user?.faculty || '',
        academicYear: user?.academicYear || 'Year 1'
    });

    // Detect if user has a custom university/faculty not in list (for initial search text)
    useEffect(() => {
        if (user?.university) setAcademicData(prev => ({ ...prev, university: user.university }));
        if (user?.faculty) setAcademicData(prev => ({ ...prev, faculty: user.faculty }));
    }, [user]);

    const handleSaveAcademic = () => {
        onUpdate(academicData);
    };

    // --- UNIVERSITY FILTERING ---
    // Flatten the categorized object into a searchable list
    const allUnis = [
        ...universities.government.map(u => ({ name: u, type: 'Government' })),
        ...universities.national.map(u => ({ name: u, type: 'National' })),
        ...universities.private.map(u => ({ name: u, type: 'Private' })),
        ...universities.supplementary.map(u => ({ name: u, type: 'Institute' }))
    ];

    const filteredUnis = allUnis.filter(u =>
        u.name.toLowerCase().includes(uniSearch.toLowerCase())
    ).slice(0, 50);

    // --- FACULTY FILTERING ---
    const filteredFaculties = faculties.filter(f =>
        f.toLowerCase().includes(facSearch.toLowerCase())
    ).slice(0, 50);

    const t = {
        title: lang === 'en' ? 'Academic Profile' : 'البيانات الأكاديمية',
        subtitle: lang === 'en' ? 'University and Faculty details' : 'بيانات الجامعة والكلية',
        uni_label: lang === 'en' ? 'University' : 'الجامعة',
        fac_label: lang === 'en' ? 'Faculty' : 'الكلية',
        year_label: lang === 'en' ? 'Academic Year' : 'السنة الدراسية',
        years: [
            { id: 'Year 1', en: 'First Year', ar: 'الفرقة الأولى' },
            { id: 'Year 2', en: 'Second Year', ar: 'الفرقة الثانية' },
            { id: 'Year 3', en: 'Third Year', ar: 'الفرقة الثالثة' },
            { id: 'Year 4', en: 'Fourth Year', ar: 'الفرقة الرابعة' },
            { id: 'Year 5', en: 'Fifth Year', ar: 'الفرقة الخامسة' },
            { id: 'Graduated', en: 'Graduated', ar: 'خريج' }
        ],
        placeholder_uni: lang === 'en' ? 'Search or type custom university...' : 'ابحث أو اكتب اسم الجامعة...',
        placeholder_fac: lang === 'en' ? 'Search or type custom faculty...' : 'ابحث أو اكتب اسم الكلية...',
        save_academic: lang === 'en' ? 'Update Academic Info' : 'تحديث البيانات الأكاديمية',
        other: lang === 'en' ? 'Other / Manual Entry' : 'أخرى / إدخال يدوي'
    };

    // DEBUG: Verify Data Import
    console.log("AccountSettingsView rendered");
    console.log("Universities Config:", universities);
    console.log("Faculties Config:", faculties);

    return (
        <div ref={sectionRef} style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', direction: isRtl ? 'rtl' : 'ltr' }}>

            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#F8FAFC' }}>
                    <GraduationCap size={22} className="text-blue-500" />
                    {t.title}
                </h1>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {t.subtitle}
                </p>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">

                {/* University Selector */}
                <div className="mb-8 relative z-30">
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                        {t.uni_label}
                    </label>
                    <div className="relative group">
                        <div className={`absolute top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors ${isRtl ? 'right-4' : 'left-4'}`}>
                            <School size={18} />
                        </div>
                        <input
                            type="text"
                            value={academicData.university} // Bind to effective value
                            onChange={(e) => {
                                setAcademicData(prev => ({ ...prev, university: e.target.value }));
                                setUniSearch(e.target.value);
                                setShowUniList(true);
                            }}
                            onFocus={() => setShowUniList(true)}
                            // Increased delay to allow click event registration
                            onBlur={() => setTimeout(() => setShowUniList(false), 300)}
                            className={`w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/80 transition-all ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                            placeholder={t.placeholder_uni}
                        />
                        {/* Dropdown - Fixed Z-Index and Max-Height */}
                        {showUniList && (uniSearch.length > 0 || academicData.university.length < 3) && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0B1120] border border-white/10 rounded-xl shadow-2xl overflow-y-auto max-h-60 z-[100] text-left dir-ltr">
                                {filteredUnis.length > 0 ? filteredUnis.map((u, i) => (
                                    <button
                                        key={i}
                                        className={`w-full text-left px-4 py-3 hover:bg-white/10 text-sm text-slate-300 flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}
                                        onMouseDown={(e) => {
                                            e.preventDefault(); // Prevent blur
                                            setAcademicData(prev => ({ ...prev, university: u.name }));
                                            setShowUniList(false);
                                        }}
                                    >
                                        <span className="font-medium">{u.name}</span>
                                        <span className="text-[10px] text-slate-500 uppercase border border-slate-700/50 px-1.5 py-0.5 rounded tracking-wider ml-2">{u.type}</span>
                                    </button>
                                )) : (
                                    <div className="px-4 py-3 text-xs text-slate-500 italic">
                                        {t.other}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Faculty Input */}
                <div className="mb-8 relative z-20">
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                        {t.fac_label}
                    </label>
                    <div className="relative group">
                        <div className={`absolute top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors ${isRtl ? 'right-4' : 'left-4'}`}>
                            <BookOpen size={18} />
                        </div>
                        <input
                            type="text"
                            value={academicData.faculty}
                            onChange={(e) => {
                                setAcademicData(prev => ({ ...prev, faculty: e.target.value }));
                                setFacSearch(e.target.value);
                                setShowFacList(true);
                            }}
                            onFocus={() => setShowFacList(true)}
                            onBlur={() => setTimeout(() => setShowFacList(false), 300)}
                            className={`w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/80 transition-all ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                            placeholder={t.placeholder_fac}
                        />
                        {/* Faculty Dropdown */}
                        {showFacList && (facSearch.length > 0 || academicData.faculty.length < 3) && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0B1120] border border-white/10 rounded-xl shadow-2xl overflow-y-auto max-h-60 z-[100] text-left dir-ltr">
                                {filteredFaculties.length > 0 ? filteredFaculties.map((f, i) => (
                                    <button
                                        key={i}
                                        className={`w-full text-left px-4 py-3 hover:bg-white/10 text-sm text-slate-300 flex items-center gap-2 ${isRtl ? 'flex-row-reverse text-right' : ''}`}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            setAcademicData(prev => ({ ...prev, faculty: f }));
                                            setShowFacList(false);
                                        }}
                                    >
                                        <span>{f}</span>
                                    </button>
                                )) : (
                                    <div className="px-4 py-3 text-xs text-slate-500 italic">
                                        {t.other}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Academic Year Selector - Native Select */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                        {t.year_label}
                    </label>
                    <div className="relative">
                        <select
                            value={academicData.academicYear}
                            onChange={(e) => setAcademicData(prev => ({ ...prev, academicYear: e.target.value }))}
                            className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 px-4 text-white appearance-none focus:outline-none focus:border-blue-500/50 cursor-pointer"
                        >
                            {t.years.map(y => (
                                <option key={y.id} value={y.id} className="bg-slate-900 text-white py-2">
                                    {lang === 'ar' ? y.ar : y.en}
                                </option>
                            ))}
                        </select>
                        <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 ${isRtl ? 'left-4' : 'right-4'}`}>
                            <div className="border-l border-b border-slate-500 w-2 h-2 -rotate-45 transform translate-y-[-2px]"></div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/5">
                    <button
                        onClick={handleSaveAcademic}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg border border-white/5 hover:border-white/10"
                    >
                        {t.save_academic}
                    </button>
                </div>

            </div>
        </div>
    );
}
