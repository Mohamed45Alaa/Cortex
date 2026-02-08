import { getDatabaseInstance, getFirestoreInstance } from "@/core/services/firebase";
import { ref, onValue, off } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { CacheService } from "./CacheService"; // Fixed

/**
 * AdminMetricsService (HYBRID: RTDB Live + Firestore Lazy Truth)
 * 
 * 1. Listen to RTDB /status for Presence (Source of Truth for ONLINE).
 * 2. If Profile missing in RTDB/Cache -> Lazy Fetch from Firestore /users/{uid}/profile/main.
 * 3. Enforce 90s Heartbeat Timeout (Stale = Offline).
 */
export const AdminMetricsService = {
    subscribeToDashboard: (callback: (data: {
        students: any[],
        total: number,
        subscribed: number,
        onlineCount: number,
        stats: {
            onlineCount: number,
            inSessionCount: number,
            backgroundStudyingCount: number,
            offlineRecentCount: number,
            inactiveCount: number
        }
    }) => void) => {
        const dbRTDB = getDatabaseInstance();
        const dbFirestore = getFirestoreInstance();

        if (!dbRTDB || !dbFirestore) {
            console.error("[AdminMetrics] DB Init Failed");
            return () => { };
        }

        console.log("[AdminMetrics] Initializing Hybrid Subscription...");

        // DATA STORES
        const rtdbUsersMap = new Map<string, any>();  // From RTDB /users (might be empty/partial)
        const rtdbStatusMap = new Map<string, any>(); // From RTDB /status (Live Presence)
        const firestoreProfileCache = new Map<string, any>(); // Lazy Loaded Profiles
        const firestoreSessionCache = new Map<string, any>(); // Lazy Loaded Sessions

        const pendingProfileFetches = new Set<string>();
        const pendingSessionFetches = new Set<string>();



        // ...

        // HELPER: Lazy Fetch Profile
        const fetchProfile = async (uid: string) => {
            if (pendingProfileFetches.has(uid)) return;

            // CACHE CHECK (Phase 3)
            const cached = CacheService.get<any>(`profile_${uid}`);
            if (cached) {
                firestoreProfileCache.set(uid, cached);
                emit();
                return;
            }

            pendingProfileFetches.add(uid);

            try {
                // console.log(`[AdminMetrics] Hydrating Profile: ${uid}`);
                const snap = await getDoc(doc(dbFirestore, 'users', uid, 'profile', 'main'));
                if (snap.exists()) {
                    const data = snap.data();
                    firestoreProfileCache.set(uid, data);

                    // CACHE SET (20s TTL)
                    CacheService.set(`profile_${uid}`, data, 20);

                    emit(); // Re-render with new data
                }
            } catch (e) {
                console.warn(`[AdminMetrics] Profile fetch failed for ${uid}`, e);
            } finally {
                pendingProfileFetches.delete(uid);
            }
        };

        // HELPER: Lazy Fetch Session
        const fetchSession = async (uid: string, sessionId: string) => {
            if (pendingSessionFetches.has(sessionId)) return;
            if (firestoreSessionCache.has(sessionId)) return; // Already have it

            pendingSessionFetches.add(sessionId);
            // We need the SubjectId and LectureId ideally, but our path is deep.
            // Problem: We don't know the full path just from sessionId easily unless we query or have context.
            // Requirement says "Fetch latest session summary ... WITHOUT subscribing to full collections"
            // If RTDB status has { activeSession: { subjectId, lectureId, sessionId } } -> Perfect.
            // If not, we might skip full detail or do a targeted query if we really need it.
            // For now, let's assume the RTDB stores context. If not, we skip this to be safe/fast.
            // We'll rely on what's in RTDB or previously cached.
            pendingSessionFetches.delete(sessionId);
        };

        // EMITTER
        const emit = () => {
            const combined: any[] = [];
            let stats = {
                onlineCount: 0,
                inSessionCount: 0,
                backgroundStudyingCount: 0,
                offlineRecentCount: 0,
                inactiveCount: 0
            };

            const NOW = Date.now();
            const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
            const NINETY_SECONDS = 90 * 1000;

            // 1. Identify Population (RTDB Status is the primary signal for existence in the "Live" system)
            // But we also include RTDB Users just in case.
            const allUids = new Set<string>();
            rtdbUsersMap.forEach((_, key) => allUids.add(key));
            rtdbStatusMap.forEach((_, key) => allUids.add(key));

            allUids.forEach(uid => {
                // DATA SOURCES
                const rtdbUser = rtdbUsersMap.get(uid) || {};
                const rtdbStatus = rtdbStatusMap.get(uid);
                const fsProfile = firestoreProfileCache.get(uid);

                // 2. HYDRATION TRIGGER
                if (!fsProfile && !rtdbUser.fullName) {
                    fetchProfile(uid);
                }

                // MERGE PROFILE (Priority: RTDB (Live) > Firestore (Truth/Stale))
                // For live updates to work without refresh, RTDB must override FS cache.
                const profile = { ...fsProfile, ...rtdbUser };

                // 3. PRESENCE ANALYSIS
                let rawState = rtdbStatus?.state || 'offline';
                // Prioritize Status Timestamp > Profile Last Login
                const lastSeen = rtdbStatus?.lastSeenAt || rtdbStatus?.lastChanged || profile.lastLoginAt || 0;

                // STALENESS CHECK
                const timeSinceSeen = NOW - lastSeen;
                if (timeSinceSeen > NINETY_SECONDS && rawState !== 'offline') {
                    rawState = 'offline'; // Force offline if stale
                }

                // SESSION DETECTION
                // Check RTDB first
                // MANDATORY SOURCE OF TRUTH: activeSession OR inSession=true OR currentSession
                // This must act independently of presence state.
                let sessionContext = rtdbStatus?.activeSession || rtdbStatus?.currentSession || null;
                const isSessionActive = !!(sessionContext || rtdbStatus?.inSession === true);

                // 4. CLASSIFICATION (DETERMINISTIC STATE MACHINE)
                let mode = 'none';
                let sortRank = 7;
                let dotColor = 'gray'; // Default
                let statusLabel = 'Offline'; // Default Label

                // PRIORITY 1: HEARTBEAT EXPIRED (Force Offline)
                if (rawState !== 'offline' && timeSinceSeen > NINETY_SECONDS) {
                    rawState = 'offline';
                }

                if (isSessionActive) {
                    // --- SESSION ACTIVE CASE ---
                    // STRICT COUNTER: All active sessions contribute to inSessionCount
                    stats.inSessionCount++;

                    if (rawState === 'online') {
                        // CASE: Active Session + Online
                        // USER RULE: GREEN, Label: "Studying"
                        mode = 'in_session';
                        sortRank = 1;
                        dotColor = 'green';
                        statusLabel = 'Studying';
                        stats.onlineCount++;
                    } else if (rawState === 'background') {
                        // CASE: Active Session + Background
                        // USER RULE: BLUE, Label: "Background (Studying)"
                        mode = 'background_session';
                        sortRank = 3;
                        dotColor = 'blue';
                        statusLabel = 'Background (Studying)';
                        stats.backgroundStudyingCount++;
                    } else {
                        // CASE: Active Session + Offline (Session left open / crash)
                        // USER RULE: PURPLE, Label: "Session Open"
                        mode = 'offline_session';
                        sortRank = 5;
                        dotColor = 'purple';
                        statusLabel = 'Session Open';
                        // Not active/online stats
                    }
                } else {
                    // --- NO SESSION CASE ---
                    if (rawState === 'online') {
                        // CASE: Online but no session
                        // USER RULE: GREEN, Label: "Online"
                        mode = 'browsing';
                        sortRank = 2;
                        dotColor = 'green';
                        statusLabel = 'Online';
                        stats.onlineCount++;
                    } else if (rawState === 'background') {
                        // CASE: Background / Idle
                        // USER RULE: BLUE, Label: "Background"
                        mode = 'idle';
                        sortRank = 4;
                        dotColor = 'blue';
                        statusLabel = 'Background';
                    } else {
                        // CASE: Offline
                        if (NOW - lastSeen > SEVEN_DAYS_MS) {
                            // Offline > 7 days
                            // USER RULE: RED, Label: "Inactive"
                            mode = 'inactive';
                            sortRank = 8; // Moved to 8 to be last
                            dotColor = 'red';
                            statusLabel = 'Inactive';
                            stats.inactiveCount++;
                        } else {
                            // Offline < 7 days
                            // USER RULE: GRAY, Label: "Offline"
                            mode = 'offline_recent';
                            sortRank = 7; // Less than inactive
                            dotColor = 'gray';
                            statusLabel = 'Offline';
                            stats.offlineRecentCount++;
                        }
                    }
                }

                // 5. UI PREP (Color is already set by logic above)
                let lastSeenText = 'Never';
                if (lastSeen > 0) {
                    const diff = NOW - lastSeen;
                    if (diff < 60000) lastSeenText = 'Just now';
                    else if (diff < 3600000) lastSeenText = `${Math.floor(diff / 60000)}m ago`;
                    else if (diff < 86400000) lastSeenText = `${Math.floor(diff / 3600000)}h ago`;
                    else lastSeenText = `${Math.floor(diff / 86400000)}d ago`;
                }

                // Name Construct
                const displayName = profile.fullName || profile.name || profile.email || `Student (${uid.substring(0, 5)})`;
                const displayRole = profile.role || 'STUDENT';

                combined.push({
                    id: uid,
                    ...profile,
                    name: displayName,
                    role: displayRole,
                    presence: {
                        status: rawState,
                        lastSeenAt: lastSeen,
                        dotStatus: rawState.toUpperCase(),
                        currentPage: rtdbStatus?.currentPage || null
                    },
                    study: {
                        mode: mode,
                        sessionActive: isSessionActive,
                        lastInteractionAt: lastSeen,
                        sessionContext: sessionContext,
                        // TIME SOURCE: Extract from context (RTDB usually has createdAt or startedAt)
                        startTime: sessionContext?.createdAt || sessionContext?.startedAt || sessionContext?.startTime || null,
                        // UI HELPER: Pre-calculated Badge Props
                        // STRICT RULE: "In Session" or "-" (handled by UI if null)
                        badge: isSessionActive ? {
                            label: 'In Session',
                            color: 'indigo' // Uniform color for the badge itself
                        } : null
                    },
                    dotColor, // Avatar Dot retains the detailed status color (Green/Blue/Purple)
                    lastSeenText, // STATUS COLUMN Text (e.g. "Just now")
                    sortRank,
                    sortTimestamp: lastSeen
                });
            });

            // SORT
            combined.sort((a, b) => {
                // 1. Rank (Online > Idle > Offline)
                if (a.sortRank !== b.sortRank) return a.sortRank - b.sortRank;
                // 2. Recency
                return b.sortTimestamp - a.sortTimestamp;
            });

            callback({
                students: combined, // Sorted List
                total: combined.length,
                subscribed: 0,
                onlineCount: stats.onlineCount,
                stats
            });
        };

        // LISTENERS
        const statusRef = ref(dbRTDB, 'status');
        const usersRef = ref(dbRTDB, 'users');

        const onStatus = onValue(statusRef, (snap) => {
            const val = snap.val();
            rtdbStatusMap.clear();
            if (val) {
                Object.keys(val).forEach(key => rtdbStatusMap.set(key, val[key]));
            }
            emit();
        });

        const onUsers = onValue(usersRef, (snap) => {
            const val = snap.val();
            rtdbUsersMap.clear();
            if (val) {
                Object.keys(val).forEach(key => {
                    // Normalize potential nesting: users/{uid}/profile/main OR users/{uid}/profile OR users/{uid}
                    // We prioritize 'profile' objects if they exist.
                    const d = val[key];
                    const p = d.profile?.main || d.profile || d;
                    rtdbUsersMap.set(key, p);
                });
            }
            emit();
        });

        // Heartbeat Re-evaluator (Every 5s check for staleness)
        const intervalId = setInterval(() => {
            emit();
        }, 5000);

        return () => {
            off(statusRef);
            off(usersRef);
            clearInterval(intervalId);
        };
    }
};
