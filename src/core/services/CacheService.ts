
interface CacheItem<T> {
    data: T;
    expiry: number;
}

export const CacheService = {
    memory: new Map<string, CacheItem<any>>(),

    set: <T>(key: string, data: T, ttlSeconds: number) => {
        const expiry = Date.now() + (ttlSeconds * 1000);
        const item = { data, expiry };

        // 1. Memory
        CacheService.memory.set(key, item);

        // 2. Storage (Fallback)
        try {
            localStorage.setItem(`cache_${key}`, JSON.stringify(item));
        } catch (e) {
            console.warn("Cache write failed", e);
        }
    },

    get: <T>(key: string): T | null => {
        const now = Date.now();

        // 1. Memory
        const memParams = CacheService.memory.get(key);
        if (memParams) {
            if (memParams.expiry > now) return memParams.data;
            CacheService.memory.delete(key);
        }

        // 2. Storage
        try {
            const stored = localStorage.getItem(`cache_${key}`);
            if (stored) {
                const item: CacheItem<T> = JSON.parse(stored);
                if (item.expiry > now) {
                    // Hydrate Memory
                    CacheService.memory.set(key, item);
                    return item.data;
                } else {
                    localStorage.removeItem(`cache_${key}`);
                }
            }
        } catch (e) { }

        return null;
    },

    clear: (key: string) => {
        CacheService.memory.delete(key);
        try {
            localStorage.removeItem(`cache_${key}`);
        } catch (e) { }
    }
};
