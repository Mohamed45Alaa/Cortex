'use client';

import { useStore } from '@/store/useStore';
import { Users, BarChart3, Settings, Activity, GraduationCap, Clock, AlertTriangle, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { StudentsTable } from './StudentsTable';
import { StudentInspector } from './StudentInspector';
import { SystemHealthView } from './SystemHealthView';

import { AdminMonitoringEngine } from '@/core/services/AdminMonitoringEngine';
import { AdminHeartbeatEngine } from '@/core/services/AdminHeartbeatEngine';
import { UserProfileWithMeta } from '@/core/types';

export const AdminLayout = () => {
    const { authState, selectedStudent, selectStudent, adminLiveMonitoring, setAdminMonitoring } = useStore();
    const [currentView, setCurrentView] = useState<'OVERVIEW' | 'STUDENTS' | 'SYSTEM'>('STUDENTS');
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Real-Time Dashboard State — NEVER wiped by effect cleanup
    const [dashboard, setDashboard] = useState({
        students: [] as UserProfileWithMeta[],
        total: 0,
        subscribed: 0,
        onlineCount: 0,
        stats: {
            onlineCount: 0,
            inSessionCount: 0,
            backgroundStudyingCount: 0,
            offlineRecentCount: 0,
            inactiveCount: 0
        }
    });

    // ── Effect 1: Student Monitoring (RTDB listeners + Firestore lazy-fetch) ──
    // Depends ONLY on adminLiveMonitoring.
    // ON  → engine.start() — reuses persistent cache, emits immediately.
    // OFF → engine.stop() — detaches listeners ONLY. Cache survives.
    // Students state is NEVER cleared here. Only logout can clear it.
    useEffect(() => {
        if (!adminLiveMonitoring) {
            console.log('[ADMIN] Monitoring DISABLED – listeners detached (cache preserved)');
            AdminMonitoringEngine.stop();
            return;
        }

        console.log('[ADMIN] Monitoring ENABLED – streams attached');
        AdminMonitoringEngine.start((data) => {
            // Guard: never overwrite with empty data
            if (data.students.length === 0 && dashboard.students.length > 0) {
                console.log('[ADMIN MONITOR] Prevented State Wipe — kept existing students');
                return;
            }
            setDashboard(data);
        });

        return () => {
            // Cleanup: stop listeners only — DO NOT wipe state
            AdminMonitoringEngine.stop();
        };
    }, [adminLiveMonitoring]);

    // ── Effect 2: Admin Heartbeat (writes to /adminPresence/{adminId}) ────────
    // Completely isolated from monitoring. Safe to restart on user ID hydration.
    useEffect(() => {
        const adminId = authState.user?.id;
        if (!adminLiveMonitoring || !adminId) {
            AdminHeartbeatEngine.stop();
            return;
        }
        const savedSpeed = AdminHeartbeatEngine.getSavedSpeed();
        AdminHeartbeatEngine.start(adminId, savedSpeed);
        return () => { AdminHeartbeatEngine.stop(); };
    }, [adminLiveMonitoring, authState.user?.id]);

    // Navigation Items
    const navItems = [
        { id: 'OVERVIEW', label: 'Overview', icon: Activity },
        { id: 'STUDENTS', label: 'Students', icon: Users },
        { id: 'SYSTEM', label: 'System Health', icon: BarChart3 },
    ];

    return (
        <div className="flex w-full h-screen bg-[#0B1120] text-white font-sans overflow-hidden">

            {/* 1. SIDEBAR (Glass) */}
            <aside className={`${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 border-r border-white/5 bg-slate-950/50 backdrop-blur-xl flex flex-col z-20 relative`}>

                {/* Collapse Toggle (Absolute, similar to GPT or standard dashboards) */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-20 bg-slate-800 border border-white/10 text-slate-400 rounded-full p-1 hover:text-white hover:bg-slate-700 transition-colors z-50 shadow-lg"
                >
                    {isCollapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
                </button>

                {/* Brand */}
                <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'px-6'} border-b border-white/5 transition-all`}>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                            <GraduationCap className="text-white w-5 h-5" />
                        </div>
                        {!isCollapsed && (
                            <h1 className="text-sm font-bold tracking-wide text-slate-100 whitespace-nowrap overflow-hidden">
                                ACADEMIC<span className="text-indigo-400">OS</span>
                            </h1>
                        )}
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-6 space-y-2">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentView(item.id as any)}
                            title={isCollapsed ? item.label : ''}
                            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'} py-3 rounded-lg text-sm font-medium transition-all duration-200 ${currentView === item.id
                                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={20} className="shrink-0" />
                            {!isCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                {/* User */}
                <div className="p-4 border-t border-white/5">
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-2 py-2 transition-all`}>
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                            {authState.user?.name?.charAt(0) || 'A'}
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-xs font-medium text-slate-200 truncate">Admin Console</span>
                                <span className="text-[10px] text-slate-500 font-mono truncate">v1.0.2 Stable</span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* 2. MAIN CONTENT */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#0B1120] relative">
                {/* Header */}
                <header className="h-16 border-b border-white/5 bg-slate-950/30 backdrop-blur-sm flex items-center justify-between px-8">
                    <h2 className="text-lg font-semibold text-white tracking-tight">
                        {navItems.find(n => n.id === currentView)?.label}
                    </h2>
                    <div className="flex items-center gap-4">

                        {/* LIVE MONITOR SWITCH */}
                        <button
                            onClick={() => setAdminMonitoring(!adminLiveMonitoring)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-2 ${adminLiveMonitoring
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                                }`}
                        >
                            <span className={`w-2 h-2 rounded-full ${adminLiveMonitoring ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`}></span>
                            {adminLiveMonitoring ? 'Live Monitoring ON' : 'Monitoring Disabled'}
                        </button>

                        {/* Summary Pill for convenience - Only show if ON */}
                        {adminLiveMonitoring && (
                            <div className="hidden md:flex items-center gap-4 px-3 py-1 bg-white/5 rounded-full border border-white/5 text-xs text-slate-400">
                                <span>Online: <strong className="text-emerald-400">{dashboard.onlineCount}</strong></span>
                                <span className="w-px h-3 bg-white/10"></span>
                                <span>Studying: <strong className="text-indigo-400">{dashboard.stats?.inSessionCount || 0}</strong></span>
                                <span className="w-px h-3 bg-white/10"></span>
                                <span>Inactive: <strong className="text-red-400">{dashboard.stats?.inactiveCount || 0}</strong></span>
                                <span className="w-px h-3 bg-white/10"></span>
                                <span>Total Web: <strong className="text-slate-200">{dashboard.total}</strong></span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Content View */}
                <div className="flex-1 p-8 overflow-hidden relative">
                    {!adminLiveMonitoring ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#0B1120]/90 backdrop-blur-sm">
                            <AlertTriangle size={48} className="text-amber-500/50 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Monitoring Disabled</h3>
                            <p className="text-slate-400 text-sm max-w-md text-center">
                                Live data streams are disabled to reduce database read costs.
                                <br />
                                Enable <strong>Live Monitoring</strong> in the header to view real-time student activity.
                            </p>
                        </div>
                    ) : null}

                    <div className={`h-full flex flex-col min-h-0 ${!adminLiveMonitoring ? 'opacity-20 pointer-events-none filter blur-sm' : ''}`}>
                        {currentView === 'STUDENTS' && (
                            <div className="flex flex-col gap-6 h-full">
                                <StudentsTable students={dashboard.students} />
                            </div>
                        )}

                        {currentView === 'OVERVIEW' && (
                            <div className="flex flex-col gap-8">
                                {/* 1. TOP STATS ROW */}
                                <div className="grid grid-cols-4 gap-6">
                                    {/* CARD 1: ONLINE */}
                                    <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-2 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Activity size={48} className="text-emerald-400" />
                                        </div>
                                        <span className="text-sm font-bold text-emerald-300">Online Now</span>
                                        <div className="text-4xl font-bold text-emerald-400 tracking-tight">{dashboard.stats?.onlineCount || 0}</div>
                                        <div className="text-xs text-emerald-300/80 font-medium">Live on Platform</div>
                                    </div>

                                    {/* CARD 2: STUDYING */}
                                    <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col gap-2 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Users size={48} className="text-indigo-400" />
                                        </div>
                                        <span className="text-sm font-bold text-indigo-300">Active Sessions</span>
                                        <div className="text-4xl font-bold text-indigo-400 tracking-tight">{dashboard.stats?.inSessionCount || 0}</div>
                                        <div className="text-xs text-indigo-300/80 font-medium">Focusing right now</div>
                                    </div>

                                    {/* CARD 3: OFFLINE (RECENT) */}
                                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 flex flex-col gap-2 relative overflow-hidden">
                                        <span className="text-sm font-medium text-slate-400">Offline (Recent)</span>
                                        <div className="text-4xl font-bold text-slate-300 tracking-tight">{dashboard.stats?.offlineRecentCount || 0}</div>
                                        <div className="text-xs text-slate-500">Active &lt; 7 days</div>
                                    </div>

                                    {/* CARD 4: INACTIVE */}
                                    <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 flex flex-col gap-2 relative overflow-hidden">
                                        <span className="text-sm font-bold text-red-400">Inactive</span>
                                        <div className="text-4xl font-bold text-red-500 tracking-tight">{dashboard.stats?.inactiveCount || 0}</div>
                                        <div className="text-xs text-red-400/80">&gt; 7 Days Absent</div>
                                    </div>
                                </div>

                                {/* 2. SECONDARY STATS (Total/Subscribed) */}
                                <div className="grid grid-cols-2 gap-6 w-1/2">
                                    <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-slate-500">Total Registered</div>
                                            <div className="text-2xl font-bold text-white">{dashboard.total}</div>
                                        </div>
                                        <Users size={24} className="text-slate-600" />
                                    </div>
                                    <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-slate-500">Premium Members</div>
                                            <div className="text-2xl font-bold text-amber-400">{dashboard.subscribed}</div>
                                        </div>
                                        <GraduationCap size={24} className="text-amber-500/50" />
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentView === 'SYSTEM' && (
                            <SystemHealthView />
                        )}
                    </div>
                </div>
            </main>

            {/* 3. SLIDE-OVER INSPECTOR */}
            <StudentInspector
                student={selectedStudent}
                onClose={() => selectStudent(null)}
            />

        </div>
    );
};

