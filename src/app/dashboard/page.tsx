"use client";
import React, { useState } from 'react';
import AppGate from '@/components/layout/AppGate';
import { GlobalSystemProviders } from '@/components/layout/GlobalSystemProviders';
import { useStore } from '@/store/useStore';

const DebugPanel = () => {
    const { authState, subjects, profile } = useStore();
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-red-900/50 text-red-200 px-3 py-1 rounded-full text-xs z-[9999] hover:bg-red-900"
            >
                Debug
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 w-96 max-h-[500px] overflow-y-auto bg-black/90 border border-red-500/30 p-4 rounded-xl shadow-2xl z-[9999] text-xs font-mono text-green-400">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white">DATA DEBUGGER</h3>
                <button onClick={() => setIsOpen(false)} className="text-red-400 hover:text-red-300">Close</button>
            </div>
            <div className="space-y-2">
                <div>
                    <span className="text-slate-400">UID:</span> {authState.user?.id || 'NULL'}
                </div>
                <div>
                    <span className="text-slate-400">Auth Status:</span> {authState.status}
                </div>
                <div>
                    <span className="text-slate-400">Profile:</span> {profile ? 'LOADED' : 'NULL'}
                    <pre className="text-[10px] text-slate-500">{JSON.stringify(profile, null, 2)}</pre>
                </div>
                <div>
                    <span className="text-slate-400">Subjects ({subjects.length}):</span>
                    <ul className="pl-2 mt-1 space-y-1">
                        {subjects.map(s => (
                            <li key={s.id} className="text-slate-300">{s.name} ({s.id})</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default function DashboardPage() {
    return (
        <GlobalSystemProviders>
            <AppGate />
        </GlobalSystemProviders>
    );
}
