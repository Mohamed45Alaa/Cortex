import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '@/core/types';
import { X, Calendar, User, Clock, Shield, CheckCircle2, AlertCircle, AlertTriangle, PlayCircle, StopCircle, RefreshCcw, Trash2, School, Phone, BookOpen, PenLine, Save, Loader2, Check } from 'lucide-react';
import { AdminService } from '@/core/services/AdminService';
import { universities } from '@/config/universities';
import { faculties } from '@/config/faculties';

interface StudentInspectorProps {
    student: UserProfile | null;
    onClose: () => void;
}

export const StudentInspector = ({ student, onClose }: StudentInspectorProps) => {
    // EDIT STATE
    const [isEditing, setIsEditing] = useState(false);
    // Ensure we capture 'phone' from identity if strictly separate, but UserProfile now has phone.
    // However, AdminService returns a flattened profile usually.
    const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
    const [saveStatus, setSaveStatus] = useState<'IDLE' | 'SAVING' | 'SUCCESS' | 'ERROR'>('IDLE');

    // Sync Edit Form on Open
    useEffect(() => {
        if (student) {
            setEditForm({
                name: student.name || '',
                // Fallback to identity phone if root phone missing (Legacy/Hybrid compat)
                phone: student.phone || (student.identity as any)?.phone || '',
                university: student.university || '',
                faculty: student.faculty || '',
                academicYear: student.academicYear || 'Year 1'
            });
            setIsEditing(false);
            setSaveStatus('IDLE');
        }
    }, [student]);

    // CHECK FOR CHANGES
    const hasChanges = () => {
        if (!student) return false;
        return (
            editForm.name !== student.name ||
            editForm.phone !== (student.phone || (student.identity as any)?.phone || '') ||
            editForm.university !== student.university ||
            editForm.faculty !== student.faculty ||
            editForm.academicYear !== student.academicYear
        );
    };

    const handleSaveProfile = async () => {
        if (!student || !hasChanges()) return;
        setSaveStatus('SAVING');

        const updates = {
            name: editForm.name,
            fullName: editForm.name, // Sync display name to full name for consistency
            phone: editForm.phone,
            university: editForm.university,
            faculty: editForm.faculty,
            academicYear: editForm.academicYear
        };

        const result = await AdminService.updateStudentProfile(student.id, updates);

        if (result.success) {
            setSaveStatus('SUCCESS');
            // Optimistic update of parent prop usually requires parent refresh, 
            // but for now we rely on the component re-rendering via parent list update or local feedback.
            setIsEditing(false);
            setTimeout(() => setSaveStatus('IDLE'), 2000);
        } else {
            console.error(result.error);
            setSaveStatus('ERROR');
            setTimeout(() => setSaveStatus('IDLE'), 3000);
        }
    };

    const [confirmModal, setConfirmModal] = useState<{
        open: boolean;
        type: 'FORCE_END' | 'RESET' | 'DELETE' | null;
        action?: () => Promise<void>;
    }>({ open: false, type: null });

    const handleAction = async () => {
        if (!confirmModal.action) return;
        await confirmModal.action();
        setConfirmModal({ ...confirmModal, open: false });
        onClose(); // Close inspector after drastic action (optional, but cleaner for Delete/Reset)
    };

    // ACTION HANDLERS
    const requestForceEnd = () => {
        setConfirmModal({
            open: true,
            type: 'FORCE_END',
            action: async () => {
                if (student?.id) await AdminService.forceEndSession(student.id);
            }
        });
    };

    const requestReset = () => {
        setConfirmModal({
            open: true,
            type: 'RESET',
            action: async () => {
                if (student?.id) await AdminService.resetStudent(student.id);
            }
        });
    };

    const requestDelete = () => {
        setConfirmModal({
            open: true,
            type: 'DELETE',
            action: async () => {
                if (student?.id) await AdminService.deleteStudent(student.id);
            }
        });
    };

    return (
        <AnimatePresence>
            {student && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[9999]"
                    />

                    {/* SLIDE-OVER PANEL */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-[10000] w-full max-w-md bg-[#0F172A] border-l border-white/5 shadow-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col"
                    >
                        {/* HEADER */}
                        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-[#0F172A]/90 backdrop-blur-md border-b border-white/5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] ${student.study?.sessionActive ? 'bg-indigo-500 shadow-indigo-500/50' : 'bg-emerald-500'}`}></span>
                                    {isEditing ? 'Editing Profile' : 'Student Profile'}
                                </h2>
                                {/* SAVE STATUS BADGE */}
                                {saveStatus === 'SAVING' && <span className="text-xs text-indigo-400 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Saving...</span>}
                                {saveStatus === 'SUCCESS' && <span className="text-xs text-emerald-400 flex items-center gap-1"><Check size={12} /> Saved</span>}
                            </div>

                            <div className="flex items-center gap-2">
                                {/* EDIT TOGGLE */}
                                <button
                                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                                    disabled={isEditing && (!hasChanges() || saveStatus === 'SAVING')}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isEditing
                                        ? hasChanges()
                                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' // Active Save
                                            : 'bg-slate-800 text-slate-500 cursor-not-allowed' // Disabled Save
                                        : 'bg-white/5 hover:bg-white/10 text-slate-300' // Edit Button
                                        }`}
                                >
                                    {isEditing ? (
                                        <>
                                            {saveStatus === 'SAVING' ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                            Save Changes
                                        </>
                                    ) : (
                                        <>
                                            <PenLine size={14} />
                                            Edit
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => {
                                        if (isEditing) {
                                            setIsEditing(false); // Cancel Edit
                                            setEditForm({}); // Reset
                                        } else {
                                            onClose();
                                        }
                                    }}
                                    className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="p-6 space-y-8 flex-1">

                            {/* IDENTITY SECTION */}
                            <div className="flex flex-col items-center text-center space-y-4 pb-6 border-b border-white/5 transition-all">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg relative shrink-0">
                                    {student.name?.charAt(0)?.toUpperCase() || '?'}
                                    <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-[#0F172A] ${(student as any).dotColor === 'green' ? 'bg-emerald-500' : (student as any).dotColor === 'blue' ? 'bg-blue-500' : (student as any).dotColor === 'purple' ? 'bg-purple-500' : (student as any).dotColor === 'red' ? 'bg-red-500' : 'bg-slate-500'}`}></div>
                                </div>
                                <div className="w-full space-y-2">
                                    {isEditing ? (
                                        <div className="space-y-3 animate-in fade-in slide-in-from-top-1">
                                            {/* Name Edit */}
                                            <div className="relative group max-w-xs mx-auto">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><User size={14} /></div>
                                                <input
                                                    type="text"
                                                    value={editForm.name}
                                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                    className="w-full bg-slate-900 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-center text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                                                    placeholder="Full Name"
                                                />
                                            </div>
                                            {/* Phone Edit */}
                                            <div className="relative group max-w-xs mx-auto">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><Phone size={14} /></div>
                                                <input
                                                    type="tel"
                                                    value={editForm.phone}
                                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                                    className="w-full bg-slate-900 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-center text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                                                    placeholder="Phone Number"
                                                />
                                            </div>
                                            {/* Email Read Only */}
                                            <div className="text-xs text-slate-500 font-mono bg-slate-900/50 py-1 px-3 rounded inline-block">
                                                {student.email} (Read-Only)
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="text-xl font-semibold text-white">{student.name}</h3>
                                            <div className="flex flex-col items-center gap-1 text-slate-400">
                                                <p className="text-sm">{student.email}</p>
                                                {/* Show Phone if exists */}
                                                {(student.phone || (student.identity as any)?.phone) && (
                                                    <p className="text-xs flex items-center gap-1 text-slate-500">
                                                        <Phone size={10} /> {student.phone || (student.identity as any)?.phone}
                                                    </p>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                                {!isEditing && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                        <Shield size={12} />
                                        {student.role}
                                    </span>
                                )}
                            </div>

                            {/* ACTIVE SESSION CONTROL (SECTION 3) */}
                            {student.study?.sessionActive ? (
                                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                                            <PlayCircle size={16} className="animate-pulse" />
                                            Active Session
                                        </div>
                                        <div className="text-xs font-mono text-indigo-300/70">
                                            Running
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-white">
                                            {/* We rely on what we have in metadata or show generic */}
                                            Study Session
                                        </div>
                                        {student.study.startTime && (
                                            <div className="text-xs text-indigo-200/50">
                                                Started: {new Date(student.study.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={requestForceEnd}
                                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                                    >
                                        <StopCircle size={14} />
                                        Force End Session
                                    </button>
                                </div>
                            ) : (
                                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-center text-slate-500 text-xs italic">
                                    No active session
                                </div>
                            )}

                            {/* ACADEMIC CONTEXT */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Academic Context</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex flex-col gap-1 col-span-2 relative">
                                        <span className="text-slate-500 text-xs flex items-center gap-1"><School size={12} /> University & Faculty</span>
                                        {isEditing ? (
                                            <div className="flex flex-col gap-3 mt-1">
                                                {/* University Select */}
                                                <select
                                                    value={editForm.university}
                                                    onChange={(e) => setEditForm({ ...editForm, university: e.target.value })}
                                                    className="bg-slate-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                                                >
                                                    <option value="" disabled>Select University</option>
                                                    {universities.government.map(u => <option key={u} value={u}>{u}</option>)}
                                                    {universities.private.map(u => <option key={u} value={u}>{u}</option>)}
                                                    {universities.national.map(u => <option key={u} value={u}>{u}</option>)}
                                                    <option value="Other">Other</option>
                                                </select>

                                                {/* Faculty Select */}
                                                <select
                                                    value={editForm.faculty}
                                                    onChange={(e) => setEditForm({ ...editForm, faculty: e.target.value })}
                                                    className="bg-slate-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                                                >
                                                    <option value="" disabled>Select Faculty</option>
                                                    {faculties.map(f => <option key={f} value={f}>{f}</option>)}
                                                </select>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col">
                                                <span className="text-slate-200 font-medium">{student.university || "N/A"}</span>
                                                <span className="text-slate-400 text-xs">{student.faculty || "N/A"}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex flex-col gap-1">
                                        <span className="text-slate-500 text-xs flex items-center gap-1"><Calendar size={12} /> Year</span>
                                        {isEditing ? (
                                            <select
                                                value={editForm.academicYear}
                                                onChange={(e) => setEditForm({ ...editForm, academicYear: e.target.value as any })}
                                                className="bg-slate-950 border border-white/10 rounded-lg py-1 px-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 mt-1"
                                            >
                                                <option value="Year 1">Year 1</option>
                                                <option value="Year 2">Year 2</option>
                                                <option value="Year 3">Year 3</option>
                                                <option value="Year 4">Year 4</option>
                                                <option value="Year 5">Year 5</option>
                                                <option value="Graduated">Graduated</option>
                                            </select>
                                        ) : (
                                            <span className="text-slate-200 font-medium">{student.academicYear || "N/A"}</span>
                                        )}
                                    </div>

                                    <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex flex-col gap-1">
                                        <span className="text-slate-500 text-xs flex items-center gap-1"><CheckCircle2 size={12} /> Status</span>
                                        <span className={student.completed ? "text-emerald-400 font-medium" : "text-rose-400 font-medium"}>
                                            {student.completed ? "Active" : "Incomplete"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* SYSTEM METADATA */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">System Metadata</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/30 border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded bg-slate-800 text-slate-400"><User size={14} /></div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-slate-500">User ID</span>
                                                <span className="text-xs font-mono text-slate-300">{student.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/30 border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded bg-slate-800 text-slate-400"><Clock size={14} /></div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-slate-500">Joined</span>
                                                <span className="text-xs text-slate-300 font-mono">
                                                    {(() => {
                                                        const raw = student.createdAt || (student as any).joinedAt || (student as any).profile?.createdAt;
                                                        if (!raw) return "Unknown";
                                                        const d = new Date(raw);
                                                        // STRICT EU FORMAT: DD/MM/YYYY
                                                        const day = String(d.getDate()).padStart(2, '0');
                                                        const month = String(d.getMonth() + 1).padStart(2, '0');
                                                        const year = d.getFullYear();
                                                        return `${day}/${month}/${year}`;
                                                    })()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ACCOUNT CONTROL (SECTIONS 1 & 2) */}
                            <div className="pt-8 mt-4 border-t border-white/5 space-y-3">
                                <h4 className="text-xs font-bold text-rose-500/50 uppercase tracking-widest pl-1 mb-4">Danger Zone</h4>

                                <button
                                    onClick={requestReset}
                                    className="w-full py-3 px-4 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 text-amber-500 text-sm font-medium transition-colors border border-amber-500/20 flex items-center justify-center gap-2"
                                >
                                    <RefreshCcw size={16} />
                                    Reset Student Data
                                </button>

                                <button
                                    onClick={requestDelete}
                                    className="w-full py-3 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-sm font-bold transition-colors border border-rose-500/20 flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    Delete Account Permanently
                                </button>
                            </div>

                        </div>
                    </motion.div>

                    {/* CONFIRMATION MODAL */}
                    {confirmModal.open && (
                        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setConfirmModal({ ...confirmModal, open: false })} />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative bg-[#0F172A] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4"
                            >
                                <div className="flex items-center gap-3 text-white">
                                    <div className={`p-3 rounded-full ${confirmModal.type === 'DELETE' ? 'bg-rose-500/20 text-rose-500' : 'bg-amber-500/20 text-amber-500'}`}>
                                        <AlertTriangle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {confirmModal.type === 'DELETE' ? 'Delete Account' : confirmModal.type === 'RESET' ? 'Reset Data' : 'End Session'}
                                        </h3>
                                        <p className="text-xs text-slate-400">Action Required</p>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {confirmModal.type === 'DELETE'
                                        ? "Are you sure you want to permanently delete this account? This will wipe all Firestore and Realtime data. This action cannot be undone."
                                        : confirmModal.type === 'RESET'
                                            ? "This will erase all study data, metrics, and progress, but preserve the account login. The student will start fresh."
                                            : "Are you sure you want to force end this active session? This will stop the timer immediately."
                                    }
                                </p>

                                <div className="p-3 rounded-lg bg-slate-900 border border-white/5 space-y-1">
                                    <div className="text-xs text-slate-500">Target User</div>
                                    <div className="text-sm font-mono text-white">{student.name}</div>
                                    <div className="text-xs font-mono text-slate-500">{student.email}</div>
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <button
                                        onClick={() => setConfirmModal({ ...confirmModal, open: false })}
                                        className="flex-1 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAction}
                                        className={`flex-1 py-2.5 rounded-lg text-white text-sm font-bold transition-colors ${confirmModal.type === 'DELETE' ? 'bg-rose-600 hover:bg-rose-500' :
                                            confirmModal.type === 'RESET' ? 'bg-amber-600 hover:bg-amber-500' :
                                                'bg-indigo-600 hover:bg-indigo-500'
                                            }`}
                                    >
                                        {confirmModal.type === 'DELETE' ? 'Delete Permanently' : 'Confirm'}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </>
            )}
        </AnimatePresence>
    );
};
