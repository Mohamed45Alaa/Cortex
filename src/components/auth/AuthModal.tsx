import React, { useState, useEffect } from 'react';
import { createPortal } from "react-dom";
import { useStore } from '@/store/useStore';
import { isConfigValid } from '@/core/services/firebase';
import { X, ArrowRight, User, Mail, Lock, ShieldCheck, BookOpen } from 'lucide-react';
import styles from "./AuthModal.module.css";

// Interface matches what the UI needs, but we also integrate logic
interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    onGoogleSignIn?: () => void;
    onEmailSignIn?: () => void;
    initialMode?: 'LOGIN' | 'REGISTER';
}

type Mode = 'LOGIN' | 'EMAIL_LOGIN' | 'REG_IDENTITY' | 'REG_PROFILE' | 'REG_INIT';

export const AuthModal: React.FC<AuthModalProps> = ({
    open,
    onClose,
    onGoogleSignIn,
    onEmailSignIn,
    initialMode = 'LOGIN'
}) => {
    const { login, loginWithGoogle, register, authModal } = useStore();
    const [mode, setMode] = useState<Mode>(initialMode === 'REGISTER' ? 'REG_IDENTITY' : 'LOGIN');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [configValid, setConfigValid] = useState(true);

    // Ensure Client-Side Rendering for Portal
    useEffect(() => {
        setMounted(true);
        setConfigValid(isConfigValid());
        return () => setMounted(false);
    }, []);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [university, setUniversity] = useState('');
    const [faculty, setFaculty] = useState('');


    const handleGoogleLogin = async () => {
        if (!configValid) return; // Prevent action if config is invalid

        if (onGoogleSignIn) {
            onGoogleSignIn();
            return;
        }

        setIsLoading(true);
        setError(null);

        // 2. Call Store Action (Firebase handles Popup)
        const result = await loginWithGoogle();

        setIsLoading(false);
        if (result.success) {
            if (authModal.onSuccess) authModal.onSuccess();
            onClose();
        } else {
            // Show the actual error bubbling up from Service/Firebase
            // NOTE: AuthService error throwing is caught in store which returns {success: false, error: ...}
            setError(result.error || "Google connection failed. Check console.");
        }
    };

    const handleLogin = async () => {
        setIsLoading(true);
        setError(null);
        const success = await login(email, password);
        setIsLoading(false);
        if (success) {
            if (authModal.onSuccess) authModal.onSuccess();
            onClose();
        } else {
            setError("Invalid credentials. Please try again.");
        }
    };

    const handleRegister = async () => {
        setIsLoading(true);
        setError(null);
        // Simulate Init Step
        setMode('REG_INIT');

        const success = await register(
            { email, password },
            { name, university, faculty }
        );

        setIsLoading(false);
        if (success) {
            if (authModal.onSuccess) authModal.onSuccess();
            onClose();
        } else {
            setMode('REG_PROFILE');
            setError("Registration failed. Please try again.");
        }
    };

    // --- RENDER HELPERS ---

    const Input = ({ label, type, value, onChange, placeholder, icon: Icon }: any) => (
        <div className={styles.inputGroup}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputWrapper}>
                <input
                    type={type}
                    className={styles.input}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
                <Icon className={styles.inputIcon} size={18} />
            </div>
        </div>
    );

    if (!mounted || !open) return null;

    const handleEmailClick = () => {
        if (onEmailSignIn) {
            onEmailSignIn();
        } else {
            setMode('EMAIL_LOGIN');
        }
    };

    return createPortal(
        <div className={styles.backdrop}>
            {/* Modal */}
            <div className={styles.modal}>

                <button onClick={onClose} className={styles.close}>
                    <X size={20} />
                </button>

                {mode === 'LOGIN' && (
                    <>
                        <h2 className={styles.title}>Welcome back</h2>
                        <p className={styles.subtitle}>Sign in to sync your neural context</p>

                        {error && <div className={styles.error}>{error}</div>}

                        <button
                            className={styles.googleBtn}
                            onClick={handleGoogleLogin}
                            disabled={isLoading || !configValid}
                            style={{
                                opacity: !configValid ? 0.5 : 1,
                                cursor: !configValid ? 'not-allowed' : 'pointer',
                                filter: !configValid ? 'grayscale(100%)' : 'none'
                            }}
                            title={!configValid ? "Firebase API keys are missing" : "Sign in with Google"}
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
                            {!configValid ? "Configuration Disabled" : (isLoading ? "Connecting..." : "Continue with Google")}
                        </button>

                        {!configValid && (
                            <div style={{
                                color: '#F87171',
                                fontSize: '0.75rem',
                                textAlign: 'center',
                                marginTop: '0.5rem',
                                padding: '0.5rem',
                                background: 'rgba(127, 29, 29, 0.2)',
                                borderRadius: '6px',
                                border: '1px solid rgba(127, 29, 29, 0.5)'
                            }}>
                                System Error: Invalid Firebase Configuration.<br />
                                Please update .env.local with real keys.
                            </div>
                        )}

                        <div className={styles.divider}>
                            <span>or</span>
                        </div>

                        <button className={styles.emailBtn} onClick={handleEmailClick}>
                            Continue with Email
                        </button>

                        <div className={styles.footerText}>
                            <button onClick={() => setMode('REG_IDENTITY')} className={styles.linkBtn}>
                                Don't have an account? Create Access
                            </button>
                        </div>
                    </>
                )}

                {mode === 'EMAIL_LOGIN' && (
                    <>
                        <button onClick={() => setMode('LOGIN')} className={styles.backBtn}>
                            <ArrowRight size={20} className="rotate-180" />
                        </button>

                        <h2 className={styles.title}>Sign in with Email</h2>
                        <p className={styles.subtitle} style={{ marginBottom: '1.5rem' }}>Enter your credentials below</p>

                        <Input label="Email Address" type="email" value={email} onChange={setEmail} placeholder="student@university.edu" icon={Mail} />
                        <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" icon={Lock} />

                        <button className={styles.primaryBtn} onClick={handleLogin} disabled={isLoading}>
                            {isLoading ? "Authenticating..." : "Sign In"}
                        </button>

                        <div className={styles.footerText} style={{ marginTop: '1.5rem' }}>
                            <button className={styles.linkBtn}>Forgot Password?</button>
                        </div>
                    </>
                )}

                {mode === 'REG_IDENTITY' && (
                    <>
                        <h2 className={styles.title}>Create Access</h2>
                        <p className={styles.subtitle}>Secure Identity setup</p>

                        <Input label="Email Address" type="email" value={email} onChange={setEmail} placeholder="student@university.edu" icon={Mail} />
                        <Input label="Set Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" icon={Lock} />

                        <button
                            className={styles.primaryBtn}
                            onClick={() => { if (email && password) setMode('REG_PROFILE') }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                            Continue
                            <ArrowRight size={16} />
                        </button>

                        <div className={styles.footerText}>
                            <button onClick={() => setMode('LOGIN')} className={styles.linkBtn}>Back to Sign In</button>
                        </div>
                    </>
                )}

                {mode === 'REG_PROFILE' && (
                    <>
                        <button onClick={() => setMode('REG_IDENTITY')} className={styles.backBtn}>
                            <ArrowRight size={20} className="rotate-180" />
                        </button>

                        <h2 className={styles.title}>Academic Profile</h2>
                        <p className={styles.subtitle}>Contextual calibration</p>

                        <Input label="Full Name" type="text" value={name} onChange={setName} placeholder="John Doe" icon={User} />
                        <Input label="University" type="text" value={university} onChange={setUniversity} placeholder="MIT" icon={BookOpen} />
                        <Input label="Faculty / Major" type="text" value={faculty} onChange={setFaculty} placeholder="Computer Science" icon={ShieldCheck} />

                        <button className={styles.primaryBtn} onClick={handleRegister} disabled={isLoading}>
                            {isLoading ? "Creating Profile..." : "Initialize System"}
                        </button>
                    </>
                )}

                {mode === 'REG_INIT' && (
                    <div className="text-center py-16">
                        <div className="animate-spin w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
                        <h3 className="text-lg font-semibold text-white mb-2">Initializing System</h3>
                        <p className="text-slate-500 text-sm">Securing workspace ledger...</p>
                    </div>
                )}

            </div>
        </div>,
        document.body
    );
};
