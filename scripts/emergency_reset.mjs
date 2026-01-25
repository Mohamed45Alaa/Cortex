
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- 1. CONFIG & SETUP ---
// Mimic system_verification.mjs setup
const ENV_PATH = path.join(__dirname, '../.env.local');
let envContent;
try {
    envContent = fs.readFileSync(ENV_PATH, 'utf8');
} catch (e) {
    console.error("Could not read .env.local", e);
    process.exit(1);
}

const getEnv = (key) => {
    const match = envContent.match(new RegExp(`${key}=(.*)`));
    return match ? match[1].trim() : null;
}

const PRIVATE_KEY = getEnv('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n').replace(/"/g, '');
const CLIENT_EMAIL = getEnv('FIREBASE_CLIENT_EMAIL');
const PROJECT_ID = getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
const DATABASE_URL = getEnv('NEXT_PUBLIC_FIREBASE_DATABASE_URL');

if (!PRIVATE_KEY || !CLIENT_EMAIL) {
    console.error("Missing Admin Credentials");
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

const rtdb = admin.database();

async function emergencyReset() {
    console.log("🚨 STARTING EMERGENCY RESET...");
    const statusRef = rtdb.ref('status');
    const snapshot = await statusRef.once('value');

    if (!snapshot.exists()) {
        console.log("✅ No status data found. Clean.");
        process.exit(0);
    }

    const updates = {};
    let count = 0;

    snapshot.forEach((child) => {
        const uid = child.key;
        const data = child.val();

        if (data.sessionTermination || data.activeSession) {
            console.log(`[PURGE] Clearing flags for ${uid}`);
            updates[`${uid}/sessionTermination`] = null;
            updates[`${uid}/activeSession`] = null;
            updates[`${uid}/state`] = 'offline'; // Force offline to require fresh heartbeat
            count++;
        }
    });

    if (count > 0) {
        await statusRef.update(updates);
        console.log(`✅ PURGED ${count} users. System is CLEAN.`);
    } else {
        console.log("✅ System was already clean.");
    }

    process.exit(0);
}

emergencyReset().catch(e => {
    console.error("FAILED:", e);
    process.exit(1);
});
