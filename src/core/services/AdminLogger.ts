import "server-only";
import { createFirebaseAdminApp } from './firebase-admin';
import * as admin from 'firebase-admin';

export interface AdminLogEntry {
    performedBy: string; // "user" or "adminUid"
    targetUid: string;
    type: 'HARD_RESET' | 'SUBJECT_DELETE' | 'UNDO_RESET';
    timestamp: number;
    undoToken?: string;
    metadata?: any;
}

export class AdminLogger {
    static async logAction(entry: AdminLogEntry) {
        try {
            const app = createFirebaseAdminApp();
            const db = app.firestore();

            await db.collection('logs').doc('resets').collection('entries').add({
                ...entry,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            console.log(`[AdminLogger] Logged action: ${entry.type} on ${entry.targetUid}`);
        } catch (e) {
            console.error('[AdminLogger] Failed to log:', e);
            // Non-blocking error
        }
    }
}
