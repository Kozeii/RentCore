import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Spinner, ConfirmModal, EmptyState, Pagination, Toast, useDebounce, StatusBadge, FilterChips, FileUpload } from '@/Components/UI';
import {
    DocumentTextIcon, DocumentArrowDownIcon, PlusIcon,
    MagnifyingGlassIcon, FolderIcon, ClipboardDocumentIcon,
    ShieldCheckIcon, BanknotesIcon, KeyIcon, WrenchScrewdriverIcon,
    CheckCircleIcon, ClockIcon, XCircleIcon, EyeIcon,
    ArrowDownTrayIcon, PencilSquareIcon, ChevronDownIcon,
    PencilIcon, TrashIcon, SparklesIcon, LinkIcon,
    DocumentDuplicateIcon, ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Index({ documents = [] }) {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [toast, setToast] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showUpload, setShowUpload] = useState(false);
    const [showTemplateBuilder, setShowTemplateBuilder] = useState(false);
    const [showBulkGenerate, setShowBulkGenerate] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState([]);
    const debouncedSearch = useDebounce(searchTerm, 300);

    const categories = [
        { name: 'All', icon: FolderIcon },
        { name: 'Lease Agreements', icon: DocumentTextIcon },
        { name: 'Rent Receipts', icon: BanknotesIcon },
        { name: 'Move-in Reports', icon: KeyIcon },
        { name: 'Move-out Reports', icon: ClipboardDocumentIcon },
        { name: 'Notices', icon: ShieldCheckIcon },
        { name: 'Maintenance', icon: WrenchScrewdriverIcon },
    ];

    const sampleDocuments = [
        { id: 1, title: 'Lease Agreement - John Doe', type: 'Lease Agreement', category: 'Lease Agreements', tenant: 'John Doe', building: 'Sunset Apartments', unit: 'Unit 101', generated: 'Jun 15, 2026', status: 'signed', size: '245 KB', version: 'v3', expires: 'Jan 14, 2027', shared: true },
        { id: 2, title: 'Rent Receipt - Jane Smith', type: 'Rent Receipt', category: 'Rent Receipts', tenant: 'Jane Smith', building: 'Green Valley Condos', unit: 'Unit 204', generated: 'Jun 15, 2026', status: 'generated', size: '85 KB', version: 'v1', expires: '-', shared: false },
        { id: 3, title: 'Move-in Report - Mike Johnson', type: 'Move-in Report', category: 'Move-in Reports', tenant: 'Mike Johnson', building: 'Riverside Towers', unit: 'Unit 305', generated: 'Jun 14, 2026', status: 'signed', size: '180 KB', version: 'v2', expires: '-', shared: true },
        { id: 4, title: 'Late Payment Notice - Emily Davis', type: 'Notice', category: 'Notices', tenant: 'Emily Davis', building: 'Green Valley Condos', unit: 'Unit 302', generated: 'Jun 13, 2026', status: 'pending', size: '95 KB', version: 'v1', expires: 'Jul 13, 2026', shared: false },
        { id: 5, title: 'Maintenance Request - Sarah Williams', type: 'Maintenance', category: 'Maintenance', tenant: 'Sarah Williams', building: 'Palm Residences', unit: 'Unit 402', generated: 'Jun 12, 2026', status: 'generated', size: '120 KB', version: 'v1', expires: '-', shared: false },
        { id: 6, title: 'Lease Agreement - Tom Brown', type: 'Lease Agreement', category: 'Lease Agreements', tenant: 'Tom Brown', building: 'Sunset Apartments', unit: 'Unit 108', generated: 'Jun 10, 2026', status: 'signed', size: '245 KB', version: 'v2', expires: 'May 09, 2027', shared: true },
        { id: 7, title: 'Move-out Report - Emily Davis', type: 'Move-out Report', category: 'Move-out Reports', tenant: 'Emily Davis', building: 'Green Valley Condos', unit: 'Unit 302', generated: 'Jun 08, 2026', status: 'generated', size: '150 KB', version: 'v1', expires: '-', shared: false },
        { id: 8, title: 'Utility Notice - All Tenants', type: 'Notice', category: 'Notices', tenant: 'All Tenants', building: 'Sunset Apartments', unit: 'All Units', generated: 'Jun 05, 2026', status: 'sent', size: '75 KB', version: 'v1', expires: 'Jun 30, 2026', shared: true },
    ];

    const allDocuments = documents.length > 0 ? documents : sampleDocuments;
    const filtered = allDocuments.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const getStatusColor = (status) => {
        switch(status) {
            case 'signed': return 'bg-rc-teal/10 text-rc-teal';
            case 'generated': return 'bg-rc-orange/10 text-rc-orange';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'sent': return 'bg-rc-dark/10 text-rc-dark';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        setShowDelete(false);
        setToast({ message: 'Document deleted!', type: 'success' });
        setTimeout(() => setToast(null), 3000);
    };

    const handleShare = (doc) => {
        navigator.clipboard.writeText(`https://rentcore.com/docs/${doc.id}`);
        setToast({ message: 'Share link copied to clipboard!', type: 'success' });
        setTimeout(() => setToast(null), 3000);
    };

    const handleBulkGenerate = () => {
        setToast({ message: `Generated ${selectedDocs.length} documents!`, type: 'success' });
        setTimeout(() => setToast(null), 3000);
        setSelectedDocs([]);
        setShowBulkGenerate(false);
    };

    const toggleSelect = (id) => {
        if (selectedDocs.includes(id)) {
            setSelectedDocs(selectedDocs.filter(d => d !== id));
        } else {
            setSelectedDocs([...selectedDocs, id]);
        }
    };

    if (loading) {
        return (
            <AuthenticatedLayout>
                <Head title="Documents" />
                <Spinner />
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Documents" />
            
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <ConfirmModal show={showDelete} onClose={() => setShowDelete(false)} onConfirm={confirmDelete} title={allDocuments.find(d => d.id === deleteId)?.title} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Documents</h1>
                        <p className="text-gray-500 mt-1">Generate and manage legal documents</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setShowUpload(true)} className="px-4 py-2 bg-rc-teal text-white rounded-lg">📤 Upload</button>
                        <button onClick={() => setShowBulkGenerate(true)} className="px-4 py-2 bg-rc-dark text-white rounded-lg">📋 Bulk Generate</button>
                        <Link href="/documents/generate" className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                            <PlusIcon className="h-5 w-5 inline mr-1" /> Generate
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange">
                        <p className="text-sm text-gray-500">Total Documents</p>
                        <p className="text-2xl font-bold text-rc-dark">{allDocuments.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-rc-teal">
                        <p className="text-sm text-gray-500">Signed</p>
                        <p className="text-2xl font-bold text-rc-teal">{allDocuments.filter(d => d.status === 'signed').length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-yellow-500">
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{allDocuments.filter(d => d.status === 'pending').length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-t-4 border-red-500">
                        <p className="text-sm text-gray-500">Expiring Soon</p>
                        <p className="text-2xl font-bold text-red-600">{allDocuments.filter(d => d.expires !== '-' && new Date(d.expires) < new Date('2026-07-15')).length}</p>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map(cat => (
                        <button key={cat.name} onClick={() => setSelectedCategory(cat.name)} className={`flex items-center px-4 py-2 rounded-lg text-sm whitespace-nowrap ${selectedCategory === cat.name ? 'bg-rc-orange text-white' : 'bg-white border'}`}>
                            <cat.icon className="h-4 w-4 mr-2" /> {cat.name}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl p-4">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="text" placeholder="Search documents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                    </div>
                </div>

                {/* Document Cards */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((doc) => (
                            <div key={doc.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border-t-4 border-rc-orange">
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="bg-rc-teal/10 p-3 rounded-xl">
                                            <DocumentTextIcon className="h-6 w-6 text-rc-teal" />
                                        </div>
                                        <div className="flex gap-2">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedDocs.includes(doc.id)}
                                                onChange={() => toggleSelect(doc.id)}
                                                className="h-4 w-4 text-rc-orange rounded"
                                            />
                                            <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>{doc.status}</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="mt-4 font-semibold text-rc-dark">{doc.title}</h3>
                                    <p className="text-xs text-gray-500">{doc.type} • {doc.version}</p>

                                    {/* Details */}
                                    <div className="mt-3 space-y-1 text-sm">
                                        <p className="text-gray-600">Tenant: {doc.tenant}</p>
                                        <p className="text-gray-600">{doc.building} - {doc.unit}</p>
                                        <p className="text-xs text-gray-400">{doc.generated} • {doc.size}</p>
                                    </div>

                                    {/* Expiry Alert */}
                                    {doc.expires !== '-' && new Date(doc.expires) < new Date('2026-07-15') && (
                                        <div className="mt-3 p-2 bg-red-50 text-red-600 rounded-lg text-xs flex items-center">
                                            <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                                            Expires: {doc.expires}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="mt-4 pt-4 border-t flex justify-between">
                                        <div className="flex gap-2">
                                            <button onClick={() => setSelectedDocument(doc)} className="p-2 text-gray-400 hover:text-rc-teal"><EyeIcon className="h-4 w-4" /></button>
                                            <button className="p-2 text-gray-400 hover:text-rc-orange"><ArrowDownTrayIcon className="h-4 w-4" /></button>
                                            <button onClick={() => handleShare(doc)} className="p-2 text-gray-400 hover:text-rc-dark"><LinkIcon className="h-4 w-4" /></button>
                                            <button className="p-2 text-gray-400 hover:text-rc-orange"><PencilIcon className="h-4 w-4" /></button>
                                            <button onClick={() => handleDelete(doc.id)} className="p-2 text-gray-400 hover:text-red-600"><TrashIcon className="h-4 w-4" /></button>
                                        </div>
                                        <button onClick={() => setSelectedDocument(doc)} className="text-sm text-rc-teal hover:text-rc-orange">View →</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState icon="📄" title="No documents found" description="Generate or upload your first document" />
                )}

                {/* Upload Modal */}
                {showUpload && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowUpload(false)} />
                        <div className="bg-white rounded-xl max-w-md w-full mx-4 z-10 p-6">
                            <h3 className="text-lg font-bold text-rc-dark mb-4">Upload Document</h3>
                            <FileUpload onUpload={(files) => { setToast({ message: `${files.length} file(s) uploaded!`, type: 'success' }); setShowUpload(false); }} />
                        </div>
                    </div>
                )}

                {/* Bulk Generate Modal */}
                {showBulkGenerate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowBulkGenerate(false)} />
                        <div className="bg-white rounded-xl max-w-md w-full mx-4 z-10 p-6">
                            <h3 className="text-lg font-bold text-rc-dark mb-4">Bulk Generate Documents</h3>
                            <p className="text-sm text-gray-500 mb-4">Generate documents for {selectedDocs.length} selected items</p>
                            <select className="w-full px-4 py-2 border rounded-lg mb-4">
                                <option>Lease Agreement</option>
                                <option>Rent Receipt</option>
                                <option>Move-in Report</option>
                            </select>
                            <div className="flex gap-3">
                                <button onClick={() => setShowBulkGenerate(false)} className="flex-1 px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                                <button onClick={handleBulkGenerate} className="flex-1 px-4 py-2 bg-rc-orange text-white rounded-lg">Generate</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Document Preview Modal */}
                {selectedDocument && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedDocument(null)} />
                        <div className="bg-white rounded-xl max-w-lg w-full mx-4 z-10 overflow-hidden">
                            <div className="bg-gradient-to-r from-rc-teal to-rc-dark p-6 flex justify-between">
                                <h3 className="text-xl font-bold text-white">{selectedDocument.title}</h3>
                                <button onClick={() => setSelectedDocument(null)} className="text-white/70">✕</button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div><p className="text-xs text-gray-500">Type</p><p className="font-medium">{selectedDocument.type}</p></div>
                                    <div><p className="text-xs text-gray-500">Version</p><p className="font-medium">{selectedDocument.version}</p></div>
                                    <div><p className="text-xs text-gray-500">Tenant</p><p className="font-medium">{selectedDocument.tenant}</p></div>
                                    <div><p className="text-xs text-gray-500">Generated</p><p className="font-medium">{selectedDocument.generated}</p></div>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex-1 px-4 py-2 bg-rc-orange text-white rounded-lg">Download PDF</button>
                                    <button className="flex-1 px-4 py-2 bg-rc-teal text-white rounded-lg">Mark as Signed</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}