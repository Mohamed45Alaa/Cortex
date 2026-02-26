'use client';
import React, { useState } from 'react';
import { ToolConfig } from './tools.config';
import { LocalMediaPlayer } from './LocalMediaPlayer';
import { X, ExternalLink, Timer, Lock, Mic, BookOpen, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useStore } from '@/store/useStore';

interface ToolsOverlayProps {
    tool: ToolConfig;
    onClose: () => void;
}

// ─── RECORDER: Lecture Picker ─────────────────────────────────────────────────
// Shown when user opens the "مسجل الصوت" tool.
// Student picks a lecture → ToolsOverlay switches to PLAYER, with that lecture's
// name pre-filled in the player header for context.
const RecorderLecturePicker: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { lectures, subjects, setActiveTool } = useStore();
    const [search, setSearch] = useState('');
    const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

    // Build flat lecture list enriched with subject name
    const enriched = lectures.map(l => ({
        ...l,
        subjectName: subjects.find(s => s.id === l.subjectId)?.name || l.subjectId,
    }));

    // Filter by subject tab + search text
    const filtered = enriched.filter(l => {
        const matchSub = !selectedSubjectId || l.subjectId === selectedSubjectId;
        const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase());
        return matchSub && matchSearch;
    });

    const handlePickLecture = (lectureId: string, lectureTitle: string) => {
        // Store the pending lecture in sessionStorage so LocalMediaPlayer can read it
        sessionStorage.setItem('pendingPlayerLecture', JSON.stringify({ lectureId, lectureTitle }));
        // Switch overlay to player
        setActiveTool('player');
    };

    return (
        <div className="flex flex-col h-full min-h-[400px]" dir="rtl">
            {/* Instruction */}
            <div className="px-6 pt-5 pb-3">
                <p className="text-slate-300 text-sm leading-relaxed">
                    اختر المحاضرة اللي عندك تسجيل عليها — هيتفتح المشغّل المحلي تلقائيًا عشان تختار الملف.
                </p>
            </div>

            {/* Search */}
            <div className="px-6 pb-3">
                <input
                    type="text"
                    placeholder="ابحث عن محاضرة..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
            </div>

            {/* Subject tabs */}
            {subjects.length > 0 && (
                <div className="px-6 pb-3 flex gap-2 overflow-x-auto scrollbar-none">
                    <button
                        onClick={() => setSelectedSubjectId(null)}
                        className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${!selectedSubjectId ? 'bg-rose-600 border-rose-500 text-white' : 'border-white/10 text-slate-400 hover:text-white'}`}
                    >
                        الكل
                    </button>
                    {subjects.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setSelectedSubjectId(prev => prev === s.id ? null : s.id)}
                            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${selectedSubjectId === s.id ? 'bg-rose-600 border-rose-500 text-white' : 'border-white/10 text-slate-400 hover:text-white'}`}
                        >
                            {s.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Lecture list */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
                {filtered.length === 0 && (
                    <div className="text-center text-slate-500 text-sm pt-12">
                        <BookOpen className="mx-auto mb-2 opacity-30" size={32} />
                        مفيش محاضرات مطابقة
                    </div>
                )}
                {filtered.map(l => (
                    <button
                        key={l.id}
                        onClick={() => handlePickLecture(l.id, l.title)}
                        className="w-full flex items-center justify-between gap-3 bg-slate-800/60 hover:bg-slate-700/70 border border-white/5 hover:border-rose-500/40 rounded-xl px-4 py-3 text-right transition-all group"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="shrink-0 w-8 h-8 rounded-lg bg-rose-900/40 flex items-center justify-center">
                                <Mic size={15} className="text-rose-400" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-white truncate">{l.title}</p>
                                <p className="text-xs text-slate-400 truncate">{l.subjectName}</p>
                            </div>
                        </div>
                        <ChevronRight size={16} className="shrink-0 text-slate-500 group-hover:text-rose-400 transition-colors rotate-180" />
                    </button>
                ))}
            </div>
        </div>
    );
};

// ─── MAIN OVERLAY ─────────────────────────────────────────────────────────────
export const ToolsOverlay: React.FC<ToolsOverlayProps> = ({ tool, onClose }) => {

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleLaunch = () => {
        if (tool.url) {
            window.open(tool.url, '_blank', 'noopener,noreferrer,width=1200,height=800');
        }
    };

    const isPlayer = tool.componentKey === 'PLAYER';
    const isRecorder = tool.componentKey === 'RECORDER';

    return (
        <div
            className="fixed inset-0 z-[500] flex items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div className={`bg-slate-900 md:rounded-2xl w-full ${isPlayer ? 'max-w-6xl' : 'max-w-2xl'} h-full md:h-auto md:max-h-[85vh] flex flex-col shadow-2xl border-none md:border md:border-white/10 animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 overflow-hidden`}>

                {/* Header */}
                <div className="flex items-center justify-between p-4 px-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-sm z-10 shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-slate-800 ${tool.color}`}>
                            <tool.icon size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-100 leading-none">{tool.title}</h3>
                            <span className="text-xs text-slate-500 font-mono uppercase">SECURE ENVIRONMENT</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-slate-950/30 relative">
                    {isPlayer ? (
                        <div className="h-[600px] w-full p-4 md:p-6">
                            <LocalMediaPlayer isOpen={true} onClose={() => { }} />
                        </div>
                    ) : isRecorder ? (
                        <RecorderLecturePicker onClose={onClose} />
                    ) : (
                        /* LAUNCHER SHELL */
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                            <div className="flex flex-col items-center mb-8">
                                <div className="p-8 rounded-full bg-slate-800/30 ring-1 ring-white/5 shadow-2xl mb-6 relative">
                                    {tool.customIcon ? (
                                        <div className="relative w-20 h-20">
                                            <Image
                                                src={tool.customIcon}
                                                alt={tool.title}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <tool.icon size={64} className="text-slate-500" />
                                    )}
                                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1.5 border-4 border-slate-900">
                                        <Lock size={14} className="text-slate-900" strokeWidth={3} />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">{tool.title}</h2>
                                <p className="text-slate-400 max-w-sm text-base leading-relaxed">
                                    {tool.description}
                                </p>
                            </div>

                            <button
                                onClick={handleLaunch}
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-indigo-500/20 flex items-center space-x-3 group"
                            >
                                <span>{tool.actionLabel}</span>
                                <ExternalLink size={20} className="opacity-70 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="mt-4 text-xs text-slate-500 opacity-80">
                                External tool will open in a new tab. This overlay will remain active.
                            </p>

                            <div className="mt-8 flex items-center space-x-2 text-slate-500 text-xs bg-slate-900/50 px-4 py-2 rounded-full border border-white/5">
                                <Timer size={14} className="text-emerald-500 animate-pulse" />
                                <span>Session timer continues running in background</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
