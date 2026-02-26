import React, { useState, useRef, useEffect } from 'react';
import {
    Play, Pause, Volume2, VolumeX, Volume1, Maximize, Settings,
    MonitorSmartphone, Zap, Sliders, AlertCircle, Youtube, X, Info, Shield, Check, FileText,
    Upload, Trash2, FileVideo, RotateCcw, RotateCw, Mic2, Headphones
} from 'lucide-react';
import { useStore } from '@/store/useStore';
// import { FocusEngine } from '@/core/metrics/FocusEngine'; // Doesn't exist
import { useProfessionalNoiseElimination } from '@/hooks/useProfessionalNoiseElimination';

// [NEW] Offline Transcription
import { useOfflineTranscription } from '@/hooks/useOfflineTranscription';
import { LiveTranscriptViewer } from '@/components/tools/LiveTranscriptViewer';
import { SubtitleOverlay } from '@/components/tools/SubtitleOverlay';

interface PremiumVideoPlayerProps {
    isOpen?: boolean;
    onClose?: () => void;
}

type SourceType = 'local' | 'youtube';
type QualityOption = 'auto' | '1080p' | '720p' | '480p' | '360p' | '240p';

export const PremiumVideoPlayer: React.FC<PremiumVideoPlayerProps> = ({ isOpen, onClose }) => {
    // Store Integration for Segment Tracking
    const { setActiveTool, setMediaPlaying, uiState, setPlayerState } = useStore();
    const savedState = uiState.playerState;

    // Source Management
    const [sourceType, setSourceType] = useState<SourceType>('local');
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileObject, setFileObject] = useState<File | null>(null);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [youtubeId, setYoutubeId] = useState<string | null>(null);

    // ── RECORDER INTEGRATION: pending lecture from مسجل الصوت picker ───────────
    // When student picks a lecture in the RECORDER overlay, the lectureId+title
    // are stored in sessionStorage. PremiumVideoPlayer reads it on mount.
    const [pendingLecture, setPendingLecture] = useState<{ lectureId: string; lectureTitle: string } | null>(null);


    // Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const volume = useStore(state => state.uiState.playerState.volume) ?? 1.0;
    const isMuted = useStore(state => state.uiState.playerState.isMuted) ?? false;
    const isKeepAlive = useStore(state => state.uiState.playerState.isKeepAlive) ?? false;
    // --- CC State Access ---
    const ccEnabled = useStore(state => state.uiState.playerState.ccEnabled) ?? false;
    const ccFontSize = useStore(state => state.uiState.playerState.ccFontSize) ?? '18px';
    const ccTextColor = useStore(state => state.uiState.playerState.ccTextColor) ?? '#ffffff';
    const ccBgOpacity = useStore(state => state.uiState.playerState.ccBgOpacity) ?? 0.7;
    const ccHasShadow = useStore(state => state.uiState.playerState.ccHasShadow) ?? true;

    const [buffered, setBuffered] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [isSmartEnhance, setIsSmartEnhance] = useState(false);
    const [isNoiseCanceling, setIsNoiseCanceling] = useState(false); // [NEW] Noise Gate
    const [noiseReductionLevel, setNoiseReductionLevel] = useState(100); // [V5] 0-100 Intensity
    const [showNoiseSlider, setShowNoiseSlider] = useState(false); // [V5] Slider UI toggle
    type EnhanceStatus = 'idle' | 'analyzing' | 'speech' | 'noise' | 'clean';
    const [enhanceStatus, setEnhanceStatus] = useState<EnhanceStatus>('idle');

    // UI State
    const [showQualityMenu, setShowQualityMenu] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [showCCMenu, setShowCCMenu] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState<QualityOption>('auto');

    // Refs
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const audioRecordRef = useRef<HTMLInputElement>(null);
    const videoRecordRef = useRef<HTMLInputElement>(null);
    const [showUploadMenu, setShowUploadMenu] = useState(false);
    const lastTimeRef = useRef(0); // Track time for restoration

    // Web Audio API refs
    const audioCtxRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    // Cortex Adaptive Engine refs
    const analyserRef = useRef<AnalyserNode | null>(null);
    const analysisTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const noiseFloorRef = useRef<number>(-60);
    const quietFramesRef = useRef<number[]>([]);
    const adaptiveHighPassRef = useRef<BiquadFilterNode | null>(null);
    const adaptiveLowPassRef = useRef<BiquadFilterNode | null>(null);
    const adaptivePresenceRef = useRef<BiquadFilterNode | null>(null);
    const adaptiveGateGainRef = useRef<GainNode | null>(null);
    const adaptiveCompRef = useRef<DynamicsCompressorNode | null>(null);
    const adaptiveMasterGainRef = useRef<GainNode | null>(null);

    // V6 Nuclear DSP Nodes
    const stage1HighPass1Ref = useRef<BiquadFilterNode | null>(null); // Subsonic 1
    const stage1HighPass2Ref = useRef<BiquadFilterNode | null>(null); // Subsonic 2
    const stage1HighPass3Ref = useRef<BiquadFilterNode | null>(null); // Subsonic 3
    const stage1LowPassRef = useRef<BiquadFilterNode | null>(null); // 15kHz 12dB/oct

    const stage3SpectralWorkletRef = useRef<AudioWorkletNode | null>(null); // V6 Core STFT Engine

    const stage6PresenceEQ1Ref = useRef<BiquadFilterNode | null>(null); // V6 Presence 3kHz
    const stage6PresenceEQ2Ref = useRef<BiquadFilterNode | null>(null); // V6 Presence 4.5kHz
    const stage6PresenceEQ3Ref = useRef<BiquadFilterNode | null>(null); // V6 Cut 250Hz

    const stage7CompressorRef = useRef<DynamicsCompressorNode | null>(null); // V6 Dynamics
    const stage7MakeupRef = useRef<GainNode | null>(null); // V6 Makeup

    const adaptiveLimiterRef = useRef<DynamicsCompressorNode | null>(null); // cached – never recreated
    const statusHoldRef = useRef<{ status: EnhanceStatus; count: number }>({ status: 'analyzing', count: 0 });
    const keepAliveOscRef = useRef<OscillatorNode | null>(null); // [NEW]

    const [showCcFutureToast, setShowCcFutureToast] = useState(false); // [NEW] feature toast

    // [NEW] Transcription Integration
    const {
        startTranscription,
        segments,
        currentText,
        isProcessing: isTranscribing,
        progress: sttProgress,
        loadingModel: sttLoading,
        error: sttError,
        activeModel: sttActiveModel,
        etaSeconds,
        processedChunks,
        totalChunks: sttTotalChunks,
        isBackground
    } = useOfflineTranscription();

    // [PERSISTENCE] Restore State on Mount
    useEffect(() => {
        if (savedState.sourceType) setSourceType(savedState.sourceType);
        // [FIX] Restore blob URLs here. Safe because useStore `partialize` explicitly drops fileUrl & fileName from localStorage.
        // If they exist in state, it means they are in-memory from the SAME session (e.g. switching tools).
        if (savedState.fileUrl) {
            setFileUrl(savedState.fileUrl);
            if (savedState.fileName) setFileName(savedState.fileName);
        }
        if (savedState.youtubeId) setYoutubeId(savedState.youtubeId);
        // Volume and isMuted are now directly from store, no need to set here
        // if (savedState.volume !== undefined) setVolume(savedState.volume);
        // if (savedState.isMuted !== undefined) setIsMuted(savedState.isMuted);
        if (savedState.isKeepAlive !== undefined) setPlayerState({ isKeepAlive: savedState.isKeepAlive });


        if (savedState.currentTime > 0) {
            setCurrentTime(savedState.currentTime);
            lastTimeRef.current = savedState.currentTime; // Crucial for auto-seek
        }
    }, []); // Run once on mount

    // Read pending lecture from sessionStorage (set by RECORDER overlay)
    useEffect(() => {
        const raw = sessionStorage.getItem('pendingPlayerLecture');
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                setPendingLecture(parsed);
                sessionStorage.removeItem('pendingPlayerLecture');
            } catch { }
        }
    }, []);

    // Format ETA Helper
    const formatEta = (seconds: number | null | undefined) => {
        if (seconds === null || seconds === undefined) return null;
        if (seconds < 60) return `${Math.ceil(seconds)}s`;
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // [NEW] Auto-Start Transcription on File Selection
    useEffect(() => {
        if (fileObject && sourceType === 'local') {
            // startTranscription(fileObject).catch(console.error); // Disabled temporarily per user request
        }
    }, [fileObject, sourceType, startTranscription]);

    // [NEW] Audio Keep-Alive Logic
    const stopKeepAlive = () => {
        if (keepAliveOscRef.current) {
            try {
                keepAliveOscRef.current.stop();
                keepAliveOscRef.current.disconnect();
            } catch (e) { }
            keepAliveOscRef.current = null;
            console.log("[Audio] Headphone Keeper Stopped");
        }
    };

    const ensureKeepAlive = (ctx: AudioContext) => {
        if (!isKeepAlive) {
            stopKeepAlive();
            return;
        }

        if (keepAliveOscRef.current) return;

        try {
            // Create silent oscillator (20Hz, inaudible but active)
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.value = 20; // 20Hz (Higher visibility for DAC than 1Hz)
            gain.gain.value = 0.000001; // Micro-gain to keep DAC active only

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();

            keepAliveOscRef.current = osc;
            console.log("[Audio] Headphone Keeper Started on context:", ctx.state);
        } catch (e) {
            console.error("Failed to start keep-alive", e);
        }
    };

    // [EFFECT] Synch Keeper with Global State
    useEffect(() => {
        if (isKeepAlive && audioCtxRef.current) {
            ensureKeepAlive(audioCtxRef.current);
        } else if (!isKeepAlive) {
            stopKeepAlive();
        }
    }, [isKeepAlive, audioCtxRef.current]); // Re-run if audioCtxRef.current changes

    // [V6] Sync Noise Reduction Level with Worklet & Makeup Gain
    useEffect(() => {
        if (stage3SpectralWorkletRef.current) {
            stage3SpectralWorkletRef.current.port.postMessage({
                type: 'SET_REDUCTION',
                value: noiseReductionLevel
            });
        }
        if (stage7MakeupRef.current && audioCtxRef.current) {
            const makeupDb = 1 + (noiseReductionLevel / 100) * 4; // 1dB to 5dB
            const linearGain = Math.pow(10, makeupDb / 20);
            stage7MakeupRef.current.gain.setTargetAtTime(linearGain, audioCtxRef.current.currentTime, 0.1);
        }
    }, [noiseReductionLevel, isNoiseCanceling]);

    // [PERSISTENCE] Sync State Changes (Low Frequency)
    useEffect(() => {
        setPlayerState({
            sourceType,
            fileUrl,
            fileName,
            youtubeId,
            volume,
            isMuted,
            isKeepAlive
        });
    }, [sourceType, fileUrl, fileName, youtubeId, volume, isMuted, isKeepAlive, setPlayerState]);

    // Extract YouTube video ID
    const extractYouTubeId = (url: string): string | null => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match?.[1] || null;
    };

    // ============================================================
    // CORTEX ADAPTIVE AUDIO ENGINE
    // ============================================================
    // IMPORTANT: A <video> element can only be passed to createMediaElementSource ONCE
    // for its entire lifetime. We must NEVER close and recreate the AudioContext.
    // On toggle: disconnect/reconnect within the existing live context.

    const initAdaptiveEngine = (mediaElement: HTMLVideoElement) => {
        const ctx = audioCtxRef.current;

        // ── First-time bootstrap: create context + source only once ──
        if (!ctx || !sourceNodeRef.current) {
            try {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                const newCtx = audioCtxRef.current ?? new AudioContextClass();
                audioCtxRef.current = newCtx;

                // Guard: only call createMediaElementSource if source doesn't exist yet
                if (!sourceNodeRef.current) {
                    const source = newCtx.createMediaElementSource(mediaElement);
                    sourceNodeRef.current = source;
                }

                // Main volume gain
                if (!gainNodeRef.current) {
                    const gainNode = newCtx.createGain();
                    gainNode.gain.value = volume;
                    gainNodeRef.current = gainNode;
                }

                if (isKeepAlive) ensureKeepAlive(newCtx);

                // Asynchronously load the V5 Custom Noise Elimination DSP Core
                newCtx.audioWorklet.addModule('/worklets/dsp/spectralProcessor.js')
                    .then(() => {
                        console.log("[Cortex] V5 Spectral Processor Loaded");
                        routeAdaptiveGraph();
                    })
                    .catch(console.error);
                return; // Early return to prevent routing before worklet loads
            } catch (e) {
                console.error('[Cortex] Engine Init Failed', e);
                return;
            }
        }

        // ── Re-route the graph (works on first call and on subsequent toggles) ──
        routeAdaptiveGraph();
    };

    // Disconnect everything from source → reconnect based on current isSmartEnhance state.
    // Safe to call repeatedly; never recreates a MediaElementSourceNode.
    const routeAdaptiveGraph = () => {
        const ctx = audioCtxRef.current;
        const source = sourceNodeRef.current;
        const gainNode = gainNodeRef.current;
        if (!ctx || !source || !gainNode) return;

        try {
            // Tear down all existing connections from the source and intermediate nodes
            source.disconnect();
            gainNode.disconnect();
            if (analyserRef.current) analyserRef.current.disconnect();
            if (adaptiveHighPassRef.current) adaptiveHighPassRef.current.disconnect();
            if (adaptiveLowPassRef.current) adaptiveLowPassRef.current.disconnect();
            if (adaptivePresenceRef.current) adaptivePresenceRef.current.disconnect();
            if (adaptiveCompRef.current) adaptiveCompRef.current.disconnect();
            if (adaptiveMasterGainRef.current) adaptiveMasterGainRef.current.disconnect();

            // V6 Professional DSP Nodes
            if (stage1HighPass1Ref.current) stage1HighPass1Ref.current.disconnect();
            if (stage1HighPass2Ref.current) stage1HighPass2Ref.current.disconnect();
            if (stage1HighPass3Ref.current) stage1HighPass3Ref.current.disconnect();
            if (stage1LowPassRef.current) stage1LowPassRef.current.disconnect();
            if (stage3SpectralWorkletRef.current) stage3SpectralWorkletRef.current.disconnect();
            if (stage6PresenceEQ1Ref.current) stage6PresenceEQ1Ref.current.disconnect();
            if (stage6PresenceEQ2Ref.current) stage6PresenceEQ2Ref.current.disconnect();
            if (stage6PresenceEQ3Ref.current) stage6PresenceEQ3Ref.current.disconnect();
            if (stage7CompressorRef.current) stage7CompressorRef.current.disconnect();
            if (stage7MakeupRef.current) stage7MakeupRef.current.disconnect();

            // Safety limiter (-1dBFS ceiling) — created once, reused on every reroute
            if (!adaptiveLimiterRef.current) {
                const limiter = ctx.createDynamicsCompressor();
                limiter.threshold.value = -1.0;
                limiter.knee.value = 0;
                limiter.ratio.value = 20.0;
                limiter.attack.value = 0.003;
                limiter.release.value = 0.1;
                adaptiveLimiterRef.current = limiter;
            }
            const limiter = adaptiveLimiterRef.current;

            if (isSmartEnhance || isNoiseCanceling) {
                // We need the analyser for both Smart Enhance OR Noise Canceling
                if (!analyserRef.current) {
                    const analyser = ctx.createAnalyser();
                    analyser.fftSize = 2048;
                    analyser.smoothingTimeConstant = 0.85;
                    analyserRef.current = analyser;
                }

                if (!adaptiveHighPassRef.current) {
                    // Fixed gentle high-pass: removes mic rumble below 80Hz, completely transparent above
                    const hp = ctx.createBiquadFilter();
                    hp.type = 'highpass'; hp.frequency.value = 80; hp.Q.value = 0.5;
                    adaptiveHighPassRef.current = hp;
                }

                if (!adaptivePresenceRef.current) {
                    // Fixed presence boost: +2dB at 3kHz — adds clarity without harshness
                    const pres = ctx.createBiquadFilter();
                    pres.type = 'peaking'; pres.frequency.value = 3000;
                    pres.Q.value = 1.2; pres.gain.value = 2.0;
                    adaptivePresenceRef.current = pres;
                }

                if (!adaptiveCompRef.current) {
                    // Transparent levelling compressor: gentle 2:1, slow attack/release
                    const comp = ctx.createDynamicsCompressor();
                    comp.threshold.value = -22;
                    comp.knee.value = 10;
                    comp.ratio.value = 2.0;
                    comp.attack.value = 0.025;  // 25ms — doesn't chop transients
                    comp.release.value = 0.35;  // 350ms — smooth, no pumping
                    adaptiveCompRef.current = comp;
                }

                if (!adaptiveLowPassRef.current) {
                    // Dynamic LPF for RNNoise: cuts off high-frequency metallic artifacts (above 6500Hz)
                    const lp = ctx.createBiquadFilter();
                    lp.type = 'lowpass';
                    lp.frequency.value = 6500;
                    lp.Q.value = 0.5; // very gentle cutoff
                    adaptiveLowPassRef.current = lp;
                }

                if (!adaptiveMasterGainRef.current) {
                    const mg = ctx.createGain();
                    mg.gain.value = 1.15; // mild makeup gain
                    adaptiveMasterGainRef.current = mg;
                }

                // V6 Balanced Nuclear Node Initialization
                if (isNoiseCanceling) {
                    if (!stage1HighPass1Ref.current) {
                        const hp1 = ctx.createBiquadFilter(); hp1.type = 'highpass'; hp1.frequency.value = 100; hp1.Q.value = 0.541;
                        const hp2 = ctx.createBiquadFilter(); hp2.type = 'highpass'; hp2.frequency.value = 100; hp2.Q.value = 1.306;
                        const hp3 = ctx.createBiquadFilter(); hp3.type = 'highpass'; hp3.frequency.value = 100; hp3.Q.value = 0.5;
                        stage1HighPass1Ref.current = hp1;
                        stage1HighPass2Ref.current = hp2;
                        stage1HighPass3Ref.current = hp3;

                        const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 15000; lp.Q.value = 0.707;
                        stage1LowPassRef.current = lp;
                    }

                    if (!stage3SpectralWorkletRef.current) {
                        try {
                            stage3SpectralWorkletRef.current = new AudioWorkletNode(ctx, 'spectral-processor');
                            // Send initial intensity immediately upon creation
                            stage3SpectralWorkletRef.current.port.postMessage({
                                type: 'SET_REDUCTION',
                                value: noiseReductionLevel
                            });
                        } catch (e) {
                            console.warn("Worklet not loaded yet, bypassing DSP for this frame.");
                        }
                    }

                    if (!stage6PresenceEQ1Ref.current) {
                        const eq1 = ctx.createBiquadFilter(); eq1.type = 'peaking'; eq1.frequency.value = 3000; eq1.Q.value = 1.0; eq1.gain.value = 4.0;
                        const eq2 = ctx.createBiquadFilter(); eq2.type = 'peaking'; eq2.frequency.value = 4500; eq2.Q.value = 1.0; eq2.gain.value = 3.0;
                        const eq3 = ctx.createBiquadFilter(); eq3.type = 'peaking'; eq3.frequency.value = 250; eq3.Q.value = 0.8; eq3.gain.value = -2.0;

                        stage6PresenceEQ1Ref.current = eq1;
                        stage6PresenceEQ2Ref.current = eq2;
                        stage6PresenceEQ3Ref.current = eq3;
                    }

                    if (!stage7CompressorRef.current) {
                        const comp = ctx.createDynamicsCompressor();
                        comp.ratio.value = 2.8;
                        comp.threshold.value = -19;
                        comp.attack.value = 0.012;
                        comp.release.value = 0.085;
                        comp.knee.value = 5.0;
                        stage7CompressorRef.current = comp;

                        const makeup = ctx.createGain();
                        const makeupDb = 1 + (noiseReductionLevel / 100) * 4;
                        makeup.gain.value = Math.pow(10, makeupDb / 20);
                        stage7MakeupRef.current = makeup;
                    }
                }

                // ── GRAPH ROUTING ──
                let currentOutput: AudioNode = source;

                // 1. V6 Professional DSP Noise Elimination Pipeline
                if (isNoiseCanceling && stage3SpectralWorkletRef.current) {
                    currentOutput.connect(stage1HighPass1Ref.current!);
                    stage1HighPass1Ref.current!.connect(stage1HighPass2Ref.current!);
                    stage1HighPass2Ref.current!.connect(stage1HighPass3Ref.current!);
                    stage1HighPass3Ref.current!.connect(stage1LowPassRef.current!);

                    stage1LowPassRef.current!.connect(stage3SpectralWorkletRef.current);

                    stage3SpectralWorkletRef.current.connect(stage6PresenceEQ1Ref.current!);
                    stage6PresenceEQ1Ref.current!.connect(stage6PresenceEQ2Ref.current!);
                    stage6PresenceEQ2Ref.current!.connect(stage6PresenceEQ3Ref.current!);

                    stage6PresenceEQ3Ref.current!.connect(stage7CompressorRef.current!);
                    stage7CompressorRef.current!.connect(stage7MakeupRef.current!);

                    currentOutput = stage7MakeupRef.current!;
                }

                // 2. Analyser reads the signal (post-noise clean up if active)
                currentOutput.connect(analyserRef.current);
                currentOutput = analyserRef.current;

                // 3. Smart Enhance EQ and Compression
                if (isSmartEnhance) {
                    currentOutput.connect(adaptiveHighPassRef.current!);
                    adaptiveHighPassRef.current!.connect(adaptivePresenceRef.current!);
                    adaptivePresenceRef.current!.connect(adaptiveCompRef.current!);
                    adaptiveCompRef.current!.connect(adaptiveMasterGainRef.current!);
                    currentOutput = adaptiveMasterGainRef.current!;
                }

                currentOutput.connect(gainNode);
            } else {
                // ── BYPASS PATH: source → gain → limiter → dest ──
                source.connect(gainNode);
            }

            gainNode.connect(limiter);
            limiter.connect(ctx.destination);

            if (isKeepAlive) ensureKeepAlive(ctx);
        } catch (e) {
            console.error('[Cortex] Graph Route Failed', e);
        }
    };

    // Real-time analysis updating status badge AND Noise Gate
    const runAnalysisLoop = (ctx: AudioContext, analyser: AnalyserNode) => {
        const timeData = new Float32Array(analyser.fftSize);
        const freqData = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatTimeDomainData(timeData);
        analyser.getFloatFrequencyData(freqData);

        // RMS → dB
        let sumSq = 0;
        for (let i = 0; i < timeData.length; i++) sumSq += timeData[i] * timeData[i];
        const rmsDb = 20 * Math.log10(Math.max(Math.sqrt(sumSq / timeData.length), 1e-9));

        // Rolling noise floor (min of last 20 frames ≈ 4s)
        quietFramesRef.current.push(rmsDb);
        if (quietFramesRef.current.length > 20) quietFramesRef.current.shift();
        const noiseFloor = Math.min(...quietFramesRef.current);
        noiseFloorRef.current = noiseFloor;

        // Band energies (for status display only)
        const binWidth = ctx.sampleRate / analyser.fftSize;
        const bandEnergy = (lo: number, hi: number): number => {
            const s = Math.floor(lo / binWidth);
            const e = Math.min(Math.ceil(hi / binWidth), freqData.length - 1);
            let sum = 0, count = 0;
            for (let i = s; i <= e; i++) { sum += freqData[i]; count++; }
            return count > 0 ? sum / count : -100;
        };
        const voiceEnergy = bandEnergy(300, 3000);
        const snr = rmsDb - noiseFloor;

        // ── Status label with 3-frame hysteresis (~600ms debounce) ──
        const next: EnhanceStatus =
            snr < 6 ? 'noise' :
                voiceEnergy > noiseFloor + 12 ? 'speech' :
                    noiseFloor < -55 ? 'clean' : 'analyzing';
        const hold = statusHoldRef.current;
        if (next === hold.status) {
            hold.count++;
        } else {
            hold.status = next;
            hold.count = 1;
        }
        if (hold.count >= 3) setEnhanceStatus(next);

        if (hold.count >= 3) setEnhanceStatus(next);

        // Native Gate removed from runAnalysisLoop as requested in V5 Architecture.
        // Noise is now continuously mathematically reduced inside spectralProcessor.js
    };

    const startAnalysisLoop = (ctx: AudioContext, analyser: AnalyserNode) => {
        if (analysisTimerRef.current) clearInterval(analysisTimerRef.current);
        analysisTimerRef.current = setInterval(() => runAnalysisLoop(ctx, analyser), 200);
    };

    const stopAnalysisLoop = () => {
        if (analysisTimerRef.current) { clearInterval(analysisTimerRef.current); analysisTimerRef.current = null; }
    };

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (fileUrl) URL.revokeObjectURL(fileUrl);
            const url = URL.createObjectURL(file);
            setFileUrl(url);
            setFileName(file.name);
            setFileObject(file);
            // Don't change source type when uploading
        }
    };

    // Handle YouTube URL
    const handleYouTubeSubmit = () => {
        const id = extractYouTubeId(youtubeUrl);
        if (id) {
            setYoutubeId(id);
            // Reset audio source tracking when switching to YT
            sourceNodeRef.current = null;
        }
    };

    // Clear local file
    const clearLocalFile = () => {
        if (fileUrl) URL.revokeObjectURL(fileUrl);
        setFileUrl(null);
        setFileName(null);
        stopAnalysisLoop();
        // IMPORTANT: Do NOT close the AudioContext here. The MediaElementSourceNode
        // is permanently bound to the <video> element and cannot be recreated.
        // Suspend the context instead so it stops consuming resources.
        if (audioCtxRef.current) {
            audioCtxRef.current.suspend();
            stopKeepAlive();
        }
        // Do NOT null sourceNodeRef — it stays valid for when a new file is loaded
    };

    // Clear YouTube
    const clearYouTube = () => {
        setYoutubeId(null);
        setYoutubeUrl('');
    };

    // Play/Pause toggle
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
                if (!audioCtxRef.current) {
                    initAdaptiveEngine(videoRef.current);
                    if (isSmartEnhance && analyserRef.current && audioCtxRef.current) {
                        startAnalysisLoop(audioCtxRef.current, analyserRef.current);
                        setEnhanceStatus('analyzing');
                    }
                }
                audioCtxRef.current?.resume();
            }
        }
    };

    // Skip functions
    const skip = (seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
        }
    };

    // Volume control
    const handleVolumeChange = (newVolume: number) => {
        setPlayerState({ volume: newVolume });
        if (videoRef.current) {
            videoRef.current.volume = Math.min(1, newVolume);
        }
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Global shortcuts
            // 'C' key for Captions
            if (e.key.toLowerCase() === 'c' && sourceType === 'local') {
                setPlayerState({ ccEnabled: !ccEnabled });
                return;
            }

            if (e.altKey && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                setIsNoiseCanceling(prev => !prev);
                return;
            }

            // Player specific shortcuts
            if (sourceType === 'local' && fileUrl) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    skip(-5);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    skip(5);
                } else if (e.key === ' ') {
                    e.preventDefault();
                    togglePlay();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [sourceType, fileUrl, isPlaying, duration, ccEnabled, setPlayerState]);

    // Update volume gain
    useEffect(() => {
        if (gainNodeRef.current && audioCtxRef.current) {
            const targetGain = volume > 1.0 ? 1.0 + (volume - 1.0) * 0.6 : volume;
            const now = audioCtxRef.current.currentTime;
            gainNodeRef.current.gain.setTargetAtTime(targetGain, now, 0.1);
        }
    }, [volume]);

    useEffect(() => {
        if (isSmartEnhance || isNoiseCanceling) {
            setEnhanceStatus('analyzing');
            if (audioCtxRef.current && videoRef.current) {
                initAdaptiveEngine(videoRef.current);
                if (analyserRef.current) startAnalysisLoop(audioCtxRef.current!, analyserRef.current);
            }
        } else {
            stopAnalysisLoop();
            setEnhanceStatus('idle');
            if (audioCtxRef.current && videoRef.current) {
                initAdaptiveEngine(videoRef.current);
            }
        }
        return () => stopAnalysisLoop();
    }, [isSmartEnhance, isNoiseCanceling]);

    // Fullscreen
    const toggleFullscreen = () => {
        if (containerRef.current) {
            if (!document.fullscreenElement) {
                containerRef.current.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    // Video event handlers
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // [FIX] Restore time if we have a saved position and video is fresh
        if (lastTimeRef.current > 0 && Math.abs(video.currentTime - lastTimeRef.current) > 1) {
            console.log("Restoring playback position:", lastTimeRef.current);
            video.currentTime = lastTimeRef.current;
        }

        // [FIX] Reset audio node if video element changed to ensure graph re-init
        if (sourceNodeRef.current) {
            // We can't easily check if sourceNode is connected to THIS video,
            // but if we are mounting, it's safer to assume we need a new source.
            sourceNodeRef.current = null;
        }

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            if (video.currentTime > 0) lastTimeRef.current = video.currentTime;
        };
        const handleDurationChange = () => {
            setDuration(video.duration);
            setPlayerState({ duration: video.duration });
        };
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => {
            setIsPlaying(false);
            // Save time on pause
            setPlayerState({ currentTime: video.currentTime });
        };
        const handleProgress = () => {
            if (video.buffered.length > 0) {
                setBuffered(video.buffered.end(0) / video.duration * 100);
            }
        };

        const handleLoadedMetadata = () => {
            // [FIX] Restore time on metadata load (robust method)
            if (lastTimeRef.current > 0 && Math.abs(video.currentTime - lastTimeRef.current) > 1) {
                console.log("Restoring playback position (loadedmetadata):", lastTimeRef.current);
                video.currentTime = lastTimeRef.current;
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('durationchange', handleDurationChange);
        video.addEventListener('loadedmetadata', handleLoadedMetadata); // [NEW] Guaranteed restore point
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('progress', handleProgress);

        return () => {
            // [PERSISTENCE] Save time on unmount/cleanup
            if (video && !video.paused) { // If playing when unmounting
                setPlayerState({ currentTime: video.currentTime });
            } else if (lastTimeRef.current > 0) {
                setPlayerState({ currentTime: lastTimeRef.current });
            }

            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('durationchange', handleDurationChange);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('progress', handleProgress);
        };
    }, [fileUrl, sourceType, setPlayerState]); // Added sourceType to re-bind when switching tabs

    // Sync Player State with Store (Segment Tracking)
    // [FIX] Removed auto-close logic that was causing the player to close immediately on mount.
    // The player should remain open to allow file selection.
    useEffect(() => {
        return () => {
            setMediaPlaying(false);
        };
    }, [setMediaPlaying]);

    // Sync isPlaying state with store
    useEffect(() => {
        setMediaPlaying(isPlaying);
    }, [isPlaying, setMediaPlaying]);

    // Auto-hide controls
    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        if (isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
        }
    };

    // Format time
    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Get volume icon
    const getVolumeIcon = () => {
        if (isMuted || volume === 0) return VolumeX;
        if (volume < 0.5) return Volume1;
        return Volume2;
    };

    const VolumeIcon = getVolumeIcon();

    return (
        <div className="flex flex-col h-full w-full p-4">
            {/* Tab Switcher */}
            <div className="flex items-center gap-2 mb-4">
                <button
                    onClick={() => setSourceType('local')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${sourceType === 'local'
                        ? 'bg-indigo-500 text-white shadow-lg'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                >
                    <FileVideo size={18} />
                    <span>Local File</span>
                </button>
                <button
                    onClick={() => setSourceType('youtube')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${sourceType === 'youtube'
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                >
                    <Youtube size={18} />
                    <span>YouTube Link</span>
                </button>
            </div>

            {/* LOCAL FILE TAB */}
            {sourceType === 'local' && (
                <>
                    {/* Hidden file inputs — each triggers a different native picker */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*,audio/*,.mp4,.webm,.mkv,.avi,.mov,.wmv,.flv,.m4v,.3gp,.mp3,.wav,.ogg,.m4a,.aac,.flac,.alac,.wma,.amr,.opus"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <input
                        ref={audioRecordRef}
                        type="file"
                        accept="audio/*"
                        capture="user"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <input
                        ref={videoRecordRef}
                        type="file"
                        accept="image/*,video/*,audio/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {!fileUrl && (
                        <>
                            {/* PENDING LECTURE BANNER — set by RECORDER overlay */}
                            {pendingLecture && (
                                <div className="mb-3 flex items-center gap-3 bg-rose-950/60 border border-rose-500/30 rounded-xl px-4 py-3 text-right" dir="rtl">
                                    <Mic2 size={18} className="shrink-0 text-rose-400" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-rose-300 font-medium">التسجيل المختار</p>
                                        <p className="text-sm text-white font-semibold truncate">{pendingLecture.lectureTitle}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">اختار ملف الصوت أو الفيديو بتاعته من الأسفل</p>
                                    </div>
                                    <button
                                        onClick={() => setPendingLecture(null)}
                                        className="shrink-0 text-slate-500 hover:text-slate-300"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                            {/* Upload Card */}
                            <button
                                onClick={() => setShowUploadMenu(true)}
                                className="relative flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-700/50 rounded-xl bg-slate-800/10 hover:bg-slate-800/30 active:bg-slate-800/50 transition-colors min-h-[300px] w-full cursor-pointer"
                            >

                                <div className="flex flex-col items-center">
                                    <div className="p-4 rounded-full bg-slate-800 mb-4">
                                        <Upload className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <p className="text-slate-300 font-medium text-lg">Upload Media File</p>
                                    <p className="text-slate-500 text-sm mt-1 max-w-xs text-center">
                                        All Audio & Video Formats Supported
                                    </p>
                                </div>
                            </button>

                            {/* Upload Options Bottom Sheet */}
                            {showUploadMenu && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                                        onClick={() => setShowUploadMenu(false)}
                                    />
                                    {/* Sheet */}
                                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700/60 rounded-t-2xl shadow-2xl p-5 animate-in slide-in-from-bottom-4 duration-300">
                                        <div className="w-10 h-1 rounded-full bg-slate-600 mx-auto mb-5" />
                                        <p className="text-slate-200 font-semibold text-center mb-5 text-base font-[MadaniArabic-Bold]">اختر مصدر الملف</p>
                                        <div className="flex flex-col gap-3">
                                            {/* Option 1: Browse files */}
                                            <button
                                                onClick={() => { setShowUploadMenu(false); fileInputRef.current?.click(); }}
                                                className="flex items-center gap-4 w-full px-4 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 transition-colors text-left"
                                            >
                                                <div className="p-2.5 rounded-full bg-indigo-500/20">
                                                    <Upload className="w-5 h-5 text-indigo-400" />
                                                </div>
                                                <div>
                                                    <p className="text-slate-100 font-medium text-sm font-[MadaniArabic-Bold]">اختار ملف</p>
                                                    <p className="text-slate-500 text-xs mt-0.5">Audio & Video من الجهاز</p>
                                                </div>
                                            </button>

                                            {/* Option 2: Record audio */}
                                            <button
                                                onClick={() => { setShowUploadMenu(false); audioRecordRef.current?.click(); }}
                                                className="flex items-center gap-4 w-full px-4 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 transition-colors text-left"
                                            >
                                                <div className="p-2.5 rounded-full bg-rose-500/20">
                                                    <Mic2 className="w-5 h-5 text-rose-400" />
                                                </div>
                                                <div>
                                                    <p className="text-slate-100 font-medium text-sm font-[MadaniArabic-Bold]">سجل صوت</p>
                                                    <p className="text-slate-500 text-xs mt-0.5">مسجل الصوت الأصلي للفون</p>
                                                </div>
                                            </button>

                                            {/* Option 3: Media Gallery */}
                                            <button
                                                onClick={() => { setShowUploadMenu(false); fileInputRef.current?.click(); }}
                                                className="flex items-center gap-4 w-full px-4 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 transition-colors text-left"
                                            >
                                                <div className="p-2.5 rounded-full bg-emerald-500/20">
                                                    <MonitorSmartphone className="w-5 h-5 text-emerald-400" />
                                                </div>
                                                <div>
                                                    <p className="text-slate-100 font-medium text-sm font-[MadaniArabic-Bold]">معرض الصور والفيديوهات</p>
                                                    <p className="text-slate-500 text-xs mt-0.5">كل الميديا — أحدث الملفات النازلة</p>
                                                </div>
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => setShowUploadMenu(false)}
                                            className="mt-4 w-full py-3 rounded-xl bg-slate-800/50 text-slate-400 text-sm font-medium hover:bg-slate-700 transition-colors"
                                        >إلغاء</button>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {fileUrl && (
                        <div className="flex flex-col flex-1 gap-4 min-h-0">
                            <div
                                style={{ position: "relative" }}
                                className={`flex-1 transition-all duration-300 ${ccEnabled ? 'h-[70vh]' : 'h-full'}`}
                            >
                                <div
                                    ref={containerRef}
                                    className="relative w-full h-full bg-black rounded-xl overflow-hidden flex items-center justify-center"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={() => isPlaying && setShowControls(false)}
                                >
                                    <video
                                        ref={videoRef}
                                        src={fileUrl || undefined}
                                        className="w-full h-full object-contain"
                                        onClick={togglePlay}
                                        onError={(e) => {
                                            const error = (e.target as HTMLVideoElement).error;
                                            console.error("Video Error:", error);
                                            if (error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
                                                console.warn("Media source not supported or URL expired.");
                                                if (fileUrl?.startsWith('blob:')) {
                                                    setFileUrl(null);
                                                }
                                            }
                                        }}
                                    />

                                    {/* Future Feature Toast for CC */}
                                    {showCcFutureToast && (
                                        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in duration-300">
                                            <div className="bg-slate-800/95 backdrop-blur-md border border-indigo-500/50 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
                                                <Info size={18} className="text-indigo-400" />
                                                <span className="text-sm font-medium">ميزة مستقبلية تمكنك من رؤية كتابة نصية لما يقال في المحاضرة</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Center Play Button */}
                                    {!isPlaying && (
                                        <button
                                            onClick={togglePlay}
                                            className="absolute inset-0 m-auto w-20 h-20 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all backdrop-blur-sm z-10"
                                        >
                                            <Play size={40} className="text-white ml-1" fill="white" />
                                        </button>
                                    )}

                                    {/* Top Left: File Status */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg z-20 transition-opacity duration-300" style={{ opacity: showControls ? 1 : 0 }}>
                                        <FileVideo size={16} className="text-indigo-400" />
                                        <span className="text-white text-sm font-medium truncate max-w-[200px]">{fileName}</span>
                                        <button
                                            onClick={clearLocalFile}
                                            className="p-1 hover:bg-white/20 rounded transition-colors ml-2"
                                        >
                                            <X size={14} className="text-white" />
                                        </button>
                                    </div>

                                    {/* Cortex Status Indicator */}
                                    {isSmartEnhance && enhanceStatus !== 'idle' && (
                                        <div className="absolute top-4 right-4 flex items-center space-x-1.5 bg-violet-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur">
                                            <span className={`w-1.5 h-1.5 rounded-full bg-white ${enhanceStatus === 'analyzing' ? 'animate-pulse' : ''}`} />
                                            <span>
                                                {enhanceStatus === 'analyzing' && 'Analyzing...'}
                                                {enhanceStatus === 'speech' && 'Enhancing Speech'}
                                                {enhanceStatus === 'noise' && 'Reducing Noise'}
                                                {enhanceStatus === 'clean' && 'Clean Signal ✓'}
                                            </span>
                                        </div>
                                    )}

                                    {/* Custom Controls */}
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    >
                                        {/* Timeline */}
                                        <div className="px-4 pb-2">
                                            <div className="relative w-full h-1 bg-slate-700/50 rounded-full cursor-pointer group">
                                                <div
                                                    className="absolute h-full bg-slate-600/50 rounded-full"
                                                    style={{ width: `${buffered}%` }}
                                                />
                                                <div
                                                    className="absolute h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                                />
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max={duration || 100}
                                                    value={currentTime}
                                                    onChange={(e) => {
                                                        if (videoRef.current) {
                                                            videoRef.current.currentTime = Number(e.target.value);
                                                        }
                                                    }}
                                                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        {/* Control Bar */}
                                        <div className="px-4 pb-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent pt-6">
                                            <div className="flex items-center justify-between">
                                                {/* Left: Play Controls */}
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => skip(-5)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                                        <RotateCcw size={18} className="text-white" />
                                                    </button>
                                                    <button onClick={togglePlay} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                                        {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
                                                    </button>
                                                    <button onClick={() => skip(5)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                                        <RotateCw size={18} className="text-white" />
                                                    </button>
                                                    <span className="text-white text-sm ml-2">
                                                        {formatTime(currentTime)} / {formatTime(duration)}
                                                    </span>
                                                </div>

                                                {/* Right: Settings & Fullscreen */}
                                                <div className="flex items-center gap-2">
                                                    {/* CC Quick Toggle */}
                                                    {sourceType === 'local' && (
                                                        <button
                                                            onClick={() => {
                                                                setShowCcFutureToast(true);
                                                                setTimeout(() => setShowCcFutureToast(false), 4000);
                                                            }}
                                                            className={`p-2 rounded-lg transition-colors flex items-center gap-1 hover:bg-white/10 text-slate-300`}
                                                            title="Closed Captions (C)"
                                                        >
                                                            <FileText size={18} />
                                                            <span className="text-xs font-semibold">CC</span>
                                                        </button>
                                                    )}

                                                    {/* Settings Menu Toggle */}
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => {
                                                                setShowSettingsMenu(!showSettingsMenu);
                                                                setShowQualityMenu(false);
                                                                setShowCCMenu(false);
                                                            }}
                                                            className={`p-2 rounded-lg transition-colors ${showSettingsMenu ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-slate-300'
                                                                }`}
                                                        >
                                                            <Settings size={18} />
                                                        </button>

                                                        {/* Settings Dropdown */}
                                                        {showSettingsMenu && (
                                                            <div className="absolute bottom-full right-0 mb-4 w-64 bg-slate-800/95 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in">
                                                                {showCCMenu ? (
                                                                    <div className="p-3">
                                                                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700/50">
                                                                            <button
                                                                                onClick={() => setShowCCMenu(false)}
                                                                                className="p-1 hover:bg-slate-700 rounded transition-colors"
                                                                            >
                                                                                <AlertCircle size={16} className="text-slate-400 rotate-180" /> {/* Simulate Back arrow */}
                                                                            </button>
                                                                            <span className="text-sm font-semibold text-slate-200">Subtitle Settings</span>
                                                                        </div>

                                                                        {/* CC Toggle */}
                                                                        <div className="flex items-center justify-between py-2">
                                                                            <span className="text-xs text-slate-300 font-medium">Show Subtitles</span>
                                                                            <div
                                                                                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${ccEnabled ? 'bg-indigo-500' : 'bg-slate-600'}`}
                                                                                onClick={() => setPlayerState({ ccEnabled: !ccEnabled })}
                                                                            >
                                                                                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${ccEnabled ? 'left-5.5' : 'left-0.5'}`} style={{ left: ccEnabled ? '22px' : '2px' }} />
                                                                            </div>
                                                                        </div>

                                                                        {/* Text Color */}
                                                                        <div className="py-2">
                                                                            <span className="text-xs text-slate-400 block mb-2">Text Color</span>
                                                                            <div className="flex gap-2">
                                                                                {['#ffffff', '#fcd34d', '#34d399', '#f87171', '#60a5fa'].map(color => (
                                                                                    <button
                                                                                        key={color}
                                                                                        className={`w-6 h-6 rounded-full border-2 transition-all ${ccTextColor === color ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'border-transparent hover:border-slate-500'}`}
                                                                                        style={{ backgroundColor: color }}
                                                                                        onClick={() => setPlayerState({ ccTextColor: color })}
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                        </div>

                                                                        {/* Shadow Toggle */}
                                                                        <div className="flex items-center justify-between py-2">
                                                                            <span className="text-xs text-slate-300 font-medium">Text Shadow</span>
                                                                            <div
                                                                                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${ccHasShadow ? 'bg-indigo-500' : 'bg-slate-600'}`}
                                                                                onClick={() => setPlayerState({ ccHasShadow: !ccHasShadow })}
                                                                            >
                                                                                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${ccHasShadow ? 'left-5.5' : 'left-0.5'}`} style={{ left: ccHasShadow ? '22px' : '2px' }} />
                                                                            </div>
                                                                        </div>

                                                                        {/* Opacity Slider */}
                                                                        <div className="py-2">
                                                                            <div className="flex justify-between text-xs mb-1">
                                                                                <span className="text-slate-400">Background Opacity</span>
                                                                                <span className="font-mono text-slate-300">{Math.round(ccBgOpacity * 100)}%</span>
                                                                            </div>
                                                                            <input
                                                                                type="range"
                                                                                min="0"
                                                                                max="1"
                                                                                step="0.1"
                                                                                value={ccBgOpacity}
                                                                                onChange={(e) => setPlayerState({ ccBgOpacity: parseFloat(e.target.value) })}
                                                                                className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                                                            />
                                                                        </div>

                                                                        {/* Font Size Slider */}
                                                                        <div className="py-2">
                                                                            <div className="flex justify-between text-xs mb-1">
                                                                                <span className="text-slate-400">Font Size</span>
                                                                                <span className="font-mono text-slate-300">{ccFontSize}</span>
                                                                            </div>
                                                                            <input
                                                                                type="range"
                                                                                min="12"
                                                                                max="48"
                                                                                step="2"
                                                                                value={parseInt(ccFontSize)}
                                                                                onChange={(e) => setPlayerState({ ccFontSize: `${e.target.value}px` })}
                                                                                className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                ) : (
                                                                    <div className="py-1">
                                                                        <button
                                                                            onClick={() => setShowCCMenu(true)}
                                                                            className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors flex items-center justify-between group"
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <FileText size={16} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                                                                <span>Subtitles / CC</span>
                                                                            </div>
                                                                            <span className="text-xs text-slate-500 font-medium group-hover:text-slate-400">
                                                                                {ccEnabled ? 'On' : 'Off'}
                                                                            </span>
                                                                        </button>
                                                                        <div className="h-px bg-slate-700/50 my-1"></div>
                                                                        <button
                                                                            onClick={() => {
                                                                                setShowQualityMenu(!showQualityMenu);
                                                                                setShowCCMenu(false);
                                                                            }}
                                                                            className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors flex items-center justify-between group"
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <Settings size={16} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                                                                <span>Quality</span>
                                                                            </div>
                                                                            <span className="text-xs text-slate-500 font-medium group-hover:text-slate-400">{selectedQuality}</span>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Quality Menu Dropdown (Secondary) */}
                                                        {showQualityMenu && showSettingsMenu && !showCCMenu && (
                                                            <div className="absolute bottom-full right-64 mr-2 mb-4 w-40 bg-slate-800/95 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden animate-in slide-in-from-right-2 fade-in">
                                                                <div className="p-2 border-b border-slate-700/50">
                                                                    <span className="text-xs font-semibold text-slate-400 px-2 uppercase tracking-wider">Quality</span>
                                                                </div>
                                                                <div className="py-1 max-h-48 overflow-y-auto custom-scrollbar">
                                                                    {(['auto', '1080p', '720p', '480p', '360p', '240p'] as QualityOption[]).map((quality) => (
                                                                        <button
                                                                            key={quality}
                                                                            onClick={() => {
                                                                                setSelectedQuality(quality);
                                                                                setShowQualityMenu(false);
                                                                                setShowSettingsMenu(false);
                                                                            }}
                                                                            className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${selectedQuality === quality
                                                                                ? 'bg-indigo-500/20 text-indigo-400 font-medium'
                                                                                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                                                                }`}
                                                                        >
                                                                            <span>{quality}</span>
                                                                            {selectedQuality === quality && <Check size={14} />}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <button onClick={toggleFullscreen} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                                        <Maximize size={18} className="text-slate-300" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* [NEW] Offline Transcript Viewer (Temporarily Disabled) */}

                            {/* Audio Controls Panel (Moved Outside Video) */}
                            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 w-full shrink-0">
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    {/* Smart Enhance Toggle */}
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={isSmartEnhance}
                                                onChange={(e) => setIsSmartEnhance(e.target.checked)}
                                                className="sr-only peer"
                                                id="smart-enhance-toggle"
                                            />
                                            {/* Track */}
                                            <label
                                                htmlFor="smart-enhance-toggle"
                                                className={`block w-14 h-8 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${isSmartEnhance
                                                    ? 'bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                                                    : 'bg-slate-700 hover:bg-slate-600'
                                                    }`}
                                            >
                                                {/* Knob */}
                                                <span
                                                    className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-spring ${isSmartEnhance ? 'translate-x-6' : 'translate-x-0'
                                                        } shadow-md flex items-center justify-center`}
                                                >
                                                    {isSmartEnhance && (
                                                        <Mic2 size={12} className="text-violet-500 animate-in fade-in zoom-in duration-300" />
                                                    )}
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex flex-col select-none">
                                            <label
                                                htmlFor="smart-enhance-toggle"
                                                className={`text-sm font-semibold cursor-pointer transition-colors ${isSmartEnhance ? 'text-violet-400' : 'text-slate-200'
                                                    }`}
                                            >
                                                Smart Enhance
                                            </label>
                                            <span className="text-[10px] text-slate-400">
                                                {isSmartEnhance
                                                    ? enhanceStatus === 'idle' ? 'Starting...'
                                                        : enhanceStatus === 'analyzing' ? 'Analyzing Audio...'
                                                            : enhanceStatus === 'speech' ? 'Enhancing Speech'
                                                                : enhanceStatus === 'noise' ? 'Reducing Noise'
                                                                    : 'Clean Signal ✓'
                                                    : 'Off: AI Adaptive Processing'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="hidden md:block w-px h-10 bg-white/10 mx-2"></div>

                                    {/* Keep Alive Toggle */}
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={isKeepAlive}
                                                onChange={(e) => setPlayerState({ isKeepAlive: e.target.checked })}
                                                className="sr-only peer"
                                                id="keep-alive-toggle"
                                            />
                                            {/* Track */}
                                            <label
                                                htmlFor="keep-alive-toggle"
                                                className={`block w-14 h-8 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${isKeepAlive
                                                    ? 'bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.4)]'
                                                    : 'bg-slate-700 hover:bg-slate-600'
                                                    }`}
                                            >
                                                {/* Knob */}
                                                <span
                                                    className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-spring ${isKeepAlive ? 'translate-x-6' : 'translate-x-0'
                                                        } shadow-md flex items-center justify-center`}
                                                >
                                                    {isKeepAlive && (
                                                        <Headphones size={12} className="text-sky-500 animate-in fade-in zoom-in duration-300" />
                                                    )}
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex flex-col select-none">
                                            <label
                                                htmlFor="keep-alive-toggle"
                                                className={`text-sm font-semibold cursor-pointer transition-colors ${isKeepAlive ? 'text-sky-400' : 'text-slate-200'
                                                    }`}
                                            >
                                                Headphone Saver
                                            </label>
                                            <span className="text-[10px] text-slate-400">
                                                {isKeepAlive ? 'Active: Preventing Sleep' : 'Off: Standard Power'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="hidden md:block w-px h-10 bg-white/10 mx-2"></div>

                                    {/* Noise Cancellation Toggle & Slider */}
                                    <div className="flex flex-col relative">
                                        <div className="flex items-center space-x-3">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={isNoiseCanceling}
                                                    onChange={(e) => {
                                                        setIsNoiseCanceling(e.target.checked);
                                                        if (!e.target.checked) setShowNoiseSlider(false);
                                                    }}
                                                    className="sr-only peer"
                                                    id="noise-cancel-toggle"
                                                />
                                                {/* Track */}
                                                <label
                                                    htmlFor="noise-cancel-toggle"
                                                    className={`block w-14 h-8 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${isNoiseCanceling
                                                        ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                                                        : 'bg-slate-700 hover:bg-slate-600'
                                                        }`}
                                                >
                                                    {/* Knob */}
                                                    <span
                                                        className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-spring ${isNoiseCanceling ? 'translate-x-6' : 'translate-x-0'
                                                            } shadow-md flex items-center justify-center`}
                                                    >
                                                        {isNoiseCanceling && (
                                                            <VolumeX size={12} className="text-emerald-500 animate-in fade-in zoom-in duration-300" />
                                                        )}
                                                    </span>
                                                </label>
                                            </div>
                                            <div
                                                className={`flex flex-col select-none ${isNoiseCanceling ? 'cursor-pointer hover:opacity-80' : 'opacity-50'}`}
                                                onClick={() => isNoiseCanceling && setShowNoiseSlider(!showNoiseSlider)}
                                            >
                                                <label
                                                    className={`text-sm font-semibold transition-colors flex items-center gap-1 ${isNoiseCanceling ? 'text-emerald-400 cursor-pointer' : 'text-slate-200'
                                                        }`}
                                                >
                                                    <span>(Alt + A)</span> إيقاف تشغيل منع الضوضاء
                                                </label>
                                                <span className="text-[10px] text-slate-400 text-right">
                                                    {isNoiseCanceling
                                                        ? 'Active: Studio Noise Elimination'
                                                        : 'Off: Standard Audio'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Slider Dropdown Menu */}
                                        {showNoiseSlider && isNoiseCanceling && (
                                            <div className="absolute top-12 left-0 right-0 bg-slate-800 rounded-lg p-3 shadow-xl border border-slate-700/50 z-[100] animate-in fade-in slide-in-from-top-2">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs text-slate-300 font-medium">قوة العزل</span>
                                                    <span className="text-xs font-mono text-emerald-400">{noiseReductionLevel}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={noiseReductionLevel}
                                                    onChange={(e) => setNoiseReductionLevel(Number(e.target.value))}
                                                    className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                                                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="hidden md:block w-px h-10 bg-white/10 mx-2"></div>

                                    {/* Volume Boost */}
                                    <div className="flex items-center flex-1 w-full md:w-auto space-x-3">
                                        <div className={`p-2 rounded-lg ${volume > 1.0 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/50 text-slate-400'}`}>
                                            {volume > 1.0 && volume < 2.0 ? <AlertCircle size={18} /> : <VolumeIcon size={18} />}
                                        </div>
                                        <div className="flex-1 flex flex-col space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-slate-400 font-medium">Safe Boost Volume</span>
                                                <span className={`font-mono font-bold ${volume > 1.0 ? 'text-amber-400' : 'text-slate-300'}`}>
                                                    {Math.round(volume * 100)}%
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="3.0"
                                                step="0.05"
                                                value={volume}
                                                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                                                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )
            }

            {/* YOUTUBE TAB */}
            {
                sourceType === 'youtube' && (
                    <>
                        {!youtubeId && (
                            <div className="flex flex-col gap-3 p-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
                                <label className="text-slate-300 font-medium">YouTube Video URL</label>
                                <input
                                    type="text"
                                    value={youtubeUrl}
                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                <button
                                    onClick={handleYouTubeSubmit}
                                    className="px-4 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                                >
                                    Load Video
                                </button>
                            </div>
                        )}

                        {youtubeId && (
                            <div className="relative flex-1 bg-black rounded-xl overflow-hidden">
                                <iframe
                                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1`}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                                    <Youtube size={16} className="text-red-500" />
                                    <span className="text-white text-sm font-medium">YouTube Video</span>
                                    <button
                                        onClick={clearYouTube}
                                        className="p-1 hover:bg-white/20 rounded transition-colors"
                                    >
                                        <X size={14} className="text-white" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )
            }
        </div >
    );
};
