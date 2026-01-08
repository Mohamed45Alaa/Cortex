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
    status: 'IN_PROGRESS' | 'COMPLETED' | 'INTERRUPTED';

    /** The calculated expected time based on baseline * relativeDifficulty */
    expectedDuration: number;

    /** How long it actually took vs Predicted */
    actualDuration: number;

    /** The computed cost extracted from the user */
    cognitiveCost: number;

    /** 
     * 0-100. Efficiency Metric.
     * Calculated by EndSessionEngine based on Actual vs Expected duration.
     * 90-100 = Excellent, <40 = Critical Inefficiency.
     */
    performanceIndex: number;

    /** 
     * 0-100. Self-reported focus or system-derived efficiency.
     * Low focus increases cost but decreases stability gain.
     */
    /** 
     * 0-100. Self-reported focus or system-derived efficiency.
     * Low focus increases cost but decreases stability gain.
     */
    focusPerformance: number;

    preUnderstanding?: number;
    postUnderstanding?: number;
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
    name: string;  // Display
    role: UserRole;
    avatarUrl?: string; // Visual

    // Academic Context
    university?: string;
    faculty?: string;
    academicTrack?: string;

    createdAt: string;
}

export interface AuthContextState {
    status: 'GUEST' | 'AUTHENTICATED';
    user: UserProfile | null;
    token: string | null; // For API calls
}
