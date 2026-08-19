import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ building = {} }) {
    const { data, setData, put, processing, errors } = useForm({
        name: building.name ?? '',
        address: building.address ?? '',
        city: building.city ?? '',
        province: building.province ?? building.state ?? '',
        zip_code: building.zip_code ?? '',
        description: building.description ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/buildings/${building.id}`);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit ${building.name || 'Building'}`} />

            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-rc-dark">Edit Building</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Update details for {building.name}</p>
                    </div>
                    <Link 
                        href="/buildings" 
                        className="text-sm font-medium text-rc-teal hover:text-rc-orange transition-colors"
                    >
                        ← Back to Buildings
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-teal">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Building Name */}
                        <div>
                            <label className="block text-sm font-medium text-rc-dark">Building Name *</label>
                            <input 
                                type="text" 
                                value={data.name} 
                                onChange={(e) => setData('name', e.target.value)} 
                                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rc-teal transition-all ${
                                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'
                                }`} 
                                placeholder="e.g., Angeles Commercial Building"
                                required 
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        {/* Street Address */}
                        <div>
                            <label className="block text-sm font-medium text-rc-dark">Street Address *</label>
                            <input 
                                type="text" 
                                value={data.address} 
                                onChange={(e) => setData('address', e.target.value)} 
                                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rc-teal transition-all ${
                                    errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'
                                }`} 
                                placeholder="e.g., 1234 Luwasan Catmon"
                                required 
                            />
                            {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
                        </div>

                        {/* City, Province, Zip */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">City</label>
                                <input 
                                    type="text" 
                                    value={data.city} 
                                    onChange={(e) => setData('city', e.target.value)} 
                                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rc-teal transition-all ${
                                        errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'
                                    }`} 
                                    placeholder="e.g., Santa Maria"
                                />
                                {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Province / State</label>
                                <input 
                                    type="text" 
                                    value={data.province} 
                                    onChange={(e) => setData('province', e.target.value)} 
                                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rc-teal transition-all ${
                                        errors.province ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'
                                    }`} 
                                    placeholder="e.g., Bulacan"
                                />
                                {errors.province && <p className="mt-1 text-xs text-red-600">{errors.province}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-rc-dark">ZIP Code</label>
                                <input 
                                    type="text" 
                                    value={data.zip_code} 
                                    onChange={(e) => setData('zip_code', e.target.value)} 
                                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rc-teal transition-all ${
                                        errors.zip_code ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'
                                    }`} 
                                    placeholder="e.g., 3022"
                                />
                                {errors.zip_code && <p className="mt-1 text-xs text-red-600">{errors.zip_code}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-rc-dark">Description</label>
                            <textarea 
                                value={data.description} 
                                onChange={(e) => setData('description', e.target.value)} 
                                rows={4} 
                                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rc-teal transition-all ${
                                    errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'
                                }`}
                                placeholder="Additional details about the property..."
                            ></textarea>
                            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                            <Link 
                                href="/buildings" 
                                className="px-4 py-2 bg-rc-light text-rc-dark font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="px-6 py-2 bg-rc-teal text-white font-medium rounded-lg hover:bg-rc-tealLight transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Building'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}