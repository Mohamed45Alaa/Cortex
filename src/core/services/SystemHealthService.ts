import {
    collectionGroup,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    collection,
} from 'firebase/firestore';
import { getFirestoreInstance } from './firebase';

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface PlatformOverview {
    totalStudents: number;
    totalSessions: number;
    totalStudyHours: number;
    avgSessionMinutes: number;
    completedSessions: number;
    completionRate: number; // %
}

export interface UsageTrendPoint {
    label: string; // "Mon", "Jan 20", "Week 3", etc.
    sessions: number;
    hours: number;
}

export interface PeakHourPoint {
    hour: number;       // 0–23
    label: string;      // "12 AM", "3 PM"
    sessions: number;
    percentage: number;
}

export interface UniversityStats {
    university: string;
    studentCount: number;
    avgSessionMinutes: number;
    avgCognitiveCost: number;
    activeStudents: number;    // studied in last 7 days
    activePercentage: number;
    totalSessions: number;
}

export interface ImprovementTrend {
    improved: number;   // count
    declined: number;
    stable: number;
    total: number;
    improvementRate: number; // %
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const formatHour = (h: number): string => {
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
};

const msToHours = (ms: number) => ms / (1000 * 60 * 60);
const msToMins = (ms: number) => ms / (1000 * 60);

// ─── SERVICE ─────────────────────────────────────────────────────────────────

export const SystemHealthService = {

    // 1. PLATFORM OVERVIEW ──────────────────────────────────────────────────
    async getPlatformOverview(): Promise<PlatformOverview> {
        const db = getFirestoreInstance();
        if (!db) throw new Error('Firestore unavailable');

        const sessionsSnap = await getDocs(query(collectionGroup(db, 'sessions')));

        let totalDurationMs = 0;
        let completedSessions = 0;

        sessionsSnap.forEach(doc => {
            const d = doc.data();
            const dur = d.totalActiveTime ?? d.durationMs ?? d.duration ?? 0;
            totalDurationMs += typeof dur === 'number' ? dur : 0;
            if (d.status === 'COMPLETED' || d.status === 'completed') completedSessions++;
        });

        const totalSessions = sessionsSnap.size;
        const avgSessionMinutes = totalSessions > 0 ? msToMins(totalDurationMs) / totalSessions : 0;

        // Count profiles for student count
        const profilesSnap = await getDocs(query(collectionGroup(db, 'profile')));
        const totalStudents = profilesSnap.docs.filter(d => {
            const data = d.data();
            return data.role?.toUpperCase() !== 'ADMIN' && data.completed === true && data.fullName;
        }).length;

        return {
            totalStudents,
            totalSessions,
            totalStudyHours: Math.round(msToHours(totalDurationMs) * 10) / 10,
            avgSessionMinutes: Math.round(avgSessionMinutes),
            completedSessions,
            completionRate: totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0,
        };
    },

    // 2. USAGE TREND ────────────────────────────────────────────────────────
    async getUsageTrend(range: 'day' | 'week' | 'month' | 'year'): Promise<UsageTrendPoint[]> {
        const db = getFirestoreInstance();
        if (!db) return [];

        const now = Date.now();
        let buckets: Map<string, { sessions: number; hours: number }> = new Map();
        let startMs: number;

        // Build empty buckets
        if (range === 'day') {
            // Last 24 hours, bucket by hour
            startMs = now - 24 * 60 * 60 * 1000;
            for (let h = 0; h < 24; h++) {
                const label = formatHour(h);
                buckets.set(label, { sessions: 0, hours: 0 });
            }
        } else if (range === 'week') {
            startMs = now - 7 * 24 * 60 * 60 * 1000;
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            for (let i = 6; i >= 0; i--) {
                const d = new Date(now - i * 24 * 60 * 60 * 1000);
                buckets.set(days[d.getDay()], { sessions: 0, hours: 0 });
            }
        } else if (range === 'month') {
            startMs = now - 30 * 24 * 60 * 60 * 1000;
            for (let i = 29; i >= 0; i--) {
                const d = new Date(now - i * 24 * 60 * 60 * 1000);
                const label = `${d.getMonth() + 1}/${d.getDate()}`;
                buckets.set(label, { sessions: 0, hours: 0 });
            }
        } else {
            startMs = now - 365 * 24 * 60 * 60 * 1000;
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            for (let i = 11; i >= 0; i--) {
                const d = new Date(now);
                d.setMonth(d.getMonth() - i);
                buckets.set(monthNames[d.getMonth()], { sessions: 0, hours: 0 });
            }
        }

        const sessionsSnap = await getDocs(query(collectionGroup(db, 'sessions')));
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        sessionsSnap.forEach(doc => {
            const d = doc.data();
            const startedAt: number = typeof d.startedAt === 'number' ? d.startedAt
                : d.startedAt?.toMillis?.() ?? d.createdAt?.toMillis?.() ?? 0;
            if (startedAt < startMs) return;

            const date = new Date(startedAt);
            const dur = d.totalActiveTime ?? d.durationMs ?? d.duration ?? 0;
            const hours = typeof dur === 'number' ? msToHours(dur) : 0;

            let key: string;
            if (range === 'day') {
                key = formatHour(date.getHours());
            } else if (range === 'week') {
                key = dayNames[date.getDay()];
            } else if (range === 'month') {
                key = `${date.getMonth() + 1}/${date.getDate()}`;
            } else {
                key = monthNames[date.getMonth()];
            }

            const existing = buckets.get(key);
            if (existing) {
                existing.sessions++;
                existing.hours += hours;
                buckets.set(key, existing);
            }
        });

        return Array.from(buckets.entries()).map(([label, val]) => ({
            label,
            sessions: val.sessions,
            hours: Math.round(val.hours * 10) / 10,
        }));
    },

    // 3. PEAK HOURS ─────────────────────────────────────────────────────────
    async getPeakHours(): Promise<PeakHourPoint[]> {
        const db = getFirestoreInstance();
        if (!db) return [];

        const buckets = new Array(24).fill(0).map((_, h) => ({ hour: h, sessions: 0 }));

        const sessionsSnap = await getDocs(query(collectionGroup(db, 'sessions')));

        sessionsSnap.forEach(doc => {
            const d = doc.data();
            const startedAt: number = typeof d.startedAt === 'number' ? d.startedAt
                : d.startedAt?.toMillis?.() ?? d.createdAt?.toMillis?.() ?? 0;
            if (!startedAt) return;
            const h = new Date(startedAt).getHours();
            buckets[h].sessions++;
        });

        const max = Math.max(...buckets.map(b => b.sessions), 1);
        return buckets.map(b => ({
            hour: b.hour,
            label: formatHour(b.hour),
            sessions: b.sessions,
            percentage: Math.round((b.sessions / max) * 100),
        }));
    },

    // 4. UNIVERSITY BREAKDOWN ───────────────────────────────────────────────
    async getUniversityBreakdown(): Promise<UniversityStats[]> {
        const db = getFirestoreInstance();
        if (!db) return [];

        // Load profiles
        const profilesSnap = await getDocs(query(collectionGroup(db, 'profile')));
        const profilesByUid = new Map<string, any>();
        profilesSnap.forEach(doc => {
            const uid = doc.ref.parent.parent?.id;
            if (uid) profilesByUid.set(uid, { ...doc.data(), uid });
        });

        // Load sessions
        const sessionsSnap = await getDocs(query(collectionGroup(db, 'sessions')));
        const sessionsByUid = new Map<string, any[]>();
        sessionsSnap.forEach(doc => {
            // Path: users/{uid}/subjects/{sid}/lectures/{lid}/sessions/{sid}
            const uid = doc.ref.path.split('/')[1];
            if (!uid) return;
            if (!sessionsByUid.has(uid)) sessionsByUid.set(uid, []);
            sessionsByUid.get(uid)!.push(doc.data());
        });

        // Group by university
        const byUni = new Map<string, {
            students: Set<string>;
            sessions: number;
            totalDurationMs: number;
            totalCognitiveCost: number;
            cognitiveCount: number;
            activeUids: Set<string>;
        }>();

        const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

        profilesByUid.forEach((profile, uid) => {
            if (profile.role?.toUpperCase() === 'ADMIN') return;
            if (!profile.completed || !profile.fullName) return;

            const uni = profile.academicUniversity || profile.university || 'غير محدد';
            if (!byUni.has(uni)) {
                byUni.set(uni, {
                    students: new Set(),
                    sessions: 0,
                    totalDurationMs: 0,
                    totalCognitiveCost: 0,
                    cognitiveCount: 0,
                    activeUids: new Set(),
                });
            }

            const uniData = byUni.get(uni)!;
            uniData.students.add(uid);

            const userSessions = sessionsByUid.get(uid) || [];
            userSessions.forEach(s => {
                uniData.sessions++;
                const dur = s.totalActiveTime ?? s.durationMs ?? s.duration ?? 0;
                uniData.totalDurationMs += typeof dur === 'number' ? dur : 0;

                const cc = s.cognitiveCost ?? s.cognitiveLoad;
                if (typeof cc === 'number' && cc >= 0 && cc <= 10) {
                    uniData.totalCognitiveCost += cc;
                    uniData.cognitiveCount++;
                }

                const startedAt: number = typeof s.startedAt === 'number' ? s.startedAt
                    : s.startedAt?.toMillis?.() ?? s.createdAt?.toMillis?.() ?? 0;
                if (startedAt > sevenDaysAgo) {
                    uniData.activeUids.add(uid);
                }
            });
        });

        const results: UniversityStats[] = [];
        byUni.forEach((data, university) => {
            const studentCount = data.students.size;
            const avgSessionMinutes = data.sessions > 0
                ? Math.round(msToMins(data.totalDurationMs) / data.sessions)
                : 0;
            const avgCognitiveCost = data.cognitiveCount > 0
                ? Math.round((data.totalCognitiveCost / data.cognitiveCount) * 10) / 10
                : 0;
            const activeStudents = data.activeUids.size;
            const activePercentage = studentCount > 0
                ? Math.round((activeStudents / studentCount) * 100)
                : 0;

            results.push({
                university,
                studentCount,
                avgSessionMinutes,
                avgCognitiveCost,
                activeStudents,
                activePercentage,
                totalSessions: data.sessions,
            });
        });

        return results.sort((a, b) => b.studentCount - a.studentCount);
    },

    // 5. IMPROVEMENT TREND ──────────────────────────────────────────────────
    async getImprovementTrend(): Promise<ImprovementTrend> {
        const db = getFirestoreInstance();
        if (!db) return { improved: 0, declined: 0, stable: 0, total: 0, improvementRate: 0 };

        const now = Date.now();
        const twoWeeksMs = 14 * 24 * 60 * 60 * 1000;
        const fourWeeksMs = 28 * 24 * 60 * 60 * 1000;

        const sessionsSnap = await getDocs(query(collectionGroup(db, 'sessions')));

        // Per user: recent 2 weeks avg vs prior 2 weeks avg
        const userRecentLoads = new Map<string, number[]>();
        const userPriorLoads = new Map<string, number[]>();

        sessionsSnap.forEach(doc => {
            const uid = doc.ref.path.split('/')[1];
            if (!uid) return;
            const d = doc.data();

            const startedAt: number = typeof d.startedAt === 'number' ? d.startedAt
                : d.startedAt?.toMillis?.() ?? d.createdAt?.toMillis?.() ?? 0;
            const cc = d.cognitiveCost ?? d.cognitiveLoad;
            if (typeof cc !== 'number' || cc < 0 || cc > 10) return;

            const age = now - startedAt;
            if (age < twoWeeksMs) {
                if (!userRecentLoads.has(uid)) userRecentLoads.set(uid, []);
                userRecentLoads.get(uid)!.push(cc);
            } else if (age < fourWeeksMs) {
                if (!userPriorLoads.has(uid)) userPriorLoads.set(uid, []);
                userPriorLoads.get(uid)!.push(cc);
            }
        });

        let improved = 0, declined = 0, stable = 0;

        userRecentLoads.forEach((recentList, uid) => {
            const priorList = userPriorLoads.get(uid);
            if (!priorList || priorList.length === 0) return;

            const recentAvg = recentList.reduce((a, b) => a + b, 0) / recentList.length;
            const priorAvg = priorList.reduce((a, b) => a + b, 0) / priorList.length;
            const delta = recentAvg - priorAvg;

            if (delta < -0.5) improved++;       // Lower cognitive cost = improved
            else if (delta > 0.5) declined++;
            else stable++;
        });

        const total = improved + declined + stable;
        return {
            improved,
            declined,
            stable,
            total,
            improvementRate: total > 0 ? Math.round((improved / total) * 100) : 0,
        };
    },
};
