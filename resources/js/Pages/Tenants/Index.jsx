import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Spinner, ConfirmModal, EmptyState, Pagination, Toast, useDebounce, StatusBadge, FilterChips } from '@/Components/UI';
import {
    PlusIcon, MagnifyingGlassIcon, PhoneIcon,
    EnvelopeIcon, CalendarIcon, CheckCircleIcon,
    ExclamationCircleIcon, ClockIcon, BuildingOfficeIcon,
    KeyIcon, PencilIcon, TrashIcon, CameraIcon, StarIcon,
    DocumentTextIcon, ShieldCheckIcon, ChatBubbleLeftIcon,
    BanknotesIcon,
} from '@heroicons/react/24/outline';

export default function Index({ tenants = [] }) {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [toast, setToast] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedTenant, setSelectedTenant] = useState(null);
    const [showPaymentHistory, setShowPaymentHistory] = useState(false);
    const [showCommLog, setShowCommLog] = useState(false);
    const debouncedSearch = useDebounce(searchTerm, 300);

    // Support both raw arrays and Laravel Paginator objects
    const allTenants = Array.isArray(tenants) ? tenants : (tenants?.data ?? []);

    const filtered = allTenants.filter(t => {
        const tenantName = t.full_name ?? t.name ?? '';
        const tenantEmail = t.email ?? '';
        const tenantPhone = t.phone ?? '';
        const tenantBuilding = typeof t.building === 'object' ? (t.building?.name ?? '') : (t.building ?? '');
        const tenantUnit = typeof t.unit === 'object' ? (t.unit?.number ?? t.unit?.name ?? '') : (t.unit ?? '');

        const matchesSearch = 
            tenantName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            tenantEmail.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            tenantPhone.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            tenantBuilding.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            tenantUnit.toLowerCase().includes(debouncedSearch.toLowerCase());

        const statusStr = (t.status ?? 'active').toLowerCase();
        const paymentStatusStr = (t.payment_status ?? 'n/a').toLowerCase();
        const filterStr = activeFilter.toLowerCase();

        const matchesFilter = activeFilter === 'All' || statusStr === filterStr || paymentStatusStr === filterStr;

        return matchesSearch && matchesFilter;
    });

    const perPage = 6;
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    // Computed Stats
    const activeTenantsCount = allTenants.filter(t => (t.status ?? 'active').toLowerCase() === 'active').length;
    const overdueCount = allTenants.filter(t => (t.payment_status ?? '').toLowerCase() === 'overdue').length;
    const totalRevenue = allTenants
        .filter(t => (t.status ?? 'active').toLowerCase() === 'active')
        .reduce((sum, t) => sum + (Number(t.monthly_rent) || 0), 0);
    const avgRating = allTenants.length > 0
        ? (allTenants.reduce((sum, t) => sum + (Number(t.rating) || 5.0), 0) / allTenants.length).toFixed(1)
        : '5.0';

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        if (!deleteId) return;
        router.delete(`/tenants/${deleteId}`, {
            onSuccess: () => {
                setShowDelete(false);
                setToast({ message: 'Tenant deleted successfully!', type: 'success' });
                setTimeout(() => setToast(null), 3000);
            },
            onError: () => {
                setShowDelete(false);
                setToast({ message: 'Failed to delete tenant.', type: 'error' });
            }
        });
    };

    const getPaymentColor = (status) => {
        switch ((status ?? '').toLowerCase()) {
            case 'paid': return 'bg-rc-teal/10 text-rc-teal';
            case 'pending': return 'bg-rc-orange/10 text-rc-orange';
            case 'overdue': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    if (loading) {
        return (
            <AuthenticatedLayout>
                <Head title="Tenants" />
                <Spinner />
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Tenants" />
            
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <ConfirmModal 
                show={showDelete} 
                onClose={() => setShowDelete(false)} 
                onConfirm={confirmDelete} 
                title={
                    (() => {
                        const target = allTenants.find(t => t.id === deleteId);
                        return target ? (target.full_name ?? target.name) : 'Delete Tenant';
                    })()
                } 
            />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Tenants</h1>
                        <p className="text-gray-500 mt-1">Manage your tenants and active leases</p>
                    </div>
                    <div className="flex gap-3">
                        <Link 
                            href="/tenants/create" 
                            className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark transition-colors flex items-center"
                        >
                            <PlusIcon className="h-5 w-5 mr-1" /> Add Tenant
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-teal shadow-sm">
                        <p className="text-sm text-gray-500">Active Tenants</p>
                        <p className="text-2xl font-bold text-rc-teal">{activeTenantsCount}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange shadow-sm">
                        <p className="text-sm text-gray-500">Overdue Payments</p>
                        <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-dark shadow-sm">
                        <p className="text-sm text-gray-500">Avg Rating</p>
                        <p className="text-2xl font-bold text-rc-dark">⭐ {avgRating}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange shadow-sm">
                        <p className="text-sm text-gray-500">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-rc-orange">₱{totalRevenue.toLocaleString()}</p>
                    </div>
                </div>

                {/* Filters */}
                <FilterChips 
                    filters={['All', 'Active', 'Viewing', 'Paid', 'Pending', 'Overdue']} 
                    activeFilter={activeFilter} 
                    onFilterChange={setActiveFilter} 
                />

                {/* Search */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search tenants by name, email, phone, or unit..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-rc-orange focus:border-rc-orange" 
                        />
                    </div>
                </div>

                {/* Tenant Cards */}
                {paginated.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginated.map((tenant) => {
                                const tenantName = tenant.full_name ?? tenant.name ?? 'Unnamed Tenant';
                                const buildingName = typeof tenant.building === 'object' ? tenant.building?.name : (tenant.building ?? 'Unassigned');
                                const unitName = typeof tenant.unit === 'object' ? (tenant.unit?.number ?? tenant.unit?.name) : (tenant.unit ?? 'Unassigned');
                                const monthlyRent = Number(tenant.monthly_rent ?? 0);
                                const rating = Number(tenant.rating ?? 5.0);
                                const bgCheck = tenant.background_check ?? 'Pending';
                                const docsCompleted = tenant.documents_completed ?? false;
                                const daysLeft = tenant.days_left ?? 0;
                                const paymentHistory = Array.isArray(tenant.payment_history) ? tenant.payment_history : [];
                                const commLog = Array.isArray(tenant.communication_log) ? tenant.communication_log : [];

                                return (
                                    <div key={tenant.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border-t-4 border-rc-teal">
                                        <div className="p-6">
                                            {/* Header */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center">
                                                    <div className="relative">
                                                        <div className="h-14 w-14 bg-gradient-to-br from-rc-orange to-rc-teal rounded-full flex items-center justify-center text-white font-bold text-xl uppercase">
                                                            {tenantName.charAt(0)}
                                                        </div>
                                                        <button className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow hover:bg-gray-50">
                                                            <CameraIcon className="h-3 w-3 text-rc-teal" />
                                                        </button>
                                                    </div>
                                                    <div className="ml-3">
                                                        <h3 className="text-lg font-semibold text-rc-dark">{tenantName}</h3>
                                                        <div className="flex items-center gap-1 mt-1">
                                                            <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                            <span className="text-sm text-gray-600 font-medium">{rating.toFixed(1)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <StatusBadge status={tenant.status ?? 'active'} />
                                            </div>

                                            {/* Contact & Location Info */}
                                            <div className="mt-4 space-y-2 text-sm">
                                                {tenant.email && (
                                                    <p className="flex items-center text-gray-600 truncate">
                                                        <EnvelopeIcon className="h-4 w-4 mr-2 text-rc-teal shrink-0" /> {tenant.email}
                                                    </p>
                                                )}
                                                {tenant.phone && (
                                                    <p className="flex items-center text-gray-600">
                                                        <PhoneIcon className="h-4 w-4 mr-2 text-rc-teal shrink-0" /> {tenant.phone}
                                                    </p>
                                                )}
                                                <p className="flex items-center text-gray-600">
                                                    <BuildingOfficeIcon className="h-4 w-4 mr-2 text-rc-orange shrink-0" /> {buildingName}
                                                </p>
                                                <p className="flex items-center text-gray-600">
                                                    <KeyIcon className="h-4 w-4 mr-2 text-rc-orange shrink-0" /> {unitName}
                                                </p>
                                            </div>

                                            {/* Emergency Contact */}
                                            {tenant.emergency_contact && (
                                                <div className="mt-3 p-2 bg-rc-light rounded-lg">
                                                    <p className="text-xs text-gray-500">Emergency Contact</p>
                                                    <p className="text-sm text-rc-dark font-medium">{tenant.emergency_contact}</p>
                                                </div>
                                            )}

                                            {/* Background Check */}
                                            <div className={`mt-3 p-2 rounded-lg text-xs flex items-center ${
                                                bgCheck === 'Passed' ? 'bg-rc-teal/10 text-rc-teal' : 
                                                bgCheck === 'Pending' ? 'bg-rc-orange/10 text-rc-orange' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                <ShieldCheckIcon className="h-4 w-4 mr-2 shrink-0" />
                                                Background Check: {bgCheck}
                                            </div>

                                            {/* Documents Status */}
                                            <div className={`mt-2 p-2 rounded-lg text-xs flex items-center ${
                                                docsCompleted ? 'bg-rc-teal/10 text-rc-teal' : 'bg-rc-orange/10 text-rc-orange'
                                            }`}>
                                                <DocumentTextIcon className="h-4 w-4 mr-2 shrink-0" />
                                                {docsCompleted ? 'All documents completed' : 'Documents pending'}
                                            </div>

                                            {/* Rent & Payment */}
                                            <div className="mt-4 grid grid-cols-2 gap-3">
                                                <div className="bg-rc-light rounded-lg p-3">
                                                    <p className="text-xs text-gray-500">Monthly Rent</p>
                                                    <p className="text-lg font-bold text-rc-orange">₱{monthlyRent.toLocaleString()}</p>
                                                </div>
                                                <div className="bg-rc-light rounded-lg p-3">
                                                    <p className="text-xs text-gray-500">Payment Status</p>
                                                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getPaymentColor(tenant.payment_status)}`}>
                                                        {tenant.payment_status ?? 'N/A'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Lease Countdown */}
                                            <div className="mt-4 p-3 bg-rc-light rounded-lg">
                                                {daysLeft > 0 ? (
                                                    <p className="text-sm text-rc-teal font-medium">⏳ {daysLeft} days until rent due</p>
                                                ) : daysLeft < 0 ? (
                                                    <p className="text-sm text-red-600 font-medium">⚠️ {Math.abs(daysLeft)} days overdue</p>
                                                ) : (
                                                    <p className="text-sm text-gray-500">No active lease timeline</p>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                                <div className="flex gap-1">
                                                    <button 
                                                        onClick={() => { setSelectedTenant(tenant); setShowPaymentHistory(true); }} 
                                                        className="p-2 text-gray-400 hover:text-rc-teal transition-colors" 
                                                        title="Payment History"
                                                    >
                                                        <BanknotesIcon className="h-4 w-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => { setSelectedTenant(tenant); setShowCommLog(true); }} 
                                                        className="p-2 text-gray-400 hover:text-rc-orange transition-colors" 
                                                        title="Communication Log"
                                                    >
                                                        <ChatBubbleLeftIcon className="h-4 w-4" />
                                                    </button>
                                                    <Link 
                                                        href={`/tenants/${tenant.id}/edit`} 
                                                        className="p-2 text-gray-400 hover:text-rc-dark transition-colors" 
                                                        title="Edit Tenant"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(tenant.id)} 
                                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors" 
                                                        title="Delete"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => { setSelectedTenant(tenant); setShowPaymentHistory(false); setShowCommLog(false); }} 
                                                    className="text-sm font-medium text-rc-teal hover:text-rc-orange transition-colors"
                                                >
                                                    View Profile →
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {totalPages > 1 && (
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        )}
                    </>
                ) : (
                    <EmptyState icon="👥" title="No tenants found" description="Try adjusting your search terms or active filters." />
                )}

                {/* Tenant Detail Profile Modal */}
                {selectedTenant && !showPaymentHistory && !showCommLog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setSelectedTenant(null)} />
                        <div className="bg-white rounded-xl max-w-lg w-full z-10 overflow-hidden shadow-2xl">
                            <div className="bg-gradient-to-r from-rc-teal to-rc-dark p-6 flex justify-between items-start">
                                <div className="flex items-center">
                                    <div className="h-12 w-12 bg-rc-orange rounded-full flex items-center justify-center text-white font-bold text-xl uppercase">
                                        {(selectedTenant.full_name ?? selectedTenant.name ?? 'T').charAt(0)}
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-xl font-bold text-white">{selectedTenant.full_name ?? selectedTenant.name}</h3>
                                        <p className="text-xs text-gray-200 capitalize">{selectedTenant.status ?? 'Active'}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedTenant(null)} className="text-white/70 hover:text-white text-lg">✕</button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="bg-rc-light p-3 rounded-lg">
                                        <p className="text-xs text-gray-500">Lease Start</p>
                                        <p className="font-semibold text-rc-dark">{selectedTenant.lease_start ?? 'N/A'}</p>
                                    </div>
                                    <div className="bg-rc-light p-3 rounded-lg">
                                        <p className="text-xs text-gray-500">Lease End</p>
                                        <p className="font-semibold text-rc-dark">{selectedTenant.lease_end ?? 'N/A'}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowPaymentHistory(true)} 
                                    className="w-full py-2.5 bg-rc-orange text-white font-medium rounded-lg hover:bg-rc-orangeDark transition-colors flex items-center justify-center gap-2"
                                >
                                    <BanknotesIcon className="h-5 w-5" /> View Payment History
                                </button>
                                <button 
                                    onClick={() => setShowCommLog(true)} 
                                    className="w-full py-2.5 bg-rc-teal text-white font-medium rounded-lg hover:bg-rc-tealLight transition-colors flex items-center justify-center gap-2"
                                >
                                    <ChatBubbleLeftIcon className="h-5 w-5" /> View Communication Log
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payment History Modal */}
                {showPaymentHistory && selectedTenant && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowPaymentHistory(false)} />
                        <div className="bg-white rounded-xl max-w-md w-full z-10 p-6 shadow-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-rc-dark">
                                    Payment History - {selectedTenant.full_name ?? selectedTenant.name}
                                </h3>
                                <button onClick={() => setShowPaymentHistory(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                            </div>
                            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                                {(selectedTenant.payment_history ?? []).length > 0 ? (
                                    selectedTenant.payment_history.map((payment, i) => (
                                        <div key={i} className="flex justify-between items-center p-3 bg-rc-light rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-rc-dark">{payment.month ?? payment.period}</p>
                                                <p className="text-xs text-gray-500">{payment.date ?? 'N/A'}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-rc-dark">₱{Number(payment.amount || 0).toLocaleString()}</p>
                                                <span className={`text-xs font-semibold capitalize ${
                                                    payment.status === 'paid' ? 'text-rc-teal' : payment.status === 'late' ? 'text-rc-orange' : 'text-red-600'
                                                }`}>
                                                    {payment.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-6">No payment records found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Communication Log Modal */}
                {showCommLog && selectedTenant && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowCommLog(false)} />
                        <div className="bg-white rounded-xl max-w-md w-full z-10 p-6 shadow-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-rc-dark">
                                    Communication Log - {selectedTenant.full_name ?? selectedTenant.name}
                                </h3>
                                <button onClick={() => setShowCommLog(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                            </div>
                            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                                {(selectedTenant.communication_log ?? []).length > 0 ? (
                                    selectedTenant.communication_log.map((log, i) => (
                                        <div key={i} className="p-3 bg-rc-light rounded-lg space-y-1">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-semibold text-rc-teal">{log.type}</span>
                                                <span className="text-gray-400">{log.date}</span>
                                            </div>
                                            <p className="text-sm text-rc-dark">{log.message}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-6">No communication records found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}