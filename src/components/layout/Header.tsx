import React from 'react';
import { Sun, Moon, LogIn, LogOut, User as UserIcon, AlertTriangle } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface HeaderProps {
    language: 'en' | 'ar';
    theme: 'light' | 'dark';
    onToggleLanguage: () => void;
    onToggleTheme: () => void;
}

export function Header({ language, theme, onToggleLanguage, onToggleTheme }: HeaderProps) {
    const { authState, openAuthModal, logout } = useStore();
    const user = authState.user;

    return (
        <>
            {/* Auth Controls (Top Right - Shifted left of Lang Toggle) */}
            <div style={{
                position: 'fixed',
                top: '1.5rem',
                right: '4.5rem', // Left of Language Toggle
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                {authState.status === 'AUTHENTICATED' && user ? (
                    <div className="flex items-center gap-3">
                        {/* User Info (Real Name) */}
                        <div className="flex flex-col items-end mr-1">
                            {user.fullName ? (
                                <span className="text-sm font-semibold text-slate-200 tracking-tight">
                                    {user.fullName}
                                </span>
                            ) : (
                                <button
                                    className="text-amber-400 flex items-center gap-1.5 text-xs font-bold bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20 hover:bg-amber-500/20 transition-colors animate-pulse"
                                    onClick={() => window.location.reload()} // Force refresh to trigger Profile View check
                                    title="Click to Refresh and Complete Profile"
                                >
                                    <AlertTriangle size={12} /> Complete Profile
                                </button>
                            )}
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold translate-y-[-2px]">
                                {user.role || 'STUDENT'}
                            </span>
                        </div>

                        {/* Simple Avatar Representation */}
                        <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-300 font-medium text-sm">
                            {user.avatarUrl ? (
                                <img src={user.avatarUrl} alt={user.fullName || 'User'} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <span>{(user.fullName || user.email || 'U').charAt(0).toUpperCase()}</span>
                            )}
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={() => logout()}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--muted)',
                                cursor: 'pointer',
                                opacity: 0.6,
                                transition: 'opacity 0.2s'
                            }}
                            title="Sign Out"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => openAuthModal('LOGIN')}
                        style={{
                            background: 'rgba(139, 92, 246, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            color: '#A78BFA',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <LogIn size={14} />
                        <span>Sign In</span>
                    </button>
                )}
            </div>


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
