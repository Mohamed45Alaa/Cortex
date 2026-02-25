import React, { useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { TranscriptionSegment } from '@/core/workers/whisper.worker';

interface SubtitleOverlayProps {
    segments: TranscriptionSegment[];
    currentTime: number;
    containerRef: React.RefObject<HTMLDivElement>;
    progressPercent?: number;
    processedChunks?: number;
    totalChunks?: number;
    etaFormatted?: string | null;
}

export const SubtitleOverlay: React.FC<SubtitleOverlayProps> = ({
    segments,
    currentTime,
    progressPercent = 0,
    processedChunks = 0,
    totalChunks = 0,
    etaFormatted
}) => {
    const playerState = useStore((state) => state.uiState.playerState);

    const activeSegment = useMemo(() => {
        if (!playerState.ccEnabled || segments.length === 0) return null;
        return segments.find(seg => currentTime >= seg.start && currentTime <= (seg.end || seg.start + 2));
    }, [currentTime, segments, playerState.ccEnabled]);

    if (!playerState.ccEnabled) return null;

    const isComplete = totalChunks > 0 && processedChunks >= totalChunks;
    const isTranscribing = totalChunks > 0 && processedChunks < totalChunks;

    return (
        <div
            style={{
                position: "absolute",
                bottom: "8%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
                textAlign: "center",
                pointerEvents: "none",
                zIndex: 10,
            }}
        >
            {/* Background Transcription Progress UI */}
            {isTranscribing && (!activeSegment || activeSegment.text.trim() === '') && (
                <div
                    className="inline-flex flex-col items-center gap-1.5 px-6 py-4 rounded-xl backdrop-blur-md border border-white/10"
                    style={{
                        backgroundColor: `rgba(15, 23, 42, ${Math.max(0.8, playerState.ccBgOpacity)})`,
                        color: playerState.ccTextColor,
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-violet-500/30 border-t-violet-400 rounded-full animate-spin"></div>
                        <span className="font-semibold text-violet-300 text-sm tracking-wide">
                            Generating subtitles...
                        </span>
                    </div>

                    <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                        <div
                            className="h-full bg-violet-500 rounded-full transition-all duration-300 relative"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>

                    <div className="flex flex-col items-center mt-1">
                        <span className="text-xs font-mono text-slate-300">
                            Progress: {progressPercent}% ({processedChunks}/{totalChunks})
                        </span>
                        <span className="text-xs font-mono text-violet-400 mt-0.5">
                            Estimated time remaining: {etaFormatted || "Calculating..."}
                        </span>
                    </div>
                </div>
            )}

            {/* Active Subtitle Text */}
            {activeSegment && activeSegment.text.trim() !== '' && (
                <div
                    className={`px-4 py-2 rounded-lg backdrop-blur-sm transition-all inline-block ${playerState.ccHasShadow ? 'drop-shadow-2xl' : ''}`}
                    style={{
                        backgroundColor: `rgba(0, 0, 0, ${playerState.ccBgOpacity})`,
                        color: playerState.ccTextColor,
                        fontSize: playerState.ccFontSize,
                        textShadow: playerState.ccHasShadow ? '1px 1px 2px black, 0 0 1em black' : 'none',
                    }}
                >
                    <span className="font-medium whitespace-pre-wrap select-text cursor-text">
                        {activeSegment.text}
                    </span>
                </div>
            )}
        </div>
    );
};
