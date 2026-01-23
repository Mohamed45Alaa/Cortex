import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getDatabase, Database } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // Added for RTDB
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Singleton Pattern (Lazy)
let authInstance: Auth | null = null;
let providerInstance: GoogleAuthProvider | null = null;
let firestoreInstance: Firestore | null = null;
let databaseInstance: Database | null = null;

export const getAuthInstance = (): Auth | null => {
    if (typeof window === "undefined") return null;
    if (authInstance) return authInstance;

    // Validate Required Configurations
    const requiredKeys = ['apiKey', 'authDomain', 'projectId'];
    const missingKeys = requiredKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);

    // GUARD: Check for Placeholders
    const hasPlaceholders = Object.values(firebaseConfig).some(val => val && val.startsWith('PLACEHOLDER'));

    if (missingKeys.length > 0 || hasPlaceholders) {
        console.warn(`[System] Firebase Auth Disabled. Missing or Placeholder keys detected.`);
        if (hasPlaceholders) console.error("Firebase Auth disabled — invalid environment configuration");
        return null;
    }

    try {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        authInstance = getAuth(app);
        return authInstance;
    } catch (error: any) {
        // Prevent crashing if already initialized or network error
        if (error.code === 'app/duplicate-app') {
            const app = getApp();
            authInstance = getAuth(app);
            return authInstance;
        }
        console.error("[System] Firebase Init Error:", error);
        return null;
    }
};

export const getFirestoreInstance = (): Firestore | null => {
    if (typeof window === "undefined") return null;
    if (firestoreInstance) return firestoreInstance;

    const auth = getAuthInstance(); // Ensure app is initialized
    if (!auth) return null;

    try {
        const app = getApp();
        firestoreInstance = getFirestore(app);
        return firestoreInstance;
    } catch (error) {
        console.error("[System] Firestore Init Error:", error);
        return null;
    }
};

export const getDatabaseInstance = (): Database | null => {
    if (typeof window === "undefined") return null;
    if (databaseInstance) return databaseInstance;

    const auth = getAuthInstance(); // Ensure app is initialized
    if (!auth) return null;

    try {
        const app = getApp();
        databaseInstance = getDatabase(app);
        return databaseInstance;
    } catch (error) {
        console.error("[System] RTDB Init Error:", error);
        return null;
    }
};

export const isConfigValid = (): boolean => {
    if (typeof window === "undefined") return false;
    const hasPlaceholders = Object.values(firebaseConfig).some(val => val && val.startsWith('PLACEHOLDER'));
    const requiredKeys = ['apiKey', 'authDomain', 'projectId'];
    const missingKeys = requiredKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);
    return !hasPlaceholders && missingKeys.length === 0;
};

export const getGoogleProvider = (): GoogleAuthProvider | null => {
    if (typeof window === "undefined") return null;
    if (providerInstance) return providerInstance;

    // Ensure Auth is initialized/checked first to validation config
    const auth = getAuthInstance();
    if (!auth) return null;

    try {
        providerInstance = new GoogleAuthProvider();
        providerInstance.setCustomParameters({ prompt: 'select_account' });
        return providerInstance;
    } catch (error) {
        console.error("[System] Provider Init Error:", error);
        return null;
    }
};
