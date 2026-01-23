'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { FirestoreService } from '@/core/services/FirestoreService';
import { ACADEMIC_YEARS } from '@/config/admin';
import { User, BookOpen, Check, ChevronDown, GraduationCap } from 'lucide-react';

export default function CompleteProfileView() {
    const { authState } = useStore();

    const [fullName, setFullName] = useState('');
    const [academicYear, setAcademicYear] = useState(ACADEMIC_YEARS[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // SAFETY GUARD: Show if not completed OR if fullName is missing (Migration Case)
    // Only hide if BOTH completed=true AND fullName exists.
    if (authState.user?.completed && authState.user?.fullName) {
        return null;
    }
    const [language, setLanguage] = useState<'en' | 'ar'>('en');
    const [nameStatus, setNameStatus] = useState<'IDLE' | 'VALID' | 'INVALID'>('IDLE');
    const [errorMessage, setErrorMessage] = useState('');

    const validateName = (name: string) => {
        const trimmed = name.trim();
        const parts = trimmed.split(/\s+/);
        const isValid = parts.length >= 3;
        const hasInvalidChars = /[0-9!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`]/.test(trimmed);
        if (hasInvalidChars) return { valid: false };
        return { valid: isValid };
    };

    useEffect(() => {
        if (!fullName) {
            setNameStatus('IDLE');
            return;
        }
        const check = validateName(fullName);
        if (check.valid) {
            setNameStatus('VALID');
        } else {
            if (fullName.length > 5) setNameStatus('INVALID');
            else setNameStatus('IDLE');
        }
    }, [fullName]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const check = validateName(fullName);
        if (!check.valid) {
            setNameStatus('INVALID');
            return;
        }

        setIsSubmitting(true);
        try {
            if (!authState.user?.id) throw new Error("No User ID");

            // Dynamic Import for Sentinel to avoid SSR issues if any, or just strictly Client side
            const { serverTimestamp } = await import('firebase/firestore');

            const updates = {
                fullName: fullName.trim(),
                academicYear,
                completed: true,
                completedAt: serverTimestamp(),
                updatedAt: serverTimestamp() // Consistency
            };

            await FirestoreService.saveUserProfile(authState.user.id, updates);

            const currentUser = authState.user;
            if (currentUser) {
                useStore.setState(state => ({
                    authState: {
                        ...state.authState,
                        status: 'AUTHENTICATED',
                        user: { ...currentUser, ...updates }
                    }
                }));
            }

        } catch (err) {
            console.error(err);
            setErrorMessage(language === 'en' ? "Connection Error" : "خطأ في الاتصال");
            setIsSubmitting(false);
        }
    };

    const t = {
        title: language === 'en' ? "Academic Profile" : "الملف الأكاديمي",
        subtitle: language === 'en' ? "Contextual calibration" : "المعايرة السياقية",
        welcome: language === 'en' ? "Welcome, Doctor" : "أهلاً بك يا دكتور",
        nameLabel: language === 'en' ? "Full Name" : "الاسم الكامل",
        namePlaceholder: language === 'en' ? "Mohamed Ahmed Mahmoud" : "محمد أحمد محمود",
        yearLabel: language === 'en' ? "Current Academic Year" : "السنة الدراسية الحالية",
        yearHelper: language === 'en' ? "You can change this later from your profile settings." : "يمكنك تغيير هذا لاحقًا من الإعدادات.",
        button: language === 'en' ? "Initialize System" : "بدء النظام",
    };

    const isRtl = language === 'ar';

    return (
        <div className="fixed inset-0 z-[999999] bg-[#020617] flex items-center justify-center font-sans overflow-hidden">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
            </div>

            <div className="relative w-full max-w-[480px] mx-4 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col items-center overflow-hidden">

                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-10">
                    <button onClick={() => setLanguage('en')} className={`text-[11px] font-bold tracking-wider ${!isRtl ? 'text-white' : 'text-slate-500'}`}>EN</button>
                    <div className="w-[1px] h-3 bg-white/20" />
                    <button onClick={() => setLanguage('ar')} className={`text-[11px] font-bold tracking-wider ${isRtl ? 'text-white' : 'text-slate-500'}`}>AR</button>
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

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6" dir={isRtl ? 'rtl' : 'ltr'}>

                    <div className="space-y-2">
                        <label className="text-[13px] font-medium text-slate-300 ml-1">
                            {t.nameLabel}
                        </label>
                        <div className="relative group">
                            <div className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors group-focus-within:text-indigo-400 ${isRtl ? 'right-4' : 'left-4'}`}>
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder={t.namePlaceholder}
                                className={`w-full py-3.5 bg-[#0B1120]/60 border text-sm text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:bg-[#0B1120]/90 focus:border-indigo-500/80 transition-all shadow-inner ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-11'} ${nameStatus === 'VALID' ? 'border-emerald-500/50 shadow-emerald-500/10' : 'border-white/10 hover:border-white/20'}`}
                            />
                            {nameStatus === 'VALID' && (
                                <div className={`absolute top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none animate-in fade-in zoom-in duration-300 ${isRtl ? 'left-4' : 'right-4'}`}>
                                    <Check className="w-4 h-4" strokeWidth={3} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[13px] font-medium text-slate-300 ml-1">
                            {t.yearLabel}
                        </label>
                        <div className="relative group">
                            <div className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors group-focus-within:text-indigo-400 ${isRtl ? 'right-4' : 'left-4'}`}>
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <select
                                value={academicYear}
                                onChange={(e) => setAcademicYear(e.target.value as any)}
                                className={`w-full py-3.5 bg-[#0B1120]/60 border border-white/10 hover:border-white/20 text-sm text-white rounded-xl focus:outline-none focus:bg-[#0B1120]/90 focus:border-indigo-500/80 appearance-none cursor-pointer transition-all shadow-inner ${isRtl ? 'pr-11 pl-11' : 'pl-11 pr-11'}`}
                            >
                                {ACADEMIC_YEARS.map(year => (
                                    <option key={year} value={year} className="bg-slate-900 text-white">{year}</option>
                                ))}
                            </select>
                            <div className={`absolute top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none ${isRtl ? 'left-4' : 'right-4'}`}>
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-500 pl-1">
                            {t.yearHelper}
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || nameStatus !== 'VALID'}
                        className={`mt-2 w-full py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg ${isSubmitting || nameStatus !== 'VALID'
                            ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                            : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-[1.01] border border-white/10'
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Initializing...
                            </span>
                        ) : t.button}
                    </button>

                    {errorMessage && <p className="text-center text-rose-400 text-xs mt-2 animate-pulse">{errorMessage}</p>}
                </form>

            </div>
        </div>
    );
}
