import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        unit: '',
        building: '',
        monthly_rent: '',
        deposit: '',
        lease_start: '',
        lease_end: '',
        status: 'viewing',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/tenants', {
            onSuccess: () => alert('Tenant added successfully!'),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Tenant" />
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-rc-dark">Onboard Tenant</h1>
                    <Link href="/tenants" className="text-rc-teal hover:text-rc-orange">← Back</Link>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-teal">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Full Name *</label>
                                <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Email *</label>
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Phone *</label>
                                <input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Status</label>
                                <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg">
                                    <option value="viewing">Viewing</option>
                                    <option value="active">Active</option>
                                    <option value="moved_out">Moved Out</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Building</label>
                                <input type="text" value={data.building} onChange={(e) => setData('building', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Unit</label>
                                <input type="text" value={data.unit} onChange={(e) => setData('unit', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Monthly Rent ($)</label>
                                <input type="number" value={data.monthly_rent} onChange={(e) => setData('monthly_rent', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Deposit ($)</label>
                                <input type="number" value={data.deposit} onChange={(e) => setData('deposit', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Lease Start</label>
                                <input type="date" value={data.lease_start} onChange={(e) => setData('lease_start', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Lease End</label>
                                <input type="date" value={data.lease_end} onChange={(e) => setData('lease_end', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Link href="/tenants" className="px-4 py-2 bg-rc-light text-rc-dark rounded-lg">Cancel</Link>
                            <button type="submit" disabled={processing} className="px-6 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark disabled:opacity-50">
                                {processing ? 'Saving...' : 'Onboard Tenant'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}