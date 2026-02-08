const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

// Helper to format private key
const formatPrivateKey = (key) => {
    return key.replace(/\\n/g, "\n");
};

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const databaseURL = process.env.FIREBASE_DATABASE_URL || process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

if (!projectId || !clientEmail || !privateKey) {
    console.error('Error: Missing Firebase Admin credentials in .env.local');
    process.exit(1);
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey: formatPrivateKey(privateKey),
        }),
        databaseURL
    });
}

const uid = process.argv[2];

if (!uid) {
    console.error('Usage: node scripts/grant-admin.js <UID>');
    process.exit(1);
}

const setAdmin = async (userId) => {
    try {
        const user = await admin.auth().getUser(userId);
        console.log(`Found user: ${user.email} (${user.uid})`);

        // Set custom claim
        await admin.auth().setCustomUserClaims(userId, { role: 'admin' });

        // Verify
        const updatedUser = await admin.auth().getUser(userId);
        console.log('Current Claims:', updatedUser.customClaims);

        if (updatedUser.customClaims && updatedUser.customClaims.role === 'admin') {
            console.log('✅ SUCCESS: User is now an ADMIN.');
            console.log('👉 IMPORTANT: The user must LOGOUT and LOGIN again for changes to apply.');
        } else {
            console.error('❌ ERROR: Claims update failed verification.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
};

setAdmin(uid);
