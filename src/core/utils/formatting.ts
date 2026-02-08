/**
 * STRICT FORMATTING UTILITIES
 * 
 * Centralized logic for displaying metrics to ensure consistency across the application.
 */

/**
 * Formats a Cognitive Load value (0-10) for display.
 * Rules:
 * 1. Clamp between 0 and 10.
 * 2. Max 2 decimal places.
 * 3. Strip trailing zeros (e.g. "2.00" -> "2", "1.50" -> "1.5").
 * 
 * @param value The raw cognitive cost/load value.
 * @returns Formatted string.
 */
export const formatCognitiveLoad = (value: number | undefined | null): string => {
    if (value === undefined || value === null || isNaN(value)) return "0";

    // 1. Clamp
    let safeValue = Math.min(10, Math.max(0, value));

    // 2. Format to max 2 decimals & Strip trailing zeros
    // parseFloat() handles stripping trailing zeros from a fixed-point string
    return parseFloat(safeValue.toFixed(2)).toString();
};
