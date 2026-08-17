import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    CurrencyDollarIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    BanknotesIcon,
    WalletIcon,
    ChartBarIcon,
    CreditCardIcon,
    ReceiptPercentIcon,
    CalendarIcon,
    BuildingOfficeIcon,
    UserGroupIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    ClockIcon,
    FunnelIcon,
    ChevronDownIcon,
    DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';

export default function Index({ transactions = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');

    const sampleTransactions = [
        { id: 1, description: 'Rent Payment - John Doe', category: 'Rent', type: 'income', amount: 1500, date: 'Jun 15, 2026', building: 'Sunset Apartments', unit: 'Unit 101', status: 'completed', payment_method: 'Bank Transfer' },
        { id: 2, description: 'Rent Payment - Jane Smith', category: 'Rent', type: 'income', amount: 1200, date: 'Jun 15, 2026', building: 'Green Valley Condos', unit: 'Unit 204', status: 'completed', payment_method: 'Cash' },
        { id: 3, description: 'Plumbing Repair', category: 'Maintenance', type: 'expense', amount: 450, date: 'Jun 14, 2026', building: 'Sunset Apartments', unit: 'Unit 101', status: 'completed', payment_method: 'Cash' },
        { id: 4, description: 'Rent Payment - Mike Johnson', category: 'Rent', type: 'income', amount: 1800, date: 'Jun 13, 2026', building: 'Riverside Towers', unit: 'Unit 305', status: 'completed', payment_method: 'Bank Transfer' },
        { id: 5, description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 800, date: 'Jun 12, 2026', building: 'All Buildings', unit: '-', status: 'completed', payment_method: 'Auto-debit' },
        { id: 6, description: 'Rent Payment - Sarah Williams', category: 'Rent', type: 'income', amount: 1400, date: 'Jun 11, 2026', building: 'Palm Residences', unit: 'Unit 402', status: 'pending', payment_method: 'Bank Transfer' },
        { id: 7, description: 'Insurance Premium', category: 'Insurance', type: 'expense', amount: 2000, date: 'Jun 10, 2026', building: 'All Buildings', unit: '-', status: 'completed', payment_method: 'Auto-debit' },
        { id: 8, description: 'Rent Payment - Tom Brown', category: 'Rent', type: 'income', amount: 1600, date: 'Jun 09, 2026', building: 'Sunset Apartments', unit: 'Unit 108', status: 'completed', payment_method: 'Cash' },
        { id: 9, description: 'Landscaping Service', category: 'Maintenance', type: 'expense', amount: 350, date: 'Jun 08, 2026', building: 'Palm Residences', unit: '-', status: 'completed', payment_method: 'Cash' },
        { id: 10, description: 'Rent Payment - Emily Davis', category: 'Rent', type: 'income', amount: 1300, date: 'Jun 07, 2026', building: 'Green Valley Condos', unit: 'Unit 302', status: 'failed', payment_method: 'Bank Transfer' },
        { id: 11, description: 'Water Bill', category: 'Utilities', type: 'expense', amount: 300, date: 'Jun 05, 2026', building: 'All Buildings', unit: '-', status: 'completed', payment_method: 'Auto-debit' },
        { id: 12, description: 'Security Deposit - New Tenant', category: 'Deposit', type: 'income', amount: 1500, date: 'Jun 03, 2026', building: 'Riverside Towers', unit: 'Unit 310', status: 'completed', payment_method: 'Bank Transfer' },
    ];

    const allTransactions = transactions.length > 0 ? transactions : sampleTransactions;

    const filteredTransactions = allTransactions.filter(t => {
        const matchesSearch = 
            t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.building?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesType = filterType === 'all' || t.type === filterType;
        const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
        
        return matchesSearch && matchesType && matchesCategory;
    });

    const totalIncome = allTransactions.filter(t => t.type === 'income' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = allTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netCashFlow = totalIncome - totalExpenses;
    const pendingAmount = allTransactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);

    const categories = ['All', 'Rent', 'Maintenance', 'Utilities', 'Insurance', 'Deposit'];

    const getTypeColor = (type) => {
        return type === 'income' ? 'text-rc-teal' : 'text-rc-orange';
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'completed': return 'bg-rc-teal/10 text-rc-teal';
            case 'pending': return 'bg-rc-orange/10 text-rc-orange';
            case 'failed': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'completed': return CheckCircleIcon;
            case 'pending': return ClockIcon;
            case 'failed': return ExclamationCircleIcon;
            default: return ClockIcon;
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Finance" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Finance</h1>
                        <p className="mt-1 text-gray-500">Track income, expenses, and cash flow</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-rc-light">
                            📥 Export Report
                        </button>
                        <Link href="/transactions/create" className="inline-flex items-center px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Add Transaction
                        </Link>
                    </div>
                </div>

                {/* Financial Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-rc-teal to-rc-dark rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-80">Total Income</p>
                                <p className="text-3xl font-bold mt-2">${totalIncome.toLocaleString()}</p>
                            </div>
                            <ArrowTrendingUpIcon className="h-10 w-10 opacity-50" />
                        </div>
                        <p className="text-xs mt-3 opacity-70">↑ 8% from last month</p>
                    </div>
                    <div className="bg-gradient-to-br from-rc-orange to-rc-orangeDark rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-80">Total Expenses</p>
                                <p className="text-3xl font-bold mt-2">${totalExpenses.toLocaleString()}</p>
                            </div>
                            <ArrowTrendingDownIcon className="h-10 w-10 opacity-50" />
                        </div>
                        <p className="text-xs mt-3 opacity-70">↓ 2% from last month</p>
                    </div>
                    <div className="bg-gradient-to-br from-rc-dark to-gray-800 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-80">Net Cash Flow</p>
                                <p className="text-3xl font-bold mt-2">${netCashFlow.toLocaleString()}</p>
                            </div>
                            <ChartBarIcon className="h-10 w-10 opacity-50" />
                        </div>
                        <p className="text-xs mt-3 opacity-70">↑ 12% from last month</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-80">Pending Amount</p>
                                <p className="text-3xl font-bold mt-2">${pendingAmount.toLocaleString()}</p>
                            </div>
                            <ClockIcon className="h-10 w-10 opacity-50" />
                        </div>
                        <p className="text-xs mt-3 opacity-70">Awaiting confirmation</p>
                    </div>
                </div>

                {/* Period Filter */}
                <div className="flex gap-2">
                    {['week', 'month', 'quarter', 'year'].map((period) => (
                        <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedPeriod === period
                                    ? 'bg-rc-orange text-white'
                                    : 'bg-white text-rc-dark border border-gray-200 hover:bg-rc-light'
                            }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rc-orange focus:border-rc-orange"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-2.5 border border-gray-300 rounded-lg"
                            >
                                <option value="all">All Types</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-4 py-2.5 border border-gray-300 rounded-lg"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Category Summary */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {categories.slice(1).map((cat) => {
                        const catTotal = allTransactions.filter(t => t.category === cat && t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
                        return (
                            <div key={cat} className="bg-white rounded-xl shadow-sm p-3 text-center border-t-2 border-rc-orange">
                                <p className="text-xs text-gray-500">{cat}</p>
                                <p className="text-lg font-bold text-rc-dark">${catTotal.toLocaleString()}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border-t-4 border-rc-orange">
                    <div className="px-6 py-4 border-b bg-rc-light">
                        <h3 className="text-lg font-semibold text-rc-dark">Transactions</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-rc-dark">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Building</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase">Amount</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredTransactions.map((transaction) => {
                                    const StatusIcon = getStatusIcon(transaction.status);
                                    return (
                                        <tr key={transaction.id} className="hover:bg-rc-light transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-rc-teal/10' : 'bg-rc-orange/10'}`}>
                                                        {transaction.type === 'income' ? (
                                                            <ArrowTrendingUpIcon className="h-4 w-4 text-rc-teal" />
                                                        ) : (
                                                            <ArrowTrendingDownIcon className="h-4 w-4 text-rc-orange" />
                                                        )}
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-rc-dark">{transaction.description}</p>
                                                        <p className="text-xs text-gray-500">{transaction.payment_method}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-rc-light text-rc-dark rounded-full text-xs">
                                                    {transaction.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{transaction.building}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{transaction.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(transaction.status)}`}>
                                                    <StatusIcon className="h-3 w-3" />
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 text-right text-sm font-semibold ${getTypeColor(transaction.type)}`}>
                                                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => setSelectedTransaction(transaction)}
                                                    className="text-rc-teal hover:text-rc-orange text-sm font-medium"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Empty State */}
                {filteredTransactions.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm py-16 text-center border-t-4 border-rc-orange">
                        <CurrencyDollarIcon className="h-16 w-16 text-gray-300 mx-auto" />
                        <h3 className="mt-4 text-lg font-medium text-rc-dark">No transactions found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm ? 'Try different search terms' : 'Add your first transaction'}
                        </p>
                        {!searchTerm && (
                            <Link href="/transactions/create" className="mt-6 inline-flex items-center px-6 py-3 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Add Transaction
                            </Link>
                        )}
                    </div>
                )}

                {/* Transaction Detail Modal */}
                {selectedTransaction && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedTransaction(null)} />
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 z-10 overflow-hidden">
                            <div className="bg-gradient-to-r from-rc-teal to-rc-dark p-6 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white">Transaction Details</h3>
                                <button onClick={() => setSelectedTransaction(null)} className="text-white/70 hover:text-white">✕</button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Description</span>
                                    <span className="font-medium text-rc-dark">{selectedTransaction.description}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Category</span>
                                    <span className="font-medium text-rc-dark">{selectedTransaction.category}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Building</span>
                                    <span className="font-medium text-rc-dark">{selectedTransaction.building}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Unit</span>
                                    <span className="font-medium text-rc-dark">{selectedTransaction.unit}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Payment Method</span>
                                    <span className="font-medium text-rc-dark">{selectedTransaction.payment_method}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Date</span>
                                    <span className="font-medium text-rc-dark">{selectedTransaction.date}</span>
                                </div>
                                <div className="flex items-center justify-between border-t pt-4">
                                    <span className="text-gray-500">Amount</span>
                                    <span className={`font-bold text-xl ${getTypeColor(selectedTransaction.type)}`}>
                                        {selectedTransaction.type === 'income' ? '+' : '-'}${selectedTransaction.amount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}