import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        description: '',
        category: 'Rent',
        type: 'income',
        amount: '',
        date: '',
        building: '',
        unit: '',
        payment_method: 'Cash',
        status: 'completed',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/transactions', {
            onSuccess: () => alert('Transaction added successfully!'),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Transaction" />
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-rc-dark">Add Transaction</h1>
                    <Link href="/transactions" className="text-rc-teal hover:text-rc-orange">← Back</Link>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-orange">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-rc-dark">Description *</label>
                            <input type="text" value={data.description} onChange={(e) => setData('description', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Type</label>
                                <select value={data.type} onChange={(e) => setData('type', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg">
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Category</label>
                                <select value={data.category} onChange={(e) => setData('category', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg">
                                    <option>Rent</option>
                                    <option>Maintenance</option>
                                    <option>Utilities</option>
                                    <option>Insurance</option>
                                    <option>Deposit</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Amount ($) *</label>
                                <input type="number" value={data.amount} onChange={(e) => setData('amount', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Date</label>
                                <input type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg" />
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
                                <label className="block text-sm font-medium text-rc-dark">Payment Method</label>
                                <select value={data.payment_method} onChange={(e) => setData('payment_method', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg">
                                    <option>Cash</option>
                                    <option>Bank Transfer</option>
                                    <option>Auto-debit</option>
                                    <option>Check</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-rc-dark">Status</label>
                                <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg">
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Link href="/transactions" className="px-4 py-2 bg-rc-light text-rc-dark rounded-lg">Cancel</Link>
                            <button type="submit" disabled={processing} className="px-6 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark disabled:opacity-50">
                                {processing ? 'Saving...' : 'Save Transaction'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}