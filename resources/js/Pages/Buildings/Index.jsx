import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Spinner, ConfirmModal, EmptyState, Pagination, Toast, useDebounce, StatusBadge, FilterChips } from '@/Components/UI';
import {
    PlusIcon, BuildingOfficeIcon, MapPinIcon, HomeIcon,
    MagnifyingGlassIcon, PencilIcon, TrashIcon, CameraIcon,
    StarIcon, ShieldCheckIcon, CalendarIcon, PhotoIcon,
    BanknotesIcon, UserGroupIcon,
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

    // Extract raw array whether props are passed directly or via Laravel Pagination
    const allBuildings = Array.isArray(buildings) ? buildings : (buildings?.data ?? []);

    const filtered = allBuildings.filter(b => {
        const matchesSearch = (b.name ?? '').toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                             (b.address ?? '').toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                             (b.city ?? '').toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesFilter = activeFilter === 'All' || (b.status ?? 'active').toLowerCase() === activeFilter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const perPage = 6;
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    // Aggregated Metrics
    const totalUnits = allBuildings.reduce((sum, b) => sum + (Number(b.units_count) || 0), 0);
    const avgOccupancy = allBuildings.length > 0 
        ? Math.round(allBuildings.reduce((sum, b) => sum + (Number(b.occupancy) || 0), 0) / allBuildings.length) 
        : 0;
    const totalIncome = allBuildings.reduce((sum, b) => sum + (Number(b.income) || 0), 0);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        if (!deleteId) return;
        router.delete(`/buildings/${deleteId}`, {
            onSuccess: () => {
                setShowDelete(false);
                setToast({ message: 'Building deleted successfully!', type: 'success' });
                setTimeout(() => setToast(null), 3000);
            },
            onError: () => {
                setShowDelete(false);
                setToast({ message: 'Failed to delete building.', type: 'error' });
            }
        });
    };

    const getPerformanceColor = (score = 100) => {
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
            <ConfirmModal 
                show={showDelete} 
                onClose={() => setShowDelete(false)} 
                onConfirm={confirmDelete} 
                title={allBuildings.find(b => b.id === deleteId)?.name || 'Delete Building'} 
            />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Buildings</h1>
                        <p className="text-gray-500 mt-1">Manage your rental properties</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/buildings/create" className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark transition-colors flex items-center">
                            <PlusIcon className="h-5 w-5 mr-1" /> Add Building
                        </Link>
                    </div>
                </div>

                {/* Database Metrics Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange shadow-sm">
                        <p className="text-sm text-gray-500">Total Buildings</p>
                        <p className="text-2xl font-bold text-rc-dark">{allBuildings.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-teal shadow-sm">
                        <p className="text-sm text-gray-500">Total Units</p>
                        <p className="text-2xl font-bold text-rc-dark">{totalUnits}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-dark shadow-sm">
                        <p className="text-sm text-gray-500">Avg Occupancy</p>
                        <p className="text-2xl font-bold text-rc-teal">{avgOccupancy}%</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange shadow-sm">
                        <p className="text-sm text-gray-500">Total Monthly Income</p>
                        <p className="text-2xl font-bold text-rc-orange">₱{totalIncome.toLocaleString()}</p>
                    </div>
                </div>

                {/* Filters */}
                <FilterChips filters={['All', 'Active', 'Maintenance']} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

                {/* Search */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search by building name, address, or city..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-rc-orange focus:border-rc-orange" 
                        />
                    </div>
                </div>

                {/* Building Cards */}
                {paginated.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginated.map((building) => {
                                const unitsCount = Number(building.units_count ?? 0);
                                const occupiedCount = Number(building.occupied ?? 0);
                                const monthlyIncome = Number(building.income ?? 0);
                                const rating = Number(building.rating ?? 5.0);
                                const perfScore = Number(building.performance_score ?? 100);
                                const amenitiesList = Array.isArray(building.amenities) ? building.amenities : [];

                                return (
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
                                                {building.photos_count ?? building.photos ?? 0} photos
                                            </span>
                                        </div>

                                        {/* Body */}
                                        <div className="pt-10 px-6 pb-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-rc-dark">{building.name}</h3>
                                                    <p className="text-sm text-gray-500 flex items-center mt-1">
                                                        <MapPinIcon className="h-4 w-4 mr-1 shrink-0" /> 
                                                        {building.address}{building.city ? `, ${building.city}` : ''}
                                                    </p>
                                                </div>
                                                <StatusBadge status={building.status ?? 'active'} />
                                            </div>

                                            {/* Rating */}
                                            <div className="mt-3 flex items-center gap-2">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarIcon key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
                                                {building.year_built && (
                                                    <span className="text-xs text-gray-400">• Built {building.year_built}</span>
                                                )}
                                            </div>

                                            {/* Performance Score */}
                                            <div className="mt-4">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-gray-500">Performance Score</span>
                                                    <span className={`font-bold ${getPerformanceColor(perfScore)}`}>{perfScore}/100</span>
                                                </div>
                                                <div className="h-2 bg-rc-light rounded-full">
                                                    <div 
                                                        className={`h-2 rounded-full ${perfScore >= 85 ? 'bg-rc-teal' : perfScore >= 70 ? 'bg-rc-orange' : 'bg-red-500'}`} 
                                                        style={{ width: `${perfScore}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Amenities */}
                                            {amenitiesList.length > 0 && (
                                                <div className="mt-4 flex flex-wrap gap-1">
                                                    {amenitiesList.map(amenity => (
                                                        <span key={amenity} className="px-2 py-1 bg-rc-light text-rc-dark rounded-full text-xs">{amenity}</span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Stats Grid */}
                                            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                                <div className="bg-rc-light rounded-lg p-2">
                                                    <HomeIcon className="h-4 w-4 mx-auto text-rc-teal" />
                                                    <p className="text-sm font-bold">{unitsCount}</p>
                                                    <p className="text-xs text-gray-500">Units</p>
                                                </div>
                                                <div className="bg-rc-light rounded-lg p-2">
                                                    <UserGroupIcon className="h-4 w-4 mx-auto text-rc-orange" />
                                                    <p className="text-sm font-bold">{occupiedCount}</p>
                                                    <p className="text-xs text-gray-500">Occupied</p>
                                                </div>
                                                <div className="bg-rc-light rounded-lg p-2">
                                                    <BanknotesIcon className="h-4 w-4 mx-auto text-rc-dark" />
                                                    <p className="text-sm font-bold">₱{(monthlyIncome / 1000).toFixed(1)}k</p>
                                                    <p className="text-xs text-gray-500">Income</p>
                                                </div>
                                            </div>

                                            {/* Insurance Status */}
                                            {building.insurance && (
                                                <div className={`mt-4 p-2 rounded-lg text-xs flex items-center ${building.insurance.includes('Expired') ? 'bg-red-50 text-red-600' : 'bg-rc-teal/10 text-rc-teal'}`}>
                                                    <ShieldCheckIcon className="h-4 w-4 mr-2 shrink-0" />
                                                    {building.insurance}
                                                </div>
                                            )}

                                            {/* Inspection Date */}
                                            {building.last_inspection && (
                                                <p className="mt-2 text-xs text-gray-400 flex items-center">
                                                    <CalendarIcon className="h-3 w-3 mr-1" /> Last inspection: {building.last_inspection}
                                                </p>
                                            )}

                                            {/* Actions */}
                                            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                                <button onClick={() => setSelectedBuilding(building)} className="text-sm font-medium text-rc-teal hover:text-rc-orange transition-colors">
                                                    View Details →
                                                </button>
                                                <div className="flex gap-1">
                                                    <Link href={`/buildings/${building.id}/edit`} className="p-2 text-gray-400 hover:text-rc-teal transition-colors">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                    <button onClick={() => handleDelete(building.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
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
                    <EmptyState icon="🏢" title="No buildings found" description="Try adjusting your search criteria or create a new building." />
                )}

                {/* Building Detail Modal */}
                {selectedBuilding && !showGallery && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setSelectedBuilding(null)} />
                        <div className="bg-white rounded-xl max-w-lg w-full z-10 overflow-hidden shadow-2xl">
                            <div className="bg-gradient-to-r from-rc-teal to-rc-dark p-6 flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{selectedBuilding.name}</h3>
                                    <p className="text-sm text-gray-200 mt-1">{selectedBuilding.address}, {selectedBuilding.city}</p>
                                </div>
                                <button onClick={() => setSelectedBuilding(null)} className="text-white/70 hover:text-white text-lg">✕</button>
                            </div>
                            <div className="p-6 space-y-4">
                                {selectedBuilding.description && (
                                    <p className="text-sm text-gray-600">{selectedBuilding.description}</p>
                                )}
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="bg-rc-light rounded-lg p-3">
                                        <p className="text-xl font-bold text-rc-teal">{selectedBuilding.units_count ?? 0}</p>
                                        <p className="text-xs text-gray-500">Units</p>
                                    </div>
                                    <div className="bg-rc-light rounded-lg p-3">
                                        <p className="text-xl font-bold text-rc-orange">{selectedBuilding.occupied ?? 0}</p>
                                        <p className="text-xs text-gray-500">Occupied</p>
                                    </div>
                                    <div className="bg-rc-light rounded-lg p-3">
                                        <p className="text-xl font-bold text-rc-dark">₱{Number(selectedBuilding.income ?? 0).toLocaleString()}</p>
                                        <p className="text-xs text-gray-500">Income</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowGallery(true)} className="w-full py-2.5 bg-rc-orange text-white font-medium rounded-lg hover:bg-rc-orangeDark transition-colors">
                                    📸 View Photo Gallery ({selectedBuilding.photos_count ?? selectedBuilding.photos ?? 0} photos)
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Gallery Modal */}
                {showGallery && selectedBuilding && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" onClick={() => setShowGallery(false)} />
                        <div className="bg-white rounded-xl max-w-2xl w-full z-10 p-6 shadow-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-rc-dark">{selectedBuilding.name} - Gallery</h3>
                                <button onClick={() => setShowGallery(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                                {[...Array(Number(selectedBuilding.photos_count ?? selectedBuilding.photos ?? 4))].map((_, i) => (
                                    <div key={i} className="aspect-square bg-rc-light rounded-lg flex items-center justify-center border border-gray-100">
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