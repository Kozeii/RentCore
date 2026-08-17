import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Spinner, ConfirmModal, EmptyState, Pagination, Toast, useDebounce, StatusBadge, FilterChips } from '@/Components/UI';
import { PlusIcon, BuildingOfficeIcon, MapPinIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Index({ buildings = [] }) {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [toast, setToast] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState('All');
    const debouncedSearch = useDebounce(searchTerm, 300);

    const sampleBuildings = [
        { id: 1, name: 'Sunset Apartments', address: '123 Main Street', city: 'Manila', state: 'NCR', units_count: 20, occupied: 16, income: 25000, status: 'active' },
        { id: 2, name: 'Green Valley Condos', address: '456 Oak Avenue', city: 'Quezon City', state: 'NCR', units_count: 15, occupied: 12, income: 18000, status: 'active' },
        { id: 3, name: 'Riverside Towers', address: '789 River Road', city: 'Makati', state: 'NCR', units_count: 25, occupied: 22, income: 35000, status: 'maintenance' },
        { id: 4, name: 'Palm Residences', address: '321 Palm Street', city: 'Pasig', state: 'NCR', units_count: 10, occupied: 8, income: 12000, status: 'active' },
        { id: 5, name: 'Oakwood Heights', address: '555 Oak Drive', city: 'Taguig', state: 'NCR', units_count: 30, occupied: 25, income: 42000, status: 'active' },
        { id: 6, name: 'Cedar Court', address: '777 Cedar Lane', city: 'Mandaluyong', state: 'NCR', units_count: 12, occupied: 10, income: 15000, status: 'maintenance' },
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

    if (loading) {
        return (
            <AuthenticatedLayout>
                <Head title="Buildings" />
                <div className="space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
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
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-rc-dark">Buildings</h1>
                    <Link href="/buildings/create" className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                        <PlusIcon className="h-5 w-5 inline mr-1" /> Add Building
                    </Link>
                </div>

                <FilterChips filters={['All', 'Active', 'Maintenance']} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

                <div className="bg-white rounded-xl p-4">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="text" placeholder="Search buildings..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                    </div>
                </div>

                {paginated.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginated.map((building) => (
                                <div key={building.id} className="bg-white rounded-xl shadow-sm overflow-hidden border-t-4 border-rc-orange">
                                    <div className="h-20 bg-gradient-to-r from-rc-teal to-rc-dark relative">
                                        <div className="absolute -bottom-6 left-6 bg-white p-3 rounded-xl shadow-lg">
                                            <BuildingOfficeIcon className="h-6 w-6 text-rc-orange" />
                                        </div>
                                    </div>
                                    <div className="pt-10 px-6 pb-6">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-semibold text-rc-dark">{building.name}</h3>
                                            <StatusBadge status={building.status} />
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{building.address}, {building.city}</p>
                                        <div className="mt-4 flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Income: <span className="font-semibold text-rc-teal">₱{building.income.toLocaleString()}</span></span>
                                            <div className="flex gap-2">
                                                <button className="text-rc-teal"><PencilIcon className="h-4 w-4" /></button>
                                                <button onClick={() => handleDelete(building.id)} className="text-red-600"><TrashIcon className="h-4 w-4" /></button>
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
            </div>
        </AuthenticatedLayout>
    );
}