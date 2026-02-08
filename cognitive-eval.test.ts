// Test Cases for New Cognitive Evaluation System
import { CognitiveLoadEngine } from './CognitiveLoadEngine';

console.log('🧪 Running Test Cases for Zone-Based Evaluation System\n');

const tests = [
    // TEST 1: Golden Zone - At lecture duration
    { L: 60, A: 60, E: 120, expected: { score: 10, grade: 'A+', color: 'green' }, desc: 'Golden Zone: A=L' },

    // TEST 2: Golden Zone - Minimum boundary
    { L: 60, A: 50, E: 120, expected: { score: 10, grade: 'A+' }, desc: 'Golden Zone: A=50 (minimum)' },

    // TEST 3: Golden Zone - At expected time
    { L: 60, A: 120, E: 120, expected: { score: 10, grade: 'A+', color: 'green' }, desc: 'Golden Zone: A=E' },

    // TEST 4: Cheating Zone
    { L: 60, A: 40, E: 120, expected: { score: 8.8, grade: 'A' }, desc: 'Cheating Zone: A=40' },

    // TEST 5: Deep Learner Zone
    { L: 60, A: 150, E: 120, expected: { score: 9.1, grade: 'A+', color: 'blue' }, desc: 'Deep Learner: A=150' },

    // TEST 6: Smart Fast Zone (for L < 50)
    { L: 40, A: 45, E: 80, expected: { score: 10, grade: 'A+' }, desc: 'Smart Fast: L=40, A=45' },

    // TEST 7: Very Deep Learner
    { L: 60, A: 200, E: 120, expected: { score: 7.6, grade: 'A', color: 'blue' }, desc: 'Very Deep: A=200' },

    // TEST 8: Edge of Cheating
    { L: 60, A: 30, E: 120, expected: { score: 7.8 }, desc: 'Cheating Edge: A=30' },

    // TEST 9: Extreme Cheating
    { L: 60, A: 10, E: 120, expected: { score: 5.0 }, desc: 'Extreme Cheating: A=10 (floor at 5)' },
];

let passed = 0;
let failed = 0;

tests.forEach((test, index) => {
    const result = CognitiveLoadEngine.evaluateSession(test.A, test.E, test.L, 5);

    const scoreMatch = Math.abs(result.cognitiveLoadIndex - test.expected.score) < 0.2;
    const gradeMatch = !test.expected.grade || result.performanceGrade === test.expected.grade;
    const colorMatch = !test.expected.color || result.color === test.expected.color;

    if (scoreMatch && gradeMatch && colorMatch) {
        console.log(`✅ Test ${index + 1}: ${test.desc}`);
        console.log(`   Score: ${result.cognitiveLoadIndex} (expected ~${test.expected.score})`);
        console.log(`   Grade: ${result.performanceGrade}, Color: ${result.color}`);
        console.log(`   Message: ${result.message?.substring(0, 50)}...`);
        passed++;
    } else {
        console.log(`❌ Test ${index + 1}: ${test.desc}`);
        console.log(`   Got: Score=${result.cognitiveLoadIndex}, Grade=${result.performanceGrade}, Color=${result.color}`);
        console.log(`   Expected: Score~${test.expected.score}, Grade=${test.expected.grade}, Color=${test.expected.color}`);
        failed++;
    }
    console.log('');
});

console.log(`\n${'='.repeat(60)}`);
console.log(`📊 RESULTS: ${passed} passed, ${failed} failed`);
console.log(`${'='.repeat(60)}`);

if (failed === 0) {
    console.log('✨ All tests passed! System is working correctly.');
} else {
    console.log('⚠️ Some tests failed. Review the logic.');
}
