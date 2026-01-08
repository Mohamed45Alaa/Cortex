import React, { useState, useEffect } from 'react';
import styles from './ControlLayout.module.css';
import {
    LayoutDashboard,
    BookOpen,
    Activity,
    Settings, // Keep one
    Bell,
    Sun,
    Moon,
    User, // Added
    LogOut // Added
} from 'lucide-react';
import { useSystemStatus } from '@/core/hooks';
import { FlowState } from '@/core/engines/FlowEngine';
import { translations, Language } from '@/core/i18n/translations';
import { useStore } from '@/store/useStore';
import { AuthModal } from '@/components/auth/AuthModal';

interface ControlLayoutProps {
    children: React.ReactNode;
    currentView: FlowState;
    onNavigate: (view: FlowState) => void;
    lang: Language;
    onToggleLang: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

export const ControlLayout: React.FC<ControlLayoutProps> = ({
    children,
    currentView,
    onNavigate,
    lang,
    onToggleLang,
    theme,
    onToggleTheme
}) => {
    const systemStatus = useSystemStatus();
    // REMOVED local theme state, now controlled props
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { authState, authModal, openAuthModal, closeAuthModal, logout } = useStore();
    const user = authState.user;
    const isGuest = authState.status === 'GUEST';

    const t = translations[lang];

    // Theme Effect REMOVED (Handled in Parent)

    // Simple Toggle Handlers
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Status Indicator Color
    // ...

    return (
        <div className={styles.layoutContainer}>

            {/* MAIN CONTENT AREA */}
            <main className={`${styles.mainContent} ${sidebarOpen ? styles.withSidebar : styles.fullWidth}`}>

                {/* HEADS UP DISPLAY (Header) */}
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        {/* NOTIFICATIONS & USER GROUP */}
                        <div className={styles.notificationArea}>
                            <button className={styles.iconBtn}>
                                <Bell size={20} />
                            </button>
                        </div>
                        <div className={styles.userSection}>
                            {isGuest ? (
                                <button
                                    onClick={() => openAuthModal('LOGIN')}
                                    className={`${styles.textBtn} bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all`}
                                    style={{ border: '1px solid rgba(59, 130, 246, 0.3)' }}
                                >
                                    Sign In
                                </button>
                            ) : (
                                <>
                                    <div className={styles.userAvatar}>
                                        <span className={styles.avatarInitials}>{user?.name.charAt(0) || 'U'}</span>
                                    </div>
                                    <div className={styles.userInfo}>
                                        <span className={styles.userName}>{user?.name || 'Student'}</span>
                                        <span className={styles.userRole}>{user?.role || 'STUDENT'}</span>
                                    </div>
                                    <button onClick={logout} className="ml-4 text-slate-500 hover:text-red-400 transition-colors" title="Sign Out">
                                        <LogOut size={16} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={styles.headerRight}>
                        {/* GLOBAL CONTROLS */}
                        <div className={styles.globalControls}>
                            <button onClick={onToggleLang} className={styles.textBtn}>
                                {lang === 'en' ? 'EN | AR' : 'AR | EN'}
                            </button>
                            <button onClick={onToggleTheme} className={styles.iconBtn}>
                                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                            </button>
                        </div>
                    </div>
                </header>

                <div className={styles.contentViewport}>
                    <div className={styles.contentWrapper}>
                        {children}
                    </div>
                </div>
            </main>

            {/* CONTROL SIDEBAR (Right Side) */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>

                {/* TOGGLE BUTTON */}
                <button className={styles.sidebarToggle} onClick={toggleSidebar}>
                    {sidebarOpen ? '›' : '‹'}
                </button>

                {/* LOGO AREA */}
                <div className={styles.logoArea}>
                    <div className={styles.logoIcon}>
                        <Activity size={20} />
                    </div>
                    <div className={styles.logoText}>
                        <div className={styles.brandName}>{t.brand_name}</div>
                    </div>
                </div>

                <nav className={styles.navigation}>
                    <div className={styles.navGroup}>
                        <NavMethod
                            icon={<LayoutDashboard size={20} />}
                            label={t.dashboard}
                            active={currentView === 'DASHBOARD_HOME'}
                            onClick={() => onNavigate('DASHBOARD_HOME')}
                        />
                        <NavMethod
                            icon={<BookOpen size={20} />}
                            label={t.sessions}
                            active={currentView === 'DASHBOARD_HISTORY'}
                            onClick={() => onNavigate('DASHBOARD_HISTORY')}
                        />
                        <NavMethod
                            icon={<Activity size={20} />}
                            label={t.academic_input}
                            active={currentView === 'DASHBOARD_INPUTS'}
                            onClick={() => onNavigate('DASHBOARD_INPUTS')}
                        />
                        <NavMethod
                            icon={<Activity size={20} />}
                            label={t.questions}
                            active={false}
                            onClick={() => { }}
                        />
                        <NavMethod
                            icon={<Settings size={20} />}
                            label={t.settings}
                            active={currentView === 'DASHBOARD_CONFIG'}
                            onClick={() => onNavigate('DASHBOARD_CONFIG')}
                        />
                    </div>
                </nav>
            </aside>
            {/* AUTH MODAL OVERLAY */}
            <AuthModal
                open={authModal.isOpen}
                initialMode={authModal.mode}
                onClose={closeAuthModal}
            />
        </div>
    );
};

const NavMethod = ({ icon, label, active, onClick }: any) => (
    <button
        className={`${styles.navItem} ${active ? styles.active : ''}`}
        onClick={onClick}
    >
        <span className={styles.navIcon}>{icon}</span>
        {label && <span className={styles.navLabel}>{label}</span>}
        {active && <div className={styles.activeIndicator} />}
    </button>
);
