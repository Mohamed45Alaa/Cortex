
import { createFirebaseAdminApp } from '../core/services/firebase-admin';
import * as admin from 'firebase-admin';

async function healAdmin() {
    console.log("🚑 Starting Admin Recovery...");

    // 1. Init Admin SDK
    const app = createFirebaseAdminApp();
    const db = app.firestore();
    const auth = app.auth();

    const uid = 'MJUFPU4OujSh63y0JI0NOPTD3cD2';

    // 2. Fetch Email
    let email = 'admin@recovery.local';
    try {
        const userRecord = await auth.getUser(uid);
        email = userRecord.email || email;
        console.log(`✓ Found Auth User: ${email}`);
    } catch (e) {
        console.warn(`⚠ Auth User not found for ${uid}. Using placeholder.`);
    }

    // 3. Construct Profile
    const profileData = {
        email: email,
        fullName: "System Admin",
        role: "ADMIN",
        university: "جامعة مبدئية",
        faculty: "افتراضي",
        academicYear: "Year 1",
        phone: "",
        totalSessions: 0,
        cognitiveLoad: 0,
        collectionEfficiency: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // 4. Force Write
    const profileRef = db.collection('users').doc(uid).collection('profile').doc('main');
    await profileRef.set(profileData);

    console.log("✅ Admin Profile Restored Successfully.");
}

healAdmin().catch(console.error);
