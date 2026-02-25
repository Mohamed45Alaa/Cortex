import { useState, useEffect, useRef, useCallback } from 'react';
import { RnnoiseWorkletNode } from '@sapphi-red/web-noise-suppressor';

interface UseAdvancedNoiseSuppressionOptions {
    onPerformanceDrop?: () => void;
}

export const useAdvancedNoiseSuppression = (options?: UseAdvancedNoiseSuppressionOptions) => {
    const [isNoiseCanceling, setIsNoiseCanceling] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Stream and Nodes
    const originalStreamRef = useRef<MediaStream | null>(null);
    const processedStreamRef = useRef<MediaStream | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const rnnoiseNodeRef = useRef<RnnoiseWorkletNode | null>(null);
    const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const destNodeRef = useRef<MediaStreamAudioDestinationNode | null>(null);

    // Spectral Processing Nodes
    const analyserRef = useRef<AnalyserNode | null>(null);
    const spectralFilterRef = useRef<BiquadFilterNode | null>(null);

    // CPU Safety
    const lastPerformanceCheckRef = useRef<number>(0);
    const performanceDropsRef = useRef<number>(0);
    const loopIdRef = useRef<number>(0);

    const checkCpuPerformance = () => {
        const now = performance.now();
        if (lastPerformanceCheckRef.current !== 0) {
            const delta = now - lastPerformanceCheckRef.current;
            // Expected ~16.6ms for 60fps raf. If dropping massively (>100ms), track it.
            if (delta > 100) {
                performanceDropsRef.current += 1;
                if (performanceDropsRef.current > 10) {
                    console.warn('[NoiseSuppression] High CPU load detected. Disabling AI processing.');
                    setIsNoiseCanceling(false);
                    options?.onPerformanceDrop?.();
                    performanceDropsRef.current = 0;
                }
            } else {
                // Recover slowly
                performanceDropsRef.current = Math.max(0, performanceDropsRef.current - 0.1);
            }
        }
        lastPerformanceCheckRef.current = now;
    };

    const spectralSmoothingLoop = useCallback(() => {
        if (!isNoiseCanceling || !analyserRef.current || !spectralFilterRef.current || !audioCtxRef.current) {
            return;
        }

        checkCpuPerformance();

        const analyser = analyserRef.current;
        const filter = spectralFilterRef.current;
        const ctx = audioCtxRef.current;

        const freqData = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(freqData);

        const binWidth = ctx.sampleRate / analyser.fftSize;

        // Target high frequency band where RNNoise metallic artifacts appear (6kHz - 12kHz)
        const startBin = Math.floor(6000 / binWidth);
        const endBin = Math.min(Math.ceil(12000 / binWidth), freqData.length - 1);

        let highFreqEnergy = 0;
        let count = 0;
        for (let i = startBin; i <= endBin; i++) {
            highFreqEnergy += freqData[i];
            count++;
        }
        highFreqEnergy = count > 0 ? highFreqEnergy / count : -100;

        // Dynamic Threshold Detection:
        // If high frequency energy spikes anomalously (e.g. > -50dB threshold, adjust based on testing)
        // apply dynamic gain reduction to the HighShelf filter to smooth it out.
        const now = ctx.currentTime;
        if (highFreqEnergy > -60) {
            // Metallic artifact detected -> Duck highs by up to -15dB
            const reduction = Math.max(-15, -60 - highFreqEnergy);
            // Smooth temporal artifact attack
            filter.gain.setTargetAtTime(reduction, now, 0.01);
        } else {
            // Clean voice, relax suppression
            filter.gain.setTargetAtTime(0, now, 0.05); // Smooth release
        }

        loopIdRef.current = requestAnimationFrame(spectralSmoothingLoop);
    }, [isNoiseCanceling]);

    const initMicrophone = async () => {
        setIsInitializing(true);
        setError(null);
        try {
            // STEP 1: Capture raw microphone without browser interfering
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                    channelCount: 1,
                    sampleRate: 48000 // RNNoise operates optimally at 48kHz
                }
            });
            originalStreamRef.current = stream;

            // STEP 2: Initialize Web Audio API
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContextClass({ sampleRate: 48000 });
            audioCtxRef.current = ctx;

            const source = ctx.createMediaStreamSource(stream);

            // STEP 3: Initialize RNNoise
            const wasmUrl = '/worklets/rnnoise/rnnoise.wasm';
            const workletUrl = '/worklets/rnnoise/workletProcessor.js';
            const [wasmRes] = await Promise.all([
                fetch(wasmUrl),
                ctx.audioWorklet.addModule(workletUrl)
            ]);
            const wasmBinary = await wasmRes.arrayBuffer();

            rnnoiseNodeRef.current = new RnnoiseWorkletNode(ctx, {
                wasmBinary,
                maxChannels: 1
            });

            // STEP 4: Setup Spectral Filter
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 1024;
            analyser.smoothingTimeConstant = 0.5;
            analyserRef.current = analyser;

            const spectralFilter = ctx.createBiquadFilter();
            spectralFilter.type = 'highshelf';
            spectralFilter.frequency.value = 6000; // Target artifact zone
            spectralFilter.gain.value = 0; // Dynamic gain
            spectralFilterRef.current = spectralFilter;

            // STEP 5: Create Destination MediaStream
            const destination = ctx.createMediaStreamDestination();

            // Wire the default clean graph (bypassed)
            source.connect(destination);
            processedStreamRef.current = destination.stream;

        } catch (err) {
            console.error('[AdvancedNoiseSuppression] Setup failed', err);
            setError(err instanceof Error ? err : new Error('Unknown initialization error'));
        } finally {
            setIsInitializing(false);
        }
    };

    // Toggle logic -> Connects/Disconnects the AI graph dynamically
    useEffect(() => {
        if (!audioCtxRef.current || !originalStreamRef.current || !processedStreamRef.current) return;

        const ctx = audioCtxRef.current;

        // Locate or create persistent nodes
        if (!sourceNodeRef.current) {
            sourceNodeRef.current = ctx.createMediaStreamSource(originalStreamRef.current);
        }
        if (!destNodeRef.current) {
            destNodeRef.current = ctx.createMediaStreamDestination();

            // Setup persistent stream reference once
            destNodeRef.current.stream.getAudioTracks().forEach((track: MediaStreamTrack) => {
                processedStreamRef.current?.addTrack(track);
            });
        }

        const source = sourceNodeRef.current;
        const dest = destNodeRef.current;

        // Reset Graph
        source.disconnect();
        if (analyserRef.current) analyserRef.current.disconnect();
        if (spectralFilterRef.current) spectralFilterRef.current.disconnect();
        if (rnnoiseNodeRef.current) rnnoiseNodeRef.current.disconnect();

        if (isNoiseCanceling && rnnoiseNodeRef.current && analyserRef.current && spectralFilterRef.current) {
            // Live AI + Spectral Graph Route
            source.connect(rnnoiseNodeRef.current);
            rnnoiseNodeRef.current.connect(analyserRef.current);
            analyserRef.current.connect(spectralFilterRef.current);
            spectralFilterRef.current.connect(dest);

            // Start adaptive loop
            loopIdRef.current = requestAnimationFrame(spectralSmoothingLoop);
        } else {
            // Bypass
            cancelAnimationFrame(loopIdRef.current);
            if (spectralFilterRef.current) {
                spectralFilterRef.current.gain.value = 0; // Reset
            }
            source.connect(dest);
        }
    }, [isNoiseCanceling, spectralSmoothingLoop]);


    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.altKey && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                setIsNoiseCanceling(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Cleanup
    useEffect(() => {
        return () => {
            cancelAnimationFrame(loopIdRef.current);
            if (originalStreamRef.current) {
                originalStreamRef.current.getTracks().forEach(t => t.stop());
            }
            if (audioCtxRef.current) {
                audioCtxRef.current.close();
            }
        };
    }, []);

    return {
        isNoiseCanceling,
        setIsNoiseCanceling,
        isInitializing,
        error,
        originalStream: originalStreamRef.current,
        processedStream: processedStreamRef.current,
        initMicrophone
    };
};
