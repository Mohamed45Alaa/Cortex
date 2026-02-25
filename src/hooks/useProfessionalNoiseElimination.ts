import { useState, useEffect, useRef } from 'react';

export const useProfessionalNoiseElimination = (intensity: number = 100) => {
    const [isNoiseCanceling, setIsNoiseCanceling] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Audio Graph Nodes
    const audioCtxRef = useRef<AudioContext | null>(null);
    const originalStreamRef = useRef<MediaStream | null>(null);
    const processedStreamRef = useRef<MediaStream | null>(null);

    // Persistent Graph References
    const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const destNodeRef = useRef<MediaStreamAudioDestinationNode | null>(null);
    const bypassGainRef = useRef<GainNode | null>(null);

    // DSP Nodes (The 8 Stages)
    const stage1HighPass1Ref = useRef<BiquadFilterNode | null>(null); // Subsonic 1
    const stage1HighPass2Ref = useRef<BiquadFilterNode | null>(null); // Subsonic 2
    const stage1HighPass3Ref = useRef<BiquadFilterNode | null>(null); // Subsonic 3 (Total 36dB/oct @ 100Hz)
    const stage1LowPassRef = useRef<BiquadFilterNode | null>(null); // 15kHz 12dB/oct
    const stage3SpectralWorkletRef = useRef<AudioWorkletNode | null>(null); // Core STFT Engine

    const stage6PresenceEQ1Ref = useRef<BiquadFilterNode | null>(null); // Presence 3kHz
    const stage6PresenceEQ2Ref = useRef<BiquadFilterNode | null>(null); // Presence 4.5kHz
    const stage6PresenceEQ3Ref = useRef<BiquadFilterNode | null>(null); // Cut 250Hz

    const stage7CompressorRef = useRef<DynamicsCompressorNode | null>(null); // Dynamics
    const stage7MakeupRef = useRef<GainNode | null>(null); // Dynamics Makeup
    const stage8LimiterRef = useRef<DynamicsCompressorNode | null>(null); // Ceiling

    const initMicrophone = async () => {
        setIsInitializing(true);
        setError(null);
        try {
            // STAGE 1: Input Normalization (Browser Level)
            // Grab pure raw unadulterated audio from hardware
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                    channelCount: 1,
                    sampleRate: 48000 // Force 48kHz processing rate
                }
            });
            originalStreamRef.current = stream;

            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContextClass({ sampleRate: 48000 });
            audioCtxRef.current = ctx;

            // Load Custom Core Engine DSP Worklet (Stages 3-5)
            await ctx.audioWorklet.addModule('/worklets/dsp/spectralProcessor.js');

            sourceNodeRef.current = ctx.createMediaStreamSource(stream);
            destNodeRef.current = ctx.createMediaStreamDestination();

            // Wire bypass graph initially
            sourceNodeRef.current.connect(destNodeRef.current);
            processedStreamRef.current = destNodeRef.current.stream;

        } catch (err) {
            console.error('[ProfessionalDSP] Setup failed', err);
            setError(err instanceof Error ? err : new Error('Unknown initialization error'));
        } finally {
            setIsInitializing(false);
        }
    };

    // Construct the 8-Stage DSP Graph
    const buildGraphNodes = (ctx: AudioContext) => {
        // STAGE 1: Pre-clean Filtering (100Hz 36dB/oct HPF, 15kHz 12dB/oct LPF)
        if (!stage1HighPass1Ref.current) {
            const hp1 = ctx.createBiquadFilter(); hp1.type = 'highpass'; hp1.frequency.value = 100; hp1.Q.value = 0.541;
            const hp2 = ctx.createBiquadFilter(); hp2.type = 'highpass'; hp2.frequency.value = 100; hp2.Q.value = 1.306;
            const hp3 = ctx.createBiquadFilter(); hp3.type = 'highpass'; hp3.frequency.value = 100; hp3.Q.value = 0.5; // Final cascade for 36dB
            stage1HighPass1Ref.current = hp1;
            stage1HighPass2Ref.current = hp2;
            stage1HighPass3Ref.current = hp3;

            const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 15000; lp.Q.value = 0.707;
            stage1LowPassRef.current = lp;
        }

        // STAGE 2-5: Core STFT Balanced Nuclear Engine (Worklet)
        if (!stage3SpectralWorkletRef.current) {
            stage3SpectralWorkletRef.current = new AudioWorkletNode(ctx, 'spectral-processor');
            stage3SpectralWorkletRef.current.port.postMessage({ type: 'SET_REDUCTION', value: intensity });
        }

        // STAGE 6: Presence EQ (+4dB @ 3kHz, +3dB @ 4.5kHz, -2dB @ 250Hz)
        if (!stage6PresenceEQ1Ref.current) {
            const eq1 = ctx.createBiquadFilter(); eq1.type = 'peaking'; eq1.frequency.value = 3000; eq1.Q.value = 1.0; eq1.gain.value = 4.0;
            const eq2 = ctx.createBiquadFilter(); eq2.type = 'peaking'; eq2.frequency.value = 4500; eq2.Q.value = 1.0; eq2.gain.value = 3.0;
            const eq3 = ctx.createBiquadFilter(); eq3.type = 'peaking'; eq3.frequency.value = 250; eq3.Q.value = 0.8; eq3.gain.value = -2.0;

            stage6PresenceEQ1Ref.current = eq1;
            stage6PresenceEQ2Ref.current = eq2;
            stage6PresenceEQ3Ref.current = eq3;
        }

        // STAGE 7: Clean Compression (Ratio 2.8:1, Thresh -19dB, Attack 12ms, Rel 85ms)
        if (!stage7CompressorRef.current) {
            const comp = ctx.createDynamicsCompressor();
            comp.ratio.value = 2.8;
            comp.threshold.value = -19;
            comp.attack.value = 0.012; // 12ms
            comp.release.value = 0.085; // 85ms
            comp.knee.value = 5.0; // Soft knee
            stage7CompressorRef.current = comp;

            const makeup = ctx.createGain();
            const makeupDb = 1 + (intensity / 100) * 4; // 1dB at 0%, 5dB at 100%
            makeup.gain.value = Math.pow(10, makeupDb / 20);
            stage7MakeupRef.current = makeup;
        }

        // STAGE 8: Safe Limiter (Ceiling -1dB, Ratio 20:1, Attack 1ms, Rel 100ms)
        if (!stage8LimiterRef.current) {
            const lim = ctx.createDynamicsCompressor();
            lim.ratio.value = 20.0;
            lim.threshold.value = -1.0;
            lim.attack.value = 0.001;
            lim.release.value = 0.100;
            lim.knee.value = 0.0;
            stage8LimiterRef.current = lim;
        }
    };

    // Toggle Active/Bypass States
    useEffect(() => {
        if (!audioCtxRef.current || !sourceNodeRef.current || !destNodeRef.current) return;

        const ctx = audioCtxRef.current;
        const source = sourceNodeRef.current;
        const dest = destNodeRef.current;

        // Disconnect everything
        source.disconnect();
        stage1HighPass1Ref.current?.disconnect();
        stage1HighPass2Ref.current?.disconnect();
        stage1HighPass3Ref.current?.disconnect();
        stage1LowPassRef.current?.disconnect();
        stage3SpectralWorkletRef.current?.disconnect();
        stage6PresenceEQ1Ref.current?.disconnect();
        stage6PresenceEQ2Ref.current?.disconnect();
        stage6PresenceEQ3Ref.current?.disconnect();
        stage7CompressorRef.current?.disconnect();
        stage7MakeupRef.current?.disconnect();
        stage8LimiterRef.current?.disconnect();

        if (isNoiseCanceling) {
            buildGraphNodes(ctx);

            // Route 8-Stage Balanced Nuclear Graph
            let currentPath: AudioNode = source;

            if (stage1HighPass1Ref.current) { currentPath.connect(stage1HighPass1Ref.current); currentPath = stage1HighPass1Ref.current; }
            if (stage1HighPass2Ref.current) { currentPath.connect(stage1HighPass2Ref.current); currentPath = stage1HighPass2Ref.current; }
            if (stage1HighPass3Ref.current) { currentPath.connect(stage1HighPass3Ref.current); currentPath = stage1HighPass3Ref.current; }
            if (stage1LowPassRef.current) { currentPath.connect(stage1LowPassRef.current); currentPath = stage1LowPassRef.current; }

            if (stage3SpectralWorkletRef.current) { currentPath.connect(stage3SpectralWorkletRef.current); currentPath = stage3SpectralWorkletRef.current; }

            if (stage6PresenceEQ1Ref.current) { currentPath.connect(stage6PresenceEQ1Ref.current); currentPath = stage6PresenceEQ1Ref.current; }
            if (stage6PresenceEQ2Ref.current) { currentPath.connect(stage6PresenceEQ2Ref.current); currentPath = stage6PresenceEQ2Ref.current; }
            if (stage6PresenceEQ3Ref.current) { currentPath.connect(stage6PresenceEQ3Ref.current); currentPath = stage6PresenceEQ3Ref.current; }

            if (stage7CompressorRef.current) { currentPath.connect(stage7CompressorRef.current); currentPath = stage7CompressorRef.current; }
            if (stage7MakeupRef.current) { currentPath.connect(stage7MakeupRef.current); currentPath = stage7MakeupRef.current; }

            if (stage8LimiterRef.current) { currentPath.connect(stage8LimiterRef.current); currentPath = stage8LimiterRef.current; }

            currentPath.connect(dest);
        } else {
            // Raw Bypass
            source.connect(dest);
        }

        // Output stream maintains identity
        processedStreamRef.current?.getAudioTracks().forEach((track: MediaStreamTrack) => {
            processedStreamRef.current?.removeTrack(track);
        });
        dest.stream.getAudioTracks().forEach((track: MediaStreamTrack) => {
            processedStreamRef.current?.addTrack(track);
        });

    }, [isNoiseCanceling]);

    // Dynamic Intensity Updates (No Graph Rebuilds)
    useEffect(() => {
        if (!isNoiseCanceling) return;

        // Update Worklet Engine
        if (stage3SpectralWorkletRef.current) {
            stage3SpectralWorkletRef.current.port.postMessage({ type: 'SET_REDUCTION', value: intensity });
        }

        // Update Compressor Makeup Gain dynamically
        if (stage7MakeupRef.current && audioCtxRef.current) {
            const makeupDb = 1 + (intensity / 100) * 4; // 1dB to 5dB
            const linearGain = Math.pow(10, makeupDb / 20);
            stage7MakeupRef.current.gain.setTargetAtTime(linearGain, audioCtxRef.current.currentTime, 0.1);
        }
    }, [intensity, isNoiseCanceling]);

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

    // Memory Cleanup
    useEffect(() => {
        return () => {
            if (originalStreamRef.current) originalStreamRef.current.getTracks().forEach(t => t.stop());
            if (audioCtxRef.current) audioCtxRef.current.close();
        };
    }, []);

    return {
        isNoiseCanceling,
        setIsNoiseCanceling,
        isInitializing,
        error,
        processedStream: processedStreamRef.current,
        initMicrophone
    };
};
