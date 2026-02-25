'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
    Activity, Users, Clock, TrendingUp, TrendingDown, Minus,
    BarChart3, Building2, Zap, RefreshCw, AlertTriangle, CheckCircle,
    BookOpen, Brain
} from 'lucide-react';
import {
    SystemHealthService,
    PlatformOverview,
    UsageTrendPoint,
    PeakHourPoint,
    UniversityStats,
    ImprovementTrend,
} from '@/core/services/SystemHealthService';
import { AdminHeartbeatEngine, ADMIN_SPEED_OPTIONS, AdminSpeedOption } from '@/core/services/AdminHeartbeatEngine';


// ─── MINI BAR CHART ─────────────────────────────────────────────────────────
const MiniBarChart: React.FC<{ data: UsageTrendPoint[]; color: string }> = ({ data, color }) => {
    const max = Math.max(...data.map(d => d.sessions), 1);
    return (
        <div className="flex items-end gap-0.5 h-14 w-full">
            {data.map((point, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                        className={`w-full rounded-sm ${color} transition-all duration-300`}
                        style={{ height: `${Math.max(2, (point.sessions / max) * 100)}%` }}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white whitespace-nowrap shadow-xl">
                        {point.label}: {point.sessions} جلسة
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─── PEAK HOUR ROW ───────────────────────────────────────────────────────────
const PeakHourRow: React.FC<{ point: PeakHourPoint; isTopHour: boolean }> = ({ point, isTopHour }) => (
    <div className="flex items-center gap-3">
        <span className="text-[11px] text-slate-400 w-12 text-right font-mono">{point.label}</span>
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
                className={`h-full rounded-full transition-all duration-500 ${isTopHour ? 'bg-amber-400' : 'bg-indigo-500/60'}`}
                style={{ width: `${point.percentage}%` }}
            />
        </div>
        <span className="text-[11px] text-slate-500 w-8 font-mono">{point.sessions}</span>
    </div>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export const SystemHealthView: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

    const [overview, setOverview] = useState<PlatformOverview | null>(null);
    const [usageTrend, setUsageTrend] = useState<UsageTrendPoint[]>([]);
    const [trendRange, setTrendRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
    const [peakHours, setPeakHours] = useState<PeakHourPoint[]>([]);
    const [improvement, setImprovement] = useState<ImprovementTrend | null>(null);
    const [universities, setUniversities] = useState<UniversityStats[]>([]);

    const [currentSpeed, setCurrentSpeed] = useState<AdminSpeedOption>(
        AdminHeartbeatEngine.getSavedSpeed()
    );

    // ── Load all data ───────────────────────────────────────────────────────
    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [ov, trend, peaks, imp, unis] = await Promise.all([
                SystemHealthService.getPlatformOverview(),
                SystemHealthService.getUsageTrend(trendRange),
                SystemHealthService.getPeakHours(),
                SystemHealthService.getImprovementTrend(),
                SystemHealthService.getUniversityBreakdown(),
            ]);
            setOverview(ov);
            setUsageTrend(trend);
            setPeakHours(peaks);
            setImprovement(imp);
            setUniversities(unis);
            setLastRefreshed(new Date());
        } catch (e: any) {
            setError(e.message || 'Failed to load health data');
        } finally {
            setLoading(false);
        }
    }, [trendRange]);

    // Reload usage trend when range changes
    useEffect(() => {
        SystemHealthService.getUsageTrend(trendRange).then(setUsageTrend).catch(() => { });
    }, [trendRange]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Peak hour maximum
    const topHourIndex = peakHours.reduce((best, p, i) =>
        p.sessions > (peakHours[best]?.sessions || 0) ? i : best, 0);

    const handleSpeedChange = (speed: AdminSpeedOption) => {
        setCurrentSpeed(speed);
        AdminHeartbeatEngine.setSpeed(speed);
    };

    // ── UI ──────────────────────────────────────────────────────────────────
    return (
        <div className="flex flex-col gap-6 h-full overflow-y-auto pb-8">

            {/* ── Header ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-white">System Health</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {lastRefreshed ? `آخر تحديث: ${lastRefreshed.toLocaleTimeString('ar-EG')}` : 'جاري التحميل...'}
                    </p>
                </div>
                <button
                    onClick={loadData}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium hover:bg-indigo-500/20 transition-all disabled:opacity-50"
                >
                    <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                    تحديث
                </button>
            </div>

            {error && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                    <AlertTriangle size={16} />
                    {error}
                </div>
            )}

            {/* ── Refresh Speed Control ──────────────────────────── */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                    <Zap size={15} className="text-amber-400" />
                    <span className="text-sm font-bold text-white">سرعة التحديث اللحظي</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    {ADMIN_SPEED_OPTIONS.map(opt => (
                        <button
                            key={opt.key}
                            onClick={() => handleSpeedChange(opt.key)}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${currentSpeed === opt.key
                                ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                                : 'bg-slate-800/50 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200'
                                }`}
                        >
                            <span className="text-sm font-bold">{opt.label}</span>
                            <span className="text-[10px] opacity-70 leading-tight">{opt.description}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Overview Cards ─────────────────────────────────── */}
            {loading && !overview ? (
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-24 rounded-2xl bg-slate-900/40 border border-white/5 animate-pulse" />
                    ))}
                </div>
            ) : overview ? (
                <div className="grid grid-cols-3 gap-4">
                    <StatCard icon={Users} label="إجمالي الطلاب" value={overview.totalStudents} color="indigo" />
                    <StatCard icon={BookOpen} label="إجمالي الجلسات" value={overview.totalSessions} color="emerald" />
                    <StatCard icon={Clock} label="ساعات الدراسة" value={`${overview.totalStudyHours}h`} color="blue" />
                    <StatCard icon={Activity} label="متوسط مدة الجلسة" value={`${overview.avgSessionMinutes}م`} color="violet" />
                    <StatCard icon={CheckCircle} label="جلسات مكتملة" value={overview.completedSessions} color="emerald" />
                    <StatCard icon={BarChart3} label="معدل الإتمام" value={`${overview.completionRate}%`} color={overview.completionRate > 70 ? 'emerald' : overview.completionRate > 40 ? 'amber' : 'red'} />
                </div>
            ) : null}

            {/* ── Usage Trend ────────────────────────────────────── */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={15} className="text-indigo-400" />
                        <span className="text-sm font-bold text-white">نشاط الجلسات</span>
                    </div>
                    <div className="flex gap-1">
                        {(['day', 'week', 'month', 'year'] as const).map(r => (
                            <button
                                key={r}
                                onClick={() => setTrendRange(r)}
                                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${trendRange === r
                                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/20'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {r === 'day' ? 'اليوم' : r === 'week' ? 'الأسبوع' : r === 'month' ? 'الشهر' : 'السنة'}
                            </button>
                        ))}
                    </div>
                </div>
                {usageTrend.length > 0 ? (
                    <>
                        <MiniBarChart data={usageTrend} color="bg-indigo-500/70" />
                        <div className="flex justify-between mt-1">
                            <span className="text-[10px] text-slate-600">{usageTrend[0]?.label}</span>
                            <span className="text-[10px] text-slate-600">{usageTrend[usageTrend.length - 1]?.label}</span>
                        </div>
                        <div className="mt-3 flex gap-6 text-xs text-slate-500">
                            <span>إجمالي الجلسات: <strong className="text-white">{usageTrend.reduce((a, b) => a + b.sessions, 0)}</strong></span>
                            <span>إجمالي الساعات: <strong className="text-white">{usageTrend.reduce((a, b) => a + b.hours, 0).toFixed(1)}h</strong></span>
                        </div>
                    </>
                ) : (
                    <div className="h-14 flex items-center justify-center text-slate-600 text-xs">لا توجد بيانات</div>
                )}
            </div>

            {/* ── Peak Hours + Improvement ────────────────────────── */}
            <div className="grid grid-cols-2 gap-4">
                {/* Peak Hours */}
                <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock size={15} className="text-amber-400" />
                        <span className="text-sm font-bold text-white">أكثر الأوقات نشاطاً</span>
                    </div>
                    <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto pr-1">
                        {peakHours.length > 0
                            ? peakHours
                                .slice()
                                .sort((a, b) => b.sessions - a.sessions)
                                .slice(0, 12)
                                .map((p, i) => (
                                    <PeakHourRow key={p.hour} point={p} isTopHour={i === 0} />
                                ))
                            : <div className="text-slate-600 text-xs text-center py-4">لا توجد بيانات بعد</div>
                        }
                    </div>
                    {peakHours.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/5 text-xs text-slate-500">
                            🏆 أكثر وقت نشاطاً: <strong className="text-amber-400">{peakHours[topHourIndex]?.label}</strong>
                            {' '}({peakHours[topHourIndex]?.sessions} جلسة)
                        </div>
                    )}
                </div>

                {/* Improvement */}
                <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                        <Brain size={15} className="text-violet-400" />
                        <span className="text-sm font-bold text-white">تحسن الطلاب (آخر 4 أسابيع)</span>
                    </div>
                    {improvement ? (
                        <>
                            <div className="flex items-center justify-center mb-4">
                                <div className="relative w-24 h-24">
                                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="2.5" />
                                        <circle
                                            cx="18" cy="18" r="15.9" fill="none"
                                            stroke={improvement.improvementRate > 60 ? '#10b981' : improvement.improvementRate > 30 ? '#f59e0b' : '#ef4444'}
                                            strokeWidth="2.5"
                                            strokeDasharray={`${improvement.improvementRate} ${100 - improvement.improvementRate}`}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className={`text-2xl font-black ${improvement.improvementRate > 60 ? 'text-emerald-400' : improvement.improvementRate > 30 ? 'text-amber-400' : 'text-red-400'}`}>
                                            {improvement.improvementRate}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <MetricRow icon={TrendingUp} label="تحسن" value={improvement.improved} color="text-emerald-400" />
                                <MetricRow icon={TrendingDown} label="تراجع" value={improvement.declined} color="text-red-400" />
                                <MetricRow icon={Minus} label="مستقر" value={improvement.stable} color="text-slate-400" />
                            </div>
                            {improvement.total === 0 && (
                                <p className="text-xs text-slate-600 text-center mt-3">يحتاج بيانات جلسات كافية للحساب</p>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-32 text-slate-600 text-xs">جاري التحميل...</div>
                    )}
                </div>
            </div>

            {/* ── University Breakdown ───────────────────────────── */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                    <Building2 size={15} className="text-sky-400" />
                    <span className="text-sm font-bold text-white">الجامعات</span>
                    <span className="text-xs text-slate-500">({universities.length} جامعة)</span>
                </div>
                {universities.length === 0 ? (
                    <div className="text-center text-slate-600 text-xs py-6">لا توجد بيانات جامعات بعد</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="text-slate-500 border-b border-white/5">
                                    <th className="text-right pb-3 pr-2 font-medium">الجامعة</th>
                                    <th className="text-center pb-3 font-medium">الطلاب</th>
                                    <th className="text-center pb-3 font-medium">الجلسات</th>
                                    <th className="text-center pb-3 font-medium">متوسط المدة</th>
                                    <th className="text-center pb-3 font-medium">متوسط الحمل المعرفي</th>
                                    <th className="text-center pb-3 font-medium">النشطون (7أ)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {universities.map((uni, i) => (
                                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="py-3 pr-2 pl-4 font-medium text-slate-200">{uni.university}</td>
                                        <td className="py-3 text-center text-indigo-400 font-bold">{uni.studentCount}</td>
                                        <td className="py-3 text-center text-slate-300">{uni.totalSessions}</td>
                                        <td className="py-3 text-center text-slate-300">
                                            {uni.avgSessionMinutes > 0 ? `${uni.avgSessionMinutes}م` : '—'}
                                        </td>
                                        <td className="py-3 text-center">
                                            <span className={`font-bold ${uni.avgCognitiveCost === 0 ? 'text-slate-500'
                                                : uni.avgCognitiveCost <= 4 ? 'text-emerald-400'
                                                    : uni.avgCognitiveCost <= 7 ? 'text-amber-400'
                                                        : 'text-red-400'
                                                }`}>
                                                {uni.avgCognitiveCost > 0 ? uni.avgCognitiveCost.toFixed(1) : '—'}
                                            </span>
                                        </td>
                                        <td className="py-3 text-center">
                                            <span className={`font-medium ${uni.activePercentage > 60 ? 'text-emerald-400'
                                                : uni.activePercentage > 30 ? 'text-amber-400'
                                                    : 'text-red-400'
                                                }`}>
                                                {uni.activePercentage}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
};

// ─── SUB COMPONENTS ─────────────────────────────────────────────────────────

const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-500/10  border-indigo-500/20  text-indigo-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    blue: 'bg-blue-500/10    border-blue-500/20    text-blue-400',
    violet: 'bg-violet-500/10  border-violet-500/20  text-violet-400',
    amber: 'bg-amber-500/10   border-amber-500/20   text-amber-400',
    red: 'bg-red-500/10     border-red-500/20     text-red-400',
};

const StatCard: React.FC<{
    icon: React.ElementType;
    label: string;
    value: string | number;
    color: string;
}> = ({ icon: Icon, label, value, color }) => {
    const cls = colorMap[color] || colorMap.indigo;
    const [bg, border, text] = cls.split(/\s+/);
    return (
        <div className={`p-5 rounded-2xl ${bg} border ${border} flex items-center gap-4`}>
            <div className={`${bg} border ${border} rounded-xl p-2.5`}>
                <Icon size={18} className={text} />
            </div>
            <div>
                <div className="text-xs text-slate-400 mb-1">{label}</div>
                <div className={`text-2xl font-black ${text}`}>{value}</div>
            </div>
        </div>
    );
};

const MetricRow: React.FC<{
    icon: React.ElementType;
    label: string;
    value: number;
    color: string;
}> = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Icon size={12} className={color} />
            <span className="text-slate-400 text-xs">{label}</span>
        </div>
        <span className={`font-bold text-sm ${color}`}>{value}</span>
    </div>
);
