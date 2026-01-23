const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// --- CONFIGURATION ---
// Expects serviceAccountKey.json in the project root
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

const auth = admin.auth();
const db = admin.firestore();

async function backfillEmails() {
    console.log('🚀 Starting Email Backfill Migration...');
    let nextPageToken;
    let count = 0;
    let updated = 0;
    let errors = 0;

    try {
        // Loop through all users in batches
        do {
            const listUsersResult = await auth.listUsers(1000, nextPageToken);
            const users = listUsersResult.users;

            console.log(`\n📥 Processed batch of ${users.length} users...`);

            const batch = db.batch();
            let batchCount = 0;

            for (const user of users) {
                if (!user.email) {
                    console.warn(`   ⚠️ UID: ${user.uid} has no email in Auth. Skipping.`);
                    continue;
                }

                const userRef = db.collection('users').doc(user.uid).collection('profile').doc('main');

                // Safe Update: Merge ensures we don't overwrite existing data
                // We do NOT check if doc exists first to save reads, we just set with merge.
                // If doc doesn't exist, it creates it with just email (Safe).
                // If it exists, it adds email.
                batch.set(userRef, {
                    email: user.email,
                    lastUpdated: admin.firestore.FieldValue.serverTimestamp() // Audit trail
                }, { merge: true });

                batchCount++;
                count++;
            }

            if (batchCount > 0) {
                await batch.commit();
                updated += batchCount;
                process.stdout.write(`   ✅ Committed batch of ${batchCount} updates.\r`);
            }

            nextPageToken = listUsersResult.pageToken;
        } while (nextPageToken);

        console.log('\n\n==========================================');
        console.log('🎉 MIGRATION COMPLETE');
        console.log(`   Total Users Scanned: ${count}`);
        console.log(`   Profiles Updated:    ${updated}`);
        console.log(`   Errors:              ${errors}`);
        console.log('==========================================');

    } catch (error) {
        console.error('\n❌ FATAL ERROR:', error);
        process.exit(1);
    }
}

backfillEmails();
