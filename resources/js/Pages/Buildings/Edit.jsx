import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ building = {} }) {
    const { data, setData, put, processing, errors } = useForm({
        name: building.name || '',
        address: building.address || '',
        city: building.city || '',
        state: building.state || '',
        zip_code: building.zip_code || '',
        description: building.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/buildings/${building.id}`, {
            onSuccess: () => alert('Building updated successfully!'),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Building" />
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-rc-dark">Edit Building</h1>
                    <Link href="/buildings" className="text-rc-teal hover:text-rc-orange">← Back</Link>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-teal">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-rc-dark">Building Name *</label>
                            <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-rc-dark">Address *</label>
                            <input type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">City</label>
                                <input type="text" value={data.city} onChange={(e) => setData('city', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">State</label>
                                <input type="text" value={data.state} onChange={(e) => setData('state', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">ZIP</label>
                                <input type="text" value={data.zip_code} onChange={(e) => setData('zip_code', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-rc-dark">Description</label>
                            <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={4} className="mt-1 w-full px-4 py-2 border rounded-lg"></textarea>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Link href="/buildings" className="px-4 py-2 bg-rc-light text-rc-dark rounded-lg">Cancel</Link>
                            <button type="submit" disabled={processing} className="px-6 py-2 bg-rc-teal text-white rounded-lg hover:bg-rc-tealLight disabled:opacity-50">
                                {processing ? 'Updating...' : 'Update Building'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}