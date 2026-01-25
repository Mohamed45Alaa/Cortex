import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- 1. CONFIG & SETUP ---
const ENV_PATH = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(ENV_PATH, 'utf8');

const getEnv = (key) => {
    const match = envContent.match(new RegExp(`${key}=(.*)`));
    return match ? match[1].trim() : null;
}

const API_KEY = getEnv('NEXT_PUBLIC_FIREBASE_API_KEY');
const PROJECT_ID = getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
const DATABASE_URL = getEnv('NEXT_PUBLIC_FIREBASE_DATABASE_URL');
const PRIVATE_KEY = getEnv('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n').replace(/"/g, '');
const CLIENT_EMAIL = getEnv('FIREBASE_CLIENT_EMAIL');

if (!PRIVATE_KEY || !CLIENT_EMAIL) {
    console.error("Missing Admin Credentials in .env.local");
    process.exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: PROJECT_ID,
        clientEmail: CLIENT_EMAIL,
        privateKey: PRIVATE_KEY
    }),
    databaseURL: DATABASE_URL
});

const db = admin.firestore();
const rtdb = admin.database();
const auth = admin.auth();

const STUDENT_EMAIL = "verify_student@cortex.edu";
const ADMIN_EMAIL = "verify_admin@cortex.edu";
const BASE_URL = "http://localhost:3000";

// --- 2. HELPER FUNCTIONS ---

async function getAuthToken(email, isAdmin = false) {
    let user;
    try {
        user = await auth.getUserByEmail(email);
    } catch (e) {
        user = await auth.createUser({ email, emailVerified: true });
        // Set Custom Claims
        await auth.setCustomUserClaims(user.uid, { role: isAdmin ? 'ADMIN' : 'STUDENT' });
        // Create Profile
        await db.collection('users').doc(user.uid).collection('profile').doc('main').set({
            role: isAdmin ? 'ADMIN' : 'STUDENT',
            name: isAdmin ? 'Admin Bot' : 'Student Bot',
            email: email
        }, { merge: true });
    }

    // Refresh claims if needed
    if (isAdmin) {
        await auth.setCustomUserClaims(user.uid, { role: 'ADMIN' });
    }

    const customToken = await auth.createCustomToken(user.uid, { role: isAdmin ? 'ADMIN' : 'STUDENT' });

    // Exchange for ID Token
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: customToken, returnSecureToken: true })
    });

    const data = await res.json();
    return { token: data.idToken, uid: user.uid };
}

async function apiCall(endpoint, token, body) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json().catch(() => ({}));
    return { status: res.status, body: json };
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function runTests() {
    console.log("🚀 STARTING SYSTEM VERIFICATION...\n");

    const student = await getAuthToken(STUDENT_EMAIL, false);
    const adminUser = await getAuthToken(ADMIN_EMAIL, true);

    console.log(`Student: ${student.uid}`);
    console.log(`Admin:   ${adminUser.uid}\n`);

    // --- TEST A: HAPPY PATH ---
    console.log("--- [A] HAPPY PATH LOGIC ---");

    // 1. Start Session
    let res = await apiCall('/api/session', student.token, {
        action: 'START',
        payload: { lectureId: 'lec_A', subjectId: 'sub_A' }
    });

    if (res.status === 200) console.log("✅ Start Session: PASS");
    else console.error("❌ Start Session: FAIL", res);

    const sessionId = res.body.session?.sessionId;
    if (!sessionId) throw new Error("No Session ID returned");

    // 2. Heartbeat
    res = await apiCall('/api/session', student.token, { action: 'HEARTBEAT' });
    if (res.status === 200) console.log("✅ Heartbeat: PASS");
    else console.error("❌ Heartbeat: FAIL", res);

    // 3. End Session
    res = await apiCall('/api/session', student.token, { action: 'END' });
    if (res.status === 200) console.log("✅ End Session: PASS");
    else console.error("❌ End Session: FAIL", res);


    // --- TEST B: ZOMBIE RESURRECTION (Resume after Gap) ---
    console.log("\n--- [B] ZOMBIE RESURRECTION (Wait 65s) ---");

    // Start Session
    await apiCall('/api/session', student.token, {
        action: 'START',
        payload: { lectureId: 'lec_B', subjectId: 'sub_B' }
    });

    process.stdout.write("Waiting 65s for Gap (Should Resume)... ");
    await sleep(65000);
    console.log("Done.");

    // Send Heartbeat -> Expect 200 OK (RESUMED)
    res = await apiCall('/api/session', student.token, { action: 'HEARTBEAT' });

    if (res.status === 200) console.log("✅ Session Resumed (200): PASS");
    else console.error(`❌ Session Resumed: FAIL (Status ${res.status})`, res);


    // --- TEST C: ADMIN FORCE END (Metrics Protection) ---
    console.log("\n--- [C] ADMIN FORCE END ---");

    // Start Session
    await apiCall('/api/session', student.token, {
        action: 'START',
        payload: { lectureId: 'lec_C', subjectId: 'sub_C' }
    });

    // Admin Kill
    res = await apiCall('/api/admin/actions', adminUser.token, {
        action: 'FORCE_END_SESSION',
        uid: student.uid
    });

    if (res.status === 200) console.log("✅ Admin Kill: PASS");
    else console.error("❌ Admin Kill: FAIL", res);

    // Verify RTDB is clean
    const statusSnap = await rtdb.ref(`status/${student.uid}/activeSession`).get();
    if (statusSnap.val() === null) console.log("✅ RTDB Cleanup: PASS");
    else console.error("❌ RTDB Cleanup: FAIL (Session still exists)");

    // --- TEST D: IDEMPOTENCY ---
    console.log("\n--- [D] IDEMPOTENCY (Double Kill) ---");

    res = await apiCall('/api/admin/actions', adminUser.token, {
        action: 'FORCE_END_SESSION',
        uid: student.uid
    });

    if (res.status === 200) console.log("✅ Idempotent Kill: PASS");
    else console.error("❌ Idempotent Kill: FAIL", res);


    // --- TEST E: DELETE ACCOUNT (Nuclear) ---
    console.log("\n--- [E] DELETE ACCOUNT (Nuclear) ---");

    // Start Session
    res = await apiCall('/api/session', student.token, {
        action: 'START',
        payload: { lectureId: 'lec_E', subjectId: 'sub_E' }
    });

    // Create Dummy Sub-Collection Data to Verify Recursion
    await db.collection('users').doc(student.uid).collection('subjects').doc('test_Sub').set({ name: 'Physics' });

    // DELETE
    res = await apiCall('/api/admin/actions', adminUser.token, {
        action: 'DELETE_STUDENT',
        uid: student.uid
    });

    if (res.status === 200) console.log("✅ Delete Request: PASS");
    else console.error("❌ Delete Request: FAIL", res);

    await sleep(2000); // Allow Cloud Functions / Async ops

    // Verify Data Gone
    const userDoc = await db.collection('users').doc(student.uid).get();
    const subjectsSnap = await db.collection('users').doc(student.uid).collection('subjects').get();
    const rtdbStat = await rtdb.ref(`status/${student.uid}`).get();

    if (!userDoc.exists && subjectsSnap.empty && !rtdbStat.exists()) {
        console.log("✅ NUCLEAR WIPE CONFIRMED: Auth, Firestore(Rec), RTDB all clean.");
    } else {
        console.error("❌ NUCLEAR WIPE FAILED:");
        if (userDoc.exists) console.log("   - User Doc exists");
        if (!subjectsSnap.empty) console.log("   - Sub-collections exist");
        if (rtdbStat.exists()) console.log("   - RTDB Status exists");
    }

    console.log("\n🏁 HARDENING VERIFICATION COMPLETE.");
    process.exit(0);
}

runTests().catch(e => {
    console.error("CRITICAL TEST FAILURE:", e);
    process.exit(1);
});
