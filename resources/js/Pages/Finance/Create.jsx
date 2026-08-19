import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ tenants = [], buildings = [], units = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        description: '',
        type: 'income',
        category: 'Rent',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        tenant_id: '',
        building_id: '',
        unit_id: '',
        payment_method: 'Cash',
        status: 'completed',
    });

    // Filter units depending on selected building
    const filteredUnits = data.building_id 
        ? units.filter((u) => String(u.building_id) === String(data.building_id)) 
        : units;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/transactions');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Transaction" />
            <div className="max-w-3xl mx-auto py-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-rc-dark">Add Transaction</h1>
                    <Link href="/transactions" className="text-rc-teal hover:text-rc-orange font-medium">← Back</Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-orange">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-rc-dark">Description *</label>
                            <input 
                                type="text" 
                                value={data.description} 
                                onChange={(e) => setData('description', e.target.value)} 
                                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-rc-orange focus:border-rc-orange ${errors.description ? 'border-red-500' : 'border-gray-200'}`} 
                                required 
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        {/* Type & Category */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Type</label>
                                <select 
                                    value={data.type} 
                                    onChange={(e) => setData('type', e.target.value)} 
                                    className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-rc-orange focus:border-rc-orange"
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Category</label>
                                <select 
                                    value={data.category} 
                                    onChange={(e) => setData('category', e.target.value)} 
                                    className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-rc-orange focus:border-rc-orange"
                                >
                                    <option value="Rent">Rent</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Deposit">Deposit</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                            </div>
                        </div>

                        {/* Amount & Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Amount (₱) *</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    value={data.amount} 
                                    onChange={(e) => setData('amount', e.target.value)} 
                                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-rc-orange focus:border-rc-orange ${errors.amount ? 'border-red-500' : 'border-gray-200'}`} 
                                    required 
                                />
                                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Date *</label>
                                <input 
                                    type="date" 
                                    value={data.date} 
                                    onChange={(e) => setData('date', e.target.value)} 
                                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-rc-orange focus:border-rc-orange ${errors.date ? 'border-red-500' : 'border-gray-200'}`} 
                                    required
                                />
                                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                            </div>
                        </div>

                        {/* Tenant Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-rc-dark">Tenant</label>
                            <select 
                                value={data.tenant_id} 
                                onChange={(e) => setData('tenant_id', e.target.value)} 
                                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-rc-orange focus:border-rc-orange"
                            >
                                <option value="">Select Tenant</option>
                                {tenants.map((tenant) => (
                                    <option key={tenant.id} value={tenant.id}>
                                        {tenant.full_name}
                                    </option>
                                ))}
                            </select>
                            {errors.tenant_id && <p className="text-red-500 text-xs mt-1">{errors.tenant_id}</p>}
                        </div>

                        {/* Building & Unit Dropdowns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Building</label>
                                <select 
                                    value={data.building_id} 
                                    onChange={(e) => setData({
                                        ...data,
                                        building_id: e.target.value,
                                        unit_id: '',
                                    })} 
                                    className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-rc-orange focus:border-rc-orange"
                                >
                                    <option value="">Select Building</option>
                                    {buildings.map((b) => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                                {errors.building_id && <p className="text-red-500 text-xs mt-1">{errors.building_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Unit</label>
                                <select 
                                    value={data.unit_id} 
                                    onChange={(e) => setData('unit_id', e.target.value)} 
                                    className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-rc-orange focus:border-rc-orange"
                                >
                                    <option value="">Select Unit</option>
                                    {filteredUnits.map((u) => (
                                        <option key={u.id} value={u.id}>Unit {u.unit_number}</option>
                                    ))}
                                </select>
                                {errors.unit_id && <p className="text-red-500 text-xs mt-1">{errors.unit_id}</p>}
                            </div>
                        </div>

                        {/* Payment Method & Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Payment Method</label>
                                <select 
                                    value={data.payment_method} 
                                    onChange={(e) => setData('payment_method', e.target.value)} 
                                    className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-rc-orange focus:border-rc-orange"
                                >
                                    <option value="GCash">GCash</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Auto-debit">Auto-debit</option>
                                    <option value="Check">Check</option>
                                </select>
                                {errors.payment_method && <p className="text-red-500 text-xs mt-1">{errors.payment_method}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Status</label>
                                <select 
                                    value={data.status} 
                                    onChange={(e) => setData('status', e.target.value)} 
                                    className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-rc-orange focus:border-rc-orange"
                                >
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="failed">Failed</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <Link href="/transactions" className="px-4 py-2 bg-rc-light text-rc-dark rounded-lg hover:bg-gray-200 transition-colors">
                                Cancel
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="px-6 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark transition-colors disabled:opacity-50 font-medium"
                            >
                                {processing ? 'Saving...' : 'Save Transaction'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}