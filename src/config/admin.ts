/**
 * Admin Configuration
 * 
 * Defines the list of Google UIDs that are granted Admin privileges.
 * This should be secured via Firestore Security Rules in a production app.
 * For this MVP/Demo, a client-side whitelist is sufficient for UI gating.
 */

export const ADMIN_UIDS = [
    // Add your Google UID here to facilitate testing
    '7DDyPlo4C8W9e3FjYqLwZ4xJ8u53', // Example UID (Replace with real one)
    'REPLACE_WITH_YOUR_ACTUAL_UID'  // Placeholder
];

export const isAdmin = (uid: string): boolean => {
    return ADMIN_UIDS.includes(uid);
};

export const ACADEMIC_YEARS = [
    "Year 1",
    "Year 2",
    "Year 3",
    "Year 4",
    "Year 5"
] as const;

export type AcademicYear = typeof ACADEMIC_YEARS[number];
