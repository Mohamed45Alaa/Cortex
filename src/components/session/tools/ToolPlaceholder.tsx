import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolPlaceholderProps {
    title: string;
    icon: LucideIcon;
    message?: string;
}

export const ToolPlaceholder: React.FC<ToolPlaceholderProps> = ({ title, icon: Icon, message }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[400px]">
            <div className="p-6 rounded-3xl bg-slate-800/30 mb-6 border border-white/5 ring-1 ring-white/5">
                <Icon size={48} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-200 mb-3">{title}</h2>
            <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
                {message || "This tool is optimized for the focused session environment. External access is proxied securely."}
            </p>

            <div className="w-full max-w-lg space-y-4 opacity-50 pointer-events-none select-none">
                <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 flex items-center shadow-inner">
                    <Icon size={18} className="text-slate-600 mr-4" />
                    <div className="h-2 w-24 bg-slate-700/50 rounded mr-3"></div>
                    <div className="h-2 w-full bg-slate-800/50 rounded"></div>
                </div>
                <div className="space-y-2 pl-4">
                    <div className="h-2 w-3/4 bg-slate-700/20 rounded"></div>
                    <div className="h-2 w-1/2 bg-slate-700/20 rounded"></div>
                </div>
            </div>
        </div>
    );
};
