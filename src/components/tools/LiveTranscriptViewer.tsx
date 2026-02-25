import React, { useEffect, useRef } from 'react';
import { TranscriptionSegment } from '@/core/workers/whisper.worker';
import { Loader2, CheckCircle2, AlertCircle, FileText, Download } from 'lucide-react';

interface LiveTranscriptViewerProps {
    segments: TranscriptionSegment[];
    currentText: string;
    isProcessing: boolean;
    loadingModel: boolean;
    progress: number;
    error: string | null;
    currentTime: number; // passed from video player
    activeModel?: string;
}

export const LiveTranscriptViewer: React.FC<LiveTranscriptViewerProps> = ({
    segments,
    currentText,
    isProcessing,
    loadingModel,
    progress,
    error,
    currentTime,
    activeModel
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const activeSegmentRef = useRef<HTMLParagraphElement>(null);

    // Auto-scroll to active segment
    useEffect(() => {
        if (activeSegmentRef.current && scrollRef.current) {
            scrollRef.current.scrollTo({
                top: activeSegmentRef.current.offsetTop - 100, // keep it around the middle
                behavior: 'smooth'
            });
        }
    }, [currentTime, segments, currentText]);

    const handleDownloadSRT = () => {
        let srtContent = '';
        segments.forEach((seg, index) => {
            const formatTime = (seconds: number) => {
                const date = new Date(seconds * 1000);
                const hh = date.getUTCHours().toString().padStart(2, '0');
                const mm = date.getUTCMinutes().toString().padStart(2, '0');
                const ss = date.getUTCSeconds().toString().padStart(2, '0');
                const ms = date.getUTCMilliseconds().toString().padStart(3, '0');
                return `${hh}:${mm}:${ss},${ms}`;
            };
            srtContent += `${index + 1}\n${formatTime(seg.start)} --> ${formatTime(seg.end)}\n${seg.text.trim()}\n\n`;
        });

        const blob = new Blob([srtContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transcript_${Date.now()}.srt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mt-6 flex flex-col max-h-[400px]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-2 text-slate-200 font-medium">
                    <FileText size={18} className="text-emerald-400" />
                    <div className="flex flex-col">
                        <span>التفريغ النصي (Offline)</span>
                        {activeModel && (
                            <span className="text-[10px] text-slate-500 font-normal">
                                المحرك النشط: {activeModel}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Status Indicator */}
                    {loadingModel && (
                        <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full">
                            <Loader2 size={14} className="animate-spin" />
                            <span>تحميل نموذج الذكاء الاصطناعي ({progress}%)</span>
                        </div>
                    )}

                    {!loadingModel && isProcessing && (
                        <div className="flex items-center gap-2 text-xs text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full">
                            <Loader2 size={14} className="animate-spin" />
                            <span>جاري التفريغ...</span>
                        </div>
                    )}

                    {!isProcessing && segments.length > 0 && !error && (
                        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                            <CheckCircle2 size={14} />
                            <span>مكتمل</span>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-full">
                            <AlertCircle size={14} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Download Button */}
                    <button
                        onClick={handleDownloadSRT}
                        disabled={segments.length === 0}
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="تحميل كملف ترجمة SRT"
                    >
                        <Download size={14} />
                        SRT
                    </button>
                </div>
            </div>

            {/* Transcript Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
                dir="rtl"
            >
                {segments.length === 0 && !currentText && !isProcessing && (
                    <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                        التفريغ النصي سيظهر هنا تلقائياً عند تشغيل الفيديو...
                    </div>
                )}

                {/* Completed Segments */}
                {segments.map((seg, idx) => {
                    const isActive = currentTime >= seg.start && currentTime <= (seg.end || seg.start + 5);
                    return (
                        <p
                            key={`seg-${idx}`}
                            ref={isActive ? activeSegmentRef : null}
                            className={`text-lg transition-all duration-300 leading-relaxed ${isActive
                                ? 'text-white font-medium scale-[1.02] transform origin-right drop-shadow-md'
                                : 'text-slate-400 hover:text-slate-300'
                                }`}
                        >
                            {seg.text}
                        </p>
                    );
                })}

                {/* Live Processing Text (Current Chunk) */}
                {currentText && (
                    <p className="text-lg text-emerald-300/80 animate-pulse leading-relaxed italic border-r-2 border-emerald-500 pr-3">
                        {currentText}
                    </p>
                )}
            </div>
        </div>
    );
};
