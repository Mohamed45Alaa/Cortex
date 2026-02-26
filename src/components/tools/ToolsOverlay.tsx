import React from 'react';
import { ToolConfig } from './tools.config';
import { LocalMediaPlayer } from './LocalMediaPlayer';
import { X, ExternalLink, Timer, Lock } from 'lucide-react';
import Image from 'next/image';

interface ToolsOverlayProps {
    tool: ToolConfig;
    onClose: () => void;
}

export const ToolsOverlay: React.FC<ToolsOverlayProps> = ({ tool, onClose }) => {

    // Close on click outside
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleLaunch = () => {
        if (tool.url) {
            window.open(tool.url, '_blank', 'noopener,noreferrer,width=1200,height=800');
        }
    };

    return (
        <div
            className="fixed inset-0 z-[500] flex items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            {/* Global Session Timer (z-9999) sits above this layer automatically */}

            <div className={`bg-slate-900 md:rounded-2xl w-full ${tool.componentKey === 'PLAYER' ? 'max-w-6xl' : 'max-w-2xl'} h-full md:h-auto md:max-h-[85vh] flex flex-col shadow-2xl border-none md:border md:border-white/10 animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 overflow-hidden`}>

                {/* Header */}
                <div className="flex items-center justify-between p-4 px-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-sm z-10 shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-slate-800 ${tool.color}`}>
                            <tool.icon size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-100 leading-none">{tool.title}</h3>
                            <span className="text-xs text-slate-500 font-mono uppercase">SECURE ENVIRONMENT</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-slate-950/30 relative">
                    {tool.componentKey === 'PLAYER' ? (
                        <div className="h-[600px] w-full p-4 md:p-6">
                            <LocalMediaPlayer isOpen={true} onClose={() => { }} />
                        </div>
                    ) : (
                        /* LAUNCHER SHELL */
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center min-h-[400px]">

                            <div className="flex flex-col items-center mb-8">
                                <div className="p-8 rounded-full bg-slate-800/30 ring-1 ring-white/5 shadow-2xl mb-6 relative">
                                    {tool.customIcon ? (
                                        <div className="relative w-20 h-20">
                                            <Image
                                                src={tool.customIcon}
                                                alt={tool.title}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <tool.icon size={64} className="text-slate-500" />
                                    )}
                                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1.5 border-4 border-slate-900">
                                        <Lock size={14} className="text-slate-900" strokeWidth={3} />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">{tool.title}</h2>
                                <p className="text-slate-400 max-w-sm text-base leading-relaxed">
                                    {tool.description}
                                </p>
                            </div>

                            <button
                                onClick={handleLaunch}
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-indigo-500/20 flex items-center space-x-3 group"
                            >
                                <span>{tool.actionLabel}</span>
                                <ExternalLink size={20} className="opacity-70 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="mt-4 text-xs text-slate-500 opacity-80">
                                External tool will open in a new tab. This overlay will remain active.
                            </p>

                            <div className="mt-8 flex items-center space-x-2 text-slate-500 text-xs bg-slate-900/50 px-4 py-2 rounded-full border border-white/5">
                                <Timer size={14} className="text-emerald-500 animate-pulse" />
                                <span>Session timer continues running in background</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
