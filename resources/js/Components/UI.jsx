import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, router } from '@inertiajs/react';
import { BellIcon, MagnifyingGlassIcon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';

// ============ LOADING ============
export const Spinner = () => (
    <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rc-orange"></div>
    </div>
);

export const Skeleton = ({ count = 3 }) => (
    <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
        ))}
    </div>
);

// ============ TOAST ============
export const Toast = ({ message, type, onClose }) => (
    <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg animate-slide-in ${type === 'success' ? 'bg-rc-teal' : type === 'error' ? 'bg-red-600' : 'bg-rc-orange'} text-white flex items-center gap-2`}>
        <span>{type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}</span>
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70">✕</button>
    </div>
);

// ============ CONFIRM MODAL ============
export const ConfirmModal = ({ show, onClose, onConfirm, title }) => (
    show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 z-10 border-t-4 border-red-600 animate-fade-in">
                <h3 className="text-lg font-semibold text-rc-dark">Confirm Delete</h3>
                <p className="text-gray-500 mt-2">Are you sure you want to delete "{title}"?</p>
                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
                </div>
            </div>
        </div>
    )
);

// ============ EMPTY STATE ============
export const EmptyState = ({ icon, title, description, action }) => (
    <div className="text-center py-16 animate-fade-in">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-rc-dark">{title}</h3>
        <p className="text-gray-500 mt-1">{description}</p>
        {action && <div className="mt-4">{action}</div>}
    </div>
);

// ============ PAGINATION ============
export const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex gap-2 justify-center mt-6">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded bg-white border disabled:opacity-50">←</button>
        {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => onPageChange(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-rc-orange text-white' : 'bg-white border'}`}>{i + 1}</button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 rounded bg-white border disabled:opacity-50">→</button>
    </div>
);

// ============ FILTER CHIPS ============
export const FilterChips = ({ filters, activeFilter, onFilterChange }) => (
    <div className="flex gap-2 flex-wrap">
        {filters.map(filter => (
            <button key={filter} onClick={() => onFilterChange(filter)} className={`px-3 py-1 rounded-full text-sm ${activeFilter === filter ? 'bg-rc-orange text-white' : 'bg-white border'}`}>{filter}</button>
        ))}
    </div>
);

// ============ STATUS BADGE ============
export const StatusBadge = ({ status }) => {
    const colors = {
        active: 'bg-rc-teal/10 text-rc-teal', completed: 'bg-rc-teal/10 text-rc-teal',
        signed: 'bg-rc-teal/10 text-rc-teal', paid: 'bg-rc-teal/10 text-rc-teal',
        viewing: 'bg-rc-orange/10 text-rc-orange', pending: 'bg-rc-orange/10 text-rc-orange',
        maintenance: 'bg-rc-orange/10 text-rc-orange', overdue: 'bg-red-100 text-red-700',
        failed: 'bg-red-100 text-red-700', moved_out: 'bg-gray-100 text-gray-600',
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100'}`}>{status}</span>;
};

// ============ DEBOUNCE HOOK ============
export const useDebounce = (value, delay = 300) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
};

// ============ NOTIFICATION BELL ============
export const NotificationBell = () => {
    const [open, setOpen] = useState(false);
    const notifications = [
        { id: 1, title: 'Rent due reminder sent', time: '5 min ago', read: false },
        { id: 2, title: 'New tenant onboarded', time: '1 hour ago', read: false },
        { id: 3, title: 'Maintenance completed', time: '3 hours ago', read: true },
    ];
    const unread = notifications.filter(n => !n.read).length;

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="relative p-2 text-rc-dark hover:text-rc-orange">
                <BellIcon className="h-6 w-6" />
                {unread > 0 && (
                    <span className="absolute -top-0 -right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{unread}</span>
                )}
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl z-50 animate-fade-in">
                        <div className="p-4 border-b">
                            <h3 className="font-semibold text-rc-dark">Notifications</h3>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.map(n => (
                                <div key={n.id} className={`p-4 border-b hover:bg-rc-light ${!n.read ? 'bg-rc-orange/5' : ''}`}>
                                    <p className="text-sm font-medium text-rc-dark">{n.title}</p>
                                    <p className="text-xs text-gray-500">{n.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// ============ GLOBAL SEARCH ============
export const GlobalSearch = () => {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);

    const searchResults = [
        { type: 'Building', name: 'Sunset Apartments', href: '/buildings' },
        { type: 'Tenant', name: 'John Doe', href: '/tenants' },
        { type: 'Transaction', name: 'Rent Payment', href: '/transactions' },
    ].filter(r => r.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:ring-rc-orange"
            />
            {open && query && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute mt-2 w-64 bg-white rounded-xl shadow-2xl z-50">
                        {searchResults.length > 0 ? (
                            searchResults.map((r, i) => (
                                <Link key={i} href={r.href} className="block px-4 py-2 hover:bg-rc-light">
                                    <span className="text-xs text-rc-orange">{r.type}</span>
                                    <p className="text-sm text-rc-dark">{r.name}</p>
                                </Link>
                            ))
                        ) : (
                            <p className="p-4 text-sm text-gray-500">No results</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

// ============ DARK MODE TOGGLE ============
export const DarkModeToggle = () => {
    const [dark, setDark] = useState(false);
    useEffect(() => {
        if (dark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [dark]);
    return (
        <button onClick={() => setDark(!dark)} className="p-2 text-rc-dark hover:text-rc-orange">
            {dark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </button>
    );
};

// ============ EXPORT CSV ============
export const exportToCSV = (filename, rows) => {
    const csv = rows.map(r => Object.values(r).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};

// ============ FILE UPLOAD ============
export const FileUpload = ({ onUpload }) => {
    const [dragging, setDragging] = useState(false);
    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); onUpload(e.dataTransfer.files); }}
            onClick={() => document.getElementById('file-input').click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer ${dragging ? 'border-rc-orange bg-rc-orange/5' : 'border-gray-300'}`}
        >
            <input id="file-input" type="file" className="hidden" onChange={(e) => onUpload(e.target.files)} />
            <div className="text-4xl mb-2">📁</div>
            <p className="text-rc-dark font-medium">Drop files here or click to upload</p>
            <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
        </div>
    );
};

// ============ BULK ACTIONS ============
export const BulkActions = ({ selected, onDelete, onExport }) => (
    selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-rc-dark text-white px-6 py-3 rounded-xl shadow-2xl z-40 animate-slide-up">
            <span className="text-sm">{selected.length} selected</span>
            <button onClick={onDelete} className="ml-3 text-rc-orange text-sm">Delete</button>
            <button onClick={onExport} className="ml-3 text-rc-teal text-sm">Export</button>
        </div>
    )
);

// ============ INFINITE SCROLL HOOK ============
export const useInfiniteScroll = (loadMore) => {
    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) loadMore();
        });
        if (node) observer.current.observe(node);
    }, [loadMore]);
    return lastElementRef;
};

// ============ KEYBOARD SHORTCUTS ============
export const useKeyboardShortcuts = () => {
    useEffect(() => {
        const handler = (e) => {
            if (e.ctrlKey) {
                switch(e.key) {
                    case 'b': window.location.href = '/buildings'; break;
                    case 't': window.location.href = '/tenants'; break;
                    case 'd': window.location.href = '/dashboard'; break;
                    case 'f': window.location.href = '/transactions'; break;
                }
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);
};