import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ToolConfig } from '../tools/tools.config';
import Image from 'next/image';

interface ToolCardProps {
    tool: ToolConfig;
    onClick: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group relative flex flex-col items-start p-6 bg-slate-900/40 border border-white/5 rounded-2xl transition-all duration-300 hover:bg-slate-800/60 overflow-hidden w-full text-left h-full cursor-pointer hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 min-h-[160px]"
        >
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex justify-between w-full mb-4">
                <div className={`p-1 rounded-xl bg-slate-950/50 border border-white/5 ${tool.color} transition-transform duration-300 group-hover:scale-110 relative`}>
                    {tool.customIcon ? (
                        <div className="w-9 h-9 relative">
                            <Image
                                src={tool.customIcon}
                                alt={tool.title}
                                fill
                                className={`object-contain ${tool.id === 'translate' ? 'p-1' : ''}`}
                            />
                        </div>
                    ) : (
                        <tool.icon size={28} />
                    )}
                </div>
            </div>

            <div className="relative z-10 w-full flex-grow">
                <h3 className="text-lg font-semibold text-slate-100 mb-1 transition-colors group-hover:text-white">
                    {tool.title}
                </h3>
                <p className="text-sm text-slate-400 mb-6 line-clamp-2 group-hover:text-slate-300 transition-colors">
                    {tool.subtitle}
                </p>
            </div>

            <div className="w-full flex items-center justify-between mt-auto">
                <span className="text-[10px] text-slate-600 font-mono">
                    {tool.componentKey === 'PLAYER' ? 'LOCAL ONLY' : 'OPEN EXTERNAL'}
                </span>
                <button
                    className="py-1.5 px-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium text-xs group-hover:bg-indigo-500 group-hover:text-white transition-all transform group-hover:translate-x-1"
                >
                    {tool.actionLabel || 'Open'}
                </button>
            </div>
        </div>
    );
};
