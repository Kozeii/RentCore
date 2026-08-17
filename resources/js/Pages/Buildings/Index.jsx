import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    PlusIcon, BuildingOfficeIcon, MapPinIcon, HomeIcon,
    MagnifyingGlassIcon, CurrencyDollarIcon, UserGroupIcon, PencilIcon, TrashIcon,
} from '@heroicons/react/24/outline';

export default function Index({ buildings = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');

    const sampleBuildings = [
        { id: 1, name: 'Sunset Apartments', address: '123 Main Street', city: 'Manila', state: 'NCR', units_count: 20, occupied: 16, income: 25000, occupancy: 80 },
        { id: 2, name: 'Green Valley Condos', address: '456 Oak Avenue', city: 'Quezon City', state: 'NCR', units_count: 15, occupied: 12, income: 18000, occupancy: 80 },
        { id: 3, name: 'Riverside Towers', address: '789 River Road', city: 'Makati', state: 'NCR', units_count: 25, occupied: 22, income: 35000, occupancy: 88 },
        { id: 4, name: 'Palm Residences', address: '321 Palm Street', city: 'Pasig', state: 'NCR', units_count: 10, occupied: 8, income: 12000, occupancy: 80 },
    ];

    const allBuildings = buildings.length > 0 ? buildings : sampleBuildings;
    const filtered = allBuildings.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <AuthenticatedLayout>
            <Head title="Buildings" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-rc-dark">Buildings</h1>
                    <Link href="/buildings/create" className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                        <PlusIcon className="h-5 w-5 inline mr-1" /> Add Building
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange">
                        <p className="text-sm text-gray-500">Total Buildings</p>
                        <p className="text-2xl font-bold text-rc-dark">{allBuildings.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-teal">
                        <p className="text-sm text-gray-500">Total Units</p>
                        <p className="text-2xl font-bold text-rc-dark">{allBuildings.reduce((s, b) => s + b.units_count, 0)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-dark">
                        <p className="text-sm text-gray-500">Occupied</p>
                        <p className="text-2xl font-bold text-rc-teal">{allBuildings.reduce((s, b) => s + b.occupied, 0)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange">
                        <p className="text-sm text-gray-500">Total Income</p>
                        <p className="text-2xl font-bold text-rc-orange">₱{allBuildings.reduce((s, b) => s + b.income, 0).toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="text" placeholder="Search buildings..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((building) => (
                        <div key={building.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden border-t-4 border-rc-orange">
                            <div className="h-20 bg-gradient-to-r from-rc-teal to-rc-dark relative">
                                <div className="absolute -bottom-6 left-6 bg-white p-3 rounded-xl shadow-lg">
                                    <BuildingOfficeIcon className="h-6 w-6 text-rc-orange" />
                                </div>
                            </div>
                            <div className="pt-10 px-6 pb-6">
                                <h3 className="text-lg font-semibold text-rc-dark">{building.name}</h3>
                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                    <MapPinIcon className="h-4 w-4 mr-1" /> {building.address}, {building.city}
                                </p>
                                <div className="mt-4 flex gap-2">
                                    <span className="bg-rc-teal/10 text-rc-teal px-3 py-1 rounded-full text-xs">{building.units_count} Units</span>
                                    <span className="bg-rc-orange/10 text-rc-orange px-3 py-1 rounded-full text-xs">{building.occupied} Occupied</span>
                                </div>
                                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Monthly Income</span>
                                    <span className="font-semibold text-rc-teal">₱{building.income.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}