import { getFirestoreInstance } from "./firebase";
import { writeBatch, doc } from "firebase/firestore";

const FLUSH_INTERVAL = 30000; // 30s

interface BufferedWrite {
    path: string;
    data: any;
    type: 'SET' | 'UPDATE';
    merge?: boolean;
}

export const WriteBufferService = {
    buffer: new Map<string, BufferedWrite>(),
    timer: null as NodeJS.Timeout | null,

    // INITIALIZE
    init: () => {
        if (typeof window === 'undefined') return;

        // Recover from Storage
        try {
            const saved = sessionStorage.getItem('write_buffer');
            if (saved) {
                const parsed = JSON.parse(saved);
                parsed.forEach((item: BufferedWrite) => {
                    WriteBufferService.buffer.set(item.path, item);
                });
                console.log(`[WriteBuffer] Recovered ${parsed.length} writes.`);
            }
        } catch (e) {
            console.warn("Buffer recovery failed", e);
        }

        // Auto Flush
        WriteBufferService.timer = setInterval(() => {
            WriteBufferService.flush();
        }, FLUSH_INTERVAL);

        // Listeners
        window.addEventListener('beforeunload', () => WriteBufferService.flush(true));
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) WriteBufferService.flush(true);
        });
    },

    // ADD TO BUFFER
    write: (path: string, data: any, type: 'SET' | 'UPDATE' = 'SET', merge: boolean = true) => {
        // Merge logic: If exists, deep merge data
        const existing = WriteBufferService.buffer.get(path);
        let newData = data;

        if (existing) {
            // Simple spread merge. Deep merge better but costly.
            // Assumption: updates are usually distinct or additive.
            newData = { ...existing.data, ...data };
        }

        WriteBufferService.buffer.set(path, { path, data: newData, type, merge });

        // Backup to Storage (Crash Safety)
        WriteBufferService.persist();
    },

    // FLUSH TO FIRESTORE
    flush: async (sync: boolean = false) => {
        if (WriteBufferService.buffer.size === 0) return;

        const db = getFirestoreInstance();
        if (!db) return;

        const batch = writeBatch(db);
        const entries = Array.from(WriteBufferService.buffer.values());

        // Clear immediately to prevent double-flush logic if async
        // If sync (beforeunload), we must try our best.
        WriteBufferService.buffer.clear();
        WriteBufferService.persist(); // Clear storage

        console.log(`[WriteBuffer] Flushing ${entries.length} writes...`);

        try {
            entries.forEach(entry => {
                const ref = doc(db, entry.path);
                if (entry.type === 'SET') {
                    batch.set(ref, entry.data, { merge: entry.merge });
                } else {
                    batch.update(ref, entry.data);
                }
            });

            await batch.commit();
            console.log("[WriteBuffer] Flush Complete.");
        } catch (e) {
            console.error("[WriteBuffer] Flush Failed:", e);
            // On failure, re-add to buffer?
            // Risk of loop. For now, log and maybe recover in session storage?
        }
    },

    // HELPER: Persist buffer to sessionStorage
    persist: () => {
        if (typeof window === 'undefined') return;
        try {
            const arr = Array.from(WriteBufferService.buffer.values());
            if (arr.length > 0) {
                sessionStorage.setItem('write_buffer', JSON.stringify(arr));
            } else {
                sessionStorage.removeItem('write_buffer');
            }
        } catch (e) { }
    }
};
