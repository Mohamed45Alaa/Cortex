export interface AudioExtractionOptions {
    targetSampleRate?: number;
    timeoutMs?: number;
}

function resamplePCM(input: Float32Array, originalRate: number, targetRate: number): Float32Array {
    const ratio = originalRate / targetRate;
    const newLength = Math.floor(input.length / ratio);
    const output = new Float32Array(newLength);

    for (let i = 0; i < newLength; i++) {
        const index = i * ratio;
        const left = Math.floor(index);
        const right = Math.min(left + 1, input.length - 1);
        const frac = index - left;

        output[i] = input[left] * (1 - frac) + input[right] * frac;
    }

    return output;
}

export const extractAudioSafely = async (
    file: File,
    options: AudioExtractionOptions = {}
): Promise<Float32Array> => {
    const { targetSampleRate = 16000, timeoutMs = 120000 } = options;

    return new Promise(async (resolve, reject) => {
        let tempCtx: AudioContext | null = null;
        let timeoutId: NodeJS.Timeout | null = null;

        try {
            if (!file) throw new Error("Audio Extractions: Missing file object");

            // Setup safety timeout
            timeoutId = setTimeout(() => {
                if (tempCtx && tempCtx.state !== 'closed') tempCtx.close().catch(() => { });
                reject(new Error("Audio extraction timed out after " + timeoutMs + "ms"));
            }, timeoutMs);

            console.log(`[Audio Extractor] Reading file into ArrayBuffer... Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
            const arrayBuffer = await file.arrayBuffer();

            // Re-initialize a fresh AudioContext safely
            try {
                tempCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            } catch (ctxErr) {
                throw new Error("Failed to initialize AudioContext. Browser might be blocking audio.");
            }

            console.log(`[Audio Extractor] Decoding audio data...`);
            // Decode entire buffer
            let audioBuffer: AudioBuffer;
            try {
                audioBuffer = await tempCtx.decodeAudioData(arrayBuffer);
            } catch (decodeErr) {
                throw new Error("Failed to decode audio data. Format might be unsupported or file is corrupted.");
            }

            const duration = audioBuffer.duration;
            console.log(`[Audio Extractor] Decoded duration: ${duration.toFixed(2)}s, sampleRate: ${audioBuffer.sampleRate}Hz, channels: ${audioBuffer.numberOfChannels}, length: ${audioBuffer.length}`);

            if (duration <= 0) throw new Error("Decoded audio has zero duration");

            // We must resample to precisely 16kHz Mono for Whisper
            // We manually resample to precisely 16kHz Mono for Whisper
            console.log(`[Audio Extractor] Manual resampling to ${targetSampleRate}Hz using linear interpolation...`);

            const rawPCM = audioBuffer.getChannelData(0);

            // --- USER REQUESTED DIAGNOSTICS ---
            let firstNonZero = -1;
            for (let i = 0; i < rawPCM.length; i++) {
                if (Math.abs(rawPCM[i]) > 1e-6) {
                    firstNonZero = i;
                    break;
                }
            }

            console.log("[Audio Extractor] First non-zero sample at:", firstNonZero);

            if (firstNonZero !== -1) {
                console.log(`[Audio Extractor] First 20 samples from index ${firstNonZero}:`, Array.from(rawPCM.slice(firstNonZero, firstNonZero + 20)));
            }

            let maxAmp = 0;
            for (let i = 0; i < rawPCM.length; i++) {
                maxAmp = Math.max(maxAmp, Math.abs(rawPCM[i]));
            }

            console.log("[Audio Extractor] Max amplitude:", maxAmp);

            if (maxAmp === 0) {
                throw new Error("Decoded audio is completely silent");
            }
            // ----------------------------------

            const float32Data = resamplePCM(rawPCM, audioBuffer.sampleRate, targetSampleRate);

            console.log(`[Audio Extractor] Rendered sampleRate: ${targetSampleRate}Hz`);
            console.log(`[Audio Extractor] Rendered length: ${float32Data.length} samples`);

            if (!float32Data || float32Data.length === 0) {
                throw new Error("Rendered audio buffer is empty");
            }

            // Cleanup heavy memory references immediately
            audioBuffer = null as any;
            if (tempCtx.state !== 'closed') {
                await tempCtx.close();
            }
            if (timeoutId) clearTimeout(timeoutId);

            console.log(`[Audio Extractor] Successfully extracted PCM data.`);
            resolve(float32Data);

        } catch (err: any) {
            if (tempCtx && tempCtx.state !== 'closed') {
                tempCtx.close().catch(() => { });
            }
            if (timeoutId) clearTimeout(timeoutId);
            reject(err);
        }
    });
};
