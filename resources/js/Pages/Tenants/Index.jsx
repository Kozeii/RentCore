import { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    UserGroupIcon,
    MagnifyingGlassIcon,
    PhoneIcon,
    EnvelopeIcon,
    HomeIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ClockIcon,
    BuildingOfficeIcon,
    KeyIcon,
    ChevronDownIcon,
    ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

export default function Index({ tenants = [] }) {
    const { flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedTenant, setSelectedTenant] = useState(null);

    const sampleTenants = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@email.com',
            phone: '+63 912 345 6789',
            unit: 'Unit 101',
            building: 'Sunset Apartments',
            monthly_rent: 1500,
            deposit: 1500,
            lease_start: 'Jan 15, 2026',
            lease_end: 'Jan 14, 2027',
            status: 'active',
            payment_status: 'paid',
            days_left: 15,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@email.com',
            phone: '+63 917 234 5678',
            unit: 'Unit 204',
            building: 'Green Valley Condos',
            monthly_rent: 1200,
            deposit: 1200,
            lease_start: 'Mar 01, 2026',
            lease_end: 'Feb 28, 2027',
            status: 'active',
            payment_status: 'pending',
            days_left: 3,
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.j@email.com',
            phone: '+63 918 345 6789',
            unit: 'Unit 305',
            building: 'Riverside Towers',
            monthly_rent: 1800,
            deposit: 1800,
            lease_start: 'Feb 10, 2026',
            lease_end: 'Feb 09, 2027',
            status: 'active',
            payment_status: 'overdue',
            days_left: -5,
        },
        {
            id: 4,
            name: 'Sarah Williams',
            email: 'sarah.w@email.com',
            phone: '+63 919 456 7890',
            unit: 'Unit 402',
            building: 'Palm Residences',
            monthly_rent: 1400,
            deposit: 1400,
            lease_start: 'Apr 20, 2026',
            lease_end: 'Apr 19, 2027',
            status: 'viewing',
            payment_status: 'n/a',
            days_left: 0,
        },
        {
            id: 5,
            name: 'Tom Brown',
            email: 'tom.brown@email.com',
            phone: '+63 915 567 8901',
            unit: 'Unit 108',
            building: 'Sunset Apartments',
            monthly_rent: 1600,
            deposit: 1600,
            lease_start: 'May 05, 2026',
            lease_end: 'May 04, 2027',
            status: 'active',
            payment_status: 'paid',
            days_left: 20,
        },
        {
            id: 6,
            name: 'Emily Davis',
            email: 'emily.d@email.com',
            phone: '+63 916 678 9012',
            unit: 'Unit 302',
            building: 'Green Valley Condos',
            monthly_rent: 1300,
            deposit: 1300,
            lease_start: 'Jun 01, 2026',
            lease_end: 'May 31, 2027',
            status: 'moved_out',
            payment_status: 'n/a',
            days_left: 0,
        },
    ];

    const allTenants = tenants.length > 0 ? tenants : sampleTenants;

    const filteredTenants = allTenants.filter(tenant => {
        const matchesSearch = 
            tenant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.unit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.building?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = filterStatus === 'all' || tenant.status === filterStatus;
        
        return matchesSearch && matchesFilter;
    });

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this tenant?')) {
            router.delete(`/tenants/${id}`);
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'active': return 'bg-rc-teal/10 text-rc-teal';
            case 'viewing': return 'bg-rc-orange/10 text-rc-orange';
            case 'moved_out': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    const getPaymentColor = (status) => {
        switch(status) {
            case 'paid': return 'bg-rc-teal/10 text-rc-teal';
            case 'pending': return 'bg-rc-orange/10 text-rc-orange';
            case 'overdue': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    const activeTenants = allTenants.filter(t => t.status === 'active').length;
    const viewingTenants = allTenants.filter(t => t.status === 'viewing').length;
    const overduePayments = allTenants.filter(t => t.payment_status === 'overdue').length;
    const monthlyRevenue = allTenants.filter(t => t.status === 'active').reduce((sum, t) => sum + t.monthly_rent, 0);

    return (
        <AuthenticatedLayout>
            <Head title="Tenants" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Tenants</h1>
                        <p className="mt-1 text-gray-500">Manage your tenants and leases</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-rc-light">
                            📥 Export
                        </button>
                        <Link href="/tenants/create" className="inline-flex items-center px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Add Tenant
                        </Link>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-teal">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Active Tenants</p>
                                <p className="text-2xl font-bold text-rc-teal">{activeTenants}</p>
                            </div>
                            <UserGroupIcon className="h-8 w-8 text-rc-teal" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-orange">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Viewing</p>
                                <p className="text-2xl font-bold text-rc-orange">{viewingTenants}</p>
                            </div>
                            <ClockIcon className="h-8 w-8 text-rc-orange" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-red-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Overdue Payments</p>
                                <p className="text-2xl font-bold text-red-600">{overduePayments}</p>
                            </div>
                            <ExclamationCircleIcon className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-dark">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Monthly Revenue</p>
                                <p className="text-2xl font-bold text-rc-dark">${monthlyRevenue.toLocaleString()}</p>
                            </div>
                            <CurrencyDollarIcon className="h-8 w-8 text-rc-dark" />
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, unit, or building..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rc-orange focus:border-rc-orange"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2.5 border border-gray-300 rounded-lg"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="viewing">Viewing</option>
                                <option value="moved_out">Moved Out</option>
                            </select>
                            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                <button onClick={() => setViewMode('grid')} className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-rc-orange text-white' : 'bg-white text-gray-500'}`}>▦</button>
                                <button onClick={() => setViewMode('list')} className={`px-3 py-2 ${viewMode === 'list' ? 'bg-rc-orange text-white' : 'bg-white text-gray-500'}`}>☰</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid View */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTenants.map((tenant) => (
                            <div key={tenant.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-rc-teal group">
                                <div className="p-6">
                                    {/* Tenant Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 bg-gradient-to-br from-rc-orange to-rc-teal rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                {tenant.name.charAt(0)}
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-lg font-semibold text-rc-dark group-hover:text-rc-orange transition-colors">
                                                    {tenant.name}
                                                </h3>
                                                <p className="text-xs text-gray-500 flex items-center">
                                                    <EnvelopeIcon className="h-3 w-3 mr-1 text-rc-teal" />
                                                    {tenant.email}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tenant.status)}`}>
                                            {tenant.status}
                                        </span>
                                    </div>

                                    {/* Contact & Location */}
                                    <div className="mt-4 space-y-2">
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <PhoneIcon className="h-4 w-4 mr-2 text-rc-teal" />
                                            {tenant.phone}
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <BuildingOfficeIcon className="h-4 w-4 mr-2 text-rc-teal" />
                                            {tenant.building}
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <KeyIcon className="h-4 w-4 mr-2 text-rc-teal" />
                                            {tenant.unit}
                                        </p>
                                    </div>

                                    {/* Rent & Payment */}
                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="bg-rc-light rounded-lg p-3">
                                            <p className="text-xs text-gray-500">Monthly Rent</p>
                                            <p className="text-lg font-bold text-rc-dark">${tenant.monthly_rent}</p>
                                        </div>
                                        <div className="bg-rc-light rounded-lg p-3">
                                            <p className="text-xs text-gray-500">Payment</p>
                                            <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(tenant.payment_status)}`}>
                                                {tenant.payment_status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Lease Dates */}
                                    <div className="mt-4 space-y-1 text-xs text-gray-500">
                                        <p className="flex items-center">
                                            <CalendarIcon className="h-3 w-3 mr-1 text-rc-orange" />
                                            Start: {tenant.lease_start}
                                        </p>
                                        <p className="flex items-center">
                                            <CalendarIcon className="h-3 w-3 mr-1 text-rc-orange" />
                                            End: {tenant.lease_end}
                                        </p>
                                        {tenant.days_left > 0 && (
                                            <p className="text-rc-teal font-medium">⏳ {tenant.days_left} days until rent due</p>
                                        )}
                                        {tenant.days_left < 0 && (
                                            <p className="text-red-600 font-medium">⚠️ {Math.abs(tenant.days_left)} days overdue</p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                        <button
                                            onClick={() => setSelectedTenant(tenant)}
                                            className="text-sm font-medium text-rc-teal hover:text-rc-orange"
                                        >
                                            View Profile →
                                        </button>
                                        <div className="flex gap-2">
                                            <button className="p-2 text-gray-400 hover:text-rc-teal">
                                                <PencilIcon className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDelete(tenant.id)} className="p-2 text-gray-400 hover:text-rc-orange">
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* List View */
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-t-4 border-rc-teal">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-rc-dark">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Tenant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Unit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Rent</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Payment</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredTenants.map((tenant) => (
                                    <tr key={tenant.id} className="hover:bg-rc-light">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 bg-gradient-to-br from-rc-orange to-rc-teal rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                    {tenant.name.charAt(0)}
                                                </div>
                                                <span className="ml-3 font-medium text-rc-dark">{tenant.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{tenant.phone}</td>
                                        <td className="px-6 py-4 text-sm text-rc-dark">{tenant.unit}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-rc-orange">${tenant.monthly_rent}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tenant.status)}`}>{tenant.status}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${getPaymentColor(tenant.payment_status)}`}>{tenant.payment_status}</span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button className="text-rc-teal text-sm">Edit</button>
                                            <button onClick={() => handleDelete(tenant.id)} className="text-rc-orange text-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Empty State */}
                {filteredTenants.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm py-16 text-center border-t-4 border-rc-teal">
                        <UserGroupIcon className="h-16 w-16 text-gray-300 mx-auto" />
                        <h3 className="mt-4 text-lg font-medium text-rc-dark">No tenants found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm ? 'Try different search terms' : 'Start onboarding your first tenant'}
                        </p>
                        {!searchTerm && (
                            <Link href="/tenants/create" className="mt-6 inline-flex items-center px-6 py-3 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Onboard Tenant
                            </Link>
                        )}
                    </div>
                )}

                {/* Tenant Detail Modal */}
                {selectedTenant && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedTenant(null)} />
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 z-10 overflow-hidden">
                            <div className="bg-gradient-to-r from-rc-teal to-rc-dark p-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-12 w-12 bg-rc-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {selectedTenant.name.charAt(0)}
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-xl font-bold text-white">{selectedTenant.name}</h3>
                                        <p className="text-xs text-gray-300">{selectedTenant.status}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedTenant(null)} className="text-white/70 hover:text-white">✕</button>
                            </div>
                            <div className="p-6 space-y-4">
                                <p className="flex items-center text-gray-600">
                                    <EnvelopeIcon className="h-5 w-5 mr-2 text-rc-teal" />
                                    {selectedTenant.email}
                                </p>
                                <p className="flex items-center text-gray-600">
                                    <PhoneIcon className="h-5 w-5 mr-2 text-rc-teal" />
                                    {selectedTenant.phone}
                                </p>
                                <p className="flex items-center text-gray-600">
                                    <BuildingOfficeIcon className="h-5 w-5 mr-2 text-rc-orange" />
                                    {selectedTenant.building} - {selectedTenant.unit}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-rc-light rounded-lg p-3">
                                        <p className="text-xs text-gray-500">Monthly Rent</p>
                                        <p className="text-xl font-bold text-rc-orange">${selectedTenant.monthly_rent}</p>
                                    </div>
                                    <div className="bg-rc-light rounded-lg p-3">
                                        <p className="text-xs text-gray-500">Deposit</p>
                                        <p className="text-xl font-bold text-rc-teal">${selectedTenant.deposit}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <p>Lease: {selectedTenant.lease_start} to {selectedTenant.lease_end}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}