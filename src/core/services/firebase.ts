import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Singleton Pattern (Lazy)
let authInstance: Auth | null = null;
let providerInstance: GoogleAuthProvider | null = null;

export const getAuthInstance = (): Auth | null => {
    if (typeof window === "undefined") return null;
    if (authInstance) return authInstance;

    // Validate Required Configurations
    const requiredKeys = ['apiKey', 'authDomain', 'projectId'];
    const missingKeys = requiredKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);

    if (missingKeys.length > 0) {
        console.warn(`[System] Firebase Auth Disabled. Missing keys: ${missingKeys.join(', ')}`);
        return null;
    }

    try {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        authInstance = getAuth(app);
        return authInstance;
    } catch (error) {
        console.error("[System] Firebase Init Error:", error);
        return null;
    }
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
