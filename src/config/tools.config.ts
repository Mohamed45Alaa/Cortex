import { LucideIcon, Search, Languages, Bot, PlayCircle } from 'lucide-react';

export interface ToolConfig {
    id: string;
    title: string;
    subtitle: string;
    description: string; // Mandatory now
    icon: LucideIcon;
    color: string;
    componentKey: string;
    actionLabel?: string;
    url?: string; // External URL for iframe
}

export const TOOLS_CONFIG: ToolConfig[] = [
    {
        id: 'google',
        title: 'Google Search',
        subtitle: 'Search within the platform',
        description: 'Access Google Search without leaving your session context.',
        icon: Search,
        color: 'text-blue-400',
        componentKey: 'EXTERNAL',
        actionLabel: 'Launch Search',
        url: 'https://www.google.com/webhp?igu=1' // igu=1 sometimes helps with google framing, but standard URL requested
    },
    {
        id: 'translate',
        title: 'Google Translate',
        subtitle: 'Instant translation',
        description: 'Translate text instantly.',
        icon: Languages,
        color: 'text-blue-400',
        componentKey: 'EXTERNAL',
        actionLabel: 'Open Translate',
        url: 'https://translate.google.com'
    },
    {
        id: 'chatgpt',
        title: 'ChatGPT',
        subtitle: 'AI Assistant',
        description: 'Ask AI for help with complex topics.',
        icon: Bot,
        color: 'text-emerald-400',
        componentKey: 'EXTERNAL',
        actionLabel: 'Launch Chat',
        url: 'https://chat.openai.com'
    },
    {
        id: 'player',
        title: 'Local Player',
        subtitle: 'Play recorded lectures',
        description: 'Watch local video files.',
        icon: PlayCircle,
        color: 'text-rose-400',
        componentKey: 'PLAYER',
        actionLabel: 'Open Player'
    }
];
