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

/**
 * CENTRAL SYSTEM STORE
 * Reference: PHASE_1_SYSTEM_ARCHITECTURE.md
 * 
 * This store contains the distinct "Planes" of data:
 * 1. Profile Plane (User)
 * 2. Inventory Plane (Subjects/Lectures)
 * 3. Log Plane (Sessions/DailyLoad)
 * 
 * It strictly enforces atomic updates.
 */

interface SystemState {
    // --- STATE SLICES ---

    profile: StudentProfile;
    subjects: Subject[];
    lectures: Lecture[]; // Normalized list of all lectures
    sessions: StudySession[];
    dailyLoad: DailyLoad; // Current Day's Accumulator

    // --- AUTHENTICATION ---
    authState: AuthContextState;
    authModal: { isOpen: boolean; mode: 'LOGIN' | 'REGISTER'; onSuccess?: () => void };

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
    endActiveSession: () => void; // Finalizes the session
    pauseActiveSession: () => void;
    resumeActiveSession: () => void;
    deleteLecture: (lectureId: string) => void;
    clearActiveSession: () => void;

    // --- AUTH ACTIONS ---
    login: (email: string, pass: string) => Promise<boolean>;
    loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
    register: (identity: any, profile: any) => Promise<boolean>;
    logout: () => void;
    syncAuth: () => void;

    // --- UI ACTIONS ---
    openAuthModal: (mode?: 'LOGIN' | 'REGISTER', onSuccess?: () => void) => void;
    closeAuthModal: () => void;
}

export const useStore = create<SystemState>()(
    persist(
        (set, get) => ({
            // --- INITIAL STATE ---

            profile: {
                consistencyIndex: 85, // Start with B grade compliance
                totalSessions: 0,
                currentCapacity: 100, // Fresh battery
                lastSessionDate: new Date().toISOString()
            },
            subjects: [],
            lectures: [],
            sessions: [],
            dailyLoad: {
                date: new Date().toISOString().split('T')[0],
                totalCognitiveCost: 0,
                status: 'Safe'
            },


            // Initialize from Service (Synchronous part, usually guest)
            authState: { status: 'GUEST', user: null, token: null },
            authModal: { isOpen: false, mode: 'LOGIN', onSuccess: undefined },

            activeSession: null,

            // --- ACTIONS ---

            addSubject: (subject) => set((state) => ({
                subjects: [...state.subjects, subject]
            })),

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

            addLecture: (lecture) => set((state) => ({
                lectures: [...state.lectures, lecture]
            })),

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
            startActiveSession: (lectureId, durationMinutes, subjectId) => set(() => ({
                activeSession: {
                    lectureId,
                    subjectId, // Explicitly stored
                    startTime: Date.now(),
                    originalDuration: durationMinutes,
                    pausedAt: null, // Start running
                    totalPausedTime: 0,
                    isActive: true
                }
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

            endActiveSession: () => set((state) => {
                console.log("[STORE] endActiveSession triggered. Active:", state.activeSession);
                if (!state.activeSession) return {};

                const now = Date.now();
                // Calculate net duration
                let netDuration = now - state.activeSession.startTime;
                if (state.activeSession.pausedAt) {
                    netDuration -= (now - state.activeSession.pausedAt);
                }
                netDuration -= state.activeSession.totalPausedTime;

                const finalMinutes = Math.max(1, Math.round(netDuration / 60000));

                // Logic: < 15m => INTERRUPTED, else COMPLETED
                const status = finalMinutes < 15 ? 'INTERRUPTED' : 'COMPLETED';

                const newSession: StudySession = {
                    id: crypto.randomUUID(),
                    lectureId: state.activeSession.lectureId,
                    parentId: state.activeSession.lectureId, // Assuming 1:1 for now
                    subjectId: "derived_later_or_lookup", // Ideally store activeSession has subjectId
                    date: new Date().toISOString(),
                    startTime: state.activeSession.startTime,
                    endTime: now,
                    expectedDuration: state.activeSession.originalDuration,
                    actualDuration: finalMinutes,
                    cognitiveCost: finalMinutes * 1.5, // Mock cost logic or import Engine? Keep simple for store.
                    performanceIndex: 0, // Engine should calculate this
                    focusPerformance: 100,
                    status: status
                };

                // Look up subjectId from lecture
                // Look up subjectId from stored session or lecture lookup
                if (state.activeSession.subjectId) {
                    newSession.subjectId = state.activeSession.subjectId;
                } else {
                    const lecture = state.lectures.find(l => l.id === state.activeSession?.lectureId);
                    if (lecture) {
                        newSession.subjectId = lecture.subjectId;
                        console.log("[STORE] Found Lecture for SubjectID via Lookup:", lecture.subjectId);
                    } else {
                        console.error("[STORE] Lecture NOT FOUND for ID:", state.activeSession?.lectureId);
                    }
                }

                console.log("[STORE] Saving New Session:", newSession);

                return {
                    sessions: [...state.sessions, newSession],
                    activeSession: null
                };
            }),

            deleteLecture: (lectureId) => set((state) => ({
                lectures: state.lectures.filter(l => l.id !== lectureId),
                sessions: state.sessions.filter(s => s.lectureId !== lectureId)
            })),

            clearActiveSession: () => set(() => ({ activeSession: null })),



            // --- AUTH IMPLEMENTATION ---
            login: async (email, pass) => {
                try {
                    const result = await AuthService.login(email, pass);
                    set({ authState: result });
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
                set({ authState: { status: 'GUEST', user: null, token: null } });
            },

            syncAuth: () => {
                // Return unsubscriber?
                AuthService.initCallback((newState) => {
                    set({ authState: newState });
                });
            },

            openAuthModal: (mode = 'LOGIN', onSuccess) => set({ authModal: { isOpen: true, mode, onSuccess } }),
            closeAuthModal: () => set((state) => ({ authModal: { ...state.authModal, isOpen: false, onSuccess: undefined } }))
        }),
        {
            name: 'academic-system-storage', // Key in localStorage
            storage: createJSONStorage(() => localStorage), // Persist to browser
            partialize: (state) => ({
                // Omit authModal.onSuccess which is not serializable
                ...state,
                authModal: { ...state.authModal, onSuccess: undefined }
            })
        }
    )
);
