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
    LogOut, // Added
    Menu,
    X,
    ChevronsLeft,
    ChevronsRight
} from 'lucide-react';
import { useSystemStatus, useMediaQuery } from '@/core/hooks';
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
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Complex Sidebar State
    // Desktop: true = Expanded, false = Mini Rail
    // Mobile: true = Open (Overlay), false = Closed (Hidden)
    const [sidebarLocal, setSidebarLocal] = useState(true);

    // Auto-close sidebar on mobile nav
    useEffect(() => {
        if (isMobile) {
            setSidebarLocal(false); // Default closed on mobile load
        } else {
            setSidebarLocal(true); // Default open on desktop
        }
    }, [isMobile]);

    const { authState, authModal, openAuthModal, closeAuthModal, logout, isAdminMode, setAdminMode } = useStore();
    const user = authState.user;
    const isGuest = authState.status === 'GUEST';

    const t = translations[lang];

    // Toggle Handler
    const toggleSidebar = () => setSidebarLocal(!sidebarLocal);

    // Dynamic Classes
    const sidebarClass = isMobile
        ? sidebarLocal ? styles.sidebarOpen : styles.sidebarClosed
        : sidebarLocal ? styles.sidebarOpen : styles.sidebarClosed; // Same naming, CSS handles diffs

    const mainContentClass = isMobile
        ? styles.mainContent // No margin on mobile
        : `${styles.mainContent} ${sidebarLocal ? styles.withSidebar : styles.fullWidth}`;

    return (
        <div className={styles.layoutContainer}>

            {/* MAIN CONTENT AREA */}
            <main className={mainContentClass}>

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
                                    <div className={styles.userInfo} style={isMobile ? { display: 'none' } : {}}>
                                        <span className={styles.userName}>{user?.name || 'Student'}</span>
                                        <span className={styles.userRole}>{user?.role || 'STUDENT'}</span>
                                    </div>
                                    {!isMobile && (
                                        <button onClick={logout} className="ml-4 text-slate-500 hover:text-red-400 transition-colors" title="Sign Out">
                                            <LogOut size={16} />
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* CENTERED ADMIN BUTTON */}
                    {user?.role === 'ADMIN' && !isMobile && (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <button
                                onClick={() => setAdminMode(true)}
                                className="text-[10px] font-bold text-indigo-400 border border-indigo-500/30 px-6 py-2 rounded-full hover:bg-indigo-500/10 transition-colors tracking-wide animate-pulse"
                            >
                                ENTER ADMIN MODE
                            </button>
                        </div>
                    )}

                    <div className={styles.headerRight}>
                        {/* GLOBAL CONTROLS */}
                        <div className={styles.globalControls}>
                            {!isMobile && (
                                <button onClick={onToggleLang} className={styles.textBtn}>
                                    {lang === 'en' ? 'EN | AR' : 'AR | EN'}
                                </button>
                            )}
                            <button onClick={onToggleTheme} className={styles.iconBtn}>
                                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                            </button>
                        </div>

                        {/* MOBILE HAMBURGER */}
                        {isMobile && (
                            <button className={styles.mobileMenuBtn} onClick={toggleSidebar}>
                                {sidebarLocal ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        )}
                    </div>
                </header>

                <div className={styles.contentViewport}>
                    <div className={styles.contentWrapper}>
                        {children}
                    </div>
                </div>
            </main>

            {/* MOBILE BACKDROP */}
            {isMobile && sidebarLocal && (
                <div className={styles.backdrop} onClick={() => setSidebarLocal(false)} />
            )}

            {/* CONTROL SIDEBAR (Right Side) */}
            <aside className={`${styles.sidebar} ${sidebarClass}`}>

                {/* DESKTOP TOGGLE BUTTON */}
                {!isMobile && (
                    <button className={styles.sidebarToggle} onClick={toggleSidebar}>
                        {sidebarLocal ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
                    </button>
                )}

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
                            onClick={() => { onNavigate('DASHBOARD_HOME'); if (isMobile) setSidebarLocal(false); }}
                        />
                        <NavMethod
                            icon={<BookOpen size={20} />}
                            label={t.sessions}
                            active={currentView === 'DASHBOARD_HISTORY'}
                            onClick={() => { onNavigate('DASHBOARD_HISTORY'); if (isMobile) setSidebarLocal(false); }}
                        />
                        <NavMethod
                            icon={<Activity size={20} />}
                            label={t.academic_input}
                            active={currentView === 'DASHBOARD_INPUTS'}
                            onClick={() => { onNavigate('DASHBOARD_INPUTS'); if (isMobile) setSidebarLocal(false); }}
                        />
                        <NavMethod
                            icon={<Settings size={20} />}
                            label={t.settings}
                            active={currentView === 'DASHBOARD_CONFIG'}
                            onClick={() => { onNavigate('DASHBOARD_CONFIG'); if (isMobile) setSidebarLocal(false); }}
                        />

                        {/* Mobile Only: Extra Actions in Sidebar */}
                        {isMobile && !isGuest && (
                            <button
                                className={`${styles.navItem}`}
                                onClick={logout}
                                style={{ marginTop: 'auto', color: '#EF4444' }}
                            >
                                <span className={styles.navIcon}><LogOut size={20} /></span>
                                <span className={styles.navLabel}>Sign Out</span>
                            </button>
                        )}
                    </div>
                </nav>
            </aside>
            {/* AUTH MODAL OVERLAY */}
            <AuthModal
                open={authModal.isOpen}
                initialMode={authModal.mode}
                onClose={closeAuthModal}
            />

            {/* ADMIN MODE OVERLAY */}
            <AdminModeOverlay isOpen={isAdminMode} onClose={() => setAdminMode(false)} />
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

// INTERNAL COMPONENT FOR ANIMATION
import { AdminLayout } from '@/components/admin/AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';

const AdminModeOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999, // Above everything
                        background: '#020617', // Match theme
                        display: 'flex'
                    }}
                >
                    {/* EXIT BUTTON (Floating - Centered) */}
                    <button
                        onClick={onClose}
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] text-[10px] font-bold text-indigo-400 border border-indigo-500/30 px-6 py-2 rounded-full hover:bg-indigo-500/10 transition-colors tracking-wide animate-pulse bg-[#020617]"
                    >
                        EXIT ADMIN MODE
                    </button>

                    <AdminLayout />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
