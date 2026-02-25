import { pipeline, env } from '@huggingface/transformers';

env.allowLocalModels = false;
env.useBrowserCache = true;

export interface TranscriptionSegment {
    id: number;
    start: number;
    end: number;
    text: string;
}

export type TranscriptionMessage =
    | { type: 'STARTING'; fileId: string; modelType: string }
    | { type: 'PROGRESS'; fileId: string; progress: number; loaded: number; total: number }
    | { type: 'READY'; fileId: string }
    | { type: 'CHUNK'; fileId: string; text: string; segment: TranscriptionSegment }
    | { type: 'COMPLETE'; fileId: string; text: string; segments: TranscriptionSegment[] }
    | { type: 'ERROR'; fileId: string; error: string; fatal: boolean };

class WhisperPipelineFactory {
    static instance: any = null;
    static isInstantiating = false;
    static modelLoaded = '';

    static async getInstance(onProgress: (info: any) => void) {
        if (this.instance) return this.instance;

        // Prevent race conditions where multiple chunks try to load the model
        if (this.isInstantiating) {
            // Poll until instantiation finishes
            while (this.isInstantiating) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            if (this.instance) return this.instance;
        }

        this.isInstantiating = true;
        let p = null;
        let lastError = null;

        // Model fallback chain: Try base first, then fallback to tiny if RAM/Network fails
        const modelsToTry = ['Xenova/whisper-base', 'Xenova/whisper-tiny'];

        for (const model of modelsToTry) {
            try {
                // We use standard pipeline configuration for Whisper
                p = await pipeline('automatic-speech-recognition', model, {
                    progress_callback: onProgress,
                });
                this.modelLoaded = model;
                break; // Success!
            } catch (err) {
                console.warn(`[WhisperWorker] Failed to load ${model}:`, err);
                lastError = err;
            }
        }

        this.isInstantiating = false;

        if (!p) {
            throw new Error(`Failed to load any Whisper models. Last Error: ${lastError}`);
        }

        this.instance = p;
        return this.instance;
    }
}

self.addEventListener('message', async (event: MessageEvent) => {
    const { audioData, fileId, language = 'arabic', isChunk = false, chunkIndex = 0 } = event.data;

    try {
        const transcribepipeline = await WhisperPipelineFactory.getInstance((progressData: any) => {
            if (progressData.status === 'progress') {
                self.postMessage({
                    type: 'PROGRESS',
                    fileId,
                    progress: progressData.progress,
                    loaded: progressData.loaded,
                    total: progressData.total
                });
            } else if (progressData.status === 'ready') {
                self.postMessage({ type: 'READY', fileId });
            }
        });

        if (!WhisperPipelineFactory.isInstantiating && WhisperPipelineFactory.instance) {
            // Tell UI we are starting transcription if not already communicated during load
            self.postMessage({ type: 'STARTING', fileId, modelType: WhisperPipelineFactory.modelLoaded });
        }



        let previousSegmentText = "";

        const result = await transcribepipeline(audioData, {
            language: "ar",
            task: "transcribe",
            temperature: 0,
            repetition_penalty: 1.3,
            no_repeat_ngram_size: 3,
            condition_on_previous_text: true,
            max_new_tokens: 128,
            chunk_length_s: 30,
            stride_length_s: 5,
            return_timestamps: true,
            chunk_callback: (chunk: TranscriptionSegment) => {
                const rawText = chunk.text;

                if (!rawText || rawText.trim() === "" || rawText.trim() === previousSegmentText.trim()) {
                    console.log(`[Whisper Debug] Discarded: "${rawText}"`);
                    return;
                }

                let cleanedText = rawText.replace(/\b(\S+)(?:\s+\1\b)+/g, '$1');
                cleanedText = cleanedText.replace(/(\b(?:\S+\s+){0,4}\S+\b)(?:[\s,]+\1){3,}/g, '$1');

                console.log(`[Whisper Debug] RAW: "${rawText}" | CLEANED: "${cleanedText}"`);

                if (cleanedText.trim() === "") return;

                previousSegmentText = cleanedText;
                chunk.text = cleanedText;

                self.postMessage({
                    type: 'CHUNK',
                    fileId,
                    text: cleanedText,
                    segment: chunk
                });
            }
        });

        self.postMessage({
            type: 'COMPLETE',
            fileId,
            text: result.text,
            segments: result.chunks
        });

    } catch (e: any) {
        console.error("Whisper Worker Error:", e);
        self.postMessage({ type: 'ERROR', fileId, error: e.message || "Unknown worker error", fatal: true });
    }
});
