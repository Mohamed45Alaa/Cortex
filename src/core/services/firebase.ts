import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getDatabase, Database } from 'firebase/database';

// 1. CONFIGURATION
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// 2. SINGLETON INSTANCES
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let rtdb: Database | null = null;
let googleProvider: GoogleAuthProvider | null = null;

// 3. INITIALIZATION (Safe for SSR/HMR)
if (typeof window !== "undefined") {
    try {
        // A. APP INITIALIZATION
        if (getApps().length === 0) {
            app = initializeApp(firebaseConfig);
            console.log("[System] Firebase App Initialized (Fresh)");
        } else {
            app = getApp();
            console.log("[System] Firebase App Reused (HMR/Existing)");
        }

        // B. AUTH
        if (app) {
            auth = getAuth(app);
            googleProvider = new GoogleAuthProvider();
            googleProvider.setCustomParameters({ prompt: 'select_account' });
        }

        // C. FIRESTORE
        if (app) {
            db = getFirestore(app);
        }

        // D. REALTIME DATABASE (CRITICAL SINGLETON FIX)
        if (app && firebaseConfig.databaseURL) {
            // Explicitly pass URL to prevent default mismatch errors
            rtdb = getDatabase(app, firebaseConfig.databaseURL);
            console.log("[System] RTDB Singleton Initialized");
        } else {
            console.error("[System] RTDB Failed: Missing URL or App");
        }

    } catch (e) {
        console.error("[System] FATAL FIREBASE INIT ERROR:", e);
    }
}

// 4. EXPORTS (Getters allow safe consumption, but instances are frozen)
export const getAuthInstance = () => auth;
export const getFirestoreInstance = () => db;
export const getDatabaseInstance = () => rtdb;
export const getGoogleProvider = () => googleProvider;

// 5. CONFIG VALIDATOR
export const isConfigValid = (): boolean => {
    if (typeof window === "undefined") return false;
    const hasPlaceholders = Object.values(firebaseConfig).some(val => val && val.startsWith('PLACEHOLDER'));
    const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'databaseURL'];
    const missingKeys = requiredKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);
    return !hasPlaceholders && missingKeys.length === 0;
};
