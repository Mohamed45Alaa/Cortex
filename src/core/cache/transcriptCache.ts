export interface TranscriptionSegment {
    id: number;
    start: number;
    end: number;
    text: string;
}

const DB_NAME = 'WhisperCacheDB_v2';
const STORE_NAME = 'transcripts';
const CACHE_VERSION = 2; // For versioning

const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, CACHE_VERSION);
        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = request.result;
            // Clear old stores on upgrade to prevent schema corruption
            if (db.objectStoreNames.contains(STORE_NAME)) {
                if (event.oldVersion < CACHE_VERSION) {
                    db.deleteObjectStore(STORE_NAME);
                }
            }
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'hash' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const generateVideoHash = async (file: File): Promise<string> => {
    try {
        const size = file.size.toString();
        const msgUint8 = new TextEncoder().encode(`${file.name}_${size}_${CACHE_VERSION}`);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
        console.warn("SHA-256 hash failed, falling back to simple hash", e);
        return `${file.name}_v${CACHE_VERSION}`;
    }
};

export const getCachedTranscript = async (hash: string): Promise<TranscriptionSegment[] | null> => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(hash);
            request.onsuccess = () => resolve(request.result?.segments || null);
            request.onerror = () => reject(request.error);
        });
    } catch (e) {
        console.warn("Failed to read from cache:", e);
        return null;
    }
};

export const cacheTranscript = async (hash: string, segments: TranscriptionSegment[]) => {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        store.put({ hash, segments, timestamp: Date.now() });
    } catch (e) {
        console.warn("Failed to write to cache IndexedDB:", e);
    }
};
