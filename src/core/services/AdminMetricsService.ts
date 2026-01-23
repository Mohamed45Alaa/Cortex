import { getFirestoreInstance, getDatabaseInstance } from "@/core/services/firebase";
import { collectionGroup, onSnapshot, query, doc, setDoc } from "firebase/firestore";
import { ref, onValue } from "firebase/database";



export const AdminMetricsService = {
    // --- DUAL LAYER AGGREGATION SERVICE ---
    subscribeToDashboard: (callback: (data: {
        students: any[], // Mapped to StudentMonitorData
        total: number,
        subscribed: number, // Legacy field, mostly ignored now
        onlineCount: number,
        stats: {
            onlineCount: number,
            inSessionCount: number,
            backgroundStudyingCount: number,
            offlineRecentCount: number,
            inactiveCount: number
        }
    }) => void) => {
        // 0. Lazy Initialization (Safe)
        const db = getFirestoreInstance();
        const dbRTDB = getDatabaseInstance();

        if (!db) {
            console.error("[AdminMetrics] Firestore Failed to Initialize - Check Auth/Network");
            return () => { }; // Return no-op cleanup
        }

        // 1. Static Query (Firestore)
        const profilesQuery = query(collectionGroup(db, 'profile'));

        // 2. Live Query (RTDB) (Already initialized above)

        // 3. Maps (In-Memory Join)
        let studentsMap = new Map<string, any>();
        let liveStatusMap = new Map<string, any>();

        // 4. Merging Logic
        const emit = () => {
            const combined: any[] = [];
            let onlineCount = 0;
            const NOW = Date.now();
            const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

            studentsMap.forEach((rawProfile, uid) => {
                const profile = rawProfile;

                // --- 1. PARSE FIRESTORE DATA (Fallback & Profile) ---
                let lastLoginMs = 0;
                if (profile.lastLoginAt) {
                    try {
                        const val = profile.lastLoginAt;
                        lastLoginMs = typeof val === 'string' ? new Date(val).getTime() : (val.seconds * 1000);
                    } catch (e) { }
                }

                // --- 2. PARSE RTDB DATA (Live State) ---
                const rtdbStatus = liveStatusMap.get(uid);

                // Active Session Logic: Presence of object = In Session
                const activeSessionData = rtdbStatus?.activeSession;
                const isSessionActive = !!activeSessionData;

                // Presence Logic:
                let rawStatus = (rtdbStatus?.state || 'offline') as 'online' | 'background' | 'offline';

                // LAST SEEN FALLBACK STRATEGY
                // Priority: RTDB lastChanged > Firestore lastLoginAt
                let effectiveLastSeen = rtdbStatus?.lastSeenAt || lastLoginMs;

                // --- 3. SESSION-CENTRIC CLASSIFICATION (STRICT FINAL) ---

                let finalMode = 'none';
                let sortRank = 7;

                // RULE 2: STUDY STATE IS SESSION-DRIVEN (No other factor)
                // This is calculated independently of Presence Group for the "Study State" column
                const strictStudyMode = isSessionActive ? 'in_session' : 'no_session';

                // STATUS DEFINITIONS (STRICT 7-TIER)
                if (isSessionActive) {
                    // MUST BE IN SESSION (Study State = In Session)
                    if (rawStatus === 'online') {
                        // 1. Online & In Session
                        finalMode = 'in_session';
                        sortRank = 1;
                    } else if (rawStatus === 'background') {
                        // 3. Background (In Session)
                        finalMode = 'background_session';
                        sortRank = 3;
                    } else {
                        // 5. Offline In Session
                        // (Disconnected but session not ended)
                        finalMode = 'offline_session';
                        sortRank = 5;
                    }
                } else {
                    // NO SESSION (Study State = No Session)
                    if (rawStatus === 'online') {
                        // 2. Online & No Session
                        finalMode = 'browsing';
                        sortRank = 2;
                    } else if (rawStatus === 'background') {
                        // 4. Background (No Session)
                        finalMode = 'idle';
                        sortRank = 4;
                    } else {
                        // OFFLINE
                        if (NOW - lastLoginMs > SEVEN_DAYS_MS) {
                            // 7. Inactive (> 7 Days) - RED ALERT
                            finalMode = 'inactive';
                            sortRank = 7;
                        } else {
                            // 6. Offline (Recent)
                            finalMode = 'offline_recent';
                            sortRank = 6;
                        }
                    }
                }

                // SAFETY FALLBACK (MANDATORY per Issue 2)
                if (!sortRank) {
                    console.warn(`[AdminMetrics] User ${uid} fell through logic. Defaulting to Offline Recent.`);
                    finalMode = 'offline_recent';
                    sortRank = 6;
                }

                // --- AVATAR PRESENCE DOT Logic (STRICT SINGLE SOURCE OF TRUTH) ---
                // RULE: SINGLE SOURCE OF TRUTH "presenceState"
                // Values: 'ONLINE', 'BACKGROUND', 'OFFLINE_IN_SESSION', 'OFFLINE', 'INACTIVE'

                let presenceDotStatus = 'OFFLINE'; // Default
                let dotColor = 'gray';             // Default

                if (rawStatus === 'online') {
                    presenceDotStatus = 'ONLINE';
                    dotColor = 'green';
                } else if (rawStatus === 'background') {
                    presenceDotStatus = 'BACKGROUND';
                    dotColor = 'blue';
                } else {
                    // OFFLINE BRANCH

                    // 1. Check for Active Session (Study State Priority)
                    if (isSessionActive) {
                        presenceDotStatus = 'OFFLINE_IN_SESSION';
                        dotColor = 'purple'; // "Studying without connection"
                    } else {
                        // 2. Check for Inactivity
                        if (NOW - lastLoginMs > SEVEN_DAYS_MS) {
                            presenceDotStatus = 'INACTIVE';
                            dotColor = 'red';
                        } else {
                            presenceDotStatus = 'OFFLINE';
                            dotColor = 'gray'; // Offline Recent
                        }
                    }
                }

                // VERIFICATION CHECK:
                // If dotColor is not one of green, blue, red, gray -> Something wrong.
                // But logic above guarantees it.

                // --- 4. COUNTERS LOGIC ---
                // Online = groups (1 + 2)
                if (sortRank === 1 || sortRank === 2) onlineCount++;

                // --- 5. LAST SEEN TEXT ---
                let lastSeenText = '';
                if (sortRank >= 5) { // Offline ranks
                    if (effectiveLastSeen > 0) {
                        const diff = NOW - effectiveLastSeen;
                        if (diff < 60000) lastSeenText = 'Just now';
                        else if (diff < 3600000) lastSeenText = `${Math.floor(diff / 60000)}m ago`;
                        else if (diff < 86400000) lastSeenText = `${Math.floor(diff / 3600000)}h ago`;
                        else lastSeenText = `${Math.floor(diff / 86400000)}d ago`;
                    } else {
                        lastSeenText = 'Never';
                    }
                }

                // --- 6. DATA PREP ---
                const studyState = {
                    mode: strictStudyMode, // STRICT: 'in_session' | 'no_session'
                    lastInteractionAt: effectiveLastSeen,
                    sessionActive: isSessionActive,
                    startTime: activeSessionData?.startedAt || null,
                    sessionContext: activeSessionData ? {
                        id: activeSessionData.sessionId,
                        lectureId: activeSessionData.lectureId,
                        subjectId: activeSessionData.subjectId
                    } : null
                };

                const presenceState = {
                    status: rawStatus,
                    dotStatus: presenceDotStatus, // EXPOSED SOURCE OF TRUTH
                    lastSeenAt: effectiveLastSeen,
                    currentPage: rtdbStatus?.currentPage || null
                };

                // Sorting Timestamp:
                // 1) activeSession.lastHeartbeat (Not tracked explicitly? use lastSeenAt if in session)
                // 2) presence.lastSeenAt
                // 3) profile.lastLoginAt
                const sortTimestamp = effectiveLastSeen;

                combined.push({
                    ...profile,
                    name: profile.fullName || profile.name || profile.onboardingName || "User",
                    presence: presenceState,
                    study: studyState,
                    dotColor, // Derived from strict presenceDotStatus
                    lastSeenText,
                    sortRank,
                    sortTimestamp // Validation helper
                });
            });

            // --- FINAL SORT ---
            // 1. Sort by Rank (Ascending)
            // 2. Sort by Recency (Descending) inside Rank
            combined.sort((a, b) => {
                if (a.sortRank !== b.sortRank) return a.sortRank - b.sortRank;
                return b.sortTimestamp - a.sortTimestamp;
            });

            // --- AGGREGATE METRICS ---
            let stats = {
                onlineCount: 0,
                inSessionCount: 0,
                backgroundStudyingCount: 0,
                offlineRecentCount: 0,
                inactiveCount: 0
            };

            combined.forEach(s => {
                // Online = groups (1 + 2)
                if (s.sortRank === 1 || s.sortRank === 2) stats.onlineCount++; // Double count check? No, onlineCount var above was local. 

                // Studying = groups (1)
                if (s.sortRank === 1) stats.inSessionCount++;

                // Focusing right now = groups (3 + 5) (Background/Offline but session active)
                if (s.sortRank === 3 || s.sortRank === 5) stats.backgroundStudyingCount++;

                // Inactive = group (7)
                if (s.sortRank === 7) stats.inactiveCount++;

                // Offline Recent (6)
                if (s.sortRank === 6) stats.offlineRecentCount++;
            });

            callback({
                students: combined, // Sorted by Rank
                total: combined.length,
                subscribed: 0,
                onlineCount: stats.onlineCount,
                stats
            });
        };

        // 5. Subscriptions

        // A. Firestore Profiles (Static)
        const unsubProfiles = onSnapshot(profilesQuery, (snap) => {
            snap.docs.forEach(doc => {
                const uid = doc.ref.parent.parent?.id;
                if (uid && doc.data().role !== 'ADMIN') {
                    const d = doc.data();
                    studentsMap.set(uid, { id: uid, ...d, name: d.fullName || d.name });
                }
            });
            emit();
        }, (error) => {
            console.error("[AdminMetrics] PROFILES ERROR:", error);
        });

        // B. RTDB Status (Live)
        let refOffWrapper = () => { };
        if (dbRTDB) {
            const statusRef = ref(dbRTDB, 'status');
            const onStatusChange = onValue(statusRef, (snap) => {
                const val = snap.val();
                if (val) {
                    liveStatusMap.clear();
                    Object.keys(val).forEach(uid => {
                        liveStatusMap.set(uid, val[uid]);
                    });
                } else {
                    liveStatusMap.clear();
                }
                emit();
            });
            refOffWrapper = () => onStatusChange();
        }

        // C. Heartbeat Re-evaluator (Updates "time ago" text)
        const reval = setInterval(emit, 5000);

        return () => {
            clearInterval(reval);
            unsubProfiles();
            refOffWrapper();
        };
    }
};
