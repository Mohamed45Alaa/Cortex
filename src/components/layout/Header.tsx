import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
    language: 'en' | 'ar';
    theme: 'light' | 'dark';
    onToggleLanguage: () => void;
    onToggleTheme: () => void;
}

export function Header({ language, theme, onToggleLanguage, onToggleTheme }: HeaderProps) {
    return (
        <>
            {/* Language Toggle (Top Right) */}
            <button
                onClick={onToggleLanguage}
                style={{
                    position: 'fixed',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'none',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--muted)',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    zIndex: 50,
                    opacity: 0.6,
                    transition: 'opacity 0.2s'
                }}
            >
                {language === 'en' ? 'AR' : 'EN'}
            </button>

            {/* Theme Toggle (Top Left) */}
            <button
                onClick={onToggleTheme}
                style={{
                    position: 'fixed',
                    top: '1.5rem',
                    left: '1.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    zIndex: 50,
                    opacity: 0.6,
                    transition: 'opacity 0.2s'
                }}
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
        </>
    );
}
