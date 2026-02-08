// Manual Visual Testing Script
// Run this in Chrome DevTools Console while on http://localhost:3000

console.log('🧪 Starting Manual Tests...\n');

// Test 1: Check Current Page State
console.log('📋 TEST 1: Page State');
console.log('Current URL:', window.location.href);
console.log('Page Title:', document.title);
console.log('---\n');

// Test 2: Check for Session Timer
console.log('📋 TEST 2: Session Timer Check');
const sessionTimer = document.querySelector('[class*="SessionTimer"]') ||
    document.querySelector('[class*="session"]') ||
    document.querySelector('button:has-text("Start")');
console.log('Session Timer Found:', !!sessionTimer);
console.log('---\n');

// Test 3: Check for Video Player
console.log('📋 TEST 3: Video Player Check');
const videoPlayer = document.querySelector('video') ||
    document.querySelector('[class*="Player"]') ||
    document.querySelector('[class*="player"]');
console.log('Video Player Found:', !!videoPlayer);
if (videoPlayer) {
    console.log('Video is playing:', !videoPlayer.paused);
    console.log('Video src:', videoPlayer.src);
}
console.log('---\n');

// Test 4: Check Store State (if available)
console.log('📋 TEST 4: Store State');
try {
    // Try to access Zustand store from window
    if (window.__ZUSTAND_STORE__) {
        console.log('Store found:', window.__ZUSTAND_STORE__);
    } else {
        console.log('Store not exposed to window (normal)');
    }
} catch (e) {
    console.log('Cannot access store:', e.message);
}
console.log('---\n');

// Test 5: Monitor Store Changes
console.log('📋 TEST 5: Setting up Store Monitor');
console.log('To monitor store changes, open React DevTools > Components > find useStore');
console.log('Then check these values:');
console.log('- activeSession?.isActive (should be true when session running)');
console.log('- uiState.activeToolId (should be "player" when video opened)');
console.log('- uiState.isMediaPlaying (should be true when video playing)');
console.log('---\n');

console.log('✅ Manual test script complete!');
console.log('\n📝 NEXT STEPS:');
console.log('1. Start a session');
console.log('2. Wait 2 minutes');
console.log('3. End session');
console.log('4. Check if results screen appears');
console.log('5. Open video player');
console.log('6. Load a video (DO NOT play yet)');
console.log('7. Check Focus Architecture → Should see YELLOW');
console.log('8. Press Play');
console.log('9. Check Focus Architecture → Should see GREEN');
console.log('10. Press Pause');
console.log('11. Check Focus Architecture → Should see YELLOW again');
