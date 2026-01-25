import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// CONFIG
const ENV_PATH = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(ENV_PATH, 'utf8');
const getEnv = (key) => {
    const match = envContent.match(new RegExp(`${key}=(.*)`));
    return match ? match[1].trim() : null;
}

const PROJECT_ID = getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
const DATABASE_URL = getEnv('NEXT_PUBLIC_FIREBASE_DATABASE_URL');
const PRIVATE_KEY = getEnv('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n').replace(/"/g, '');
const CLIENT_EMAIL = getEnv('FIREBASE_CLIENT_EMAIL');

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

async function inspect() {
    console.log(`\n🔍 INSPECTING SYSTEM [${new Date().toISOString()}]`);
    console.log("---------------------------------------------------");

    // 1. RTDB STATUS (Who does the Server think is online?)
    console.log("\n📡 RTDB STATUS (Live Presence):");
    const statusSnap = await rtdb.ref('status').get();
    const statusData = statusSnap.val() || {};
    const onlineUids = [];

    if (Object.keys(statusData).length === 0) {
        console.log("   (Empty)");
    } else {
        Object.entries(statusData).forEach(([uid, data]) => {
            console.log(`   - [${uid}]`);
            console.log(`     State: ${data.state}`);
            console.log(`     LastSeen: ${new Date(data.lastSeenAt).toISOString()}`);
            if (data.activeSession) {
                console.log(`     Session: ${data.activeSession.sessionId} (${data.activeSession.status || 'RUNNING'})`);
            }
            if (data.state === 'online') onlineUids.push(uid);
        });
    }

    // 2. FIRESTORE PROFILES (Who satisfies the AdminMetrics query?)
    console.log("\n📂 FIRESTORE PROFILES (Admin Visibility):");
    const profilesSnap = await db.collectionGroup('profile').get();
    const profileUids = [];

    profilesSnap.docs.forEach(doc => {
        const uid = doc.ref.parent.parent.id;
        const role = doc.data().role;
        profileUids.push(uid);
        console.log(`   - [${uid}] Role: ${role} | Name: ${doc.data().name || doc.data().fullName}`);
    });

    // 3. ANALYSIS
    console.log("\n🧠 AUTOMATED ANALYSIS:");

    // Check Visibility
    onlineUids.forEach(uid => {
        if (!profileUids.includes(uid)) {
            console.warn(`   ⚠️  INVISIBLE USER DETECTED: [${uid}] is Online in RTDB but has NO Firestore Profile.`);
        } else {
            console.log(`   ✅ Online User [${uid}] is visible.`);
        }
    });

    // Check Stale Data
    const NOW = Date.now();
    Object.entries(statusData).forEach(([uid, data]) => {
        if (data.state === 'online' && (NOW - data.lastSeenAt > 5 * 60 * 1000)) {
            console.warn(`   💀 GHOST USER DETECTED: [${uid}] marked Online but last seen > 5m ago.`);
        }
    });

    console.log("\n---------------------------------------------------");
    process.exit(0);
}

inspect().catch(console.error);
