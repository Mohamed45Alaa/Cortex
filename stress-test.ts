
import * as fs from 'fs';

// ==========================================
// 1. THE ENGINE (Exact Replica of Current Logic)
// ==========================================

const BASE_MULTIPLIER = 2.0;

function calculateExpectedTime(lectureDuration: number, difficulty: number): number {
    // Current Logic:
    // Base = Duration * 2
    // Multiplier (Assuming Average Student CI=5.0) -> 1.0
    // Difficulty Factor = 1 + (diff * 0.05)

    const base = lectureDuration * BASE_MULTIPLIER;
    const diffFactor = 1 + (difficulty * 0.05);
    return base * 1.0 * diffFactor; // Simplified for distinct student check
}

function evaluateSession(
    actualMinutes: number,
    expectedMinutes: number,
    lectureDuration: number,
    difficulty: number,
    segments: { active: number, tool: number, idle: number } // percentages 0-1
) {
    // 🚨 RULE: 1-MINUTE MINIMUM
    if (actualMinutes < 1) return 0;

    // STEP 1: TIME RATIO
    // Lower is better (faster)
    const timeRatio = actualMinutes / expectedMinutes;

    // STEP 2: PERFORMANCE SCORE MAPPING (10 = Best)
    let performanceScore = 5.0;

    if (timeRatio <= 0.85) performanceScore = 10.0;      // Fast -> Perfect
    else if (timeRatio <= 1.0) performanceScore = 9.0;   // On Time
    else if (timeRatio <= 1.15) performanceScore = 7.5;  // Slightly Slow
    else if (timeRatio <= 1.4) performanceScore = 6.0;   // Slow
    else if (timeRatio <= 1.8) performanceScore = 4.0;   // Very Slow
    else performanceScore = 2.0;                         // Fail

    let finalScore = performanceScore;

    // 🚨 RUSHING PENALTY (Recent Change)
    const safeMinDuration = Math.max(1, lectureDuration - 10);

    if (actualMinutes < safeMinDuration) {
        const missingTime = safeMinDuration - actualMinutes;
        const missingRatio = missingTime / safeMinDuration;
        const maxPossibleScore = 10.0 - (missingRatio * 10.0);
        finalScore = Math.min(finalScore, maxPossibleScore);
    }

    // IDLE PENALTY (Implicit in Time Ratio? No, Explicit Check Requested)
    // The prompt asks verify: If IDLE% ↑ -> Score MUST ↓
    // IMPORTANT: The current engine DOES NOT explicitly use Idle% in calculation!
    // It only uses Total Time.
    // If a student is IDLE, their Actual Time increases -> Ratio increases -> Score drops.
    // So distinct Logic Check: Does Idle *increase* Actual Time?
    // In this sim, 'Actual Duration' is TOTAL time (Active + Idle).

    return Math.max(0, Math.min(10, finalScore));
}

// ==========================================
// 2. SIMULATION
// ==========================================

const ITERATIONS = 1_000_000;
console.log(`🚀 Starting Stress Test with ${ITERATIONS.toLocaleString()} samples...`);

let violations = 0;
const worstInversions: any[] = [];
let sumActual = 0;
let sumScore = 0;

// Stats for Correlation
let xActual: number[] = []; // For sample subset
let yScore: number[] = [];

const startTime = Date.now();

for (let i = 0; i < ITERATIONS; i++) {
    // GENERATE INPUTS
    const lectureDuration = Math.floor(Math.random() * (120 - 15 + 1)) + 15; // 15-120
    const difficulty = Math.floor(Math.random() * 11); // 0-10

    // Actual Duration: Let's vary widely
    // Sometimes very short (rushing), sometimes very long (struggling)
    const actualDuration = Math.floor(Math.random() * 300) + 1; // 1-300m

    // Segments (Just for record, affect actualDuration interpretation?)
    // In our model, Actual Duration INCLUDES execution.
    // Let's assume 'Active Time' = Actual * (1 - Idle%)
    // But the Engine uses TOTAL Duration for Ratio.
    const idlePct = Math.random() * 0.8; // 0-80%

    // Calculate Score
    const expected = calculateExpectedTime(lectureDuration, difficulty);
    const score = evaluateSession(actualDuration, expected, lectureDuration, difficulty, { active: 1 - idlePct, tool: 0, idle: idlePct });

    // STATS ACCUMULATION
    if (i % 1000 === 0) { // Sample subset for memory safety
        xActual.push(actualDuration);
        yScore.push(score);
    }

    // ==========================================
    // 3. ASSERTIONS (The Rules)
    // ==========================================

    // RULE 1: Rushing Penalty Check
    // If Time < (Lecture - 10), Score should NOT be 10.
    if (actualDuration < (lectureDuration - 10) && score > 9.9) {
        violations++;
        if (worstInversions.length < 20) {
            worstInversions.push({
                type: "Rushing Loophole",
                lecture: lectureDuration,
                actual: actualDuration,
                score: score,
                msg: "Finished too fast yet got perfect score"
            });
        }
    }

    // RULE 2: Lazy vs Focused (Sanity)
    // Compare against a previous 'Reference' case occasionally?
    // Hard to compare across random samples.
    // Let's check monotonic basic:
    // If Ratio > 1.8 (Very Slow), Score SHOULD allow be Low (< 5).
    const ratio = actualDuration / expected;
    if (ratio > 1.8 && score > 5.0) {
        violations++;
        worstInversions.push({
            type: "Slacker Loophole",
            lecture: lectureDuration,
            actual: actualDuration,
            ratio: ratio.toFixed(2),
            score: score,
            msg: "Took way too long (>1.8x) yet got good score"
        });
    }
}

const duration = Date.now() - startTime;

// ==========================================
// 4. ANALYSIS
// ==========================================

console.log(`\n✅ Finished in ${(duration / 1000).toFixed(2)}s`);
console.log(`🔍 Analyzed ${ITERATIONS.toLocaleString()} sessions`);
console.log(`❌ Violations Found: ${violations}`);

if (violations === 0) {
    console.log("✨ LOGIC IS ROBUST. No direct inversions found.");
} else {
    console.log("⚠️ LOGIC HAS FLAWS.");
    console.log(worstInversions.slice(0, 5));
}

// CORRELATION (Pearson)
// Do we expect Positive or Negative?
// Current Logic: Longer Duration -> Higher Ratio -> LOWER Score.
// So Correlation(Duration, Score) should be NEGATIVE.
// Wait, user Prompt said: "actualDuration ↑ ... cognitiveLoad MUST ↑"
// BUT wait. 
// "CognitiveLoad" in prompt meant "Better Student" logic or "Raw Load"?
// User said: "Higher Cognitive Load → Better Student"
// So he expects: Higher Duration (more study) -> Higher Score?
// THIS IS THE CONFLICT.

// CURRENT ENGINE:
// Faster (Lower Duration) = Better Score (10).
// Slower (Higher Duration) = Worse Score (2).

// USER PROMPT:
// "A: studied 3 hours deeply vs B: studied 20 minutes superficially -> A must always get higher index."

// 🚨 CONFLICT DETECTED 🚨
// Current Engine rewards SPEED.
// User wants to reward EFFORT (Time).
// If I study 3 hours (Ratio 2.0 -> Score 2), I get D.
// If I study 20 mins (Ratio 0.2 -> Score 10), I get A+.

// The current logic is completely OPPOSITE to "Time = Effort = Good".
// Current logic is "Time = Struggle = Bad".

console.log("\n📉 CRITICAL LOGIC ALIGNMENT CHECK");
console.log("Current System: Efficiency Model (Faster is Better)");
console.log("User Request: Effort Model (Longer/Deep is Better)");
console.log("Result: The current engine FAILS the '3 hours > 20 mins' test.");
