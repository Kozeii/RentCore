import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    DocumentTextIcon,
    DocumentArrowDownIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    FolderIcon,
    ClipboardDocumentIcon,
    ShieldCheckIcon,
    BanknotesIcon,
    KeyIcon,
    WrenchScrewdriverIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    EyeIcon,
    ArrowDownTrayIcon,
    PencilSquareIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';

export default function Index({ documents = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [viewMode, setViewMode] = useState('grid');

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
        {
            id: 1,
            title: 'Lease Agreement - John Doe',
            type: 'Lease Agreement',
            category: 'Lease Agreements',
            tenant: 'John Doe',
            building: 'Sunset Apartments',
            unit: 'Unit 101',
            generated: 'Jun 15, 2026',
            status: 'signed',
            size: '245 KB',
        },
        {
            id: 2,
            title: 'Rent Receipt - Jane Smith',
            type: 'Rent Receipt',
            category: 'Rent Receipts',
            tenant: 'Jane Smith',
            building: 'Green Valley Condos',
            unit: 'Unit 204',
            generated: 'Jun 15, 2026',
            status: 'generated',
            size: '85 KB',
        },
        {
            id: 3,
            title: 'Move-in Report - Mike Johnson',
            type: 'Move-in Report',
            category: 'Move-in Reports',
            tenant: 'Mike Johnson',
            building: 'Riverside Towers',
            unit: 'Unit 305',
            generated: 'Jun 14, 2026',
            status: 'signed',
            size: '180 KB',
        },
        {
            id: 4,
            title: 'Late Payment Notice - Emily Davis',
            type: 'Notice',
            category: 'Notices',
            tenant: 'Emily Davis',
            building: 'Green Valley Condos',
            unit: 'Unit 302',
            generated: 'Jun 13, 2026',
            status: 'pending',
            size: '95 KB',
        },
        {
            id: 5,
            title: 'Maintenance Request - Sarah Williams',
            type: 'Maintenance',
            category: 'Maintenance',
            tenant: 'Sarah Williams',
            building: 'Palm Residences',
            unit: 'Unit 402',
            generated: 'Jun 12, 2026',
            status: 'generated',
            size: '120 KB',
        },
        {
            id: 6,
            title: 'Lease Agreement - Tom Brown',
            type: 'Lease Agreement',
            category: 'Lease Agreements',
            tenant: 'Tom Brown',
            building: 'Sunset Apartments',
            unit: 'Unit 108',
            generated: 'Jun 10, 2026',
            status: 'signed',
            size: '245 KB',
        },
        {
            id: 7,
            title: 'Move-out Report - Emily Davis',
            type: 'Move-out Report',
            category: 'Move-out Reports',
            tenant: 'Emily Davis',
            building: 'Green Valley Condos',
            unit: 'Unit 302',
            generated: 'Jun 08, 2026',
            status: 'generated',
            size: '150 KB',
        },
        {
            id: 8,
            title: 'Utility Notice - All Tenants',
            type: 'Notice',
            category: 'Notices',
            tenant: 'All Tenants',
            building: 'Sunset Apartments',
            unit: 'All Units',
            generated: 'Jun 05, 2026',
            status: 'sent',
            size: '75 KB',
        },
    ];

    const allDocuments = documents.length > 0 ? documents : sampleDocuments;

    const filteredDocuments = allDocuments.filter(doc => {
        const matchesSearch = 
            doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.tenant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.building?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    const getStatusColor = (status) => {
        switch(status) {
            case 'signed': return 'bg-rc-teal/10 text-rc-teal';
            case 'generated': return 'bg-rc-orange/10 text-rc-orange';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'sent': return 'bg-rc-dark/10 text-rc-dark';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'signed': return CheckCircleIcon;
            case 'generated': return ClockIcon;
            case 'pending': return XCircleIcon;
            case 'sent': return DocumentArrowDownIcon;
            default: return DocumentTextIcon;
        }
    };

    const signedCount = allDocuments.filter(d => d.status === 'signed').length;
    const generatedCount = allDocuments.filter(d => d.status === 'generated').length;
    const pendingCount = allDocuments.filter(d => d.status === 'pending').length;

    return (
        <AuthenticatedLayout>
            <Head title="Documents" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Documents</h1>
                        <p className="mt-1 text-gray-500">Generate and manage legal documents</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-rc-light">
                            📤 Upload
                        </button>
                        <Link href="/documents/generate" className="inline-flex items-center px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Generate Document
                        </Link>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-orange">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Documents</p>
                                <p className="text-2xl font-bold text-rc-dark">{allDocuments.length}</p>
                            </div>
                            <DocumentTextIcon className="h-8 w-8 text-rc-orange" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-teal">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Signed</p>
                                <p className="text-2xl font-bold text-rc-teal">{signedCount}</p>
                            </div>
                            <CheckCircleIcon className="h-8 w-8 text-rc-teal" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-dark">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Generated</p>
                                <p className="text-2xl font-bold text-rc-dark">{generatedCount}</p>
                            </div>
                            <ClockIcon className="h-8 w-8 text-rc-dark" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                            </div>
                            <XCircleIcon className="h-8 w-8 text-yellow-500" />
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search documents by title, tenant, or building..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rc-orange focus:border-rc-orange"
                            />
                        </div>
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button onClick={() => setViewMode('grid')} className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-rc-orange text-white' : 'bg-white text-gray-500'}`}>▦</button>
                            <button onClick={() => setViewMode('list')} className={`px-3 py-2 ${viewMode === 'list' ? 'bg-rc-orange text-white' : 'bg-white text-gray-500'}`}>☰</button>
                        </div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                selectedCategory === category.name
                                    ? 'bg-rc-orange text-white'
                                    : 'bg-white text-rc-dark border border-gray-200 hover:bg-rc-light'
                            }`}
                        >
                            <category.icon className="h-4 w-4 mr-2" />
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Grid View */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDocuments.map((doc) => {
                            const StatusIcon = getStatusIcon(doc.status);
                            return (
                                <div key={doc.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-rc-orange group">
                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div className="bg-rc-teal/10 p-3 rounded-xl">
                                                <DocumentTextIcon className="h-6 w-6 text-rc-teal" />
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(doc.status)}`}>
                                                <StatusIcon className="h-3 w-3 mr-1" />
                                                {doc.status}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="mt-4 text-lg font-semibold text-rc-dark group-hover:text-rc-orange transition-colors">
                                            {doc.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">{doc.type}</p>

                                        {/* Details */}
                                        <div className="mt-4 space-y-2">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium text-rc-dark">Tenant:</span> {doc.tenant}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium text-rc-dark">Building:</span> {doc.building}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium text-rc-dark">Unit:</span> {doc.unit}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Generated: {doc.generated} • {doc.size}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => setSelectedDocument(doc)}
                                                    className="p-2 text-gray-400 hover:text-rc-teal transition-colors"
                                                    title="View"
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-rc-orange transition-colors" title="Download">
                                                    <ArrowDownTrayIcon className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-rc-dark transition-colors" title="Edit">
                                                    <PencilSquareIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <button 
                                                onClick={() => setSelectedDocument(doc)}
                                                className="text-sm font-medium text-rc-teal hover:text-rc-orange"
                                            >
                                                View →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* List View */
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-t-4 border-rc-orange">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-rc-dark">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Document</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Tenant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredDocuments.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-rc-light">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="bg-rc-teal/10 p-2 rounded-lg">
                                                    <DocumentTextIcon className="h-5 w-5 text-rc-teal" />
                                                </div>
                                                <span className="ml-3 font-medium text-rc-dark">{doc.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{doc.type}</td>
                                        <td className="px-6 py-4 text-sm text-rc-dark">{doc.tenant}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{doc.generated}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>{doc.status}</span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button className="text-rc-teal text-sm">View</button>
                                            <button className="text-rc-orange text-sm">Download</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Empty State */}
                {filteredDocuments.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm py-16 text-center border-t-4 border-rc-orange">
                        <DocumentTextIcon className="h-16 w-16 text-gray-300 mx-auto" />
                        <h3 className="mt-4 text-lg font-medium text-rc-dark">No documents found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm ? 'Try different search terms' : 'Generate your first document'}
                        </p>
                        {!searchTerm && (
                            <Link href="/documents/generate" className="mt-6 inline-flex items-center px-6 py-3 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Generate Document
                            </Link>
                        )}
                    </div>
                )}

                {/* Document Preview Modal */}
                {selectedDocument && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedDocument(null)} />
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 z-10 overflow-hidden">
                            <div className="bg-gradient-to-r from-rc-teal to-rc-dark p-6 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white">Document Preview</h3>
                                <button onClick={() => setSelectedDocument(null)} className="text-white/70 hover:text-white">✕</button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="bg-rc-light rounded-lg p-4">
                                    <h4 className="font-semibold text-rc-dark text-lg">{selectedDocument.title}</h4>
                                    <p className="text-sm text-gray-500">{selectedDocument.type}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Tenant</p>
                                        <p className="font-medium text-rc-dark">{selectedDocument.tenant}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Building</p>
                                        <p className="font-medium text-rc-dark">{selectedDocument.building}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Unit</p>
                                        <p className="font-medium text-rc-dark">{selectedDocument.unit}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Generated</p>
                                        <p className="font-medium text-rc-dark">{selectedDocument.generated}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex-1 px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                                        Download PDF
                                    </button>
                                    <button className="flex-1 px-4 py-2 bg-rc-teal text-white rounded-lg hover:bg-rc-tealLight">
                                        Mark as Signed
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}