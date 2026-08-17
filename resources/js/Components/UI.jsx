import { useState, useEffect } from 'react';

// Loading Spinner
export const Spinner = () => (
    <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rc-orange"></div>
    </div>
);

// Skeleton Loader
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

// Toast Notification
export const Toast = ({ message, type, onClose }) => (
    <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${type === 'success' ? 'bg-rc-teal' : type === 'error' ? 'bg-red-600' : 'bg-rc-orange'} text-white flex items-center gap-2 animate-slide-in`}>
        <span>{type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}</span>
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70">✕</button>
    </div>
);

// Delete Confirmation Modal
export const ConfirmModal = ({ show, onClose, onConfirm, title }) => (
    show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 z-10 border-t-4 border-red-600">
                <h3 className="text-lg font-semibold text-rc-dark">Confirm Delete</h3>
                <p className="text-gray-500 mt-2">Are you sure you want to delete "{title}"? This action cannot be undone.</p>
                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 px-4 py-2 bg-gray-200 text-rc-dark rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
                </div>
            </div>
        </div>
    )
);

// Empty State
export const EmptyState = ({ icon, title, description, action }) => (
    <div className="text-center py-16">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-rc-dark">{title}</h3>
        <p className="text-gray-500 mt-1">{description}</p>
        {action && <div className="mt-4">{action}</div>}
    </div>
);

// Pagination
export const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex gap-2 justify-center mt-6">
        <button 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-white border border-gray-200 disabled:opacity-50"
        >
            ←
        </button>
        {[...Array(totalPages)].map((_, i) => (
            <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-rc-orange text-white' : 'bg-white border border-gray-200'}`}
            >
                {i + 1}
            </button>
        ))}
        <button 
            onClick={() => onPageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-white border border-gray-200 disabled:opacity-50"
        >
            →
        </button>
    </div>
);

// Filter Chips
export const FilterChips = ({ filters, activeFilter, onFilterChange }) => (
    <div className="flex gap-2 flex-wrap">
        {filters.map(filter => (
            <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeFilter === filter ? 'bg-rc-orange text-white' : 'bg-white text-rc-dark border border-gray-200 hover:bg-rc-light'}`}
            >
                {filter}
            </button>
        ))}
    </div>
);

// Search Debounce Hook
export const useDebounce = (value, delay = 300) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
};

// Status Badge
export const StatusBadge = ({ status }) => {
    const colors = {
        active: 'bg-rc-teal/10 text-rc-teal',
        completed: 'bg-rc-teal/10 text-rc-teal',
        signed: 'bg-rc-teal/10 text-rc-teal',
        paid: 'bg-rc-teal/10 text-rc-teal',
        viewing: 'bg-rc-orange/10 text-rc-orange',
        pending: 'bg-rc-orange/10 text-rc-orange',
        maintenance: 'bg-rc-orange/10 text-rc-orange',
        overdue: 'bg-red-100 text-red-700',
        failed: 'bg-red-100 text-red-700',
        moved_out: 'bg-gray-100 text-gray-600',
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-500'}`}>
            {status}
        </span>
    );
};