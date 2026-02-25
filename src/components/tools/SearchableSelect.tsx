import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Plus, School } from 'lucide-react';

export interface SelectGroup {
    label: string;
    options: string[];
}

interface SearchableSelectProps {
    value: string;
    onChange: (value: string) => void;
    groups: SelectGroup[];
    placeholder: string;
    isRtl: boolean;
    icon?: React.ReactNode;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({ value, onChange, groups, placeholder, isRtl, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Flatten and filter options
    const filteredGroups = useMemo(() => {
        if (!searchQuery.trim()) return groups;

        const lowerQuery = searchQuery.toLowerCase();
        return groups.map(group => ({
            label: group.label,
            options: group.options.filter(opt => opt.toLowerCase().includes(lowerQuery))
        })).filter(group => group.options.length > 0);
    }, [groups, searchQuery]);

    const handleSelect = (option: string) => {
        onChange(option);
        setSearchQuery('');
        setIsOpen(false);
    };

    const handleCustomSubmit = () => {
        if (searchQuery.trim()) {
            onChange(searchQuery.trim());
            setSearchQuery('');
            setIsOpen(false);
        }
    };

    const displayValue = value || placeholder;

    return (
        <div className="relative group w-full" ref={wrapperRef} dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Input Trigger */}
            <div
                className={`w-full py-3.5 bg-[#0B1120]/60 border border-white/10 hover:border-white/20 text-sm rounded-xl cursor-pointer transition-all shadow-inner relative flex items-center justify-between
                ${isOpen ? 'border-indigo-500/80 bg-[#0B1120]/90' : ''}
                ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'}
                `}
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (!isOpen) {
                        setTimeout(() => inputRef.current?.focus(), 50);
                    }
                }}
            >
                {/* Left Icon (Absolute) */}
                <div className={`absolute top-1/2 -translate-y-1/2 text-slate-400 transition-colors ${isOpen ? 'text-indigo-400' : 'group-hover:text-slate-300'} ${isRtl ? 'right-4' : 'left-4'}`}>
                    {icon || <Search className="w-4 h-4" />}
                </div>

                <span className={`truncate ${!value ? 'text-slate-500' : 'text-white'} ${isRtl ? 'text-right block w-full' : 'text-left block w-full'}`}>
                    {displayValue}
                </span>

                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''} shrink-0 ml-2`} />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-[999] top-full left-0 right-0 mt-2 bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 flex flex-col max-h-[300px]">

                    {/* Search Input Box */}
                    <div className="p-2 border-b border-white/5 shrink-0 bg-[#0F172A]">
                        <div className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={isRtl ? "ابحث أو اكتب اسم جامعتك..." : "Search or type your university..."}
                                className={`w-full bg-[#1E293B] border border-transparent focus:border-indigo-500/50 rounded-lg py-2.5 text-sm outline-none text-white placeholder:text-slate-500 transition-colors ${isRtl ? 'pr-10 pl-3 text-right' : 'pl-10 pr-3 text-left'}`}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchQuery.trim()) {
                                        e.preventDefault();
                                        handleCustomSubmit();
                                    }
                                }}
                            />
                            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRtl ? 'right-3' : 'left-3'}`} />
                        </div>
                    </div>

                    {/* Options List */}
                    <div className="overflow-y-auto overflow-x-hidden flex-1 p-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

                        {/* Custom Entry Option */}
                        {searchQuery.trim() && filteredGroups.length === 0 && (
                            <button
                                type="button"
                                onClick={handleCustomSubmit}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm text-indigo-400 hover:bg-indigo-500/10 flex items-center gap-2 ${isRtl ? 'text-right' : 'text-left'}`}
                            >
                                <Plus className="w-4 h-4 shrink-0" />
                                <span className="truncate">{isRtl ? `إضافة "${searchQuery}"` : `Add "${searchQuery}"`}</span>
                            </button>
                        )}

                        {/* Grouped Options */}
                        {filteredGroups.map((group, groupIdx) => (
                            <div key={group.label} className="mb-2 last:mb-0">
                                <div className={`px-3 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider sticky top-0 bg-[#0F172A]/90 backdrop-blur-sm z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
                                    {group.label}
                                </div>
                                {group.options.map((opt, optIdx) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => handleSelect(opt)}
                                        className={`w-full px-3 py-2.5 text-sm rounded-lg hover:bg-white/5 transition-colors flex items-center
                                            ${value === opt ? 'bg-indigo-500/10 text-indigo-400 font-medium' : 'text-slate-300'}
                                            ${isRtl ? 'text-right pl-3 pr-4' : 'text-left pr-3 pl-4'}`}
                                    >
                                        <span className="truncate relative">
                                            {opt}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ))}

                    </div>
                </div>
            )}
        </div>
    );
};
