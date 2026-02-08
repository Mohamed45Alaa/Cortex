# CDP Testing Instructions

## Prerequisites
1. Chrome running with remote debugging on port 9222
2. Application running on http://localhost:3000

## Quick Start

```bash
# Navigate to project
cd "e:\Courses\Acadimic system"

# Run the CDP test
node cdp-test.js
```

## What It Does

The script will:
- ✅ Connect to your existing Chrome via CDP
- ✅ Navigate to http://localhost:3000
- ✅ Take screenshots of current state
- ✅ Discover UI elements (buttons, navigation)
- ✅ Check for video player
- ✅ Monitor console logs
- ✅ Save all screenshots to `test-results/` folder

## Expected Output

```
🔌 Connecting to Chrome via CDP at 127.0.0.1:9222...
✅ Connected successfully!

📋 TEST 1: Checking initial page state...
   ✅ Screenshot saved: 01-initial-state.png
   URL: http://localhost:3000
   Title: Academic System

📋 TEST 2: Looking for session controls...
   ✅ Start button found
   ✅ Screenshot saved: 02-session-started.png

📋 TEST 3: Looking for video player...
   ℹ️  No video element currently visible

📋 TEST 4: Checking for store state...
   React DevTools available: true

📋 TEST 5: Discovering UI elements...
   Found 15 buttons
   Found 8 navigation elements
   Button labels: Start Session, Settings, Profile, Logout

📋 TEST 6: Monitoring console...
   ✅ Console monitoring active

📸 Final screenshot saved: 99-final-state.png

============================================================
📊 TEST SUMMARY
============================================================
✅ Connected to Chrome via CDP
✅ Navigated to application
✅ 3 screenshots saved to test-results/
============================================================
```

## Screenshots Location

All screenshots will be saved in:
```
e:\Courses\Acadimic system\test-results\
```

Files:
- `01-initial-state.png` - Dashboard/landing page
- `02-session-started.png` - After clicking start (if found)
- `03-video-player.png` - If video element exists
- `99-final-state.png` - Final state

## Manual Testing Still Required

The script can't fully automate these:
1. **Session completion** (needs 2-min wait)
2. **Video file upload** (needs actual file)
3. **Focus Architecture color check** (needs visual inspection)

After running the script, **manually verify**:
- Session → Results screen appears
- Video paused → Yellow segment
- Video playing → Green segment
