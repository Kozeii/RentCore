import { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    BuildingOfficeIcon,
    MapPinIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    KeyIcon,
    WrenchScrewdriverIcon,
    ArrowTrendingUpIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function Index({ buildings = [] }) {
    const { flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedBuilding, setSelectedBuilding] = useState(null);

    const sampleBuildings = [
        {
            id: 1,
            name: 'Sunset Apartments',
            address: '123 Main Street',
            city: 'Manila',
            state: 'NCR',
            zip_code: '1000',
            description: 'A beautiful apartment complex with modern amenities and city views.',
            units_count: 20,
            occupied_units: 16,
            vacant_units: 3,
            maintenance_units: 1,
            total_income: 25000,
            occupancy_rate: 80,
            status: 'active',
        },
        {
            id: 2,
            name: 'Green Valley Condos',
            address: '456 Oak Avenue',
            city: 'Quezon City',
            state: 'NCR',
            zip_code: '1100',
            description: 'Premium condominiums with resort-style amenities.',
            units_count: 15,
            occupied_units: 12,
            vacant_units: 2,
            maintenance_units: 1,
            total_income: 18000,
            occupancy_rate: 80,
            status: 'active',
        },
        {
            id: 3,
            name: 'Riverside Towers',
            address: '789 River Road',
            city: 'Makati',
            state: 'NCR',
            zip_code: '1200',
            description: 'Luxury towers along the river with premium facilities.',
            units_count: 25,
            occupied_units: 22,
            vacant_units: 3,
            maintenance_units: 0,
            total_income: 35000,
            occupancy_rate: 88,
            status: 'active',
        },
        {
            id: 4,
            name: 'Palm Residences',
            address: '321 Palm Street',
            city: 'Pasig',
            state: 'NCR',
            zip_code: '1600',
            description: 'Family-friendly residences with pools and playgrounds.',
            units_count: 10,
            occupied_units: 8,
            vacant_units: 1,
            maintenance_units: 1,
            total_income: 12000,
            occupancy_rate: 80,
            status: 'maintenance',
        },
    ];

    const allBuildings = buildings.length > 0 ? buildings : sampleBuildings;

    const filteredBuildings = allBuildings.filter(building => {
        const matchesSearch = 
            building.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            building.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            building.city?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = filterStatus === 'all' || building.status === filterStatus;
        
        return matchesSearch && matchesFilter;
    });

    const sortedBuildings = [...filteredBuildings].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'units') return b.units_count - a.units_count;
        if (sortBy === 'occupancy') return b.occupancy_rate - a.occupancy_rate;
        if (sortBy === 'income') return b.total_income - a.total_income;
        return 0;
    });

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this building?')) {
            router.delete(`/buildings/${id}`);
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'active': return 'bg-rc-teal/10 text-rc-teal';
            case 'maintenance': return 'bg-rc-orange/10 text-rc-orange';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const totalUnits = allBuildings.reduce((sum, b) => sum + b.units_count, 0);
    const totalOccupied = allBuildings.reduce((sum, b) => sum + b.occupied_units, 0);
    const totalIncome = allBuildings.reduce((sum, b) => sum + b.total_income, 0);
    const avgOccupancy = totalUnits > 0 ? Math.round((totalOccupied / totalUnits) * 100) : 0;

    return (
        <AuthenticatedLayout>
            <Head title="Buildings" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Buildings</h1>
                        <p className="mt-1 text-gray-500">Manage your rental properties</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-rc-light">
                            📥 Export
                        </button>
                        <Link href="/buildings/create" className="inline-flex items-center px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Add Building
                        </Link>
                    </div>
                </div>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="bg-rc-teal/10 border border-rc-teal/30 text-rc-teal px-4 py-3 rounded-lg flex items-center justify-between">
                        <span>✅ {flash.success}</span>
                        <button className="text-rc-teal">✕</button>
                    </div>
                )}

                {/* Stats Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-orange">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Buildings</p>
                                <p className="text-2xl font-bold text-rc-dark">{allBuildings.length}</p>
                            </div>
                            <BuildingOfficeIcon className="h-8 w-8 text-rc-orange" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-teal">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Units</p>
                                <p className="text-2xl font-bold text-rc-dark">{totalUnits}</p>
                            </div>
                            <HomeIcon className="h-8 w-8 text-rc-teal" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-dark">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Occupancy Rate</p>
                                <p className="text-2xl font-bold text-rc-dark">{avgOccupancy}%</p>
                            </div>
                            <ArrowTrendingUpIcon className="h-8 w-8 text-rc-dark" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-orange">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Monthly Income</p>
                                <p className="text-2xl font-bold text-rc-orange">${totalIncome.toLocaleString()}</p>
                            </div>
                            <CurrencyDollarIcon className="h-8 w-8 text-rc-orange" />
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
                                placeholder="Search buildings by name, address, or city..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rc-orange focus:border-rc-orange"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-rc-orange"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2.5 border border-gray-300 rounded-lg"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="units">Sort by Units</option>
                                <option value="occupancy">Sort by Occupancy</option>
                                <option value="income">Sort by Income</option>
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
                        {sortedBuildings.map((building) => (
                            <div key={building.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-rc-orange group">
                                {/* Card Header */}
                                <div className="h-24 bg-gradient-to-r from-rc-teal to-rc-dark relative">
                                    <div className="absolute -bottom-8 left-6">
                                        <div className="bg-white p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                            <BuildingOfficeIcon className="h-8 w-8 text-rc-orange" />
                                        </div>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <span className="px-2 py-1 bg-white/20 text-white rounded-full text-xs backdrop-blur-sm">
                                            {building.occupancy_rate}% Occupied
                                        </span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="pt-12 px-6 pb-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-rc-dark group-hover:text-rc-orange transition-colors">
                                                {building.name}
                                            </h3>
                                            <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(building.status)}`}>
                                                {building.status}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 flex items-center mt-3">
                                        <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0 text-rc-teal" />
                                        {building.address}, {building.city}, {building.state}
                                    </p>

                                    {building.description && (
                                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">{building.description}</p>
                                    )}

                                    {/* Stats Grid */}
                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                        <div className="text-center bg-rc-light rounded-lg p-2">
                                            <HomeIcon className="h-4 w-4 mx-auto text-rc-teal" />
                                            <p className="text-sm font-bold mt-1 text-rc-dark">{building.units_count}</p>
                                            <p className="text-xs text-gray-500">Units</p>
                                        </div>
                                        <div className="text-center bg-rc-light rounded-lg p-2">
                                            <UserGroupIcon className="h-4 w-4 mx-auto text-rc-orange" />
                                            <p className="text-sm font-bold mt-1 text-rc-dark">{building.occupied_units}</p>
                                            <p className="text-xs text-gray-500">Occupied</p>
                                        </div>
                                        <div className="text-center bg-rc-light rounded-lg p-2">
                                            <CurrencyDollarIcon className="h-4 w-4 mx-auto text-rc-teal" />
                                            <p className="text-sm font-bold mt-1 text-rc-dark">${(building.total_income / 1000).toFixed(1)}k</p>
                                            <p className="text-xs text-gray-500">Income</p>
                                        </div>
                                    </div>

                                    {/* Occupancy Bar */}
                                    <div className="mt-4">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-500">Occupancy</span>
                                            <span className="font-medium text-rc-teal">{building.occupancy_rate}%</span>
                                        </div>
                                        <div className="h-2 bg-rc-light rounded-full">
                                            <div 
                                                className="h-2 bg-gradient-to-r from-rc-orange to-rc-teal rounded-full transition-all duration-500"
                                                style={{ width: `${building.occupancy_rate}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Unit Breakdown */}
                                    <div className="mt-4 flex gap-2 text-xs">
                                        <span className="text-rc-teal">{building.occupied_units} Occupied</span>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-gray-500">{building.vacant_units} Vacant</span>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-rc-orange">{building.maintenance_units} Maintenance</span>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                        <button
                                            onClick={() => setSelectedBuilding(building)}
                                            className="text-sm font-medium text-rc-teal hover:text-rc-orange"
                                        >
                                            View Details →
                                        </button>
                                        <div className="flex gap-2">
                                            <Link href={`/buildings/${building.id}/edit`} className="p-2 text-gray-400 hover:text-rc-teal">
                                                <PencilIcon className="h-4 w-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(building.id)} className="p-2 text-gray-400 hover:text-rc-orange">
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
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-t-4 border-rc-orange">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-rc-dark">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Building</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Units</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Occupancy</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Income</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {sortedBuildings.map((building) => (
                                    <tr key={building.id} className="hover:bg-rc-light">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="bg-rc-orange/10 p-2 rounded-lg">
                                                    <BuildingOfficeIcon className="h-5 w-5 text-rc-orange" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="font-medium text-rc-dark">{building.name}</p>
                                                    <span className={`text-xs ${getStatusColor(building.status)}`}>{building.status}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{building.city}, {building.state}</td>
                                        <td className="px-6 py-4 text-sm text-rc-dark">{building.units_count}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-16 h-2 bg-rc-light rounded-full mr-2">
                                                    <div className="h-2 bg-rc-teal rounded-full" style={{ width: `${building.occupancy_rate}%` }}></div>
                                                </div>
                                                <span className="text-sm text-rc-teal">{building.occupancy_rate}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-rc-orange">${building.total_income.toLocaleString()}</td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button className="text-rc-teal text-sm">Edit</button>
                                            <button onClick={() => handleDelete(building.id)} className="text-rc-orange text-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Empty State */}
                {sortedBuildings.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm py-16 text-center border-t-4 border-rc-orange">
                        <BuildingOfficeIcon className="h-16 w-16 text-gray-300 mx-auto" />
                        <h3 className="mt-4 text-lg font-medium text-rc-dark">No buildings found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm ? 'Try different search terms' : 'Get started by adding your first building'}
                        </p>
                        {!searchTerm && (
                            <Link href="/buildings/create" className="mt-6 inline-flex items-center px-6 py-3 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Add Your First Building
                            </Link>
                        )}
                    </div>
                )}

                {/* Building Detail Modal */}
                {selectedBuilding && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedBuilding(null)} />
                        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 z-10">
                            <div className="bg-gradient-to-r from-rc-teal to-rc-dark rounded-t-xl p-6 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white">{selectedBuilding.name}</h3>
                                <button onClick={() => setSelectedBuilding(null)} className="text-white/70 hover:text-white">✕</button>
                            </div>
                            <div className="p-6 space-y-4">
                                <p className="flex items-center text-gray-600">
                                    <MapPinIcon className="h-5 w-5 mr-2 text-rc-orange" />
                                    {selectedBuilding.address}, {selectedBuilding.city}, {selectedBuilding.state}
                                </p>
                                <p className="text-sm text-gray-500">{selectedBuilding.description}</p>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="bg-rc-light rounded-lg p-3">
                                        <p className="text-2xl font-bold text-rc-teal">{selectedBuilding.units_count}</p>
                                        <p className="text-xs text-gray-500">Total Units</p>
                                    </div>
                                    <div className="bg-rc-light rounded-lg p-3">
                                        <p className="text-2xl font-bold text-rc-orange">{selectedBuilding.occupied_units}</p>
                                        <p className="text-xs text-gray-500">Occupied</p>
                                    </div>
                                    <div className="bg-rc-light rounded-lg p-3">
                                        <p className="text-2xl font-bold text-rc-dark">${selectedBuilding.total_income.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500">Income</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}