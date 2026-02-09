import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import {
    Upload, Trash2, FileVideo, Volume2, VolumeX, Volume1,
    Play, Pause, RotateCcw, RotateCw, Maximize, Settings,
    Check, X, Youtube, Mic2, AlertCircle
} from 'lucide-react';

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
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [youtubeId, setYoutubeId] = useState<string | null>(null);


    // Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1.0); // 0-3.0 for 300%
    const [isMuted, setIsMuted] = useState(false);
    const [buffered, setBuffered] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [isHallMode, setIsHallMode] = useState(false);

    // UI State
    const [showQualityMenu, setShowQualityMenu] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState<QualityOption>('auto');

    // Refs
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const lastTimeRef = useRef(0); // Track time for restoration

    // Web Audio API refs
    const audioCtxRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const dryGainRef = useRef<GainNode | null>(null);
    const wetGainRef = useRef<GainNode | null>(null);

    // [PERSISTENCE] Restore State on Mount
    useEffect(() => {
        if (savedState.sourceType) setSourceType(savedState.sourceType);
        if (savedState.fileUrl) setFileUrl(savedState.fileUrl);
        if (savedState.youtubeId) setYoutubeId(savedState.youtubeId);
        if (savedState.volume !== undefined) setVolume(savedState.volume);
        if (savedState.isMuted !== undefined) setIsMuted(savedState.isMuted);

        // Restore Time
        if (savedState.currentTime > 0) {
            setCurrentTime(savedState.currentTime);
            lastTimeRef.current = savedState.currentTime;
        }
    }, []); // Run once on mount

    // [PERSISTENCE] Sync State Changes (Low Frequency)
    useEffect(() => {
        setPlayerState({
            sourceType,
            fileUrl,
            youtubeId,
            volume,
            isMuted

        });
    }, [sourceType, fileUrl, youtubeId, volume, isMuted, setPlayerState]);

    // Extract YouTube video ID
    const extractYouTubeId = (url: string): string | null => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match?.[1] || null;
    };

    // Initialize Web Audio for volume boost + Lecture Hall Mode
    const initAudioGraph = (mediaElement: HTMLVideoElement) => {
        if (sourceNodeRef.current) return;

        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContextClass();
            audioCtxRef.current = ctx;

            const source = ctx.createMediaElementSource(mediaElement);
            sourceNodeRef.current = source;

            // Dry/Wet paths for Lecture Hall Mode
            const dryGain = ctx.createGain();
            const wetGain = ctx.createGain();
            dryGain.gain.value = 1;
            wetGain.gain.value = 0;
            dryGainRef.current = dryGain;
            wetGainRef.current = wetGain;

            // Lecture Hall Mode chain (Wet Path)
            const highPass = ctx.createBiquadFilter();
            highPass.type = 'highpass';
            highPass.frequency.value = 120;

            const lowPass = ctx.createBiquadFilter();
            lowPass.type = 'lowpass';
            lowPass.frequency.value = 7200;

            const compressor = ctx.createDynamicsCompressor();
            compressor.threshold.value = -22;
            compressor.ratio.value = 4.0;

            // Main gain for volume
            const gainNode = ctx.createGain();
            gainNode.gain.value = volume;
            gainNodeRef.current = gainNode;

            // Limiter to prevent distortion
            const limiter = ctx.createDynamicsCompressor();
            limiter.threshold.value = -1.0;
            limiter.ratio.value = 20.0;
            limiter.attack.value = 0.003;
            limiter.release.value = 0.1;

            // Routing
            source.connect(dryGain);
            source.connect(highPass);
            highPass.connect(lowPass);
            lowPass.connect(compressor);
            compressor.connect(wetGain);

            dryGain.connect(gainNode);
            wetGain.connect(gainNode);
            gainNode.connect(limiter);
            limiter.connect(ctx.destination);
        } catch (e) {
            console.error("Web Audio Init Failed", e);
        }
    };

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (fileUrl) URL.revokeObjectURL(fileUrl);
            const url = URL.createObjectURL(file);
            setFileUrl(url);
            setFileName(file.name);
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
        if (audioCtxRef.current) {
            audioCtxRef.current.close();
            audioCtxRef.current = null;
        }
        sourceNodeRef.current = null;
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
                if (!sourceNodeRef.current) {
                    initAudioGraph(videoRef.current);
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
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = Math.min(1, newVolume);
        }
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
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
    }, [sourceType, fileUrl, isPlaying, duration]);

    // Update volume gain
    useEffect(() => {
        if (gainNodeRef.current && audioCtxRef.current) {
            const targetGain = volume > 1.0 ? 1.0 + (volume - 1.0) * 0.6 : volume;
            const now = audioCtxRef.current.currentTime;
            gainNodeRef.current.gain.setTargetAtTime(targetGain, now, 0.1);
        }
    }, [volume]);

    // Toggle Hall Mode
    useEffect(() => {
        if (dryGainRef.current && wetGainRef.current && audioCtxRef.current) {
            const now = audioCtxRef.current.currentTime;
            if (isHallMode) {
                dryGainRef.current.gain.setTargetAtTime(0, now, 0.05);
                wetGainRef.current.gain.setTargetAtTime(1, now, 0.05);
            } else {
                dryGainRef.current.gain.setTargetAtTime(1, now, 0.05);
                wetGainRef.current.gain.setTargetAtTime(0, now, 0.05);
            }
        }
    }, [isHallMode]);

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

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('durationchange', handleDurationChange);
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
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                    {!fileUrl && (
                        <div className="relative flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-700/50 rounded-xl bg-slate-800/10 hover:bg-slate-800/30 transition-colors min-h-[300px]">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="video/mp4,video/webm,video/mkv,video/avi"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex flex-col items-center pointer-events-none">
                                <div className="p-4 rounded-full bg-slate-800 mb-4">
                                    <Upload className="w-8 h-8 text-slate-400" />
                                </div>
                                <p className="text-slate-300 font-medium text-lg">Upload Video File</p>
                                <p className="text-slate-500 text-sm mt-1 max-w-xs text-center">
                                    Supports MP4, WebM, MKV, AVI
                                </p>
                            </div>
                        </div>
                    )}

                    {fileUrl && (
                        <>
                            <div
                                ref={containerRef}
                                className="relative flex-1 bg-black rounded-xl overflow-hidden"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={() => isPlaying && setShowControls(false)}
                            >
                                <video
                                    ref={videoRef}
                                    src={fileUrl}
                                    className="w-full h-full object-contain"
                                    onClick={togglePlay}
                                />

                                {/* Center Play Button */}
                                {!isPlaying && (
                                    <button
                                        onClick={togglePlay}
                                        className="absolute inset-0 m-auto w-20 h-20 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all backdrop-blur-sm z-10"
                                    >
                                        <Play size={40} className="text-white ml-1" fill="white" />
                                    </button>
                                )}

                                {/* Lecture Hall Mode Indicator */}
                                {isHallMode && (
                                    <div className="absolute top-4 right-4 flex items-center space-x-2 bg-indigo-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur">
                                        <Mic2 size={12} />
                                        <span>LECTURE HALL MODE</span>
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
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setShowQualityMenu(!showQualityMenu)}
                                                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                                    >
                                                        <Settings size={20} className="text-white" />
                                                    </button>
                                                    {showQualityMenu && (
                                                        <div className="absolute bottom-full right-0 mb-2 bg-slate-900/95 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 min-w-[120px]">
                                                            <div className="px-3 py-2 text-xs text-slate-400 font-semibold border-b border-white/10">
                                                                Quality
                                                            </div>
                                                            {(['auto', '1080p', '720p', '480p', '360p', '240p'] as QualityOption[]).map((quality) => (
                                                                <button
                                                                    key={quality}
                                                                    onClick={() => {
                                                                        setSelectedQuality(quality);
                                                                        setShowQualityMenu(false);
                                                                    }}
                                                                    className="w-full px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                                                                >
                                                                    <span>{quality === 'auto' ? 'Auto' : quality}</span>
                                                                    {selectedQuality === quality && <Check size={14} />}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <button onClick={toggleFullscreen} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                                    <Maximize size={20} className="text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* File Name Overlay */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                                    <FileVideo size={16} className="text-indigo-400" />
                                    <span className="text-white text-sm font-medium truncate max-w-[200px]">{fileName}</span>
                                    <button
                                        onClick={clearLocalFile}
                                        className="p-1 hover:bg-white/20 rounded transition-colors"
                                    >
                                        <X size={14} className="text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Audio Controls Panel */}
                            <div className="mt-4 p-4 rounded-xl bg-slate-800/50 border border-white/5">
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    {/* Lecture Hall Mode Toggle */}
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={isHallMode}
                                                onChange={(e) => setIsHallMode(e.target.checked)}
                                                className="sr-only peer"
                                                id="hall-toggle"
                                            />
                                            <label htmlFor="hall-toggle" className="block w-12 h-7 bg-slate-700 rounded-full cursor-pointer transition-colors peer-checked:bg-indigo-500 relative">
                                                <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></span>
                                            </label>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="hall-toggle" className="text-sm font-semibold text-slate-200 cursor-pointer select-none">
                                                Lecture Hall Mode
                                            </label>
                                            <span className="text-[10px] text-slate-400">
                                                Reduces echo & clarifies speech
                                            </span>
                                        </div>
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
                        </>
                    )}
                </>
            )}

            {/* YOUTUBE TAB */}
            {sourceType === 'youtube' && (
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
            )}
        </div>
    );
};
