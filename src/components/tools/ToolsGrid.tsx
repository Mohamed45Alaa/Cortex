import React from 'react';
import { TOOLS_CONFIG, ToolConfig } from './tools.config';
import { ToolCard } from '@/components/dashboard/ToolCard';
import { ToolsOverlay } from './ToolsOverlay';
import { Activity } from 'lucide-react';

interface ToolsGridProps {
    context: 'dashboard' | 'session';
    elapsedTime?: number;
    isPaused?: boolean;
}

import { useStore } from '@/store/useStore';

export const ToolsGrid: React.FC<ToolsGridProps> = ({ context, elapsedTime, isPaused }) => {
    // Global Tool State
    const { uiState, setActiveTool, healAccount } = useStore();
    const activeToolId = uiState.activeToolId;

    const activeTool = activeToolId ? TOOLS_CONFIG.find(t => t.id === activeToolId) || null : null;

    // Context-based specific styles
    const isSession = context === 'session';
    const gridClass = isSession
        ? "hidden md:grid md:grid-cols-2 gap-4"
        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6";

    const handleToolClick = (tool: ToolConfig) => {
        setActiveTool(tool.id);
    };

    const handleCloseTool = () => {
        setActiveTool(null);
    };

    return (
        <div className="w-full" data-testid={`tools - grid - ${context} `}>
            {/* IN-SESSION MOBILE SCROLL / DESKTOP GRID */}
            {isSession ? (
                <>
                    {/* Mobile Horizontal Scroll */}
                    <div className="md:hidden flex space-x-4 overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
                        {TOOLS_CONFIG.map((tool) => (
                            <div key={tool.id} className="min-w-[260px] max-w-[280px] snap-center">
                                <ToolCard tool={tool} onClick={() => handleToolClick(tool)} />
                            </div>
                        ))}
                    </div>
                    {/* Desktop Grid (Hidden on Mobile) */}
                    <div className={gridClass}>
                        {TOOLS_CONFIG.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} onClick={() => handleToolClick(tool)} />
                        ))}
                    </div>
                </>
            ) : (
                /* DASHBOARD GRID (Full) */
                <div className={gridClass}>
                    {TOOLS_CONFIG.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} onClick={() => handleToolClick(tool)} />
                    ))}

                    {/* EXPERIMENTAL: SYSTEM HEALER */}
                    <div
                        onClick={() => {
                            if (confirm("⚠️ HEAL DATA?\nThis will purge legacy metrics and strict-unify your cognitive data. The app will reload.")) {
                                healAccount();
                            }
                        }}
                        className="bg-slate-900/50 border border-red-500/30 hover:border-red-500 hover:bg-red-500/5 rounded-2xl p-6 transition-all cursor-pointer group flex flex-col justify-center"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                <Activity size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">System Healer</h3>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Force strict 0-10 metric unification and purge legacy data.
                        </p>
                    </div>
                </div>
            )}

            {/* UNIFIED OVERLAY */}
            {activeTool && (
                <ToolsOverlay
                    tool={activeTool}
                    onClose={handleCloseTool}
                // We remove prop-drilling of timer here, as GlobalOverlay handles it.
                // But ToolsOverlay might still need it if we wanted it INSIDE.
                // The requirement says "Global Floating Timer Overlay... visible above all tool windows".
                // So we don't need to pass it here anymore.
                />
            )}
        </div>
    );
};
