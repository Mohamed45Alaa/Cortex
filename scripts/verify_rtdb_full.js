const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// 1. Load Env (Hack to avoid installing dotenv)
const envPath = path.join(__dirname, '../.env.local');
let databaseURL = '';
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/NEXT_PUBLIC_FIREBASE_DATABASE_URL=(.*)/);
    if (match && match[1]) {
        databaseURL = match[1].trim();
    }
}

if (!databaseURL) {
    console.error("Could not find NEXT_PUBLIC_FIREBASE_DATABASE_URL in .env.local");
    process.exit(1);
}

// 2. Init Admin
const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
    console.error("Service Account not found");
    process.exit(1);
}
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL
});

const db = admin.database();
const firestore = admin.firestore();
const auth = admin.auth();

const MODE = process.argv[2];
const ARG = process.argv[3];

async function monitor() {
    console.log(`[MONITOR] Listening to ${databaseURL}/status...`);
    const ref = db.ref('status');

    ref.on('child_changed', (snap) => {
        const uid = snap.key;
        const val = snap.val();
        console.log(`[UPDATE] ${uid} -> State: ${val.state} | Session: ${val.activeSession ? 'ACTIVE (' + val.activeSession.lectureId + ')' : 'NULL'}`);
    });

    ref.on('child_added', (snap) => {
        const uid = snap.key;
        const val = snap.val();
        console.log(`[NEW] ${uid} -> State: ${val.state}`);
    });

    // Keep alive
    setInterval(() => { }, 10000);
}

async function promote() {
    if (!ARG) {
        console.error("Please provide email");
        process.exit(1);
    }
    try {
        const user = await auth.getUserByEmail(ARG);
        await firestore.collection('users').doc(user.uid).collection('profile').doc('main').set({
            role: 'ADMIN'
        }, { merge: true });
        console.log(`[SUCCESS] Promoted ${ARG} to ADMIN`);
        process.exit(0);
    } catch (e) {
        console.error("Error:", e.message);
        process.exit(1);
    }
}

if (MODE === 'monitor') {
    monitor();
} else if (MODE === 'promote') {
    promote();
} else {
    console.log("Usage: node verify.js [monitor|promote] [email]");
    process.exit(1);
}
