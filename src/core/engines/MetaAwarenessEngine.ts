export const MetaAwarenessEngine = {
    /**
     * continuously evaluates its own accuracy.
     */
    analyzePredictionAccuracy: (
        predictedMinutes: number,
        actualMinutes: number
    ): { errorPercent: number, confidenceAdjustment: number } => {
        if (actualMinutes <= 0) return { errorPercent: 0, confidenceAdjustment: 0 };

        const error = Math.abs(predictedMinutes - actualMinutes);
        const errorPercent = (error / actualMinutes) * 100;

        // Confidence Calibration
        // If precise (<10% error) -> Increase system confidence
        // If inaccurate (>30% error) -> Decrease confidence
        let confidenceAdjustment = 0;
        if (errorPercent < 10) confidenceAdjustment = 0.05;
        else if (errorPercent > 30) confidenceAdjustment = -0.1;

        // "Integrity Rule: Never fake certainty."
        // This adjustment will be fed back into the Global Store's "SystemConfidence" state.

        return { errorPercent, confidenceAdjustment };
    }
};
