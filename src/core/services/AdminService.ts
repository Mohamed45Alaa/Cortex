import {
    collectionGroup,
    getDocs,
    query,
    collection,
    deleteDoc,
    doc,
    writeBatch,
    updateDoc
} from 'firebase/firestore';
import { ref, set, update } from 'firebase/database';
import { getFirestoreInstance, getDatabaseInstance, getAuthInstance } from './firebase'; // Singleton Import
import { getApp } from 'firebase/app';
import { UserProfile } from '@/core/types';

// --- HELPER: AUTH HEADERS ---
const getAuthHeaders = async () => {
    const auth = getAuthInstance();
    if (!auth || !auth.currentUser) {
        throw new Error("Unauthorized: No active admin session.");
    }
    const token = await auth.currentUser.getIdToken(true); // Force refresh to ensure claims are up to date
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const AdminService = {
    getAllStudents: async (): Promise<{ students: UserProfile[], error: string | null }> => {
        try {
            console.warn("--- ADMIN SERVICE: START FETCH ---");
            const db = getFirestoreInstance();
            const app = getApp();

            if (!db) {
                return { students: [], error: "Firestore Instance Missing" };
            }

            console.warn(`[AdminService] Target Project ID: ${app.options.projectId}`);

            // 1. Query Collection Group 'profile'
            const profilesQuery = query(collectionGroup(db, 'profile'));
            const snapshot = await getDocs(profilesQuery);

            console.warn(`[AdminService] Raw Snapshot Size: ${snapshot.size}`);

            if (snapshot.empty) {
                return { students: [], error: null }; // Valid empty state
            }

            const allUsers: UserProfile[] = [];

            snapshot.forEach(doc => {
                const data = doc.data();
                // Parent of 'profile' collection is 'users/{uid}' doc. 
                const uid = doc.ref.parent.parent?.id;

                if (uid && data) {
                    const rawRole = data.role as string | undefined;
                    const normalizedRole = rawRole ? rawRole.toUpperCase() : 'STUDENT';

                    const profile = {
                        id: uid,
                        email: data.email || 'No email on record',
                        name: data.fullName || data.name || 'Unknown Student',
                        role: normalizedRole,
                        academicYear: data.academicYear,
                        completed: data.completed || false,
                        createdAt: data.createdAt || data.updatedAt || new Date().toISOString(),
                        fullName: data.fullName,
                    } as any;

                    allUsers.push(profile);
                }
            });

            // Exclude Admins
            const students = allUsers
                .filter(u => u.role !== 'ADMIN')
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            console.warn(`[AdminService] Returning ${students.length} students.`);
            return { students, error: null };

        } catch (error: any) {
            console.error("[AdminService] CRITICAL ERROR:", error);
            let errorMessage = "Unknown Error";

            if (error?.code === 'permission-denied') {
                errorMessage = "PERMISSION DENIED: Security Rules blocked access. ensuring rules are deployed.";
            } else {
                errorMessage = error.message || "Failed to fetch data";
            }

            return { students: [], error: errorMessage };
        }
    },


    // --- DANGEROUS ACTIONS (VIA SECURE API) ---

    // 1. DELETE STUDENT (HARD DELETE)
    deleteStudent: async (uid: string): Promise<{ success: boolean; error?: string }> => {
        try {
            console.warn(`[AdminService] DELETING STUDENT (VIA API): ${uid}`);
            const headers = await getAuthHeaders();
            const response = await fetch('/api/admin/actions', {
                method: 'POST',
                headers,
                body: JSON.stringify({ action: 'DELETE_STUDENT', uid })
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.error);

            return { success: true };
        } catch (e: any) {
            console.error("DELETE FAILED", e);
            return { success: false, error: e.message };
        }
    },

    // 2. RESET STUDENT (SOFT RESET)
    resetStudent: async (uid: string): Promise<{ success: boolean; error?: string }> => {
        try {
            console.warn(`[AdminService] RESETTING STUDENT (VIA API): ${uid}`);
            const headers = await getAuthHeaders();
            const response = await fetch('/api/admin/actions', {
                method: 'POST',
                headers,
                body: JSON.stringify({ action: 'RESET_STUDENT', uid })
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.error);

            return { success: true };
        } catch (e: any) {
            console.error("RESET FAILED", e);
            return { success: false, error: e.message };
        }
    },

    // 3. FORCE END SESSION
    forceEndSession: async (uid: string): Promise<{ success: boolean; error?: string }> => {
        try {
            console.warn(`[AdminService] FORCE END SESSION (VIA API): ${uid}`);
            const headers = await getAuthHeaders();
            const response = await fetch('/api/admin/actions', {
                method: 'POST',
                headers,
                body: JSON.stringify({ action: 'FORCE_END_SESSION', uid })
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.error);

            return { success: true };
        } catch (e: any) {
            console.error("FORCE END FAILED", e);
            return { success: false, error: e.message };
        }
    }
};

// (Helper moved to top)
