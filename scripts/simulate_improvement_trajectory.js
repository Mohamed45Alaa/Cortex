
// Improvement Trajectory Credit - Simulation & Validation Script
// Simulating 1,000 longitudinal student histories to test "Improvement Credit" logic.

// --- 1. CORE ENGINE (UNMODIFIED) --- 
const BASE_MULTIPLIER = 2.0;
const MIN_VALID_RATIO = 0.25;

function calculateBaseExpected(lectureDuration, cumulativeIndex, difficulty) {
    const baseExpected = lectureDuration * BASE_MULTIPLIER;

    let multiplier = 1.0;
    const ci = cumulativeIndex;

    if (ci >= 8.5) multiplier = 0.85;
    else if (ci >= 7.0) multiplier = 0.95;
    else if (ci >= 5.5) multiplier = 1.0;
    else if (ci >= 4.0) multiplier = 1.15;
    else multiplier = 1.3;

    // Safety Clamp (Original)
    if (multiplier < 0.85) multiplier = 0.85;
    if (multiplier > 1.3) multiplier = 1.3;

    const difficultyFactor = 1 + (difficulty * 0.05);
    return Math.round(baseExpected * multiplier * difficultyFactor);
}

// --- 2. ADDITIVE IMPROVEMENT LOGIC (THE DESIGN) ---

/**
 * Calculates the Improvement Credit based on history.
 * Rules:
 * - Consecutive sessions (last 3+)
 * - Difficulty band ±1
 * - Actual Time decreasing strictly
 * - Credit caps at 0.2 (20% reduction of overhead)
 * - Reset on any failure
 */
function calculateImprovementCredit(history) {
    if (history.length < 3) return 0;

    let streak = 0;
    let current = history[history.length - 1]; // Last session

    // traceback
    for (let i = history.length - 2; i >= 0; i--) {
        const prev = history[i];

        // 1. Difficulty Check
        if (Math.abs(current.difficulty - prev.difficulty) > 1) break;

        // 2. Improvement Check (Strict Time Decrease)
        // We also check if they are "slow" students (Efficiency > 1.0) 
        // because "improving" when you are already fast isn't the target?
        // Prompt says "allow chronically slow students...". 
        // Let's enforce that credit only builds if they are strictly decreasing time.
        if (current.actualMinutes < prev.actualMinutes) {
            streak++;
            current = prev; // Step back
        } else {
            break;
        }
    }

    // Credit Logic
    // Streak >= 2 (implies 3 sessions: A > B, B > C) -> Credit
    if (streak >= 2) {
        // 0.05 per streak step?
        // Streak 2 (3 sessions) -> 0.05
        // Streak 3 (4 sessions) -> 0.10
        // ...
        let credit = (streak - 1) * 0.05;
        if (credit > 0.20) credit = 0.20; // Cap
        return credit;
    }

    return 0;
}

// --- 3. SIMULATION RUNNER ---

const STUDENTS = [];
const SIM_COUNT = 1000;
const SESSIONS_PER_STUDENT = 30;

// Stats
const RESULTS = {
    improved: 0,
    stalled: 0,
    regressed: 0,
    creditEarnedSessions: 0,
    totalSessions: 0,
    avgStartingRatio: 0,
    avgEndingRatio: 0
};

console.log(`Starting ${SIM_COUNT} Student Simulations (${SESSIONS_PER_STUDENT} sessions/each)...`);

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

for (let s = 0; s < SIM_COUNT; s++) {
    const student = {
        id: s,
        history: [],
        baseSpeedMultiple: 1.5 + (Math.random() * 0.5), // Starts Slow (1.5x to 2.0x of expected)
        learningRate: 0.01 + (Math.random() * 0.02), // Improves 1-3% per session naturally
        volatility: Math.random() * 0.1, // Random noise
        isGamer: Math.random() < 0.05 // 5% try to game it
    };

    // Gamer logic: Alternates good/bad or manipulates difficulty

    let cumulativeIndex = 5.0; // Neutral start

    for (let i = 0; i < SESSIONS_PER_STUDENT; i++) {
        // 1. Session Setup
        const duration = 60; // Keep constant for trend clarity, or vary slightly

        let difficulty = 5;
        if (student.isGamer) {
            // Gamers try to farm low diff? But credit requires diff stability.
            difficulty = randInt(4, 6);
        } else {
            difficulty = randInt(4, 6); // Keep mostly stable for this test to allow credit
        }

        // 2. Calculate Expectations
        const rawExpected = calculateBaseExpected(duration, cumulativeIndex, difficulty);

        // APPLY CREDIT
        const credit = calculateImprovementCredit(student.history);
        RESULTS.creditEarnedSessions += (credit > 0 ? 1 : 0);
        RESULTS.totalSessions++;

        // Adjusted Expectation (The Trajectory Helper)
        // We reduce the "Multiplier" portion.
        // Effective = Raw * (1 - Credit)? No, Raw includes mult.
        // We want to reduce the penalty.
        // Let's say Credit reduces the final Time.
        const adjustedExpected = Math.round(rawExpected * (1.0 - credit));

        // Guard: Never below Baseline (Lecture * 2)
        const baseline = duration * 2;
        const finalTarget = Math.max(baseline, adjustedExpected);

        // 3. Student Performance (Actual)
        let actual;

        // Natural Improvement
        const currentCap = Math.max(0.8, student.baseSpeedMultiple - (i * student.learningRate));
        const noise = 1.0 + (Math.random() * student.volatility * (Math.random() > 0.5 ? 1 : -1));

        if (student.isGamer && i % 3 === 0) {
            // Gamer tanks every 3rd session to reset baseline?
            actual = Math.round(duration * 2 * 1.5);
        } else {
            actual = Math.round(duration * 2 * currentCap * noise);
        }

        // Store
        student.history.push({
            actualMinutes: actual,
            expectedMinutes: finalTarget, // We record what was shown to them
            difficulty: difficulty,
            ratio: actual / baseline // Track vs absolute baseline
        });

        // update (simulated) Cum Index
        // Simply push valid updates
    }

    STUDENTS.push(student);
}

// --- 4. ANALYZE ---

STUDENTS.forEach(s => {
    const start = s.history[0].ratio;
    const end = s.history[s.history.length - 1].ratio;

    RESULTS.avgStartingRatio += start;
    RESULTS.avgEndingRatio += end;

    if (end < start - 0.1) RESULTS.improved++;
    else if (end > start + 0.1) RESULTS.regressed++;
    else RESULTS.stalled++;
});

RESULTS.avgStartingRatio /= SIM_COUNT;
RESULTS.avgEndingRatio /= SIM_COUNT;

console.log("--- RESULTS ---");
console.log(JSON.stringify(RESULTS, null, 2));

console.log("\n--- VERDICT CHECK ---");
if (RESULTS.creditEarnedSessions === 0) console.log("WARNING: Logic too strict, no credit earned.");
else console.log(`SUCCESS: Credit earned in ${((RESULTS.creditEarnedSessions / RESULTS.totalSessions) * 100).toFixed(1)}% of sessions.`);

if (RESULTS.improved / SIM_COUNT > 0.5) console.log("SUCCESS: Majority improved.");
else console.log("WARNING: Improvement rate low.");

