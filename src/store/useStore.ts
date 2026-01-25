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
    UserProfile
} from '@/core/types';
import { AuthService } from '@/core/services/AuthService';
import { FirestoreService } from '@/core/services/FirestoreService';
import { getDatabaseInstance } from '@/core/services/firebase';
import { ref, onValue } from 'firebase/database';
import { CognitiveEngine } from '@/core/engines/CognitiveEngine';

// --- ADMIN STATE SLICE ---
interface AdminSlice {
    students: UserProfile[];
    selectedStudent: UserProfile | null;
    isAdminMode: boolean; // UI Toggle
    adminError: string | null; // Error State for UI Feedback

    // Actions
    fetchStudents: () => Promise<void>;
    selectStudent: (student: UserProfile | null) => void;
    setAdminMode: (isActive: boolean) => void;
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

    // --- ACTIVE SESSION (PERSISTENCE) ---
    activeSession: {
        lectureId: string;
        subjectId: string; // Explicitly Added
        startTime: number;     // Timestamp when session started
        originalDuration: number; // Planned minutes
        pausedAt: number | null; // Timestamp if currently paused, else null
        totalPausedTime: number; // Accumulated pause duration in ms
        isActive: boolean;     // Redundant but helpful? Keep for clarity.
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
    endActiveSession: (penalty?: boolean, isRemoteKill?: boolean, terminationPayload?: { reason: string; message: string; severity?: 'warning' | 'info' }) => void; // Finalizes the session
    pauseActiveSession: () => void;
    resumeActiveSession: () => void;
    deleteLecture: (lectureId: string) => void;
    clearActiveSession: () => void;
    clearTermination: () => void;

    // --- AUTH ACTIONS ---
    login: (email: string, pass: string) => Promise<boolean>;
    loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
    register: (identity: any, profile: any) => Promise<boolean>;
    logout: () => void;
    syncAuth: () => void;
    initializeRealtimeSync: (uid: string) => void;

    // --- UI ACTIONS ---
    openAuthModal: (mode?: 'LOGIN' | 'REGISTER', onSuccess?: () => void) => void;
    closeAuthModal: () => void;
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

            ownerUid: null,
            isHydrated: false,

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
                // FIRESTORE SYNC (Recursive & Atomic)
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {
                    // Update Snapshot Stats (Decrease count potentially, or just touch)
                    const nextSnapshot = {
                        profile: state.profile,
                        dailyLoad: state.dailyLoad
                    };
                    FirestoreService.deleteSubjectRecursive(user.id, id, nextSnapshot);
                }

                return {
                    subjects: state.subjects.filter(s => s.id !== id),
                    lectures: state.lectures.filter(l => l.subjectId !== id),
                    sessions: state.sessions.filter(s => s.subjectId !== id)
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

                // 3. Determine Risk Status (Simple check, complex logic in CognitiveLoadEngine)
                // This is a naive safeguard. Real status is set by Engine before passing here.
                let status: DailyLoad['status'] = 'Safe';
                if (newCost > 100) status = 'Risk';
                else if (newCost > 80) status = 'Warning';

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

            // --- REMOTE TERMINATION STATE ---
            terminationState: null as { reason: string; message: string; severity?: 'warning' | 'info' } | null,

            // --- ACTIVE SESSION ACTIONS ---
            startActiveSession: (lectureId, durationMinutes, subjectId) => set(() => ({
                activeSession: {
                    lectureId,
                    subjectId, // Explicitly stored
                    startTime: Date.now(),
                    originalDuration: durationMinutes,
                    pausedAt: null, // Start running
                    totalPausedTime: 0,
                    isActive: true
                },
                // PROBLEM 2 FIX: CLEAR TERMINATION STATE
                // New session = Clean slate. Historical bans must not block new attempts.
                terminationState: null,
                // Also clear any legacy error
                adminError: null
            })),

            pauseActiveSession: () => set((state) => {
                if (!state.activeSession || state.activeSession.pausedAt) return {};
                return {
                    activeSession: {
                        ...state.activeSession,
                        pausedAt: Date.now()
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
                        totalPausedTime: state.activeSession.totalPausedTime + pauseDuration
                    }
                };
            }),

            endActiveSession: (penalty = false, isRemoteKill = false, terminationPayload) => set((state) => {
                console.log("[STORE] endActiveSession triggered.", { active: !!state.activeSession, penalty, isRemoteKill, hasPayload: !!terminationPayload });

                // REMOTE KILL: Immediate Reset (Server has already handled data)
                if (isRemoteKill) {
                    return {
                        activeSession: null,
                        terminationState: terminationPayload || null
                    };
                }

                if (!state.activeSession) return {};

                const now = Date.now();
                // 1. Calculate net duration
                let netDuration = now - state.activeSession.startTime;
                if (state.activeSession.pausedAt) {
                    netDuration -= (now - state.activeSession.pausedAt);
                }
                netDuration -= state.activeSession.totalPausedTime;
                const actualMinutes = Math.max(1, Math.round(netDuration / 60000));

                // 2. Fetch Context (Lecture/Subject)
                const lecture = state.lectures.find(l => l.id === state.activeSession?.lectureId);
                if (!lecture) {
                    console.error("CRITICAL: Lecture not found for active session.");
                    return { activeSession: null };
                }

                // 3. EXECUTE COGNITIVE ENGINE (The wiring)
                let metrics = CognitiveEngine.calculate({
                    lectureDuration: lecture.duration,
                    actualDuration: actualMinutes,
                    relativeDifficulty: lecture.relativeDifficulty,
                    studentIndex: lecture.cognitiveIndex || null
                });

                // PENALTY OVERRIDE (Forced Close)
                if (penalty) {
                    metrics = {
                        ...metrics,
                        performanceGrade: 'C', // "Least Grade C"
                        performanceIndex: 0,   // "Failure"
                        cognitiveLoadIndex: 100 // "Maximum Penalty"
                    };
                }

                console.log("[STORE] Cognitive Metrics Calculated:", metrics);

                // 4. Construct Final Session Record
                const newSession: StudySession = {
                    id: crypto.randomUUID(),
                    lectureId: lecture.id,
                    parentId: lecture.id,
                    subjectId: lecture.subjectId,
                    date: new Date().toISOString(),
                    startTime: state.activeSession.startTime,
                    endTime: now,
                    status: penalty ? 'INTERRUPTED' : (actualMinutes < 5 ? 'INTERRUPTED' : 'COMPLETED'),

                    // PERSISTED METRICS
                    expectedDuration: metrics.expectedStudyTimeMinutes,
                    actualDuration: actualMinutes,
                    cognitiveCost: metrics.cognitiveLoadIndex,
                    performanceIndex: metrics.performanceIndex,
                    focusPerformance: penalty ? 0 : 100,
                };

                // 5. UPDATE LECTURE STATE (Persistence of Result)
                const updatedLectures = state.lectures.map(l => {
                    if (l.id === lecture.id) {
                        return {
                            ...l,
                            status: 'Mastered',
                            cognitiveIndex: metrics.performanceIndex,
                            grade: metrics.performanceGrade,
                            lastRevision: new Date().toISOString(),
                            stability: Math.min(100, l.stability + 10)
                        } as Lecture;
                    }
                    return l;
                });

                // 6. FIRESTORE SYNC (The Missing Piece)
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {
                    // Prepare Snapshot
                    const nextProfile = {
                        ...state.profile,
                        totalSessions: state.profile.totalSessions + 1,
                        learningPhase: (state.profile.totalSessions + 1) >= 3 ? 'ADAPTIVE' :
                            (state.profile.totalSessions + 1) >= 1 ? 'NOVICE' : 'INIT',
                        lastSessionDate: new Date().toISOString()
                    };

                    const nextDailyLoad = {
                        ...state.dailyLoad,
                        totalCognitiveCost: state.dailyLoad.totalCognitiveCost + metrics.cognitiveLoadIndex,
                        // Recalculate status simply here or rely on registerSession logic? 
                        // For now, simple accumulation. Real guard logic is elsewhere.
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

                return {
                    sessions: [...state.sessions, newSession],
                    lectures: updatedLectures,
                    activeSession: null,
                    dailyLoad: {
                        ...state.dailyLoad,
                        totalCognitiveCost: state.dailyLoad.totalCognitiveCost + metrics.cognitiveLoadIndex
                    },
                    profile: {
                        ...state.profile,
                        totalSessions: state.profile.totalSessions + 1,
                        learningPhase: (state.profile.totalSessions + 1) >= 3 ? 'ADAPTIVE' :
                            (state.profile.totalSessions + 1) >= 1 ? 'NOVICE' : 'INIT',
                        lastSessionDate: new Date().toISOString()
                    }
                };
            }),

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
                                        profile: { ...state.profile, ...userData.stateSnapshot.profile },
                                        dailyLoad: { ...state.dailyLoad, ...userData.stateSnapshot.dailyLoad },
                                        subjects: userData.subjects.length > 0 ? userData.subjects : state.subjects,
                                        lectures: userData.lectures.length > 0 ? userData.lectures : state.lectures,
                                        sessions: userData.sessions.length > 0 ? userData.sessions : state.sessions
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
                                        dailyLoad: state.dailyLoad // Keep current load or 0 if fresh
                                    });
                                }

                                return {
                                    authState: { ...state.authState, user: updatedUser },
                                    profile: healedProfile,
                                    subjects: userData.subjects.length > 0 ? userData.subjects : state.subjects,
                                    lectures: userData.lectures.length > 0 ? userData.lectures : state.lectures,
                                    sessions: userData.sessions.length > 0 ? userData.sessions : state.sessions
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
            closeAuthModal: () => set((state) => ({ authModal: { ...state.authModal, isOpen: false, onSuccess: undefined } }))
        }),
        {
            name: 'academic-system-storage', // Key in localStorage
            storage: createJSONStorage(() => localStorage), // Persist to browser
            partialize: (state) => ({
                // PHASE 4: PERSISTENCE SAFETY
                // Whitelist ONLY infrastructure state.
                // ACADEMIC DATA IS MEMORY-ONLY (Relies on Firestore Hydration)

                // 1. Identity & Auth
                ownerUid: state.ownerUid,
                authState: state.authState,

                // 2. UI Preferences
                isAdminMode: state.isAdminMode,

                // 3. Transient UI
                authModal: { ...state.authModal, onSuccess: undefined },

                // EXPLICITLY OMIT: subjects, lectures, sessions, profile, dailyLoad
                // This ensures F5 reload triggers a fresh fetch/listener via RootGate,
                // and prevents cross-user contamination in localStorage.
            })
        }
    )
);
