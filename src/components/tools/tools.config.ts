import { LucideIcon, Search, Languages, Bot, PlayCircle } from 'lucide-react';

export interface ToolConfig {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: LucideIcon; // Fallback icon
    customIcon?: string; // Path to custom asset
    color: string;
    componentKey: 'LAUNCHER' | 'PLAYER';
    actionLabel: string;
    url?: string; // External URL for launcher
}

export const TOOLS_CONFIG: ToolConfig[] = [
    {
        id: 'google',
        title: 'Google Search',
        subtitle: 'Search within the platform',
        description: 'Access Google Search in a secure, focus-preserving window. keeps your session active in the background.',
        icon: Search,
        customIcon: '/assets/tools/google-search.png',
        color: 'text-blue-400',
        componentKey: 'LAUNCHER',
        actionLabel: 'Launch Search',
        url: 'https://www.google.com/webhp?igu=1'
    },
    {
        id: 'translate',
        title: 'Google Translate',
        subtitle: 'Instant translation',
        description: 'Quickly translate text or documents using Google Translate without leaving your study flow.',
        icon: Languages,
        customIcon: '/assets/tools/google-translate.png',
        color: 'text-blue-400',
        componentKey: 'LAUNCHER',
        actionLabel: 'Open Translate',
        url: 'https://translate.google.com'
    },
    {
        id: 'chatgpt',
        title: 'ChatGPT',
        subtitle: 'AI Assistant',
        description: 'Open your personal ChatGPT assistant in a dedicated window. zero data is sent to our servers.',
        icon: Bot,
        customIcon: '/assets/tools/chatgpt_v4.png',
        color: 'text-emerald-400',
        componentKey: 'LAUNCHER',
        actionLabel: 'Launch Chat',
        url: 'https://chat.openai.com'
    },
    {
        id: 'player',
        title: 'Local Player',
        subtitle: 'Play recorded lectures',
        description: 'Listen to lecture recordings with echo reduction and clarity enhancement. files play locally on your device.',
        icon: PlayCircle,
        color: 'text-rose-400',
        componentKey: 'PLAYER',
        actionLabel: 'Open Player'
    }
];
