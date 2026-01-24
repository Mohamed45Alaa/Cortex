(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/core/services/firebase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthInstance",
    ()=>getAuthInstance,
    "getDatabaseInstance",
    ()=>getDatabaseInstance,
    "getFirestoreInstance",
    ()=>getFirestoreInstance,
    "getGoogleProvider",
    ()=>getGoogleProvider,
    "isConfigValid",
    ()=>isConfigValid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$database$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/database/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/database/dist/index.esm.js [app-client] (ecmascript)");
;
;
;
;
// 1. CONFIGURATION
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyCEyKqhI2b23r3BevB23qbHA-9AYXiH0oU"),
    authDomain: ("TURBOPACK compile-time value", "cortex-academic-system.firebaseapp.com"),
    databaseURL: ("TURBOPACK compile-time value", "https://cortex-academic-system-default-rtdb.firebaseio.com"),
    projectId: ("TURBOPACK compile-time value", "cortex-academic-system"),
    storageBucket: ("TURBOPACK compile-time value", "cortex-academic-system.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "654713253986"),
    appId: ("TURBOPACK compile-time value", "1:654713253986:web:513c700fdc34dce858213b")
};
// 2. SINGLETON INSTANCES
let app = null;
let auth = null;
let db = null;
let rtdb = null;
let googleProvider = null;
// 3. INITIALIZATION (Safe for SSR/HMR)
if ("TURBOPACK compile-time truthy", 1) {
    try {
        // A. APP INITIALIZATION
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])().length === 0) {
            app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
            console.log("[System] Firebase App Initialized (Fresh)");
        } else {
            app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApp"])();
            console.log("[System] Firebase App Reused (HMR/Existing)");
        }
        // B. AUTH
        if (app) {
            auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
            googleProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleAuthProvider"]();
            googleProvider.setCustomParameters({
                prompt: 'select_account'
            });
        }
        // C. FIRESTORE
        if (app) {
            db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
        }
        // D. REALTIME DATABASE (CRITICAL SINGLETON FIX)
        if (app && firebaseConfig.databaseURL) {
            // Explicitly pass URL to prevent default mismatch errors
            rtdb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDatabase"])(app, firebaseConfig.databaseURL);
            console.log("[System] RTDB Singleton Initialized");
        } else {
            console.error("[System] RTDB Failed: Missing URL or App");
        }
    } catch (e) {
        console.error("[System] FATAL FIREBASE INIT ERROR:", e);
    }
}
const getAuthInstance = ()=>auth;
const getFirestoreInstance = ()=>db;
const getDatabaseInstance = ()=>rtdb;
const getGoogleProvider = ()=>googleProvider;
const isConfigValid = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const hasPlaceholders = Object.values(firebaseConfig).some((val)=>val && val.startsWith('PLACEHOLDER'));
    const requiredKeys = [
        'apiKey',
        'authDomain',
        'projectId',
        'databaseURL'
    ];
    const missingKeys = requiredKeys.filter((key)=>!firebaseConfig[key]);
    return !hasPlaceholders && missingKeys.length === 0;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/services/AuthService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthService",
    ()=>AuthService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
;
;
const STORAGE_KEY = 'accs_auth_storage';
// Helper to map Firebase User to Cortex Profile
const mapUser = (fbUser)=>({
        id: fbUser.uid,
        email: fbUser.email || '',
        name: fbUser.displayName || 'Student',
        role: 'STUDENT',
        avatarUrl: fbUser.photoURL || undefined,
        completed: false,
        createdAt: fbUser.metadata.creationTime || new Date().toISOString()
    });
const AuthService = {
    /**
     * Initializes Auth Listener
     * Returns an unsubscriber
     */ initCallback: (callback)=>{
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthInstance"])();
        if (!auth) {
            callback({
                status: 'GUEST',
                user: null,
                token: null
            });
            return ()=>{}; // Return dummy unsubscriber
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(auth, (user)=>{
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
     */ loginWithGoogle: async ()=>{
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthInstance"])();
        const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGoogleProvider"])();
        // HARDENING: Friendly Error if Auth failed to init (e.g. missing keys)
        if (!auth || !provider) {
            const msg = "Configuration Error: Authentication service unavailable.";
            console.error("[Auth] Missing Firebase Config");
            return {
                status: 'GUEST',
                user: null,
                token: null
            }; // Degrade instead of throw
        }
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithPopup"])(auth, provider);
            const user = result.user;
            const profile = mapUser(user);
            return {
                status: 'AUTHENTICATED',
                user: profile,
                token: await user.getIdToken()
            };
        } catch (error) {
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
     */ logout: async ()=>{
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthInstance"])();
        if (auth) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])(auth);
        localStorage.removeItem(STORAGE_KEY);
    },
    // Legacy/Mock methods for Email (optional to keep or remove?)
    // Keeping basic stub for types compatibility or if needed later
    login: async (email, password)=>{
        throw new Error("Email Login not implemented in MVP");
    },
    register: async (identity, profile)=>{
        throw new Error("Email Register not implemented in MVP");
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/services/FirestoreService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FirestoreService",
    ()=>FirestoreService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/firebase.ts [app-client] (ecmascript)");
;
;
const FirestoreService = {
    /**
     * Save basic user profile data (silently)
     */ saveUserProfile: async (uid, profile)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestoreInstance"])();
            if (!db) return;
            const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'profile', 'main');
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(userRef, {
                ...profile,
                lastActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            }, {
                merge: true
            });
            console.log("[Firestore] Profile saved successfully.");
        } catch (error) {
            console.warn("[Firestore] Failed to save profile:", error);
            throw error; // Propagate to UI
        }
    },
    saveSubject: async (uid, subjectId, subjectData)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestoreInstance"])();
            if (!db) return;
            const subjectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'subjects', subjectId);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(subjectRef, {
                ...subjectData,
                lastUpdated: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            }, {
                merge: true
            });
        } catch (error) {
            console.warn("[Firestore] Failed to save subject:", error);
        }
    },
    deleteSubject: async (uid, subjectId)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestoreInstance"])();
            if (!db) return;
            const subjectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'subjects', subjectId);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])(subjectRef);
        } catch (error) {
            console.warn("[Firestore] Failed to delete subject:", error);
        }
    },
    saveLecture: async (uid, subjectId, lectureId, lectureData)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestoreInstance"])();
            if (!db) return;
            const lectureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'subjects', subjectId, 'lectures', lectureId);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(lectureRef, {
                ...lectureData,
                updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            }, {
                merge: true
            });
            const subjectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'subjects', subjectId);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(subjectRef, {
                lastUpdated: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            }, {
                merge: true
            });
        } catch (error) {
            console.warn("[Firestore] Failed to save lecture:", error);
        }
    },
    /**
     * ATOMIC SAVE: Session + Snapshot
     * Ensures UI and Data never drift.
     */ saveSessionWithSnapshot: async (uid, session, snapshot)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestoreInstance"])();
            if (!db) return;
            const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
            // 1. Session Ref
            const sessionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'subjects', session.subjectId, 'lectures', session.lectureId, 'sessions', session.id);
            batch.set(sessionRef, {
                ...session,
                syncedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            });
            // 2. Snapshot Ref (Authority)
            const snapshotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'stateSnapshot', 'main');
            batch.set(snapshotRef, {
                ...snapshot,
                lastUpdatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                snapshotVersion: 1
            }, {
                merge: true
            });
            // 3. Cognitive Index Ref (Parallel Sync)
            if (session.performanceIndex) {
                const indexRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'cognitiveIndex', 'main');
                batch.set(indexRef, {
                    value: session.performanceIndex,
                    totalSessions: snapshot.profile.totalSessions,
                    lastUpdated: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                }, {
                    merge: true
                });
            }
            // Execute Atomic Commit
            await batch.commit();
            console.log("[Firestore] Atomic Save Complete: Session + Snapshot");
        } catch (error) {
            console.warn("[Firestore] Failed to atomic save:", error);
        }
    },
    /**
     * ATOMIC SUBJECT SAVE: Subject + Snapshot Touch
     */ saveSubjectWithSnapshot: async (uid, subjectId, subjectData, snapshot)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestoreInstance"])();
            if (!db) return;
            const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
            // 1. Subject Ref
            const subjectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'subjects', subjectId);
            batch.set(subjectRef, {
                ...subjectData,
                lastUpdated: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            }, {
                merge: true
            });
            // 2. Snapshot Ref (Beacon)
            const snapshotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'stateSnapshot', 'main');
            batch.set(snapshotRef, {
                ...snapshot,
                lastUpdatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                snapshotVersion: 1
            }, {
                merge: true
            });
            await batch.commit();
            console.log("[Firestore] Atomic Save: Subject + Snapshot");
        } catch (error) {
            console.warn("[Firestore] Failed to save subject:", error);
        }
    },
    /**
     * RECURSIVE DELETE: Subject + Lectures + Sessions + Snapshot
     */ deleteSubjectRecursive: async (uid, subjectId, snapshot)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestoreInstance"])();
            if (!db) return;
            console.log("[Firestore] Starting Recursive Delete for:", subjectId);
            const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBatch"])(db);
            // 1. Delete Subject Document
            const subjectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'subjects', subjectId);
            batch.delete(subjectRef);
            // 2. Find and Delete All Lectures
            const lecturesColl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, 'users', uid, 'subjects', subjectId, 'lectures');
            const lecturesSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(lecturesColl);
            for (const lecDoc of lecturesSnap.docs){
                // 3. Find and Delete All Sessions for this Lecture
                const sessionsColl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, 'users', uid, 'subjects', subjectId, 'lectures', lecDoc.id, 'sessions');
                const sessionsSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(sessionsColl);
                sessionsSnap.forEach((sessDoc)=>{
                    batch.delete(sessDoc.ref);
                });
                batch.delete(lecDoc.ref);
            }
            // 4. Update Snapshot (Beacon)
            const snapshotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'stateSnapshot', 'main');
            batch.set(snapshotRef, {
                ...snapshot,
                lastUpdatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                snapshotVersion: 1
            }, {
                merge: true
            });
            await batch.commit();
            console.log("[Firestore] Recursive Delete Complete");
        } catch (error) {
            console.warn("[Firestore] Failed to delete subject recursively:", error);
        }
    },
    saveStateSnapshot: async (uid, snapshot)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestoreInstance"])();
            if (!db) return;
            const snapshotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'stateSnapshot', 'main');
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(snapshotRef, {
                ...snapshot,
                lastUpdatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                snapshotVersion: 1
            }, {
                merge: true
            });
        } catch (error) {
            console.warn("[Firestore] Failed to save state snapshot:", error);
        }
    },
    /**
     * Load FULL user data on login to hydrate local store.
     * Recursively fetches Subjects -> Lectures -> Sessions.
     * Includes Raw Data Normalization to prevent undefined errors.
     */ loadUserData: async (uid)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestoreInstance"])();
            if (!db) return null;
            console.log("[Firestore] Starting deep hydration for:", uid);
            const startTime = Date.now();
            // 1. Load Cognitive Index, State Snapshot, AND Identity Profile (Parallel)
            const indexRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'cognitiveIndex', 'main');
            const snapshotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'stateSnapshot', 'main');
            const profileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'profile', 'main');
            const [indexSnap, snapshotSnap, profileSnap] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(indexRef),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(snapshotRef),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(profileRef)
            ]);
            const cognitiveIndex = indexSnap.exists() ? indexSnap.data() : null;
            const stateSnapshot = snapshotSnap.exists() ? snapshotSnap.data() : null;
            const identityProfile = profileSnap.exists() ? profileSnap.data() : null;
            // 2. Load Subjects
            const subjectsColl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, 'users', uid, 'subjects');
            const subjectsSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(subjectsColl);
            const subjects = [];
            const lectures = [];
            const sessions = [];
            // 3. Traverse Hierarchy (Parallelized at subject level)
            await Promise.all(subjectsSnap.docs.map(async (subDoc)=>{
                const subData = subDoc.data();
                // NORMALIZE SUBJECT
                const validSubject = {
                    ...subData,
                    id: subDoc.id,
                    name: subData.name || "Unnamed Subject",
                    config: subData.config || {
                        strictnessLevel: 0,
                        preferredDays: [],
                        sessionDurationTarget: 0
                    },
                    metrics: subData.metrics || {
                        stability: 0,
                        readiness: 0,
                        totalWeight: 0
                    }
                };
                subjects.push(validSubject);
                // Fetch Lectures for this Subject
                const lecturesColl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, 'users', uid, 'subjects', subDoc.id, 'lectures');
                const lecturesSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(lecturesColl);
                await Promise.all(lecturesSnap.docs.map(async (lecDoc)=>{
                    const lecData = lecDoc.data();
                    // NORMALIZE LECTURE
                    const validLecture = {
                        ...lecData,
                        id: lecDoc.id,
                        subjectId: subDoc.id,
                        stability: lecData.stability ?? 0,
                        status: lecData.status || 'Pending',
                        cognitiveIndex: lecData.cognitiveIndex ?? 0,
                        duration: lecData.duration || 0,
                        relativeDifficulty: lecData.relativeDifficulty || 5
                    };
                    lectures.push(validLecture);
                    // Fetch Sessions for this Lecture
                    const sessionsColl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, 'users', uid, 'subjects', subDoc.id, 'lectures', lecDoc.id, 'sessions');
                    const sessionsSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(sessionsColl);
                    sessionsSnap.forEach((sessDoc)=>{
                        const sessData = sessDoc.data();
                        // NORMALIZE SESSION
                        sessions.push({
                            ...sessData,
                            id: sessDoc.id,
                            lectureId: lecDoc.id,
                            subjectId: subDoc.id,
                            performanceIndex: sessData.performanceIndex ?? 0,
                            cognitiveCost: sessData.cognitiveCost ?? 0
                        });
                    });
                }));
            }));
            console.log(`[Firestore] Hydration complete in ${Date.now() - startTime}ms. Found: ${subjects.length} Subjects, ${lectures.length} Lectures.`);
            return {
                cognitiveIndex,
                stateSnapshot,
                identityProfile,
                subjects,
                lectures,
                sessions
            };
        } catch (error) {
            console.warn("[Firestore] Failed to load deep data:", error);
            return null;
        }
    },
    /**
     * Real-time Listener for State Snapshot
     * Returns an unsubscribe function.
     */ subscribeToSnapshot: (uid, onUpdate)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestoreInstance"])();
        if (!db) return ()=>{};
        const snapshotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', uid, 'stateSnapshot', 'main');
        console.log("[Firestore] Attaching real-time listener to:", uid);
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(snapshotRef, (docSnap)=>{
            if (docSnap.exists()) {
                onUpdate(docSnap.data());
            }
        });
        return unsubscribe;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/engines/CognitiveEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ENGINEERING: COGNITIVE ENGINE (DETERMINISTIC)
 * Reference: Cognitive System Implementation Plan
 * 
 * ROLE:
 * Pure mathematical engine for calculating:
 * 1. Time Difficulty (Linear Mapping)
 * 2. Understanding Difficulty (Inversion)
 * 3. Relative Difficulty (Mean)
 * 4. Expected Study Time (Standard & Adaptive)
 * 5. Cognitive Index & Grading
 * 6. Cognitive Load Score (Biological Cost)
 * 
 * PRINCIPLES:
 * - Deterministic: Same Input = Same Output
 * - No Fuzzy Logic: Strict Linear Scaling
 * - 0-10 Scale for all indices
 */ // PART 8: GRADE MAPPING CONSTANTS
__turbopack_context__.s([
    "CognitiveEngine",
    ()=>CognitiveEngine
]);
const CognitiveEngine = {
    /**
     * MASTER CALCULATION (STRICT CONTRACT)
     * Returns the full set of metrics required for System Persistence.
     */ calculate: (params)=>{
        const { lectureDuration, actualDuration, relativeDifficulty, studentIndex } = params;
        // 1. Calculate Expected Time
        const expected = CognitiveEngine.calculateExpectedStudyTime(lectureDuration, relativeDifficulty, studentIndex);
        // 2. Calculate Cognitive Load Score (Biological Cost)
        const loadScore = CognitiveEngine.calculateCognitiveLoadScore(expected, actualDuration, relativeDifficulty);
        // 3. Calculate Performance Index (0-10)
        const index = CognitiveEngine.calculateCognitiveIndex(expected, actualDuration);
        // 4. Determine Grade
        const grade = CognitiveEngine.determineGrade(index);
        return {
            expectedStudyTimeMinutes: expected,
            relativeDifficulty: relativeDifficulty,
            cognitiveLoadIndex: Math.round(loadScore),
            performanceGrade: grade,
            performanceIndex: index
        };
    },
    /**
     * PART 1: TIME DIFFICULTY
     * Maps duration 15m -> 1.667 to 120m -> 10.000
     * Linear Scale.
     */ calculateTimeDifficulty: (durationMinutes)=>{
        const minTime = 15;
        const maxTime = 120;
        const minDiff = 1.667;
        const maxDiff = 10.0;
        // Clamp input
        if (durationMinutes < minTime) return minDiff;
        if (durationMinutes > maxTime) return maxDiff;
        // MEDICAL GRADE = FOLLOW THE TABLE DATA.
        const mapping = {
            15: 1.667,
            30: 3.334,
            45: 5.001,
            60: 6.668,
            75: 8.335,
            90: 9.168,
            105: 9.584,
            120: 10.000
        };
        if (mapping[durationMinutes]) return mapping[durationMinutes];
        // Piecewise Interpolation for non-standard times
        const breakpoints = [
            15,
            30,
            45,
            60,
            75,
            90,
            105,
            120
        ];
        // 1. Find range
        for(let i = 0; i < breakpoints.length - 1; i++){
            const low = breakpoints[i];
            const high = breakpoints[i + 1];
            if (durationMinutes >= low && durationMinutes <= high) {
                const range = high - low;
                const progress = (durationMinutes - low) / range;
                const valLow = mapping[low];
                const valHigh = mapping[high];
                return valLow + progress * (valHigh - valLow);
            }
        }
        // Out of bounds
        if (durationMinutes < 15) return 1.667 * (durationMinutes / 15);
        return 10.0;
    },
    /**
     * PART 2: UNDERSTANDING INVERSION
     * Understanding 1 -> Difficulty 10
     * Understanding 10 -> Difficulty 1
     */ calculateUnderstandingDifficulty: (understandingLevel)=>{
        // Clamp input 1-10
        const level = Math.max(1, Math.min(10, understandingLevel));
        const difficulty = 11 - level;
        return difficulty;
    },
    /**
     * PART 3: RELATIVE DIFFICULTY
     * Mean of TimeDifficulty and UnderstandingDifficulty
     */ calculateRelativeDifficulty: (timeDiff, undDiff)=>{
        const mean = (timeDiff + undDiff) / 2;
        // Clamp 0-10 and Round 1 decimal
        const result = Math.min(10, Math.max(0, mean));
        return Math.round(result * 10) / 10;
    },
    /**
     * PART 5 & 9: SCALE EXPECTED STUDY TIME (ADAPTIVE)
     * Base = Duration * 2
     * Final = Base * (RelativeDifficulty / 5) * AdaptiveFactor(Index)
     * 
     * Adaptive Rules:
     * - Index > 9 (Fast): x0.9 (Reward efficiency)
     * - Index < 4 (Struggling): x1.2 (Remedial buffer)
     * - Constraint: Diff 10 is typically max, but individual adaptation allows variation.
     */ calculateExpectedStudyTime: (lectureDuration, relativeDifficulty, studentIndex = null)=>{
        // Step 1: Base Expected Time (x2 rule)
        const base = lectureDuration * 2;
        /**
         * CRITICAL RULE: FIRST-TIME STUDENT (ONBOARDING CONTRACT)
         * If studentIndex is 0 (New Student), we MUST NOT apply strictly physics.
         * The student has no history, so difficulty scaling is unfair/inaccurate.
         * We simply double the time to ensure they have enough buffer.
         */ if (studentIndex === 0) {
            return Math.round(base);
        }
        // Step 2: Difficulty Scaling
        // 5 = x1 (Standard)
        // 10 = x2 (Hard)
        const difficultyMultiplier = relativeDifficulty / 5;
        let final = base * difficultyMultiplier;
        // Step 3: Adaptive Logic (Part 9)
        if (studentIndex !== null) {
            if (studentIndex >= 9.0) {
                final *= 0.9;
            } else if (studentIndex <= 4.0) {
                final *= 1.2;
            }
        }
        return Math.round(final);
    },
    /**
     * PART 10: COGNITIVE LOAD SCORE
     * Formula: (Actual / Expected) * (RelativeDifficulty / 10) * 100
     * Range: 0 - 100+
     * Interpretation: High Score = High Mental Cost.
     */ calculateCognitiveLoadScore: (expectedMinutes, actualMinutes, relativeDifficulty)=>{
        if (expectedMinutes <= 0) return 0;
        // Ratio > 1 means Slower (More time taken) -> Higher cost
        const timeRatio = actualMinutes / expectedMinutes;
        // Difficulty factor (0-1)
        const diffFactor = relativeDifficulty / 10;
        // Raw Score
        const score = timeRatio * diffFactor * 100;
        // Cap for UI sanity (e.g. 200)? Or leave uncapped?
        // Prompt typically implies 0-100 scale, but logic allows overflow.
        // We will clamp to 100 as "Max Load" usually implies "Full Capacity".
        return Math.min(100, Math.round(score));
    },
    /**
     * PART 7: COGNITIVE INDEX
     * TimeRatio = Expected / Actual
     * Normalized 0-10
     */ calculateCognitiveIndex: (expectedMinutes, actualMinutes)=>{
        if (actualMinutes <= 0) return 0;
        // 1. Apply Tolerance Cap (No bonus beyond 10 mins early)
        const cappedActual = Math.max(actualMinutes, expectedMinutes - 10);
        // 2. Calculate Ratio
        const ratio = expectedMinutes / cappedActual;
        // 3. Dynamic Normalization
        // Goal: Ratio 1.0 (On Time) -> Score 9.0 (A)
        // Goal: Max Ratio (10m early) -> Score 10.0 (A+)
        const maxRatio = expectedMinutes / (expectedMinutes - 10);
        // Slope calculation
        // Index = 9 + slope * (ratio - 1)
        // 10 = 9 + slope * (maxRatio - 1)
        // 1 = slope * (maxRatio - 1)
        // slope = 1 / (maxRatio - 1)
        const slope = 1 / (maxRatio - 1);
        let index = 9 + slope * (ratio - 1);
        // Fallback for very slow students
        return Math.min(10, Math.max(0, parseFloat(index.toFixed(2))));
    },
    /**
     * PART 8: GRADE MAPPING
     */ determineGrade: (index)=>{
        if (index >= 9.5) return 'A+';
        if (index >= 8.5) return 'A';
        if (index >= 7.5) return 'B+';
        if (index >= 6.5) return 'B';
        if (index >= 5.5) return 'C+';
        if (index >= 4.0) return 'C';
        return 'D';
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/useStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$AuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/AuthService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/FirestoreService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$database$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/database/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/database/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$CognitiveEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/CognitiveEngine.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        // --- INITIAL STATE ---
        profile: {
            consistencyIndex: 85,
            learningPhase: 'INIT',
            totalSessions: 0,
            currentCapacity: 100,
            lastSessionDate: "2024-01-01T00:00:00.000Z"
        },
        subjects: [],
        lectures: [],
        sessions: [],
        dailyLoad: {
            date: "2024-01-01",
            totalCognitiveCost: 0,
            status: 'Safe'
        },
        // Initialize from Service (Synchronous part, usually guest)
        authState: {
            status: 'LOADING',
            user: null,
            token: null
        },
        authModal: {
            isOpen: false,
            mode: 'LOGIN',
            onSuccess: undefined
        },
        unsubscribeSnapshot: undefined,
        activeSession: null,
        // --- ADMIN SLICE INIT ---
        students: [],
        selectedStudent: null,
        isAdminMode: false,
        adminError: null,
        // --- ADMIN ACTIONS ---
        fetchStudents: async ()=>{
            const { students, error } = await __turbopack_context__.A("[project]/src/core/services/AdminService.ts [app-client] (ecmascript, async loader)").then((m)=>m.AdminService.getAllStudents());
            if (error) {
                set({
                    students: [],
                    adminError: error
                });
            } else {
                set({
                    students: students,
                    adminError: null
                });
            }
        },
        selectStudent: (student)=>set({
                selectedStudent: student
            }),
        setAdminMode: (isActive)=>set({
                isAdminMode: isActive
            }),
        // --- ACTIONS ---
        addSubject: (subject)=>set((state)=>{
                // FIRESTORE SYNC (Atomic Beacon)
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {
                    // Prepare Snapshot (e.g. update totals or just touch timestamp)
                    const nextSnapshot = {
                        profile: state.profile,
                        dailyLoad: state.dailyLoad
                    };
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirestoreService"].saveSubjectWithSnapshot(user.id, subject.id, subject, nextSnapshot);
                }
                // Optimistic Update
                return {
                    subjects: [
                        ...state.subjects,
                        subject
                    ]
                };
            }),
        renameSubject: (id, newName)=>set((state)=>{
                // FIRESTORE SYNC (Atomic Beacon)
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {
                    // Prepare Snapshot (Touch timestamp)
                    const nextSnapshot = {
                        profile: state.profile,
                        dailyLoad: state.dailyLoad
                    };
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirestoreService"].saveSubjectWithSnapshot(user.id, id, {
                        name: newName
                    }, nextSnapshot);
                }
                return {
                    subjects: state.subjects.map((s)=>s.id === id ? {
                            ...s,
                            name: newName
                        } : s)
                };
            }),
        deleteSubject: (id)=>set((state)=>{
                // FIRESTORE SYNC (Recursive & Atomic)
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {
                    // Update Snapshot Stats (Decrease count potentially, or just touch)
                    const nextSnapshot = {
                        profile: state.profile,
                        dailyLoad: state.dailyLoad
                    };
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirestoreService"].deleteSubjectRecursive(user.id, id, nextSnapshot);
                }
                return {
                    subjects: state.subjects.filter((s)=>s.id !== id),
                    lectures: state.lectures.filter((l)=>l.subjectId !== id),
                    sessions: state.sessions.filter((s)=>s.subjectId !== id)
                };
            }),
        updateSubjectConfig: (id, config)=>set((state)=>({
                    subjects: state.subjects.map((s)=>s.id === id ? {
                            ...s,
                            config: {
                                ...s.config,
                                ...config
                            }
                        } : s)
                })),
        updateSubjectMetrics: (id, metrics)=>set((state)=>({
                    subjects: state.subjects.map((s)=>s.id === id ? {
                            ...s,
                            metrics: {
                                ...s.metrics,
                                ...metrics
                            }
                        } : s)
                })),
        addLecture: (lecture)=>set((state)=>{
                // FIRESTORE SYNC
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirestoreService"].saveLecture(user.id, lecture.subjectId, lecture.id, lecture);
                }
                return {
                    lectures: [
                        ...state.lectures,
                        lecture
                    ]
                };
            }),
        updateLectureStatus: (id, status)=>set((state)=>({
                    lectures: state.lectures.map((l)=>l.id === id ? {
                            ...l,
                            status
                        } : l)
                })),
        updateLectureStability: (id, newStability)=>set((state)=>({
                    lectures: state.lectures.map((l)=>l.id === id ? {
                            ...l,
                            stability: Math.max(0, Math.min(100, newStability)),
                            lastRevision: new Date().toISOString()
                        } : l)
                })),
        registerSession: (session)=>set((state)=>{
                // 1. Add Session to Log
                const newSessions = [
                    ...state.sessions,
                    session
                ];
                // 2. Calculate New Daily Load
                // NOTE: Logic for "Is this a new day?" should trigger resetDailyLoad elsewhere, 
                // but here we just accumulate.
                const newCost = state.dailyLoad.totalCognitiveCost + session.cognitiveCost;
                // 3. Determine Risk Status (Simple check, complex logic in CognitiveLoadEngine)
                // This is a naive safeguard. Real status is set by Engine before passing here.
                let status = 'Safe';
                if (newCost > 100) status = 'Risk';
                else if (newCost > 80) status = 'Warning';
                // FIRESTORE SYNC (Atomic Snapshot Strategy)
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {
                    // Prepare Snapshot State
                    const nextProfile = {
                        ...state.profile,
                        totalSessions: state.profile.totalSessions + 1,
                        learningPhase: state.profile.totalSessions + 1 >= 3 ? 'ADAPTIVE' : state.profile.totalSessions + 1 >= 1 ? 'NOVICE' : 'INIT',
                        lastSessionDate: new Date().toISOString()
                    };
                    const snapshot = {
                        profile: nextProfile,
                        dailyLoad: {
                            totalCognitiveCost: newCost,
                            status
                        }
                    };
                    // Atomic Write
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirestoreService"].saveSessionWithSnapshot(user.id, session, snapshot);
                }
                // Optimistic Local Update (Will be confirmed by Snapshot Listener)
                return {
                    sessions: newSessions,
                    dailyLoad: {
                        ...state.dailyLoad,
                        totalCognitiveCost: newCost,
                        status
                    },
                    profile: {
                        ...state.profile,
                        totalSessions: state.profile.totalSessions + 1,
                        // [CRITICAL LOGIC] Persistent Phase Transition
                        learningPhase: state.profile.totalSessions + 1 >= 3 ? 'ADAPTIVE' : state.profile.totalSessions + 1 >= 1 ? 'NOVICE' : 'INIT',
                        lastSessionDate: new Date().toISOString()
                    }
                };
            }),
        resetDailyLoad: ()=>set((state)=>({
                    dailyLoad: {
                        date: new Date().toISOString().split('T')[0],
                        totalCognitiveCost: 0,
                        status: 'Safe'
                    }
                })),
        updateCapacity: (newCapacity)=>set((state)=>({
                    profile: {
                        ...state.profile,
                        currentCapacity: newCapacity
                    }
                })),
        setProfile: (profile)=>set(()=>({
                    profile
                })),
        // --- REMOTE TERMINATION STATE ---
        terminationState: null,
        // --- ACTIVE SESSION ACTIONS ---
        startActiveSession: (lectureId, durationMinutes, subjectId)=>set(()=>({
                    activeSession: {
                        lectureId,
                        subjectId,
                        startTime: Date.now(),
                        originalDuration: durationMinutes,
                        pausedAt: null,
                        totalPausedTime: 0,
                        isActive: true
                    },
                    terminationState: null // Reset on start
                })),
        pauseActiveSession: ()=>set((state)=>{
                if (!state.activeSession || state.activeSession.pausedAt) return {};
                return {
                    activeSession: {
                        ...state.activeSession,
                        pausedAt: Date.now()
                    }
                };
            }),
        resumeActiveSession: ()=>set((state)=>{
                if (!state.activeSession || !state.activeSession.pausedAt) return {};
                const pauseDuration = Date.now() - state.activeSession.pausedAt;
                return {
                    activeSession: {
                        ...state.activeSession,
                        pausedAt: null,
                        totalPausedTime: state.activeSession.totalPausedTime + pauseDuration
                    }
                };
            }),
        endActiveSession: (penalty = false, isRemoteKill = false, terminationPayload)=>set((state)=>{
                console.log("[STORE] endActiveSession triggered.", {
                    active: !!state.activeSession,
                    penalty,
                    isRemoteKill,
                    hasPayload: !!terminationPayload
                });
                // REMOTE KILL: Immediate Reset (Server has already handled data)
                if (isRemoteKill) {
                    return {
                        activeSession: null,
                        terminationState: terminationPayload || null
                    };
                }
                if (!state.activeSession) return {};
                const now = Date.now();
                // 1. Calculate net duration
                let netDuration = now - state.activeSession.startTime;
                if (state.activeSession.pausedAt) {
                    netDuration -= now - state.activeSession.pausedAt;
                }
                netDuration -= state.activeSession.totalPausedTime;
                const actualMinutes = Math.max(1, Math.round(netDuration / 60000));
                // 2. Fetch Context (Lecture/Subject)
                const lecture = state.lectures.find((l)=>l.id === state.activeSession?.lectureId);
                if (!lecture) {
                    console.error("CRITICAL: Lecture not found for active session.");
                    return {
                        activeSession: null
                    };
                }
                // 3. EXECUTE COGNITIVE ENGINE (The wiring)
                let metrics = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$CognitiveEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CognitiveEngine"].calculate({
                    lectureDuration: lecture.duration,
                    actualDuration: actualMinutes,
                    relativeDifficulty: lecture.relativeDifficulty,
                    studentIndex: lecture.cognitiveIndex || null
                });
                // PENALTY OVERRIDE (Forced Close)
                if (penalty) {
                    metrics = {
                        ...metrics,
                        performanceGrade: 'C',
                        performanceIndex: 0,
                        cognitiveLoadIndex: 100 // "Maximum Penalty"
                    };
                }
                console.log("[STORE] Cognitive Metrics Calculated:", metrics);
                // 4. Construct Final Session Record
                const newSession = {
                    id: crypto.randomUUID(),
                    lectureId: lecture.id,
                    parentId: lecture.id,
                    subjectId: lecture.subjectId,
                    date: new Date().toISOString(),
                    startTime: state.activeSession.startTime,
                    endTime: now,
                    status: penalty ? 'INTERRUPTED' : actualMinutes < 5 ? 'INTERRUPTED' : 'COMPLETED',
                    // PERSISTED METRICS
                    expectedDuration: metrics.expectedStudyTimeMinutes,
                    actualDuration: actualMinutes,
                    cognitiveCost: metrics.cognitiveLoadIndex,
                    performanceIndex: metrics.performanceIndex,
                    focusPerformance: penalty ? 0 : 100
                };
                // 5. UPDATE LECTURE STATE (Persistence of Result)
                const updatedLectures = state.lectures.map((l)=>{
                    if (l.id === lecture.id) {
                        return {
                            ...l,
                            status: 'Mastered',
                            cognitiveIndex: metrics.performanceIndex,
                            grade: metrics.performanceGrade,
                            lastRevision: new Date().toISOString(),
                            stability: Math.min(100, l.stability + 10)
                        };
                    }
                    return l;
                });
                // 6. FIRESTORE SYNC (The Missing Piece)
                const user = state.authState.user;
                if (state.authState.status === 'AUTHENTICATED' && user) {
                    // Prepare Snapshot
                    const nextProfile = {
                        ...state.profile,
                        totalSessions: state.profile.totalSessions + 1,
                        learningPhase: state.profile.totalSessions + 1 >= 3 ? 'ADAPTIVE' : state.profile.totalSessions + 1 >= 1 ? 'NOVICE' : 'INIT',
                        lastSessionDate: new Date().toISOString()
                    };
                    const nextDailyLoad = {
                        ...state.dailyLoad,
                        totalCognitiveCost: state.dailyLoad.totalCognitiveCost + metrics.cognitiveLoadIndex
                    };
                    const snapshot = {
                        profile: nextProfile,
                        dailyLoad: nextDailyLoad
                    };
                    console.log("[STORE] Persisting Ended Session to Firestore...", newSession.id);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirestoreService"].saveSessionWithSnapshot(user.id, newSession, snapshot);
                }
                console.log("[STORE] Session Persisted Locally & Cloud.");
                return {
                    sessions: [
                        ...state.sessions,
                        newSession
                    ],
                    lectures: updatedLectures,
                    activeSession: null,
                    dailyLoad: {
                        ...state.dailyLoad,
                        totalCognitiveCost: state.dailyLoad.totalCognitiveCost + metrics.cognitiveLoadIndex
                    },
                    profile: {
                        ...state.profile,
                        totalSessions: state.profile.totalSessions + 1,
                        learningPhase: state.profile.totalSessions + 1 >= 3 ? 'ADAPTIVE' : state.profile.totalSessions + 1 >= 1 ? 'NOVICE' : 'INIT',
                        lastSessionDate: new Date().toISOString()
                    }
                };
            }),
        deleteLecture: (lectureId)=>set((state)=>({
                    lectures: state.lectures.filter((l)=>l.id !== lectureId),
                    sessions: state.sessions.filter((s)=>s.lectureId !== lectureId)
                })),
        clearActiveSession: ()=>set(()=>({
                    activeSession: null
                })),
        // --- AUTH IMPLEMENTATION ---
        login: async (email, pass)=>{
            try {
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$AuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthService"].login(email, pass);
                set({
                    authState: result
                });
                return true;
            } catch (e) {
                console.error("Login Failed", e);
                return false;
            }
        },
        loginWithGoogle: async ()=>{
            try {
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$AuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthService"].loginWithGoogle();
                set({
                    authState: result
                });
                // FIRESTORE SYNC: Load User Data
                if (result.status === 'AUTHENTICATED' && result.user) {
                    const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirestoreService"].loadUserData(result.user.id);
                    if (userData) {
                        set((state)=>{
                            // CRITICAL FIX: Merge persisted identity (completed flag) into AuthState
                            const updatedUser = state.authState.user && userData.identityProfile ? {
                                ...state.authState.user,
                                ...userData.identityProfile
                            } : state.authState.user;
                            // A) SIGN-UP / FIRST LOGIN LOGIC (Robust Merge)
                            if (result.user) {
                                const currentUser = result.user;
                                const existing = userData.identityProfile || {};
                                // QUOTA GUARD: THROTTLE LOGIN WRITES (1 Hour)
                                const lastLogin = existing.lastLoginAt ? new Date(existing.lastLoginAt).getTime() : 0;
                                const shouldWrite = Date.now() - lastLogin > 3600000;
                                if (shouldWrite) {
                                    // Base Payload: Always ensure Email is current
                                    const payload = {
                                        email: currentUser.email,
                                        lastActive: new Date().toISOString(),
                                        lastLoginAt: new Date().toISOString(),
                                        lastLoginDevice: navigator.userAgent,
                                        lastLoginIP: 'Unknown'
                                    };
                                    // Conditional Defaults: Only set if missing (NO OVERWRITE)
                                    if (!existing.role) payload.role = 'STUDENT';
                                    if (!existing.createdAt) payload.createdAt = new Date().toISOString();
                                    if (existing.completed === undefined) payload.completed = false;
                                    console.log("[Store] Persisting/Merging User Profile (Throttled):", payload);
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirestoreService"].saveUserProfile(currentUser.id, payload);
                                } else {
                                    console.log("[Store] Login Write Skipped (Throttled 1h)");
                                }
                                // Reflect in Local State immediately (for UI consistency)
                                if (state.authState.user) {
                                // Object.assign(state.authState.user, payload); // Don't blindly assign if we didn't generate payload components
                                }
                            }
                            const isLocalFresh = state.subjects.length === 0 && state.sessions.length === 0;
                            console.log("[Store] Merging Firestore Data. Local Fresh:", isLocalFresh);
                            // Update AuthState immediately to pass RootGate
                            if (updatedUser !== state.authState.user) {
                                state.authState.user = updatedUser; // Direct mutation ok inside set, or use spread below
                            }
                            if (!isLocalFresh && !userData.subjects.length) {
                                return {
                                    authState: {
                                        ...state.authState,
                                        user: updatedUser
                                    }
                                };
                            }
                            // SNAPSHOT HYDRATION STRATEGY
                            if (userData.stateSnapshot) {
                                console.log("[Store] Hydrating from Snapshot (User Truth)");
                                return {
                                    authState: {
                                        ...state.authState,
                                        user: updatedUser
                                    },
                                    profile: {
                                        ...state.profile,
                                        ...userData.stateSnapshot.profile
                                    },
                                    dailyLoad: {
                                        ...state.dailyLoad,
                                        ...userData.stateSnapshot.dailyLoad
                                    },
                                    subjects: userData.subjects.length > 0 ? userData.subjects : state.subjects,
                                    lectures: userData.lectures.length > 0 ? userData.lectures : state.lectures,
                                    sessions: userData.sessions.length > 0 ? userData.sessions : state.sessions
                                };
                            }
                            // FALLBACK: No Snapshot -> Recompute & Heal
                            console.warn("[Store] No Snapshot found. Recomputing from raw data...");
                            const calculatedSessions = userData.sessions.length || state.profile.totalSessions;
                            // Simple recompute logic (expand as needed)
                            const healedProfile = {
                                ...state.profile,
                                totalSessions: calculatedSessions,
                                learningPhase: calculatedSessions >= 3 ? 'ADAPTIVE' : calculatedSessions >= 1 ? 'NOVICE' : 'INIT'
                            };
                            // Initiate Healing Save (Async, don't await)
                            if (result.user) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirestoreService"].saveStateSnapshot(result.user.id, {
                                    profile: healedProfile,
                                    dailyLoad: state.dailyLoad // Keep current load or 0 if fresh
                                });
                            }
                            return {
                                authState: {
                                    ...state.authState,
                                    user: updatedUser
                                },
                                profile: healedProfile,
                                subjects: userData.subjects.length > 0 ? userData.subjects : state.subjects,
                                lectures: userData.lectures.length > 0 ? userData.lectures : state.lectures,
                                sessions: userData.sessions.length > 0 ? userData.sessions : state.sessions
                            };
                        });
                        console.log("[Store] Hydrated from Firestore", userData);
                    }
                }
                return {
                    success: true
                };
            } catch (e) {
                console.error("Google Login Failed", e);
                return {
                    success: false,
                    error: e.message || "Unknown error"
                };
            }
        },
        register: async (identity, profile)=>{
            try {
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$AuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthService"].register(identity, profile);
                set({
                    authState: result
                });
                return true;
            } catch (e) {
                console.error("Register Failed", e);
                return false;
            }
        },
        logout: async ()=>{
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$AuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthService"].logout();
            set({
                authState: {
                    status: 'GUEST',
                    user: null,
                    token: null
                }
            });
        },
        syncAuth: ()=>{
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$AuthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthService"].initCallback((result)=>{
                set((state)=>{
                    // Cleanup listener on logout
                    if (result.status !== 'AUTHENTICATED' && state.unsubscribeSnapshot) {
                        console.log("[Store] Cleaning up snapshot listener");
                        state.unsubscribeSnapshot();
                        return {
                            authState: result,
                            unsubscribeSnapshot: undefined
                        };
                    }
                    // [CRITICAL FIX] MERGE LOGIC
                    // If we are authenticated and the UID matches our hydrated local state,
                    // we MUST preserve the local profile data (completed, academicYear, etc.)
                    // because raw Firebase Auth result doesn't have them.
                    if (result.status === 'AUTHENTICATED' && result.user && state.authState.user?.id === result.user.id) {
                        // Merge Strategy: Take fresh Auth data (token, email) + Overlay Local Profile Data
                        const mergedUser = {
                            ...result.user,
                            ...state.authState.user,
                            // Explicitly re-apply fresh identity criticals if needed, 
                            // but usually local state has the correct data from previous session.
                            // To be safe, we ensure 'completed' is strictly preserved if true.
                            completed: state.authState.user.completed === true ? true : result.user.completed
                        };
                        console.log("[Store] syncAuth: Preserved Local Profile", {
                            wasCompleted: state.authState.user.completed,
                            nowCompleted: mergedUser.completed
                        });
                        return {
                            authState: {
                                ...result,
                                user: mergedUser
                            }
                        };
                    }
                    return {
                        authState: result
                    };
                });
            });
        // Note: We don't store the auth unsubscribe here as it's global.
        },
        initializeRealtimeSync: (uid)=>{
            set((state)=>{
                // Cleanup existing
                if (state.unsubscribeSnapshot) {
                    state.unsubscribeSnapshot();
                }
                console.log("[Store] Initializing Real-Time Sync for:", uid);
                // A. FIRESTORE LISTENER (Metrics Beacon)
                const unsubscribeFirestore = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirestoreService"].subscribeToSnapshot(uid, async (snapshot)=>{
                    console.log("[Store] ⚡ Snapshot Beacon Received (Metrics Update)");
                    set((currentState)=>({
                            profile: {
                                ...currentState.profile,
                                ...snapshot.profile
                            },
                            dailyLoad: {
                                ...currentState.dailyLoad,
                                ...snapshot.dailyLoad
                            }
                        }));
                });
                // B. RTDB LISTENER (Session Kill Switch & Connection)
                let unsubscribeRTDB = ()=>{};
                const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDatabaseInstance"])();
                if (db) {
                    const sessionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(db, `status/${uid}/activeSession`);
                    const cleanRTDB = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onValue"])(sessionRef, (snapshot)=>{
                        const remoteSession = snapshot.val();
                        const currentStore = get();
                        // KILL SWITCH LOGIC
                        // IF Local thinks we are active (activeSession != null)
                        // AND Remote says we are inactive (remoteSession == null)
                        // THEN Force End Local Session.
                        // KILL SWITCH LOGIC
                        // IF Local thinks we are active (activeSession != null)
                        // AND Remote says we are inactive (remoteSession == null)
                        // THEN Force End Local Session.
                        if (currentStore.activeSession && !remoteSession) {
                            console.warn("[Store] 🚨 REMOTE KILL SWITCH TRIGGERED: Session Force Ended by Server/Admin.");
                            // 1. Terminate Local Session State (Silent Reset)
                            // Pass 'true' for isRemoteKill to SKIP writes and metrics
                            currentStore.endActiveSession(false, true);
                            // 2. Hard Clear just in case
                            set({
                                activeSession: null
                            });
                        }
                    });
                    unsubscribeRTDB = ()=>cleanRTDB();
                }
                // Combined Cleanup
                const cleanup = ()=>{
                    unsubscribeFirestore();
                    unsubscribeRTDB();
                };
                return {
                    unsubscribeSnapshot: cleanup
                };
            });
        },
        openAuthModal: (mode = 'LOGIN', onSuccess)=>set({
                authModal: {
                    isOpen: true,
                    mode,
                    onSuccess
                }
            }),
        closeAuthModal: ()=>set((state)=>({
                    authModal: {
                        ...state.authModal,
                        isOpen: false,
                        onSuccess: undefined
                    }
                }))
    }), {
    name: 'academic-system-storage',
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    partialize: (state)=>({
            // Omit authModal.onSuccess which is not serializable
            ...state,
            authModal: {
                ...state.authModal,
                onSuccess: undefined
            }
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/admin.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Admin Configuration
 * 
 * Defines the list of Google UIDs that are granted Admin privileges.
 * This should be secured via Firestore Security Rules in a production app.
 * For this MVP/Demo, a client-side whitelist is sufficient for UI gating.
 */ __turbopack_context__.s([
    "ACADEMIC_YEARS",
    ()=>ACADEMIC_YEARS,
    "ADMIN_UIDS",
    ()=>ADMIN_UIDS,
    "isAdmin",
    ()=>isAdmin
]);
const ADMIN_UIDS = [
    // Add your Google UID here to facilitate testing
    '7DDyPlo4C8W9e3FjYqLwZ4xJ8u53',
    'REPLACE_WITH_YOUR_ACTUAL_UID' // Placeholder
];
const isAdmin = (uid)=>{
    return ADMIN_UIDS.includes(uid);
};
const ACADEMIC_YEARS = [
    "Year 1",
    "Year 2",
    "Year 3",
    "Year 4",
    "Year 5"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/profile/CompleteProfileView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CompleteProfileView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/FirestoreService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$admin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/admin.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function CompleteProfileView() {
    _s();
    const { authState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const [fullName, setFullName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [academicYear, setAcademicYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$admin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACADEMIC_YEARS"][0]);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // SAFETY GUARD: Show if not completed OR if fullName is missing (Migration Case)
    // Only hide if BOTH completed=true AND fullName exists.
    if (authState.user?.completed && authState.user?.fullName) {
        return null;
    }
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [nameStatus, setNameStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('IDLE');
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const validateName = (name)=>{
        const trimmed = name.trim();
        const parts = trimmed.split(/\s+/);
        const isValid = parts.length >= 3;
        const hasInvalidChars = /[0-9!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`]/.test(trimmed);
        if (hasInvalidChars) return {
            valid: false
        };
        return {
            valid: isValid
        };
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CompleteProfileView.useEffect": ()=>{
            if (!fullName) {
                setNameStatus('IDLE');
                return;
            }
            const check = validateName(fullName);
            if (check.valid) {
                setNameStatus('VALID');
            } else {
                if (fullName.length > 5) setNameStatus('INVALID');
                else setNameStatus('IDLE');
            }
        }
    }["CompleteProfileView.useEffect"], [
        fullName
    ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const check = validateName(fullName);
        if (!check.valid) {
            setNameStatus('INVALID');
            return;
        }
        setIsSubmitting(true);
        try {
            if (!authState.user?.id) throw new Error("No User ID");
            // Dynamic Import for Sentinel to avoid SSR issues if any, or just strictly Client side
            const { serverTimestamp } = await __turbopack_context__.A("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript, async loader)");
            const updates = {
                fullName: fullName.trim(),
                academicYear,
                completed: true,
                completedAt: serverTimestamp(),
                updatedAt: serverTimestamp() // Consistency
            };
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$FirestoreService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirestoreService"].saveUserProfile(authState.user.id, updates);
            const currentUser = authState.user;
            if (currentUser) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].setState((state)=>({
                        authState: {
                            ...state.authState,
                            status: 'AUTHENTICATED',
                            user: {
                                ...currentUser,
                                ...updates
                            }
                        }
                    }));
            }
        } catch (err) {
            console.error(err);
            setErrorMessage(language === 'en' ? "Connection Error" : "خطأ في الاتصال");
            setIsSubmitting(false);
        }
    };
    const t = {
        title: language === 'en' ? "Academic Profile" : "الملف الأكاديمي",
        subtitle: language === 'en' ? "Contextual calibration" : "المعايرة السياقية",
        welcome: language === 'en' ? "Welcome, Doctor" : "أهلاً بك يا دكتور",
        nameLabel: language === 'en' ? "Full Name" : "الاسم الكامل",
        namePlaceholder: language === 'en' ? "Mohamed Ahmed Mahmoud" : "محمد أحمد محمود",
        yearLabel: language === 'en' ? "Current Academic Year" : "السنة الدراسية الحالية",
        yearHelper: language === 'en' ? "You can change this later from your profile settings." : "يمكنك تغيير هذا لاحقًا من الإعدادات.",
        button: language === 'en' ? "Initialize System" : "بدء النظام"
    };
    const isRtl = language === 'ar';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[999999] bg-[#020617] flex items-center justify-center font-sans overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-600/20 rounded-full blur-[120px]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                        lineNumber: 109,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[100px]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                        lineNumber: 110,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 opacity-[0.03]",
                        style: {
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                        lineNumber: 111,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                lineNumber: 108,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-[480px] mx-4 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col items-center overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                        lineNumber: 118,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setLanguage('en'),
                                className: `text-[11px] font-bold tracking-wider ${!isRtl ? 'text-white' : 'text-slate-500'}`,
                                children: "EN"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                lineNumber: 121,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-[1px] h-3 bg-white/20"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                lineNumber: 122,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setLanguage('ar'),
                                className: `text-[11px] font-bold tracking-wider ${isRtl ? 'text-white' : 'text-slate-500'}`,
                                children: "AR"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                lineNumber: 123,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                        lineNumber: 120,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center w-full mb-8 mt-2 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-semibold text-white tracking-tight mb-1 drop-shadow-lg",
                                children: t.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                lineNumber: 127,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] uppercase tracking-[0.2em] text-indigo-200/70 font-medium",
                                children: t.subtitle
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                lineNumber: 130,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 w-full justify-center my-6 opacity-60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[1px] w-16 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                        lineNumber: 135,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                        className: "w-5 h-5 text-indigo-300",
                                        strokeWidth: 1.5
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                        lineNumber: 136,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[1px] w-16 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                        lineNumber: 137,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                lineNumber: 134,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-[15px] font-medium text-slate-200",
                                children: t.welcome
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                lineNumber: 140,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                        lineNumber: 126,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "w-full flex flex-col gap-6",
                        dir: isRtl ? 'rtl' : 'ltr',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[13px] font-medium text-slate-300 ml-1",
                                        children: t.nameLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                        lineNumber: 148,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors group-focus-within:text-indigo-400 ${isRtl ? 'right-4' : 'left-4'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                                lineNumber: 152,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: fullName,
                                                onChange: (e)=>setFullName(e.target.value),
                                                placeholder: t.namePlaceholder,
                                                className: `w-full py-3.5 bg-[#0B1120]/60 border text-sm text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:bg-[#0B1120]/90 focus:border-indigo-500/80 transition-all shadow-inner ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-11'} ${nameStatus === 'VALID' ? 'border-emerald-500/50 shadow-emerald-500/10' : 'border-white/10 hover:border-white/20'}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                                lineNumber: 155,
                                                columnNumber: 29
                                            }, this),
                                            nameStatus === 'VALID' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none animate-in fade-in zoom-in duration-300 ${isRtl ? 'left-4' : 'right-4'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    className: "w-4 h-4",
                                                    strokeWidth: 3
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                                lineNumber: 163,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                        lineNumber: 151,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                lineNumber: 147,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[13px] font-medium text-slate-300 ml-1",
                                        children: t.yearLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                        lineNumber: 171,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors group-focus-within:text-indigo-400 ${isRtl ? 'right-4' : 'left-4'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                                lineNumber: 175,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: academicYear,
                                                onChange: (e)=>setAcademicYear(e.target.value),
                                                className: `w-full py-3.5 bg-[#0B1120]/60 border border-white/10 hover:border-white/20 text-sm text-white rounded-xl focus:outline-none focus:bg-[#0B1120]/90 focus:border-indigo-500/80 appearance-none cursor-pointer transition-all shadow-inner ${isRtl ? 'pr-11 pl-11' : 'pl-11 pr-11'}`,
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$admin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACADEMIC_YEARS"].map((year)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: year,
                                                        className: "bg-slate-900 text-white",
                                                        children: year
                                                    }, year, false, {
                                                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                                lineNumber: 178,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none ${isRtl ? 'left-4' : 'right-4'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                                lineNumber: 187,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                        lineNumber: 174,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-slate-500 pl-1",
                                        children: t.yearHelper
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                        lineNumber: 191,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                lineNumber: 170,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isSubmitting || nameStatus !== 'VALID',
                                className: `mt-2 w-full py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg ${isSubmitting || nameStatus !== 'VALID' ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5' : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-[1.01] border border-white/10'}`,
                                children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center justify-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                            lineNumber: 206,
                                            columnNumber: 33
                                        }, this),
                                        "Initializing..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                    lineNumber: 205,
                                    columnNumber: 29
                                }, this) : t.button
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                lineNumber: 196,
                                columnNumber: 21
                            }, this),
                            errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center text-rose-400 text-xs mt-2 animate-pulse",
                                children: errorMessage
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                                lineNumber: 212,
                                columnNumber: 38
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                        lineNumber: 145,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
                lineNumber: 116,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/profile/CompleteProfileView.tsx",
        lineNumber: 106,
        columnNumber: 9
    }, this);
}
_s(CompleteProfileView, "izaVg5qJrQZoCaEKtHqUp/cNi84=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = CompleteProfileView;
var _c;
__turbopack_context__.k.register(_c, "CompleteProfileView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/engines/FlowEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowEngine",
    ()=>FlowEngine
]);
const FlowEngine = {
    getInitialState: ()=>({
            currentState: 'SUBJECT_LIST',
            selectedSubjectId: undefined,
            tempCalibration: {
                familiarity: 50,
                focus: 50,
                time: 25
            },
            tempRegistration: {
                type: 'Theory',
                duration: 60,
                understanding: 50,
                demand: 'Moderate'
            }
        }),
    /**
     * Determines the next state based on the current state and user input.
     */ nextState: (current, input)=>{
        switch(current){
            case 'ORIENTATION':
                return 'SUBJECT_LIST';
            case 'SUBJECT_LIST':
                if (input === 'ADD_SUBJECT') return 'SUBJECT_ADD_NAME';
                // Else input is subject ID
                return 'INTENT_ACTION'; // "What are you planning?" for selected subject
            case 'SUBJECT_ADD_NAME':
                return 'SUBJECT_LIST'; // Skip Exam Date Question
            case 'SUBJECT_SETUP_DATE':
                return 'SUBJECT_LIST'; // Done adding
            case 'INTENT':
                return 'INTENT_ACTION';
            case 'INTENT_ACTION':
                if (input === 'ACTION_REGISTER') return 'REG_TYPE';
                return 'CALIBRATION_FAMILIARITY';
            // --- REGISTRATION FLOW ---
            case 'REG_TYPE':
                return 'REG_DURATION';
            case 'REG_DURATION':
                return 'REG_UNDERSTANDING';
            case 'REG_UNDERSTANDING':
                return 'SUMMARY'; // Skipped REG_DEMAND
            case 'REG_DEMAND':
                return 'SUMMARY';
            // --- STUDY FLOW ---
            case 'CALIBRATION_FAMILIARITY':
                return 'CALIBRATION_FOCUS';
            case 'CALIBRATION_FOCUS':
                return 'CALIBRATION_TIME';
            case 'CALIBRATION_TIME':
                return 'STUDY_EXECUTION';
            case 'STUDY_EXECUTION':
                return 'REFLECTION_CHECK';
            case 'REFLECTION_CHECK':
                if (input === false) return 'REFLECTION_REASON';
                return 'SUMMARY';
            case 'REFLECTION_REASON':
                return 'SUMMARY';
            case 'SUMMARY':
                return 'SUBJECT_LIST'; // Back to list
            default:
                return 'SUBJECT_LIST';
        }
    },
    /**
     * Returns the Translation Key for the current state.
     */ getQuestionKey: (state)=>{
        switch(state){
            case 'SUBJECT_LIST':
                return 'subject_list_empty'; // Or special handling
            case 'SUBJECT_ADD_NAME':
                return 'subject_name';
            case 'SUBJECT_SETUP_DATE':
                return 'exam_date';
            case 'INTENT':
                return 'intent';
            case 'INTENT_ACTION':
                return 'action_required';
            case 'REG_TYPE':
                return 'type_q';
            case 'REG_DURATION':
                return 'duration_q';
            case 'REG_UNDERSTANDING':
                return 'understanding_q';
            case 'REG_DEMAND':
                return 'demand_q';
            case 'CALIBRATION_FAMILIARITY':
                return 'fam_q';
            case 'CALIBRATION_FOCUS':
                return 'focus_q';
            case 'CALIBRATION_TIME':
                return 'time_q';
            case 'STUDY_EXECUTION':
                return 'session_active';
            case 'REFLECTION_CHECK':
                return 'reflection_q';
            case 'REFLECTION_REASON':
                return 'reason_q';
            case 'SUMMARY':
                return 'cycle_complete';
            default:
                return '...';
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/SingleQuestionView.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "binaryBtn": "SingleQuestionView-module__Akm0dW__binaryBtn",
  "binaryOptions": "SingleQuestionView-module__Akm0dW__binaryOptions",
  "container": "SingleQuestionView-module__Akm0dW__container",
  "dateInput": "SingleQuestionView-module__Akm0dW__dateInput",
  "enterBtn": "SingleQuestionView-module__Akm0dW__enterBtn",
  "gridBtn": "SingleQuestionView-module__Akm0dW__gridBtn",
  "gridBtnActive": "SingleQuestionView-module__Akm0dW__gridBtnActive",
  "gridContainer": "SingleQuestionView-module__Akm0dW__gridContainer",
  "hint": "SingleQuestionView-module__Akm0dW__hint",
  "inputArea": "SingleQuestionView-module__Akm0dW__inputArea",
  "key": "SingleQuestionView-module__Akm0dW__key",
  "question": "SingleQuestionView-module__Akm0dW__question",
  "scaleNumber": "SingleQuestionView-module__Akm0dW__scaleNumber",
  "scaleNumberActive": "SingleQuestionView-module__Akm0dW__scaleNumberActive",
  "slider": "SingleQuestionView-module__Akm0dW__slider",
  "sliderContainer": "SingleQuestionView-module__Akm0dW__sliderContainer",
  "sliderLabels": "SingleQuestionView-module__Akm0dW__sliderLabels",
  "sliderScale": "SingleQuestionView-module__Akm0dW__sliderScale",
  "sliderValueDisplay": "SingleQuestionView-module__Akm0dW__sliderValueDisplay",
  "textInput": "SingleQuestionView-module__Akm0dW__textInput",
});
}),
"[project]/src/core/i18n/translations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const translations = {
    en: {
        orientation: "Regulate your academic load, one decision at a time.",
        auth_check: "Verifying credentials...",
        auth_login: "Identify yourself.",
        intent: "What is your current academic focus?",
        subject_list_empty: "No courses enrolled.",
        add_subject: "Enroll Course",
        subject_name: "Course Title",
        exam_date: "Examination Date",
        action_required: "Action Required",
        register_class: "Log Class",
        study_now: "Start Session",
        type_q: "Session Format?",
        duration_q: "Duration?",
        understanding_q: "Your level of understanding of the lecture from the college professor's explanation?",
        demand_q: "Cognitive Demand?",
        duration_note: "Duration of the university record",
        duration_warning: "Note: You must record any lecture or section at the college using your personal phone. Here, you will record the duration of the recording you made.",
        fam_q: "Topic Familiarity?",
        focus_q: "Current Focus Level?",
        time_q: "Allocated Time?",
        session_active: "SESSION IN PROGRESS",
        reflection_q: "Session Outcome?",
        reason_q: "Primary Factor?",
        cycle_complete: "Cycle Logged.",
        // Actions
        yes: "Yes",
        no: "No",
        theory: "Theory",
        practical: "Practical",
        revision: "Revision",
        very_light: "Minimal",
        light: "Low",
        moderate: "Moderate",
        heavy: "High",
        very_heavy: "Intense",
        safe: "Optimal",
        medium: "Moderate",
        // Dashboard
        dashboard: "Overview",
        sessions: "History",
        academic_input: "Input Registry",
        inject_input: "Log Session",
        questions: "Inquiry",
        settings: "Configuration",
        system_capacity: "MENTAL CAPACITY",
        nominal_state: "OPTIMAL",
        depleted_state: "FATIGUED",
        cognitive_load: "COGNITIVE LOAD",
        units: "UNITS",
        status: "CONDITION",
        velocity: "PACE",
        cycles: "SESSIONS",
        active_subjects: "Curriculum",
        inspect: "ACCESS",
        stability: "RETENTION",
        exam_in: "EXAM",
        days: "DAYS",
        // Academic Input Empty State
        input_guide_title: "No Academic Records",
        input_guide_desc: "Begin by logging your recent lectures, labs, or revision sessions to calibrate your cognitive load.",
        log_entry: "Log First Session",
        // Branding
        brand_name: "CORTEX",
        brand_subtitle: "ACADEMIC CONTROL SYSTEM",
        // Navigation Hints
        press_enter: "Press Enter to continue",
        select_option_hint: "Select option and press Enter (or double tap)",
        low_label: "LOW",
        high_label: "HIGH",
        stop_session: "STOP SESSION",
        // Table
        col_item: "Item Name",
        col_type: "Type",
        col_duration: "Duration",
        col_diff: "Difficulty",
        col_delta: "Delta",
        col_status: "Status",
        col_actions: "Actions",
        status_ready: "READY",
        status_progress: "IN PROGRESS",
        status_completed: "COMPLETED",
        status_interrupted: "INTERRUPTED",
        diff_avg: "Avg",
        sess_scan: "Inspect",
        sess_start: "Start Session",
        sess_del: "Delete",
        empty_state: "No academic structure found. Add a Lecture to begin.",
        study_session_label: "Study Session",
        lecture_label: "Lecture",
        section_label: "Section",
        avg_session: "Avg Session",
        avg_diff: "Avg Difficulty",
        total_sessions: "Total Sessions",
        // Durations
        min_15: "15 min",
        min_30: "30 min",
        min_45: "45 min",
        hr_1: "1 hr",
        hr_1_15: "1 hr, 15 min",
        hr_1_30: "1 hr, 30 min",
        hr_1_45: "1 hr, 45 min",
        hr_2: "2 hr",
        enter_btn: "ENTER",
        // Settings - Physiology
        physio_config: "Physiology Configuration",
        sys_regulation: "System Regulation Rules & Thresholds",
        cancel: "Cancel",
        save_changes: "Save Changes",
        sys_strictness: "System Strictness",
        level_relaxed: "Relaxed",
        level_standard: "Standard",
        level_military: "Military",
        cog_thresholds: "Cognitive Thresholds",
        load_limit_label: "Load Limit until System Lockout",
        limit_conservative: "50% (Conservative)",
        limit_none: "100% (No Limit)",
        revision_strategy: "Revision Strategy",
        strat_spaced: "Spaced Repetition (Standard)",
        strat_jit: "Just-in-Time (Exam Focused)",
        strat_aggressive: "Aggressive (Maintenance)",
        sys_override: "System Override",
        override_warning: "Changing these values will recalibrate all upcoming session predictions for this subject. Existing stability metrics will be preserved.",
        // Expected Time (New)
        hours: "hours",
        minutes: "minutes",
        expectedTime: "Expected study time"
    },
    ar: {
        orientation: "نظم حملك الدراسي، قراراً تلو الآخر.",
        auth_check: "جار التحقق...",
        auth_login: "تسجيل الدخول",
        intent: "ما هو تركيزك الدراسي الحالي؟",
        subject_list_empty: "لا توجد مقررات مسجلة.",
        add_subject: "إضافة مقرر",
        subject_name: "اسم المقرر",
        exam_date: "موعد الاختبار",
        action_required: "إجراء مطلوب",
        register_class: "تسجيل حصة",
        study_now: "بدء الجلسة",
        type_q: "نوع الجلسة؟",
        duration_q: "المدة؟",
        understanding_q: "مستوى فهمك للمحاضرة من شرح دكتور الكلية؟",
        demand_q: "الجهد الذهني؟",
        duration_note: "مدة السجل الجامعي",
        duration_warning: "ملاحظة: يجب عليك تسجيل أي محاضرة أو سكشن في الكلية باستخدام هاتفك الشخصي. هنا، ستقوم بتحديد مدة التسجيل الذي سجلته بهاتفك.",
        fam_q: "مستوى الإلمام؟",
        focus_q: "مستوى التركيز الحالي؟",
        time_q: "الوقت المخصص؟",
        session_active: "الجلسة جارية",
        reflection_q: "نتيجة الجلسة؟",
        reason_q: " العامل الرئيسي؟",
        cycle_complete: "تم التسجيل.",
        // Actions
        yes: "نعم",
        no: "لا",
        theory: "نظري",
        practical: "عملي",
        revision: "مراجعة",
        very_light: "أدنى",
        light: "منخفض",
        moderate: "متوسط",
        heavy: "عالي",
        very_heavy: "مكثف",
        safe: "مثالي",
        medium: "متوسط",
        // Dashboard
        dashboard: "نظرة عامة",
        sessions: "السجل",
        academic_input: "سجل المدخلات",
        inject_input: "تسجيل جلسة",
        questions: "استعلام",
        settings: "الإعدادات",
        system_capacity: "السعة الذهنية",
        nominal_state: "مثالية",
        depleted_state: "مجهدة",
        cognitive_load: "الحمل المعرفي",
        units: "وحدة",
        status: "الحالة",
        velocity: "الوتيرة",
        cycles: "جلسة",
        active_subjects: "المقررات",
        inspect: "دخول",
        stability: "التمكن",
        exam_in: "الاختبار",
        days: "أيام",
        // Academic Input Empty State
        input_guide_title: "لا توجد سجلات أكاديمية",
        input_guide_desc: "ابدأ بتسجيل محاضراتك ودروسك العملية لمعايرة الحمل المعرفي.",
        log_entry: "تسجيل أول جلسة",
        // Branding
        brand_name: "كورتيكس",
        brand_subtitle: "نظام التحكم الأكاديمي",
        // Navigation Hints
        press_enter: "اضغط Enter للمتابعة",
        select_option_hint: "اختر إجابة واضغط Enter (أو انقر مرتين)",
        low_label: "منخفض",
        high_label: "عالي",
        stop_session: "إنهاء الجلسة",
        // Table
        col_item: "العنصر",
        col_type: "النوع",
        col_duration: "المدة",
        col_diff: "الصعوبة",
        col_delta: "الأداء",
        col_status: "الحالة",
        col_actions: "إجراءات",
        status_ready: "جاهز",
        status_progress: "قيد التنفيذ",
        status_completed: "مكتمل",
        status_interrupted: "توقف",
        diff_avg: "المتوسط",
        sess_scan: "فحص",
        sess_start: "بدء",
        sess_del: "حذف",
        empty_state: "لا توجد سجلات أكاديمية. ابدأ بإضافة محاضرة.",
        study_session_label: "جلسة دراسية",
        lecture_label: "محاضرة",
        section_label: "عملي",
        avg_session: "متوسط الجلسة",
        avg_diff: "متوسط الصعوبة",
        total_sessions: "إجمالي الجلسات",
        // Durations
        min_15: "15 دقيقة",
        min_30: "30 دقيقة",
        min_45: "45 دقيقة",
        hr_1: "1 ساعة",
        hr_1_15: "1 ساعة، 15 دقيقة",
        hr_1_30: "1 ساعة، 30 دقيقة",
        hr_1_45: "1 ساعة، 45 دقيقة",
        hr_2: "2 ساعة",
        enter_btn: "إدخال",
        // Settings - Physiology
        physio_config: "إعدادات الفيزيولوجيا",
        sys_regulation: "قواعد التنظيم النظامي",
        cancel: "إلغاء",
        save_changes: "حفظ التغييرات",
        sys_strictness: "صرامة النظام",
        level_relaxed: "مرن",
        level_standard: "قياسي",
        level_military: "عسكري",
        cog_thresholds: "العتبات المعرفية",
        load_limit_label: "حد الحمل قبل إغلاق النظام",
        limit_conservative: "50% (محافظ)",
        limit_none: "100% (بلا حد)",
        revision_strategy: "استراتيجية المراجعة",
        strat_spaced: "تكرار متباعد (قياسي)",
        strat_jit: "في الوقت المناسب (تركيز الاختبار)",
        strat_aggressive: "هجومي (صيانة)",
        sys_override: "تجاوز النظام",
        override_warning: "تغيير هذه القيم سيؤدي إلى إعادة معايرة جميع توقعات الجلسات القادمة لهذا المقرر. سيتم الاحتفاظ بمقاييس الاستقرار الحالية.",
        // Expected Time (New)
        hours: "ساعات",
        minutes: "دقائق",
        expectedTime: "وقت الدراسة المتوقع"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/SingleQuestionView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SingleQuestionView",
    ()=>SingleQuestionView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/layout/SingleQuestionView.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$corner$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CornerDownLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/corner-down-left.js [app-client] (ecmascript) <export default as CornerDownLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/i18n/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function SingleQuestionView({ question, subtitle, warning, inputType, value, onChange, onConfirm, placeholder, options, lang }) {
    _s();
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][lang];
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' && onConfirm) {
            onConfirm();
        }
    };
    // Global Enter Key Handler for Grid/None types
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "SingleQuestionView.useEffect": ()=>{
            const handleGlobalKeyDown = {
                "SingleQuestionView.useEffect.handleGlobalKeyDown": (e)=>{
                    if (e.key === 'Enter' && onConfirm) {
                        // Only trigger for Grid or None (Message) types
                        // Inputs like Text/Slider handle their own Enter key events via onKeyDown prop
                        // to avoid double-firing.
                        if (inputType === 'grid' || inputType === 'none') {
                            // Check if value is selected for grid?
                            // Usually safe to call confirm, page logic handles validation if needed.
                            if (inputType === 'grid' && (value === undefined || value === null)) return;
                            onConfirm();
                        }
                    }
                }
            }["SingleQuestionView.useEffect.handleGlobalKeyDown"];
            window.addEventListener('keydown', handleGlobalKeyDown);
            return ({
                "SingleQuestionView.useEffect": ()=>window.removeEventListener('keydown', handleGlobalKeyDown)
            })["SingleQuestionView.useEffect"];
        }
    }["SingleQuestionView.useEffect"], [
        inputType,
        value,
        onConfirm
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].question,
                children: question
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this),
            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: '1rem',
                    color: '#ffffff',
                    marginTop: '-1rem',
                    marginBottom: '0.5rem',
                    opacity: 0.8,
                    textAlign: 'center'
                },
                children: subtitle
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                lineNumber: 65,
                columnNumber: 17
            }, this),
            warning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: '1.05rem',
                    color: '#ef4444',
                    marginTop: '0.5rem',
                    marginBottom: '1.5rem',
                    fontWeight: 500,
                    maxWidth: '600px',
                    textAlign: 'center',
                    lineHeight: '1.5'
                },
                children: warning
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                lineNumber: 79,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputArea,
                children: [
                    inputType === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textInput,
                        value: value || '',
                        onChange: (e)=>onChange && onChange(e.target.value),
                        onKeyDown: handleKeyDown,
                        placeholder: placeholder,
                        autoFocus: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                        lineNumber: 95,
                        columnNumber: 21
                    }, this),
                    inputType === 'slider' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sliderContainer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sliderValueDisplay,
                                children: [
                                    value || 5,
                                    " / 10"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                                lineNumber: 108,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "range",
                                min: "1",
                                max: "10",
                                step: "1",
                                value: value || 5,
                                onChange: (e)=>onChange && onChange(Number(e.target.value)),
                                onKeyDown: handleKeyDown,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slider,
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                                lineNumber: 111,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sliderScale,
                                children: [
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6,
                                    7,
                                    8,
                                    9,
                                    10
                                ].map((num)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: value === num ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scaleNumberActive : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scaleNumber,
                                        onClick: ()=>onChange && onChange(num),
                                        children: num
                                    }, num, false, {
                                        fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                                        lineNumber: 124,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                                lineNumber: 122,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sliderLabels,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: t.low_label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                                        lineNumber: 134,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: t.high_label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                                        lineNumber: 135,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                                lineNumber: 133,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                        lineNumber: 107,
                        columnNumber: 21
                    }, this),
                    inputType === 'binary' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].binaryOptions,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].binaryBtn,
                                onClick: ()=>{
                                    onChange && onChange(true);
                                    onConfirm && onConfirm();
                                },
                                children: t.yes
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                                lineNumber: 142,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].binaryBtn,
                                onClick: ()=>{
                                    onChange && onChange(false);
                                    onConfirm && onConfirm();
                                },
                                children: t.no
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                                lineNumber: 143,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                        lineNumber: 141,
                        columnNumber: 21
                    }, this),
                    inputType === 'grid' && options && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].gridContainer,
                        children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].gridBtn} ${value === opt.value ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].gridBtnActive : ''}`,
                                onClick: ()=>{
                                    onChange && onChange(opt.value);
                                },
                                onDoubleClick: ()=>{
                                    onChange && onChange(opt.value);
                                    onConfirm && onConfirm();
                                },
                                children: opt.label
                            }, opt.label, false, {
                                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                                lineNumber: 150,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                        lineNumber: 148,
                        columnNumber: 21
                    }, this),
                    inputType === 'date' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dateInput,
                        value: value || '',
                        onChange: (e)=>onChange && onChange(e.target.value),
                        onKeyDown: handleKeyDown,
                        autoFocus: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                        lineNumber: 163,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                lineNumber: 93,
                columnNumber: 13
            }, this),
            inputType !== 'binary' && inputType !== 'none' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].enterBtn,
                onClick: ()=>onConfirm && onConfirm(),
                children: [
                    t.enter_btn,
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$corner$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CornerDownLeft$3e$__["CornerDownLeft"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                        lineNumber: 176,
                        columnNumber: 35
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                lineNumber: 175,
                columnNumber: 17
            }, this),
            inputType === 'grid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hint,
                children: t.select_option_hint
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
                lineNumber: 181,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/SingleQuestionView.tsx",
        lineNumber: 60,
        columnNumber: 9
    }, this);
}
_s(SingleQuestionView, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = SingleQuestionView;
var _c;
__turbopack_context__.k.register(_c, "SingleQuestionView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/ControlLayout.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "avatarInitials": "ControlLayout-module__xAmKTa__avatarInitials",
  "backdrop": "ControlLayout-module__xAmKTa__backdrop",
  "brandName": "ControlLayout-module__xAmKTa__brandName",
  "brandSubtitle": "ControlLayout-module__xAmKTa__brandSubtitle",
  "contentViewport": "ControlLayout-module__xAmKTa__contentViewport",
  "fadeIn": "ControlLayout-module__xAmKTa__fadeIn",
  "fullWidth": "ControlLayout-module__xAmKTa__fullWidth",
  "globalControls": "ControlLayout-module__xAmKTa__globalControls",
  "header": "ControlLayout-module__xAmKTa__header",
  "headerLeft": "ControlLayout-module__xAmKTa__headerLeft",
  "headerRight": "ControlLayout-module__xAmKTa__headerRight",
  "iconBtn": "ControlLayout-module__xAmKTa__iconBtn",
  "layoutContainer": "ControlLayout-module__xAmKTa__layoutContainer",
  "logoArea": "ControlLayout-module__xAmKTa__logoArea",
  "logoIcon": "ControlLayout-module__xAmKTa__logoIcon",
  "logoText": "ControlLayout-module__xAmKTa__logoText",
  "mainContent": "ControlLayout-module__xAmKTa__mainContent",
  "mobileMenuBtn": "ControlLayout-module__xAmKTa__mobileMenuBtn",
  "navGroup": "ControlLayout-module__xAmKTa__navGroup",
  "navItem": "ControlLayout-module__xAmKTa__navItem",
  "navItemActive": "ControlLayout-module__xAmKTa__navItemActive",
  "navLabel": "ControlLayout-module__xAmKTa__navLabel",
  "navigation": "ControlLayout-module__xAmKTa__navigation",
  "notificationArea": "ControlLayout-module__xAmKTa__notificationArea",
  "sidebar": "ControlLayout-module__xAmKTa__sidebar",
  "sidebarClosed": "ControlLayout-module__xAmKTa__sidebarClosed",
  "sidebarOpen": "ControlLayout-module__xAmKTa__sidebarOpen",
  "sidebarToggle": "ControlLayout-module__xAmKTa__sidebarToggle",
  "textBtn": "ControlLayout-module__xAmKTa__textBtn",
  "userAvatar": "ControlLayout-module__xAmKTa__userAvatar",
  "userInfo": "ControlLayout-module__xAmKTa__userInfo",
  "userName": "ControlLayout-module__xAmKTa__userName",
  "userRole": "ControlLayout-module__xAmKTa__userRole",
  "userSection": "ControlLayout-module__xAmKTa__userSection",
  "withSidebar": "ControlLayout-module__xAmKTa__withSidebar",
});
}),
"[project]/src/core/hooks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDailyLoad",
    ()=>useDailyLoad,
    "useMediaQuery",
    ()=>useMediaQuery,
    "useSessionLog",
    ()=>useSessionLog,
    "useStudentProfile",
    ()=>useStudentProfile,
    "useSubject",
    ()=>useSubject,
    "useSubjectLectures",
    ()=>useSubjectLectures,
    "useSubjectList",
    ()=>useSubjectList,
    "useSystemStatus",
    ()=>useSystemStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature();
;
;
const useStudentProfile = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "useStudentProfile.useStore": (state)=>state.profile
    }["useStudentProfile.useStore"]);
};
_s(useStudentProfile, "tRpAAnpj2/w/nb/IphdrVKKBg0Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
const useDailyLoad = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "useDailyLoad.useStore": (state)=>state.dailyLoad
    }["useDailyLoad.useStore"]);
};
_s1(useDailyLoad, "tRpAAnpj2/w/nb/IphdrVKKBg0Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
const useSystemStatus = ()=>{
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "useSystemStatus.useStore": (state)=>{
            const loadStatus = state.dailyLoad.status;
            const capacity = state.profile.currentCapacity;
            if (capacity <= 5) return 'CRITICAL';
            if (loadStatus === 'Risk') return 'LOCKED';
            if (loadStatus === 'Warning') return 'WARNING';
            return 'NOMINAL';
        }
    }["useSystemStatus.useStore"]);
};
_s2(useSystemStatus, "tRpAAnpj2/w/nb/IphdrVKKBg0Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
const useSubjectList = ()=>{
    _s3();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "useSubjectList.useStore": (state)=>state.subjects
    }["useSubjectList.useStore"]);
};
_s3(useSubjectList, "tRpAAnpj2/w/nb/IphdrVKKBg0Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
const useSubject = (subjectId)=>{
    _s4();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "useSubject.useStore": (state)=>state.subjects.find({
                "useSubject.useStore": (s)=>s.id === subjectId
            }["useSubject.useStore"])
    }["useSubject.useStore"]);
};
_s4(useSubject, "tRpAAnpj2/w/nb/IphdrVKKBg0Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
const useSubjectLectures = (subjectId)=>{
    _s5();
    const lectures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "useSubjectLectures.useStore[lectures]": (state)=>state.lectures
    }["useSubjectLectures.useStore[lectures]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useSubjectLectures.useMemo": ()=>lectures.filter({
                "useSubjectLectures.useMemo": (l)=>l.subjectId === subjectId
            }["useSubjectLectures.useMemo"])
    }["useSubjectLectures.useMemo"], [
        lectures,
        subjectId
    ]);
};
_s5(useSubjectLectures, "/csubKsFP47zeyi7JzMijGydV+w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
const useSessionLog = ()=>{
    _s6();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "useSessionLog.useStore": (state)=>state.sessions
    }["useSessionLog.useStore"]);
};
_s6(useSessionLog, "tRpAAnpj2/w/nb/IphdrVKKBg0Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
const useMediaQuery = (query)=>{
    _s7();
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMediaQuery.useEffect": ()=>{
            const media = window.matchMedia(query);
            if (media.matches !== matches) {
                setMatches(media.matches);
            }
            const listener = {
                "useMediaQuery.useEffect.listener": ()=>setMatches(media.matches)
            }["useMediaQuery.useEffect.listener"];
            media.addEventListener('change', listener);
            return ({
                "useMediaQuery.useEffect": ()=>media.removeEventListener('change', listener)
            })["useMediaQuery.useEffect"];
        }
    }["useMediaQuery.useEffect"], [
        query,
        matches
    ]);
    return matches;
};
_s7(useMediaQuery, "/aV7jSECvYA0Ea4uAEPK2AzROhs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/AuthModal.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "backBtn": "AuthModal-module__kkVAJG__backBtn",
  "backdrop": "AuthModal-module__kkVAJG__backdrop",
  "close": "AuthModal-module__kkVAJG__close",
  "divider": "AuthModal-module__kkVAJG__divider",
  "emailBtn": "AuthModal-module__kkVAJG__emailBtn",
  "error": "AuthModal-module__kkVAJG__error",
  "footerText": "AuthModal-module__kkVAJG__footerText",
  "googleBtn": "AuthModal-module__kkVAJG__googleBtn",
  "input": "AuthModal-module__kkVAJG__input",
  "inputGroup": "AuthModal-module__kkVAJG__inputGroup",
  "inputIcon": "AuthModal-module__kkVAJG__inputIcon",
  "inputWrapper": "AuthModal-module__kkVAJG__inputWrapper",
  "label": "AuthModal-module__kkVAJG__label",
  "linkBtn": "AuthModal-module__kkVAJG__linkBtn",
  "modal": "AuthModal-module__kkVAJG__modal",
  "primaryBtn": "AuthModal-module__kkVAJG__primaryBtn",
  "scaleIn": "AuthModal-module__kkVAJG__scaleIn",
  "subtitle": "AuthModal-module__kkVAJG__subtitle",
  "title": "AuthModal-module__kkVAJG__title",
});
}),
"[project]/src/components/auth/AuthModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthModal",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/auth/AuthModal.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const AuthModal = ({ open, onClose, onGoogleSignIn, onEmailSignIn, initialMode = 'LOGIN' })=>{
    _s();
    const { login, loginWithGoogle, register, authModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMode === 'REGISTER' ? 'REG_IDENTITY' : 'LOGIN');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [configValid, setConfigValid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Ensure Client-Side Rendering for Portal
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthModal.useEffect": ()=>{
            setMounted(true);
            setConfigValid((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isConfigValid"])());
            return ({
                "AuthModal.useEffect": ()=>setMounted(false)
            })["AuthModal.useEffect"];
        }
    }["AuthModal.useEffect"], []);
    // Form State
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [university, setUniversity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [faculty, setFaculty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleGoogleLogin = async ()=>{
        if (!configValid) return; // Prevent action if config is invalid
        if (onGoogleSignIn) {
            onGoogleSignIn();
            return;
        }
        setIsLoading(true);
        setError(null);
        // 2. Call Store Action (Firebase handles Popup)
        const result = await loginWithGoogle();
        setIsLoading(false);
        if (result.success) {
            if (authModal.onSuccess) authModal.onSuccess();
            onClose();
        } else {
            // Show the actual error bubbling up from Service/Firebase
            // NOTE: AuthService error throwing is caught in store which returns {success: false, error: ...}
            setError(result.error || "Google connection failed. Check console.");
        }
    };
    const handleLogin = async ()=>{
        setIsLoading(true);
        setError(null);
        const success = await login(email, password);
        setIsLoading(false);
        if (success) {
            if (authModal.onSuccess) authModal.onSuccess();
            onClose();
        } else {
            setError("Invalid credentials. Please try again.");
        }
    };
    const handleRegister = async ()=>{
        setIsLoading(true);
        setError(null);
        // Simulate Init Step
        setMode('REG_INIT');
        const success = await register({
            email,
            password
        }, {
            name,
            university,
            faculty
        });
        setIsLoading(false);
        if (success) {
            if (authModal.onSuccess) authModal.onSuccess();
            onClose();
        } else {
            setMode('REG_PROFILE');
            setError("Registration failed. Please try again.");
        }
    };
    // --- RENDER HELPERS ---
    const Input = ({ label, type, value, onChange, placeholder, icon: Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                    children: label
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/AuthModal.tsx",
                    lineNumber: 111,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: type,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                            value: value,
                            onChange: (e)=>onChange(e.target.value),
                            placeholder: placeholder
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 113,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputIcon,
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 120,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/auth/AuthModal.tsx",
                    lineNumber: 112,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/AuthModal.tsx",
            lineNumber: 110,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    if (!mounted || !open) return null;
    const handleEmailClick = ()=>{
        if (onEmailSignIn) {
            onEmailSignIn();
        } else {
            setMode('EMAIL_LOGIN');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backdrop,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modal,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].close,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/AuthModal.tsx",
                        lineNumber: 141,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/AuthModal.tsx",
                    lineNumber: 140,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                mode === 'LOGIN' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: "Welcome back"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 146,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "Sign in to sync your neural context"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 147,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 149,
                            columnNumber: 35
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].googleBtn,
                            onClick: handleGoogleLogin,
                            disabled: isLoading || !configValid,
                            style: {
                                opacity: !configValid ? 0.5 : 1,
                                cursor: !configValid ? 'not-allowed' : 'pointer',
                                filter: !configValid ? 'grayscale(100%)' : 'none'
                            },
                            title: !configValid ? "Firebase API keys are missing" : "Sign in with Google",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "https://www.svgrepo.com/show/475656/google-color.svg",
                                    alt: "Google",
                                    width: 20,
                                    height: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/AuthModal.tsx",
                                    lineNumber: 162,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                !configValid ? "Configuration Disabled" : isLoading ? "Connecting..." : "Continue with Google"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 151,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        !configValid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: '#F87171',
                                fontSize: '0.75rem',
                                textAlign: 'center',
                                marginTop: '0.5rem',
                                padding: '0.5rem',
                                background: 'rgba(127, 29, 29, 0.2)',
                                borderRadius: '6px',
                                border: '1px solid rgba(127, 29, 29, 0.5)'
                            },
                            children: [
                                "System Error: Invalid Firebase Configuration.",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/src/components/auth/AuthModal.tsx",
                                    lineNumber: 177,
                                    columnNumber: 78
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Please update .env.local with real keys."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 167,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].divider,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "or"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/AuthModal.tsx",
                                lineNumber: 183,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 182,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emailBtn,
                            onClick: handleEmailClick,
                            children: "Continue with Email"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 186,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footerText,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMode('REG_IDENTITY'),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].linkBtn,
                                children: "Don't have an account? Create Access"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/AuthModal.tsx",
                                lineNumber: 191,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 190,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true),
                mode === 'EMAIL_LOGIN' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMode('LOGIN'),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backBtn,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                size: 20,
                                className: "rotate-180"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/AuthModal.tsx",
                                lineNumber: 201,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 200,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: "Sign in with Email"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 204,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            style: {
                                marginBottom: '1.5rem'
                            },
                            children: "Enter your credentials below"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 205,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                            label: "Email Address",
                            type: "email",
                            value: email,
                            onChange: setEmail,
                            placeholder: "student@university.edu",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"]
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 207,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                            label: "Password",
                            type: "password",
                            value: password,
                            onChange: setPassword,
                            placeholder: "••••••••",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"]
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 208,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryBtn,
                            onClick: handleLogin,
                            disabled: isLoading,
                            children: isLoading ? "Authenticating..." : "Sign In"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 210,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footerText,
                            style: {
                                marginTop: '1.5rem'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].linkBtn,
                                children: "Forgot Password?"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/AuthModal.tsx",
                                lineNumber: 215,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 214,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true),
                mode === 'REG_IDENTITY' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: "Create Access"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 222,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "Secure Identity setup"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 223,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                            label: "Email Address",
                            type: "email",
                            value: email,
                            onChange: setEmail,
                            placeholder: "student@university.edu",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"]
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 225,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                            label: "Set Password",
                            type: "password",
                            value: password,
                            onChange: setPassword,
                            placeholder: "••••••••",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"]
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 226,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryBtn,
                            onClick: ()=>{
                                if (email && password) setMode('REG_PROFILE');
                            },
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            },
                            children: [
                                "Continue",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/AuthModal.tsx",
                                    lineNumber: 234,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 228,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footerText,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMode('LOGIN'),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].linkBtn,
                                children: "Back to Sign In"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/AuthModal.tsx",
                                lineNumber: 238,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 237,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true),
                mode === 'REG_PROFILE' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMode('REG_IDENTITY'),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backBtn,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                size: 20,
                                className: "rotate-180"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/AuthModal.tsx",
                                lineNumber: 246,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 245,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: "Academic Profile"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 249,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "Contextual calibration"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 250,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                            label: "Full Name",
                            type: "text",
                            value: name,
                            onChange: setName,
                            placeholder: "John Doe",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 252,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                            label: "University",
                            type: "text",
                            value: university,
                            onChange: setUniversity,
                            placeholder: "MIT",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 253,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                            label: "Faculty / Major",
                            type: "text",
                            value: faculty,
                            onChange: setFaculty,
                            placeholder: "Computer Science",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"]
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 254,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryBtn,
                            onClick: handleRegister,
                            disabled: isLoading,
                            children: isLoading ? "Creating Profile..." : "Initialize System"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 256,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true),
                mode === 'REG_INIT' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 264,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold text-white mb-2",
                            children: "Initializing System"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 265,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-500 text-sm",
                            children: "Securing workspace ledger..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/AuthModal.tsx",
                            lineNumber: 266,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/auth/AuthModal.tsx",
                    lineNumber: 263,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/AuthModal.tsx",
            lineNumber: 138,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/auth/AuthModal.tsx",
        lineNumber: 136,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)), document.body);
};
_s(AuthModal, "dwvTwO7IcaMlZz6EWpUOhxWM6Rw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = AuthModal;
var _c;
__turbopack_context__.k.register(_c, "AuthModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/admin/StudentsTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StudentsTable",
    ()=>StudentsTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)"); // Keep for Error State/Actions
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const StudentsTable = ({ students })=>{
    _s();
    const { selectStudent, adminError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Filter Logic
    const filteredStudents = students.filter((student)=>student.name?.toLowerCase().includes(searchTerm.toLowerCase()) || student.email?.toLowerCase().includes(searchTerm.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full flex flex-col flex-1 min-h-0 transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#0B1120] p-6' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-72 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                lineNumber: 28,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Search students...",
                                value: searchTerm,
                                onChange: (e)=>setSearchTerm(e.target.value),
                                className: "w-full pl-10 pr-4 py-1.5 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-900 transition-all"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                lineNumber: 29,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsFullscreen(!isFullscreen),
                                className: "flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-white/5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors",
                                title: isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen",
                                children: [
                                    isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                        lineNumber: 43,
                                        columnNumber: 41
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                        lineNumber: 43,
                                        columnNumber: 67
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isFullscreen ? 'Exit' : 'Fullscreen'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                lineNumber: 38,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-4 w-px bg-white/10 mx-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                lineNumber: 46,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-500 font-mono",
                                children: [
                                    students.length,
                                    " Total"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                lineNumber: 47,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-h-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto overflow-y-auto h-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-left text-sm border-separate border-spacing-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "sticky top-0 z-30 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-300 shadow-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-4 bg-slate-900 border-y border-l border-white/10 first:rounded-l-[14px] border-r-0 text-left",
                                            children: "Student"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                            lineNumber: 63,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-4 bg-slate-900 border-y border-white/10 text-center border-l-0 border-r-0",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                            lineNumber: 64,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-4 bg-slate-900 border-y border-white/10 text-center border-l-0 border-r-0",
                                            children: "Study State"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                            lineNumber: 65,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-4 bg-slate-900 border-y border-white/10 text-center border-l-0 border-r-0",
                                            children: "Joined"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                            lineNumber: 66,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-4 bg-slate-900 border-y border-r border-white/10 text-center last:rounded-r-[14px] border-l-0",
                                            children: "Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                            lineNumber: 67,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                    lineNumber: 62,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                lineNumber: 61,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "",
                                children: adminError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 5,
                                        className: "px-6 py-12 text-center text-red-500",
                                        children: [
                                            "Error: ",
                                            adminError
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                        lineNumber: 75,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                    lineNumber: 74,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)) : filteredStudents.length > 0 ? (()=>{
                                    // Grouping Logic (Strict 7-Tier)
                                    const groups = {
                                        1: [],
                                        2: [],
                                        3: [],
                                        4: [],
                                        5: [],
                                        6: [],
                                        7: []
                                    };
                                    filteredStudents.forEach((s)=>{
                                        const rank = s.sortRank || 7;
                                        if (!groups[rank]) groups[rank] = [];
                                        groups[rank].push(s);
                                    });
                                    const labels = {
                                        1: 'Online & In Session',
                                        2: 'Online (No Session)',
                                        3: 'Background (In Session)',
                                        4: 'Background (No Session)',
                                        5: 'Offline (In Session)',
                                        6: 'Offline (Recent)',
                                        7: 'Inactive (>7 Days)'
                                    };
                                    return Object.keys(groups).sort().map((rankKey)=>{
                                        const rank = parseInt(rankKey);
                                        const studentsInGroup = groups[rank];
                                        if (studentsInGroup.length === 0 && rank !== 7) return null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "sticky top-[47px] z-20",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 5,
                                                        className: "py-0",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-[#0B1120] py-2",
                                                            children: (()=>{
                                                                const glowMap = {
                                                                    1: 'shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)] border-emerald-500/10',
                                                                    2: 'shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)] border-emerald-500/10',
                                                                    3: 'shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)] border-blue-500/10',
                                                                    4: 'shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)] border-blue-500/10',
                                                                    5: 'shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] border-purple-500/20',
                                                                    6: 'shadow-[0_0_20px_-5px_rgba(148,163,184,0.1)] border-white/5',
                                                                    7: 'shadow-[0_0_20px_-5px_rgba(239,68,68,0.2)] border-red-500/10' // Red (Inactive)
                                                                };
                                                                const dotStyles = {
                                                                    1: 'from-emerald-300 to-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.4)]',
                                                                    2: 'from-emerald-300 to-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.4)]',
                                                                    3: 'from-blue-300 to-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.4)]',
                                                                    4: 'from-blue-300 to-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.4)]',
                                                                    5: 'from-purple-300 to-purple-600 shadow-[0_0_8px_rgba(139,92,246,0.5)]',
                                                                    6: 'from-slate-400 to-slate-700 shadow-[0_0_8px_rgba(148,163,184,0.2)]',
                                                                    7: 'from-red-300 to-red-600 shadow-[0_0_8px_rgba(239,68,68,0.4)]' // Red
                                                                };
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `inline-flex items-center gap-3 px-5 py-2 bg-slate-900/90 border rounded-full backdrop-blur-md transition-all duration-500 ${glowMap[rank] || 'border-white/5'}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `w-2.5 h-2.5 rounded-full bg-gradient-to-b shadow-sm ${dotStyles[rank]} ring-1 ring-white/20`
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                            lineNumber: 135,
                                                                            columnNumber: 73
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[11px] font-bold text-slate-200 uppercase tracking-widest",
                                                                            children: labels[rank]
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                            lineNumber: 137,
                                                                            columnNumber: 73
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-mono text-slate-500",
                                                                            children: [
                                                                                "(",
                                                                                studentsInGroup.length,
                                                                                ")"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                            lineNumber: 140,
                                                                            columnNumber: 73
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                    lineNumber: 133,
                                                                    columnNumber: 69
                                                                }, ("TURBOPACK compile-time value", void 0));
                                                            })()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 57
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, `header-${rank}`, false, {
                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 49
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                rank === 6 && studentsInGroup.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "bg-slate-900/30",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 5,
                                                        className: "px-6 py-4 text-xs text-slate-500 italic text-center",
                                                        children: "No inactive students"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 57
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 53
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                studentsInGroup.map((student)=>{
                                                    const presence = student.presence || {
                                                        status: 'offline'
                                                    };
                                                    const study = student.study || {
                                                        mode: 'none'
                                                    };
                                                    const isOnline = presence.status === 'online' || presence.status === 'background';
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "group relative cursor-pointer hover:scale-[1.002] transition-transform duration-200",
                                                        onClick: ()=>selectStudent(student),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 bg-[#0f1523] first:rounded-l-[16px] last:rounded-r-[16px] border-y border-white/[0.04] first:border-l last:border-r group-hover:bg-[#151b2b] group-hover:border-white/[0.08] transition-colors",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "relative shrink-0",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-[42px] h-[42px] rounded-full bg-slate-800 shadow-inner ring-1 ring-white/10 flex items-center justify-center text-sm font-bold text-slate-400",
                                                                                    children: (student.fullName || student.email || '?').charAt(0).toUpperCase()
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                    lineNumber: 174,
                                                                                    columnNumber: 73
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                (()=>{
                                                                                    // STRICT PRESENCE DOT COLOR (From AdminMetricsService)
                                                                                    // Values: 'green' | 'blue' | 'red' | 'gray'
                                                                                    const color = student.dotColor || 'gray';
                                                                                    let dotClass = 'bg-slate-500 shadow-sm';
                                                                                    if (color === 'green') dotClass = 'bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.6)] ring-2 ring-[#0B1120]'; // Online
                                                                                    else if (color === 'blue') dotClass = 'bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.6)] ring-2 ring-[#0B1120]'; // Background
                                                                                    else if (color === 'purple') dotClass = 'bg-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.6)] ring-2 ring-[#0B1120]'; // Offline In Session
                                                                                    else if (color === 'red') dotClass = 'bg-[#ef4444] shadow-[0_0_10px_rgba(239,68,68,0.6)] ring-2 ring-[#0B1120]'; // Inactive
                                                                                    else dotClass = 'bg-slate-500 border-2 border-[#0B1120]'; // Offline/Gray
                                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: `absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ${dotClass}`
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                        lineNumber: 191,
                                                                                        columnNumber: 81
                                                                                    }, ("TURBOPACK compile-time value", void 0));
                                                                                })()
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                            lineNumber: 173,
                                                                            columnNumber: 69
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex flex-col justify-center",
                                                                            children: [
                                                                                student.fullName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-sm font-semibold text-slate-200 group-hover:text-white transition-colors",
                                                                                    children: student.fullName
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                    lineNumber: 197,
                                                                                    columnNumber: 77
                                                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-xs font-semibold text-amber-500 flex items-center gap-1.5 animate-pulse",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                                            size: 12
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                            lineNumber: 202,
                                                                                            columnNumber: 81
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        " Profile Incomplete"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                    lineNumber: 201,
                                                                                    columnNumber: 77
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[11px] text-slate-500 group-hover:text-slate-400 font-mono mt-0.5 truncate max-w-[180px]",
                                                                                    children: student.email
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                    lineNumber: 205,
                                                                                    columnNumber: 73
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                            lineNumber: 195,
                                                                            columnNumber: 69
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                    lineNumber: 172,
                                                                    columnNumber: 65
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 61
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 text-center bg-[#0f1523] first:rounded-l-[16px] last:rounded-r-[16px] border-y border-white/[0.04] first:border-l last:border-r group-hover:bg-[#151b2b] group-hover:border-white/[0.08] transition-colors",
                                                                children: (()=>{
                                                                    switch(presence.status){
                                                                        case 'online':
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#1e293b] text-emerald-400 border border-emerald-500/20 shadow-sm",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                        lineNumber: 219,
                                                                                        columnNumber: 85
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    " Online"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                lineNumber: 218,
                                                                                columnNumber: 81
                                                                            }, ("TURBOPACK compile-time value", void 0));
                                                                        case 'background':
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#1e293b] text-blue-400 border border-blue-500/20 shadow-sm",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                                        size: 12,
                                                                                        strokeWidth: 2.5
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                        lineNumber: 225,
                                                                                        columnNumber: 85
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    " Background"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                lineNumber: 224,
                                                                                columnNumber: 81
                                                                            }, ("TURBOPACK compile-time value", void 0));
                                                                        default:
                                                                            const seenText = student.lastSeenText ? ` • ${student.lastSeenText}` : '';
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#1e293b] text-slate-500 border border-white/[0.05]",
                                                                                children: [
                                                                                    "Offline",
                                                                                    seenText
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                lineNumber: 231,
                                                                                columnNumber: 81
                                                                            }, ("TURBOPACK compile-time value", void 0));
                                                                    }
                                                                })()
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                lineNumber: 213,
                                                                columnNumber: 61
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 text-center bg-[#0f1523] first:rounded-l-[16px] last:rounded-r-[16px] border-y border-white/[0.04] first:border-l last:border-r group-hover:bg-[#151b2b] group-hover:border-white/[0.08] transition-colors",
                                                                children: (()=>{
                                                                    // STRICT RULE: "No Session" vs "In Session"
                                                                    // Logic comes purely from study.mode ('in_session' | 'no_session')
                                                                    if (study.mode === 'in_session') {
                                                                        // Check for Zombie/Expired Sessions (>12h)
                                                                        const startTime = study.startTime || presence.lastSeen || presence.lastSeenAt;
                                                                        if (startTime) {
                                                                            const diff = Date.now() - new Date(startTime).getTime();
                                                                            const hours = diff / (1000 * 60 * 60);
                                                                            if (hours > 12) {
                                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#1e293b] text-red-400 border border-red-500/20 shadow-sm animate-pulse",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                                            size: 12,
                                                                                            strokeWidth: 2.5
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                            lineNumber: 255,
                                                                                            columnNumber: 89
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        " Expired (",
                                                                                        Math.floor(hours),
                                                                                        "h)"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                    lineNumber: 254,
                                                                                    columnNumber: 85
                                                                                }, ("TURBOPACK compile-time value", void 0));
                                                                            }
                                                                        }
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#1e293b] text-indigo-300 border border-indigo-500/20 shadow-sm shadow-indigo-500/10",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                                    size: 12,
                                                                                    strokeWidth: 2.5
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                                    lineNumber: 262,
                                                                                    columnNumber: 81
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                " In Session"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                            lineNumber: 261,
                                                                            columnNumber: 77
                                                                        }, ("TURBOPACK compile-time value", void 0));
                                                                    }
                                                                    // FALLBACK: No Session (Explicitly Empty per Rule 1)
                                                                    // "Study State = EMPTY (no text, no badge)"
                                                                    return null;
                                                                })()
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                lineNumber: 241,
                                                                columnNumber: 61
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 text-center bg-[#0f1523] first:rounded-l-[16px] last:rounded-r-[16px] border-y border-white/[0.04] first:border-l last:border-r group-hover:bg-[#151b2b] group-hover:border-white/[0.08] transition-colors text-slate-500 font-mono text-xs",
                                                                suppressHydrationWarning: true,
                                                                children: student.createdAt ? new Date(student.createdAt).toISOString().split('T')[0] : "-"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                lineNumber: 272,
                                                                columnNumber: 61
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-6 py-4 text-center bg-[#0f1523] first:rounded-l-[16px] last:rounded-r-[16px] border-y border-white/[0.04] first:border-l last:border-r group-hover:bg-[#151b2b] group-hover:border-white/[0.08] transition-colors rounded-r-[16px]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                        lineNumber: 277,
                                                                        columnNumber: 69
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                    lineNumber: 276,
                                                                    columnNumber: 65
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                                lineNumber: 275,
                                                                columnNumber: 61
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, student.id, true, {
                                                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 57
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            ]
                                        }, `group-${rank}`, true, {
                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                            lineNumber: 106,
                                            columnNumber: 45
                                        }, ("TURBOPACK compile-time value", void 0));
                                    });
                                })() : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 5,
                                        className: "px-6 py-12 text-center text-slate-500",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3 rounded-full bg-slate-900/50 border border-white/5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                        className: "opacity-20",
                                                        size: 24
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                        lineNumber: 292,
                                                        columnNumber: 49
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "No students found matching your search."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                            lineNumber: 290,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                        lineNumber: 289,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                    lineNumber: 288,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                                lineNumber: 72,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/StudentsTable.tsx",
                        lineNumber: 56,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/admin/StudentsTable.tsx",
                    lineNumber: 55,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/admin/StudentsTable.tsx",
                lineNumber: 54,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/StudentsTable.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(StudentsTable, "LCAafAKhNWIj7zPybbnsADeNLcs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = StudentsTable;
var _c;
__turbopack_context__.k.register(_c, "StudentsTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/services/AdminService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminService",
    ()=>AdminService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/firebase.ts [app-client] (ecmascript)"); // Singleton Import
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript)");
;
;
;
// --- HELPER: AUTH HEADERS ---
const getAuthHeaders = async ()=>{
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthInstance"])();
    if (!auth || !auth.currentUser) {
        throw new Error("Unauthorized: No active admin session.");
    }
    const token = await auth.currentUser.getIdToken(true); // Force refresh to ensure claims are up to date
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};
const AdminService = {
    getAllStudents: async ()=>{
        try {
            console.warn("--- ADMIN SERVICE: START FETCH ---");
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestoreInstance"])();
            const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApp"])();
            if (!db) {
                return {
                    students: [],
                    error: "Firestore Instance Missing"
                };
            }
            console.warn(`[AdminService] Target Project ID: ${app.options.projectId}`);
            // 1. Query Collection Group 'profile'
            const profilesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collectionGroup"])(db, 'profile'));
            const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(profilesQuery);
            console.warn(`[AdminService] Raw Snapshot Size: ${snapshot.size}`);
            if (snapshot.empty) {
                return {
                    students: [],
                    error: null
                }; // Valid empty state
            }
            const allUsers = [];
            snapshot.forEach((doc)=>{
                const data = doc.data();
                // Parent of 'profile' collection is 'users/{uid}' doc. 
                const uid = doc.ref.parent.parent?.id;
                if (uid && data) {
                    const rawRole = data.role;
                    const normalizedRole = rawRole ? rawRole.toUpperCase() : 'STUDENT';
                    const profile = {
                        id: uid,
                        email: data.email || 'No email on record',
                        name: data.fullName || data.name || 'Unknown Student',
                        role: normalizedRole,
                        academicYear: data.academicYear,
                        completed: data.completed || false,
                        createdAt: data.createdAt || data.updatedAt || new Date().toISOString(),
                        fullName: data.fullName
                    };
                    allUsers.push(profile);
                }
            });
            // Exclude Admins
            const students = allUsers.filter((u)=>u.role !== 'ADMIN').sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            console.warn(`[AdminService] Returning ${students.length} students.`);
            return {
                students,
                error: null
            };
        } catch (error) {
            console.error("[AdminService] CRITICAL ERROR:", error);
            let errorMessage = "Unknown Error";
            if (error?.code === 'permission-denied') {
                errorMessage = "PERMISSION DENIED: Security Rules blocked access. ensuring rules are deployed.";
            } else {
                errorMessage = error.message || "Failed to fetch data";
            }
            return {
                students: [],
                error: errorMessage
            };
        }
    },
    // --- DANGEROUS ACTIONS (VIA SECURE API) ---
    // 1. DELETE STUDENT (HARD DELETE)
    deleteStudent: async (uid)=>{
        try {
            console.warn(`[AdminService] DELETING STUDENT (VIA API): ${uid}`);
            const headers = await getAuthHeaders();
            const response = await fetch('/api/admin/actions', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    action: 'DELETE_STUDENT',
                    uid
                })
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.error);
            return {
                success: true
            };
        } catch (e) {
            console.error("DELETE FAILED", e);
            return {
                success: false,
                error: e.message
            };
        }
    },
    // 2. RESET STUDENT (SOFT RESET)
    resetStudent: async (uid)=>{
        try {
            console.warn(`[AdminService] RESETTING STUDENT (VIA API): ${uid}`);
            const headers = await getAuthHeaders();
            const response = await fetch('/api/admin/actions', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    action: 'RESET_STUDENT',
                    uid
                })
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.error);
            return {
                success: true
            };
        } catch (e) {
            console.error("RESET FAILED", e);
            return {
                success: false,
                error: e.message
            };
        }
    },
    // 3. FORCE END SESSION
    forceEndSession: async (uid)=>{
        try {
            console.warn(`[AdminService] FORCE END SESSION (VIA API): ${uid}`);
            const headers = await getAuthHeaders();
            const response = await fetch('/api/admin/actions', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    action: 'FORCE_END_SESSION',
                    uid
                })
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.error);
            return {
                success: true
            };
        } catch (e) {
            console.error("FORCE END FAILED", e);
            return {
                success: false,
                error: e.message
            };
        }
    }
}; // (Helper moved to top)
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/admin/StudentInspector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StudentInspector",
    ()=>StudentInspector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$stop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StopCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-stop.js [app-client] (ecmascript) <export default as StopCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$AdminService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/AdminService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const StudentInspector = ({ student, onClose })=>{
    _s();
    const [confirmModal, setConfirmModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        type: null
    });
    const handleAction = async ()=>{
        if (!confirmModal.action) return;
        await confirmModal.action();
        setConfirmModal({
            ...confirmModal,
            open: false
        });
        onClose(); // Close inspector after drastic action (optional, but cleaner for Delete/Reset)
    };
    // ACTION HANDLERS
    const requestForceEnd = ()=>{
        setConfirmModal({
            open: true,
            type: 'FORCE_END',
            action: async ()=>{
                if (student?.id) await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$AdminService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminService"].forceEndSession(student.id);
            }
        });
    };
    const requestReset = ()=>{
        setConfirmModal({
            open: true,
            type: 'RESET',
            action: async ()=>{
                if (student?.id) await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$AdminService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminService"].resetStudent(student.id);
            }
        });
    };
    const requestDelete = ()=>{
        setConfirmModal({
            open: true,
            type: 'DELETE',
            action: async ()=>{
                if (student?.id) await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$AdminService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminService"].deleteStudent(student.id);
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: student && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: onClose,
                    className: "fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[9999]"
                }, void 0, false, {
                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                    lineNumber: 62,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        x: '100%'
                    },
                    animate: {
                        x: 0
                    },
                    exit: {
                        x: '100%'
                    },
                    transition: {
                        type: 'spring',
                        damping: 25,
                        stiffness: 200
                    },
                    className: "fixed inset-y-0 right-0 z-[10000] w-full max-w-md bg-[#0F172A] border-l border-white/5 shadow-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-[#0F172A]/90 backdrop-blur-md border-b border-white/5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-semibold text-slate-100 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `w-2 h-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] ${student.study?.sessionActive ? 'bg-indigo-500 shadow-indigo-500/50' : 'bg-emerald-500'}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 81,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Student Profile"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                    lineNumber: 80,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                        lineNumber: 88,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                    lineNumber: 84,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                            lineNumber: 79,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 space-y-8 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center text-center space-y-3 pb-6 border-b border-white/5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg relative",
                                            children: [
                                                student.name?.charAt(0)?.toUpperCase() || '?',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-[#0F172A] ${student.dotColor === 'green' ? 'bg-emerald-500' : student.dotColor === 'blue' ? 'bg-blue-500' : student.dotColor === 'purple' ? 'bg-purple-500' : student.dotColor === 'red' ? 'bg-red-500' : 'bg-slate-500'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 97,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-semibold text-white",
                                                    children: student.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-400",
                                                    children: student.email
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 102,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                student.role
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 106,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                    lineNumber: 96,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                student.study?.sessionActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-indigo-400 font-bold text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                                            size: 16,
                                                            className: "animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                            lineNumber: 117,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Active Session"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-mono text-indigo-300/70",
                                                    children: "Running"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 115,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-medium text-white",
                                                    children: "Study Session"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                student.study.startTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-indigo-200/50",
                                                    children: [
                                                        "Started: ",
                                                        new Date(student.study.startTime).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 125,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: requestForceEnd,
                                            className: "w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$stop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StopCircle$3e$__["StopCircle"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Force End Session"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 137,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                    lineNumber: 114,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-center text-slate-500 text-xs italic",
                                    children: "No active session"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                    lineNumber: 146,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs font-bold text-slate-500 uppercase tracking-widest pl-1",
                                            children: "Academic Context"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 153,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 rounded-xl bg-slate-900/50 border border-white/5 flex flex-col gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-500 text-xs flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                                    lineNumber: 156,
                                                                    columnNumber: 106
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                " Year"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                            lineNumber: 156,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-200 font-medium",
                                                            children: student.academicYear || "N/A"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 rounded-xl bg-slate-900/50 border border-white/5 flex flex-col gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-500 text-xs flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                                    lineNumber: 160,
                                                                    columnNumber: 106
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                " Status"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                            lineNumber: 160,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: student.completed ? "text-emerald-400 font-medium" : "text-rose-400 font-medium",
                                                            children: student.completed ? "Active" : "Incomplete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                            lineNumber: 161,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 154,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                    lineNumber: 152,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs font-bold text-slate-500 uppercase tracking-widest pl-1",
                                            children: "System Metadata"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 170,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-3 rounded-lg bg-slate-900/30 border border-white/5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-2 rounded bg-slate-800 text-slate-400",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                    size: 14
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                                    lineNumber: 174,
                                                                    columnNumber: 102
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                                lineNumber: 174,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-slate-500",
                                                                        children: "User ID"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                                        lineNumber: 176,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-mono text-slate-300",
                                                                        children: student.id
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                                        lineNumber: 177,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                                lineNumber: 175,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-3 rounded-lg bg-slate-900/30 border border-white/5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-2 rounded bg-slate-800 text-slate-400",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                    size: 14
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                                    lineNumber: 183,
                                                                    columnNumber: 102
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                                lineNumber: 183,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-slate-500",
                                                                        children: "Joined"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                                        lineNumber: 185,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-slate-300",
                                                                        children: student.createdAt ? new Date(student.createdAt).toLocaleDateString() : "Unknown"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                                        lineNumber: 186,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                                lineNumber: 184,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 171,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                    lineNumber: 169,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-8 mt-4 border-t border-white/5 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs font-bold text-rose-500/50 uppercase tracking-widest pl-1 mb-4",
                                            children: "Danger Zone"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 197,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: requestReset,
                                            className: "w-full py-3 px-4 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 text-amber-500 text-sm font-medium transition-colors border border-amber-500/20 flex items-center justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Reset Student Data"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 199,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: requestDelete,
                                            className: "w-full py-3 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-sm font-bold transition-colors border border-rose-500/20 flex items-center justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Delete Account Permanently"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 207,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                    lineNumber: 196,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                            lineNumber: 93,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                    lineNumber: 71,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)),
                confirmModal.open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-[10001] flex items-center justify-center p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/80 backdrop-blur-sm",
                            onClick: ()=>setConfirmModal({
                                    ...confirmModal,
                                    open: false
                                })
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                            lineNumber: 222,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scale: 0.95
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            className: "relative bg-[#0F172A] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 text-white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `p-3 rounded-full ${confirmModal.type === 'DELETE' ? 'bg-rose-500/20 text-rose-500' : 'bg-amber-500/20 text-amber-500'}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                size: 24
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                lineNumber: 230,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 229,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-lg",
                                                    children: confirmModal.type === 'DELETE' ? 'Delete Account' : confirmModal.type === 'RESET' ? 'Reset Data' : 'End Session'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-400",
                                                    children: "Action Required"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 232,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                    lineNumber: 228,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-300 leading-relaxed",
                                    children: confirmModal.type === 'DELETE' ? "Are you sure you want to permanently delete this account? This will wipe all Firestore and Realtime data. This action cannot be undone." : confirmModal.type === 'RESET' ? "This will erase all study data, metrics, and progress, but preserve the account login. The student will start fresh." : "Are you sure you want to force end this active session? This will stop the timer immediately."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                    lineNumber: 240,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 rounded-lg bg-slate-900 border border-white/5 space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-500",
                                            children: "Target User"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 250,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-mono text-white",
                                            children: student.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 251,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs font-mono text-slate-500",
                                            children: student.email
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 252,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                    lineNumber: 249,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setConfirmModal({
                                                    ...confirmModal,
                                                    open: false
                                                }),
                                            className: "flex-1 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 256,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleAction,
                                            className: `flex-1 py-2.5 rounded-lg text-white text-sm font-bold transition-colors ${confirmModal.type === 'DELETE' ? 'bg-rose-600 hover:bg-rose-500' : confirmModal.type === 'RESET' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-indigo-600 hover:bg-indigo-500'}`,
                                            children: confirmModal.type === 'DELETE' ? 'Delete Permanently' : 'Confirm'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                            lineNumber: 262,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                                    lineNumber: 255,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/StudentInspector.tsx",
                            lineNumber: 223,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/admin/StudentInspector.tsx",
                    lineNumber: 221,
                    columnNumber: 25
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/admin/StudentInspector.tsx",
        lineNumber: 58,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(StudentInspector, "nQZdu/4J7Dc7pebM5HWkJwFEIYw=");
_c = StudentInspector;
var _c;
__turbopack_context__.k.register(_c, "StudentInspector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/services/AdminMetricsService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminMetricsService",
    ()=>AdminMetricsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$database$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/database/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/database/dist/index.esm.js [app-client] (ecmascript)");
;
;
;
const AdminMetricsService = {
    // --- DUAL LAYER AGGREGATION SERVICE ---
    subscribeToDashboard: (callback)=>{
        // 0. Lazy Initialization (Safe)
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestoreInstance"])();
        const dbRTDB = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDatabaseInstance"])();
        if (!db) {
            console.error("[AdminMetrics] Firestore Failed to Initialize - Check Auth/Network");
            return ()=>{}; // Return no-op cleanup
        }
        // 1. Static Query (Firestore)
        const profilesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collectionGroup"])(db, 'profile'));
        // 2. Live Query (RTDB) (Already initialized above)
        // 3. Maps (In-Memory Join)
        let studentsMap = new Map();
        let liveStatusMap = new Map();
        // 4. Merging Logic
        const emit = ()=>{
            const combined = [];
            let onlineCount = 0;
            const NOW = Date.now();
            const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
            studentsMap.forEach((rawProfile, uid)=>{
                const profile = rawProfile;
                // --- 1. PARSE FIRESTORE DATA (Fallback & Profile) ---
                let lastLoginMs = 0;
                if (profile.lastLoginAt) {
                    try {
                        const val = profile.lastLoginAt;
                        lastLoginMs = typeof val === 'string' ? new Date(val).getTime() : val.seconds * 1000;
                    } catch (e) {}
                }
                // --- 2. PARSE RTDB DATA (Live State) ---
                const rtdbStatus = liveStatusMap.get(uid);
                // Active Session Logic: Presence of object = In Session
                const activeSessionData = rtdbStatus?.activeSession;
                const isSessionActive = !!activeSessionData;
                // Presence Logic:
                let rawStatus = rtdbStatus?.state || 'offline';
                // LAST SEEN FALLBACK STRATEGY
                // Priority: RTDB lastChanged > Firestore lastLoginAt
                let effectiveLastSeen = rtdbStatus?.lastSeenAt || lastLoginMs;
                // --- 3. SESSION-CENTRIC CLASSIFICATION (STRICT FINAL) ---
                let finalMode = 'none';
                let sortRank = 7;
                // RULE 2: STUDY STATE IS SESSION-DRIVEN (No other factor)
                // This is calculated independently of Presence Group for the "Study State" column
                const strictStudyMode = isSessionActive ? 'in_session' : 'no_session';
                // STATUS DEFINITIONS (STRICT 7-TIER)
                if (isSessionActive) {
                    // MUST BE IN SESSION (Study State = In Session)
                    if (rawStatus === 'online') {
                        // 1. Online & In Session
                        finalMode = 'in_session';
                        sortRank = 1;
                    } else if (rawStatus === 'background') {
                        // 3. Background (In Session)
                        finalMode = 'background_session';
                        sortRank = 3;
                    } else {
                        // 5. Offline In Session
                        // (Disconnected but session not ended)
                        finalMode = 'offline_session';
                        sortRank = 5;
                    }
                } else {
                    // NO SESSION (Study State = No Session)
                    if (rawStatus === 'online') {
                        // 2. Online & No Session
                        finalMode = 'browsing';
                        sortRank = 2;
                    } else if (rawStatus === 'background') {
                        // 4. Background (No Session)
                        finalMode = 'idle';
                        sortRank = 4;
                    } else {
                        // OFFLINE
                        if (NOW - lastLoginMs > SEVEN_DAYS_MS) {
                            // 7. Inactive (> 7 Days) - RED ALERT
                            finalMode = 'inactive';
                            sortRank = 7;
                        } else {
                            // 6. Offline (Recent)
                            finalMode = 'offline_recent';
                            sortRank = 6;
                        }
                    }
                }
                // SAFETY FALLBACK (MANDATORY per Issue 2)
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                // --- AVATAR PRESENCE DOT Logic (STRICT SINGLE SOURCE OF TRUTH) ---
                // RULE: SINGLE SOURCE OF TRUTH "presenceState"
                // Values: 'ONLINE', 'BACKGROUND', 'OFFLINE_IN_SESSION', 'OFFLINE', 'INACTIVE'
                let presenceDotStatus = 'OFFLINE'; // Default
                let dotColor = 'gray'; // Default
                if (rawStatus === 'online') {
                    presenceDotStatus = 'ONLINE';
                    dotColor = 'green';
                } else if (rawStatus === 'background') {
                    presenceDotStatus = 'BACKGROUND';
                    dotColor = 'blue';
                } else {
                    // OFFLINE BRANCH
                    // 1. Check for Active Session (Study State Priority)
                    if (isSessionActive) {
                        presenceDotStatus = 'OFFLINE_IN_SESSION';
                        dotColor = 'purple'; // "Studying without connection"
                    } else {
                        // 2. Check for Inactivity
                        if (NOW - lastLoginMs > SEVEN_DAYS_MS) {
                            presenceDotStatus = 'INACTIVE';
                            dotColor = 'red';
                        } else {
                            presenceDotStatus = 'OFFLINE';
                            dotColor = 'gray'; // Offline Recent
                        }
                    }
                }
                // VERIFICATION CHECK:
                // If dotColor is not one of green, blue, red, gray -> Something wrong.
                // But logic above guarantees it.
                // --- 4. COUNTERS LOGIC ---
                // Online = groups (1 + 2)
                if (sortRank === 1 || sortRank === 2) onlineCount++;
                // --- 5. LAST SEEN TEXT ---
                let lastSeenText = '';
                if (sortRank >= 5) {
                    if (effectiveLastSeen > 0) {
                        const diff = NOW - effectiveLastSeen;
                        if (diff < 60000) lastSeenText = 'Just now';
                        else if (diff < 3600000) lastSeenText = `${Math.floor(diff / 60000)}m ago`;
                        else if (diff < 86400000) lastSeenText = `${Math.floor(diff / 3600000)}h ago`;
                        else lastSeenText = `${Math.floor(diff / 86400000)}d ago`;
                    } else {
                        lastSeenText = 'Never';
                    }
                }
                // --- 6. DATA PREP ---
                const studyState = {
                    mode: strictStudyMode,
                    lastInteractionAt: effectiveLastSeen,
                    sessionActive: isSessionActive,
                    startTime: activeSessionData?.startedAt || null,
                    sessionContext: activeSessionData ? {
                        id: activeSessionData.sessionId,
                        lectureId: activeSessionData.lectureId,
                        subjectId: activeSessionData.subjectId
                    } : null
                };
                const presenceState = {
                    status: rawStatus,
                    dotStatus: presenceDotStatus,
                    lastSeenAt: effectiveLastSeen,
                    currentPage: rtdbStatus?.currentPage || null
                };
                // Sorting Timestamp:
                // 1) activeSession.lastHeartbeat (Not tracked explicitly? use lastSeenAt if in session)
                // 2) presence.lastSeenAt
                // 3) profile.lastLoginAt
                const sortTimestamp = effectiveLastSeen;
                combined.push({
                    ...profile,
                    name: profile.fullName || profile.name || profile.onboardingName || "User",
                    presence: presenceState,
                    study: studyState,
                    dotColor,
                    lastSeenText,
                    sortRank,
                    sortTimestamp
                });
            });
            // --- FINAL SORT ---
            // 1. Sort by Rank (Ascending)
            // 2. Sort by Recency (Descending) inside Rank
            combined.sort((a, b)=>{
                if (a.sortRank !== b.sortRank) return a.sortRank - b.sortRank;
                return b.sortTimestamp - a.sortTimestamp;
            });
            // --- AGGREGATE METRICS ---
            let stats = {
                onlineCount: 0,
                inSessionCount: 0,
                backgroundStudyingCount: 0,
                offlineRecentCount: 0,
                inactiveCount: 0
            };
            combined.forEach((s)=>{
                // Online = groups (1 + 2)
                if (s.sortRank === 1 || s.sortRank === 2) stats.onlineCount++; // Double count check? No, onlineCount var above was local. 
                // Studying = groups (1)
                if (s.sortRank === 1) stats.inSessionCount++;
                // Focusing right now = groups (3 + 5) (Background/Offline but session active)
                if (s.sortRank === 3 || s.sortRank === 5) stats.backgroundStudyingCount++;
                // Inactive = group (7)
                if (s.sortRank === 7) stats.inactiveCount++;
                // Offline Recent (6)
                if (s.sortRank === 6) stats.offlineRecentCount++;
            });
            callback({
                students: combined,
                total: combined.length,
                subscribed: 0,
                onlineCount: stats.onlineCount,
                stats
            });
        };
        // 5. Subscriptions
        // A. Firestore Profiles (Static)
        const unsubProfiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(profilesQuery, (snap)=>{
            snap.docs.forEach((doc)=>{
                const uid = doc.ref.parent.parent?.id;
                if (uid && doc.data().role !== 'ADMIN') {
                    const d = doc.data();
                    studentsMap.set(uid, {
                        id: uid,
                        ...d,
                        name: d.fullName || d.name
                    });
                }
            });
            emit();
        }, (error)=>{
            console.error("[AdminMetrics] PROFILES ERROR:", error);
        });
        // B. RTDB Status (Live)
        let refOffWrapper = ()=>{};
        if (dbRTDB) {
            const statusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(dbRTDB, 'status');
            const onStatusChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onValue"])(statusRef, (snap)=>{
                const val = snap.val();
                if (val) {
                    liveStatusMap.clear();
                    Object.keys(val).forEach((uid)=>{
                        liveStatusMap.set(uid, val[uid]);
                    });
                } else {
                    liveStatusMap.clear();
                }
                emit();
            });
            refOffWrapper = ()=>onStatusChange();
        }
        // C. Heartbeat Re-evaluator (Updates "time ago" text)
        const reval = setInterval(emit, 5000);
        return ()=>{
            clearInterval(reval);
            unsubProfiles();
            refOffWrapper();
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/admin/AdminLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminLayout",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$StudentsTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/StudentsTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$StudentInspector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/StudentInspector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$AdminMetricsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/AdminMetricsService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const AdminLayout = ()=>{
    _s();
    const { authState, selectedStudent, selectStudent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(); // Removed fetchStudents (handled by real-time service)
    const [currentView, setCurrentView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('STUDENTS');
    // Real-Time Dashboard State
    const [dashboard, setDashboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        students: [],
        total: 0,
        subscribed: 0,
        onlineCount: 0,
        stats: {
            onlineCount: 0,
            inSessionCount: 0,
            backgroundStudyingCount: 0,
            offlineRecentCount: 0,
            inactiveCount: 0
        }
    });
    // Real-Time Subscription
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLayout.useEffect": ()=>{
            const unsub = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$AdminMetricsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminMetricsService"].subscribeToDashboard({
                "AdminLayout.useEffect.unsub": (data)=>{
                    setDashboard(data);
                }
            }["AdminLayout.useEffect.unsub"]);
            return ({
                "AdminLayout.useEffect": ()=>unsub()
            })["AdminLayout.useEffect"];
        }
    }["AdminLayout.useEffect"], []);
    // Navigation Items
    const navItems = [
        {
            id: 'OVERVIEW',
            label: 'Overview',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"]
        },
        {
            id: 'STUDENTS',
            label: 'Students',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
        },
        {
            id: 'SYSTEM',
            label: 'System Health',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex w-full h-screen bg-[#0B1120] text-white font-sans overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "w-64 border-r border-white/5 bg-slate-950/50 backdrop-blur-xl flex flex-col z-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-16 flex items-center px-6 border-b border-white/5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                        className: "text-white w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                        lineNumber: 55,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                    lineNumber: 54,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-sm font-bold tracking-wide text-slate-100",
                                    children: [
                                        "ACADEMIC",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-indigo-400",
                                            children: "OS"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                            lineNumber: 58,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                    lineNumber: 57,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/AdminLayout.tsx",
                            lineNumber: 53,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                        lineNumber: 52,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 px-3 py-6 space-y-1",
                        children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrentView(item.id),
                                className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${currentView === item.id ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                        lineNumber: 74,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    item.label
                                ]
                            }, item.id, true, {
                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                lineNumber: 66,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-t border-white/5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 px-2 py-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400",
                                    children: authState.user?.name?.charAt(0) || 'A'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                    lineNumber: 83,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium text-slate-200",
                                            children: "Admin Console"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                            lineNumber: 87,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-slate-500 font-mono",
                                            children: "v1.0.2 Stable"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                            lineNumber: 88,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                    lineNumber: 86,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/AdminLayout.tsx",
                            lineNumber: 82,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                        lineNumber: 81,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 flex flex-col min-w-0 bg-[#0B1120] relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "h-16 border-b border-white/5 bg-slate-950/30 backdrop-blur-sm flex items-center justify-between px-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-white tracking-tight",
                                children: navItems.find((n)=>n.id === currentView)?.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                lineNumber: 98,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-emerald-400 px-2 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/10 flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 103,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Live System"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                        lineNumber: 102,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden md:flex items-center gap-4 px-3 py-1 bg-white/5 rounded-full border border-white/5 text-xs text-slate-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Online: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-emerald-400",
                                                        children: dashboard.onlineCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 43
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 108,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-px h-3 bg-white/10"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 109,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Studying: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-indigo-400",
                                                        children: dashboard.stats?.inSessionCount || 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 110,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-px h-3 bg-white/10"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 111,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Inactive: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-red-400",
                                                        children: dashboard.stats?.inactiveCount || 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 112,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-px h-3 bg-white/10"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 113,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Total Web: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-slate-200",
                                                        children: dashboard.total
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 46
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 114,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                        lineNumber: 107,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                lineNumber: 101,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                        lineNumber: 97,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-8 overflow-hidden",
                        children: [
                            currentView === 'STUDENTS' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-6 h-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$StudentsTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentsTable"], {
                                    students: dashboard.students
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                    lineNumber: 123,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                lineNumber: 122,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            currentView === 'OVERVIEW' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-4 gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-2 relative overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-0 right-0 p-4 opacity-10",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                            size: 48,
                                                            className: "text-emerald-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-bold text-emerald-300",
                                                        children: "Online Now"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-4xl font-bold text-emerald-400 tracking-tight",
                                                        children: dashboard.stats?.onlineCount || 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-emerald-300/80 font-medium",
                                                        children: "Live on Platform"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 132,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col gap-2 relative overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-0 right-0 p-4 opacity-10",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                            size: 48,
                                                            className: "text-indigo-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                            lineNumber: 144,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-bold text-indigo-300",
                                                        children: "Active Sessions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-4xl font-bold text-indigo-400 tracking-tight",
                                                        children: dashboard.stats?.inSessionCount || 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-indigo-300/80 font-medium",
                                                        children: "Focusing right now"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 148,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 142,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-2xl bg-slate-900/50 border border-white/5 flex flex-col gap-2 relative overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium text-slate-400",
                                                        children: "Offline (Recent)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-4xl font-bold text-slate-300 tracking-tight",
                                                        children: dashboard.stats?.offlineRecentCount || 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 154,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-500",
                                                        children: "Active < 7 days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 152,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-2xl bg-red-500/5 border border-red-500/10 flex flex-col gap-2 relative overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-bold text-red-400",
                                                        children: "Inactive"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-4xl font-bold text-red-500 tracking-tight",
                                                        children: dashboard.stats?.inactiveCount || 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-red-400/80",
                                                        children: "> 7 Days Absent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 159,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                        lineNumber: 130,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-6 w-1/2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-2xl bg-slate-900/30 border border-white/5 flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-slate-500",
                                                                children: "Total Registered"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                                lineNumber: 170,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-white",
                                                                children: dashboard.total
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                        size: 24,
                                                        className: "text-slate-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 168,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 rounded-2xl bg-slate-900/30 border border-white/5 flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-slate-500",
                                                                children: "Premium Members"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                                lineNumber: 177,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-amber-400",
                                                                children: dashboard.subscribed
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                                lineNumber: 178,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                                        size: 24,
                                                        className: "text-amber-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                                lineNumber: 175,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                        lineNumber: 167,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                lineNumber: 128,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            currentView === 'SYSTEM' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center h-full text-slate-500 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                        size: 48,
                                        className: "opacity-20"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                        lineNumber: 187,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "System Configuration"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                        lineNumber: 188,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                                lineNumber: 186,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/AdminLayout.tsx",
                        lineNumber: 120,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                lineNumber: 95,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$StudentInspector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentInspector"], {
                student: selectedStudent,
                onClose: ()=>selectStudent(null)
            }, void 0, false, {
                fileName: "[project]/src/components/admin/AdminLayout.tsx",
                lineNumber: 195,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/AdminLayout.tsx",
        lineNumber: 47,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AdminLayout, "NERjYzNWNcsd8Xv/ooYka+A3s6Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = AdminLayout;
var _c;
__turbopack_context__.k.register(_c, "AdminLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/ControlLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ControlLayout",
    ()=>ControlLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/ControlLayout.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevrons-left.js [app-client] (ecmascript) <export default as ChevronsLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevrons-right.js [app-client] (ecmascript) <export default as ChevronsRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/i18n/translations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/AuthModal.tsx [app-client] (ecmascript)");
// INTERNAL COMPONENT FOR ANIMATION
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/AdminLayout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
const ControlLayout = ({ children, currentView, onNavigate, lang, onToggleLang, theme, onToggleTheme })=>{
    _s();
    const systemStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSystemStatus"])();
    // REMOVED local theme state, now controlled props
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaQuery"])('(max-width: 768px)');
    // Complex Sidebar State
    // Desktop: true = Expanded, false = Mini Rail
    // Mobile: true = Open (Overlay), false = Closed (Hidden)
    const [sidebarLocal, setSidebarLocal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Auto-close sidebar on mobile nav
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ControlLayout.useEffect": ()=>{
            if (isMobile) {
                setSidebarLocal(false); // Default closed on mobile load
            } else {
                setSidebarLocal(true); // Default open on desktop
            }
        }
    }["ControlLayout.useEffect"], [
        isMobile
    ]);
    const { authState, authModal, openAuthModal, closeAuthModal, logout, isAdminMode, setAdminMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const user = authState.user;
    const isGuest = authState.status === 'GUEST';
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][lang];
    // Toggle Handler
    const toggleSidebar = ()=>setSidebarLocal(!sidebarLocal);
    // Dynamic Classes
    const sidebarClass = isMobile ? sidebarLocal ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebarOpen : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebarClosed : sidebarLocal ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebarOpen : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebarClosed; // Same naming, CSS handles diffs
    const mainContentClass = isMobile ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent // No margin on mobile
     : `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent} ${sidebarLocal ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].withSidebar : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fullWidth}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].layoutContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: mainContentClass,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerLeft,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notificationArea,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconBtn,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                lineNumber: 91,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                            lineNumber: 90,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                        lineNumber: 89,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].userSection,
                                        children: isGuest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>openAuthModal('LOGIN'),
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textBtn} bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all`,
                                            style: {
                                                border: '1px solid rgba(59, 130, 246, 0.3)'
                                            },
                                            children: "Sign In"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                            lineNumber: 96,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].userAvatar,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatarInitials,
                                                        children: user?.name.charAt(0) || 'U'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                        lineNumber: 106,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].userInfo,
                                                    style: isMobile ? {
                                                        display: 'none'
                                                    } : {},
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].userName,
                                                            children: user?.name || 'Student'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                            lineNumber: 109,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].userRole,
                                                            children: user?.role || 'STUDENT'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                !isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: logout,
                                                    className: "ml-4 text-slate-500 hover:text-red-400 transition-colors",
                                                    title: "Sign Out",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                        lineNumber: 94,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                lineNumber: 87,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            user?.role === 'ADMIN' && !isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setAdminMode(true),
                                    className: "text-[10px] font-bold text-indigo-400 border border-indigo-500/30 px-6 py-2 rounded-full hover:bg-indigo-500/10 transition-colors tracking-wide animate-pulse",
                                    children: "ENTER ADMIN MODE"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                    lineNumber: 125,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                lineNumber: 124,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerRight,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].globalControls,
                                        children: [
                                            !isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: onToggleLang,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textBtn,
                                                children: lang === 'en' ? 'EN | AR' : 'AR | EN'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                lineNumber: 138,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: onToggleTheme,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconBtn,
                                                children: theme === 'dark' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 53
                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 74
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                lineNumber: 142,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                        lineNumber: 136,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileMenuBtn,
                                        onClick: toggleSidebar,
                                        children: sidebarLocal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                            lineNumber: 150,
                                            columnNumber: 49
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                            lineNumber: 150,
                                            columnNumber: 67
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                        lineNumber: 149,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                lineNumber: 134,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                        lineNumber: 86,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentViewport,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentWrapper,
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                            lineNumber: 157,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                        lineNumber: 156,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                lineNumber: 83,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            isMobile && sidebarLocal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backdrop,
                onClick: ()=>setSidebarLocal(false)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                lineNumber: 165,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebar} ${sidebarClass}`,
                children: [
                    !isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebarToggle,
                        onClick: toggleSidebar,
                        children: sidebarLocal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsRight$3e$__["ChevronsRight"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                            lineNumber: 174,
                            columnNumber: 41
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsLeft$3e$__["ChevronsLeft"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                            lineNumber: 174,
                            columnNumber: 71
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                        lineNumber: 173,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoArea,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoIcon,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                    lineNumber: 181,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                lineNumber: 180,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoText,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].brandName,
                                    children: t.brand_name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                    lineNumber: 184,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                lineNumber: 183,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                        lineNumber: 179,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navigation,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavMethod, {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                        lineNumber: 191,
                                        columnNumber: 35
                                    }, void 0),
                                    label: t.dashboard,
                                    active: currentView === 'DASHBOARD_HOME',
                                    onClick: ()=>{
                                        onNavigate('DASHBOARD_HOME');
                                        if (isMobile) setSidebarLocal(false);
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                    lineNumber: 190,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavMethod, {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                        lineNumber: 197,
                                        columnNumber: 35
                                    }, void 0),
                                    label: t.sessions,
                                    active: currentView === 'DASHBOARD_HISTORY',
                                    onClick: ()=>{
                                        onNavigate('DASHBOARD_HISTORY');
                                        if (isMobile) setSidebarLocal(false);
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                    lineNumber: 196,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavMethod, {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                        lineNumber: 203,
                                        columnNumber: 35
                                    }, void 0),
                                    label: t.academic_input,
                                    active: currentView === 'DASHBOARD_INPUTS',
                                    onClick: ()=>{
                                        onNavigate('DASHBOARD_INPUTS');
                                        if (isMobile) setSidebarLocal(false);
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                    lineNumber: 202,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavMethod, {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                        lineNumber: 209,
                                        columnNumber: 35
                                    }, void 0),
                                    label: t.settings,
                                    active: currentView === 'DASHBOARD_CONFIG',
                                    onClick: ()=>{
                                        onNavigate('DASHBOARD_CONFIG');
                                        if (isMobile) setSidebarLocal(false);
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                    lineNumber: 208,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                isMobile && !isGuest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem}`,
                                    onClick: logout,
                                    style: {
                                        marginTop: 'auto',
                                        color: '#EF4444'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                                lineNumber: 222,
                                                columnNumber: 66
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                            lineNumber: 222,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLabel,
                                            children: "Sign Out"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                            lineNumber: 223,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                                    lineNumber: 217,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                            lineNumber: 189,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                        lineNumber: 188,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                lineNumber: 169,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthModal"], {
                open: authModal.isOpen,
                initialMode: authModal.mode,
                onClose: closeAuthModal
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                lineNumber: 230,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminModeOverlay, {
                isOpen: isAdminMode,
                onClose: ()=>setAdminMode(false)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                lineNumber: 237,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
        lineNumber: 80,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ControlLayout, "cWWztp40YtHBtM/wyWLBpYZfyss=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSystemStatus"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = ControlLayout;
const NavMethod = ({ icon, label, active, onClick })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem} ${active ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''}`,
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                children: icon
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                lineNumber: 247,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLabel,
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                lineNumber: 248,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0)),
            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].activeIndicator
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                lineNumber: 249,
                columnNumber: 20
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
        lineNumber: 243,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c1 = NavMethod;
;
;
const AdminModeOverlay = ({ isOpen, onClose })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                x: '100%'
            },
            animate: {
                x: 0
            },
            exit: {
                x: '100%'
            },
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 200
            },
            style: {
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#020617',
                display: 'flex'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "fixed top-4 left-1/2 -translate-x-1/2 z-[10000] text-[10px] font-bold text-indigo-400 border border-indigo-500/30 px-6 py-2 rounded-full hover:bg-indigo-500/10 transition-colors tracking-wide animate-pulse bg-[#020617]",
                    children: "EXIT ADMIN MODE"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                    lineNumber: 275,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminLayout"], {}, void 0, false, {
                    fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
                    lineNumber: 282,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
            lineNumber: 261,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/ControlLayout.tsx",
        lineNumber: 259,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = AdminModeOverlay;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ControlLayout");
__turbopack_context__.k.register(_c1, "NavMethod");
__turbopack_context__.k.register(_c2, "AdminModeOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/Dashboard.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionBtn": "Dashboard-module__Rm6JEq__actionBtn",
  "addSubjectButton": "Dashboard-module__Rm6JEq__addSubjectButton",
  "backBtn": "Dashboard-module__Rm6JEq__backBtn",
  "briefingCard": "Dashboard-module__Rm6JEq__briefingCard",
  "briefingList": "Dashboard-module__Rm6JEq__briefingList",
  "cardBottom": "Dashboard-module__Rm6JEq__cardBottom",
  "cardTop": "Dashboard-module__Rm6JEq__cardTop",
  "detailHeader": "Dashboard-module__Rm6JEq__detailHeader",
  "detailView": "Dashboard-module__Rm6JEq__detailView",
  "dimmedCard": "Dashboard-module__Rm6JEq__dimmedCard",
  "emptyBriefing": "Dashboard-module__Rm6JEq__emptyBriefing",
  "emptyBriefingTitle": "Dashboard-module__Rm6JEq__emptyBriefingTitle",
  "examCountdown": "Dashboard-module__Rm6JEq__examCountdown",
  "fadeInBounce": "Dashboard-module__Rm6JEq__fadeInBounce",
  "headerInfo": "Dashboard-module__Rm6JEq__headerInfo",
  "headerStats": "Dashboard-module__Rm6JEq__headerStats",
  "heroCard": "Dashboard-module__Rm6JEq__heroCard",
  "heroContentRight": "Dashboard-module__Rm6JEq__heroContentRight",
  "heroGrid": "Dashboard-module__Rm6JEq__heroGrid",
  "heroIconBox": "Dashboard-module__Rm6JEq__heroIconBox",
  "heroLabel": "Dashboard-module__Rm6JEq__heroLabel",
  "heroSubtext": "Dashboard-module__Rm6JEq__heroSubtext",
  "heroUnit": "Dashboard-module__Rm6JEq__heroUnit",
  "heroValue": "Dashboard-module__Rm6JEq__heroValue",
  "iconBtn": "Dashboard-module__Rm6JEq__iconBtn",
  "inspectBtn": "Dashboard-module__Rm6JEq__inspectBtn",
  "logIcon": "Dashboard-module__Rm6JEq__logIcon",
  "logInfo": "Dashboard-module__Rm6JEq__logInfo",
  "logMain": "Dashboard-module__Rm6JEq__logMain",
  "logMeta": "Dashboard-module__Rm6JEq__logMeta",
  "logStatus": "Dashboard-module__Rm6JEq__logStatus",
  "logTitle": "Dashboard-module__Rm6JEq__logTitle",
  "metaBadge": "Dashboard-module__Rm6JEq__metaBadge",
  "metaRow": "Dashboard-module__Rm6JEq__metaRow",
  "metricGroup": "Dashboard-module__Rm6JEq__metricGroup",
  "metricValue": "Dashboard-module__Rm6JEq__metricValue",
  "miniBarBg": "Dashboard-module__Rm6JEq__miniBarBg",
  "miniBarFill": "Dashboard-module__Rm6JEq__miniBarFill",
  "miniLabel": "Dashboard-module__Rm6JEq__miniLabel",
  "orangeIcon": "Dashboard-module__Rm6JEq__orangeIcon",
  "overviewSection": "Dashboard-module__Rm6JEq__overviewSection",
  "purpleIcon": "Dashboard-module__Rm6JEq__purpleIcon",
  "readinessBlock": "Dashboard-module__Rm6JEq__readinessBlock",
  "readinessDot": "Dashboard-module__Rm6JEq__readinessDot",
  "readinessLabel": "Dashboard-module__Rm6JEq__readinessLabel",
  "scrollIndicator": "Dashboard-module__Rm6JEq__scrollIndicator",
  "sectionTitle": "Dashboard-module__Rm6JEq__sectionTitle",
  "statBlock": "Dashboard-module__Rm6JEq__statBlock",
  "statLabel": "Dashboard-module__Rm6JEq__statLabel",
  "statVal": "Dashboard-module__Rm6JEq__statVal",
  "statusMastered": "Dashboard-module__Rm6JEq__statusMastered",
  "statusPending": "Dashboard-module__Rm6JEq__statusPending",
  "statusReview": "Dashboard-module__Rm6JEq__statusReview",
  "subjectCard": "Dashboard-module__Rm6JEq__subjectCard",
  "subjectGrid": "Dashboard-module__Rm6JEq__subjectGrid",
  "subjectHeader": "Dashboard-module__Rm6JEq__subjectHeader",
  "subjectName": "Dashboard-module__Rm6JEq__subjectName",
  "subjectTitle": "Dashboard-module__Rm6JEq__subjectTitle",
  "tealIcon": "Dashboard-module__Rm6JEq__tealIcon",
  "titleBlock": "Dashboard-module__Rm6JEq__titleBlock",
  "toolbar": "Dashboard-module__Rm6JEq__toolbar",
  "unit": "Dashboard-module__Rm6JEq__unit",
});
}),
"[project]/src/components/dashboard/DashboardView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardView",
    ()=>DashboardView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/Dashboard.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/brain.js [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/i18n/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const DashboardView = ({ onSelectSubject, onAddSubject, lang })=>{
    _s();
    const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentProfile"])();
    const dailyLoad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDailyLoad"])();
    const subjects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubjectList"])();
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][lang];
    // -- Derived Visuals --
    const capacityColor = profile.currentCapacity > 50 ? '#10B981' : profile.currentCapacity > 20 ? '#F59E0B' : '#EF4444';
    // Helper to get translated dynamic values
    const getTranslatedStatus = (status)=>{
        const key = status.toLowerCase();
        // @ts-ignore
        return t[key] || status;
    };
    const getTranslatedDifficulty = (diff)=>{
        const key = diff.toLowerCase();
        // @ts-ignore
        return t[key] || diff;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboardContainer,
        children: [
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroIconBox} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tealIcon}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                            lineNumber: 54,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                        lineNumber: 53,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroLabel,
                                        children: t.system_capacity
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                        lineNumber: 56,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                lineNumber: 52,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroMainContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroValue,
                                        style: {
                                            color: capacityColor
                                        },
                                        children: [
                                            profile.currentCapacity,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                        lineNumber: 59,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroSubtext,
                                        children: profile.currentCapacity > 80 ? t.nominal_state : t.depleted_state
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                        lineNumber: 62,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                lineNumber: 58,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroIconBox} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].purpleIcon}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                            lineNumber: 72,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                        lineNumber: 71,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroLabel,
                                        children: t.cognitive_load
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                        lineNumber: 74,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                lineNumber: 70,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroMainContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroValueRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroValue,
                                                children: dailyLoad.totalCognitiveCost
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                                lineNumber: 78,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroUnit,
                                                children: t.units
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                                lineNumber: 79,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                        lineNumber: 77,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroSubtext,
                                        children: [
                                            t.status,
                                            ": ",
                                            getTranslatedStatus(dailyLoad.status).toUpperCase()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                        lineNumber: 81,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                lineNumber: 76,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroIconBox} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orangeIcon}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                            lineNumber: 91,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                        lineNumber: 90,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroLabel,
                                        children: t.velocity
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                        lineNumber: 93,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                lineNumber: 89,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroMainContent,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroValueRow,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroValue,
                                            children: profile.totalSessions
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                            lineNumber: 97,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroUnit,
                                            children: t.cycles
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                            lineNumber: 98,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                    lineNumber: 96,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                lineNumber: 95,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                        lineNumber: 88,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overviewSection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                            children: t.active_subjects
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                            lineNumber: 108,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].addSubjectButton,
                            onClick: onAddSubject,
                            children: [
                                "+ ",
                                t.add_subject
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                            lineNumber: 109,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                    lineNumber: 107,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                lineNumber: 106,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subjectGrid,
                children: subjects.map((subject)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subjectCard,
                        onClick: ()=>onSelectSubject(subject.id),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTop,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subjectHeader,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleBlock,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subjectName,
                                                children: subject.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                                lineNumber: 126,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                            lineNumber: 125,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].readinessBlock,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].readinessLabel,
                                                    children: t.stability
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].readinessDot,
                                                    style: {
                                                        backgroundColor: (subject.metrics?.stability ?? 0) > 75 ? '#10B981' : '#F59E0B'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                            lineNumber: 129,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                    lineNumber: 124,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                lineNumber: 123,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardBottom,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inspectBtn,
                                    children: [
                                        t.inspect,
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                            size: 14,
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                            lineNumber: 142,
                                            columnNumber: 45
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                    lineNumber: 141,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                                lineNumber: 140,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, subject.id, true, {
                        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                        lineNumber: 118,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardView.tsx",
                lineNumber: 116,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/DashboardView.tsx",
        lineNumber: 46,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DashboardView, "tK71e+EbIxJa7cyA01ZlogJuG0Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentProfile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDailyLoad"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubjectList"]
    ];
});
_c = DashboardView;
var _c;
__turbopack_context__.k.register(_c, "DashboardView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/SessionIntelligenceTable.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionIcon": "SessionIntelligenceTable-module__8cpmBa__actionIcon",
  "childRow": "SessionIntelligenceTable-module__8cpmBa__childRow",
  "colActions": "SessionIntelligenceTable-module__8cpmBa__colActions",
  "colDifficulty": "SessionIntelligenceTable-module__8cpmBa__colDifficulty",
  "colDuration": "SessionIntelligenceTable-module__8cpmBa__colDuration",
  "colEffort": "SessionIntelligenceTable-module__8cpmBa__colEffort",
  "colName": "SessionIntelligenceTable-module__8cpmBa__colName",
  "colStatus": "SessionIntelligenceTable-module__8cpmBa__colStatus",
  "colType": "SessionIntelligenceTable-module__8cpmBa__colType",
  "container": "SessionIntelligenceTable-module__8cpmBa__container",
  "diffBadge": "SessionIntelligenceTable-module__8cpmBa__diffBadge",
  "diffHigh": "SessionIntelligenceTable-module__8cpmBa__diffHigh",
  "diffLow": "SessionIntelligenceTable-module__8cpmBa__diffLow",
  "diffMed": "SessionIntelligenceTable-module__8cpmBa__diffMed",
  "effortEasier": "SessionIntelligenceTable-module__8cpmBa__effortEasier",
  "effortHarder": "SessionIntelligenceTable-module__8cpmBa__effortHarder",
  "effortNeutral": "SessionIntelligenceTable-module__8cpmBa__effortNeutral",
  "emptyState": "SessionIntelligenceTable-module__8cpmBa__emptyState",
  "metricBlock": "SessionIntelligenceTable-module__8cpmBa__metricBlock",
  "metricLabel": "SessionIntelligenceTable-module__8cpmBa__metricLabel",
  "metricUnit": "SessionIntelligenceTable-module__8cpmBa__metricUnit",
  "metricValue": "SessionIntelligenceTable-module__8cpmBa__metricValue",
  "metricsHeader": "SessionIntelligenceTable-module__8cpmBa__metricsHeader",
  "parentRow": "SessionIntelligenceTable-module__8cpmBa__parentRow",
  "stackCell": "SessionIntelligenceTable-module__8cpmBa__stackCell",
  "stackLabel": "SessionIntelligenceTable-module__8cpmBa__stackLabel",
  "stackValue": "SessionIntelligenceTable-module__8cpmBa__stackValue",
  "statusCompleted": "SessionIntelligenceTable-module__8cpmBa__statusCompleted",
  "statusInterrupted": "SessionIntelligenceTable-module__8cpmBa__statusInterrupted",
  "statusPending": "SessionIntelligenceTable-module__8cpmBa__statusPending",
  "statusPill": "SessionIntelligenceTable-module__8cpmBa__statusPill",
  "statusProgress": "SessionIntelligenceTable-module__8cpmBa__statusProgress",
  "tableGrid": "SessionIntelligenceTable-module__8cpmBa__tableGrid",
  "tableHeader": "SessionIntelligenceTable-module__8cpmBa__tableHeader",
  "tableRow": "SessionIntelligenceTable-module__8cpmBa__tableRow",
  "treeLine": "SessionIntelligenceTable-module__8cpmBa__treeLine",
});
}),
"[project]/src/components/dashboard/SessionIntelligenceTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SessionIntelligenceTable",
    ()=>SessionIntelligenceTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/SessionIntelligenceTable.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$corner$2d$down$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CornerDownRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/corner-down-right.js [app-client] (ecmascript) <export default as CornerDownRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-pause.js [app-client] (ecmascript) <export default as PauseCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/i18n/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const SessionIntelligenceTable = ({ subjectId, lectures, sessions, onStartSession, lang })=>{
    _s();
    const { activeSession, deleteLecture } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    // Helper for Translation
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][lang] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"].en;
    // --- 1. METRICS COMPUTE (Global Subject Level) ---
    const metrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SessionIntelligenceTable.useMemo[metrics]": ()=>{
            const completedSessions = sessions.filter({
                "SessionIntelligenceTable.useMemo[metrics].completedSessions": (s)=>s.status === 'COMPLETED' || s.status === 'INTERRUPTED'
            }["SessionIntelligenceTable.useMemo[metrics].completedSessions"]);
            const count = completedSessions.length;
            if (count === 0) return {
                avgTime: 0,
                avgDiff: "0.0",
                total: 0,
                baseline: 0
            };
            const totalDuration = completedSessions.reduce({
                "SessionIntelligenceTable.useMemo[metrics].totalDuration": (acc, s)=>acc + s.actualDuration
            }["SessionIntelligenceTable.useMemo[metrics].totalDuration"], 0);
            let totalDiff = 0;
            let diffCount = 0;
            completedSessions.forEach({
                "SessionIntelligenceTable.useMemo[metrics]": (s)=>{
                    const lecture = lectures.find({
                        "SessionIntelligenceTable.useMemo[metrics].lecture": (l)=>l.id === s.lectureId
                    }["SessionIntelligenceTable.useMemo[metrics].lecture"]);
                    if (lecture) {
                        // Fix potential NaN if relativeDifficulty is missing
                        const diff = lecture.relativeDifficulty ?? 0;
                        totalDiff += diff;
                        diffCount++;
                    }
                }
            }["SessionIntelligenceTable.useMemo[metrics]"]);
            const avgTime = Math.round(totalDuration / count);
            // Fix NaN: Check diffCount > 0 AND totalDiff is not NaN
            const avgDiffVal = diffCount > 0 ? totalDiff / diffCount : 0;
            const avgDiff = isNaN(avgDiffVal) ? "0.0" : avgDiffVal.toFixed(1);
            return {
                avgTime,
                avgDiff,
                total: count,
                baseline: avgTime || 60
            };
        }
    }["SessionIntelligenceTable.useMemo[metrics]"], [
        sessions,
        lectures
    ]);
    // --- 2. HIERARCHY BUILDER (Aggregates) ---
    const tableRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SessionIntelligenceTable.useMemo[tableRows]": ()=>{
            const rows = [];
            const theorystreams = lectures.filter({
                "SessionIntelligenceTable.useMemo[tableRows].theorystreams": (l)=>l.type === 'Theory'
            }["SessionIntelligenceTable.useMemo[tableRows].theorystreams"]);
            const sectionStreams = lectures.filter({
                "SessionIntelligenceTable.useMemo[tableRows].sectionStreams": (l)=>l.type !== 'Theory'
            }["SessionIntelligenceTable.useMemo[tableRows].sectionStreams"]);
            const processStream = {
                "SessionIntelligenceTable.useMemo[tableRows].processStream": (stream, prefix)=>{
                    stream.forEach({
                        "SessionIntelligenceTable.useMemo[tableRows].processStream": (lecture, index)=>{
                            const autoName = `${prefix}_${lecture.index || index + 1}`; // Support stored index
                            // Find Children
                            const children = sessions.filter({
                                "SessionIntelligenceTable.useMemo[tableRows].processStream.children": (s)=>s.lectureId === lecture.id
                            }["SessionIntelligenceTable.useMemo[tableRows].processStream.children"]).sort({
                                "SessionIntelligenceTable.useMemo[tableRows].processStream.children": (a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime()
                            }["SessionIntelligenceTable.useMemo[tableRows].processStream.children"]);
                            // Compute Parent Aggregates
                            const completedChildren = children.filter({
                                "SessionIntelligenceTable.useMemo[tableRows].processStream.completedChildren": (s)=>s.status !== 'IN_PROGRESS'
                            }["SessionIntelligenceTable.useMemo[tableRows].processStream.completedChildren"]);
                            const totalDuration = completedChildren.reduce({
                                "SessionIntelligenceTable.useMemo[tableRows].processStream.totalDuration": (acc, s)=>acc + s.actualDuration
                            }["SessionIntelligenceTable.useMemo[tableRows].processStream.totalDuration"], 0);
                            const showDiff = true; // Always show diff as it is calculated on creation
                            const displayDiff = lecture.relativeDifficulty ?? 0;
                            // Status
                            const isRunning = activeSession?.lectureId === lecture.id;
                            const hasHistory = completedChildren.length > 0;
                            let status = t.status_ready;
                            let statusKey = 'READY';
                            if (isRunning) {
                                status = t.status_progress;
                                statusKey = 'IN PROGRESS';
                            } else if (hasHistory) {
                                status = t.status_completed;
                                statusKey = 'COMPLETED';
                            }
                            // Add Parent
                            rows.push({
                                id: lecture.id,
                                isParent: true,
                                name: autoName,
                                type: lecture.type === 'Theory' ? t.lecture_label : t.section_label,
                                duration: hasHistory ? totalDuration : 0,
                                difficulty: displayDiff,
                                statusLabel: status,
                                statusKey: statusKey,
                                showZeroState: !hasHistory && !isRunning,
                                original: lecture,
                                indent: 0
                            });
                            // Add Children (Sessions)
                            children.forEach({
                                "SessionIntelligenceTable.useMemo[tableRows].processStream": (session)=>{
                                    let childStatus = t.status_completed;
                                    let childStatusKey = session.status || 'COMPLETED';
                                    if (session.status === 'INTERRUPTED') childStatus = t.status_interrupted;
                                    if (session.status === 'IN_PROGRESS') childStatus = t.status_progress; // Should match parent active
                                    const dateObj = new Date(session.startTime);
                                    const dateStr = dateObj.toLocaleDateString('en-GB'); // DD/MM/YYYY format preference
                                    rows.push({
                                        id: session.id,
                                        isParent: false,
                                        name: dateStr,
                                        type: t.study_session_label,
                                        duration: session.actualDuration,
                                        difficulty: displayDiff,
                                        statusLabel: childStatus,
                                        statusKey: childStatusKey,
                                        original: session,
                                        indent: 1
                                    });
                                }
                            }["SessionIntelligenceTable.useMemo[tableRows].processStream"]);
                        }
                    }["SessionIntelligenceTable.useMemo[tableRows].processStream"]);
                }
            }["SessionIntelligenceTable.useMemo[tableRows].processStream"];
            processStream(theorystreams, 'LEC');
            processStream(sectionStreams, 'SEC');
            return rows;
        }
    }["SessionIntelligenceTable.useMemo[tableRows]"], [
        lectures,
        sessions,
        activeSession,
        t
    ]);
    // --- 3. HELPER: Effort Delta ---
    const getEffortDelta = (duration, isZeroState)=>{
        return {
            text: "—",
            class: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].effortNeutral
        };
    };
    // Child Delta Helper
    const getSessionDelta = (duration)=>{
        if (metrics.baseline === 0) return {
            text: "—",
            class: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].effortNeutral
        };
        const delta = duration - metrics.baseline;
        const percent = Math.round(delta / metrics.baseline * 100);
        if (percent > 5) return {
            text: `+${percent}%`,
            class: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].effortHarder,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                size: 14
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                lineNumber: 167,
                columnNumber: 91
            }, ("TURBOPACK compile-time value", void 0))
        };
        if (percent < -5) return {
            text: `${percent}%`,
            class: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].effortEasier,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                size: 14
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                lineNumber: 168,
                columnNumber: 91
            }, ("TURBOPACK compile-time value", void 0))
        };
        return {
            text: t.diff_avg,
            class: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].effortNeutral,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                size: 14
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                lineNumber: 169,
                columnNumber: 71
            }, ("TURBOPACK compile-time value", void 0))
        };
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricsHeader,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricBlock,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricLabel,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                        lineNumber: 177,
                                        columnNumber: 57
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " ",
                                    t.avg_session
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 177,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricValue,
                                children: [
                                    metrics.avgTime,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricUnit,
                                        children: "min"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                        lineNumber: 179,
                                        columnNumber: 42
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 178,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                        lineNumber: 176,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricBlock,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricLabel,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                        lineNumber: 183,
                                        columnNumber: 57
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " ",
                                    t.avg_diff
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 183,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricValue,
                                children: metrics.avgDiff
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 184,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                        lineNumber: 182,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricBlock,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricLabel,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                        lineNumber: 187,
                                        columnNumber: 57
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " ",
                                    t.total_sessions
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 187,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricValue,
                                children: metrics.total
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 188,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                        lineNumber: 186,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                lineNumber: 175,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tableGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tableHeader,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t.col_item
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 195,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t.col_type
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 196,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t.col_duration
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 197,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t.col_diff
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 198,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t.col_delta
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 199,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Grade"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 200,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Index"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 201,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t.col_status
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 202,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t.col_actions
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                lineNumber: 203,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                        lineNumber: 194,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    tableRows.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
                        children: t.empty_state
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                        lineNumber: 207,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    tableRows.map((row, idx)=>{
                        const isParent = row.isParent;
                        const delta = isParent ? {
                            text: "—",
                            class: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].effortNeutral
                        } : getSessionDelta(row.duration);
                        // Difficulty Class
                        let diffClass = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].diffMed;
                        if (row.difficulty <= 3) diffClass = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].diffLow;
                        if (row.difficulty >= 7) diffClass = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].diffHigh;
                        // Zero State Rendering
                        const showZero = row.showZeroState;
                        // Status Styles (Based on Key, not Label)
                        let statusClass = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusPending; // Gray
                        if (row.statusKey === 'IN PROGRESS') statusClass = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusProgress; // Blue
                        if (row.statusKey === 'COMPLETED') statusClass = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusCompleted; // Green
                        if (row.statusKey === 'INTERRUPTED') statusClass = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusInterrupted; // Yellow
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tableRow} ${isParent ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].parentRow : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].childRow}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colName,
                                    children: [
                                        !isParent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].treeLine
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                            lineNumber: 235,
                                            columnNumber: 47
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        isParent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                            size: 16,
                                            color: "#64748B"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                            lineNumber: 236,
                                            columnNumber: 46
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        !isParent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$corner$2d$down$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CornerDownRight$3e$__["CornerDownRight"], {
                                            size: 14,
                                            color: "#64748B"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                            lineNumber: 237,
                                            columnNumber: 47
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        row.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                    lineNumber: 234,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colType,
                                    children: row.type
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                    lineNumber: 242,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colDuration,
                                    children: showZero ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            opacity: 0.3
                                        },
                                        children: "—"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                        lineNumber: 248,
                                        columnNumber: 45
                                    }, ("TURBOPACK compile-time value", void 0)) : `${row.duration} min`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                    lineNumber: 247,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colDifficulty,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stackCell,
                                        children: isParent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].diffBadge} ${diffClass}`,
                                            children: row.difficulty
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                            lineNumber: 255,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].diffBadge} ${diffClass}`,
                                            style: {
                                                opacity: 0.5
                                            },
                                            children: row.difficulty
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                            lineNumber: 259,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                        lineNumber: 253,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                    lineNumber: 252,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colEffort} ${delta.class}`,
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    },
                                    children: [
                                        delta.icon,
                                        " ",
                                        delta.text
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                    lineNumber: 267,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colDuration,
                                    children: row.original.grade || '—'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                    lineNumber: 272,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colDuration,
                                    style: {
                                        fontSize: '0.8rem',
                                        opacity: 0.7
                                    },
                                    children: row.original.cognitiveIndex?.toFixed(1) || '—'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                    lineNumber: 277,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colStatus,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stackCell,
                                        children: isParent && row.statusKey === 'READY' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusPending,
                                            children: row.statusLabel
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                            lineNumber: 285,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusPill} ${statusClass}`,
                                            children: row.statusLabel
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                            lineNumber: 287,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                        lineNumber: 283,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                    lineNumber: 282,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colActions,
                                    children: isParent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            row.statusKey === 'IN PROGRESS' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                title: "Starting... (Go to Timer)",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__["PauseCircle"], {
                                                    size: 18,
                                                    color: "#60A5FA"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 49
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                                lineNumber: 299,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionIcon,
                                                onClick: ()=>onStartSession(row.id),
                                                title: t.sess_start,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 49
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                                lineNumber: 303,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionIcon,
                                                title: t.sess_scan,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                                lineNumber: 312,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionIcon,
                                                title: t.sess_del,
                                                onClick: ()=>deleteLecture(row.id),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                                lineNumber: 315,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                                    lineNumber: 295,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, `${row.id}_${idx}`, true, {
                            fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                            lineNumber: 231,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
                lineNumber: 193,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/SessionIntelligenceTable.tsx",
        lineNumber: 173,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SessionIntelligenceTable, "/F1cyzwKSm/gSFWT5AtZg83Th+Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = SessionIntelligenceTable;
var _c;
__turbopack_context__.k.register(_c, "SessionIntelligenceTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/engines/CognitiveLoadEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CognitiveLoadEngine",
    ()=>CognitiveLoadEngine
]);
const CognitiveLoadEngine = {
    /**
     * Calculates the "Cost" of a specific session.
     * Logic: Cost = (Duration * Strictness) * (Weight / 5)
     */ calculateSessionCost: (session, lecture, config)=>{
        let cost = session.actualDuration;
        // 1. Strictness Impact
        // High strictness implies high intensity per minute
        if (config.strictnessLevel === 'Military') cost *= 1.2;
        if (config.strictnessLevel === 'Relaxed') cost *= 0.8;
        // 2. Cognitive Weight Scaling
        // Weight 5 is baseline. Weight 10 is double cost.
        cost *= lecture.relativeDifficulty / 5;
        // 3. Treatment Scaling
        if (config.lectureTreatment === 'Intensive') cost *= 1.5;
        // 4. Focus Performance Impact
        // Low focus (<50%) actually INCREASES cognitive cost (fighting distractions is expensive)
        // High focus (>90%) is efficient (Net zero or slight reduction)
        if (session.focusPerformance < 50) cost *= 1.2;
        if (session.focusPerformance > 90) cost *= 0.95;
        return Math.round(cost);
    },
    /**
     * Updates the Daily Load accumulator and determines System Status.
     * Enforces the "Safety Valve".
     */ analyzeLoadState: (currentLoad, addedCost, subjectConfig)=>{
        const newTotal = currentLoad.totalCognitiveCost + addedCost;
        // Base System Capacity is 100 "Standard Units" (approx 4 hours of intense work)
        // This can be scaled by the subject's MaxDailyLoad setting.
        let systemLimit = 240; // Minutes equivalent baseline
        switch(subjectConfig.maxDailyLoad){
            case 'Low':
                systemLimit = 120;
                break;
            case 'Medium':
                systemLimit = 240;
                break;
            case 'High':
                systemLimit = 360;
                break;
        }
        // Apply Personal Threshold (e.g., Stop at 80% of Max)
        const safetyValve = systemLimit * (subjectConfig.cognitiveThreshold / 100);
        // Status Determination
        let status = 'Safe';
        if (newTotal > safetyValve) {
            // Critical Breach -> Soft Lockout
            status = 'Risk';
        } else if (newTotal > safetyValve * 0.8) {
            // Warning Zone
            status = 'Warning';
        }
        return {
            ...currentLoad,
            totalCognitiveCost: newTotal,
            status
        };
    },
    /**
     * Checks if a specific action is blocked by the regulator.
     * [PRODUCT CHANGE]: ALWAYS FALSE. Analytics only.
     */ isLockedOut: (currentLoad)=>{
        return false;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/engines/CapacityEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CapacityEngine",
    ()=>CapacityEngine
]);
const CapacityEngine = {
    /**
     * Re-calculates the Student's Capacity based on today's load.
     * Should be called after every Session.
     */ calculateCurrentCapacity: (profile, dailyLoad)=>{
        // 1. Start with Profile Max (Conceptually 100%)
        let capacity = 100;
        // 2. Subtract Daily Load Impact
        // We normalize Load Units to Capacity Percentage.
        // Assuming 240 Load Units = 100% depletion.
        const depletion = dailyLoad.totalCognitiveCost / 240 * 100;
        capacity -= depletion;
        // 3. Consistency Bonus (Recovery Efficiency)
        // High consistency users recover faster / resist fatigue better.
        // Bonus: up to +10% resilience.
        if (profile.consistencyIndex > 80) capacity += 5;
        // 4. Circadian Factor (Time of Day)
        // Late night (post 10 PM) incurs extra penalty
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 5) {
            capacity -= 15; // "The Sleep Tax"
        }
        // 5. Clamp
        return Math.max(0, Math.min(100, Math.round(capacity)));
    },
    /**
     * Determines if the user is Bankrupt.
     * Triggers "Hard Lockout".
     */ isBankrupt: (capacity)=>{
        return capacity <= 5; // 5% buffer is functionally dead
    },
    /**
     * Generates the system's voice based on capacity.
     */ getConsultation: (capacity)=>{
        if (capacity > 80) return "Systems Nominal. Ready for Heavy Load.";
        if (capacity > 50) return "Capacity Sustained. Proceed with Caution.";
        if (capacity > 20) return "Reserves Critical. Recommendation: Review Only.";
        return "SYSTEM FAILURE. IMMEDIATE RECOVERY REQUIRED.";
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/SystemOrchestrator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SystemOrchestrator",
    ()=>SystemOrchestrator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$CognitiveLoadEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/CognitiveLoadEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$CapacityEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/CapacityEngine.ts [app-client] (ecmascript)");
;
;
;
const SystemOrchestrator = {
    // --- 1. GUARDS (The Gatekeepers) ---
    /**
     * Checks if a session can legally start.
     * Enforces: Hard Lockouts, Bankruptcies, and Stability Gates.
     */ canStartSession: (lectureId)=>{
        // [PRODUCT CHANGE] 2024-01-XX
        // Guards removed. Analytics only.
        return {
            allowed: true
        };
    },
    // --- 2. ORCHESTRATION EVENT: SESSION START ---
    /**
     * Prepares the system for a session.
     * Calculates predictions and sets execution context.
     */ prepareSession: (lectureId)=>{
        const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState();
        const lecture = state.lectures.find((l)=>l.id === lectureId);
        const subject = state.subjects.find((s)=>s.id === lecture?.subjectId);
        const profile = state.profile;
        if (!lecture || !subject) throw new Error("Invalid Session Context");
        // 1. Run Prediction Engine
        // [REFACTOR] Single Source of Truth: Use stored expectedDuration.
        // We DO NOT recalculate this at session start.
        const predictedDuration = lecture.expectedDuration;
        // 2. Return the Contract
        return {
            lecture,
            subject,
            predictedDuration,
            strictness: subject.config.strictnessLevel
        };
    },
    // --- 3. ORCHESTRATION EVENT: SESSION END ---
    /**
     * The atomic commit of a study session.
     * Chains: Load Analysis -> Store Update -> Capacity Recalculation -> Persistence.
     */ finalizeSession: (sessionBase, config)=>{
        const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState();
        const engine = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$CognitiveLoadEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CognitiveLoadEngine"];
        // 1. Calculate the Biological Cost
        const lecture = state.lectures.find((l)=>l.id === sessionBase.lectureId);
        // We reconstruct a temporary session object for the engine
        const tempSessionForCalc = {
            ...sessionBase,
            id: 'temp',
            cognitiveCost: 0
        };
        const cost = engine.calculateSessionCost(tempSessionForCalc, lecture, config);
        // 2. Construct Final Session Object
        const finalSession = {
            ...sessionBase,
            id: crypto.randomUUID(),
            cognitiveCost: cost
        };
        // 3. ATOMIC UPDATE: Register Session
        // This updates 'sessions' log AND 'dailyLoad' accumulator
        state.registerSession(finalSession);
        // 4. SIDE EFFECT: Recalculate Capacity
        // We must fetch the *new* state because registerSession just mutated it
        const nextState = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState();
        const newCapacity = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$CapacityEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CapacityEngine"].calculateCurrentCapacity(nextState.profile, nextState.dailyLoad);
        // 5. Update Profile with new Capacity
        state.updateCapacity(newCapacity);
        // 6. SIDE EFFECT: Update Logic Stability (Forgetting Curve Reset)
        // If focus was high enough (>50), we consider it a successful review
        if (sessionBase.focusPerformance > 50) {
            state.updateLectureStability(lecture.id, 100);
        }
        return {
            success: true,
            costIncurred: cost,
            remainingCapacity: newCapacity
        };
    },
    // --- 4. ORCHESTRATION EVENT: DAY ROLLOVER ---
    /**
     * Handles the "Sleep" cycle.
     * Resets DailyLoad, decays consistency if idle, calculates recovery.
     */ processRecovery: ()=>{
        const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState();
        // 1. Reset Daily Load
        state.resetDailyLoad();
        // 2. Apply "Sleep" Recovery to Capacity
        // (Simple reset to 100 for now, could be logic based on sleep duration later)
        state.updateCapacity(100);
        // 3. Decay Stability on all Lectures (The Forgetting Curve)
        // This is a heavy operation, effectively "Aging" the database.
        // We'll iterate all lectures and apply a decay factor.
        state.lectures.forEach((lecture)=>{
            // Decay 5% per day by default
            // This should ideally use an action that batch updates, 
            // but for now we'll iterate.
            const newStab = Math.max(0, lecture.stability * 0.95);
            state.updateLectureStability(lecture.id, newStab);
        });
        console.log("SYSTEM: Recovery Cycle Complete. Day Reset.");
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/engines/TimePredictionEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimePredictionEngine",
    ()=>TimePredictionEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$CognitiveEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/CognitiveEngine.ts [app-client] (ecmascript)");
;
const TimePredictionEngine = {
    predictDuration: (lecture, profile, config, pastSessions = [] // Typed as any[] to avoid circular dependency, cast to StudySession internally
    )=>{
        // 1. Determine Effective Student Index for Cognitive Engine
        // CRITICAL FIX: If totalSessions is 0, explicitly pass 0 to trigger "First-Time Rule" (x2 Base).
        // Otherwise, use the Lecture's mastery index if available.
        const effectiveIndex = profile.totalSessions === 0 ? 0 : lecture.cognitiveIndex ?? null;
        // 2. Get Deterministic Base from Cognitive Engine (The "Truth")
        let projectedMinutes = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$CognitiveEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CognitiveEngine"].calculateExpectedStudyTime(lecture.duration, lecture.relativeDifficulty, effectiveIndex);
        // 3. Apply Historical Correction (Optional / Advanced)
        // If we have history, maybe we average the "Cognitive Base" with "Historical Actuals"?
        // For now, let's trust the Cognitive Engine as the Primary Logic per the Critical Fix prompt.
        // We will Apply the PHYSICS factors (Strictness, Treatment) to this base.
        // 3. Strictness Physics (The Global Variable)
        // See Phase 3 Spec: "Time Dilation" vs "Compression"
        switch(config.strictnessLevel){
            case 'Relaxed':
                // The Exploratory State: +20% buffer for tangents
                projectedMinutes *= 1.2;
                break;
            case 'Standard':
                // The Baseline State: 1.0x
                projectedMinutes *= 1.0;
                break;
            case 'Military':
                // The Compression State: -15% forced efficiency
                // "Cram Mode" operationalized.
                projectedMinutes *= 0.85;
                break;
        }
        // 4. Lecture Treatment (Type Specifics)
        switch(config.lectureTreatment){
            case 'Intensive':
                // Deep Dive: Requires 50% more time
                projectedMinutes *= 1.5;
                break;
            case 'Review-Only':
                // Skimming: Requires 50% less time
                projectedMinutes *= 0.5;
                break;
            case 'Standard':
            default:
                break;
        }
        // 5. Student Speed Factor (The Biological Variable)
        // High Consistency (>80) implies flow state capability -> 10% speed bonus
        // Low Consistency (<40) implies distraction -> 10% penalty
        if (profile.consistencyIndex > 80) projectedMinutes *= 0.9;
        if (profile.consistencyIndex < 40) projectedMinutes *= 1.1;
        // Round to nearest minute to avoid fractional display
        return Math.round(projectedMinutes);
    },
    /**
     * Calculates the confidence interval (Margin of Error).
     * Returns the +/- minutes range.
     * Military strictness tightens this window.
     */ calculateConfidence: (predicted, config)=>{
        switch(config.strictnessLevel){
            case 'Military':
                return 0; // No margin allowed.
            case 'Standard':
                return Math.round(predicted * 0.1); // +/- 10%
            case 'Relaxed':
                return Math.round(predicted * 0.2); // +/- 20%
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/engines/EndSessionEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EndSessionEngine",
    ()=>EndSessionEngine
]);
const EndSessionEngine = {
    /**
     * Completes a session and calculates the Performance Index.
     */ evaluateSession: (session, actualDuration)=>{
        // Basic validation
        if (actualDuration < 0) throw new Error("Duration cannot be negative");
        const expected = session.expectedDuration || actualDuration; // Fallback if 0
        // --- PERFORMANCE INDEX CALCULATION ---
        // Definition:
        // Index = Efficiency Score (0-100)
        let performanceIndex = 0;
        if (expected <= 0) {
            // Edge case: No expectation set. Neutral score.
            performanceIndex = 50;
        } else {
            if (actualDuration <= expected) {
                // Efficient!
                // Ratio > 1.0 implies we were faster than expected.
                // However, user spec says: PerformanceRatio = Same / Same
                // Wait, spec logic:
                // "PerformanceRatio = ExpectedTime / ActualTime"
                // If Actual=30, Expected=60 -> Ratio=2.0 -> Score=200?? Clamp to 100.
                const ratio = expected / Math.max(1, actualDuration);
                performanceIndex = Math.min(100, ratio * 100);
            // Correction per spec:
            // "If ActualTime <= ExpectedTime: Index = min(100, PerformanceRatio * 100)"
            // Example: Exp 60, Act 30. Ratio = 2. Index = 200 -> 100.
            // Example: Exp 60, Act 50. Ratio = 1.2. Index = 120 -> 100.
            // Example: Exp 60, Act 60. Ratio = 1. Index = 100.
            // This implies ANY time faster than expected is 100% score?
            // Spec say: "Do NOT gamify. Do NOT reward." 
            // But logically, finishing early is good?
            // Yes, clamp to 100.
            } else {
                // Slower than expected (Overtime)
                // "If ActualTime > ExpectedTime: Index = max(0, 100 - ((ActualTime - ExpectedTime) / ExpectedTime) * 100)"
                const overtime = actualDuration - expected;
                const penaltyPercentage = overtime / expected * 100;
                performanceIndex = Math.max(0, 100 - penaltyPercentage);
            // Example: Exp 60, Act 90. Overtime 30. Penalty 50%. Index = 50.
            // Example: Exp 60, Act 120. Overtime 60. Penalty 100%. Index = 0.
            }
        }
        return {
            ...session,
            actualDuration,
            performanceIndex: Math.round(performanceIndex)
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/SystemAPI.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SystemAPI",
    ()=>SystemAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$SystemOrchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/SystemOrchestrator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$TimePredictionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/TimePredictionEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$EndSessionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/EndSessionEngine.ts [app-client] (ecmascript)");
;
;
;
;
const SystemAPI = {
    // --- 1. OPERATIONAL COMMANDS ---
    /**
     * Attempts to initiate a study session.
     * @returns Promise resolving to the session context or rejecting with a Lockout reason.
     */ requestSessionStart: async (lectureId)=>{
        // 1. Run Guards
        const check = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$SystemOrchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SystemOrchestrator"].canStartSession(lectureId);
        if (!check.allowed) {
            // UI Handler should catch this and display the Lockout/Override Modal
            return Promise.reject({
                reason: check.reason,
                canOverride: check.overrideRequired
            });
        }
        // 2. Prepare Context (Predictions)
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$SystemOrchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SystemOrchestrator"].prepareSession(lectureId);
    },
    /**
     * Commits a finished session to the permanent log.
     */ submitSession: (data)=>{
        const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState();
        const subject = state.subjects.find((s)=>s.id === data.subjectId);
        const lecture = state.lectures.find((l)=>l.id === data.lectureId);
        const profile = state.profile;
        if (!subject || !lecture) throw new Error("System Error: Subject context lost during session.");
        // Re-calculate expectation to grade performance
        // (We do this here to keep the API stateless, trusting the Engine's determinism)
        const expectedDuration = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$TimePredictionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimePredictionEngine"].predictDuration(lecture, profile, subject.config);
        const endTime = Date.now();
        // Infer start time (minutes -> ms)
        const startTime = endTime - data.actualDuration * 60 * 1000;
        // Construct Base Session
        const sessionBase = {
            id: 'temp',
            lectureId: data.lectureId,
            parentId: data.lectureId,
            subjectId: data.subjectId,
            date: new Date(endTime).toISOString(),
            startTime,
            endTime,
            status: 'COMPLETED',
            expectedDuration,
            actualDuration: data.actualDuration,
            cognitiveCost: 0,
            performanceIndex: 0,
            focusPerformance: data.focusPerformance
        };
        // Calculate Performance Index
        const scoredSession = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$EndSessionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndSessionEngine"].evaluateSession(sessionBase, data.actualDuration);
        // Atomic commit via Orchestrator
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$SystemOrchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SystemOrchestrator"].finalizeSession(scoredSession, subject.config);
    },
    /**
     * Signals the end of the academic day.
     * Triggers Sleep Cycle and Recovery logic.
     */ performDailyRecovery: ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$SystemOrchestrator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SystemOrchestrator"].processRecovery();
    },
    // --- 2. INVENTORY COMMANDS ---
    /**
     * Registers a new academic input (Lecture) into the system.
     */ registerInput: (subjectId, input)=>{
        const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState();
        const subject = state.subjects.find((s)=>s.id === subjectId);
        // Validation: Cannot add input to a locked subject? 
        // Logic Phase 3 Spec: "Gatekeeper Logic" could go here or in store.
        const newLecture = {
            id: crypto.randomUUID(),
            subjectId,
            status: 'Pending',
            stability: 0,
            createdAt: new Date().toISOString(),
            ...input
        };
        state.addLecture(newLecture);
    },
    // --- 3. CONFIGURATION COMMANDS ---
    /**
     * Adjusts the "Physics" of a specific Subject.
     * High strictness changes will immediately affect future predictions.
     */ configureSubject: (subjectId, config)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().updateSubjectConfig(subjectId, config);
    },
    /**
     * Creates a new Subject Container.
     */ initializeSubject: (name, difficulty)=>{
        const newSubject = {
            id: crypto.randomUUID(),
            name,
            examDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
            difficulty,
            config: {
                // Default "Standard" Physics
                lectureTreatment: 'Standard',
                cognitiveThreshold: 100,
                revisionRule: 'Spaced-Repetition',
                strictnessLevel: 'Standard',
                maxDailyLoad: 'Medium'
            },
            metrics: {
                stability: 0,
                readiness: 0,
                totalWeight: 0,
                nextExamCountdown: 90
            }
        };
        // @ts-ignore - TS types mismatch between 'Subject' partials in store vs strict here?
        // Actually types should align.
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().addSubject(newSubject);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/SubjectDetailView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubjectDetailView",
    ()=>SubjectDetailView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/Dashboard.module.css [app-client] (css module)"); // Shared styles
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-plus.js [app-client] (ecmascript) <export default as PlusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/SessionIntelligenceTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$SystemAPI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/SystemAPI.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const SubjectDetailView = ({ subjectId, onBack, onQuestionFlowStart })=>{
    _s();
    const subject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubject"])(subjectId);
    const lectures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubjectLectures"])(subjectId);
    // --- CONNECT TO STORE FOR SESSIONS ---
    const { sessions, authState, openAuthModal, renameSubject, deleteSubject } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const subjectSessions = sessions.filter((s)=>s.subjectId === subjectId);
    // Guard: Subject missing
    if (!subject) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorState,
        children: "Subject Not Found"
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
        lineNumber: 39,
        columnNumber: 26
    }, ("TURBOPACK compile-time value", void 0));
    const handleRename = ()=>{
        const newName = prompt("Rename Subject:", subject.name);
        if (newName && newName.trim() !== "") {
            renameSubject(subject.id, newName.trim());
        }
    };
    const handleDelete = ()=>{
        if (confirm(`Are you sure you want to delete "${subject.name}"? This cannot be undone.`)) {
            deleteSubject(subject.id);
            onBack(); // Return to dashboard
        }
    };
    const handleStartSession = async (lectureId)=>{
        try {
            const context = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$SystemAPI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SystemAPI"].requestSessionStart(lectureId);
            onQuestionFlowStart('SESSION_START', lectureId, context.predictedDuration);
        } catch (e) {
            alert(`SYSTEM LOCKOUT: ${e.reason}`);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailView,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailHeader,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backBtn,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                            lineNumber: 70,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerInfo,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subjectTitle,
                                        children: subject.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                                        lineNumber: 74,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleRename,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconBtn,
                                        title: "Rename Subject",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                                            lineNumber: 76,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                                        lineNumber: 75,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleDelete,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconBtn,
                                        style: {
                                            color: '#EF4444'
                                        },
                                        title: "Delete Subject",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                                            lineNumber: 79,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                                        lineNumber: 78,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                                lineNumber: 73,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaRow,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaBadge} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].strictnessBadge}`,
                                    children: subject.config?.strictnessLevel ?? 0
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                                    lineNumber: 83,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                                lineNumber: 82,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                        lineNumber: 72,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toolbar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                        children: "ACADEMIC INPUTS"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                        lineNumber: 93,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$Dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionBtn,
                        onClick: ()=>onQuestionFlowStart('LECTURE_INTENT', subjectId),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                                lineNumber: 98,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            " INJECT INPUT"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                        lineNumber: 94,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                lineNumber: 92,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SessionIntelligenceTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SessionIntelligenceTable"], {
                subjectId: subjectId,
                lectures: lectures,
                sessions: subjectSessions,
                onStartSession: handleStartSession,
                lang: 'en'
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
                lineNumber: 103,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/SubjectDetailView.tsx",
        lineNumber: 65,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SubjectDetailView, "jUhoOR69OceotMoCAfA9THpjJlo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubject"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubjectLectures"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = SubjectDetailView;
var _c;
__turbopack_context__.k.register(_c, "SubjectDetailView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/SubjectSettingsView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubjectSettingsView",
    ()=>SubjectSettingsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/i18n/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function SubjectSettingsView({ subject, onSave, onCancel, lang }) {
    _s();
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][lang];
    const isRtl = lang === 'ar';
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(subject.config || {
        lectureTreatment: 'Standard',
        cognitiveThreshold: 75,
        revisionRule: 'Spaced-Repetition',
        strictnessLevel: 'Standard',
        maxDailyLoad: 'Medium'
    });
    const handleChange = (field, value)=>{
        setConfig((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '2rem',
            color: '#F8FAFC',
            maxWidth: '800px',
            margin: '0 auto',
            direction: isRtl ? 'rtl' : 'ltr'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                        size: 22,
                                        color: "#94A3B8"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 35,
                                        columnNumber: 25
                                    }, this),
                                    t.physio_config
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                lineNumber: 34,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#64748B',
                                    fontSize: '0.9rem',
                                    marginTop: '0.25rem'
                                },
                                children: t.sys_regulation
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                lineNumber: 38,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                        lineNumber: 33,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '1rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onCancel,
                                style: {
                                    background: 'transparent',
                                    border: '1px solid #334155',
                                    color: '#94A3B8',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                },
                                children: t.cancel
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                lineNumber: 43,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onSave(config),
                                style: {
                                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                    border: 'none',
                                    color: 'white',
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontWeight: 500,
                                    cursor: 'pointer'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 62,
                                        columnNumber: 25
                                    }, this),
                                    " ",
                                    t.save_changes
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                lineNumber: 49,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                        lineNumber: 42,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gap: '1.5rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(30, 41, 59, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '16px',
                            padding: '1.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                        size: 20,
                                        color: "#F59E0B"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 78,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: '1.1rem',
                                            fontWeight: 600
                                        },
                                        children: t.sys_strictness
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 79,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                lineNumber: 77,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: '1rem'
                                },
                                children: [
                                    {
                                        id: 'Relaxed',
                                        label: t.level_relaxed
                                    },
                                    {
                                        id: 'Standard',
                                        label: t.level_standard
                                    },
                                    {
                                        id: 'Military',
                                        label: t.level_military
                                    }
                                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>handleChange('strictnessLevel', item.id),
                                        style: {
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            border: config.strictnessLevel === item.id ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.05)',
                                            background: config.strictnessLevel === item.id ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.02)',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            transition: 'all 0.2s'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '0.9rem',
                                                fontWeight: 500,
                                                color: config.strictnessLevel === item.id ? '#F59E0B' : '#94A3B8'
                                            },
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                            lineNumber: 101,
                                            columnNumber: 33
                                        }, this)
                                    }, item.id, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 88,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                lineNumber: 82,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(30, 41, 59, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '16px',
                            padding: '1.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                        size: 20,
                                        color: "#3B82F6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 117,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: '1.1rem',
                                            fontWeight: 600
                                        },
                                        children: t.cog_thresholds
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 118,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                lineNumber: 116,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            fontSize: '0.9rem',
                                            color: '#94A3B8',
                                            marginBottom: '0.75rem'
                                        },
                                        children: t.load_limit_label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 122,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: "50",
                                        max: "100",
                                        value: config.cognitiveThreshold,
                                        onChange: (e)=>handleChange('cognitiveThreshold', parseInt(e.target.value)),
                                        style: {
                                            width: '100%',
                                            marginBottom: '0.5rem',
                                            direction: 'ltr'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 125,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '0.8rem',
                                            color: '#64748B',
                                            direction: 'ltr'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t.limit_conservative
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                                lineNumber: 134,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#3B82F6',
                                                    fontWeight: 600
                                                },
                                                children: [
                                                    config.cognitiveThreshold,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                                lineNumber: 135,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t.limit_none
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                                lineNumber: 136,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 133,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                lineNumber: 121,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            fontSize: '0.9rem',
                                            color: '#94A3B8',
                                            marginBottom: '0.75rem'
                                        },
                                        children: t.revision_strategy
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 141,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: config.revisionRule,
                                        onChange: (e)=>handleChange('revisionRule', e.target.value),
                                        style: {
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: '#0F172A',
                                            border: '1px solid #334155',
                                            borderRadius: '8px',
                                            color: '#F8FAFC',
                                            outline: 'none'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Spaced-Repetition",
                                                children: t.strat_spaced
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                                lineNumber: 157,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Just-in-Time",
                                                children: t.strat_jit
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                                lineNumber: 158,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Aggressive",
                                                children: t.strat_aggressive
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                                lineNumber: 159,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 144,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                lineNumber: 140,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                        lineNumber: 110,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '1rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                size: 20,
                                color: "#EF4444",
                                style: {
                                    marginTop: '0.2rem',
                                    minWidth: '20px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                lineNumber: 174,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        style: {
                                            color: '#EF4444',
                                            fontWeight: 600,
                                            fontSize: '0.95rem'
                                        },
                                        children: t.sys_override
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 176,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#FECACA',
                                            fontSize: '0.85rem',
                                            marginTop: '0.25rem'
                                        },
                                        children: t.override_warning
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                        lineNumber: 177,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                                lineNumber: 175,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                        lineNumber: 165,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/SubjectSettingsView.tsx",
        lineNumber: 30,
        columnNumber: 9
    }, this);
}
_s(SubjectSettingsView, "lCLb18vIQ38SlvoJo534g/ck0Hc=");
_c = SubjectSettingsView;
var _c;
__turbopack_context__.k.register(_c, "SubjectSettingsView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/SessionTimerView.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "btnPause": "SessionTimerView-module__7K-8ea__btnPause",
  "btnStart": "SessionTimerView-module__7K-8ea__btnStart",
  "btnStop": "SessionTimerView-module__7K-8ea__btnStop",
  "container": "SessionTimerView-module__7K-8ea__container",
  "controlBtn": "SessionTimerView-module__7K-8ea__controlBtn",
  "controls": "SessionTimerView-module__7K-8ea__controls",
  "dismissBtn": "SessionTimerView-module__7K-8ea__dismissBtn",
  "expectedTime": "SessionTimerView-module__7K-8ea__expectedTime",
  "fadeInGlow": "SessionTimerView-module__7K-8ea__fadeInGlow",
  "gradeDisplay": "SessionTimerView-module__7K-8ea__gradeDisplay",
  "gradeLabel": "SessionTimerView-module__7K-8ea__gradeLabel",
  "gradeValue": "SessionTimerView-module__7K-8ea__gradeValue",
  "indexDisplay": "SessionTimerView-module__7K-8ea__indexDisplay",
  "indexLabel": "SessionTimerView-module__7K-8ea__indexLabel",
  "indexValue": "SessionTimerView-module__7K-8ea__indexValue",
  "reportCard": "SessionTimerView-module__7K-8ea__reportCard",
  "reportHeader": "SessionTimerView-module__7K-8ea__reportHeader",
  "statsRow": "SessionTimerView-module__7K-8ea__statsRow",
  "timerDisplay": "SessionTimerView-module__7K-8ea__timerDisplay",
});
}),
"[project]/src/components/layout/SessionTimerView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SessionTimerView",
    ()=>SessionTimerView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/layout/SessionTimerView.module.css [app-client] (css module)"); // NEW MODULE
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/i18n/translations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const SessionTimerView = ({ allocatedMinutes, lectureId, subjectId, onComplete, lang })=>{
    _s();
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][lang];
    const { activeSession, startActiveSession, pauseActiveSession, resumeActiveSession, endActiveSession } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    // Local display state to avoid jitter from store subscription, although store is fast.
    const [displayTime, setDisplayTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0); // ms, start at 00:00:00
    const [isPaused, setIsPaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasStarted, setHasStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize or Sync with Store
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SessionTimerView.useEffect": ()=>{
            if (!activeSession) {
                // No active session. Reset to 00:00:00
                setHasStarted(false);
                setDisplayTime(0);
            } else {
                // Resuming existing session
                setHasStarted(true);
                setIsPaused(!!activeSession.pausedAt);
                // Calculate current elapsed time
                // Logic: current elapsed = now - start - totalPaused
                // If paused, elapsed = pausedAt - start - totalPaused (captured at pause moment)
                const now = Date.now();
                const effectiveEnd = activeSession.pausedAt || now;
                const elapsed = effectiveEnd - activeSession.startTime - activeSession.totalPausedTime;
                setDisplayTime(Math.max(0, elapsed));
            }
        }
    }["SessionTimerView.useEffect"], [
        activeSession,
        allocatedMinutes
    ]);
    // Timer Loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SessionTimerView.useEffect": ()=>{
            if (!hasStarted || isPaused || !activeSession) return;
            const interval = setInterval({
                "SessionTimerView.useEffect.interval": ()=>{
                    const now = Date.now();
                    const elapsed = now - activeSession.startTime - activeSession.totalPausedTime;
                    // Stopwatch Mode: Count Up
                    setDisplayTime(elapsed);
                    // 12-Hour Limit Check (43,200,000 ms)
                    if (elapsed > 43200000) {
                        // Trigger Penalty End
                        endActiveSession(true);
                        if ("TURBOPACK compile-time truthy", 1) {
                            window.alert("Session exceeded 12 hours limit! You forgot the timer. (Grade C Assigned)");
                        }
                    }
                }
            }["SessionTimerView.useEffect.interval"], 200); // 5Hz update
            return ({
                "SessionTimerView.useEffect": ()=>clearInterval(interval)
            })["SessionTimerView.useEffect"];
        }
    }["SessionTimerView.useEffect"], [
        hasStarted,
        isPaused,
        activeSession
    ]);
    // Format HH:MM:SS
    const formatTime = (ms)=>{
        const totalSeconds = Math.ceil(ms / 1000);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor(totalSeconds % 3600 / 60);
        const s = totalSeconds % 60;
        const timeString = `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
        if (lang === 'ar') {
            return timeString.replace(/\d/g, (d)=>'٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
        }
        return timeString;
    };
    // Results State
    const [sessionResult, setSessionResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // [HARDENING] Immediate React to Termination State
    // If the store says "Terminated", we MUST show the screen, even if activeSession is null.
    // The previous logic relied on local `sessionResult`. We need to hydrate it.
    const { terminationState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SessionTimerView.useEffect": ()=>{
            if (terminationState) {
                // Force Show Result Screen
                setSessionResult({
                    grade: 'N/A',
                    index: 0.0,
                    duration: Math.max(1, Math.round(displayTime / 1000 / 60))
                });
                setHasStarted(false);
                setIsPaused(false);
            }
        }
    }["SessionTimerView.useEffect"], [
        terminationState,
        displayTime
    ]);
    // Format Expected Time
    const formatExpectedTime = (minutes)=>{
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        let timePart = '';
        if (h > 0) timePart += `${h} ${t.hours || 'hours'} `;
        if (m > 0 || h === 0) timePart += `${m} ${t.minutes || 'minutes'}`;
        return `Expected study time for this lecture is '${timePart.trim()}'`;
    };
    // Actions
    const handleStart = ()=>{
        if (activeSession) {
            resumeActiveSession();
        } else {
            startActiveSession(lectureId, allocatedMinutes, subjectId);
        }
        setHasStarted(true);
        setIsPaused(false);
    };
    const handlePause = ()=>{
        if (activeSession && !activeSession.pausedAt) {
            pauseActiveSession();
            setIsPaused(true);
        }
    };
    const handleStop = ()=>{
        if (!activeSession) return;
        // 1. Calculate final actual duration (Local Display)
        const now = Date.now();
        let endTime = now;
        let finalPaused = activeSession.totalPausedTime;
        if (activeSession.pausedAt) endTime = activeSession.pausedAt;
        const actualDurationMs = endTime - activeSession.startTime - finalPaused;
        const actualMinutes = Math.max(1, Math.round(actualDurationMs / 1000 / 60));
        // 2. Persist to Store
        endActiveSession();
        // 3. Display Result (Delayed for store update simulation)
        setTimeout(()=>{
            const currentSessions = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().sessions;
            const lastSession = currentSessions[currentSessions.length - 1];
            if (lastSession) {
                setSessionResult({
                    grade: lastSession.grade || 'B',
                    index: lastSession.performanceIndex ? lastSession.performanceIndex / 10 : 8.5,
                    duration: actualMinutes
                });
            }
        }, 50);
    };
    const handleDismissReport = ()=>{
        if (sessionResult) {
            onComplete(sessionResult.duration);
        }
    };
    if (sessionResult) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].reportCard,
                children: [
                    terminationState && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundColor: '#EF4444',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '16px',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            border: '1px solid #B91C1C',
                            boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.3)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "⚠️ SESSION NOTICE"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                                lineNumber: 198,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '11px',
                                    fontWeight: 'normal',
                                    marginTop: '4px'
                                },
                                children: terminationState.message
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                                lineNumber: 199,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '10px',
                                    marginTop: '4px',
                                    opacity: 0.9
                                },
                                children: "Progress saved. No penalties applied."
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                                lineNumber: 202,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                        lineNumber: 186,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].reportHeader,
                        children: "SESSION COMPLETE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                        lineNumber: 208,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].gradeDisplay,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].gradeLabel,
                                children: "PERFORMANCE GRADE"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                                lineNumber: 211,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].gradeValue,
                                children: sessionResult.grade
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                                lineNumber: 212,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                        lineNumber: 210,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].indexDisplay,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].indexLabel,
                                children: "COGNITIVE INDEX"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                                lineNumber: 216,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].indexValue,
                                children: sessionResult.index.toFixed(1)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                                lineNumber: 217,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                        lineNumber: 215,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statsRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    "⏱ ",
                                    sessionResult.duration,
                                    " min"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                                lineNumber: 221,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    "🎯 Target: ",
                                    allocatedMinutes,
                                    " min"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                                lineNumber: 222,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                        lineNumber: 220,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dismissBtn,
                        onClick: handleDismissReport,
                        children: "RETURN TO DASHBOARD"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                        lineNumber: 225,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                lineNumber: 182,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/layout/SessionTimerView.tsx",
            lineNumber: 181,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].timerDisplay,
                children: formatTime(displayTime)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                lineNumber: 236,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controls,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleStart,
                        disabled: hasStarted && !isPaused,
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlBtn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btnStart}`,
                        style: {
                            cursor: hasStarted && !isPaused ? 'not-allowed' : 'pointer',
                            opacity: hasStarted && !isPaused ? 0.3 : 1,
                            transform: hasStarted && !isPaused ? 'scale(0.9)' : 'scale(1)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                            fill: "currentColor"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                            lineNumber: 254,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                        lineNumber: 244,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handlePause,
                        disabled: !hasStarted || isPaused,
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlBtn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btnPause}`,
                        style: {
                            cursor: !hasStarted || isPaused ? 'not-allowed' : 'pointer',
                            opacity: !hasStarted || isPaused ? 0.3 : 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                            fill: "currentColor"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                            lineNumber: 267,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                        lineNumber: 258,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleStop,
                        disabled: !hasStarted,
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlBtn} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btnStop}`,
                        style: {
                            cursor: !hasStarted ? 'not-allowed' : 'pointer',
                            opacity: !hasStarted ? 0.3 : 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                            fill: "currentColor"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                            lineNumber: 280,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                        lineNumber: 271,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                lineNumber: 241,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].expectedTime,
                children: displayTime > allocatedMinutes * 60 * 1000 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        color: '#F87171',
                        fontWeight: 600,
                        animation: 'pulse 2s infinite'
                    },
                    children: "Expected time finished. Continue studying freely — time is still recorded."
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                    lineNumber: 287,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)) : formatExpectedTime(allocatedMinutes)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SessionTimerView.tsx",
                lineNumber: 285,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/SessionTimerView.tsx",
        lineNumber: 234,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SessionTimerView, "iMt0sm18BdWWdIH/jDY40zxFmrc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = SessionTimerView;
var _c;
__turbopack_context__.k.register(_c, "SessionTimerView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/engines/HistoryEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HistoryEngine",
    ()=>HistoryEngine
]);
const DAY_NAMES = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
const HistoryEngine = {
    /**
     * Main aggregator function.
     */ getWeeklyHistory: (sessions, lectures, subjects)=>{
        // 1. Flatten all entities into StudyRecords
        const allRecords = [];
        // A. Process Sessions (Completed Study)
        sessions.forEach((session)=>{
            const subject = subjects.find((s)=>s.id === session.subjectId);
            // Robust Date Handling
            let dateVal = new Date();
            if (session.date) {
                // Handle Firestore Timestamp (if not converted yet)
                if (typeof session.date === 'object' && 'seconds' in session.date) {
                    dateVal = new Date(session.date.seconds * 1000);
                } else {
                    const parsed = new Date(session.date);
                    if (!isNaN(parsed.getTime())) dateVal = parsed;
                }
            } else if (session.startTime) {
                dateVal = new Date(session.startTime);
            }
            const meta = getDateMeta(dateVal);
            // Fetch Parent Item Name if possible
            let itemName = 'Study Session';
            let itemType = 'SESSION';
            // Try to resolve parent name
            if (session.lectureId) {
                const parent = lectures.find((l)=>l.id === session.lectureId);
                if (parent) {
                    itemName = parent.title;
                    itemType = 'SESSION'; // Could display as "Session: [Lecture Title]"
                }
            }
            allRecords.push({
                id: session.id,
                subjectId: session.subjectId,
                subjectName: subject ? subject.name : 'Unknown Subject',
                itemType: itemType,
                itemName: itemName,
                durationMinutes: session.actualDuration || 0,
                difficulty: 5,
                grade: calculateGrade(session.performanceIndex || 0),
                cognitiveIndex: (session.performanceIndex || 0) / 10,
                status: 'COMPLETED',
                dateMeta: meta,
                rawDate: session.date || dateVal.toISOString()
            });
        });
        // B. Process Lectures (The Content Registry)
        // Lectures technically "happen" when created (Registered), or when completed.
        // Rule: Show them on their Creation Date as PENDING.
        // If they have a completed session, they might be marked completed?
        // Requirement: "Lecture becomes COMPLETED automatically when a session inside is completed"
        // For history view, we want to see the "Task" of the lecture.
        lectures.forEach((lecture)=>{
            const subject = subjects.find((s)=>s.id === lecture.subjectId);
            // Use creation date if available, else fallback to something (or exclude old ones?)
            const dateStr = lecture.createdAt || new Date().toISOString();
            const date = new Date(dateStr);
            const meta = getDateMeta(date);
            // Determine Status
            // Check if any session exists for this lecture
            const hasCompletedSession = sessions.some((s)=>s.lectureId === lecture.id && s.status === 'COMPLETED');
            const status = hasCompletedSession ? 'COMPLETED' : 'PENDING';
            allRecords.push({
                id: lecture.id,
                subjectId: lecture.subjectId,
                subjectName: subject ? subject.name : 'Unknown Subject',
                itemType: 'LECTURE',
                itemName: lecture.title,
                durationMinutes: lecture.duration,
                difficulty: lecture.relativeDifficulty,
                grade: lecture.grade,
                cognitiveIndex: lecture.cognitiveIndex,
                status: status,
                dateMeta: meta,
                rawDate: dateStr
            });
        });
        // 2. Group by Week Index
        const flowStart = getSystemStartDate(allRecords); // Find oldest record
        const groups = new Map();
        allRecords.forEach((record)=>{
            // Re-calc week index relative to system start to ensure continuity?
            // Actually, simpler: Use absolute week number from epoch or Year?
            // Let's use "Weeks since System Start" for now to keep it relative and clean 1, 2, 3...
            // To do this robustly:
            // Calculate diff in days between record date and flowStart (normalized to previous Saturday)
            const diffTime = Math.abs(record.dateMeta.timestamp - flowStart.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const weekIdx = Math.floor(diffDays / 7) + 1;
            if (!groups.has(weekIdx)) groups.set(weekIdx, []);
            groups.get(weekIdx).push(record);
        });
        // 3. Construct Blocks
        const blocks = [];
        const sortedWeekIndices = Array.from(groups.keys()).sort((a, b)=>a - b);
        sortedWeekIndices.forEach((idx)=>{
            const records = groups.get(idx).sort((a, b)=>b.dateMeta.timestamp - a.dateMeta.timestamp); // Newest first within week? Or Chronological? Requirement: "Weeks appear oldest -> newest". Items inside? Usually chronological.
            // Re-sort items inside chronological (Sat -> Fri)
            records.sort((a, b)=>a.dateMeta.timestamp - b.dateMeta.timestamp);
            const weekStart = new Date(flowStart);
            weekStart.setDate(flowStart.getDate() + (idx - 1) * 7);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            const isAllCompleted = records.every((r)=>r.status === 'COMPLETED');
            blocks.push({
                weekIndex: idx,
                label: `Week ${idx}`,
                startDate: formatDate(weekStart),
                endDate: formatDate(weekEnd),
                isCurrentWeek: isDateInRange(new Date(), weekStart, weekEnd),
                records,
                isCompleted: isAllCompleted
            });
        });
        return blocks;
    }
};
// --- HELPERS ---
// Enforce Saturday Start
function getDateMeta(date) {
    return {
        fullDate: date.toISOString().split('T')[0],
        dayName: DAY_NAMES[date.getDay()],
        weekIndex: 0,
        timestamp: date.getTime()
    };
}
function getSystemStartDate(records) {
    if (records.length === 0) {
        const now = new Date();
        return getPreviousSaturday(now);
    }
    // Find earliest timestamp
    const stamps = records.map((r)=>r.dateMeta.timestamp).filter((t)=>!isNaN(t));
    if (stamps.length === 0) return getPreviousSaturday(new Date());
    const minTs = Math.min(...stamps);
    return getPreviousSaturday(new Date(minTs));
}
function getPreviousSaturday(date) {
    const d = new Date(date);
    const day = d.getDay(); // Sun=0, Sat=6
    // If Sat (6), diff is 0.
    // If Fri (5), diff is 6 (go back 6 days to Sat)
    // If Sun (0), diff is 1 (go back 1 day to Sat)
    // Target: 6 (Sat). 
    // (day + 1) % 7 calculates days passed since Saturday? 
    // Sat(6) + 1 = 7 % 7 = 0. Correct.
    // Sun(0) + 1 = 1. Back 1. Correct.
    // Fri(5) + 1 = 6. Back 6. Correct.
    const diff = (day + 1) % 7;
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
    return d;
}
function formatDate(date) {
    const d = new Date(date);
    const month = d.toLocaleString('default', {
        month: 'short'
    });
    const day = d.getDate();
    return `${day} ${month}`;
}
function isDateInRange(target, start, end) {
    return target >= start && target <= end;
}
function calculateGrade(index) {
    // Index is 0-100 (PerformanceIndex)
    const val = index / 10; // Convert to 0-10
    if (val >= 9.7) return 'A+';
    if (val >= 9.0) return 'A';
    if (val >= 8.5) return 'B+';
    if (val >= 8.0) return 'B';
    if (val >= 7.5) return 'C+';
    if (val >= 7.0) return 'C';
    return 'D';
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/history/HistoryView.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "HistoryView-module__rCOO6q__container",
  "currentBadge": "HistoryView-module__rCOO6q__currentBadge",
  "dateRange": "HistoryView-module__rCOO6q__dateRange",
  "dayCell": "HistoryView-module__rCOO6q__dayCell",
  "dayName": "HistoryView-module__rCOO6q__dayName",
  "emptyState": "HistoryView-module__rCOO6q__emptyState",
  "expanded": "HistoryView-module__rCOO6q__expanded",
  "fullDate": "HistoryView-module__rCOO6q__fullDate",
  "header": "HistoryView-module__rCOO6q__header",
  "historyTable": "HistoryView-module__rCOO6q__historyTable",
  "pendingCount": "HistoryView-module__rCOO6q__pendingCount",
  "recordRow": "HistoryView-module__rCOO6q__recordRow",
  "subjectBadge": "HistoryView-module__rCOO6q__subjectBadge",
  "subtitle": "HistoryView-module__rCOO6q__subtitle",
  "timeline": "HistoryView-module__rCOO6q__timeline",
  "title": "HistoryView-module__rCOO6q__title",
  "weekBlock": "HistoryView-module__rCOO6q__weekBlock",
  "weekContent": "HistoryView-module__rCOO6q__weekContent",
  "weekHeader": "HistoryView-module__rCOO6q__weekHeader",
  "weekIndex": "HistoryView-module__rCOO6q__weekIndex",
  "weekInfo": "HistoryView-module__rCOO6q__weekInfo",
  "weekLabel": "HistoryView-module__rCOO6q__weekLabel",
  "weekStatus": "HistoryView-module__rCOO6q__weekStatus",
});
}),
"[project]/src/components/history/HistoryView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HistoryView",
    ()=>HistoryView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$HistoryEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/HistoryEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/history/HistoryView.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
;
const HistoryView = ()=>{
    _s();
    const { sessions, lectures, subjects } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const weeklyHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HistoryView.useMemo[weeklyHistory]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$HistoryEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HistoryEngine"].getWeeklyHistory(sessions, lectures, subjects);
        }
    }["HistoryView.useMemo[weeklyHistory]"], [
        sessions,
        lectures,
        subjects
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                        children: "Academic Timeline"
                    }, void 0, false, {
                        fileName: "[project]/src/components/history/HistoryView.tsx",
                        lineNumber: 17,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                        children: "Track your regulation across time."
                    }, void 0, false, {
                        fileName: "[project]/src/components/history/HistoryView.tsx",
                        lineNumber: 18,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/history/HistoryView.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].timeline,
                children: weeklyHistory.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                            size: 48,
                            className: "text-slate-600 mb-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/history/HistoryView.tsx",
                            lineNumber: 24,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "No study history yet. Start your first session to build your academic timeline."
                        }, void 0, false, {
                            fileName: "[project]/src/components/history/HistoryView.tsx",
                            lineNumber: 25,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/history/HistoryView.tsx",
                    lineNumber: 23,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)) : weeklyHistory.map((block)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WeekBlock, {
                        block: block
                    }, block.weekIndex, false, {
                        fileName: "[project]/src/components/history/HistoryView.tsx",
                        lineNumber: 29,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/history/HistoryView.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/history/HistoryView.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(HistoryView, "nt8X6mlBPz5Nv1s2vDu2m+tM2u8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = HistoryView;
const WeekBlock = ({ block })=>{
    _s1();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(block.isCurrentWeek);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].weekBlock} ${expanded ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].expanded : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].weekHeader,
                onClick: ()=>setExpanded(!expanded),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].weekInfo,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].weekLabel,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].weekIndex,
                                        children: block.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/history/HistoryView.tsx",
                                        lineNumber: 48,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    block.isCurrentWeek && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].currentBadge,
                                        children: "CURRENT"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/history/HistoryView.tsx",
                                        lineNumber: 49,
                                        columnNumber: 49
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/history/HistoryView.tsx",
                                lineNumber: 47,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dateRange,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        size: 14,
                                        className: "mr-2 opacity-50"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/history/HistoryView.tsx",
                                        lineNumber: 52,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    block.startDate,
                                    " - ",
                                    block.endDate
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/history/HistoryView.tsx",
                                lineNumber: 51,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/history/HistoryView.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].weekStatus,
                        children: [
                            block.isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                size: 20,
                                className: "text-emerald-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/history/HistoryView.tsx",
                                lineNumber: 59,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pendingCount,
                                children: [
                                    block.records.filter((r)=>r.status !== 'COMPLETED').length,
                                    " Pending"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/history/HistoryView.tsx",
                                lineNumber: 61,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            expanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/src/components/history/HistoryView.tsx",
                                lineNumber: 65,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/src/components/history/HistoryView.tsx",
                                lineNumber: 65,
                                columnNumber: 61
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/history/HistoryView.tsx",
                        lineNumber: 57,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/history/HistoryView.tsx",
                lineNumber: 42,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].weekContent,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].historyTable,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Day"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/history/HistoryView.tsx",
                                        lineNumber: 74,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Subject"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/history/HistoryView.tsx",
                                        lineNumber: 75,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Item"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/history/HistoryView.tsx",
                                        lineNumber: 76,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Duration"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/history/HistoryView.tsx",
                                        lineNumber: 77,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Grade"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/history/HistoryView.tsx",
                                        lineNumber: 78,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Index"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/history/HistoryView.tsx",
                                        lineNumber: 79,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/history/HistoryView.tsx",
                                        lineNumber: 80,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/history/HistoryView.tsx",
                                lineNumber: 73,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/history/HistoryView.tsx",
                            lineNumber: 72,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: block.records.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].recordRow,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dayCell,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dayName,
                                                    children: record.dateMeta.dayName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/history/HistoryView.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fullDate,
                                                    children: record.dateMeta.fullDate
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/history/HistoryView.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/history/HistoryView.tsx",
                                            lineNumber: 86,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subjectBadge,
                                                children: record.subjectName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/history/HistoryView.tsx",
                                                lineNumber: 91,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/history/HistoryView.tsx",
                                            lineNumber: 90,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: getTypeBadgeClass(record.itemType),
                                                        children: record.itemType
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/history/HistoryView.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: record.itemName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/history/HistoryView.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/history/HistoryView.tsx",
                                                lineNumber: 94,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/history/HistoryView.tsx",
                                            lineNumber: 93,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "font-mono text-sm opacity-70",
                                            children: [
                                                record.durationMinutes,
                                                "m"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/history/HistoryView.tsx",
                                            lineNumber: 101,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "font-bold text-sm",
                                            children: record.grade || '-'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/history/HistoryView.tsx",
                                            lineNumber: 104,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "font-mono text-xs opacity-60",
                                            children: record.cognitiveIndex?.toFixed(1) || '-'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/history/HistoryView.tsx",
                                            lineNumber: 107,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                status: record.status
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/history/HistoryView.tsx",
                                                lineNumber: 111,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/history/HistoryView.tsx",
                                            lineNumber: 110,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, record.id, true, {
                                    fileName: "[project]/src/components/history/HistoryView.tsx",
                                    lineNumber: 85,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/components/history/HistoryView.tsx",
                            lineNumber: 83,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/history/HistoryView.tsx",
                    lineNumber: 71,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/history/HistoryView.tsx",
                lineNumber: 70,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/history/HistoryView.tsx",
        lineNumber: 41,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(WeekBlock, "p66s253UKwA6y53/0ZcEHiwaXlI=");
_c1 = WeekBlock;
const StatusBadge = ({ status })=>{
    const colors = {
        'COMPLETED': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'PENDING': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        'IN_PROGRESS': 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    };
    // @ts-ignore
    const css = colors[status] || colors['PENDING'];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `px-2 py-1 rounded text-[10px] font-bold border ${css}`,
        children: status
    }, void 0, false, {
        fileName: "[project]/src/components/history/HistoryView.tsx",
        lineNumber: 134,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = StatusBadge;
const getTypeBadgeClass = (type)=>{
    // Just returning a class string or inline style for simplicity in this demo
    return "text-[10px] uppercase tracking-wider opacity-60 mr-2";
};
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "HistoryView");
__turbopack_context__.k.register(_c1, "WeekBlock");
__turbopack_context__.k.register(_c2, "StatusBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/SystemConfigView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SystemConfigView",
    ()=>SystemConfigView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-client] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
;
var _s = __turbopack_context__.k.signature();
;
;
function SystemConfigView({ lang }) {
    _s();
    const isRtl = lang === 'ar';
    const t = {
        title: lang === 'en' ? 'System Configuration' : 'إعدادات النظام',
        subtitle: lang === 'en' ? 'Global settings and system detection' : 'الإعدادات العامة والكشف عن النظام',
        detect_device: lang === 'en' ? 'Device Detection' : 'كشف الجهاز',
        device_status: lang === 'en' ? 'System Status: Optimal' : 'حالة النظام: مثالية',
        sync_status: lang === 'en' ? 'Cloud Sync: Active' : 'مزامنة سحابية: نشطة',
        version: lang === 'en' ? 'Version 1.0.0-PROD' : 'الإصدار 1.0.0-PROD',
        data_management: lang === 'en' ? 'Data Management' : 'إدارة البيانات',
        clear_cache: lang === 'en' ? 'Clear Local Cache' : 'مسح التخزين المحلي',
        reset_system: lang === 'en' ? 'Reset System State' : 'إعادة ضبط النظام',
        // Study Logic
        sys_strictness: lang === 'en' ? 'System Strictness' : 'صرامة النظام',
        level_relaxed: lang === 'en' ? 'Relaxed' : 'مرن',
        level_standard: lang === 'en' ? 'Standard' : 'قياسي',
        level_military: lang === 'en' ? 'Military' : 'عسكري',
        cog_thresholds: lang === 'en' ? 'Cognitive Thresholds' : 'الحدود المعرفية',
        load_limit_label: lang === 'en' ? 'Daily Load Limit' : 'حد الحمل اليومي',
        limit_conservative: lang === 'en' ? 'Conservative' : 'محافظ',
        limit_none: lang === 'en' ? 'No Limit' : 'بلا حدود',
        revision_strategy: lang === 'en' ? 'Revision Strategy' : 'استراتيجية المراجعة',
        strat_spaced: lang === 'en' ? 'Spaced Repetition' : 'التكرار المتباعد',
        strat_jit: lang === 'en' ? 'Just-in-Time' : 'في الوقت المناسب',
        strat_aggressive: lang === 'en' ? 'Aggressive' : 'هجومي',
        sys_override: lang === 'en' ? 'System Override Zone' : 'منطقة تجاوز النظام',
        override_warning: lang === 'en' ? 'Modifying these presets affects the core algorithm of the Agent. Proceed with caution.' : 'تعديل هذه الإعدادات المسبقة يؤثر على الخوارزمية الأساسية للوكيل. تابع بحذر.'
    };
    const [deviceStatus, setDeviceStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t.device_status);
    // Mock Config State for UI Demo
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        strictnessLevel: 'Standard',
        cognitiveThreshold: 75,
        revisionRule: 'Spaced-Repetition'
    });
    const handleChange = (field, value)=>{
        setConfig((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    const handleClearCache = ()=>{
        if (confirm('Are you sure you want to clear local storage? This will reset your session history.')) {
            localStorage.clear();
            window.location.reload();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '2rem',
            color: '#F8FAFC',
            maxWidth: '800px',
            margin: '0 auto',
            direction: isRtl ? 'rtl' : 'ltr'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '2rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                size: 22,
                                color: "#94A3B8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 62,
                                columnNumber: 21
                            }, this),
                            t.title
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: '#64748B',
                            fontSize: '0.9rem',
                            marginTop: '0.25rem'
                        },
                        children: t.subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gap: '1.5rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(30, 41, 59, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '16px',
                            padding: '1.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"], {
                                        size: 20,
                                        color: "#3B82F6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 80,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: '1.1rem',
                                            fontWeight: 600
                                        },
                                        children: t.detect_device
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 81,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 79,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '0.9rem',
                                    color: '#CBD5E1',
                                    marginBottom: '0.5rem'
                                },
                                children: deviceStatus
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 84,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '0.8rem',
                                    color: '#64748B'
                                },
                                children: [
                                    "User Agent: ",
                                    typeof navigator !== 'undefined' ? navigator.userAgent : 'Server'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 87,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                        lineNumber: 73,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(30, 41, 59, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '16px',
                            padding: '1.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                        size: 20,
                                        color: "#F59E0B"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 100,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: '1.1rem',
                                            fontWeight: 600
                                        },
                                        children: t.sys_strictness
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 101,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 99,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: '1rem'
                                },
                                children: [
                                    {
                                        id: 'Relaxed',
                                        label: t.level_relaxed
                                    },
                                    {
                                        id: 'Standard',
                                        label: t.level_standard
                                    },
                                    {
                                        id: 'Military',
                                        label: t.level_military
                                    }
                                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>handleChange('strictnessLevel', item.id),
                                        style: {
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            border: config.strictnessLevel === item.id ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.05)',
                                            background: config.strictnessLevel === item.id ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.02)',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            transition: 'all 0.2s'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '0.9rem',
                                                fontWeight: 500,
                                                color: config.strictnessLevel === item.id ? '#F59E0B' : '#94A3B8'
                                            },
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                            lineNumber: 123,
                                            columnNumber: 33
                                        }, this)
                                    }, item.id, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 110,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 104,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                        lineNumber: 93,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(30, 41, 59, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '16px',
                            padding: '1.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                        size: 20,
                                        color: "#3B82F6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 139,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: '1.1rem',
                                            fontWeight: 600
                                        },
                                        children: t.cog_thresholds
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 140,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 138,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            fontSize: '0.9rem',
                                            color: '#94A3B8',
                                            marginBottom: '0.75rem'
                                        },
                                        children: t.load_limit_label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 144,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: "50",
                                        max: "100",
                                        value: config.cognitiveThreshold,
                                        onChange: (e)=>handleChange('cognitiveThreshold', parseInt(e.target.value)),
                                        style: {
                                            width: '100%',
                                            marginBottom: '0.5rem',
                                            direction: 'ltr'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 147,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '0.8rem',
                                            color: '#64748B',
                                            direction: 'ltr'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t.limit_conservative
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                                lineNumber: 156,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#3B82F6',
                                                    fontWeight: 600
                                                },
                                                children: [
                                                    config.cognitiveThreshold,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                                lineNumber: 157,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t.limit_none
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                                lineNumber: 158,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 155,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 143,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            fontSize: '0.9rem',
                                            color: '#94A3B8',
                                            marginBottom: '0.75rem'
                                        },
                                        children: t.revision_strategy
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 163,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: config.revisionRule,
                                        onChange: (e)=>handleChange('revisionRule', e.target.value),
                                        style: {
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: '#0F172A',
                                            border: '1px solid #334155',
                                            borderRadius: '8px',
                                            color: '#F8FAFC',
                                            outline: 'none'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Spaced-Repetition",
                                                children: t.strat_spaced
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                                lineNumber: 179,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Just-in-Time",
                                                children: t.strat_jit
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                                lineNumber: 180,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Aggressive",
                                                children: t.strat_aggressive
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                                lineNumber: 181,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 166,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 162,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                        lineNumber: 132,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '1rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                size: 20,
                                color: "#EF4444",
                                style: {
                                    marginTop: '0.2rem',
                                    minWidth: '20px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 196,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        style: {
                                            color: '#EF4444',
                                            fontWeight: 600,
                                            fontSize: '0.95rem'
                                        },
                                        children: t.sys_override
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 198,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#FECACA',
                                            fontSize: '0.85rem',
                                            marginTop: '0.25rem'
                                        },
                                        children: t.override_warning
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 199,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 197,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                        lineNumber: 187,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(30, 41, 59, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '16px',
                            padding: '1.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                                        size: 20,
                                        color: "#F59E0B"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 213,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: '1.1rem',
                                            fontWeight: 600
                                        },
                                        children: t.data_management
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                        lineNumber: 214,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 212,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '1rem'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleClearCache,
                                    style: {
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        color: '#EF4444',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem'
                                    },
                                    children: t.clear_cache
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                    lineNumber: 218,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                                lineNumber: 217,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                        lineNumber: 206,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            marginTop: '2rem',
                            color: '#475569',
                            fontSize: '0.8rem'
                        },
                        children: t.version
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                        lineNumber: 236,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/SystemConfigView.tsx",
        lineNumber: 59,
        columnNumber: 9
    }, this);
}
_s(SystemConfigView, "XNMEsw+J2mFbaIOEyl14daALtQk=");
_c = SystemConfigView;
var _c;
__turbopack_context__.k.register(_c, "SystemConfigView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/engines/AcademicStructureEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AcademicStructureEngine",
    ()=>AcademicStructureEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$CognitiveEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/CognitiveEngine.ts [app-client] (ecmascript)");
;
const AcademicStructureEngine = {
    createSubject: (name, examDate, difficulty)=>{
        if (!name) throw new Error("Subject name is required");
        if (!examDate) throw new Error("Exam date is required");
        return {
            id: crypto.randomUUID(),
            name,
            examDate,
            difficulty,
            config: {
                lectureTreatment: 'Standard',
                cognitiveThreshold: 100,
                revisionRule: 'Spaced-Repetition',
                strictnessLevel: 'Standard',
                maxDailyLoad: 'Medium'
            },
            metrics: {
                stability: 0,
                readiness: 0,
                totalWeight: 0,
                nextExamCountdown: 90 // Default mock
            }
        };
    },
    createLecture: (subjectId, title, duration, understandingScore, mentalLoad, type, studentState)=>{
        // Basic validation
        if (duration <= 0) throw new Error("Duration must be positive");
        // --- 1. DURATION SCORE NORMALIZATION ---
        // Step = 1.667 per 15 min block
        let durationScore = 0;
        if (duration <= 15) durationScore = 1.667;
        else if (duration <= 30) durationScore = 3.334;
        else if (duration <= 45) durationScore = 5.001;
        else if (duration <= 60) durationScore = 6.668;
        else if (duration <= 75) durationScore = 8.335;
        else if (duration <= 90) durationScore = 10.002;
        else durationScore = 10; // Cap at 10
        // Cap strict inputs if needed, though logic above handles ranges
        if (durationScore > 10) durationScore = 10;
        // --- 2. DIFF CALCULATION ---
        // Diff = (durationScore + (11 - understandingScore)) / 2
        // understandingScore is 1-10 (1=Low understanding/High Diff, 10=High understanding/Low Diff)
        // Guard understandingScore bounds
        const safeUnderstanding = Math.max(1, Math.min(10, understandingScore));
        // Invert Scale: 1 -> 10, 10 -> 1 using (11 - score)
        const understandingDifficulty = 11 - safeUnderstanding;
        const rawDiff = (durationScore + understandingDifficulty) / 2;
        console.log("[DEBUG] CreateLecture Calc:", {
            duration,
            durationScore,
            understandingScore,
            understandingDifficulty,
            rawDiff
        });
        // Round to 1 decimal place and clamp
        const relativeDifficulty = Math.max(0, Math.min(10, Math.round(rawDiff * 10) / 10));
        // Calculate basic weight
        const weight = duration * relativeDifficulty;
        // --- 3. EXPECTED STUDY TIME (PERSISTENT PHASE) ---
        let expectedDuration = 0;
        switch(studentState.phase){
            case 'INIT':
                // [INIT] Pure Safety Rule
                expectedDuration = duration * 2;
                break;
            case 'NOVICE':
                // [NOVICE] Soft Adaptation
                expectedDuration = duration * 2.5;
                break;
            case 'ADAPTIVE':
                // [ADAPTIVE] Engine Calculation
                expectedDuration = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$CognitiveEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CognitiveEngine"].calculateExpectedStudyTime(duration, relativeDifficulty, studentState.index);
                break;
            default:
                expectedDuration = duration * 2; // Fallback
        }
        return {
            id: crypto.randomUUID(),
            subjectId,
            title,
            duration,
            type,
            status: 'Pending',
            cognitiveWeight: weight,
            stability: 0,
            relativeDifficulty,
            expectedDuration,
            createdAt: new Date().toISOString()
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/engines/PreStudyEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PreStudyEngine",
    ()=>PreStudyEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$CognitiveEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/CognitiveEngine.ts [app-client] (ecmascript)");
;
const PreStudyEngine = {
    /**
     * Helper: Converts numerical difficulty (0-10) to MentalLoad category.
     */ getMentalLoad: (difficulty)=>{
        if (difficulty >= 8) return 'High';
        if (difficulty >= 4) return 'Medium';
        return 'Low';
    },
    /**
     * Calculates the Initial Cognitive Resistance (ICR).
     * Range: 0 (No resistance) to 1.0 (Maximum resistance/friction)
     * High resistance means the student is likely to procrastinate or find it hard to start.
     */ calculateInitialResistance: (attentionLevel, lectureMentalLoad)=>{
        let resistance = 0.5; // Base friction
        // Mental Load Impact
        if (lectureMentalLoad === 'High') resistance += 0.2;
        if (lectureMentalLoad === 'Low') resistance -= 0.1;
        // Attention Impact (Inverse: Low attention = High resistance)
        if (attentionLevel === 'Low') resistance += 0.3; // Hard to study what you ignored
        if (attentionLevel === 'High') resistance -= 0.2; // Easy to study what you focused on
        return Math.min(Math.max(resistance, 0.1), 1.0);
    },
    /**
     * Registers a session and returns the valid session object.
     * Throws error if pre-conditions are not met.
     */ registerSession: (lecture, preUnderstanding, attentionLevel)=>{
        if (preUnderstanding < 0 || preUnderstanding > 100) {
            throw new Error("Understanding must be 0-100");
        }
        // Logic: If resistance is too high, maybe warn? (Handled by UI/Smart Warning Engine)
        // Derive Mental Load
        const mentalLoad = PreStudyEngine.getMentalLoad(lecture.relativeDifficulty);
        // We calculate these for the predictive engines later
        const resistance = PreStudyEngine.calculateInitialResistance(attentionLevel, mentalLoad);
        const startTime = Date.now();
        return {
            id: crypto.randomUUID(),
            lectureId: lecture.id,
            parentId: lecture.id,
            subjectId: lecture.subjectId,
            date: new Date(startTime).toISOString(),
            startTime: startTime,
            endTime: null,
            status: 'IN_PROGRESS',
            expectedDuration: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$CognitiveEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CognitiveEngine"].calculateExpectedStudyTime(lecture.duration, lecture.relativeDifficulty),
            actualDuration: 0,
            cognitiveCost: 0,
            performanceIndex: 0,
            focusPerformance: 0,
            preUnderstanding
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/engines/StudentProfilerEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StudentProfilerEngine",
    ()=>StudentProfilerEngine
]);
const StudentProfilerEngine = {
    /**
     * Updates the invisible profile stats based on the last session.
     * "Build an internal, invisible profile including: Study speed, Efficiency, etc."
     */ updateProfile: (profile, session)=>{
        // 1. Consistency Index Update
        // If session completed -> +0.02
        // If session abandoned -> -0.05
        let newConsistency = profile.consistencyIndex;
        if (session.endTime) {
            newConsistency = Math.min(newConsistency + 0.02, 1.0);
        } else {
            newConsistency = Math.max(newConsistency - 0.05, 0.0);
        }
        // 2. Base Speed / Efficiency Update (Simplistic for now)
        // If actualDuration < predicted -> Speed might be higher
        // Need access to lecture duration/weights to calculate true speed.
        // 3. Fatigue Recovery Rate
        // Dynamic adjustment based on consecutive sessions?
        return {
            ...profile,
            consistencyIndex: Number(newConsistency.toFixed(3))
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/MainApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MainApp",
    ()=>MainApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$FlowEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/FlowEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/SingleQuestionView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/ControlLayout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$DashboardView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/DashboardView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SubjectDetailView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/SubjectDetailView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SubjectSettingsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/SubjectSettingsView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/SessionTimerView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/history/HistoryView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SystemConfigView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/SystemConfigView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$AcademicStructureEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/AcademicStructureEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$PreStudyEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/PreStudyEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$StudentProfilerEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/StudentProfilerEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$EndSessionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/engines/EndSessionEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/i18n/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Helper to get translated string
const t = (key, lang)=>{
    // @ts-ignore
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][lang][key] || key;
};
function MainApp() {
    _s();
    const [context, setContext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$FlowEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowEngine"].getInitialState());
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // App State
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dark');
    // Zustand Store
    const { subjects, lectures, addSubject, registerSession, setProfile, profile, sessions, dailyLoad, addLecture, syncAuth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    // Theme Effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MainApp.useEffect": ()=>{
            document.documentElement.setAttribute('data-theme', theme);
            document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
        }
    }["MainApp.useEffect"], [
        theme,
        language
    ]);
    // Timeout Modal State
    const [timeoutModal, setTimeoutModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Active Session Persistence Check & GLOBAL GUARD
    const { activeSession, endActiveSession } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MainApp.useEffect": ()=>{
            // 1. Navigation Logic (If active, force Execution View)
            if (activeSession && activeSession.isActive && context.currentState !== 'STUDY_EXECUTION') {
                setContext({
                    "MainApp.useEffect": (prev)=>({
                            ...prev,
                            currentState: 'STUDY_EXECUTION',
                            selectedSubjectId: activeSession.lectureId
                        })
                }["MainApp.useEffect"]);
            }
            // 2. SAFETY GUARD: 12-Hour Limit Check (Global)
            let interval;
            if (activeSession && activeSession.isActive) {
                // Initial check immediately
                const check = {
                    "MainApp.useEffect.check": ()=>{
                        const now = Date.now();
                        const elapsed = now - activeSession.startTime - activeSession.totalPausedTime;
                        // 12 Hours = 43,200,000 ms
                        if (elapsed > 43200000) {
                            console.warn("[Global Guard] Session exceeded 12 hours. Force closing.");
                            endActiveSession(true); // Persists to Firestore now
                            setTimeoutModal(true); // Show UI Overlay
                            // Force Context Reset to Dashboard
                            setContext({
                                "MainApp.useEffect.check": (prev)=>({
                                        ...prev,
                                        currentState: 'DASHBOARD_HOME'
                                    })
                            }["MainApp.useEffect.check"]);
                            return true;
                        }
                        return false;
                    }
                }["MainApp.useEffect.check"];
                if (!check()) {
                    interval = setInterval(check, 60000); // Check every 60 seconds
                }
            }
            return ({
                "MainApp.useEffect": ()=>{
                    if (interval) clearInterval(interval);
                }
            })["MainApp.useEffect"];
        }
    }["MainApp.useEffect"], [
        activeSession,
        context.currentState
    ]); // Added dependency
    // --- HELPER FUNCTIONS ---
    const handleNext = (overrideInput)=>{
        const input = overrideInput !== undefined ? overrideInput : inputValue;
        let nextContext = {
            ...context
        };
        try {
            // --- AUTH & SETUP ---
            if (context.currentState === 'SUBJECT_LIST') {
                if (input === 'ADD_SUBJECT') {
                    nextContext.currentState = 'SUBJECT_ADD_NAME';
                } else {
                    // Input is Subject ID
                    nextContext.selectedSubjectId = input;
                }
            }
            if (context.currentState === 'SUBJECT_ADD_NAME') {
                const subjectName = input;
                if (subjectName) {
                    const newSubject = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$AcademicStructureEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AcademicStructureEngine"].createSubject(subjectName, new Date().toISOString(), 'Medium');
                    addSubject(newSubject);
                    nextContext.selectedSubjectId = newSubject.id;
                }
            }
            if (context.currentState === 'SUBJECT_SETUP_DATE') {
                console.log(`[System] Exam Date: ${input}`);
            // Save date logic...
            }
            if (context.currentState === 'INTENT_ACTION') {
                nextContext.actionType = input === 'ACTION_REGISTER' ? 'REGISTER' : 'STUDY';
            }
            // --- REGISTRATION FLOW ---
            if (context.currentState === 'REG_TYPE') nextContext.tempRegistration = {
                ...nextContext.tempRegistration,
                type: input
            };
            if (context.currentState === 'REG_DURATION') nextContext.tempRegistration = {
                ...nextContext.tempRegistration,
                duration: input
            };
            if (context.currentState === 'REG_UNDERSTANDING') {
                nextContext.tempRegistration = {
                    ...nextContext.tempRegistration,
                    understanding: input
                };
                // AUTO-COMPLETE REGISTRATION
                const mentalLoadVal = 'Medium';
                const understandingScore = Number(input);
                const studentState = {
                    phase: profile ? profile.learningPhase || 'INIT' : 'INIT',
                    index: profile ? profile.consistencyIndex / 10 : 0
                };
                const newLecture = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$AcademicStructureEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AcademicStructureEngine"].createLecture(context.selectedSubjectId, `Registered Class`, nextContext.tempRegistration.duration, understandingScore, mentalLoadVal, nextContext.tempRegistration.type, studentState);
                addLecture(newLecture);
                nextContext.feedbackMessage = t('cycle_complete', language);
            }
            // --- STUDY FLOW ---
            if (context.currentState === 'CALIBRATION_TIME') {
                const studentState = {
                    phase: profile ? profile.learningPhase || 'INIT' : 'INIT',
                    index: profile ? profile.consistencyIndex / 10 : 0
                };
                const adHocLecture = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$AcademicStructureEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AcademicStructureEngine"].createLecture(context.selectedSubjectId, `Session`, inputValue, 5, 'Medium', 'Theory', studentState);
                addLecture(adHocLecture);
                const focusLevel = context.tempCalibration.focus > 66 ? 'High' : 'Medium';
                const session = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$PreStudyEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PreStudyEngine"].registerSession(adHocLecture, context.tempCalibration.familiarity, focusLevel);
                registerSession(session);
                nextContext.currentSessionId = session.id;
            }
            if (context.currentState === 'REFLECTION_CHECK') {
                if (context.currentSessionId && profile && dailyLoad) {
                    const endedSession = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$EndSessionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EndSessionEngine"].evaluateSession(sessions.find((s)=>s.id === context.currentSessionId), context.tempCalibration.time);
                    const newProfile = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$StudentProfilerEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentProfilerEngine"].updateProfile(profile, endedSession);
                    setProfile(newProfile);
                }
                nextContext.feedbackMessage = t('cycle_complete', language);
            }
            const nextState = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$FlowEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowEngine"].nextState(context.currentState, input);
            setContext({
                ...nextContext,
                currentState: nextState
            });
        } catch (e) {
            console.error("Engine Error:", e);
        }
    };
    const handleSessionComplete = (actualMinutes)=>{
        setContext((prev)=>{
            const updated = {
                ...prev,
                tempCalibration: {
                    ...prev.tempCalibration,
                    time: actualMinutes
                }
            };
            const nextState = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$FlowEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowEngine"].nextState('STUDY_EXECUTION', null);
            return {
                ...updated,
                currentState: nextState
            };
        });
    };
    const getQuestionProps = ()=>{
        // ... Logic preserved from page.tsx ...
        switch(context.currentState){
            case 'ORIENTATION':
                return {
                    inputType: 'none'
                };
            case 'SUBJECT_LIST':
                return {
                    inputType: 'grid',
                    options: [
                        ...subjects.map((s)=>({
                                label: s.name,
                                value: s.id
                            })),
                        {
                            label: t('add_subject', language),
                            value: 'ADD_SUBJECT'
                        }
                    ]
                };
            case 'SUBJECT_ADD_NAME':
                return {
                    inputType: 'text',
                    placeholder: t('subject_name', language)
                };
            case 'SUBJECT_SETUP_DATE':
                return {
                    inputType: 'date'
                };
            case 'INTENT':
                return {
                    inputType: 'none'
                };
            case 'INTENT_ACTION':
                return {
                    inputType: 'grid',
                    options: [
                        {
                            label: t('study_now', language),
                            value: 'ACTION_STUDY'
                        },
                        {
                            label: t('register_class', language),
                            value: 'ACTION_REGISTER'
                        }
                    ]
                };
            case 'REG_TYPE':
                return {
                    inputType: 'grid',
                    options: [
                        {
                            label: t('theory', language),
                            value: 'Theory'
                        },
                        {
                            label: t('practical', language),
                            value: 'Practical'
                        },
                        {
                            label: t('revision', language),
                            value: 'Revision'
                        }
                    ]
                };
            case 'REG_DURATION':
                return {
                    inputType: 'grid',
                    options: [
                        {
                            label: t('min_15', language),
                            value: 15
                        },
                        {
                            label: t('min_30', language),
                            value: 30
                        },
                        {
                            label: t('min_45', language),
                            value: 45
                        },
                        {
                            label: t('hr_1', language),
                            value: 60
                        },
                        {
                            label: t('hr_1_15', language),
                            value: 75
                        },
                        {
                            label: t('hr_1_30', language),
                            value: 90
                        },
                        {
                            label: t('hr_1_45', language),
                            value: 105
                        },
                        {
                            label: t('hr_2', language),
                            value: 120
                        }
                    ]
                };
            case 'REG_UNDERSTANDING':
                return {
                    inputType: 'slider'
                };
            case 'REG_DEMAND':
                return {
                    inputType: 'grid',
                    options: [
                        {
                            label: t('very_light', language),
                            value: 'Very Light'
                        },
                        {
                            label: t('light', language),
                            value: 'Light'
                        },
                        {
                            label: t('moderate', language),
                            value: 'Moderate'
                        },
                        {
                            label: t('heavy', language),
                            value: 'Heavy'
                        },
                        {
                            label: t('very_heavy', language),
                            value: 'Very Heavy'
                        }
                    ]
                };
            case 'CALIBRATION_FAMILIARITY':
                return {
                    inputType: 'slider'
                };
            case 'CALIBRATION_FOCUS':
                return {
                    inputType: 'slider'
                };
            case 'CALIBRATION_TIME':
                return {
                    inputType: 'slider'
                };
            case 'REFLECTION_CHECK':
                return {
                    inputType: 'binary'
                };
            case 'REFLECTION_REASON':
                return {
                    inputType: 'text',
                    placeholder: 'Briefly explain...'
                };
            case 'SUMMARY':
                return {
                    inputType: 'none'
                };
            default:
                return {
                    inputType: 'none'
                };
        }
    };
    // Reset input when state changes (MOVED BELOW DECLARATIONS)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MainApp.useEffect": ()=>{
            setInputValue(null); // Clear input on every state change
            // Reset inputs based on state defaults...
            if (context.currentState === 'CALIBRATION_FAMILIARITY') setInputValue(50);
            if (context.currentState === 'CALIBRATION_FOCUS') setInputValue(50);
            if (context.currentState === 'CALIBRATION_TIME') setInputValue(30);
            if (context.currentState === 'REG_UNDERSTANDING') setInputValue(5);
            if (context.currentState === 'REG_DURATION') setInputValue(60);
            // Orientation Auto-Advance
            if (context.currentState === 'ORIENTATION') {
                const timer = setTimeout({
                    "MainApp.useEffect.timer": ()=>handleNext('AUTO_ORIENT')
                }["MainApp.useEffect.timer"], 4000);
                return ({
                    "MainApp.useEffect": ()=>clearTimeout(timer)
                })["MainApp.useEffect"];
            }
            // Summary Auto-Advance
            if (context.currentState === 'SUMMARY') {
                const timer = setTimeout({
                    "MainApp.useEffect.timer": ()=>handleNext()
                }["MainApp.useEffect.timer"], 2000); // 2s delay
                return ({
                    "MainApp.useEffect": ()=>clearTimeout(timer)
                })["MainApp.useEffect"];
            }
        }
    }["MainApp.useEffect"], [
        context.currentState
    ]);
    // --- TIMEOUT MODAL OVERLAY ---
    const renderTimeoutModal = ()=>{
        if (!timeoutModal) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0f1523] border border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-3xl",
                            children: "⚠️"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/MainApp.tsx",
                            lineNumber: 310,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/MainApp.tsx",
                        lineNumber: 309,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-white mb-2",
                        children: "Session Terminated"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/MainApp.tsx",
                        lineNumber: 312,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-400 mb-6",
                        children: "Your session exceeded the 12-hour active limit and was automatically closed with a penalty (Grade C)."
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/MainApp.tsx",
                        lineNumber: 313,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTimeoutModal(false),
                        className: "w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors",
                        children: "Acknowledge & Return"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/MainApp.tsx",
                        lineNumber: 316,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/MainApp.tsx",
                lineNumber: 308,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/MainApp.tsx",
            lineNumber: 307,
            columnNumber: 13
        }, this);
    };
    // --- APP CONTENT ---
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            renderTimeoutModal(),
            renderContent()
        ]
    }, void 0, true);
    //TURBOPACK unreachable
    ;
    function renderContent() {
        // --- DASHBOARD ROUTER ---
        if ([
            'SUBJECT_LIST',
            'DASHBOARD_SUBJECT',
            'DASHBOARD_SETTINGS',
            'DASHBOARD_HOME',
            'DASHBOARD_HISTORY',
            'DASHBOARD_CONFIG'
        ].includes(context.currentState)) {
            // ... View Logic ...
            if (context.currentState === 'DASHBOARD_SETTINGS' && context.selectedSubjectId) {
                const subject = subjects.find((s)=>s.id === context.selectedSubjectId);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ControlLayout"], {
                    currentView: context.currentState,
                    onNavigate: (state)=>setContext((prev)=>({
                                ...prev,
                                currentState: state
                            })),
                    lang: language,
                    onToggleLang: ()=>setLanguage((l)=>l === 'en' ? 'ar' : 'en'),
                    theme: theme,
                    onToggleTheme: ()=>setTheme((t)=>t === 'light' ? 'dark' : 'light'),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SubjectSettingsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubjectSettingsView"], {
                        subject: subject,
                        lang: language,
                        onSave: (config)=>{
                            console.log("Saving Config:", config);
                            setContext((prev)=>({
                                    ...prev,
                                    currentState: 'DASHBOARD_SUBJECT'
                                }));
                        },
                        onCancel: ()=>setContext((prev)=>({
                                    ...prev,
                                    currentState: 'DASHBOARD_SUBJECT'
                                }))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/MainApp.tsx",
                        lineNumber: 352,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/MainApp.tsx",
                    lineNumber: 344,
                    columnNumber: 21
                }, this);
            }
            if (context.currentState === 'DASHBOARD_SUBJECT' && context.selectedSubjectId) {
                const subject = subjects.find((s)=>s.id === context.selectedSubjectId);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ControlLayout"], {
                    currentView: context.currentState,
                    onNavigate: (state)=>setContext((prev)=>({
                                ...prev,
                                currentState: state
                            })),
                    lang: language,
                    onToggleLang: ()=>setLanguage((l)=>l === 'en' ? 'ar' : 'en'),
                    theme: theme,
                    onToggleTheme: ()=>setTheme((t)=>t === 'light' ? 'dark' : 'light'),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SubjectDetailView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubjectDetailView"], {
                        subjectId: subject.id,
                        onQuestionFlowStart: (flowType, contextId, predictedDuration)=>{
                            if (flowType === 'SESSION_START') {
                                const lecture = lectures.find((l)=>l.id === contextId);
                                const session = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$PreStudyEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PreStudyEngine"].registerSession(lecture, 5, 'Medium');
                                registerSession(session);
                                setContext((prev)=>({
                                        ...prev,
                                        currentState: 'STUDY_EXECUTION',
                                        actionType: 'STUDY',
                                        selectedSubjectId: subject.id,
                                        activeLectureId: contextId,
                                        currentSessionId: session.id,
                                        tempCalibration: {
                                            familiarity: 5,
                                            focus: 50,
                                            time: predictedDuration || lecture.duration * 2
                                        }
                                    }));
                            } else {
                                setContext((prev)=>({
                                        ...prev,
                                        currentState: 'REG_TYPE',
                                        actionType: 'REGISTER',
                                        selectedSubjectId: subject.id
                                    }));
                            }
                        },
                        onBack: ()=>setContext((prev)=>({
                                    ...prev,
                                    currentState: 'SUBJECT_LIST'
                                }))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/MainApp.tsx",
                        lineNumber: 376,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/MainApp.tsx",
                    lineNumber: 368,
                    columnNumber: 21
                }, this);
            }
            if (context.currentState === 'DASHBOARD_HISTORY') {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ControlLayout"], {
                    currentView: context.currentState,
                    onNavigate: (state)=>setContext((prev)=>({
                                ...prev,
                                currentState: state
                            })),
                    lang: language,
                    onToggleLang: ()=>setLanguage((l)=>l === 'en' ? 'ar' : 'en'),
                    theme: theme,
                    onToggleTheme: ()=>setTheme((t)=>t === 'light' ? 'dark' : 'light'),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$history$2f$HistoryView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HistoryView"], {}, void 0, false, {
                        fileName: "[project]/src/components/layout/MainApp.tsx",
                        lineNumber: 412,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/MainApp.tsx",
                    lineNumber: 404,
                    columnNumber: 21
                }, this);
            }
            if (context.currentState === 'DASHBOARD_CONFIG') {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ControlLayout"], {
                    currentView: context.currentState,
                    onNavigate: (state)=>setContext((prev)=>({
                                ...prev,
                                currentState: state
                            })),
                    lang: language,
                    onToggleLang: ()=>setLanguage((l)=>l === 'en' ? 'ar' : 'en'),
                    theme: theme,
                    onToggleTheme: ()=>setTheme((t)=>t === 'light' ? 'dark' : 'light'),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$SystemConfigView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SystemConfigView"], {
                        lang: language
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/MainApp.tsx",
                        lineNumber: 427,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/MainApp.tsx",
                    lineNumber: 419,
                    columnNumber: 21
                }, this);
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ControlLayout"], {
                currentView: context.currentState,
                onNavigate: (state)=>setContext((prev)=>({
                            ...prev,
                            currentState: state
                        })),
                lang: language,
                onToggleLang: ()=>setLanguage((l)=>l === 'en' ? 'ar' : 'en'),
                theme: theme,
                onToggleTheme: ()=>setTheme((t)=>t === 'light' ? 'dark' : 'light'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$DashboardView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardView"], {
                    onSelectSubject: (id)=>setContext((prev)=>({
                                ...prev,
                                currentState: 'DASHBOARD_SUBJECT',
                                selectedSubjectId: id
                            })),
                    onAddSubject: ()=>handleNext('ADD_SUBJECT'),
                    lang: language
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/MainApp.tsx",
                    lineNumber: 441,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/MainApp.tsx",
                lineNumber: 433,
                columnNumber: 17
            }, this);
        }
        if (context.currentState === 'STUDY_EXECUTION') {
            const allocated = context.tempCalibration.time;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ControlLayout"], {
                currentView: context.currentState,
                onNavigate: (state)=>setContext((prev)=>({
                            ...prev,
                            currentState: state
                        })),
                lang: language,
                onToggleLang: ()=>setLanguage((l)=>l === 'en' ? 'ar' : 'en'),
                theme: theme,
                onToggleTheme: ()=>setTheme((t)=>t === 'light' ? 'dark' : 'light'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SessionTimerView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SessionTimerView"], {
                    allocatedMinutes: allocated,
                    lectureId: context.activeLectureId || context.selectedSubjectId || 'unknown_lecture',
                    subjectId: context.selectedSubjectId || 'unknown_subject',
                    lang: language,
                    onComplete: handleSessionComplete
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/MainApp.tsx",
                    lineNumber: 461,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/MainApp.tsx",
                lineNumber: 453,
                columnNumber: 17
            }, this);
        }
        const props = getQuestionProps();
        const questionKey = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$engines$2f$FlowEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowEngine"].getQuestionKey(context.currentState);
        const questionText = t(questionKey, language);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$ControlLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ControlLayout"], {
            currentView: context.currentState,
            onNavigate: (state)=>setContext((prev)=>({
                        ...prev,
                        currentState: state
                    })),
            lang: language,
            onToggleLang: ()=>setLanguage((l)=>l === 'en' ? 'ar' : 'en'),
            theme: theme,
            onToggleTheme: ()=>setTheme((t)=>t === 'light' ? 'dark' : 'light'),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SingleQuestionView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SingleQuestionView"], {
                question: questionText,
                subtitle: context.currentState === 'REG_DURATION' ? t('duration_note', language) : undefined,
                warning: context.currentState === 'REG_DURATION' ? t('duration_warning', language) : undefined,
                inputType: props.inputType,
                value: inputValue,
                onChange: setInputValue,
                onConfirm: handleNext,
                placeholder: props.placeholder,
                options: props.options,
                lang: language
            }, void 0, false, {
                fileName: "[project]/src/components/layout/MainApp.tsx",
                lineNumber: 485,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/MainApp.tsx",
            lineNumber: 477,
            columnNumber: 13
        }, this);
    }
}
_s(MainApp, "yRHHNQ4XDHSIduOstk7rOOp0tuI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = MainApp;
var _c;
__turbopack_context__.k.register(_c, "MainApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/services/RealtimePresenceService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RealtimePresenceService",
    ()=>RealtimePresenceService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$database$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/database/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/database/dist/index.esm.js [app-client] (ecmascript)");
;
;
// ROOT PATHS
const STATUS_ROOT = (uid)=>`status/${uid}`;
_c = STATUS_ROOT;
const CONNECTED_REF = ".info/connected";
const RealtimePresenceService = {
    /**
     * INITIALIZE CONNECTION LISTENER
     * Call this once on app mount (AuthState listener).
     * Sets up the "Kill Switch" (onDisconnect) mechanics.
     */ initialize: (uid)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDatabaseInstance"])();
        if (!db) return;
        const connectedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(db, CONNECTED_REF);
        const userStatusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(db, STATUS_ROOT(uid));
        // Listen to connection state
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onValue"])(connectedRef, (snap)=>{
            if (snap.val() === true) {
                // 1. Establish "Kill Switch" FIRST
                // If we lose connection, update status to 'offline' but PRESERVE SESSION.
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onDisconnect"])(userStatusRef).update({
                    state: 'offline',
                    lastSeenAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                });
                // 2. Set Initial Online State
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["update"])(userStatusRef, {
                    state: 'online',
                    lastSeenAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                });
            }
        });
        // 3. LISTEN FOR AUTHORITATIVE REPORT (Admin Force End)
        // This is the SINGLE SOURCE OF TRUTH for forced termination.
        const terminationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(db, `status/${uid}/sessionTermination`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onValue"])(terminationRef, (snap)=>{
            const data = snap.val();
            if (data) {
                console.warn("[RTDB] 🚨 RECEIVED AUTHORITATIVE TERMINATION SIGNAL:", data);
                // Force End Local Session (Remote Kill)
                // Pass payload to display warning in UI
                __turbopack_context__.A("[project]/src/store/useStore.ts [app-client] (ecmascript, async loader)").then(({ useStore })=>{
                    useStore.getState().endActiveSession(false, true, data);
                });
            }
        });
    },
    /**
     * UPDATE VISIBILITY STATE
     * 'online' (Focused) vs 'background' (Blurred)
     */ updateState: (uid, state)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDatabaseInstance"])();
        if (!db) return;
        const userStatusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(db, STATUS_ROOT(uid));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["update"])(userStatusRef, {
            state,
            lastSeenAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
    },
    /**
     * HEARTBEAT (Keep-Alive)
     * Updates timestamps every 30-60s.
     * MUST NOT overwrite 'background' state.
     */ heartbeat: (uid)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDatabaseInstance"])();
        if (!db) return;
        const userStatusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(db, STATUS_ROOT(uid));
        // We only update lastSeenAt. We rely on updateState to manage online/background.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["update"])(userStatusRef, {
            lastSeenAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
    },
    /**
     * SESSION MANAGEMENT
     * Writes full activeSession object.
     */ startSession: (uid, lectureId, subjectId)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDatabaseInstance"])();
        if (!db) return;
        const userStatusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(db, STATUS_ROOT(uid));
        const sessionId = `${uid}_${lectureId}_${Date.now()}`;
        // 1. Write FULL Active Session Object
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["update"])(userStatusRef, {
            // Force online when starting session (usually user is active)
            state: 'online',
            lastSeenAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            activeSession: {
                sessionId,
                lectureId,
                subjectId,
                startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            }
        });
    },
    endSession: (uid)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDatabaseInstance"])();
        if (!db) return;
        const userStatusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(db, STATUS_ROOT(uid));
        // Atomic Wipe of Session -> effectively "Not Studying"
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["update"])(userStatusRef, {
            activeSession: null,
            lastSeenAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
    },
    /**
     * MANUAL OFFLINE (Cleanup)
     * e.g. Logout or Tab Close
     * STRICT: Must PRESERVE activeSession if one exists.
     */ setOffline: (uid)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDatabaseInstance"])();
        if (!db) return;
        const userStatusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(db, STATUS_ROOT(uid));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["update"])(userStatusRef, {
            state: 'offline',
            lastSeenAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
    },
    /**
     * TRACK PAGE NAVIGATION
     */ trackPage: (uid, path)=>{
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDatabaseInstance"])();
        if (!db) return;
        const userStatusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(db, STATUS_ROOT(uid));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["update"])(userStatusRef, {
            currentPage: path,
            lastSeenAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
    }
};
var _c;
__turbopack_context__.k.register(_c, "STATUS_ROOT");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/PresenceListener.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PresenceListener",
    ()=>PresenceListener
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$RealtimePresenceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/services/RealtimePresenceService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const PresenceListener = ()=>{
    _s();
    const { authState, activeSession } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const user = authState.user;
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // --- 0. DEV ENVIRONMENT GUARD ---
    // In production, we might want to disable this check or make it robust.
    // For now, we allow localhost to write to RTDB (assuming correct config).
    // --- 1. PRESENCE LAYER (RTDB) ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PresenceListener.useEffect": ()=>{
            if (!user?.id) return;
            // A. Initialize Connection Listeners (Kill Switch)
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$RealtimePresenceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RealtimePresenceService"].initialize(user.id);
            // B. Visibility Handler (Online <-> Background)
            const handleVisibility = {
                "PresenceListener.useEffect.handleVisibility": ()=>{
                    const status = document.hidden ? 'background' : 'online';
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$RealtimePresenceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RealtimePresenceService"].updateState(user.id, status);
                }
            }["PresenceListener.useEffect.handleVisibility"];
            document.addEventListener('visibilitychange', handleVisibility);
            // C. Heartbeat Loop (60s)
            // STRICT: Only update timestamp, do NOT overwrite state.
            const heartbeat = setInterval({
                "PresenceListener.useEffect.heartbeat": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$RealtimePresenceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RealtimePresenceService"].heartbeat(user.id);
                }
            }["PresenceListener.useEffect.heartbeat"], 60000);
            // D. Cleanup (Offline)
            const handleUnload = {
                "PresenceListener.useEffect.handleUnload": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$RealtimePresenceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RealtimePresenceService"].setOffline(user.id);
                }
            }["PresenceListener.useEffect.handleUnload"];
            window.addEventListener('beforeunload', handleUnload);
            return ({
                "PresenceListener.useEffect": ()=>{
                    document.removeEventListener('visibilitychange', handleVisibility);
                    window.removeEventListener('beforeunload', handleUnload);
                    clearInterval(heartbeat);
                }
            })["PresenceListener.useEffect"];
        }
    }["PresenceListener.useEffect"], [
        user?.id
    ]);
    // --- 2. STUDY STATE LAYER (RTDB) ---
    // Tracks "In Session" status via Session ID persistence
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PresenceListener.useEffect": ()=>{
            if (!user?.id) return;
            if (activeSession) {
                // Start/Update Session in RTDB
                // Writes strict object: { sessionId, lectureId, subjectId, startedAt }
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$RealtimePresenceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RealtimePresenceService"].startSession(user.id, activeSession.lectureId, activeSession.subjectId);
            } else {
                // End Session in RTDB (Atomic Wipe)
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$RealtimePresenceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RealtimePresenceService"].endSession(user.id);
            }
        }
    }["PresenceListener.useEffect"], [
        user?.id,
        activeSession?.lectureId,
        activeSession?.subjectId
    ]);
    // Track Page Changes as Interactions
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PresenceListener.useEffect": ()=>{
            if (user?.id) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$services$2f$RealtimePresenceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RealtimePresenceService"].trackPage(user.id, pathname);
            }
        }
    }["PresenceListener.useEffect"], [
        pathname,
        user?.id
    ]);
    return null;
};
_s(PresenceListener, "NLv82IEuyroghqozlK0IDTNcpZs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = PresenceListener;
var _c;
__turbopack_context__.k.register(_c, "PresenceListener");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/RootGate.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootGate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$CompleteProfileView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/profile/CompleteProfileView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$MainApp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/MainApp.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$PresenceListener$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/PresenceListener.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function RootGate() {
    _s();
    // --- 1. UNCONDITIONAL HOOKS ---
    const { authState, syncAuth, initializeRealtimeSync } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initial Mount & Auth Subscription (RUNS ONCE)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RootGate.useEffect": ()=>{
            setIsMounted(true);
            // Initialize Auth Listener
            syncAuth();
        }
    }["RootGate.useEffect"], []); // Empty dependency array = Runs once on mount
    // Real-time Data Sync (Optimization: Only when auth'd)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RootGate.useEffect": ()=>{
            if (authState.status === 'AUTHENTICATED' && authState.user?.id) {
                initializeRealtimeSync(authState.user.id);
            }
        }
    }["RootGate.useEffect"], [
        authState.status,
        authState.user?.id
    ]);
    // --- 2. LOADING STATE (Hydration & Auth Check) ---
    // If not mounted (SSR/Hydration) OR Auth is still figuring itself out
    if (!isMounted || authState.status === 'LOADING') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-[999999] bg-[#020617] flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/RootGate.tsx",
                lineNumber: 40,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/RootGate.tsx",
            lineNumber: 39,
            columnNumber: 13
        }, this);
    }
    // --- 3. STATE MACHINE DECISIONS ---
    const isAuth = authState.status === 'AUTHENTICATED';
    // STRICT: Profile is only complete if fullName is present in Store (from Firestore)
    const isProfileComplete = authState.user?.completed === true && !!authState.user?.fullName;
    // SCENARIO A: AUTHENTICATED & INCOMPLETE -> ONBOARDING
    // Strictly isolate "Onboarding" flow so incomplete profiles can't access MainApp
    if (isAuth && !isProfileComplete) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$PresenceListener$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceListener"], {}, void 0, false, {
                    fileName: "[project]/src/components/layout/RootGate.tsx",
                    lineNumber: 55,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$CompleteProfileView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/layout/RootGate.tsx",
                    lineNumber: 56,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true);
    }
    // SCENARIO B: MAIN APPLICATION
    // Renders for both GUESTS and COMPLETE AUTH users.
    // Guests see "Sign In" button (Handled by ControlLayout within MainApp).
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$PresenceListener$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceListener"], {}, void 0, false, {
                fileName: "[project]/src/components/layout/RootGate.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$MainApp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MainApp"], {}, void 0, false, {
                fileName: "[project]/src/components/layout/RootGate.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(RootGate, "VEwwuFmKkPFADT/J6iZNbgOwyp8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = RootGate;
var _c;
__turbopack_context__.k.register(_c, "RootGate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$RootGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/RootGate.tsx [app-client] (ecmascript)");
'use client';
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$RootGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 6,
        columnNumber: 12
    }, this);
}
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_e48a40ca._.js.map