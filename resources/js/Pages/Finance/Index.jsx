import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Spinner, ConfirmModal, EmptyState, Pagination, Toast, useDebounce, exportToCSV } from '@/Components/UI';
import {
    PlusIcon, MagnifyingGlassIcon, ArrowTrendingUpIcon, 
    ArrowTrendingDownIcon, BanknotesIcon, WalletIcon, 
    ChartBarIcon, ClockIcon, ArrowPathIcon,
} from '@heroicons/react/24/outline';

export default function Index({ transactions = [] }) {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [toast, setToast] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showBudget, setShowBudget] = useState(false);
    const [showLateFeeCalculator, setShowLateFeeCalculator] = useState(false);
    const [lateFeeAmount, setLateFeeAmount] = useState(15000);
    const [lateFeeDays, setLateFeeDays] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const debouncedSearch = useDebounce(searchTerm, 300);

    // Support both raw arrays and Laravel Paginator objects
    const allTransactions = Array.isArray(transactions) ? transactions : (transactions?.data ?? []);

    const filtered = allTransactions.filter(t => {
        const description = t.description ?? '';
        const category = (t.category ?? '').toLowerCase();
        const type = (t.type ?? '').toLowerCase();

        const matchesSearch = description.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesType = filterType === 'all' || type === filterType.toLowerCase();
        const matchesCategory = filterCategory === 'all' || category === filterCategory.toLowerCase();

        return matchesSearch && matchesType && matchesCategory;
    });

    const perPage = 10;
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    // Computed Stats
    const totalIncome = allTransactions
        .filter(t => (t.type ?? '').toLowerCase() === 'income' && (t.status ?? '').toLowerCase() === 'completed')
        .reduce((s, t) => s + (Number(t.amount) || 0), 0);

    const totalExpenses = allTransactions
        .filter(t => (t.type ?? '').toLowerCase() === 'expense')
        .reduce((s, t) => s + (Number(t.amount) || 0), 0);

    const netCashFlow = totalIncome - totalExpenses;

    const pendingAmount = allTransactions
        .filter(t => (t.status ?? '').toLowerCase() === 'pending')
        .reduce((s, t) => s + (Number(t.amount) || 0), 0);

    const recurringCount = allTransactions.filter(t => Boolean(t.recurring)).length;
    const failedCount = allTransactions.filter(t => (t.status ?? '').toLowerCase() === 'failed').length;

    // Budget projections based on current values
    const budget = {
        monthly_income_budget: Math.max(totalIncome, 100000),
        monthly_expense_budget: Math.max(totalExpenses, 60000),
        actual_income: totalIncome,
        actual_expenses: totalExpenses,
    };

    const categories = ['All', 'Rent', 'Maintenance', 'Utilities', 'Insurance', 'Deposit'];

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        if (!deleteId) return;
        router.delete(`/transactions/${deleteId}`, {
            onSuccess: () => {
                setShowDelete(false);
                setToast({ message: 'Transaction deleted successfully!', type: 'success' });
                setTimeout(() => setToast(null), 3000);
            },
            onError: () => {
                setShowDelete(false);
                setToast({ message: 'Failed to delete transaction.', type: 'error' });
            }
        });
    };

    const handleExport = () => {
        const data = filtered.map(t => ({
            date: t.date ?? 'N/A',
            description: t.description ?? 'N/A',
            type: t.type ?? 'N/A',
            amount: t.amount ?? 0,
            status: t.status ?? 'N/A'
        }));
        exportToCSV('transactions.csv', data);
        setToast({ message: 'CSV exported!', type: 'success' });
        setTimeout(() => setToast(null), 3000);
    };

    const calculateLateFee = (amount, days) => {
        const fee = (Number(amount) || 0) * 0.02 * (Number(days) || 0);
        return fee.toFixed(2);
    };

    const getTypeColor = (type) => (type ?? '').toLowerCase() === 'income' ? 'text-rc-teal' : 'text-rc-orange';
    
    const getStatusColor = (status) => {
        switch ((status ?? '').toLowerCase()) {
            case 'completed': return 'bg-rc-teal/10 text-rc-teal';
            case 'pending': return 'bg-rc-orange/10 text-rc-orange';
            case 'failed': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    if (loading) {
        return (
            <AuthenticatedLayout>
                <Head title="Finance" />
                <Spinner />
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Finance" />
            
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            
            <ConfirmModal 
                show={showDelete} 
                onClose={() => setShowDelete(false)} 
                onConfirm={confirmDelete} 
                title={allTransactions.find(t => t.id === deleteId)?.description ?? 'Delete Transaction'} 
            />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Finance</h1>
                        <p className="text-gray-500 mt-1">Track income, expenses, and cash flow</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <button onClick={handleExport} className="px-4 py-2 bg-rc-dark text-white rounded-lg hover:bg-gray-800 transition-colors">
                            📥 Export CSV
                        </button>
                        <button onClick={() => setShowBudget(true)} className="px-4 py-2 bg-rc-teal text-white rounded-lg hover:bg-rc-tealLight transition-colors">
                            📊 Budget
                        </button>
                        <button onClick={() => setShowLateFeeCalculator(true)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                            🧮 Late Fee Calc
                        </button>
                        <Link href="/transactions/create" className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark transition-colors flex items-center">
                            <PlusIcon className="h-5 w-5 mr-1" /> Add Transaction
                        </Link>
                    </div>
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-rc-teal to-rc-dark rounded-xl p-6 text-white shadow-sm">
                        <BanknotesIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Total Income</p>
                        <p className="text-3xl font-bold">₱{totalIncome.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-rc-orange to-rc-orangeDark rounded-xl p-6 text-white shadow-sm">
                        <WalletIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Total Expenses</p>
                        <p className="text-3xl font-bold">₱{totalExpenses.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-rc-dark to-gray-800 rounded-xl p-6 text-white shadow-sm">
                        <ChartBarIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Net Cash Flow</p>
                        <p className="text-3xl font-bold">₱{netCashFlow.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-sm">
                        <ClockIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Pending</p>
                        <p className="text-3xl font-bold">₱{pendingAmount.toLocaleString()}</p>
                        <p className="text-xs mt-2 opacity-70">{failedCount} failed transaction(s)</p>
                    </div>
                </div>

                {/* Period Filter */}
                <div className="flex gap-2">
                    {['week', 'month', 'quarter', 'year'].map(period => (
                        <button 
                            key={period} 
                            onClick={() => setSelectedPeriod(period)} 
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedPeriod === period ? 'bg-rc-orange text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Search & Filters */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search transactions..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-rc-orange focus:border-rc-orange" 
                            />
                        </div>
                        <div className="flex gap-3">
                            <select 
                                value={filterType} 
                                onChange={(e) => setFilterType(e.target.value)} 
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-rc-orange focus:border-rc-orange text-sm"
                            >
                                <option value="all">All Types</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            <select 
                                value={filterCategory} 
                                onChange={(e) => setFilterCategory(e.target.value)} 
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-rc-orange focus:border-rc-orange text-sm"
                            >
                                {categories.map(cat => <option key={cat} value={cat.toLowerCase()}>{cat}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Recurring Alert */}
                {recurringCount > 0 && (
                    <div className="bg-rc-teal/10 border border-rc-teal/30 rounded-xl p-4 flex items-center">
                        <ArrowPathIcon className="h-5 w-5 text-rc-teal mr-2 shrink-0" />
                        <p className="text-sm text-rc-teal font-medium">{recurringCount} recurring transaction(s) tracked</p>
                    </div>
                )}

                {/* Transactions Table */}
                {paginated.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-t-4 border-rc-orange">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-rc-dark">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Recurring</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {paginated.map(t => (
                                        <tr key={t.id} className="hover:bg-rc-light transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {(t.type ?? '').toLowerCase() === 'income' ? (
                                                        <ArrowTrendingUpIcon className="h-5 w-5 text-rc-teal mr-2 shrink-0" />
                                                    ) : (
                                                        <ArrowTrendingDownIcon className="h-5 w-5 text-rc-orange mr-2 shrink-0" />
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-medium text-rc-dark">{t.description ?? 'N/A'}</p>
                                                        <p className="text-xs text-gray-500">{t.payment_method ?? '-'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2.5 py-1 bg-rc-light rounded-full text-xs font-medium text-rc-dark">
                                                    {t.category ?? 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {t.date ?? 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(t.status)}`}>
                                                    {t.status ?? 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {t.recurring ? <ArrowPathIcon className="h-5 w-5 text-rc-teal" /> : <span className="text-gray-400">-</span>}
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-right font-semibold text-sm ${getTypeColor(t.type)}`}>
                                                {(t.type ?? '').toLowerCase() === 'income' ? '+' : '-'}₱{Number(t.amount || 0).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                <button onClick={() => setSelectedTransaction(t)} className="text-rc-teal font-medium hover:underline mr-3">
                                                    View
                                                </button>
                                                <button onClick={() => handleDelete(t.id)} className="text-rc-orange font-medium hover:underline">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {totalPages > 1 && (
                            <div className="p-4 border-t border-gray-100">
                                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                            </div>
                        )}
                    </div>
                ) : (
                    <EmptyState icon="💳" title="No transactions found" description="Try adjusting your filter options or search terms." />
                )}

                {/* View Details Modal */}
                {selectedTransaction && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setSelectedTransaction(null)} />
                        <div className="bg-white rounded-xl max-w-md w-full z-10 p-6 shadow-2xl space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <h3 className="text-lg font-bold text-rc-dark">Transaction Details</h3>
                                <button onClick={() => setSelectedTransaction(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-xs text-gray-500">Description</p>
                                    <p className="font-semibold text-rc-dark">{selectedTransaction.description ?? 'N/A'}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-500">Amount</p>
                                        <p className={`font-bold text-base ${getTypeColor(selectedTransaction.type)}`}>
                                            ₱{Number(selectedTransaction.amount || 0).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Type</p>
                                        <p className="font-medium text-rc-dark capitalize">{selectedTransaction.type ?? 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-500">Category</p>
                                        <p className="font-medium text-rc-dark">{selectedTransaction.category ?? 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Date</p>
                                        <p className="font-medium text-rc-dark">{selectedTransaction.date ?? 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-500">Payment Method</p>
                                        <p className="font-medium text-rc-dark">{selectedTransaction.payment_method ?? 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Building / Unit</p>
                                        <p className="font-medium text-rc-dark">
                                            {selectedTransaction.building ?? '-'} {selectedTransaction.unit ? `(${selectedTransaction.unit})` : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Budget Modal */}
                {showBudget && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowBudget(false)} />
                        <div className="bg-white rounded-xl max-w-md w-full z-10 p-6 shadow-2xl space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <h3 className="text-lg font-bold text-rc-dark">Budget vs Actual</h3>
                                <button onClick={() => setShowBudget(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-rc-dark">Income Target</span>
                                        <span className="text-rc-teal font-bold">₱{budget.monthly_income_budget.toLocaleString()}</span>
                                    </div>
                                    <div className="h-3 bg-rc-light rounded-full overflow-hidden">
                                        <div 
                                            className="h-3 bg-rc-teal rounded-full transition-all duration-500" 
                                            style={{ width: `${Math.min(100, (budget.actual_income / budget.monthly_income_budget) * 100)}%` }} 
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {Math.round((budget.actual_income / budget.monthly_income_budget) * 100)}% of target achieved
                                    </p>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-rc-dark">Expense Limit</span>
                                        <span className="text-rc-orange font-bold">₱{budget.monthly_expense_budget.toLocaleString()}</span>
                                    </div>
                                    <div className="h-3 bg-rc-light rounded-full overflow-hidden">
                                        <div 
                                            className="h-3 bg-rc-orange rounded-full transition-all duration-500" 
                                            style={{ width: `${Math.min(100, (budget.actual_expenses / budget.monthly_expense_budget) * 100)}%` }} 
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {Math.round((budget.actual_expenses / budget.monthly_expense_budget) * 100)}% of limit used
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Late Fee Calculator Modal */}
                {showLateFeeCalculator && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowLateFeeCalculator(false)} />
                        <div className="bg-white rounded-xl max-w-sm w-full z-10 p-6 shadow-2xl space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <h3 className="text-lg font-bold text-rc-dark">🧮 Late Fee Calculator</h3>
                                <button onClick={() => setShowLateFeeCalculator(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Monthly Rent (₱)</label>
                                    <input 
                                        type="number" 
                                        value={lateFeeAmount} 
                                        onChange={(e) => setLateFeeAmount(e.target.value)} 
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg mt-1 focus:ring-rc-orange focus:border-rc-orange" 
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Days Overdue</label>
                                    <input 
                                        type="number" 
                                        value={lateFeeDays} 
                                        onChange={(e) => setLateFeeDays(e.target.value)} 
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg mt-1 focus:ring-rc-orange focus:border-rc-orange" 
                                    />
                                </div>
                                <div className="bg-rc-light p-4 rounded-lg">
                                    <p className="text-xs text-gray-500">Calculated Late Fee (2% per day)</p>
                                    <p className="text-2xl font-bold text-rc-orange">₱{calculateLateFee(lateFeeAmount, lateFeeDays)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}