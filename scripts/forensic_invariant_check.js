
// Forensic Invariant Check Script
// 50,000 Scenarios to strictly verify the "No A/A+ under Guard" invariant.

// --- MOCK ENGINE LOGIC (Verified against src/core/engines/CognitiveLoadEngine.ts) ---
const BASE_MULTIPLIER = 2.0;
const MIN_VALID_RATIO = 0.25;

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

        // Match exact production code: 2.533
        const baseGradient = 6.0 + ((completionRatio - 0.25) * 2.533);

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

// --- FORENSIC AUDIT ---

console.log("Starting Forensic Invariant Verification (50,000 Scenarios)...");

const METRICS = {
    totalGuardedSessions: 0,
    gradesUnderGuard: { 'A+': 0, 'A': 0, 'B+': 0 }, // Tracking B+ just for info
    violations: []
};


function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

for (let i = 1; i <= 50000; i++) {
    // Generate Diverse Scenarios
    const duration = randInt(15, 120);
    const difficulty = randInt(1, 10);

    // Only care about simulating < Duration cases mostly, but let's mix random to be fair
    // Actually, to verify the INVARIANT, we should spam the edge cases.
    let actual = randInt(1, duration * 2);

    // Force plenty of "Just below duration" cases where Ratio is high (0.95-0.99)
    // These are the most likely to leak an A if the guard failed.
    if (Math.random() < 0.5) {
        actual = Math.round(duration * (0.9 + (Math.random() * 0.09))); // 0.90 to 0.99
    }

    if (actual < 1) actual = 1;

    // Evaluate
    // Mock Expected (doesn't matter much for ratio calculation, but matters for Raw Index base)
    // Let's assume standard expected (2x)
    const expected = duration * 2;

    const result = evaluateSession(actual, expected, duration, difficulty);

    // CHECK INVARIANT
    if (actual < duration) {
        METRICS.totalGuardedSessions++;

        if (result.performanceGrade === 'A') {
            METRICS.gradesUnderGuard['A']++;
            METRICS.violations.push({ duration, actual, index: result.cognitiveLoadIndex, grade: result.performanceGrade });
        }
        else if (result.performanceGrade === 'A+') {
            METRICS.gradesUnderGuard['A+']++;
            METRICS.violations.push({ duration, actual, index: result.cognitiveLoadIndex, grade: result.performanceGrade });
        }
        else if (result.performanceGrade === 'B+') {
            METRICS.gradesUnderGuard['B+']++;
        }
    }
}

console.log("--- FORENSIC REPORT ---");
console.log(`Total Guarded Sessions: ${METRICS.totalGuardedSessions}`);
console.log(`Count of A grades under guard: ${METRICS.gradesUnderGuard['A']}`);
console.log(`Count of A+ grades under guard: ${METRICS.gradesUnderGuard['A+']}`);

if (METRICS.gradesUnderGuard['A'] === 0 && METRICS.gradesUnderGuard['A+'] === 0) {
    console.log("Verdict: GUARD INVARIANT HOLDS");
} else {
    console.log("Verdict: GUARD VIOLATION DETECTED");
    console.log("Sample Violations:", METRICS.violations.slice(0, 5));
}
