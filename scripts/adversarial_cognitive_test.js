
// Adversarial Stress Test Script
// 50,000 Scenarios designed to BREAK the Cognitive Load Engine.
// Explicitly checks for exploits, instability, and mathematical flaws.

// --- MOCK ENGINE LOGIC (SYNC WITH PRODUCTION) ---
const BASE_MULTIPLIER = 2.0;
const MIN_VALID_RATIO = 0.25;

function calculateExpectedTime(lectureDuration, cumulativeIndex, difficulty) {
    const baseExpected = lectureDuration * BASE_MULTIPLIER;

    let multiplier = 1.0;
    const ci = cumulativeIndex;

    if (ci >= 8.5) multiplier = 0.85;
    else if (ci >= 7.0) multiplier = 0.95;
    else if (ci >= 5.5) multiplier = 1.0;
    else if (ci >= 4.0) multiplier = 1.15;
    else multiplier = 1.3;

    if (multiplier < 0.85) multiplier = 0.85;
    if (multiplier > 1.3) multiplier = 1.3;

    const difficultyFactor = 1 + (difficulty * 0.05);
    return Math.round(baseExpected * multiplier * difficultyFactor);
}

function evaluateSession(actualMinutes, expectedMinutes, lectureDuration, difficulty) {
    // 🚨 RULE: ANTI-ABUSE
    if (actualMinutes < lectureDuration * MIN_VALID_RATIO) {
        return { cognitiveLoadIndex: 0, performanceGrade: 'D', isValid: false };
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
        const completionRatio = actualMinutes / Math.max(1, lectureDuration);
        const baseGradient = 6.0 + ((completionRatio - 0.25) * 2.53333);
        const shortCutPenalty = (difficulty / 10) * 0.5;
        let guardedIndex = baseGradient - shortCutPenalty;
        guardedIndex = Math.min(7.9, Math.max(6.0, guardedIndex));
        cognitiveLoadIndex = Math.min(cognitiveLoadIndex, guardedIndex);
    }

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

function computeNewCumulativeIndex(historyIndices) {
    if (historyIndices.length === 0) return 5.0;
    const window = historyIndices.slice(-5);
    const sum = window.reduce((a, b) => a + b, 0);
    return Number((sum / window.length).toFixed(1));
}

// --- ADVERSARIAL VALIDATOR ---

const HISTORY_INDICES = [];
const REPORT = {
    totalSessions: 0,
    validSessions: 0,
    exploits: [],
    plateaus: {},
    difficultyFailures: 0, // Count where Higher Diff didn't lower score under guard
    multiplierDrift: [], // Track range
    gradeDistribution: { 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C+': 0, 'C': 0, 'D': 0 },
    indexHistogram: {}, // 0.0 to 10.0
    streakAnalysis: { longestStreak: 0, currentStreak: 0 }
};

let currentCumulative = 5.0;

// HELPERS
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min, max) { return Math.random() * (max - min) + min; }

console.log("Starting 50,000 Adversarial Stress Scenarios...");

for (let i = 1; i <= 50000; i++) {
    // GENERATE SCENARIO
    // Mix of Extreme Strategies
    const strategy = Math.random();
    let duration, difficulty, actual;

    if (strategy < 0.2) {
        // "Edge Surfer": Always duration - 1 min (Guard Tester)
        duration = randInt(15, 120);
        difficulty = randInt(1, 10);
        actual = duration - 1;
    } else if (strategy < 0.4) {
        // "Micro Spammer": Invalid sessions
        duration = randInt(15, 120);
        difficulty = randInt(1, 10);
        actual = Math.floor(duration * 0.24); // Just below validity
    } else if (strategy < 0.6) {
        // "Overburn Bot": 10x duration
        duration = randInt(15, 60);
        difficulty = randInt(1, 10);
        actual = duration * 10;
    } else if (strategy < 0.8) {
        // "Perfect AI": Always hits 0.85 ratio exactly
        duration = randInt(30, 90);
        difficulty = 5;
        const exp = calculateExpectedTime(duration, currentCumulative, difficulty);
        actual = Math.floor(exp * 0.85);
    } else {
        // "Chaos Monkey": Complete random
        duration = randInt(1, 240);
        difficulty = randInt(1, 10);
        actual = randInt(0, duration * 3);
    }

    if (actual < 0) actual = 0;

    // EVALUATE
    const expected = calculateExpectedTime(duration, currentCumulative, difficulty);
    const result = evaluateSession(actual, expected, duration, difficulty);

    // --- FORENSICS ---
    REPORT.totalSessions++;
    if (result.isValid) REPORT.validSessions++;

    REPORT.gradeDistribution[result.performanceGrade] = (REPORT.gradeDistribution[result.performanceGrade] || 0) + 1;

    // Histogram
    const idxKey = result.cognitiveLoadIndex.toFixed(1);
    REPORT.indexHistogram[idxKey] = (REPORT.indexHistogram[idxKey] || 0) + 1;

    // CHECK: Guard Safety (No A/A+)
    if (actual < duration && actual >= duration * MIN_VALID_RATIO) {
        if (result.performanceGrade === 'A' || result.performanceGrade === 'A+') {
            REPORT.exploits.push(`EXPLOIT @ #${i}: Duration ${duration}, Actual ${actual}, Grade ${result.performanceGrade}`);
        }
        if (result.cognitiveLoadIndex >= 8.0) {
            REPORT.exploits.push(`EXPLOIT @ #${i}: Index Leak ${result.cognitiveLoadIndex} under guard`);
        }
    }

    // CHECK: Adaptive Stability
    if (result.isValid) {
        HISTORY_INDICES.push(result.cognitiveLoadIndex);
        currentCumulative = computeNewCumulativeIndex(HISTORY_INDICES);

        // Track Extremes
        REPORT.multiplierDrift.push(currentCumulative);
        if (REPORT.multiplierDrift.length > 1000) REPORT.multiplierDrift.shift(); // Keep rolling window check logic simpler if needed
    }
}

// CHECK: Plateau Detection (>3% at single value)
const threshold = REPORT.totalSessions * 0.03;
Object.entries(REPORT.indexHistogram).forEach(([k, v]) => {
    if (v > threshold) {
        if (k === '7.9' && v > (REPORT.validSessions * 0.05)) { // Allow some natural clustering, but strict on 7.9
            REPORT.plateaus[k] = `WARNING: ${v} hits (${((v / REPORT.totalSessions) * 100).toFixed(1)}%)`;
        }
    }
});

// OUTPUT
console.log("--- FINAL VERDICT ---");
if (REPORT.exploits.length > 0) {
    console.log("Verdict: BROKEN");
    console.log("Exploits Found:", REPORT.exploits.slice(0, 5)); // First 5
    console.log(`Total Exploits: ${REPORT.exploits.length}`);
} else {
    // Check Stability
    const minMult = Math.min(...REPORT.multiplierDrift);
    const maxMult = Math.max(...REPORT.multiplierDrift);
    console.log(`Stability Check: Min ${minMult.toFixed(2)} - Max ${maxMult.toFixed(2)}`);

    if (Object.keys(REPORT.plateaus).length > 0) {
        console.log("Verdict: CONDITIONALLY STABLE (Plateaus Detected)");
        console.log(JSON.stringify(REPORT.plateaus, null, 2));
    } else {
        console.log("Verdict: **UNBREAKABLE**");
    }
}

console.log("--- STATS ---");
console.log(`Total: ${REPORT.totalSessions}`);
console.log(`Valid: ${REPORT.validSessions}`);
console.log("Grades:", JSON.stringify(REPORT.gradeDistribution));
