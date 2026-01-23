const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// --- CONFIGURATION ---
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '../serviceAccountKey.json');

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error('❌ ERROR: Service Account Key not found.');
    console.error(`   Please download it from Firebase Console -> Project Settings -> Service Accounts`);
    console.error(`   Save it as: ${SERVICE_ACCOUNT_PATH}`);
    process.exit(1);
}

const serviceAccount = require(SERVICE_ACCOUNT_PATH);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrateFullNames() {
    console.log('🚀 Starting Full Name Migration...');
    let count = 0;
    let updated = 0;
    let skipped = 0;
    let missingInfo = 0;

    try {
        // We will scan the `users` collection directly to iterate all profiles
        // We assume profile/main is the target.
        const usersSnapshot = await db.collection('users').get();
        console.log(`\n📥 Found ${usersSnapshot.size} user documents.`);

        const batchLimit = 500;
        let batch = db.batch();
        let batchCount = 0;

        for (const userDoc of usersSnapshot.docs) {
            count++;
            const uid = userDoc.id;
            const profileRef = db.collection('users').doc(uid).collection('profile').doc('main');
            const profileSnap = await profileRef.get();

            if (!profileSnap.exists) {
                console.warn(`   ⚠️ UID: ${uid} has NO profile/main doc. Skipping.`);
                missingInfo++;
                continue;
            }

            const data = profileSnap.data();
            const currentFullName = data.fullName;
            const onboardingName = data.onboardingName;

            // LOGIC: If fullName is missing BUT onboardingName exists -> BACKFILL
            if (!currentFullName && onboardingName) {
                console.log(`   🔧 Fixing UID: ${uid} -> Setting fullName = "${onboardingName}"`);

                batch.update(profileRef, {
                    fullName: onboardingName,
                    migratedAt: admin.firestore.FieldValue.serverTimestamp()
                });

                batchCount++;
                updated++;
            }
            else if (!currentFullName && !onboardingName) {
                console.warn(`   ❌ UID: ${uid} has NO NAME AT ALL (No fullName, No onboardingName). Data dirty.`);
                missingInfo++;
            }
            else {
                // fullName exists, do nothing
                skipped++;
            }

            // Commit batch if full
            if (batchCount >= batchLimit) {
                await batch.commit();
                console.log(`   ✅ Committed batch of ${batchCount} updates.`);
                batch = db.batch();
                batchCount = 0;
            }
        }

        // Commit remaining
        if (batchCount > 0) {
            await batch.commit();
            console.log(`   ✅ Committed final batch of ${batchCount} updates.`);
        }

        console.log('\n\n==========================================');
        console.log('🎉 MIGRATION SUMMARY');
        console.log(`   Total Users Scanned: ${count}`);
        console.log(`   Fixed (Backfilled):  ${updated}`);
        console.log(`   Skipped (OK):        ${skipped}`);
        console.log(`   Missing Data:        ${missingInfo}`);
        console.log('==========================================');

    } catch (error) {
        console.error('\n❌ FATAL ERROR:', error);
        process.exit(1);
    }
}

migrateFullNames();
