
// Simulation Script for Cognitive Load Engine Validation
// Self-contained logic to ensure strict adherence to the current codebase state.

// --- MOCK ENGINE LOGIC (COPIED FROM SOURCE) ---

const BASE_MULTIPLIER = 2.0;
const MIN_VALID_RATIO = 0.25;

function calculateExpectedTime(lectureDuration: number, cumulativeIndex: number, difficulty: number): number {
    const baseExpected = lectureDuration * BASE_MULTIPLIER;

    // First session logic handled outside or assumed via cumulativeIndex default
    // Multiplier Logic
    let multiplier = 1.0;
    const ci = cumulativeIndex;

    if (ci >= 8.5) multiplier = 0.85;
    else if (ci >= 7.0) multiplier = 0.95;
    else if (ci >= 5.5) multiplier = 1.0;
    else if (ci >= 4.0) multiplier = 1.15;
    else multiplier = 1.3;

    // Clamp
    if (multiplier < 0.85) multiplier = 0.85;
    if (multiplier > 1.3) multiplier = 1.3;

    const difficultyFactor = 1 + (difficulty * 0.05);
    return Math.round(baseExpected * multiplier * difficultyFactor);
}

function evaluateSession(actualMinutes: number, expectedMinutes: number, lectureDuration: number, difficulty: number) {
    // 🚨 RULE: ANTI-ABUSE
    if (actualMinutes < lectureDuration * MIN_VALID_RATIO) {
        return {
            cognitiveLoadIndex: 0,
            performanceGrade: 'D',
            isValid: false
        };
    }

    const timeRatio = actualMinutes / expectedMinutes;
    let rawIndex = 3.0;

    if (timeRatio <= 0.85) rawIndex = 9.5;
    else if (timeRatio <= 1.0) rawIndex = 8.5;
    else if (timeRatio <= 1.15) rawIndex = 7.5;
    else if (timeRatio <= 1.4) rawIndex = 6.0;
    else if (timeRatio <= 1.8) rawIndex = 4.5;
    else rawIndex = 3.0;

    const difficultyPenalty = difficulty * 0.15;
    let cognitiveLoadIndex = rawIndex - difficultyPenalty;

    // 🚨[CRITICAL VALIDITY GUARD] LECTURE DURATION HARD FLOOR
    if (actualMinutes < lectureDuration) {
        if (cognitiveLoadIndex > 7.9) {
            cognitiveLoadIndex = 7.9;
        }
    }

    // Clamp 0-10
    if (cognitiveLoadIndex < 0) cognitiveLoadIndex = 0;
    if (cognitiveLoadIndex > 10) cognitiveLoadIndex = 10;

    let grade = 'D';
    if (cognitiveLoadIndex >= 9) grade = 'A+';
    else if (cognitiveLoadIndex >= 8) grade = 'A';
    else if (cognitiveLoadIndex >= 7) grade = 'B+';
    else if (cognitiveLoadIndex >= 6) grade = 'B';
    else if (cognitiveLoadIndex >= 5) grade = 'C+';
    else if (cognitiveLoadIndex >= 4) grade = 'C';
    else grade = 'D';

    return {
        cognitiveLoadIndex: Number(cognitiveLoadIndex.toFixed(1)),
        performanceGrade: grade,
        isValid: true
    };
}

function computeNewCumulativeIndex(historyIndices: number[]) {
    // Last 5 valid
    if (historyIndices.length === 0) return 5.0;
    const window = historyIndices.slice(-5);
    const sum = window.reduce((a, b) => a + b, 0);
    return Number((sum / window.length).toFixed(1));
}

// --- SIMULATION RUNNER ---

interface SessionResult {
    id: number;
    lectureDuration: number;
    difficulty: number;
    actualTime: number;
    expectedTime: number;
    index: number;
    grade: string;
    rollingLoad: number;
    multiplierEffect: string;
    note: string;
}

const RESULTS: SessionResult[] = [];
const HISTORY_INDICES: number[] = [];

// Generators
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// SCENARIO DEFINITIONS
// We need 100 distinct scenarios.
// 1-10: Onboarding (Improving)
// 11-20: High Difficulty Struggle
// 21-30: Overburn (Short sessions constraint testing)
// 31-40: Recovery
// 41-50: Perfect Streak
// 51-60: Random Chaos
// 61-70: Long Lectures
// 71-80: Micro Lectures
// 81-90: Adaptive Stability Test
// 91-100: Final Exam Prep (Mixed)

let currentCumulative = 5.0; // Start neutral

for (let i = 1; i <= 100; i++) {
    let duration = 60;
    let difficulty = 5;
    let actual = 60;
    let note = "Standard";

    // Scenario Logic
    if (i <= 10) {
        // Improvement
        duration = 45;
        difficulty = 3 + Math.floor(i / 3);
        // They get faster relative to expected
        const exp = calculateExpectedTime(duration, currentCumulative, difficulty);
        actual = Math.round(exp * (1.2 - (i * 0.05)));
        note = "Onboarding - Improving Speed";
    } else if (i <= 20) {
        // Struggle
        duration = 60;
        difficulty = 8;
        const exp = calculateExpectedTime(duration, currentCumulative, difficulty);
        actual = Math.round(exp * 1.5);
        note = "High Difficulty Struggle";
    } else if (i <= 30) {
        // Constraint Testing (Guard)
        duration = 30;
        difficulty = 5;
        // Actual < Duration
        actual = duration - randInt(1, 10);
        note = "Guard Test: Actual < Duration";
    } else if (i <= 40) {
        // Recovery
        duration = 45;
        difficulty = 4;
        const exp = calculateExpectedTime(duration, currentCumulative, difficulty);
        actual = Math.round(exp * 0.9);
        note = "Recovery Phase";
    } else if (i <= 50) {
        // Perfect Streak
        duration = 60;
        difficulty = 7;
        const exp = calculateExpectedTime(duration, currentCumulative, difficulty);
        actual = Math.round(exp * 0.82); // Aiming for > 0.85 ratio
        note = "Perfect Efficiency";
    } else if (i <= 60) {
        // Chaos
        duration = randInt(20, 90);
        difficulty = randInt(1, 10);
        const exp = calculateExpectedTime(duration, currentCumulative, difficulty);
        actual = Math.round(exp * (randInt(50, 150) / 100));
        note = "Random Variance";
    } else if (i <= 70) {
        // Long Lectures
        duration = 120;
        difficulty = 8;
        const exp = calculateExpectedTime(duration, currentCumulative, difficulty);
        actual = Math.round(exp * 1.1);
        note = "Deep Work / Long Duration";
    } else if (i <= 80) {
        // Micro Lectures (Invalid check)
        duration = 15;
        difficulty = 2;
        actual = randInt(2, 5); // Below 25% of 15 (3.75)
        note = "Invalid: Micro Session Failure";
    } else if (i <= 90) {
        // Stability
        duration = 60;
        difficulty = 5;
        const exp = calculateExpectedTime(duration, currentCumulative, difficulty);
        actual = exp;
        note = "Stability Check";
    } else {
        // Final Mix
        duration = 50;
        difficulty = randInt(4, 9);
        const exp = calculateExpectedTime(duration, currentCumulative, difficulty);
        actual = Math.round(exp * 0.95);
        note = "Final Review";
    }

    // --- EVALUATION ---
    const expected = calculateExpectedTime(duration, currentCumulative, difficulty);
    const result = evaluateSession(actual, expected, duration, difficulty);

    // Update History for Cumulative (if valid)
    if (result.isValid) {
        HISTORY_INDICES.push(result.cognitiveLoadIndex);
    }

    // Compute NEW cumulative (post-session)
    const newCumulative = computeNewCumulativeIndex(HISTORY_INDICES);

    // Determine Multiplier Direction
    let multiDir = "Neutral";
    if (newCumulative > currentCumulative + 0.5) multiDir = "Down (Efficient)"; // Higher index -> Lower multiplier
    else if (newCumulative < currentCumulative - 0.5) multiDir = "Up (Remedial)"; // Lower index -> Higher multiplier

    currentCumulative = newCumulative;

    RESULTS.push({
        id: i,
        lectureDuration: duration,
        difficulty,
        actualTime: actual,
        expectedTime: expected,
        index: result.cognitiveLoadIndex,
        grade: result.performanceGrade,
        rollingLoad: currentCumulative,
        multiplierEffect: multiDir,
        note: result.isValid ? note : `INVALID: ${note}`
    });
}

// --- OUTPUT ---
console.log("| # | Dur | Diff | Act | Exp | Idx | Grd | Rolling | Mult | Note |");
console.log("|---|---|---|---|---|---|---|---|---|---|");
RESULTS.forEach(r => {
    console.log(`| ${r.id} | ${r.lectureDuration} | ${r.difficulty} | ${r.actualTime} | ${r.expectedTime} | ${r.index} | ${r.grade} | ${r.rollingLoad} | ${r.multiplierEffect} | ${r.note} |`);
});
