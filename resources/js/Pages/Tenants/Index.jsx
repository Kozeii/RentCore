import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    PlusIcon, UserGroupIcon, PhoneIcon, EnvelopeIcon,
    MagnifyingGlassIcon, BuildingOfficeIcon, KeyIcon, PencilIcon, TrashIcon,
} from '@heroicons/react/24/outline';

export default function Index({ tenants = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const sampleTenants = [
        { id: 1, name: 'John Doe', email: 'john@email.com', phone: '+63 912 345 6789', unit: 'Unit 101', building: 'Sunset Apartments', rent: 15000, status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@email.com', phone: '+63 917 234 5678', unit: 'Unit 204', building: 'Green Valley Condos', rent: 12000, status: 'active' },
        { id: 3, name: 'Mike Johnson', email: 'mike@email.com', phone: '+63 918 345 6789', unit: 'Unit 305', building: 'Riverside Towers', rent: 18000, status: 'viewing' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@email.com', phone: '+63 919 456 7890', unit: 'Unit 402', building: 'Palm Residences', rent: 14000, status: 'active' },
    ];

    const allTenants = tenants.length > 0 ? tenants : sampleTenants;
    const filtered = allTenants.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <AuthenticatedLayout>
            <Head title="Tenants" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-rc-dark">Tenants</h1>
                    <Link href="/tenants/create" className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                        <PlusIcon className="h-5 w-5 inline mr-1" /> Add Tenant
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-teal">
                        <p className="text-sm text-gray-500">Active Tenants</p>
                        <p className="text-2xl font-bold text-rc-teal">{allTenants.filter(t => t.status === 'active').length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange">
                        <p className="text-sm text-gray-500">Viewing</p>
                        <p className="text-2xl font-bold text-rc-orange">{allTenants.filter(t => t.status === 'viewing').length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-dark">
                        <p className="text-sm text-gray-500">Total Tenants</p>
                        <p className="text-2xl font-bold text-rc-dark">{allTenants.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange">
                        <p className="text-sm text-gray-500">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-rc-orange">₱{allTenants.filter(t => t.status === 'active').reduce((s, t) => s + t.rent, 0).toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="text" placeholder="Search tenants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((tenant) => (
                        <div key={tenant.id} className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-teal">
                            <div className="flex items-center">
                                <div className="h-12 w-12 bg-gradient-to-br from-rc-orange to-rc-teal rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {tenant.name.charAt(0)}
                                </div>
                                <div className="ml-3">
                                    <h3 className="font-semibold text-rc-dark">{tenant.name}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs ${tenant.status === 'active' ? 'bg-rc-teal/10 text-rc-teal' : 'bg-rc-orange/10 text-rc-orange'}`}>{tenant.status}</span>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2 text-sm">
                                <p className="flex items-center text-gray-600"><EnvelopeIcon className="h-4 w-4 mr-2 text-rc-teal" /> {tenant.email}</p>
                                <p className="flex items-center text-gray-600"><PhoneIcon className="h-4 w-4 mr-2 text-rc-teal" /> {tenant.phone}</p>
                                <p className="flex items-center text-gray-600"><BuildingOfficeIcon className="h-4 w-4 mr-2 text-rc-orange" /> {tenant.building}</p>
                                <p className="flex items-center text-gray-600"><KeyIcon className="h-4 w-4 mr-2 text-rc-orange" /> {tenant.unit}</p>
                            </div>
                            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                <span className="text-sm text-gray-500">Monthly Rent</span>
                                <span className="font-bold text-rc-orange">₱{tenant.rent.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}