
export type FocusState = 'ACTIVE' | 'IDLE' | 'DISENGAGED';

export class FocusEngine {
    private static IDLE_THRESHOLD = 30000; // 30 Seconds (Example, can be tuned)
    private static DISENGAGED_THRESHOLD = 120000; // 2 Minutes

    /**
     * Determines the current Focus State based on authoritative signals.
     * 
     * PRIORITY:
     * 1. Media Playing -> ACTIVE
     * 2. Active Tool (AI/Translate) -> ACTIVE
     * 3. Input Recent -> ACTIVE (prevents idle) -> WRONG: Input alone shouldn't force green if nothing is happening, 
     *    BUT "Input is secondary... prevent Disengaged state". 
     *    Let's follow the specific truth table requested.
     * 
     * RULES:
     * - player === PLAYING -> ACTIVE
     * - tool === OPEN -> ACTIVE
     * - player === PAUSED && No Input > Threshold -> IDLE
     * - Everything Inactive > Disengaged Threshold -> DISENGAGED
     */
    static determineState(
        isMediaPlaying: boolean,
        isToolActive: boolean,
        lastInputTime: number,
        currentTime: number = Date.now()
    ): FocusState {
        // 1. AUTHORITATIVE ACTIVE SIGNALS
        if (isMediaPlaying) return 'ACTIVE';
        if (isToolActive) return 'ACTIVE';

        // 2. IDLE / DISENGAGED LOGIC
        const timeSinceInput = currentTime - lastInputTime;

        if (timeSinceInput > this.DISENGAGED_THRESHOLD) {
            return 'DISENGAGED';
        }

        if (timeSinceInput > this.IDLE_THRESHOLD) {
            return 'IDLE';
        }

        // Default: If input is recent but no media/tool, what is it?
        // Spec: "Local Player and AI Tools override idle detection."
        // Spec: "User input is secondary... prevent disengaged state."
        // Spec: "Paused player -> YELLOW after threshold"
        // Implication: If I just moved my mouse, but player is paused and no tool is open...
        // The spec Part 10 says "Doing nothing -> RED".
        // Part 9 Loop says "else if idle threshold -> IDLE".
        // So if I am moving mouse, I am NOT above idle threshold.
        // So I fall through to... what?
        // If I am NOT idle (input is recent), I must be ACTIVE? 
        // OR does "Input is secondary" mean it can only sustain Yellow?
        // Part 5: "Mouse and keyboard... must NOT define Active Study alone."
        // This suggests: Input Only = YELLOW (IDLE) or at least NOT GREEN.
        // BUT logic loop:
        // if playing -> ACTIVE
        // else if tool -> ACTIVE
        // else if idle_threshold -> IDLE (Yellow)
        // else -> DISENGAGED (Red)? No, that's "else if disengaged threshold".
        // The loop in Part 9 is simplified.
        // Let's interpret "Input doesn't define Active":
        // If (No Media && No Tool && Recent Input) -> It cannot be ACTIVE (Green).
        // It must be IDLE (Yellow)? 
        // "Paused player -> YELLOW after threshold" implies before threshold it might be... Green? No, user said "only when consuming content".

        // REFINED LOGIC based on "Color mapping":
        // GREEN = Active Study (Media or Tools)
        // YELLOW = Idle (Paused, Browsing, Inputting but not studying)
        // RED = Disengaged (Away)

        return 'IDLE'; // Input alone keeps you in IDLE (Yellow), prevents RED.
    }
}
