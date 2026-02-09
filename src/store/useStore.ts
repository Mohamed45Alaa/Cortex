import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
    StudentProfile,
    Subject,
    Lecture,
    DailyLoad,
    StudySession,
    SubjectConfig,
    SubjectMetrics,
    AuthContextState,
    UserProfile,
    SegmentType,
    SessionSegment
} from '@/core/types';
import { AuthService } from '@/core/services/AuthService';
import { FirestoreService } from '@/core/services/FirestoreService';
import { getDatabaseInstance } from '@/core/services/firebase';
import { ref, onValue } from 'firebase/database';
import { CognitiveEngine } from '@/core/engines/CognitiveEngine';
import { CognitiveLoadEngine } from '@/core/engines/CognitiveLoadEngine';

// --- HELPER: STRICT SANITIZER ---
// [CRITICAL] Enforces 0-10 Scale. No exceptions.
// Future-proofs against legacy data or calculation bugs.
const sanitize = (value: number | undefined | null): number => {
    if (value === undefined || value === null || isNaN(value)) return 0;

    let safeValue = value;
    // Auto-fix legacy 0-100 values
    if (safeValue > 10) {
        safeValue = safeValue / 10;
    }

    // Hard Clamp
    return Math.min(10, Math.max(0, safeValue));
};

// --- ADMIN STATE SLICE ---
interface AdminSlice {
    students: UserProfile[];
    selectedStudent: UserProfile | null;
    isAdminMode: boolean; // UI Toggle
    adminLiveMonitoring: boolean; // Live Stream Control
    adminError: string | null; // Error State for UI Feedback

    // Actions
    fetchStudents: () => Promise<void>;
    selectStudent: (student: UserProfile | null) => void;
    setAdminMode: (isActive: boolean) => void;
    setAdminMonitoring: (enabled: boolean) => void;
}

// Merge SystemState
interface SystemState extends AdminSlice {
    // --- STATE SLICES ---

    profile: StudentProfile;
    subjects: Subject[];
    lectures: Lecture[]; // Normalized list of all lectures
    sessions: StudySession[];
    dailyLoad: DailyLoad; // Current Day's Accumulator

    // --- AUTHENTICATION ---
    authState: AuthContextState;
    authModal: { isOpen: boolean; mode: 'LOGIN' | 'REGISTER'; onSuccess?: () => void };
    unsubscribeSnapshot?: () => void; // Listener cleanup

    // --- SECURITY ---
    ownerUid: string | null; // Strict State Ownership
    isHydrated: boolean; // True only after Firestore finishes probing

    // Remote Termination State
    terminationState: { reason: string; message: string; severity?: 'warning' | 'info' } | null;

    // --- SESSION GATE PROTECTION ---
    isServerConfirmedSession: boolean; // True only after RESTORE or START API confirms
    creationWindowUntil: number; // Timestamp - SessionGate ignores redirects until this time

    // --- ACTIVE SESSION (PERSISTENCE) ---
    activeSession: {
        id: string; // [ADAPTIVE] Added for persistence/crash recovery
        lectureId: string;
        subjectId: string; // Explicitly Added
        startTime: number;     // Timestamp when session started
        originalDuration: number; // Planned minutes
        expectedDuration?: number; // [NEW] Adaptive expected time
        pausedAt: number | null; // Timestamp if currently paused, else null
        totalPausedTime: number; // Accumulated pause duration in ms
        isActive: boolean;
        isAutoPaused?: boolean; // Track if system paused it (Focus Detection)

        // Forensic Tracking
        segments: SessionSegment[];
        // Actually adhering to plan: isMediaPlaying on uiState.

        // [TERMINATION GUARD]
        status?: 'IN_PROGRESS' | 'COMPLETED' | 'INTERRUPTED' | 'FORCED_END';
        endedBy?: 'USER' | 'ADMIN' | 'SYSTEM';
        isValidForMetrics?: boolean;
    } | null;

    // --- ACTIONS (Mutators) ---

    // 1. Subject Control
    addSubject: (subject: Subject) => void;
    renameSubject: (id: string, newName: string) => void;
    deleteSubject: (id: string) => void;
    updateSubjectConfig: (id: string, config: Partial<SubjectConfig>) => void;
    updateSubjectMetrics: (id: string, metrics: Partial<SubjectMetrics>) => void;

    // 2. Inventory Management
    addLecture: (lecture: Lecture) => void;
    updateLectureStatus: (id: string, status: Lecture['status']) => void;
    updateLectureStability: (id: string, newStability: number) => void;

    // 3. Operational Flow
    registerSession: (session: StudySession) => void;
    resetDailyLoad: () => void; // Called by checkNewDay() logic

    updateCapacity: (newCapacity: number) => void;
    setProfile: (profile: StudentProfile) => void;

    // 4. Active Session Control
    startActiveSession: (lectureId: string, durationMinutes: number, subjectId: string) => void;
    endActiveSession: (penalty?: boolean, isRemoteKill?: boolean, terminationPayload?: { reason: string; message: string; severity?: 'warning' | 'info' }) => StudySession | null; // Finalizes the session and returns it
    pauseActiveSession: () => void;
    resumeActiveSession: () => void;
    autoPauseSession: () => void; // System-triggered
    autoResumeSession: () => void; // System-triggered
    deleteLecture: (lectureId: string) => void;
    clearActiveSession: () => void;
    clearTermination: () => void;
    restoreSessionFromRTDB: (session: any) => void;

    // --- AUTH ACTIONS ---
    login: (email: string, pass: string) => Promise<boolean>;
    loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
    register: (identity: any, profile: any) => Promise<boolean>;
    logout: () => void;
    syncAuth: () => void;
    initializeRealtimeSync: (uid: string) => void;

    // --- UI STATE (New Slice) ---
    uiState: {
        isMainTimerVisible: boolean;
        activeToolId: string | null;
        isMediaPlaying: boolean; // Tracks if internal media is playing
        highlightedLectureId: string | null; // Persistent Highlighting for incomplete lectures
        playerState: {
            fileUrl: string | null;
            youtubeId: string | null;
            currentTime: number;
            duration: number;
            volume: number;
            isMuted: boolean;
            sourceType: 'local' | 'youtube';
        };
    };
    setMainTimerVisibility: (isVisible: boolean) => void;
    setActiveTool: (toolId: string | null) => void;
    setMediaPlaying: (isPlaying: boolean) => void;
    setHighlightLectureId: (id: string | null) => void;
    setPlayerState: (state: Partial<SystemState['uiState']['playerState']>) => void;

    // Segment Logging
    logSegment: (type: SegmentType) => void;

    // --- LOGIC ACTIONS ---
    openAuthModal: (mode?: 'LOGIN' | 'REGISTER', onSuccess?: () => void) => void;
    closeAuthModal: () => void;
    healAccount: () => Promise<void>;
}

// --- SYSTEM RECOVERY: ONE-TIME STORAGE PURGE ---
const STORAGE_KEY = 'academic-system-storage';
const PURGE_FLAG = 'academic-system-storage-purged-v2'; // Bumped to v2 to force effective clean

if (typeof window !== 'undefined') {
    try {
        const hasPurged = localStorage.getItem(PURGE_FLAG);
        if (!hasPurged) {
            console.warn('[SYSTEM RECOVERY] 🚨 PURGING CORRUPTED STATE (One-Time Execution)');
            console.log(`[Recovery] Removing key: ${STORAGE_KEY}`);
            localStorage.removeItem(STORAGE_KEY);
            localStorage.setItem(PURGE_FLAG, 'true');
            console.log('[Recovery] Purge Complete. Reloading...');
            window.location.reload();
        }
    } catch (e) {
        console.error("[Recovery] Purge check failed", e);
    }
}

export const useStore = create<SystemState>()(
    persist(
        (set, get) => ({
            // --- INITIAL STATE ---

            profile: {
                consistencyIndex: 85,
                learningPhase: 'INIT',
                totalSessions: 0,
                currentCapacity: 100,
                lastSessionDate: "2024-01-01T00:00:00.000Z"
            },

            subjects: [],
            lectures: [],
            sessions: [],
            dailyLoad: {
                date: "2024-01-01",
                totalCognitiveCost: 0,
                status: 'Safe'
            },


            // Initialize from Service (Synchronous part, usually guest)
            authState: { status: 'LOADING', user: null, token: null },
            authModal: { isOpen: false, mode: 'LOGIN', onSuccess: undefined },
            unsubscribeSnapshot: undefined,

            activeSession: null,
            terminationState: null,

            // --- SESSION GATE FLAGS ---
            isServerConfirmedSession: false,
            creationWindowUntil: 0,

            ownerUid: null,
            isHydrated: false,

            // --- UI STATE INIT ---
            uiState: {
                isMainTimerVisible: true,
                activeToolId: null,
                isMediaPlaying: false,
                highlightedLectureId: null,
                playerState: {
                    fileUrl: null,
                    youtubeId: null,
                    currentTime: 0,
                    duration: 0,
                    volume: 1,
                    isMuted: false,
                    sourceType: 'local'
                }
            },

            setMainTimerVisibility: (isVisible) => set((state) => ({
                uiState: { ...state.uiState, isMainTimerVisible: isVisible }
            })),

            setActiveTool: (toolId) => set((state) => ({
                uiState: { ...state.uiState, activeToolId: toolId }
            })),

            setMediaPlaying: (isPlaying) => set((state) => ({
                uiState: { ...state.uiState, isMediaPlaying: isPlaying }
            })),

            setHighlightLectureId: (id) => set((state) => ({
                uiState: { ...state.uiState, highlightedLectureId: id }
            })),

            setPlayerState: (updates) => set((state) => ({
                uiState: {
                    ...state.uiState,
                    playerState: { ...state.uiState.playerState, ...updates }
                }
            })),

            logSegment: (type: SegmentType) => set((state) => {
                if (!state.activeSession) return {};

                const now = Date.now();
                const segments = [...state.activeSession.segments];
                const lastSegment = segments.length > 0 ? segments[segments.length - 1] : null;

                // If same type, extend or ignore? 
                // Better to close previous and start new to allow granular analysis
                // BUT if type is same, we merge?
                // Plan: Tracker calls this ONLY on change.

                if (lastSegment && !lastSegment.endTime) {
                    // Close previous
                    lastSegment.endTime = now;
                    lastSegment.duration = now - lastSegment.startTime;
                }

                // Start new
                segments.push({
                    startTime: now,
                    endTime: null,
                    type,
                    duration: 0
                });

                // PHASE 2: BATCH WRite (Crash Safety)
                const uid = state.authState.user?.id;
                if (uid) {
                    // Optimized: Only buffers, sends every 30s
                    FirestoreService.bufferSessionUpdate(uid, {
                        ...state.activeSession,
                        segments
                    });
                }

                return {
                    activeSession: {
                        ...state.activeSession,
                        segments
                    }
                };
            }),

            // --- ADMIN SLICE INIT ---
            students: [],
            selectedStudent: null,
            isAdminMode: false,
            adminError: null,

            // --- ADMIN ACTIONS ---
            fetchStudents: async () => {
                const { students, error } = await import('@/core/services/AdminService').then(m => m.AdminService.getAllStudents());
                if (error) {
                    set({ students: [], adminError: error });
                } else {
                    set({ students: students, adminError: null });
                }
            },

            selectStudent: (student) => set({ selectedStudent: student }),

            setAdminMode: (isActive) => set({ isAdminMode: isActive }),


            // --- ACTIONS ---

            addSubject: (subject) => set((state) => {
                // FIRESTORE SYNC (Atomic Beacon)
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {

                    // Prepare Snapshot (e.g. update totals or just touch timestamp)
                    const nextSnapshot = {
                        profile: state.profile, // Can update totals here if needed
                        dailyLoad: state.dailyLoad
                    };

                    FirestoreService.saveSubjectWithSnapshot(user.id, subject.id, subject, nextSnapshot);
                }

                // Optimistic Update
                return {
                    subjects: [...state.subjects, subject]
                };
            }),

            renameSubject: (id: string, newName: string) => set((state) => {
                // FIRESTORE SYNC (Atomic Beacon)
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {
                    // Prepare Snapshot (Touch timestamp)
                    const nextSnapshot = { profile: state.profile, dailyLoad: state.dailyLoad };
                    FirestoreService.saveSubjectWithSnapshot(user.id, id, { name: newName }, nextSnapshot);
                }

                return {
                    subjects: state.subjects.map(s =>
                        s.id === id ? { ...s, name: newName } : s
                    )
                };
            }),

            deleteSubject: (id: string) => set((state) => {
                // 1. ACTIVE SESSION GUARD
                // If the user is currently studying this subject, FORCE STOP.
                let nextActiveSession = state.activeSession;
                let nextTerminationState = state.terminationState;

                if (state.activeSession && state.activeSession.subjectId === id) {
                    console.warn("[Store] ⚠️ Active Session belongs to deleted subject. Terminating...");

                    // Force End (Simulated)
                    // We can't call get().endActiveSession here easily inside a set reducer cleanly if we want atomic state update.
                    // So we manually teardown.
                    nextActiveSession = null;
                    nextTerminationState = {
                        reason: 'SUBJECT_DELETED',
                        message: 'Session ended because the subject was deleted.',
                        severity: 'warning'
                    };
                }

                // 2. FILTER DATA (Zero Residue)
                const remainingSubjects = state.subjects.filter(s => s && s.id !== id);
                const remainingLectures = state.lectures.filter(l => l && l.subjectId !== id);
                const remainingSessions = state.sessions.filter(s => s && s.subjectId !== id);

                // 3. RECALCULATE METRICS (Pure State Derivation)

                // A. Profile Metrics
                const validSessions = remainingSessions.filter(s => s.isValidForMetrics);
                const nextTotalSessions = validSessions.length;

                // Recalc Learning Phase
                const nextLearningPhase = (nextTotalSessions >= 3 ? 'ADAPTIVE' :
                    (nextTotalSessions >= 1 ? 'NOVICE' : 'INIT')) as 'INIT' | 'NOVICE' | 'ADAPTIVE';

                // Recalc Cumulative Index (Simple Average of VALID sessions)
                const totalIndex = validSessions.reduce((acc, s) => acc + (s.cognitiveCost || 0), 0);
                const nextCumulativeIndex = validSessions.length > 0
                    ? parseFloat((totalIndex / validSessions.length).toFixed(2))
                    : 0; // Default to 0 if no history

                const nextProfile = {
                    ...state.profile,
                    totalSessions: nextTotalSessions,
                    learningPhase: nextLearningPhase,
                    cumulativeIndex: nextCumulativeIndex,
                    // validSessions[validSessions.length - 1]?.date could be used for lastSessionDate logic if needed
                };

                // B. Daily Load (Today)
                const todayStr = new Date().toISOString().split('T')[0]; // simple ISO date
                // Note: state.dailyLoad.date is usually "YYYY-MM-DD"
                // Let's rely on session date parsing safety
                const todaySessions = remainingSessions.filter(s => s.date && s.date.startsWith(todayStr));

                const todayCost = todaySessions.reduce((acc, s) => acc + (s.cognitiveCost || 0), 0);

                let nextStatus: DailyLoad['status'] = 'Safe';
                if (todayCost > 10) nextStatus = 'Risk';
                else if (todayCost > 8) nextStatus = 'Warning';

                const nextDailyLoad = {
                    ...state.dailyLoad, // Keep date
                    totalCognitiveCost: todayCost,
                    status: nextStatus
                };

                // 4. ATOMIC CLOUD SYNC
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {
                    // Prepare Snapshot
                    const snapshot = {
                        profile: nextProfile,
                        dailyLoad: nextDailyLoad
                    };

                    // Exec Deletion + Snapshot Update
                    FirestoreService.deleteSubjectRecursive(user.id, id, snapshot);
                }

                return {
                    subjects: remainingSubjects,
                    lectures: remainingLectures,
                    sessions: remainingSessions,
                    profile: nextProfile,
                    dailyLoad: nextDailyLoad,

                    // Apply Active Session Teardown if triggered
                    activeSession: nextActiveSession,
                    terminationState: nextTerminationState
                };
            }),

            updateSubjectConfig: (id, config) => set((state) => ({
                subjects: state.subjects.map(s =>
                    s.id === id ? { ...s, config: { ...s.config, ...config } } : s
                )
            })),

            updateSubjectMetrics: (id, metrics) => set((state) => ({
                subjects: state.subjects.map(s =>
                    s.id === id ? { ...s, metrics: { ...s.metrics, ...metrics } } : s
                )
            })),

            addLecture: (lecture) => set((state) => {
                // FIRESTORE SYNC
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {
                    FirestoreService.saveLecture(
                        user.id,
                        lecture.subjectId,
                        lecture.id,
                        lecture
                    );
                }

                return {
                    lectures: [...state.lectures, lecture]
                };
            }),

            updateLectureStatus: (id, status) => set((state) => ({
                lectures: state.lectures.map(l =>
                    l.id === id ? { ...l, status } : l
                )
            })),

            updateLectureStability: (id, newStability) => set((state) => ({
                lectures: state.lectures.map(l =>
                    l.id === id ? {
                        ...l,
                        stability: Math.max(0, Math.min(100, newStability)), // Clamp 0-100
                        lastRevision: new Date().toISOString()
                    } : l
                )
            })),

            registerSession: (session) => set((state) => {
                // 1. Add Session to Log
                const newSessions = [...state.sessions, session];

                // 2. Calculate New Daily Load
                // NOTE: Logic for "Is this a new day?" should trigger resetDailyLoad elsewhere, 
                // but here we just accumulate.
                const newCost = state.dailyLoad.totalCognitiveCost + session.cognitiveCost;

                // 4. Determine Risk Status (Scaled 0-10)
                // Old: >100 Risk, >80 Warning
                // New: >10 Risk, >8 Warning
                let status: DailyLoad['status'] = 'Safe';
                // Assuming typical daily capacity is ~10-20 "units" now? 
                // Using 10 as the new 100.
                if (newCost > 10) status = 'Risk';
                else if (newCost > 8) status = 'Warning';

                // FIRESTORE SYNC (Atomic Snapshot Strategy)
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {

                    // Prepare Snapshot State
                    const nextProfile = {
                        ...state.profile,
                        totalSessions: state.profile.totalSessions + 1,
                        learningPhase: (state.profile.totalSessions + 1) >= 3 ? 'ADAPTIVE' :
                            (state.profile.totalSessions + 1) >= 1 ? 'NOVICE' : 'INIT',
                        lastSessionDate: new Date().toISOString()
                    };

                    const snapshot = {
                        profile: nextProfile,
                        dailyLoad: {
                            totalCognitiveCost: newCost,
                            status
                        },
                    };

                    // Atomic Write
                    FirestoreService.saveSessionWithSnapshot(
                        user.id,
                        session,
                        snapshot
                    );
                }

                // Optimistic Local Update (Will be confirmed by Snapshot Listener)
                return {
                    sessions: newSessions,
                    dailyLoad: {
                        ...state.dailyLoad,
                        totalCognitiveCost: newCost,
                        status
                    },
                    profile: {
                        ...state.profile,
                        totalSessions: state.profile.totalSessions + 1,
                        // [CRITICAL LOGIC] Persistent Phase Transition
                        learningPhase: (state.profile.totalSessions + 1) >= 3 ? 'ADAPTIVE' :
                            (state.profile.totalSessions + 1) >= 1 ? 'NOVICE' : 'INIT',
                        lastSessionDate: new Date().toISOString()
                    }
                };
            }),

            resetDailyLoad: () => set((state) => ({
                dailyLoad: {
                    date: new Date().toISOString().split('T')[0],
                    totalCognitiveCost: 0,
                    status: 'Safe'
                }
            })),

            updateCapacity: (newCapacity) => set((state) => ({
                profile: {
                    ...state.profile,
                    currentCapacity: newCapacity
                }
            })),

            setProfile: (profile) => set(() => ({ profile })),

            // --- ACTIVE SESSION ACTIONS ---
            startActiveSession: (lectureId, durationMinutes, subjectId) => set((state) => {
                // [HARD GUARD] Prevent Duplicate Sessions
                if (state.activeSession) {
                    console.warn("[Store] ⚠️ Attempted to start session while one exists. Aborted.");
                    return {};
                }

                console.log("[Store] Starting Active Session:", lectureId);
                return {
                    activeSession: {
                        id: crypto.randomUUID(), // NEW: Crash Rescue Identity
                        lectureId,
                        subjectId, // Explicitly stored
                        startTime: Date.now(),
                        originalDuration: durationMinutes,
                        expectedDuration: durationMinutes, // [FIX] Passed from UI/Orchestrator
                        pausedAt: null, // Start running
                        totalPausedTime: 0,
                        isActive: true,
                        isAutoPaused: false,
                        segments: [], // Start fresh
                    },
                    // SESSION GATE: Creation Grace Window
                    creationWindowUntil: Date.now() + 5000, // 5 seconds
                    isServerConfirmedSession: false, // Becomes true after START API confirms
                    // PROBLEM 2 FIX: CLEAR TERMINATION STATE
                    // New session = Clean slate. Historical bans must not block new attempts.
                    terminationState: null,
                    // Also clear any legacy error
                    adminError: null
                };
            }),

            restoreSessionFromRTDB: (session) => set((state) => {
                console.log("[Store] Restoring Session from RTDB Persistence:", session.sessionId);
                return {
                    activeSession: {
                        id: session.sessionId,
                        lectureId: session.lectureId,
                        subjectId: session.subjectId,
                        startTime: session.startedAt,
                        originalDuration: session.expectedDuration || 60,
                        expectedDuration: session.expectedDuration || 60,
                        pausedAt: null,
                        totalPausedTime: 0,
                        isActive: true,
                        isAutoPaused: false,
                        segments: [],
                    },
                    // SESSION GATE: Server-confirmed session
                    isServerConfirmedSession: true, // Restored = Server validated
                    creationWindowUntil: 0, // No grace window needed for restored sessions
                    terminationState: null,
                    adminError: null
                };
            }),

            pauseActiveSession: () => set((state) => {
                if (!state.activeSession || state.activeSession.pausedAt) return {};
                return {
                    activeSession: {
                        ...state.activeSession,
                        pausedAt: Date.now(),
                        isAutoPaused: false // Manual override resets auto flag
                    }
                };
            }),

            resumeActiveSession: () => set((state) => {
                if (!state.activeSession || !state.activeSession.pausedAt) return {};
                const pauseDuration = Date.now() - state.activeSession.pausedAt;
                return {
                    activeSession: {
                        ...state.activeSession,
                        pausedAt: null,
                        totalPausedTime: state.activeSession.totalPausedTime + pauseDuration,
                        isAutoPaused: false // Reset flag
                    }
                };
            }),

            autoPauseSession: () => set((state) => {
                // Only pause if not already paused
                if (!state.activeSession || state.activeSession.pausedAt) return {};
                console.log("[Focus] System Auto-Pausing Session");
                return {
                    activeSession: {
                        ...state.activeSession,
                        pausedAt: Date.now(),
                        isAutoPaused: true // MARKED AS SYSTEM PAUSE
                    }
                };
            }),

            autoResumeSession: () => set((state) => {
                // Only resume if it WAS auto-paused. Respect manual pauses.
                if (!state.activeSession || !state.activeSession.pausedAt || !state.activeSession.isAutoPaused) return {};

                console.log("[Focus] System Auto-Resuming Session");
                const pauseDuration = Date.now() - state.activeSession.pausedAt;
                return {
                    activeSession: {
                        ...state.activeSession,
                        pausedAt: null,
                        totalPausedTime: state.activeSession.totalPausedTime + pauseDuration,
                        isAutoPaused: false // Reset flag
                    }
                };
            }),

            // --- ADMIN CONTROLS ---
            adminLiveMonitoring: false, // Default OFF for cost safety
            setAdminMonitoring: (enabled: boolean) => set({ adminLiveMonitoring: enabled }),

            endActiveSession: (penalty = false, isRemoteKill = false, terminationPayload): StudySession | null => {
                console.log("[STORE] endActiveSession triggered.");

                // REMOTE KILL: Immediate Reset
                if (isRemoteKill) {
                    set({ activeSession: null, terminationState: terminationPayload || null });
                    return null;
                }

                const state = get();
                if (!state.activeSession) return null;

                // GLOBAL PRE-CHECK (The Hard Abort)
                if (
                    state.activeSession.endedBy === 'ADMIN' ||
                    state.activeSession.endedBy === 'SYSTEM' ||
                    state.activeSession.isValidForMetrics === false ||
                    state.activeSession.status === 'FORCED_END' ||
                    state.activeSession.status === 'INTERRUPTED'
                ) {
                    console.warn("[STORE] 🛑 Hard Abort: Session already terminated externally. Skipping completion logic.");
                    set({ activeSession: null });
                    return null;
                }

                const now = Date.now();

                // 1. Finalize Last Segment
                const segments = [...state.activeSession.segments];
                const lastSegment = segments.length > 0 ? segments[segments.length - 1] : null;
                if (lastSegment && !lastSegment.endTime) {
                    lastSegment.endTime = now;
                    lastSegment.duration = now - lastSegment.startTime;
                }

                // 2. Compute Net Duration (Excluding Pause)
                let netDuration = now - state.activeSession.startTime;
                if (state.activeSession.pausedAt) {
                    netDuration -= (now - state.activeSession.pausedAt);
                }
                netDuration -= state.activeSession.totalPausedTime;

                const actualMinutes = Math.round(netDuration / 60000);

                // 1-Minute Rule: Discard phantom sessions (< 1 min)
                if (actualMinutes < 1) {
                    console.warn("[Store] ⚠️ Session duration is 0 min. Discarding phantom session.");
                    set({ activeSession: null });
                    return null;
                }

                const finalDuration = Math.max(1, actualMinutes);

                // 3. Compute Collection Rate (FORENSIC)
                const totalSegmentDuration = segments.reduce((acc, s) => acc + s.duration, 0);
                const productiveDuration = segments
                    .filter(s => s.type === 'ACTIVE' || s.type === 'TOOL')
                    .reduce((acc, s) => acc + s.duration, 0);

                const collectionRate = totalSegmentDuration > 0
                    ? Math.round((productiveDuration / totalSegmentDuration) * 100)
                    : 0;

                // 4. Fetch Context
                const lecture = state.lectures.find(l => l.id === state.activeSession?.lectureId);
                if (!lecture) {
                    set({ activeSession: null });
                    return null;
                }

                // 5. Cognitive Engine (MASTER PROMPT LOGIC)
                const evaluation = CognitiveLoadEngine.evaluateSession(
                    finalDuration,
                    state.activeSession.expectedDuration || (lecture.duration * 2),
                    lecture.duration,
                    lecture.relativeDifficulty
                );

                const isValidForMetrics = !penalty && evaluation.isValid;

                if (penalty) {
                    evaluation.performanceGrade = 'D';
                    evaluation.cognitiveLoadIndex = 0;
                    evaluation.isValid = false;
                }

                // 6. Construct Final Record
                const newSession: StudySession = {
                    id: crypto.randomUUID(),
                    lectureId: lecture.id,
                    parentId: lecture.id,
                    subjectId: lecture.subjectId,
                    date: new Date().toISOString(),
                    startTime: state.activeSession.startTime,
                    endTime: now,
                    status: penalty ? 'INTERRUPTED' : (evaluation.isValid ? 'COMPLETED' : 'INTERRUPTED'),

                    expectedDuration: state.activeSession.expectedDuration || (lecture.duration * 2),
                    actualDuration: finalDuration,
                    cognitiveCost: evaluation.cognitiveLoadIndex,
                    performanceGrade: evaluation.performanceGrade,
                    isValid: evaluation.isValid,
                    isValidForMetrics: isValidForMetrics,
                    endedBy: penalty ? 'SYSTEM' : 'USER',
                    focusPerformance: penalty ? 0 : 100,

                    // NEW FORENSIC DATA
                    segments: segments,
                    collectionRate: collectionRate
                };

                // 7. Calculate New Cumulative Index (Rolling Window)
                const newCumulativeIndex = isValidForMetrics ? CognitiveLoadEngine.computeNewCumulativeIndex(
                    state.profile.cumulativeIndex || 5.0,
                    evaluation.cognitiveLoadIndex,
                    state.sessions
                ) : (state.profile.cumulativeIndex || 5.0);

                // 8. UPDATE LECTURE STATE (Persistence of Result)
                const updatedLectures = state.lectures.map(l => {
                    if (l.id === lecture.id) {
                        return {
                            ...l,
                            status: 'Mastered',
                            cognitiveIndex: evaluation.cognitiveLoadIndex,
                            grade: evaluation.performanceGrade,
                            lastRevision: new Date().toISOString(),
                            stability: Math.min(100, l.stability + (isValidForMetrics ? 10 : 0))
                        } as Lecture;
                    }
                    return l;
                });

                // 6. FIRESTORE SYNC (The Missing Piece)
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {
                    const nextTotalSessions = isValidForMetrics ? state.profile.totalSessions + 1 : state.profile.totalSessions;
                    const nextLearningPhase = isValidForMetrics ? (
                        (nextTotalSessions >= 3 ? 'ADAPTIVE' : (nextTotalSessions >= 1 ? 'NOVICE' : 'INIT'))
                    ) : state.profile.learningPhase;

                    const nextProfile = {
                        ...state.profile,
                        totalSessions: nextTotalSessions,
                        learningPhase: nextLearningPhase,
                        cumulativeIndex: newCumulativeIndex,
                        lastSessionDate: new Date().toISOString()
                    };

                    const nextDailyLoad = {
                        ...state.dailyLoad,
                        totalCognitiveCost: isValidForMetrics ? state.dailyLoad.totalCognitiveCost + evaluation.cognitiveLoadIndex : state.dailyLoad.totalCognitiveCost,
                    };

                    const snapshot = {
                        profile: nextProfile,
                        dailyLoad: nextDailyLoad
                    };

                    console.log("[STORE] Persisting Ended Session to Firestore...", newSession.id);
                    FirestoreService.saveSessionWithSnapshot(
                        user.id,
                        newSession,
                        snapshot
                    );
                }

                console.log("[STORE] Session Persisted Locally & Cloud.");

                // GUARD: INCREMENT LOCAL STATE ONLY IF VALID
                const nextTotalSessions = isValidForMetrics ? state.profile.totalSessions + 1 : state.profile.totalSessions;
                const nextLearningPhase = isValidForMetrics ? (
                    (nextTotalSessions >= 3 ? 'ADAPTIVE' : (nextTotalSessions >= 1 ? 'NOVICE' : 'INIT'))
                ) : state.profile.learningPhase;

                set({
                    sessions: [...state.sessions, newSession],
                    lectures: updatedLectures,
                    activeSession: null,
                    dailyLoad: {
                        ...state.dailyLoad,
                        totalCognitiveCost: isValidForMetrics ? state.dailyLoad.totalCognitiveCost + evaluation.cognitiveLoadIndex : state.dailyLoad.totalCognitiveCost
                    },
                    profile: {
                        ...state.profile,
                        totalSessions: nextTotalSessions,
                        learningPhase: nextLearningPhase,
                        cumulativeIndex: newCumulativeIndex,
                        lastSessionDate: new Date().toISOString()
                    }
                });

                // RETURN THE NEW SESSION
                return newSession;
            },

            deleteLecture: (lectureId) => set((state) => ({
                lectures: state.lectures.filter(l => l.id !== lectureId),
                sessions: state.sessions.filter(s => s.lectureId !== lectureId)
            })),

            clearActiveSession: () => set(() => ({ activeSession: null })),

            // --- SAFETY: CLEAR TERMINATION STATE ---
            clearTermination: () => set(() => ({ terminationState: null, adminError: null })),



            // --- AUTH IMPLEMENTATION ---
            login: async (email, pass) => {
                try {
                    const result = await AuthService.login(email, pass);
                    set({
                        authState: result,
                        ownerUid: result.user?.id || null
                    });
                    return true;
                } catch (e) {
                    console.error("Login Failed", e);
                    return false;
                }
            },

            loginWithGoogle: async () => {
                try {
                    const result = await AuthService.loginWithGoogle();
                    set({ authState: result });

                    // FIRESTORE SYNC: Load User Data
                    if (result.status === 'AUTHENTICATED' && result.user) {
                        set({ ownerUid: result.user.id }); // Claim Ownership

                        const userData = await FirestoreService.loadUserData(result.user.id);
                        if (userData) {
                            // [DATA MIGRATION for 0-10 Scale]
                            // Sanitize Sessions
                            const sanitizedSessions = (userData.sessions || []).map(s => {
                                let changed = false;
                                const originalCost = s.cognitiveCost;

                                // Sanitize Cost
                                const newCost = sanitize(originalCost);

                                if (newCost !== originalCost) changed = true;

                                // STRICT REMOVAL of Forbidden Fields
                                // Check if forbidden fields exist
                                if ('performanceIndex' in s || 'cognitiveIndex' in s) {
                                    changed = true;
                                }

                                if (changed) {
                                    // Return CLEAN object
                                    const { performanceIndex, cognitiveIndex, ...rest } = s as any;
                                    return {
                                        ...rest,
                                        cognitiveCost: newCost
                                    };
                                }
                                return s;
                            });

                            // Sanitize Profile
                            let sanitizedProfile = { ...(userData.stateSnapshot?.profile || (userData as any).profile || {}) };
                            if (sanitizedProfile.cumulativeIndex !== undefined) {
                                sanitizedProfile.cumulativeIndex = sanitize(sanitizedProfile.cumulativeIndex);
                            }

                            // Sanitize Daily Load
                            let sanitizedDailyLoad = { ...(userData.stateSnapshot?.dailyLoad || (userData as any).dailyLoad || {}) };
                            if (sanitizedDailyLoad.totalCognitiveCost !== undefined) {
                                let safeDailyCost = sanitizedDailyLoad.totalCognitiveCost;
                                if (safeDailyCost > 50) safeDailyCost = safeDailyCost / 10; // Heuristic for legacy sums
                                sanitizedDailyLoad.totalCognitiveCost = sanitize(safeDailyCost);

                                // Recalc status based on corrected total
                                if (sanitizedDailyLoad.totalCognitiveCost > 10) sanitizedDailyLoad.status = 'Risk';
                                else if (sanitizedDailyLoad.totalCognitiveCost > 8) sanitizedDailyLoad.status = 'Warning';
                                else sanitizedDailyLoad.status = 'Safe';
                            }


                            set((state) => {
                                // CRITICAL FIX: Merge persisted identity (completed flag) into AuthState
                                const updatedUser = state.authState.user && userData.identityProfile
                                    ? { ...state.authState.user, ...userData.identityProfile }
                                    : state.authState.user;

                                // A) SIGN-UP / FIRST LOGIN LOGIC (Robust Merge)
                                if (result.user) {
                                    const currentUser = result.user;
                                    const existing = userData.identityProfile || {};

                                    // QUOTA GUARD: THROTTLE LOGIN WRITES (1 Hour)
                                    const lastLogin = existing.lastLoginAt ? new Date(existing.lastLoginAt).getTime() : 0;
                                    const shouldWrite = (Date.now() - lastLogin) > 3600000;

                                    if (shouldWrite) {
                                        // Base Payload: Always ensure Email is current
                                        const payload: any = {
                                            email: currentUser.email,
                                            lastActive: new Date().toISOString(),
                                            lastLoginAt: new Date().toISOString(),
                                            lastLoginDevice: navigator.userAgent,
                                            lastLoginIP: 'Unknown'
                                        };

                                        // Conditional Defaults: Only set if missing (NO OVERWRITE)
                                        if (!existing.role) payload.role = 'STUDENT';
                                        if (!existing.createdAt) payload.createdAt = new Date().toISOString();
                                        if (existing.completed === undefined) payload.completed = false;

                                        console.log("[Store] Persisting/Merging User Profile (Throttled):", payload);
                                        FirestoreService.saveUserProfile(currentUser.id, payload);
                                    } else {
                                        console.log("[Store] Login Write Skipped (Throttled 1h)");
                                    }

                                    // Reflect in Local State immediately (for UI consistency)
                                    if (state.authState.user) {
                                        // Object.assign(state.authState.user, payload); // Don't blindly assign if we didn't generate payload components
                                    }
                                }

                                const isLocalFresh = state.subjects.length === 0 && state.sessions.length === 0;
                                console.log("[Store] Merging Firestore Data. Local Fresh:", isLocalFresh);

                                // Update AuthState immediately to pass RootGate
                                if (updatedUser !== state.authState.user) {
                                    state.authState.user = updatedUser; // Direct mutation ok inside set, or use spread below
                                }

                                if (!isLocalFresh && !userData.subjects.length) {
                                    return { authState: { ...state.authState, user: updatedUser } };
                                }

                                // SNAPSHOT HYDRATION STRATEGY
                                if (userData.stateSnapshot) {
                                    console.log("[Store] Hydrating from Snapshot (User Truth)");
                                    return {
                                        authState: { ...state.authState, user: updatedUser }, // Ensure AuthState is updated
                                        profile: { ...state.profile, ...sanitizedProfile },
                                        dailyLoad: { ...state.dailyLoad, ...sanitizedDailyLoad },
                                        subjects: userData.subjects.length > 0 ? userData.subjects : state.subjects,
                                        lectures: userData.lectures.length > 0 ? userData.lectures : state.lectures,
                                        sessions: sanitizedSessions.length > 0 ? sanitizedSessions : (userData.sessions || state.sessions)
                                    };
                                }

                                // FALLBACK: No Snapshot -> Recompute & Heal
                                console.warn("[Store] No Snapshot found. Recomputing from raw data...");
                                const calculatedSessions = userData.sessions.length || state.profile.totalSessions;
                                // Simple recompute logic (expand as needed)
                                const healedProfile = {
                                    ...state.profile,
                                    totalSessions: calculatedSessions,
                                    learningPhase: calculatedSessions >= 3 ? 'ADAPTIVE' : calculatedSessions >= 1 ? 'NOVICE' : 'INIT',
                                };

                                // Initiate Healing Save (Async, don't await)
                                if (result.user) {
                                    FirestoreService.saveStateSnapshot(result.user.id, {
                                        profile: healedProfile,
                                        dailyLoad: sanitizedDailyLoad // Keep current load or 0 if fresh
                                    });
                                }

                                return {
                                    authState: { ...state.authState, user: updatedUser },
                                    profile: healedProfile,
                                    subjects: userData.subjects.length > 0 ? userData.subjects : state.subjects,
                                    lectures: userData.lectures.length > 0 ? userData.lectures : state.lectures,
                                    sessions: sanitizedSessions.length > 0 ? sanitizedSessions : state.sessions
                                } as any;
                            });
                            console.log("[Store] Hydrated from Firestore", userData);
                        }
                    }

                    return { success: true };
                } catch (e: any) {
                    console.error("Google Login Failed", e);
                    return { success: false, error: e.message || "Unknown error" };
                }
            },

            register: async (identity, profile) => {
                try {
                    const result = await AuthService.register(identity, profile);
                    set({ authState: result });
                    return true;
                } catch (e) {
                    console.error("Register Failed", e);
                    return false;
                }
            },

            logout: async () => {
                await AuthService.logout();
                // PHASE 2 & 4: MEMORY WIPE
                // Explicitly clear all academic state. Do NOT rely on reload.
                set({
                    authState: { status: 'GUEST', user: null, token: null },
                    ownerUid: null,
                    isHydrated: false, // Reset for next user

                    // Wipe Data
                    subjects: [],
                    lectures: [],
                    sessions: [],
                    activeSession: null,

                    // Reset Profile
                    profile: {
                        consistencyIndex: 85,
                        learningPhase: 'INIT',
                        totalSessions: 0,
                        currentCapacity: 100,
                        lastSessionDate: "2024-01-01T00:00:00.000Z"
                    },
                    dailyLoad: {
                        date: new Date().toISOString().split('T')[0],
                        totalCognitiveCost: 0,
                        status: 'Safe'
                    },

                    // Clean Admin
                    selectedStudent: null,
                    adminError: null,
                    isAdminMode: false,

                    // Safety
                    terminationState: null
                });
            },

            syncAuth: () => {
                const unsubscribe = AuthService.initCallback(async (result) => {
                    const state = get();

                    // Cleanup listener on logout
                    if (result.status !== 'AUTHENTICATED' && state.unsubscribeSnapshot) {
                        console.log("[Store] Cleaning up snapshot listener");
                        state.unsubscribeSnapshot();
                        // Note: We don't return here, we proceed to update authState
                    }

                    // [F5 REFRESH HANDLER]
                    // Since Persistence is disabled for academic data, we must hydrate on reload.
                    // If we have a user but no subjects, this is a distinct reload event.
                    if (result.status === 'AUTHENTICATED' && result.user) {

                        // Strict Owner Check (Phase 1 Redundancy)
                        // If ownerUid exists and mismatches, we would have wiped it on logout.
                        // But on fresh load, ownerUid is null.

                        // Check if hydration needed
                        if (state.subjects.length === 0 && state.sessions.length === 0) {
                            console.log("[Store] 🚀 Auto-Hydrating Data (Refresh Detected) for:", result.user.id);
                            // Set Owner Immediately
                            set({ ownerUid: result.user.id });

                            const userData = await FirestoreService.loadUserData(result.user.id);

                            // HYDRATION: If we found data, or even if we didn't (Fresh User),
                            // we mark as hydrated so RootGate can decide.
                            if (userData) {
                                set((current) => ({
                                    // Full Hydration
                                    subjects: userData.subjects,
                                    lectures: userData.lectures,
                                    sessions: userData.sessions,

                                    // Snapshot overlay
                                    profile: userData.stateSnapshot?.profile || current.profile,
                                    dailyLoad: userData.stateSnapshot?.dailyLoad || current.dailyLoad,

                                    // Identity Merge
                                    authState: { ...result, user: { ...result.user, ...userData.identityProfile } } as any,
                                    isHydrated: true // ✅ DATA READY
                                }));
                                console.log("[Store] Auto-Hydration Complete.");
                                return; // Skip the standard merge below as we just did a full set
                            }
                        }
                    }

                    set((current) => {
                        // [Standard Auth Merge Logic] - Preserved for steady state
                        if (result.status === 'AUTHENTICATED' && result.user && current.authState.user?.id === result.user.id) {
                            const mergedUser = {
                                ...result.user,
                                ...current.authState.user,
                                completed: current.authState.user.completed === true ? true : result.user.completed
                            };
                            return { authState: { ...result, user: mergedUser }, isHydrated: true };
                        }

                        // IF GUEST or JUST LOGGED IN (but didn't hit hydration above?)
                        // We must ensure isHydrated is true if we are in steady state

                        // If Guest:
                        if (result.status === 'GUEST') return { authState: result, isHydrated: true };

                        // If Auth but missed the "Empty State" check (Meaning we had data in memory??)
                        // Then we are also hydrated.
                        return { authState: result, isHydrated: true };
                    });
                });
                // Note: We don't store the auth unsubscribe here as it's global.
            },

            initializeRealtimeSync: (uid) => {
                set((state) => {
                    // Cleanup existing
                    if (state.unsubscribeSnapshot) {
                        state.unsubscribeSnapshot();
                    }

                    console.log("[Store] Initializing Real-Time Sync for:", uid);

                    // A. FIRESTORE LISTENER (Metrics Beacon)
                    const unsubscribeFirestore = FirestoreService.subscribeToSnapshot(uid, async (snapshot: any) => {
                        console.log("[Store] ⚡ Snapshot Beacon Received (Metrics Update)");
                        set((currentState) => ({
                            profile: { ...currentState.profile, ...snapshot.profile },
                            dailyLoad: { ...currentState.dailyLoad, ...snapshot.dailyLoad }
                        }));
                    });

                    // B. RTDB LISTENER REMOVED (Legacy Kill Switch)
                    // We no longer listen to activeSession != null to kill local session.
                    // Presence is now decoupled.

                    // Combined Cleanup
                    const cleanup = () => {
                        unsubscribeFirestore();
                    };

                    return { unsubscribeSnapshot: cleanup };
                });
            },

            openAuthModal: (mode = 'LOGIN', onSuccess) => set({ authModal: { isOpen: true, mode, onSuccess } }),
            closeAuthModal: () => set((state) => ({ authModal: { ...state.authModal, isOpen: false, onSuccess: undefined } })),

            healAccount: async () => {
                const uid = get().authState.user?.id || get().ownerUid;
                const authUser = get().authState.user;
                if (!authUser) return;

                console.log("[Store] Starting Account Healing Process...");

                try {
                    await FirestoreService.healUserMetrics(authUser.id);

                    // Clear Local Storage
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('academic-system-storage');

                        // Force Purge Flag update to prevent stale reads
                        localStorage.setItem('academic-system-storage-purged-v2', 'true');

                        console.log("[Store] Storage purged. Reloading...");
                        window.location.reload();
                    }
                } catch (e) {
                    console.error("[Store] Healing failed:", e);
                }
            }
        }),
        {
            name: 'academic-system-storage', // Key in localStorage
            storage: createJSONStorage(() => localStorage), // Persist to browser
            partialize: (state) => ({
                // PHASE 4: PERSISTENCE SAFETY
                // Whitelist infrastructure state + ACTIVE SESSION

                // 1. Identity & Auth
                ownerUid: state.ownerUid,
                authState: state.authState,

                // 2. UI Preferences
                isAdminMode: state.isAdminMode,

                // 3. Transient UI
                authModal: { ...state.authModal, onSuccess: undefined },

                // 4. ACTIVE SESSION (CRITICAL FOR SESSION LOCK)
                activeSession: state.activeSession,
                terminationState: state.terminationState,
                isServerConfirmedSession: state.isServerConfirmedSession,
                creationWindowUntil: state.creationWindowUntil,

                // EXPLICITLY OMIT: subjects, lectures, sessions, profile, dailyLoad
                // This ensures F5 reload triggers a fresh fetch/listener via RootGate,
                // and prevents cross-user contamination in localStorage.
            })
        }
    )
);
