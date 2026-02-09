import React from 'react';
import { ToolsGrid } from './ToolsGrid';

export const ToolsView = () => {
    // ToolsGrid handles all state logic (click -> setActiveTool -> Overlay)
    // It also adapts layout based on context="dashboard"

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">

            {/* HEADERS */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Academic Tools</h1>
                <p className="text-slate-400">Essential utilities to enhance your productivity.</p>
            </div>

            {/* TOOLS GRID (Functional) */}
            <ToolsGrid context="dashboard" />
        </div>
    );
};
