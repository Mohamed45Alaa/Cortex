const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

/**
 * ONE-TIME ADMIN BOOTSTRAP SCRIPT
 * Usage: node scripts/makeAdmin.ts <UID>
 */

// 1. Load Env Vars (Local Only)
const loadEnv = () => {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    console.log(`[Bootstrap] Loading env from ${envPath}`);
    const envConfig = require('dotenv').parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
  } else {
    console.warn("[Bootstrap] No .env.local found. Relying on system env.");
  }
};

loadEnv();

// 2. Constants & Checks
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
const DATABASE_URL = process.env.FIREBASE_DATABASE_URL;

if (!PROJECT_ID || !CLIENT_EMAIL || !PRIVATE_KEY || !DATABASE_URL) {
  console.error("--- CONFIG ERROR ---");
  console.error("Missing required env vars in .env.local:");
  if (!PROJECT_ID) console.error(" - FIREBASE_PROJECT_ID");
  if (!CLIENT_EMAIL) console.error(" - FIREBASE_CLIENT_EMAIL");
  if (!PRIVATE_KEY) console.error(" - FIREBASE_PRIVATE_KEY");
  if (!DATABASE_URL) console.error(" - FIREBASE_DATABASE_URL");
  process.exit(1);
}

const UID = process.argv[2];
if (!UID) {
  console.error("Usage: node scripts/makeAdmin.ts <UID>");
  process.exit(1);
}

// 3. Initialize Admin SDK
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: PROJECT_ID,
      clientEmail: CLIENT_EMAIL,
      privateKey: PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    databaseURL: DATABASE_URL
  });
  console.log("[Bootstrap] Firebase Admin Initialized.");
} catch (e) {
  console.error("[Bootstrap] Init Failed:", e);
  process.exit(1);
}

// 4. Execute Promotion
async function promoteUser(uid: string) {
  console.log(`[Bootstrap] Promoting User ${uid} to ADMIN...`);

  try {
    // A. Set Custom Claims (The Authority)
    await admin.auth().setCustomUserClaims(uid, { role: 'ADMIN' });
    console.log("✅ Custom Claims Set: { role: 'ADMIN' }");

    // B. Update Firestore (Mirror for UI)
    const db = admin.firestore();

    // Strategy: Update all known profile locations
    // 1. users/{uid}/profile/main
    const profileRef = db.collection('users').doc(uid).collection('profile').doc('main');

    // Check if exists
    const doc = await profileRef.get();
    if (doc.exists) {
      await profileRef.update({ role: 'ADMIN' });
      console.log("✅ Firestore Main Profile Updated.");
    } else {
      // Might be a root doc structure in some versions?
      // Fallback: Check root 'users/{uid}'
      const rootRef = db.collection('users').doc(uid);
      const rootDoc = await rootRef.get();
      if (rootDoc.exists) {
        await rootRef.update({ role: 'ADMIN' });
        console.log("✅ Firestore Root User Doc Updated.");
      } else {
        console.warn("⚠️ No Firestore Profile found. User has Claims but no UI role.");
      }
    }

    // C. Force Refresh Info
    const user = await admin.auth().getUser(uid);
    console.log(`\n🎉 SUCCESS! User ${user.email} is now an ADMIN.`);
    console.log("NOTE: User must logout and login again (or force refresh token) to see changes.");

    process.exit(0);
  } catch (e) {
    console.error("❌ Promotion Failed:", e);
    process.exit(1);
  }
}

promoteUser(UID);
