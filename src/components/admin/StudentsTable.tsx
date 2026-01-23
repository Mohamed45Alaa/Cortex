'use client';

import { UserProfileWithMeta } from '@/core/types';
import { Search, Filter, MoreHorizontal, User, Monitor, MousePointer2, Clock, AlertTriangle, Maximize2, Minimize2 } from 'lucide-react';
import { useState, Fragment } from 'react';
import { useStore } from '@/store/useStore'; // Keep for Error State/Actions

interface Props {
    students: UserProfileWithMeta[];
}

export const StudentsTable = ({ students }: Props) => {
    const { selectStudent, adminError } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Filter Logic
    const filteredStudents = students.filter(student =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`w-full flex flex-col flex-1 min-h-0 transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#0B1120] p-6' : ''}`}>
            {/* TOOLBAR */}
            <div className="flex items-center justify-between mb-4">
                <div className="relative w-72 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-1.5 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-900 transition-all"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-white/5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                        {isFullscreen ? 'Exit' : 'Fullscreen'}
                    </button>
                    <div className="h-4 w-px bg-white/10 mx-2"></div>
                    <span className="text-xs text-slate-500 font-mono">
                        {students.length} Total
                    </span>
                </div>
            </div>

            {/* TABLE CONTAINER - NATIVE */}
            <div className="flex-1 min-h-0">
                <div className="overflow-x-auto overflow-y-auto h-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-6">
                    <table className="w-full text-left text-sm border-separate border-spacing-y-2">

                        {/* HEADER */}
                        {/* HEADER */}
                        {/* HEADER - BAR 1 */}
                        <thead className="sticky top-0 z-30 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-300 shadow-sm">
                            <tr>
                                <th className="px-6 py-4 bg-slate-900 border-y border-l border-white/10 first:rounded-l-[14px] border-r-0 text-left">Student</th>
                                <th className="px-6 py-4 bg-slate-900 border-y border-white/10 text-center border-l-0 border-r-0">Status</th>
                                <th className="px-6 py-4 bg-slate-900 border-y border-white/10 text-center border-l-0 border-r-0">Study State</th>
                                <th className="px-6 py-4 bg-slate-900 border-y border-white/10 text-center border-l-0 border-r-0">Joined</th>
                                <th className="px-6 py-4 bg-slate-900 border-y border-r border-white/10 text-center last:rounded-r-[14px] border-l-0">Actions</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody className="">
                            {adminError ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-red-500">
                                        Error: {adminError}
                                    </td>
                                </tr>
                            ) : filteredStudents.length > 0 ? (
                                (() => {
                                    // Grouping Logic (Strict 7-Tier)
                                    const groups: Record<number, any[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
                                    filteredStudents.forEach(s => {
                                        const rank = (s as any).sortRank || 7;
                                        if (!groups[rank]) groups[rank] = [];
                                        groups[rank].push(s);
                                    });

                                    const labels: Record<number, string> = {
                                        1: 'Online & In Session',
                                        2: 'Online (No Session)',
                                        3: 'Background (In Session)',
                                        4: 'Background (No Session)',
                                        5: 'Offline (In Session)', // PURPLE
                                        6: 'Offline (Recent)',
                                        7: 'Inactive (>7 Days)'
                                    };

                                    return Object.keys(groups).sort().map(rankKey => {
                                        const rank = parseInt(rankKey);
                                        const studentsInGroup = groups[rank];

                                        if (studentsInGroup.length === 0 && rank !== 7) return null;

                                        return (
                                            <Fragment key={`group-${rank}`}>
                                                {/* SECTION HEADER */}
                                                <tr key={`header-${rank}`} className="sticky top-[47px] z-20">
                                                    <td colSpan={5} className="py-0">
                                                        <div className="bg-[#0B1120] py-2">
                                                            {(() => {
                                                                const glowMap: Record<number, string> = {
                                                                    1: 'shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)] border-emerald-500/10', // Green
                                                                    2: 'shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)] border-emerald-500/10', // Green
                                                                    3: 'shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)] border-blue-500/10',    // Blue
                                                                    4: 'shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)] border-blue-500/10',    // Blue
                                                                    5: 'shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] border-purple-500/20',  // PURPLE
                                                                    6: 'shadow-[0_0_20px_-5px_rgba(148,163,184,0.1)] border-white/5',       // Gray
                                                                    7: 'shadow-[0_0_20px_-5px_rgba(239,68,68,0.2)] border-red-500/10'       // Red (Inactive)
                                                                };

                                                                const dotStyles: Record<number, string> = {
                                                                    1: 'from-emerald-300 to-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.4)]',
                                                                    2: 'from-emerald-300 to-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.4)]',
                                                                    3: 'from-blue-300 to-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.4)]',
                                                                    4: 'from-blue-300 to-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.4)]',
                                                                    5: 'from-purple-300 to-purple-600 shadow-[0_0_8px_rgba(139,92,246,0.5)]',
                                                                    6: 'from-slate-400 to-slate-700 shadow-[0_0_8px_rgba(148,163,184,0.2)]',
                                                                    7: 'from-red-300 to-red-600 shadow-[0_0_8px_rgba(239,68,68,0.4)]' // Red
                                                                };

                                                                return (
                                                                    <div className={`inline-flex items-center gap-3 px-5 py-2 bg-slate-900/90 border rounded-full backdrop-blur-md transition-all duration-500 ${glowMap[rank] || 'border-white/5'}`}>
                                                                        {/* 3D DOT ICON */}
                                                                        <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-b shadow-sm ${dotStyles[rank]} ring-1 ring-white/20`} />

                                                                        <span className="text-[11px] font-bold text-slate-200 uppercase tracking-widest">
                                                                            {labels[rank]}
                                                                        </span>
                                                                        <span className="text-[10px] font-mono text-slate-500">({studentsInGroup.length})</span>
                                                                    </div>
                                                                );
                                                            })()}
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* EMPTY STATE FOR INACTIVE GROUP */}
                                                {rank === 6 && studentsInGroup.length === 0 && (
                                                    <tr className="bg-slate-900/30">
                                                        <td colSpan={5} className="px-6 py-4 text-xs text-slate-500 italic text-center">
                                                            No inactive students
                                                        </td>
                                                    </tr>
                                                )}

                                                {/* ROWS */}
                                                {studentsInGroup.map((student) => {
                                                    const presence = (student as any).presence || { status: 'offline' };
                                                    const study = (student as any).study || { mode: 'none' };
                                                    const isOnline = presence.status === 'online' || presence.status === 'background';

                                                    return (
                                                        <tr
                                                            key={student.id}
                                                            className="group relative cursor-pointer hover:scale-[1.002] transition-transform duration-200"
                                                            onClick={() => selectStudent(student)}
                                                        >


                                                            <td className="px-6 py-4 bg-[#0f1523] first:rounded-l-[16px] last:rounded-r-[16px] border-y border-white/[0.04] first:border-l last:border-r group-hover:bg-[#151b2b] group-hover:border-white/[0.08] transition-colors">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="relative shrink-0">
                                                                        <div className="w-[42px] h-[42px] rounded-full bg-slate-800 shadow-inner ring-1 ring-white/10 flex items-center justify-center text-sm font-bold text-slate-400">
                                                                            {(student.fullName || student.email || '?').charAt(0).toUpperCase()}
                                                                        </div>
                                                                        {/* AVATAR STATUS DOT */}
                                                                        {(() => {
                                                                            // STRICT PRESENCE DOT COLOR (From AdminMetricsService)
                                                                            // Values: 'green' | 'blue' | 'red' | 'gray'
                                                                            const color = (student as any).dotColor || 'gray';
                                                                            let dotClass = 'bg-slate-500 shadow-sm';

                                                                            if (color === 'green') dotClass = 'bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.6)] ring-2 ring-[#0B1120]';       // Online
                                                                            else if (color === 'blue') dotClass = 'bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.6)] ring-2 ring-[#0B1120]';  // Background
                                                                            else if (color === 'purple') dotClass = 'bg-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.6)] ring-2 ring-[#0B1120]'; // Offline In Session
                                                                            else if (color === 'red') dotClass = 'bg-[#ef4444] shadow-[0_0_10px_rgba(239,68,68,0.6)] ring-2 ring-[#0B1120]';   // Inactive
                                                                            else dotClass = 'bg-slate-500 border-2 border-[#0B1120]';                                                       // Offline/Gray

                                                                            return (
                                                                                <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ${dotClass}`}></div>
                                                                            );
                                                                        })()}
                                                                    </div>
                                                                    <div className="flex flex-col justify-center">
                                                                        {student.fullName ? (
                                                                            <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                                                                                {student.fullName}
                                                                            </span>
                                                                        ) : (
                                                                            <span className="text-xs font-semibold text-amber-500 flex items-center gap-1.5 animate-pulse">
                                                                                <AlertTriangle size={12} /> Profile Incomplete
                                                                            </span>
                                                                        )}
                                                                        <span className="text-[11px] text-slate-500 group-hover:text-slate-400 font-mono mt-0.5 truncate max-w-[180px]">
                                                                            {student.email}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            {/* COL 1: PRESENCE */}
                                                            <td className="px-6 py-4 text-center bg-[#0f1523] first:rounded-l-[16px] last:rounded-r-[16px] border-y border-white/[0.04] first:border-l last:border-r group-hover:bg-[#151b2b] group-hover:border-white/[0.08] transition-colors">
                                                                {(() => {
                                                                    switch (presence.status) {
                                                                        case 'online':
                                                                            return (
                                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#1e293b] text-emerald-400 border border-emerald-500/20 shadow-sm">
                                                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]"></div> Online
                                                                                </span>
                                                                            );
                                                                        case 'background':
                                                                            return (
                                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#1e293b] text-blue-400 border border-blue-500/20 shadow-sm">
                                                                                    <AlertTriangle size={12} strokeWidth={2.5} /> Background
                                                                                </span>
                                                                            );
                                                                        default:
                                                                            const seenText = (student as any).lastSeenText ? ` • ${(student as any).lastSeenText}` : '';
                                                                            return (
                                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#1e293b] text-slate-500 border border-white/[0.05]">
                                                                                    Offline{seenText}
                                                                                </span>
                                                                            );
                                                                    }
                                                                })()}
                                                            </td>

                                                            {/* COL 2: STUDY STATE */}
                                                            {/* COL 2: STUDY STATE */}
                                                            <td className="px-6 py-4 text-center bg-[#0f1523] first:rounded-l-[16px] last:rounded-r-[16px] border-y border-white/[0.04] first:border-l last:border-r group-hover:bg-[#151b2b] group-hover:border-white/[0.08] transition-colors">
                                                                {(() => {
                                                                    // STRICT RULE: "No Session" vs "In Session"
                                                                    // Logic comes purely from study.mode ('in_session' | 'no_session')

                                                                    if (study.mode === 'in_session') {
                                                                        // Check for Zombie/Expired Sessions (>12h)
                                                                        const startTime = (study as any).startTime || (presence as any).lastSeen || (presence as any).lastSeenAt;
                                                                        if (startTime) {
                                                                            const diff = Date.now() - new Date(startTime).getTime();
                                                                            const hours = diff / (1000 * 60 * 60);
                                                                            if (hours > 12) {
                                                                                return (
                                                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#1e293b] text-red-400 border border-red-500/20 shadow-sm animate-pulse">
                                                                                        <AlertTriangle size={12} strokeWidth={2.5} /> Expired ({Math.floor(hours)}h)
                                                                                    </span>
                                                                                );
                                                                            }
                                                                        }
                                                                        return (
                                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#1e293b] text-indigo-300 border border-indigo-500/20 shadow-sm shadow-indigo-500/10">
                                                                                <Clock size={12} strokeWidth={2.5} /> In Session
                                                                            </span>
                                                                        );
                                                                    }

                                                                    // FALLBACK: No Session (Explicitly Empty per Rule 1)
                                                                    // "Study State = EMPTY (no text, no badge)"
                                                                    return null;
                                                                })()}
                                                            </td>
                                                            <td className="px-6 py-4 text-center bg-[#0f1523] first:rounded-l-[16px] last:rounded-r-[16px] border-y border-white/[0.04] first:border-l last:border-r group-hover:bg-[#151b2b] group-hover:border-white/[0.08] transition-colors text-slate-500 font-mono text-xs" suppressHydrationWarning>
                                                                {student.createdAt ? new Date(student.createdAt).toISOString().split('T')[0] : "-"}
                                                            </td>
                                                            <td className="px-6 py-4 text-center bg-[#0f1523] first:rounded-l-[16px] last:rounded-r-[16px] border-y border-white/[0.04] first:border-l last:border-r group-hover:bg-[#151b2b] group-hover:border-white/[0.08] transition-colors rounded-r-[16px]">
                                                                <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
                                                                    <MoreHorizontal size={18} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </Fragment>
                                        );
                                    });
                                })()
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="p-3 rounded-full bg-slate-900/50 border border-white/5">
                                                <User className="opacity-20" size={24} />
                                            </div>
                                            <p>No students found matching your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

