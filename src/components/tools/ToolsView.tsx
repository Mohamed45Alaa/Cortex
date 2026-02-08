import React from 'react';
import { ToolCard } from '@/components/dashboard/ToolCard';
import { TOOLS_CONFIG } from './tools.config';

export const ToolsView = () => {
    // Phase 2: Static View Only - No Modal Logic
    // const [selectedTool, setSelectedTool] = useState<ToolConfig | null>(null);

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">

            {/* HEADERS */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Academic Tools</h1>
                <p className="text-slate-400">Essential utilities to enhance your productivity.</p>
            </div>

            {/* TOOLS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {TOOLS_CONFIG.map((tool) => (
                    <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={() => { }}
                    />
                ))}
            </div>

            {/* Modal Logic Removed for Phase 2 strict compliance */}
        </div>
    );
};
