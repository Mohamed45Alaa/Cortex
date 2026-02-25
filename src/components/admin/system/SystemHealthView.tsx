import React from 'react';

export const SystemHealthView = () => {
    return (
        <div className="p-4 text-white">
            <h2 className="text-xl font-bold mb-4">System Health</h2>
            <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400">System metrics monitoring active.</p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="bg-slate-700 p-3 rounded">CPU: Normal</div>
                    <div className="bg-slate-700 p-3 rounded">Memory: Optimal</div>
                    <div className="bg-slate-700 p-3 rounded">Latency: 24ms</div>
                </div>
            </div>
        </div>
    );
};
