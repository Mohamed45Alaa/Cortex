
import { CognitiveEngine } from './src/core/engines/CognitiveEngine';

const runTest = (name: string, actual: any, expected: any) => {
    const pass = actual === expected;
    console.log(`${pass ? '✅' : '❌'} ${name}: Expected ${expected}, Got ${actual}`);
};

console.log("--- COGNITIVE ENGINE VERIFICATION ---");

// 1. Time Difficulty
runTest("Time Diff 15m", CognitiveEngine.calculateTimeDifficulty(15), 1.667);
runTest("Time Diff 120m", CognitiveEngine.calculateTimeDifficulty(120), 10.000);
runTest("Time Diff 60m", CognitiveEngine.calculateTimeDifficulty(60), 6.668); // From Table

// 2. Understanding Difficulty (Inversion)
runTest("Understanding 1 -> Difficulty", CognitiveEngine.calculateUnderstandingDifficulty(1), 10);
runTest("Understanding 10 -> Difficulty", CognitiveEngine.calculateUnderstandingDifficulty(10), 1);
runTest("Understanding 5 -> Difficulty", CognitiveEngine.calculateUnderstandingDifficulty(5), 6);

// 3. Expected Study Time (CRITICAL FIX VERIFICATION)
// Case: 2 hours (120m), Understanding 1 (Inverted 10), TimeDiff 10 -> RelDiff 10
// Base = 120 * 2 = 240
// Scalar = 10 / 5 = 2
// Final = 480 mins (8 hours)

const dur = 120; // 2 hours
const und = 1; // Low understanding
const timeDiff = CognitiveEngine.calculateTimeDifficulty(dur); // Should be 10
const undDiff = CognitiveEngine.calculateUnderstandingDifficulty(und); // Should be 10
const relDiff = CognitiveEngine.calculateRelativeDifficulty(timeDiff, undDiff); // Should be 10

runTest("Critical Bug Case - RelDiff", relDiff, 10);
// Note: verify_cognitive needs to update the call to accept relativeDifficulty
runTest("Critical Bug Case - Expected Time", CognitiveEngine.calculateExpectedStudyTime(dur, relDiff), 480);

// Standard Case: 1 hour (60m), Understanding 5 (Inverted 6), TimeDiff 6.668 -> RelDiff 6.3
// Base = 120
// Scalar = 6.3 / 5 = 1.26
// Final = 151.2 -> 151
const durStd = 60;
const diffStd = 5; // Med diff
runTest("Standard Case - Expected Time", CognitiveEngine.calculateExpectedStudyTime(durStd, diffStd), Math.round(120 * (5 / 5)));

// Easy Case: 30m, Understanding 9 (Inverted 2) -> Diff Low
// Base = 60
// Scalar < 1
// Expect < 60


// 4. Cognitive Index & Grade
// Case: Expected 120 (2 hours)
// Standard: 120 mins -> Ratio 1.0 -> Index 9.0 (A)
// Fast: 60 mins -> Capped at 110 (10m early) -> Ratio 1.09 -> Index 10.0 (A+)
// Slow: 240 mins -> Ratio 0.5 -> Index 3.5 (D)

const expected = 120;

const actualFast = 60;
const indexFast = CognitiveEngine.calculateCognitiveIndex(expected, actualFast);
console.log(`Fast Student (Exp 120, Act 60) -> Index: ${indexFast} Grade: ${CognitiveEngine.determineGrade(indexFast)}`);
runTest("Fast Grade A+", CognitiveEngine.determineGrade(indexFast), 'A+');

const actualOnTime = 120;
const indexOnTime = CognitiveEngine.calculateCognitiveIndex(expected, actualOnTime);
console.log(`Standard Student (Exp 120, Act 120) -> Index: ${indexOnTime} Grade: ${CognitiveEngine.determineGrade(indexOnTime)}`);
runTest("Standard Grade A", CognitiveEngine.determineGrade(indexOnTime), 'A');

const actualSlow = 240;
const indexSlow = CognitiveEngine.calculateCognitiveIndex(expected, actualSlow);
console.log(`Slow Student (Exp 120, Act 240) -> Index: ${indexSlow} Grade: ${CognitiveEngine.determineGrade(indexSlow)}`);
runTest("Slow Grade D", CognitiveEngine.determineGrade(indexSlow), 'D');

// 5. Adaptive Logic (Part 9)
// Base = 120 * 2 = 240
// Diff 10 -> Multiplier 2.0 -> 480
// Fast Student (Index 9.5) -> 480 * 0.9 = 432
runTest("Adaptive Fast", CognitiveEngine.calculateExpectedStudyTime(120, 10, 9.5), 432);

// Slow Student (Index 3.0) -> 480 * 1.2 = 576
runTest("Adaptive Slow", CognitiveEngine.calculateExpectedStudyTime(120, 10, 3.0), 576);

// 6. Cognitive Load Score (Part 10)
// Exp 100, Act 100, Diff 10 -> (1.0) * (1.0) * 100 = 100
runTest("Load Score Max", CognitiveEngine.calculateCognitiveLoadScore(100, 100, 10), 100);

// Exp 100, Act 50 (Fast), Diff 5 -> (0.5) * (0.5) * 100 = 25
runTest("Load Score Efficient", CognitiveEngine.calculateCognitiveLoadScore(100, 50, 5), 25);
