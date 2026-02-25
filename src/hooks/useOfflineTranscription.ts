import { useState, useEffect, useRef, useCallback } from 'react';
import { TranscriptionSegment, TranscriptionMessage } from '@/core/workers/whisper.worker';
import { getCachedTranscript, cacheTranscript, generateVideoHash } from '@/core/cache/transcriptCache';
import { extractAudioSafely } from '@/core/audio/audioExtractor';

interface UseOfflineTranscriptionResult {
    startTranscription: (file: File) => Promise<void>;
    segments: TranscriptionSegment[];
    currentText: string;
    isProcessing: boolean;
    progress: number;
    loadingModel: boolean;
    error: string | null;
    activeModel: string;
    // --- Phase 4 additions: Background & ETA ---
    etaSeconds: number | null;
    processedChunks: number;
    totalChunks: number;
    isBackground: boolean;
}

// --- PHASE 1 & 4: WORKER ISOLATION & FAST REFRESH GUARD ---
let globalWhisperWorker: Worker | null = null;
let currentMessageResolve: ((val: any) => void) | null = null;
let currentMessageReject: ((err: any) => void) | null = null;
let progressCallback: ((msg: any) => void) | null = null;

// @ts-ignore
if (import.meta.hot) {
    // @ts-ignore
    import.meta.hot.accept(() => {
        console.warn("Hot reload detected — preserving Worker instance");
    });
}

const getWhisperWorker = () => {
    if (!globalWhisperWorker) {
        console.log("[Offline STT] Worker initialized once");
        globalWhisperWorker = new Worker(new URL('@/core/workers/whisper.worker.ts', import.meta.url), { type: 'module' });

        globalWhisperWorker.onmessage = (e: MessageEvent) => {
            const msg = e.data;
            if (msg.type === 'PROGRESS' || msg.type === 'STARTING' || msg.type === 'READY' || msg.type === 'CHUNK') {
                if (progressCallback) progressCallback(msg);
            } else if (msg.type === 'COMPLETE') {
                if (currentMessageResolve) currentMessageResolve(msg);
            } else if (msg.type === 'ERROR') {
                if (currentMessageReject) currentMessageReject(new Error(msg.error));
            }
        };

        globalWhisperWorker.onerror = (err) => {
            console.error("[Offline STT] Worker fatal crash detected:", err);
            if (currentMessageReject) currentMessageReject(new Error("Worker crashed unexpectedly"));
            globalWhisperWorker = null; // Force recreate on next call
        };
    }
    return globalWhisperWorker;
};

// Promise wrapper for strictly await-able chunks with timeout
const processChunkAsync = async (
    chunkPayload: any,
    onProgress: (msg: any) => void,
    timeoutMs: number = 30000,
    killOnTimeout: boolean = false
): Promise<any> => {
    const worker = getWhisperWorker();
    return new Promise((resolve, reject) => {
        progressCallback = onProgress;
        currentMessageResolve = resolve;
        currentMessageReject = reject;

        const timeout = setTimeout(() => {
            currentMessageReject && currentMessageReject(new Error("Worker chunk processing timed out"));
            if (killOnTimeout && globalWhisperWorker) {
                console.warn("[Offline STT] Killing unresponsive worker...");
                globalWhisperWorker.terminate();
                globalWhisperWorker = null;
            }
        }, timeoutMs);

        // Intercept resolve/reject to clear timeout
        const originalResolve = currentMessageResolve;
        const originalReject = currentMessageReject;

        currentMessageResolve = (val) => {
            clearTimeout(timeout);
            originalResolve(val);
        };
        currentMessageReject = (err) => {
            clearTimeout(timeout);
            originalReject(err);
        };

        worker.postMessage(chunkPayload, chunkPayload.audioData ? [chunkPayload.audioData.buffer] : []);
    });
};

export const useOfflineTranscription = (): UseOfflineTranscriptionResult => {
    const [segments, setSegments] = useState<TranscriptionSegment[]>([]);
    const [currentText, setCurrentText] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loadingModel, setLoadingModel] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeModel, setActiveModel] = useState<string>('');

    // --- Phase 4 additions: Background & ETA ---
    const [etaSeconds, setEtaSeconds] = useState<number | null>(null);
    const [processedChunks, setProcessedChunks] = useState<number>(0);
    const [totalChunksState, setTotalChunksState] = useState<number>(0);
    const [isBackground, setIsBackground] = useState<boolean>(false);

    const activeFileHashRef = useRef<string | null>(null);
    const isComponentMounted = useRef(true);

    useEffect(() => {
        isComponentMounted.current = true;
        return () => {
            isComponentMounted.current = false;
        };
        // DO NOT terminate worker on unmount! (PHASE 2)
    }, []);

    const startTranscription = useCallback(async (file: File) => {
        if (isProcessing) return; // Prevent concurrent identical requests

        try {
            setError(null);
            setSegments([]);
            setCurrentText('');
            setIsProcessing(true);
            setLoadingModel(true);

            // 1. Generate robust hash based on filename and size
            const fileHash = await generateVideoHash(file);
            activeFileHashRef.current = fileHash;

            // 2. Check IndexedDB cache perfectly
            let cached = await getCachedTranscript(fileHash);

            // --- Phase 4: Resume Capability ---
            // We'll treat partial cache as a starting point.
            // If the transcript ends with a complete marker (not strictly implemented yet in cache schema), 
            // we could skip entirely, but we'll assume any cache is at least partial progress.
            if (cached && cached.length > 0 && activeFileHashRef.current === fileHash) {
                // If it looks like a fully complete video (let's say we have a segment near the end? 
                // We'll let the user restart if they want, but here we just restore what we have so far)
                setSegments(cached);
                console.log(`[Offline STT] Restored ${cached.length} segments from cache instantly:`, fileHash);
                // We don't exit early, we let the extraction happen so we can calculate how many chunks remain.
                // We will skip chunks that are already transcribed based on the last segment timestamp!
            }

            // 3. Extract Audio safely with timeout and RAM bounds
            console.log("[Offline STT] Extracting audio for processing...");
            const audioData = await extractAudioSafely(file, {
                targetSampleRate: 16000,
                timeoutMs: 120000 // Allow up to 2 minutes for very large local file decoding
            });

            if (activeFileHashRef.current !== fileHash) return; // User switched video during extraction

            console.log("[Offline STT] Audio extracted. Dispatching to Web Worker.");

            // --- PHASE 3 & 4: STRICT CHUNK LOOP & BACKGROUND PROCESSING ---
            setIsBackground(true);
            const CHUNK_SIZE = 160000; // 10 seconds at 16000Hz (User Requested)
            const totalSamples = audioData.length;
            const totalChunks = Math.ceil(totalSamples / CHUNK_SIZE);
            console.log(`[Offline STT] Total samples: ${totalSamples}`);
            console.log(`[Offline STT] Total chunks: ${totalChunks}`);

            if (isComponentMounted.current) {
                setTotalChunksState(totalChunks);
            }

            let accumulatedSegments: TranscriptionSegment[] = cached || [];
            let accumulatedText = '';
            let executionTimesMs: number[] = [];

            // Find starting chunk based on cache
            let startingChunkIndex = 0;
            if (accumulatedSegments.length > 0) {
                const lastSegment = accumulatedSegments[accumulatedSegments.length - 1];
                // The chunk index corresponds to 10 second windows: 0-10s -> chunk 0, 10-20s -> chunk 1
                startingChunkIndex = Math.floor(lastSegment.end / 10);
                if (startingChunkIndex >= totalChunks) {
                    console.log("[Offline STT] Cache covers entire audio. Skipping rewrite.");
                    setIsProcessing(false);
                    setLoadingModel(false);
                    setIsBackground(false);
                    return;
                }
                console.log(`[Offline STT] Resuming transcription from chunk ${startingChunkIndex + 1}/${totalChunks} based on cache.`);
                if (isComponentMounted.current) {
                    setProcessedChunks(startingChunkIndex);
                    setProgress(Math.round((startingChunkIndex / totalChunks) * 100));
                }
            }

            const onWorkerProgress = (msg: any) => {
                if (!isComponentMounted.current || msg.fileId !== activeFileHashRef.current) return;

                if (msg.type === 'STARTING') {
                    setLoadingModel(true);
                    setActiveModel(msg.modelType || 'Xenova/whisper-base');
                } else if (msg.type === 'PROGRESS') {
                    if (msg.total > 10_000_000) {
                        setProgress(Math.round(msg.progress));
                        setLoadingModel(true);
                    }
                } else if (msg.type === 'READY') {
                    setLoadingModel(false);
                    setProgress(100);
                } else if (msg.type === 'CHUNK') {
                    // Ignore dummy test chunks in UI rendering
                    if (msg.text && !msg.text.includes('[DUMMY TEST RESULT')) {
                        setCurrentText(msg.text);
                    }
                }
            };

            // --- USER REQUESTED: WARM-UP INFERENCE ---
            console.log("[Offline STT] Sending 1-second warm-up inference...");
            try {
                const dummyAudio = new Float32Array(16000); // 1 sec at 16kHz
                await processChunkAsync({
                    audioData: dummyAudio,
                    fileId: 'dummy-warmup', // ensures UI ignores it based on activeFileHashRef
                    language: 'arabic',
                    isChunk: true,
                    chunkIndex: -1,
                    offsetSeconds: 0
                }, onWorkerProgress, 120000, true);
                console.log("[Offline STT] Warm-up inference complete.");
            } catch (warmupErr) {
                console.warn("[Offline STT] Warm-up inference failed or timed out, proceeding anyway:", warmupErr);
            }
            // -----------------------------------------

            for (let i = startingChunkIndex * CHUNK_SIZE; i < totalSamples; i += CHUNK_SIZE) {
                // If user changed file in *this* component instance, break. 
                // (Note: Since worker is global, closing the component entirely *won't* 
                // cancel the Promise loop unless we specifically implement a global abort controller. 
                // But for now, if the hook is unmounted, we continue in background but stop updating UI)
                if (activeFileHashRef.current !== fileHash && isComponentMounted.current) {
                    console.log("[Offline STT] Transcription aborted by user switching files");
                    break;
                }

                const chunkIndex = Math.floor(i / CHUNK_SIZE);
                let chunk = audioData.slice(i, i + CHUNK_SIZE);

                console.log(`[Offline STT] Processing chunk ${chunkIndex + 1}/${totalChunks}`);
                const offsetSeconds = chunkIndex * 10; // 10 seconds per chunk

                let succeeded = false;
                let retries = 0;
                let currentTimeout = chunkIndex === 0 ? 120000 : 60000;

                while (!succeeded && retries < 2) {
                    try {
                        console.log(`[Offline STT] Inference started for chunk ${chunkIndex + 1} with timeout ${currentTimeout}ms`);
                        const startTime = performance.now();

                        const msgPayload = {
                            audioData: chunk,
                            fileId: fileHash,
                            language: 'arabic',
                            isChunk: true,
                            chunkIndex,
                            offsetSeconds
                        };

                        const killOnFail = retries === 1; // Only kill the worker if this is our final retry
                        const result = await processChunkAsync(msgPayload, onWorkerProgress, currentTimeout, killOnFail);

                        const durationMs = performance.now() - startTime;
                        console.log(`[Offline STT] Chunk inference time: ${Math.round(durationMs)} ms`);

                        // --- Phase 4 ETA Logic ---
                        executionTimesMs.push(durationMs);
                        if (executionTimesMs.length > 5) executionTimesMs.shift();

                        const avgDurationMs = executionTimesMs.reduce((a, b) => a + b, 0) / executionTimesMs.length;
                        const chunksRemaining = totalChunks - (chunkIndex + 1);
                        const estimatedSecondsRemaining = Math.round((avgDurationMs * chunksRemaining) / 1000);

                        // Append text to accumulated transcript
                        if (result.text && result.text.trim()) {
                            accumulatedText += (accumulatedText ? ' ' : '') + result.text.trim();
                        }

                        // Apply offset to segments and append
                        if (result.segments && Array.isArray(result.segments)) {
                            const offsetSegments = result.segments.map((seg: any) => ({
                                ...seg,
                                start: seg.start + offsetSeconds,
                                end: seg.end + offsetSeconds,
                                // Need to assign unique ID based on existing length since worker 
                                // resets segment IDs per chunk
                                id: accumulatedSegments.length + seg.id
                            }));
                            accumulatedSegments.push(...offsetSegments);
                        }

                        // --- Phase 4 Progressive Persistence & UI ---
                        // Update UI incrementally immediately
                        if (isComponentMounted.current && activeFileHashRef.current === fileHash) {
                            setSegments([...accumulatedSegments]);
                            setCurrentText('');
                            setProcessedChunks(chunkIndex + 1);
                            setProgress(Math.round(((chunkIndex + 1) / totalChunks) * 100));
                            setEtaSeconds(estimatedSecondsRemaining);
                        }

                        // Incrementally save to cache after every chunk so we never lose progress
                        cacheTranscript(fileHash, accumulatedSegments);

                        succeeded = true;

                    } catch (chunkErr: any) {
                        console.error(`[Offline STT] Worker timeout/crash on chunk ${chunkIndex + 1} (Attempt ${retries + 1}):`, chunkErr);
                        retries++;
                        if (retries < 2) {
                            currentTimeout *= 2;
                            console.log(`[Offline STT] Retrying chunk ${chunkIndex + 1} with doubled timeout (${currentTimeout}ms)...`);
                            // We need to recreate the `chunk` since postMessage with transfer might have cleared the buffer
                            chunk = audioData.slice(i, i + CHUNK_SIZE);
                        } else {
                            throw new Error(`Failed to process chunk ${chunkIndex + 1} after retries.`);
                        }
                    }
                }

                // Free memory for this chunk before next iteration
                chunk = null as any;
            }

            if (activeFileHashRef.current === fileHash && isComponentMounted.current) {
                console.log("[Offline STT] Full transcription complete.");
                // Ensure complete text UI refresh
                setSegments([...accumulatedSegments]);
                setCurrentText('');
                setIsProcessing(false);
                setLoadingModel(false);
                setIsBackground(false);
                setEtaSeconds(null);
            }
            // Final guarantee save
            cacheTranscript(fileHash, accumulatedSegments);

        } catch (err: any) {
            console.error("[Offline STT Extraction Error]:", err);
            if (isComponentMounted.current) {
                setError(err.message || "Failed to initialize audio extraction.");
                setIsProcessing(false);
                setLoadingModel(false);
            }
        }
    }, [isProcessing]);

    return {
        startTranscription,
        segments,
        currentText,
        isProcessing,
        progress,
        loadingModel,
        error,
        activeModel,
        etaSeconds,
        processedChunks,
        totalChunks: totalChunksState,
        isBackground
    };
};
