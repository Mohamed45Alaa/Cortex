'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { formatCognitiveLoad } from '@/core/utils/formatting';
import { X, BrainCircuit, Activity } from 'lucide-react';
import { StudySession } from '@/core/types';

interface CognitiveLoadHistoryModalProps {
    onClose: () => void;
}

export const CognitiveLoadHistoryModal: React.FC<CognitiveLoadHistoryModalProps> = ({ onClose }) => {
    const { sessions, subjects, lectures } = useStore();

    // Get the last 5 completed sessions with valid cognitive cost
    const last5Sessions = [...sessions]
        .filter(s => s.status === 'COMPLETED' && s.isValidForMetrics === true)
        .sort((a, b) => new Date(b.endTime || 0).getTime() - new Date(a.endTime || 0).getTime())
        .slice(0, 5);

    const getGradeColor = (grade: string | undefined) => {
        if (!grade) return 'text-slate-400';
        if (grade.startsWith('A')) return 'text-emerald-400';
        if (grade.startsWith('B')) return 'text-blue-400';
        if (grade.startsWith('C')) return 'text-amber-400';
        return 'text-red-400';
    };

    const formatDate = (val: string | number) => {
        const date = new Date(val);
        return date.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const getEntityName = (session: StudySession) => {
        const lecture = lectures.find(l => l.id === session.lectureId);
        const subject = subjects.find(s => s.id === session.subjectId);

        if (lecture) return lecture.title;
        if (subject) return subject.name;
        return 'جلسة غير محددة';
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} dir="rtl">
            <div
                className="bg-[#0f1523] border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <BrainCircuit className="text-indigo-400 w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white font-[MadaniArabic-Bold]">تاريخ الحمل المعرفي</h2>
                            <p className="text-xs text-slate-400">آخر 5 جلسات مكتملة على المنصة</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                    {/* Last 5 Sessions Table */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                            <Activity size={16} className="text-amber-400" />
                            السجل المعرفي (أحدث 5 جلسات)
                        </h3>

                        {last5Sessions.length === 0 ? (
                            <div className="text-center py-8 text-slate-500 text-sm bg-slate-800/30 rounded-xl border border-slate-700/30">
                                لم يتم الانتهاء من أي جلسات صالحة للتقييم بعد.
                            </div>
                        ) : (
                            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                                <table className="w-full text-sm text-right">
                                    <thead className="bg-slate-800/80 text-slate-400 text-xs uppercase">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">التاريخ</th>
                                            <th className="px-4 py-3 font-medium">المحاضرة / الهدف</th>
                                            <th className="px-4 py-3 font-medium text-center">المدة</th>
                                            <th className="px-4 py-3 font-medium text-center">الحمل المعرفي</th>
                                            <th className="px-4 py-3 font-medium text-center">التقدير</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50 border-t border-slate-700/50 tracking-wide text-slate-300">
                                        {last5Sessions.map((session, idx) => (
                                            <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                                                <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-400/80" dir="ltr">
                                                    {formatDate(session.endTime || session.date)}
                                                </td>
                                                <td className="px-4 py-3 font-[MadaniArabic-Medium]">
                                                    {getEntityName(session)}
                                                </td>
                                                <td className="px-4 py-3 text-center" dir="ltr">
                                                    {session.actualDuration}m
                                                </td>
                                                <td className="px-4 py-3 text-center font-mono font-bold text-indigo-300">
                                                    {formatCognitiveLoad(session.cognitiveCost)}
                                                </td>
                                                <td className={`px-4 py-3 text-center font-bold ${getGradeColor(session.performanceGrade)}`}>
                                                    {session.performanceGrade || '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Breakdown of Grading Scale */}
                    <div className="pt-4 border-t border-slate-700/50">
                        <h3 className="text-sm font-semibold text-slate-300 mb-3">دليل التقديرات المعرفية</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <div className="bg-slate-800/40 p-3 rounded-lg flex justify-between items-center border border-emerald-500/10">
                                <span className="font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">A+</span>
                                <span className="text-xs font-mono text-emerald-200" dir="ltr">9.0 - 10.0</span>
                            </div>
                            <div className="bg-slate-800/40 p-3 rounded-lg flex justify-between items-center border border-emerald-400/10">
                                <span className="font-bold text-emerald-300">A</span>
                                <span className="text-xs font-mono text-emerald-200/80" dir="ltr">7.5 - 8.9</span>
                            </div>

                            <div className="bg-slate-800/40 p-3 rounded-lg flex justify-between items-center border border-blue-400/10">
                                <span className="font-bold text-blue-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">B+</span>
                                <span className="text-xs font-mono text-blue-200" dir="ltr">6.0 - 7.4</span>
                            </div>
                            <div className="bg-slate-800/40 p-3 rounded-lg flex justify-between items-center border border-blue-300/10">
                                <span className="font-bold text-blue-200">B</span>
                                <span className="text-xs font-mono text-blue-200/80" dir="ltr">5.0 - 5.9</span>
                            </div>

                            <div className="bg-slate-800/40 p-3 rounded-lg flex justify-between items-center border border-amber-400/10">
                                <span className="font-bold text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">C+</span>
                                <span className="text-xs font-mono text-amber-200" dir="ltr">4.0 - 4.9</span>
                            </div>
                            <div className="bg-slate-800/40 p-3 rounded-lg flex justify-between items-center border border-amber-300/10">
                                <span className="font-bold text-amber-300">C</span>
                                <span className="text-xs font-mono text-amber-200/80" dir="ltr">3.0 - 3.9</span>
                            </div>

                            <div className="bg-slate-800/40 p-3 rounded-lg col-span-2 md:col-span-3 flex justify-between items-center border border-red-500/10 mt-1">
                                <span className="font-bold text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]">D (فشل معرفي)</span>
                                <span className="text-xs font-mono text-red-300" dir="ltr">&lt; 3.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
