import { UserProfile, AuthContextState } from '../types';
import { getAuthInstance, getGoogleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

const STORAGE_KEY = 'accs_auth_storage';

// Helper to map Firebase User to Cortex Profile
const mapUser = (fbUser: FirebaseUser): UserProfile => ({
    id: fbUser.uid,
    email: fbUser.email || '',
    name: fbUser.displayName || 'Student',
    role: 'STUDENT', // Default to Student
    avatarUrl: fbUser.photoURL || undefined,
    completed: undefined, // undefined = Unknown/Loading. Truth comes from Firestore.
    createdAt: fbUser.metadata.creationTime || new Date().toISOString()
});

export const AuthService = {

    /**
     * Initializes Auth Listener
     * Returns an unsubscriber
     */
    initCallback: (callback: (state: AuthContextState) => void) => {
        const auth = getAuthInstance();

        if (!auth) {
            callback({ status: 'GUEST', user: null, token: null });
            return () => { }; // Return dummy unsubscriber
        }

        return onAuthStateChanged(auth, (user: FirebaseUser | null) => {
            if (user) {
                const profile = mapUser(user);
                // Persist minimal state for checks before JS loads (optional)
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    status: 'AUTHENTICATED',
                    user: profile
                }));

                callback({
                    status: 'AUTHENTICATED',
                    user: profile,
                    token: 'valid_session'
                });
            } else {
                localStorage.removeItem(STORAGE_KEY);
                callback({
                    status: 'GUEST',
                    user: null,
                    token: null
                });
            }
        });
    },

    /**
     * Google Login via Popup
     */
    loginWithGoogle: async (): Promise<AuthContextState> => {
        const auth = getAuthInstance();
        const provider = getGoogleProvider();

        // HARDENING: Friendly Error if Auth failed to init (e.g. missing keys)
        if (!auth || !provider) {
            const msg = "Configuration Error: Authentication service unavailable.";
            console.error("[Auth] Missing Firebase Config");
            return { status: 'GUEST', user: null, token: null }; // Degrade instead of throw
        }

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const profile = mapUser(user);

            return {
                status: 'AUTHENTICATED',
                user: profile,
                token: await user.getIdToken()
            };
        } catch (error: any) {
            console.error("[Auth] Google Login Blocked/Failed", error.code, error.message);

            // Map to User-Friendly Errors
            let friendlyMessage = "Sign-in failed. Please try again.";
            if (error.code === 'auth/popup-closed-by-user') friendlyMessage = "Sign-in cancelled.";
            if (error.code === 'auth/popup-blocked') friendlyMessage = "Popup blocked. Please allow popups for this site.";
            if (error.code === 'auth/network-request-failed') friendlyMessage = "Network error. Check your connection.";

            throw new Error(friendlyMessage);
        }
    },

    /**
     * Logout
     */
    logout: async () => {
        const auth = getAuthInstance();
        if (auth) await signOut(auth);
        localStorage.removeItem(STORAGE_KEY);
    },

    // Legacy/Mock methods for Email (optional to keep or remove?)
    // Keeping basic stub for types compatibility or if needed later
    login: async (email: string, password: string): Promise<AuthContextState> => { throw new Error("Email Login not implemented in MVP"); },
    register: async (identity: any, profile: any): Promise<AuthContextState> => { throw new Error("Email Register not implemented in MVP"); },
};

