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
        if (!auth || !provider) throw new Error("Authentication service unavailable. Please retry.");

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const profile = mapUser(user);

            return {
                status: 'AUTHENTICATED',
                user: profile,
                token: await user.getIdToken()
            };
        } catch (error) {
            console.error("Firebase Login Error", error);
            throw error;
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
    login: async (email: string, password: string) => { throw new Error("Email Login not implemented in MVP"); },
    register: async (identity: any, profile: any) => { throw new Error("Email Register not implemented in MVP"); },
};

