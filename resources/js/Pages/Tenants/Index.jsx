import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Spinner, ConfirmModal, EmptyState, Pagination, Toast, useDebounce, StatusBadge, FilterChips } from '@/Components/UI';
import {
    PlusIcon, UserGroupIcon, MagnifyingGlassIcon, PhoneIcon,
    EnvelopeIcon, HomeIcon, CalendarIcon, CurrencyDollarIcon,
    CheckCircleIcon, ExclamationCircleIcon, ClockIcon,
    BuildingOfficeIcon, KeyIcon, PencilIcon, TrashIcon,
    CameraIcon, StarIcon, DocumentTextIcon, ShieldCheckIcon,
    ChatBubbleLeftIcon, BanknotesIcon, ChevronDownIcon,
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
    const debouncedSearch = useDebounce(searchTerm, 300);

    const sampleTenants = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@email.com',
            phone: '+63 912 345 6789',
            emergency_contact: 'Jane Doe (+63 999 888 7777)',
            unit: 'Unit 101',
            building: 'Sunset Apartments',
            monthly_rent: 15000,
            deposit: 15000,
            lease_start: 'Jan 15, 2026',
            lease_end: 'Jan 14, 2027',
            status: 'active',
            payment_status: 'paid',
            rating: 4.8,
            documents_completed: true,
            background_check: 'Passed',
            days_left: 15,
            payment_history: [
                { month: 'June', amount: 15000, status: 'paid', date: 'Jun 5' },
                { month: 'May', amount: 15000, status: 'paid', date: 'May 3' },
                { month: 'April', amount: 15000, status: 'paid', date: 'Apr 7' },
                { month: 'March', amount: 15000, status: 'late', date: 'Mar 12' },
            ],
            communication_log: [
                { type: 'SMS', message: 'Rent reminder sent', date: 'Jun 10' },
                { type: 'Email', message: 'Lease renewal offer', date: 'May 20' },
                { type: 'SMS', message: 'Payment confirmation', date: 'May 5' },
            ],
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@email.com',
            phone: '+63 917 234 5678',
            emergency_contact: 'Mark Smith (+63 988 777 6666)',
            unit: 'Unit 204',
            building: 'Green Valley Condos',
            monthly_rent: 12000,
            deposit: 12000,
            lease_start: 'Mar 01, 2026',
            lease_end: 'Feb 28, 2027',
            status: 'active',
            payment_status: 'pending',
            rating: 4.2,
            documents_completed: true,
            background_check: 'Passed',
            days_left: 3,
            payment_history: [
                { month: 'June', amount: 12000, status: 'pending', date: '-' },
                { month: 'May', amount: 12000, status: 'paid', date: 'May 8' },
            ],
            communication_log: [
                { type: 'SMS', message: 'Payment reminder', date: 'Jun 15' },
            ],
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.j@email.com',
            phone: '+63 918 345 6789',
            emergency_contact: 'Lisa Johnson (+63 977 666 5555)',
            unit: 'Unit 305',
            building: 'Riverside Towers',
            monthly_rent: 18000,
            deposit: 18000,
            lease_start: 'Feb 10, 2026',
            lease_end: 'Feb 09, 2027',
            status: 'active',
            payment_status: 'overdue',
            rating: 3.5,
            documents_completed: false,
            background_check: 'Pending',
            days_left: -5,
            payment_history: [
                { month: 'June', amount: 18000, status: 'overdue', date: '-' },
                { month: 'May', amount: 18000, status: 'paid', date: 'May 12' },
            ],
            communication_log: [
                { type: 'SMS', message: 'Overdue notice', date: 'Jun 17' },
            ],
        },
        {
            id: 4,
            name: 'Sarah Williams',
            email: 'sarah.w@email.com',
            phone: '+63 919 456 7890',
            emergency_contact: 'Tom Williams (+63 966 555 4444)',
            unit: 'Unit 402',
            building: 'Palm Residences',
            monthly_rent: 14000,
            deposit: 14000,
            lease_start: 'Apr 20, 2026',
            lease_end: 'Apr 19, 2027',
            status: 'viewing',
            payment_status: 'n/a',
            rating: 4.0,
            documents_completed: false,
            background_check: 'In Progress',
            days_left: 0,
            payment_history: [],
            communication_log: [
                { type: 'SMS', message: 'Viewing scheduled', date: 'Jun 16' },
            ],
        },
    ];

    const allTenants = tenants.length > 0 ? tenants : sampleTenants;
    const filtered = allTenants.filter(t => 
        t.name.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (activeFilter === 'All' || t.status === activeFilter.toLowerCase() || t.payment_status === activeFilter.toLowerCase())
    );
    const perPage = 6;
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        setShowDelete(false);
        setToast({ message: 'Tenant deleted successfully!', type: 'success' });
        setTimeout(() => setToast(null), 3000);
    };

    const getPaymentColor = (status) => {
        switch(status) {
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
            <ConfirmModal show={showDelete} onClose={() => setShowDelete(false)} onConfirm={confirmDelete} title={allTenants.find(t => t.id === deleteId)?.name} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Tenants</h1>
                        <p className="text-gray-500 mt-1">Manage your tenants and leases</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-rc-teal text-white rounded-lg">📥 Export</button>
                        <Link href="/tenants/create" className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                            <PlusIcon className="h-5 w-5 inline mr-1" /> Add Tenant
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-teal">
                        <p className="text-sm text-gray-500">Active Tenants</p>
                        <p className="text-2xl font-bold text-rc-teal">{allTenants.filter(t => t.status === 'active').length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange">
                        <p className="text-sm text-gray-500">Overdue</p>
                        <p className="text-2xl font-bold text-red-600">{allTenants.filter(t => t.payment_status === 'overdue').length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-dark">
                        <p className="text-sm text-gray-500">Avg Rating</p>
                        <p className="text-2xl font-bold text-rc-dark">⭐ 4.1</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange">
                        <p className="text-sm text-gray-500">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-rc-orange">₱{allTenants.filter(t => t.status === 'active').reduce((s, t) => s + t.monthly_rent, 0).toLocaleString()}</p>
                    </div>
                </div>

                {/* Filters */}
                <FilterChips filters={['All', 'Active', 'Viewing', 'Paid', 'Pending', 'Overdue']} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

                {/* Search */}
                <div className="bg-white rounded-xl p-4">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="text" placeholder="Search tenants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                    </div>
                </div>

                {/* Tenant Cards */}
                {paginated.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginated.map((tenant) => (
                                <div key={tenant.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border-t-4 border-rc-teal">
                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <div className="h-14 w-14 bg-gradient-to-br from-rc-orange to-rc-teal rounded-full flex items-center justify-center text-white font-bold text-xl">
                                                        {tenant.name.charAt(0)}
                                                    </div>
                                                    <button className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow">
                                                        <CameraIcon className="h-3 w-3 text-rc-teal" />
                                                    </button>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-lg font-semibold text-rc-dark">{tenant.name}</h3>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <StarIcon className="h-4 w-4 text-yellow-400" />
                                                        <span className="text-sm">{tenant.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <StatusBadge status={tenant.status} />
                                        </div>

                                        {/* Contact */}
                                        <div className="mt-4 space-y-2 text-sm">
                                            <p className="flex items-center text-gray-600"><EnvelopeIcon className="h-4 w-4 mr-2 text-rc-teal" /> {tenant.email}</p>
                                            <p className="flex items-center text-gray-600"><PhoneIcon className="h-4 w-4 mr-2 text-rc-teal" /> {tenant.phone}</p>
                                            <p className="flex items-center text-gray-600"><BuildingOfficeIcon className="h-4 w-4 mr-2 text-rc-orange" /> {tenant.building}</p>
                                            <p className="flex items-center text-gray-600"><KeyIcon className="h-4 w-4 mr-2 text-rc-orange" /> {tenant.unit}</p>
                                        </div>

                                        {/* Emergency Contact */}
                                        <div className="mt-3 p-2 bg-rc-light rounded-lg">
                                            <p className="text-xs text-gray-500">Emergency Contact</p>
                                            <p className="text-sm text-rc-dark">{tenant.emergency_contact}</p>
                                        </div>

                                        {/* Background Check */}
                                        <div className={`mt-3 p-2 rounded-lg text-xs flex items-center ${tenant.background_check === 'Passed' ? 'bg-rc-teal/10 text-rc-teal' : tenant.background_check === 'Pending' ? 'bg-rc-orange/10 text-rc-orange' : 'bg-yellow-100 text-yellow-700'}`}>
                                            <ShieldCheckIcon className="h-4 w-4 mr-2" />
                                            Background Check: {tenant.background_check}
                                        </div>

                                        {/* Documents Status */}
                                        <div className={`mt-2 p-2 rounded-lg text-xs flex items-center ${tenant.documents_completed ? 'bg-rc-teal/10 text-rc-teal' : 'bg-rc-orange/10 text-rc-orange'}`}>
                                            <DocumentTextIcon className="h-4 w-4 mr-2" />
                                            {tenant.documents_completed ? 'All documents completed' : 'Documents pending'}
                                        </div>

                                        {/* Rent & Payment */}
                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            <div className="bg-rc-light rounded-lg p-3">
                                                <p className="text-xs text-gray-500">Monthly Rent</p>
                                                <p className="text-lg font-bold text-rc-orange">₱{tenant.monthly_rent.toLocaleString()}</p>
                                            </div>
                                            <div className="bg-rc-light rounded-lg p-3">
                                                <p className="text-xs text-gray-500">Payment</p>
                                                <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${getPaymentColor(tenant.payment_status)}`}>
                                                    {tenant.payment_status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Lease Countdown */}
                                        <div className="mt-4 p-3 bg-rc-light rounded-lg">
                                            {tenant.days_left > 0 ? (
                                                <p className="text-sm text-rc-teal">⏳ {tenant.days_left} days until rent due</p>
                                            ) : tenant.days_left < 0 ? (
                                                <p className="text-sm text-red-600">⚠️ {Math.abs(tenant.days_left)} days overdue</p>
                                            ) : (
                                                <p className="text-sm text-gray-500">No active lease</p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-4 pt-4 border-t flex justify-between">
                                            <div className="flex gap-2">
                                                <button onClick={() => { setSelectedTenant(tenant); setShowPaymentHistory(true); }} className="p-2 text-gray-400 hover:text-rc-teal" title="Payment History">
                                                    <BanknotesIcon className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-rc-orange" title="Communication Log">
                                                    <ChatBubbleLeftIcon className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-rc-dark" title="Edit">
                                                    <PencilIcon className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => handleDelete(tenant.id)} className="p-2 text-gray-400 hover:text-red-600" title="Delete">
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <button onClick={() => setSelectedTenant(tenant)} className="text-sm text-rc-teal hover:text-rc-orange">
                                                View Profile →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </>
                ) : (
                    <EmptyState icon="👥" title="No tenants found" description="Try different search terms" />
                )}

                {/* Tenant Detail Modal */}
                {selectedTenant && !showPaymentHistory && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedTenant(null)} />
                        <div className="bg-white rounded-xl max-w-lg w-full mx-4 z-10 overflow-hidden">
                            <div className="bg-gradient-to-r from-rc-teal to-rc-dark p-6 flex justify-between">
                                <div className="flex items-center">
                                    <div className="h-12 w-12 bg-rc-orange rounded-full flex items-center justify-center text-white font-bold">{selectedTenant.name.charAt(0)}</div>
                                    <div className="ml-3">
                                        <h3 className="text-xl font-bold text-white">{selectedTenant.name}</h3>
                                        <p className="text-xs text-gray-300">{selectedTenant.status}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedTenant(null)} className="text-white/70">✕</button>
                            </div>
                            <div className="p-6 space-y-3">
                                <button onClick={() => setShowPaymentHistory(true)} className="w-full px-4 py-2 bg-rc-orange text-white rounded-lg">💰 View Payment History</button>
                                <button className="w-full px-4 py-2 bg-rc-teal text-white rounded-lg">📞 View Communication Log</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payment History Modal */}
                {showPaymentHistory && selectedTenant && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowPaymentHistory(false)} />
                        <div className="bg-white rounded-xl max-w-md w-full mx-4 z-10 p-6">
                            <div className="flex justify-between mb-4">
                                <h3 className="text-lg font-bold text-rc-dark">Payment History - {selectedTenant.name}</h3>
                                <button onClick={() => setShowPaymentHistory(false)} className="text-gray-400">✕</button>
                            </div>
                            <div className="space-y-2">
                                {selectedTenant.payment_history.map((payment, i) => (
                                    <div key={i} className="flex justify-between p-3 bg-rc-light rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium">{payment.month}</p>
                                            <p className="text-xs text-gray-500">{payment.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold">₱{payment.amount.toLocaleString()}</p>
                                            <span className={`text-xs ${payment.status === 'paid' ? 'text-rc-teal' : payment.status === 'late' ? 'text-rc-orange' : 'text-red-600'}`}>{payment.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}