"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { User, BookOpen, Check, ChevronDown, GraduationCap, School } from 'lucide-react';
import { ACADEMIC_YEARS } from '@/config/admin';
import { universities } from '@/config/universities';
import { faculties } from '@/config/faculties';
import { SearchableSelect } from '@/components/tools/SearchableSelect';
import { FirestoreService } from '@/core/services/FirestoreService';

export default function AcademicOnboardingPage() {
    const router = useRouter();
    const { authState, isHydrated } = useStore();

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        university: '',
        faculty: '',
        academicYear: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [language, setLanguage] = useState<'en' | 'ar'>('en');
    const [nameStatus, setNameStatus] = useState<'IDLE' | 'VALID' | 'INVALID'>('IDLE');
    const [isNameTouched, setIsNameTouched] = useState(false);

    const [phoneStatus, setPhoneStatus] = useState<'IDLE' | 'VALID' | 'INVALID'>('IDLE');
    const [isPhoneTouched, setIsPhoneTouched] = useState(false);

    // Hydration & Auth Check
    useEffect(() => {
        if (isHydrated && authState.status === 'GUEST') {
            router.replace('/login');
        }
        if (isHydrated && authState.status === 'AUTHENTICATED' && authState.user?.completed) {
            router.replace('/dashboard');
        }
    }, [isHydrated, authState.status, authState.user, router]);

    const validateName = (name: string) => {
        const trimmed = name.trim();
        const parts = trimmed.split(/\s+/);
        const isValid = parts.length >= 3;
        const hasInvalidChars = /[0-9!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`]/.test(trimmed);
        if (hasInvalidChars) return { valid: false };
        return { valid: isValid };
    };

    const validatePhone = (phone: string) => {
        const trimmed = phone.trim();
        // Egyptian format usually starts with 01 but user just asked for "11 digits without country key"
        // Safest strictly numeric validation of length 11
        const isValid = /^\d{11}$/.test(trimmed);
        return { valid: isValid };
    };

    useEffect(() => {
        if (!formData.fullName && !isNameTouched) {
            setNameStatus('IDLE');
            return;
        }
        const check = validateName(formData.fullName);
        if (check.valid) {
            setNameStatus('VALID');
        } else {
            if (isNameTouched || formData.fullName.length > 5) setNameStatus('INVALID');
            else setNameStatus('IDLE');
        }
    }, [formData.fullName, isNameTouched]);

    useEffect(() => {
        if (!formData.phone && !isPhoneTouched) {
            setPhoneStatus('IDLE');
            return;
        }
        const check = validatePhone(formData.phone);
        if (check.valid) {
            setPhoneStatus('VALID');
        } else {
            // Only show invalid if touched, or starting to type but too long, etc.
            if (isPhoneTouched || formData.phone.length >= 11) setPhoneStatus('INVALID');
            else setPhoneStatus('IDLE');
        }
    }, [formData.phone, isPhoneTouched]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const check = validateName(formData.fullName);
        if (!check.valid) {
            setNameStatus('INVALID');
            setIsNameTouched(true);
            setError(language === 'en' ? "Please enter your full 3-part name without special characters." : "الرجاء إدخال اسمك الثلاثي بدون رموز.");
            return;
        }

        const phoneCheck = validatePhone(formData.phone);
        if (!phoneCheck.valid) {
            setPhoneStatus('INVALID');
            setIsPhoneTouched(true);
            setError(language === 'en' ? "Please enter an 11-digit phone number." : "الرجاء إدخال رقم هاتف مكون من 11 رقماً.");
            return;
        }

        if (!formData.university || !formData.faculty || !formData.academicYear) {
            setError(language === 'en' ? "All fields are required." : "جميع الحقول مطلوبة.");
            return;
        }

        setIsSubmitting(true);

        try {
            const uid = authState.user?.id;
            if (!uid) throw new Error("User not authenticated.");

            // Directly update Firestore
            await FirestoreService.saveUserProfile(uid, {
                fullName: formData.fullName,
                phone: formData.phone,
                university: formData.university,
                faculty: formData.faculty,
                academicYear: formData.academicYear as any,
                completed: true
            });

            // Update local state without waiting for onAuthStateChanged to pick it up
            useStore.setState(prev => ({
                ...prev,
                authState: {
                    ...prev.authState,
                    user: prev.authState.user ? {
                        ...prev.authState.user,
                        fullName: formData.fullName,
                        phone: formData.phone,
                        university: formData.university,
                        faculty: formData.faculty,
                        academicYear: formData.academicYear as any,
                        completed: true
                    } : null
                }
            }));

            // Force hard redirect to clear state and mount dashboard cleanly
            window.location.href = '/dashboard';
        } catch (err) {
            console.error(err);
            setError(language === 'en' ? "An error occurred. Please try again." : "حدث خطأ. يرجى المحاولة مرة أخرى.");
            setIsSubmitting(false);
        }
    };

    const t = {
        title: language === 'en' ? "Academic Profile" : "الملف الأكاديمي",
        subtitle: language === 'en' ? "Contextual calibration" : "المعايرة السياقية",
        welcome: language === 'en' ? "Welcome, Doctor" : "أهلاً بك يا دكتور",
        nameLabel: language === 'en' ? "Full Name (3 Parts)" : "الاسم الكامل (ثلاثي)",
        nameError: language === 'en' ? "Please enter a 3-part name" : "ادخل الاسم ثلاثي",
        namePlaceholder: language === 'en' ? "Mohamed Ahmed Mahmoud" : "محمد أحمد محمود",
        phoneLabel: language === 'en' ? "Phone Number" : "رقم الهاتف",
        phoneError: language === 'en' ? "11 digits required" : "11 رقم بدون مفتاح الدولة",
        phonePlaceholder: language === 'en' ? "01XXXXXXXXX" : "01000000000",
        uniLabel: language === 'en' ? "University" : "الجامعة",
        facLabel: language === 'en' ? "Faculty" : "الكلية",
        yearLabel: language === 'en' ? "Current Academic Year" : "السنة الدراسية الحالية",
        yearHelper: language === 'en' ? "You can change this later from your profile settings." : "يمكنك تغيير هذا لاحقًا من الإعدادات.",
        button: language === 'en' ? "Initialize System" : "بدء النظام",
        selectUni: language === 'en' ? "Select University" : "اختر الجامعة",
        selectFac: language === 'en' ? "Select Faculty" : "اختر الكلية",
        selectYear: language === 'en' ? "Select Year" : "اختر السنة"
    };

    const isRtl = language === 'ar';

    return (
        <div className="fixed inset-0 z-[999999] bg-[#020617] flex items-center justify-center font-sans overflow-y-auto min-h-screen">
            <div className="absolute inset-0 overflow-hidden pointer-events-none fixed">
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
            </div>

            <div className="relative w-full max-w-[480px] m-auto bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 z-10 shrink-0">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-10">
                    <button type="button" onClick={() => setLanguage('en')} className={`text-[11px] font-bold tracking-wider ${language === 'en' ? 'text-white' : 'text-slate-500'}`}>EN</button>
                    <div className="w-[1px] h-3 bg-white/20" />
                    <button type="button" onClick={() => setLanguage('ar')} className={`text-[11px] font-bold tracking-wider ${language === 'ar' ? 'text-white' : 'text-slate-500'}`}>AR</button>
                </div>

                <div className="flex flex-col items-center w-full mb-8 mt-2 text-center">
                    <h1 className="text-2xl font-semibold text-white tracking-tight mb-1 drop-shadow-lg">
                        {t.title}
                    </h1>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-200/70 font-medium">
                        {t.subtitle}
                    </p>

                    <div className="flex items-center gap-4 w-full justify-center my-6 opacity-60">
                        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
                        <GraduationCap className="w-5 h-5 text-indigo-300" strokeWidth={1.5} />
                        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
                    </div>

                    <h2 className="text-[15px] font-medium text-slate-200">
                        {t.welcome}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5" dir="ltr">

                    {/* Full Name */}
                    <div className="space-y-2">
                        <label className={`text-[13px] font-medium text-slate-300 ml-1 ${isRtl ? 'block text-right pr-1' : ''}`}>
                            {t.nameLabel}
                        </label>
                        <div className="relative group">
                            <div className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors group-focus-within:text-indigo-400 ${isRtl ? 'right-4' : 'left-4'}`}>
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                onBlur={() => setIsNameTouched(true)}
                                placeholder={t.namePlaceholder}
                                dir={isRtl ? 'rtl' : 'ltr'}
                                autoComplete="off" // Prevent browser's bright autocomplete backgrounds
                                className={`w-full py-3.5 bg-[#0B1120]/60 border text-sm text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:bg-[#0B1120]/90 transition-all shadow-inner [&-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#0B1120] [&-webkit-autofill]:-webkit-text-fill-color-white ${isRtl ? 'pr-11 pl-4 text-right' : 'pl-11 pr-11 text-left'} ${nameStatus === 'VALID' ? 'border-emerald-500/50 shadow-emerald-500/10 focus:border-emerald-500/80' : nameStatus === 'INVALID' && isNameTouched ? 'border-rose-500/50 shadow-rose-500/10 focus:border-rose-500/80 text-rose-100' : 'border-white/10 hover:border-white/20 focus:border-indigo-500/80'}`}
                            />
                            {nameStatus === 'VALID' && (
                                <div className={`absolute top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none animate-in fade-in zoom-in duration-300 ${isRtl ? 'left-4' : 'right-4'}`}>
                                    <Check className="w-4 h-4" strokeWidth={3} />
                                </div>
                            )}
                        </div>
                        {nameStatus === 'INVALID' && isNameTouched && (
                            <p className={`text-[11px] text-rose-400/90 pl-1 mt-1 animate-in slide-in-from-top-1 ${isRtl ? 'text-right pr-1' : ''}`}>
                                {t.nameError}
                            </p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                        <label className={`text-[13px] font-medium text-slate-300 ml-1 ${isRtl ? 'block text-right pr-1' : ''}`}>
                            {t.phoneLabel}
                        </label>
                        <div className="relative group">
                            <div className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors group-focus-within:text-indigo-400 ${isRtl ? 'right-4' : 'left-4'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <input
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={() => setIsPhoneTouched(true)}
                                placeholder={t.phonePlaceholder}
                                dir="ltr" /* Force LTR for numbers */
                                autoComplete="off" // Prevent browser's bright autocomplete backgrounds
                                className={`w-full py-3.5 bg-[#0B1120]/60 border text-sm text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:bg-[#0B1120]/90 transition-all shadow-inner [&-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#0B1120] [&-webkit-autofill]:-webkit-text-fill-color-white ${isRtl ? 'pr-11 pl-11 text-right' : 'pl-11 pr-11 text-left'} ${phoneStatus === 'VALID' ? 'border-emerald-500/50 shadow-emerald-500/10 focus:border-emerald-500/80' : phoneStatus === 'INVALID' && isPhoneTouched ? 'border-rose-500/50 shadow-rose-500/10 focus:border-rose-500/80 text-rose-100' : 'border-white/10 hover:border-white/20 focus:border-indigo-500/80'}`}
                            />
                            {phoneStatus === 'VALID' && (
                                <div className={`absolute top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none animate-in fade-in zoom-in duration-300 ${isRtl ? 'left-4' : 'right-4'}`}>
                                    <Check className="w-4 h-4" strokeWidth={3} />
                                </div>
                            )}
                        </div>
                        {phoneStatus === 'INVALID' && isPhoneTouched && (
                            <p className={`text-[11px] text-rose-400/90 pl-1 mt-1 animate-in slide-in-from-top-1 ${isRtl ? 'text-right pr-1' : ''}`}>
                                {t.phoneError}
                            </p>
                        )}
                    </div>

                    {/* University */}
                    <div className="space-y-2 relative z-50">
                        <label className={`text-[13px] font-medium text-slate-300 ml-1 ${isRtl ? 'block text-right pr-1' : ''}`}>
                            {t.uniLabel}
                        </label>
                        <SearchableSelect
                            value={formData.university}
                            onChange={(val) => setFormData(prev => ({ ...prev, university: val }))}
                            placeholder={t.selectUni}
                            isRtl={isRtl}
                            icon={<School className="w-4 h-4" />}
                            groups={[
                                { label: isRtl ? 'الجامعات الحكومية' : 'Government', options: universities.government },
                                { label: isRtl ? 'الجامعات الخاصة' : 'Private', options: universities.private },
                                { label: isRtl ? 'الجامعات الأهلية' : 'National', options: universities.national },
                                { label: isRtl ? 'أخرى' : 'Other', options: universities.supplementary }
                            ]}
                        />
                    </div>

                    {/* Faculty */}
                    <div className="space-y-2 relative z-40">
                        <label className={`text-[13px] font-medium text-slate-300 ml-1 ${isRtl ? 'block text-right pr-1' : ''}`}>
                            {t.facLabel}
                        </label>
                        <SearchableSelect
                            value={formData.faculty}
                            onChange={(val) => setFormData(prev => ({ ...prev, faculty: val }))}
                            placeholder={t.selectFac}
                            isRtl={isRtl}
                            icon={<School className="w-4 h-4" />}
                            groups={[
                                { label: isRtl ? 'الكليات المتاحة' : 'Available Faculties', options: faculties }
                            ]}
                        />
                    </div>

                    {/* Academic Year */}
                    <div className="space-y-2">
                        <label className={`text-[13px] font-medium text-slate-300 ml-1 ${isRtl ? 'block text-right pr-1' : ''}`}>
                            {t.yearLabel}
                        </label>
                        <div className="relative group">
                            <div className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors group-focus-within:text-indigo-400 ${isRtl ? 'right-4' : 'left-4'}`}>
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <select
                                name="academicYear"
                                value={formData.academicYear}
                                onChange={handleChange}
                                dir={isRtl ? 'rtl' : 'ltr'}
                                className={`w-full py-3.5 bg-[#0B1120]/60 border border-white/10 hover:border-white/20 text-sm text-white rounded-xl focus:outline-none focus:bg-[#0B1120]/90 focus:border-indigo-500/80 appearance-none cursor-pointer transition-all shadow-inner ${isRtl ? 'pr-11 pl-11 text-right' : 'pl-11 pr-11 text-left'}`}
                            >
                                <option value="" disabled className={`bg-slate-900 text-slate-500 ${isRtl ? 'text-right' : 'text-left'}`}>{t.selectYear}</option>
                                {ACADEMIC_YEARS.map(year => (
                                    <option key={year} value={year} className={`bg-slate-900 text-white ${isRtl ? 'text-right' : 'text-left'}`}>{year}</option>
                                ))}
                            </select>
                            <div className={`absolute top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none ${isRtl ? 'left-4' : 'right-4'}`}>
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                        <p className={`text-[11px] text-slate-500 pl-1 mt-1 ${isRtl ? 'text-right pr-1' : ''}`}>
                            {t.yearHelper}
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || nameStatus !== 'VALID' || !formData.university || !formData.faculty || !formData.academicYear}
                        className={`mt-4 w-full py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg ${isSubmitting || nameStatus !== 'VALID' || !formData.university || !formData.faculty || !formData.academicYear
                            ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                            : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-[1.01] border border-white/10'
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </span>
                        ) : t.button}
                    </button>

                    {error && <p className="text-center text-rose-400 text-xs mt-2 animate-pulse">{error}</p>}
                </form>

            </div>
        </div>
    );
}
