import { useMemo, useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

/**
 * UI DATA LAYER (READ-ONLY)
 * 
 * This file acts as the "Read" counterpart to SystemAPI.ts ("Write").
 * Components should import these hooks to render state.
 * They should NEVER import useStore directly.
 */

// --- 1. TELEMETRY HOOKS ---

export const useStudentProfile = () => {
    return useStore(state => state.profile);
};

export const useDailyLoad = () => {
    return useStore(state => state.dailyLoad);
};

export const useSystemStatus = () => {
    return useStore(state => {
        const loadStatus = state.dailyLoad.status;
        const capacity = state.profile.currentCapacity;

        if (capacity <= 5) return 'CRITICAL';
        if (loadStatus === 'Risk') return 'LOCKED';
        if (loadStatus === 'Warning') return 'WARNING';
        return 'NOMINAL';
    });
};

// --- 2. INVENTORY HOOKS ---

export const useSubjectList = () => {
    return useStore(state => state.subjects);
};

export const useSubject = (subjectId: string) => {
    return useStore(state => state.subjects.find(s => s.id === subjectId));
};

export const useSubjectLectures = (subjectId: string) => {
    const lectures = useStore(state => state.lectures);
    return useMemo(() => lectures.filter(l => l.subjectId === subjectId), [lectures, subjectId]);
};

// --- 3. SESSION HOOKS ---

export const useSessionLog = () => {
    return useStore(state => state.sessions);
};

// --- 4. UTILITY HOOKS ---

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query, matches]);

    return matches;
};
