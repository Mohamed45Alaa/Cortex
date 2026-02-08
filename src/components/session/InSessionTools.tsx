import React from 'react';
import { ToolsGrid } from '@/components/tools/ToolsGrid';

interface InSessionToolsProps {
    elapsedTime: number;
    isPaused: boolean;
}

export const InSessionTools: React.FC<InSessionToolsProps> = ({ elapsedTime, isPaused }) => {
    return (
        <ToolsGrid
            context="session"
            elapsedTime={elapsedTime}
            isPaused={isPaused}
        />
    );
};
