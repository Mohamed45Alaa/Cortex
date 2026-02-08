/**
 * CORE DATA MODELS - ACADEMIC COGNITIVE CONTROL SYSTEM
 * Version: 1.0.0-PROD
 * Reference: PHASE_1_SYSTEM_ARCHITECTURE.md
 * 
 * This file acts as the immutable contract between the Persistence Layer (Store)
 * and the Calculation Layer (Engines).
 */

// --- 1. Primitive Enums & Types ---

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type MentalLoad = 'Low' | 'Medium' | 'High';
export type LectureType = 'Theory' | 'Practical' | 'Revision';
export type FlowMode = 'ORIENTATION' | 'DASHBOARD' | 'FOCUS' | 'RECOVERY';
export type LectureStudyMode = 'achievement' | 'standard' | 'importance';

// --- 2. Configuration Objects (The Rules of Physics) ---

export interface SubjectConfig {
    /**
     * Determines how the TimePredictionEngine predicts duration.
     * - Relaxed: Adds 20% buffer.
     * - Standard: Base multiplier.
     * - Military: Reduces time by 15% (Compression).
     */
    strictnessLevel: 'Relaxed' | 'Standard' | 'Military';

    /**
     * Percentage (0-100) of Daily Capacity allowed for this specific subject.
     * Used by CognitiveLoadEngine to trigger subject-specific lockouts.
     */
    cognitiveThreshold: number;

    /**
     * Determines the resurfacing rhythm for lectures.
     * - Spaced-Repetition: Standard forgetting curve.
     * - Just-in-Time: Only when dependencies are needed.
     * - Aggressive: Weekly review regardless of stability.
     */
    revisionRule: 'Spaced-Repetition' | 'Just-in-Time' | 'Aggressive';

    /**
     * Scales the cognitive cost calculations.
     * - Standard: 1.0x
     * - Intensive: 1.5x (Deep work required)
     * - Review-Only: 0.5x (Skimming)
     */
    lectureTreatment: 'Standard' | 'Intensive' | 'Review-Only';

    /**
     * Absolute hard cap on load.
     */
    maxDailyLoad: 'Low' | 'Medium' | 'High';
}

// --- 3. Academic Entities (The Inventory) ---

export interface Lecture {
    id: string;
    subjectId: string;
    title: string;
    type: LectureType;
    createdAt: string; // ISO Date required for History Timeline
    index?: number; // Auto-assigned (Optional to support runtime calculation fallback)

    /** base viewing/reading time in minutes, before Strictness multipliers */
    duration: number;

    /** 
     * Relative Difficulty (0-10).
     * Representative of "Mental Effort" required for THIS student relative to their baseline.
     * 0 = Trivial, 5 = Standard/Neutral, 10 = Maximum possible difficulty.
     */
    relativeDifficulty: number;

    /** [DETERMINISTIC] 0-10 derived from Duration (15m=1.667 -> 120m=10) */
    timeDifficulty?: number;

    /** [DETERMINISTIC] 0-10 derived from User Input (11 - Understanding) */
    understandingDifficulty?: number;

    /** [DETERMINISTIC] 0-10 Personal Performance Index */
    /** [DETERMINISTIC] Grade based on Cognitive Index */
    grade?: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D';


    /**
     * Derived system state.
     * - Pending: Not started.
     * - Active: In progress / In current learning cycle.
     * - Mastered: Stability > 90%.
     * - Archived: Manual removal.
     */
    status: 'Pending' | 'Active' | 'Mastered' | 'Archived';

    /** 0-100. Decays over time (Ebbinghaus). 100 = Perfect Recall. */
    stability: number;

    /** Calculated weight (Duration * Diff). Persisted to avoid recalc. */
    cognitiveWeight: number;

    /** 
     * [FIXED BASELINE] 
     * The Expected Study Time computed ONCE at creation.
     * Rule: Duration * 2 (First-Time Student Rule).
     * This is the Single Source of Truth for pre-study expectations.
     */
    expectedDuration: number;

    /**
     * [STUDY MODE SYSTEM v2.0]
     * Selected study mode determines time multiplier.
     * - achievement: 1.5× (easy lectures)
     * - standard: 2× (default, official evaluation)
     * - importance: 2.5× (difficult lectures)
     */
    studyMode?: LectureStudyMode;
    multiplier?: number;              // 1.5 | 2.0 | 2.5
    customExpectedTime?: number;      // duration × multiplier
    recommendedMode?: LectureStudyMode;      // Platform recommendation
    recommendationReason?: string;    // Why recommended

    lastRevision?: string; // ISO Date
}

export interface SubjectMetrics {
    /** aggregated stability of all active lectures */
    stability: number;
    /** probability of exam success based on coverage & stability */
    readiness: number;
    /** accumulated cognitive mass of the subject */
    totalWeight: number;
    /** days remaining until exam */
    nextExamCountdown?: number;
}

export interface Subject {
    id: string;
    name: string;
    examDate: string;
    difficulty: Difficulty;

    // The "Brain" of the subject - Controls functionality
    config: SubjectConfig;

    // The "Body" of the subject - Reflects health
    metrics: SubjectMetrics;
}

// --- 4. User Telemetry (The Biological State) ---

export interface StudentProfile {
    /** 
     * A rolling average of rule-adherence. 
     * Drops heavily on Overrides. Increases on successful Session completions.
     * Used by TimePredictionEngine to adjust confidence intervals.
     */
    consistencyIndex: number; // 0-100
    learningPhase: 'INIT' | 'NOVICE' | 'ADAPTIVE'; // [CRITICAL ARCHITECTURE] Persistent State

    /** 
     * [ADAPTIVE ENGINE] 
     * Rolling average of cognitive load index (Last 5 valid sessions).
     * Used for calculating the multiplier for future sessions.
     * Scale: 0-10
     */
    cumulativeIndex?: number;

    totalSessions: number;

    /** 
     * The User's current "Battery Level".
     * Computed by CapacityEngine (Max - Load - Fatigue).
     * If 0, System Trigger HARD LOCKOUT.
     */
    currentCapacity: number; // 0-100

    lastSessionDate?: string;
}

// --- 5. Session Data (The Log) ---

export interface StudySession {
    id: string;
    lectureId: string; // Keep for reference, butparentId preferred? let's keep both or alias
    parentId: string; // LEC_x or SEC_x ID
    subjectId: string;
    date: string; // ISO Date of completion (endTime)

    startTime: number; // Timestamp
    endTime: number | null; // Timestamp
    status: 'IN_PROGRESS' | 'COMPLETED' | 'INTERRUPTED' | 'FORCED_END';

    /** The calculated expected time based on baseline * relativeDifficulty */
    expectedDuration: number;

    /** How long it actually took vs Predicted */
    actualDuration: number;

    /** [DETERMINISTIC] Actual time recorded by stopwatch */
    measuredDuration?: number;

    /** The computed cost extracted from the user */
    cognitiveCost: number;

    /** [ADAPTIVE ENGINE] 'A+' | 'A' ... 'D' */
    performanceGrade?: string;

    /** [ANTI-ABUSE] False if session was < 25% duration */
    isValid?: boolean;

    /** [CRITICAL VALIDITY GUARD] False if force-ended or system-killed */
    isValidForMetrics?: boolean;

    /** Who terminated the session */
    endedBy?: 'USER' | 'ADMIN' | 'SYSTEM';

    /** 
     * 0-100. Self-reported focus or system-derived efficiency.
     * Low focus increases cost but decreases stability gain.
     */
    focusPerformance: number;

    preUnderstanding?: number;
    postUnderstanding?: number;

    // --- FORENSIC ANALYSIS DATA ---
    segments?: SessionSegment[];
    collectionRate?: number; // 0-100 (Effective Time / Total Time)
}

// --- FORENSIC ANALYSIS TYPES ---
export type SegmentType = 'ACTIVE' | 'TOOL' | 'IDLE' | 'DISENGAGED';

export interface SessionSegment {
    startTime: number;
    endTime: number | null; // null if current
    type: SegmentType;
    duration: number; // Computed on close (ms)
}

export interface DailyLoad {
    date: string; // YYYY-MM-DD

    /** Sum of all session costs today */
    totalCognitiveCost: number;

    /**
     * Safe: < 80% Capacity
     * Warning: 80-99% Capacity
     * Risk: > 100% capacity (Soft Lockout)
     */
    status: 'Safe' | 'Warning' | 'Risk';
}

// --- 6. Identity & Access (The Keys) ---

export type UserRole = 'GUEST' | 'STUDENT' | 'ADMIN';

export interface UserProfile {
    id: string;
    email: string; // Identity
    name: string;  // Display Name (Google)
    fullName?: string; // Official Arabic Name (3-part)
    role: UserRole;
    avatarUrl?: string; // Visual
    phone?: string; // Contact (Legacy/Flat)

    // Academic Context
    academicYear?: "Year 1" | "Year 2" | "Year 3" | "Year 4" | "Year 5";
    university?: string;
    faculty?: string;
    academicTrack?: string;

    completed?: boolean; // undefined = Unknown/Loading, false = New, true = Done
    createdAt: string;

    // ✅ PHASE 2: IDENTITY HARDENING (Strict Schema)
    identity?: {
        fullName: string;
        phone: string;
        email: string;
    };

    // ✅ PHASE 5: FUTURE RANKING (Schema Only)
    rank?: number;       // 1-7 (Placeholder)
    lastActive?: number; // Timestamp (Placeholder)

    // ✅ ADDED FOR ADMIN / REALTIME
    study?: StudyState;
    presence?: PresenceState;
}


export interface AuthContextState {
    status: 'GUEST' | 'AUTHENTICATED' | 'LOADING';
    user: UserProfile | null;
    token: string | null;
}

// --- 7. Real-Time Monitoring & Admin (New System) ---

// --- 7. Real-Time Monitoring & Admin (Dual Layer System) ---

export type PresenceStatus = 'online' | 'background' | 'offline';
export type StudyMode = 'in_session' | 'browsing' | 'idle' | 'none';

export interface PresenceState {
    status: PresenceStatus;
    lastSeenAt: any; // Firestore Timestamp
}

export interface StudyState {
    mode: StudyMode;
    lastInteractionAt: any; // Firestore Timestamp
    sessionActive: boolean;
    startTime?: any; // Firestore Timestamp or number
}

// Admin Aggregated View
export interface StudentMonitorData extends UserProfile {
    presence: PresenceState;
    study: StudyState;
}

export interface SessionRecord {
    id: string; // Document ID
    startedAt: any;
    endedAt: any | null;
    duration: number | null; // Minutes
    isActive: boolean;
}

export interface Subscription {
    isActive: boolean;
    plan: 'FREE' | 'PRO' | 'ENTERPRISE' | null;
    startedAt: any | null;
    expiresAt: any | null;
}

// UserProfile Extension (Optional for backward compatibility in types)
export interface UserProfileWithMeta extends UserProfile {
    presence?: PresenceState;
    subscription?: Subscription;
}

