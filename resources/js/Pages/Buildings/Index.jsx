import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Spinner, ConfirmModal, EmptyState, Pagination, Toast, useDebounce, StatusBadge, FilterChips } from '@/Components/UI';
import {
    PlusIcon, BuildingOfficeIcon, MapPinIcon, HomeIcon,
    MagnifyingGlassIcon, PencilIcon, TrashIcon, CameraIcon,
    StarIcon, ShieldCheckIcon, WrenchScrewdriverIcon,
    CalendarIcon, ChartBarIcon, PhotoIcon, SparklesIcon,
    CheckCircleIcon, ExclamationCircleIcon, ChevronDownIcon,
    BanknotesIcon, UserGroupIcon, KeyIcon,
} from '@heroicons/react/24/outline';

export default function Index({ buildings = [] }) {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [toast, setToast] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [showGallery, setShowGallery] = useState(false);
    const debouncedSearch = useDebounce(searchTerm, 300);

    const sampleBuildings = [
        {
            id: 1,
            name: 'Sunset Apartments',
            address: '123 Main Street',
            city: 'Manila',
            state: 'NCR',
            zip_code: '1000',
            units_count: 20,
            occupied: 16,
            vacant: 3,
            maintenance: 1,
            income: 25000,
            occupancy: 80,
            status: 'active',
            rating: 4.5,
            year_built: 2015,
            amenities: ['Pool', 'Gym', 'Parking', 'Security'],
            insurance: 'Insured until Dec 2026',
            photos: 12,
            last_inspection: 'May 15, 2026',
            performance_score: 85,
        },
        {
            id: 2,
            name: 'Green Valley Condos',
            address: '456 Oak Avenue',
            city: 'Quezon City',
            state: 'NCR',
            zip_code: '1100',
            units_count: 15,
            occupied: 12,
            vacant: 2,
            maintenance: 1,
            income: 18000,
            occupancy: 80,
            status: 'active',
            rating: 4.2,
            year_built: 2018,
            amenities: ['Pool', 'Parking', 'Playground'],
            insurance: 'Insured until Mar 2027',
            photos: 8,
            last_inspection: 'Apr 20, 2026',
            performance_score: 78,
        },
        {
            id: 3,
            name: 'Riverside Towers',
            address: '789 River Road',
            city: 'Makati',
            state: 'NCR',
            zip_code: '1200',
            units_count: 25,
            occupied: 22,
            vacant: 3,
            maintenance: 0,
            income: 35000,
            occupancy: 88,
            status: 'maintenance',
            rating: 4.8,
            year_built: 2020,
            amenities: ['Pool', 'Gym', 'Parking', 'Security', 'Lounge'],
            insurance: 'Insured until Aug 2027',
            photos: 20,
            last_inspection: 'Jun 10, 2026',
            performance_score: 92,
        },
        {
            id: 4,
            name: 'Palm Residences',
            address: '321 Palm Street',
            city: 'Pasig',
            state: 'NCR',
            zip_code: '1600',
            units_count: 10,
            occupied: 8,
            vacant: 1,
            maintenance: 1,
            income: 12000,
            occupancy: 80,
            status: 'active',
            rating: 3.9,
            year_built: 2012,
            amenities: ['Parking', 'Playground'],
            insurance: 'Expired - Renew Now',
            photos: 5,
            last_inspection: 'Feb 28, 2026',
            performance_score: 65,
        },
    ];

    const allBuildings = buildings.length > 0 ? buildings : sampleBuildings;
    const filtered = allBuildings.filter(b => 
        b.name.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (activeFilter === 'All' || b.status === activeFilter.toLowerCase())
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
        setToast({ message: 'Building deleted successfully!', type: 'success' });
        setTimeout(() => setToast(null), 3000);
    };

    const getPerformanceColor = (score) => {
        if (score >= 85) return 'text-rc-teal';
        if (score >= 70) return 'text-rc-orange';
        return 'text-red-600';
    };

    if (loading) {
        return (
            <AuthenticatedLayout>
                <Head title="Buildings" />
                <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-xl h-24"></div>
                        ))}
                    </div>
                    <Spinner />
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Buildings" />
            
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <ConfirmModal show={showDelete} onClose={() => setShowDelete(false)} onConfirm={confirmDelete} title={allBuildings.find(b => b.id === deleteId)?.name} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Buildings</h1>
                        <p className="text-gray-500 mt-1">Manage your rental properties</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-rc-teal text-white rounded-lg hover:bg-rc-tealLight">
                            📥 Export
                        </button>
                        <Link href="/buildings/create" className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                            <PlusIcon className="h-5 w-5 inline mr-1" /> Add Building
                        </Link>
                    </div>
                </div>

                {/* Stats */}
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
                        <p className="text-sm text-gray-500">Avg Occupancy</p>
                        <p className="text-2xl font-bold text-rc-teal">{Math.round(allBuildings.reduce((s, b) => s + b.occupancy, 0) / allBuildings.length)}%</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange">
                        <p className="text-sm text-gray-500">Total Income</p>
                        <p className="text-2xl font-bold text-rc-orange">₱{allBuildings.reduce((s, b) => s + b.income, 0).toLocaleString()}</p>
                    </div>
                </div>

                {/* Filters */}
                <FilterChips filters={['All', 'Active', 'Maintenance']} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

                {/* Search */}
                <div className="bg-white rounded-xl p-4">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="text" placeholder="Search buildings..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-rc-orange" />
                    </div>
                </div>

                {/* Building Cards */}
                {paginated.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginated.map((building) => (
                                <div key={building.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border-t-4 border-rc-orange group">
                                    {/* Header */}
                                    <div className="h-28 bg-gradient-to-r from-rc-teal to-rc-dark relative">
                                        <button 
                                            onClick={() => { setSelectedBuilding(building); setShowGallery(true); }}
                                            className="absolute top-2 right-2 p-2 bg-white/20 rounded-lg text-white hover:bg-white/40"
                                        >
                                            <CameraIcon className="h-5 w-5" />
                                        </button>
                                        <div className="absolute -bottom-8 left-6 bg-white p-3 rounded-xl shadow-lg">
                                            <BuildingOfficeIcon className="h-8 w-8 text-rc-orange" />
                                        </div>
                                        <span className="absolute top-3 left-3 px-2 py-1 bg-white/20 text-white rounded-full text-xs">
                                            {building.photos} photos
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <div className="pt-10 px-6 pb-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-rc-dark">{building.name}</h3>
                                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                                    <MapPinIcon className="h-4 w-4 mr-1" /> {building.address}, {building.city}
                                                </p>
                                            </div>
                                            <StatusBadge status={building.status} />
                                        </div>

                                        {/* Rating */}
                                        <div className="mt-3 flex items-center gap-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon key={i} className={`h-4 w-4 ${i < Math.floor(building.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600">{building.rating}</span>
                                            <span className="text-xs text-gray-400">• Built {building.year_built}</span>
                                        </div>

                                        {/* Performance Score */}
                                        <div className="mt-4">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-gray-500">Performance Score</span>
                                                <span className={`font-bold ${getPerformanceColor(building.performance_score)}`}>{building.performance_score}/100</span>
                                            </div>
                                            <div className="h-2 bg-rc-light rounded-full">
                                                <div className={`h-2 rounded-full ${building.performance_score >= 85 ? 'bg-rc-teal' : building.performance_score >= 70 ? 'bg-rc-orange' : 'bg-red-500'}`} style={{ width: `${building.performance_score}%` }}></div>
                                            </div>
                                        </div>

                                        {/* Amenities */}
                                        <div className="mt-4 flex flex-wrap gap-1">
                                            {building.amenities.map(amenity => (
                                                <span key={amenity} className="px-2 py-1 bg-rc-light text-rc-dark rounded-full text-xs">{amenity}</span>
                                            ))}
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                            <div className="bg-rc-light rounded-lg p-2">
                                                <HomeIcon className="h-4 w-4 mx-auto text-rc-teal" />
                                                <p className="text-sm font-bold">{building.units_count}</p>
                                                <p className="text-xs text-gray-500">Units</p>
                                            </div>
                                            <div className="bg-rc-light rounded-lg p-2">
                                                <UserGroupIcon className="h-4 w-4 mx-auto text-rc-orange" />
                                                <p className="text-sm font-bold">{building.occupied}</p>
                                                <p className="text-xs text-gray-500">Occupied</p>
                                            </div>
                                            <div className="bg-rc-light rounded-lg p-2">
                                                <BanknotesIcon className="h-4 w-4 mx-auto text-rc-dark" />
                                                <p className="text-sm font-bold">₱{(building.income / 1000).toFixed(1)}k</p>
                                                <p className="text-xs text-gray-500">Income</p>
                                            </div>
                                        </div>

                                        {/* Insurance Status */}
                                        <div className={`mt-4 p-2 rounded-lg text-xs flex items-center ${building.insurance.includes('Expired') ? 'bg-red-50 text-red-600' : 'bg-rc-teal/10 text-rc-teal'}`}>
                                            <ShieldCheckIcon className="h-4 w-4 mr-2" />
                                            {building.insurance}
                                        </div>

                                        {/* Last Inspection */}
                                        <p className="mt-2 text-xs text-gray-400 flex items-center">
                                            <CalendarIcon className="h-3 w-3 mr-1" /> Last inspection: {building.last_inspection}
                                        </p>

                                        {/* Actions */}
                                        <div className="mt-4 pt-4 border-t flex justify-between">
                                            <button onClick={() => setSelectedBuilding(building)} className="text-sm text-rc-teal hover:text-rc-orange">
                                                View Details →
                                            </button>
                                            <div className="flex gap-2">
                                                <button className="p-2 text-gray-400 hover:text-rc-teal"><PencilIcon className="h-4 w-4" /></button>
                                                <button onClick={() => handleDelete(building.id)} className="p-2 text-gray-400 hover:text-red-600"><TrashIcon className="h-4 w-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </>
                ) : (
                    <EmptyState icon="🏢" title="No buildings found" description="Try different search terms or add a new building" />
                )}

                {/* Building Detail Modal */}
                {selectedBuilding && !showGallery && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedBuilding(null)} />
                        <div className="bg-white rounded-xl max-w-lg w-full mx-4 z-10 overflow-hidden">
                            <div className="bg-gradient-to-r from-rc-teal to-rc-dark p-6 flex justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{selectedBuilding.name}</h3>
                                    <p className="text-sm text-gray-300">{selectedBuilding.address}</p>
                                </div>
                                <button onClick={() => setSelectedBuilding(null)} className="text-white/70">✕</button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="bg-rc-light rounded-lg p-3">
                                        <p className="text-xl font-bold text-rc-teal">{selectedBuilding.units_count}</p>
                                        <p className="text-xs">Units</p>
                                    </div>
                                    <div className="bg-rc-light rounded-lg p-3">
                                        <p className="text-xl font-bold text-rc-orange">{selectedBuilding.occupied}</p>
                                        <p className="text-xs">Occupied</p>
                                    </div>
                                    <div className="bg-rc-light rounded-lg p-3">
                                        <p className="text-xl font-bold text-rc-dark">₱{selectedBuilding.income.toLocaleString()}</p>
                                        <p className="text-xs">Income</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowGallery(true)} className="w-full px-4 py-2 bg-rc-orange text-white rounded-lg">
                                    📸 View Photo Gallery ({selectedBuilding.photos} photos)
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Gallery Modal */}
                {showGallery && selectedBuilding && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-70" onClick={() => setShowGallery(false)} />
                        <div className="bg-white rounded-xl max-w-2xl w-full mx-4 z-10 p-6">
                            <div className="flex justify-between mb-4">
                                <h3 className="text-xl font-bold text-rc-dark">{selectedBuilding.name} - Gallery</h3>
                                <button onClick={() => setShowGallery(false)} className="text-gray-400">✕</button>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {[...Array(selectedBuilding.photos)].map((_, i) => (
                                    <div key={i} className="aspect-square bg-rc-light rounded-lg flex items-center justify-center">
                                        <PhotoIcon className="h-8 w-8 text-gray-300" />
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