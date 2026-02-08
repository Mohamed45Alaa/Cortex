import React from 'react';
import { ToolsGrid } from '../tools/ToolsGrid';

export const ToolsView = () => {
    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full relative">
            {/* HEADERS */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">My Tools</h1>
                <p className="text-slate-400">
                    External utilities & local tools. <span className="text-indigo-400">Zero data processing.</span>
                </p>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-[10px] text-slate-500 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                    Window Launcher • No Tracking • Your Account
                </div>
            </div>

            <ToolsGrid context="dashboard" />
        </div>
    );
};
