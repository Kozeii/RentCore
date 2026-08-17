import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    CurrencyDollarIcon, PlusIcon, MagnifyingGlassIcon,
    ArrowTrendingUpIcon, ArrowTrendingDownIcon, BanknotesIcon,
    WalletIcon, ChartBarIcon, CheckCircleIcon, ClockIcon, ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Index({ transactions = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const sampleTransactions = [
        { id: 1, description: 'Rent Payment - John Doe', category: 'Rent', type: 'income', amount: 15000, date: 'Jun 15, 2026', building: 'Sunset Apartments', status: 'completed' },
        { id: 2, description: 'Rent Payment - Jane Smith', category: 'Rent', type: 'income', amount: 12000, date: 'Jun 15, 2026', building: 'Green Valley Condos', status: 'completed' },
        { id: 3, description: 'Plumbing Repair', category: 'Maintenance', type: 'expense', amount: 4500, date: 'Jun 14, 2026', building: 'Sunset Apartments', status: 'completed' },
        { id: 4, description: 'Rent Payment - Mike Johnson', category: 'Rent', type: 'income', amount: 18000, date: 'Jun 13, 2026', building: 'Riverside Towers', status: 'completed' },
        { id: 5, description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 8000, date: 'Jun 12, 2026', building: 'All Buildings', status: 'completed' },
        { id: 6, description: 'Rent Payment - Sarah Williams', category: 'Rent', type: 'income', amount: 14000, date: 'Jun 11, 2026', building: 'Palm Residences', status: 'pending' },
    ];

    const allTransactions = transactions.length > 0 ? transactions : sampleTransactions;
    const filtered = allTransactions.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
    });

    const totalIncome = allTransactions.filter(t => t.type === 'income' && t.status === 'completed').reduce((s, t) => s + t.amount, 0);
    const totalExpenses = allTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const netCashFlow = totalIncome - totalExpenses;

    return (
        <AuthenticatedLayout>
            <Head title="Finance" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-rc-dark">Finance</h1>
                    <Link href="/transactions/create" className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                        <PlusIcon className="h-5 w-5 inline mr-1" /> Add Transaction
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-rc-teal to-rc-dark rounded-xl p-6 text-white">
                        <BanknotesIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Total Income</p>
                        <p className="text-3xl font-bold">₱{totalIncome.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-rc-orange to-rc-orangeDark rounded-xl p-6 text-white">
                        <WalletIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Total Expenses</p>
                        <p className="text-3xl font-bold">₱{totalExpenses.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-rc-dark to-gray-800 rounded-xl p-6 text-white">
                        <ChartBarIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Net Cash Flow</p>
                        <p className="text-3xl font-bold">₱{netCashFlow.toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input type="text" placeholder="Search transactions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                        </div>
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 border rounded-lg">
                            <option value="all">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border-t-4 border-rc-orange">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-rc-dark">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs text-white uppercase">Description</th>
                                <th className="px-6 py-3 text-left text-xs text-white uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs text-white uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs text-white uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs text-white uppercase">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filtered.map((t) => (
                                <tr key={t.id} className="hover:bg-rc-light">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {t.type === 'income' ? (
                                                <ArrowTrendingUpIcon className="h-5 w-5 text-rc-teal mr-2" />
                                            ) : (
                                                <ArrowTrendingDownIcon className="h-5 w-5 text-rc-orange mr-2" />
                                            )}
                                            <span className="text-sm">{t.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">{t.category}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{t.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${t.status === 'completed' ? 'bg-rc-teal/10 text-rc-teal' : 'bg-rc-orange/10 text-rc-orange'}`}>{t.status}</span>
                                    </td>
                                    <td className={`px-6 py-4 text-right font-semibold ${t.type === 'income' ? 'text-rc-teal' : 'text-rc-orange'}`}>
                                        {t.type === 'income' ? '+' : '-'}₱{t.amount.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}