import "server-only";
import * as admin from "firebase-admin";

interface FirebaseAdminConfig {
    projectId: string;
    clientEmail: string;
    privateKey: string;
    databaseURL: string;
}

function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp() {
    if (admin.apps.length > 0) {
        return admin.app();
    }

    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const databaseURL = process.env.FIREBASE_DATABASE_URL || process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

    if (!projectId || !clientEmail || !privateKey || !databaseURL) {
        // DETAILED ERROR LOGGING
        const missing: string[] = [];
        if (!projectId) missing.push("FIREBASE_PROJECT_ID");
        if (!clientEmail) missing.push("FIREBASE_CLIENT_EMAIL");
        if (!privateKey) missing.push("FIREBASE_PRIVATE_KEY");
        if (!databaseURL) missing.push("FIREBASE_DATABASE_URL");

        const errorMsg = `Server Misconfiguration: Missing Keys [${missing.join(', ')}]`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    return admin.initializeApp({
        credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey: formatPrivateKey(privateKey),
        }),
        databaseURL
    });
}
