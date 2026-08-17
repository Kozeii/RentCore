import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Spinner, ConfirmModal, EmptyState, Pagination, Toast, useDebounce, StatusBadge, FilterChips, exportToCSV } from '@/Components/UI';
import {
    CurrencyDollarIcon, PlusIcon, MagnifyingGlassIcon,
    ArrowTrendingUpIcon, ArrowTrendingDownIcon, BanknotesIcon,
    WalletIcon, ChartBarIcon, CreditCardIcon, ReceiptPercentIcon,
    CalendarIcon, BuildingOfficeIcon, UserGroupIcon,
    ExclamationCircleIcon, CheckCircleIcon, ClockIcon,
    ChevronDownIcon, DocumentArrowDownIcon, CalculatorIcon,
    ArrowPathIcon, BellAlertIcon,
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
    const [showInvoice, setShowInvoice] = useState(false);
    const [showLateFeeCalculator, setShowLateFeeCalculator] = useState(false);
    const [showRecurring, setShowRecurring] = useState(false);
    const debouncedSearch = useDebounce(searchTerm, 300);

    const sampleTransactions = [
        { id: 1, description: 'Rent Payment - John Doe', category: 'Rent', type: 'income', amount: 15000, date: 'Jun 15, 2026', building: 'Sunset Apartments', unit: 'Unit 101', status: 'completed', payment_method: 'Bank Transfer', recurring: true },
        { id: 2, description: 'Rent Payment - Jane Smith', category: 'Rent', type: 'income', amount: 12000, date: 'Jun 15, 2026', building: 'Green Valley Condos', unit: 'Unit 204', status: 'completed', payment_method: 'Cash', recurring: true },
        { id: 3, description: 'Plumbing Repair', category: 'Maintenance', type: 'expense', amount: 4500, date: 'Jun 14, 2026', building: 'Sunset Apartments', unit: 'Unit 101', status: 'completed', payment_method: 'Cash', recurring: false },
        { id: 4, description: 'Rent Payment - Mike Johnson', category: 'Rent', type: 'income', amount: 18000, date: 'Jun 13, 2026', building: 'Riverside Towers', unit: 'Unit 305', status: 'completed', payment_method: 'Bank Transfer', recurring: true },
        { id: 5, description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 8000, date: 'Jun 12, 2026', building: 'All Buildings', unit: '-', status: 'completed', payment_method: 'Auto-debit', recurring: true },
        { id: 6, description: 'Rent Payment - Sarah Williams', category: 'Rent', type: 'income', amount: 14000, date: 'Jun 11, 2026', building: 'Palm Residences', unit: 'Unit 402', status: 'pending', payment_method: 'Bank Transfer', recurring: true },
        { id: 7, description: 'Insurance Premium', category: 'Insurance', type: 'expense', amount: 20000, date: 'Jun 10, 2026', building: 'All Buildings', unit: '-', status: 'completed', payment_method: 'Auto-debit', recurring: false },
        { id: 8, description: 'Rent Payment - Tom Brown', category: 'Rent', type: 'income', amount: 16000, date: 'Jun 09, 2026', building: 'Sunset Apartments', unit: 'Unit 108', status: 'completed', payment_method: 'Cash', recurring: true },
        { id: 9, description: 'Landscaping Service', category: 'Maintenance', type: 'expense', amount: 3500, date: 'Jun 08, 2026', building: 'Palm Residences', unit: '-', status: 'completed', payment_method: 'Cash', recurring: false },
        { id: 10, description: 'Rent Payment - Emily Davis', category: 'Rent', type: 'income', amount: 13000, date: 'Jun 07, 2026', building: 'Green Valley Condos', unit: 'Unit 302', status: 'failed', payment_method: 'Bank Transfer', recurring: true },
        { id: 11, description: 'Water Bill', category: 'Utilities', type: 'expense', amount: 3000, date: 'Jun 05, 2026', building: 'All Buildings', unit: '-', status: 'completed', payment_method: 'Auto-debit', recurring: true },
        { id: 12, description: 'Security Deposit - New Tenant', category: 'Deposit', type: 'income', amount: 15000, date: 'Jun 03, 2026', building: 'Riverside Towers', unit: 'Unit 310', status: 'completed', payment_method: 'Bank Transfer', recurring: false },
    ];

    const allTransactions = transactions.length > 0 ? transactions : sampleTransactions;
    const filtered = allTransactions.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
        return matchesSearch && matchesType && matchesCategory;
    });

    const totalIncome = allTransactions.filter(t => t.type === 'income' && t.status === 'completed').reduce((s, t) => s + t.amount, 0);
    const totalExpenses = allTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const netCashFlow = totalIncome - totalExpenses;
    const pendingAmount = allTransactions.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0);
    const recurringCount = allTransactions.filter(t => t.recurring).length;
    const failedCount = allTransactions.filter(t => t.status === 'failed').length;

    // Budget data
    const budget = {
        monthly_income_budget: 100000,
        monthly_expense_budget: 60000,
        actual_income: totalIncome,
        actual_expenses: totalExpenses,
    };

    const categories = ['All', 'Rent', 'Maintenance', 'Utilities', 'Insurance', 'Deposit'];

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        setShowDelete(false);
        setToast({ message: 'Transaction deleted!', type: 'success' });
        setTimeout(() => setToast(null), 3000);
    };

    const handleExport = () => {
        const data = filtered.map(t => ({ date: t.date, description: t.description, type: t.type, amount: t.amount, status: t.status }));
        exportToCSV('transactions.csv', data);
        setToast({ message: 'CSV exported!', type: 'success' });
        setTimeout(() => setToast(null), 3000);
    };

    const calculateLateFee = (amount, days) => {
        const fee = amount * 0.02 * days;
        return fee.toFixed(2);
    };

    const getTypeColor = (type) => type === 'income' ? 'text-rc-teal' : 'text-rc-orange';
    const getStatusColor = (status) => {
        switch(status) {
            case 'completed': return 'bg-rc-teal/10 text-rc-teal';
            case 'pending': return 'bg-rc-orange/10 text-rc-orange';
            case 'failed': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100';
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
            <ConfirmModal show={showDelete} onClose={() => setShowDelete(false)} onConfirm={confirmDelete} title={allTransactions.find(t => t.id === deleteId)?.description} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Finance</h1>
                        <p className="text-gray-500 mt-1">Track income, expenses, and cash flow</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <button onClick={handleExport} className="px-4 py-2 bg-rc-dark text-white rounded-lg">📥 Export CSV</button>
                        <button onClick={() => setShowBudget(true)} className="px-4 py-2 bg-rc-teal text-white rounded-lg">📊 Budget</button>
                        <button onClick={() => setShowLateFeeCalculator(true)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">🧮 Late Fee Calc</button>
                        <Link href="/transactions/create" className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                            <PlusIcon className="h-5 w-5 inline mr-1" /> Add Transaction
                        </Link>
                    </div>
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-rc-teal to-rc-dark rounded-xl p-6 text-white">
                        <BanknotesIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Total Income</p>
                        <p className="text-3xl font-bold">₱{totalIncome.toLocaleString()}</p>
                        <p className="text-xs mt-2 opacity-70">↑ 8% vs last month</p>
                    </div>
                    <div className="bg-gradient-to-br from-rc-orange to-rc-orangeDark rounded-xl p-6 text-white">
                        <WalletIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Total Expenses</p>
                        <p className="text-3xl font-bold">₱{totalExpenses.toLocaleString()}</p>
                        <p className="text-xs mt-2 opacity-70">↓ 2% vs last month</p>
                    </div>
                    <div className="bg-gradient-to-br from-rc-dark to-gray-800 rounded-xl p-6 text-white">
                        <ChartBarIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Net Cash Flow</p>
                        <p className="text-3xl font-bold">₱{netCashFlow.toLocaleString()}</p>
                        <p className="text-xs mt-2 opacity-70">↑ 12% vs last month</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
                        <ClockIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Pending</p>
                        <p className="text-3xl font-bold">₱{pendingAmount.toLocaleString()}</p>
                        <p className="text-xs mt-2 opacity-70">{failedCount} failed transactions</p>
                    </div>
                </div>

                {/* Period Filter */}
                <div className="flex gap-2">
                    {['week', 'month', 'quarter', 'year'].map(period => (
                        <button key={period} onClick={() => setSelectedPeriod(period)} className={`px-4 py-2 rounded-lg text-sm ${selectedPeriod === period ? 'bg-rc-orange text-white' : 'bg-white border'}`}>
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Search & Filters */}
                <div className="bg-white rounded-xl p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input type="text" placeholder="Search transactions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                        </div>
                        <div className="flex gap-3">
                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 border rounded-lg">
                                <option value="all">All Types</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2 border rounded-lg">
                                {categories.map(cat => <option key={cat} value={cat.toLowerCase()}>{cat}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Recurring Alert */}
                {recurringCount > 0 && (
                    <div className="bg-rc-teal/10 border border-rc-teal/30 rounded-xl p-4 flex items-center">
                        <ArrowPathIcon className="h-5 w-5 text-rc-teal mr-2" />
                        <p className="text-sm text-rc-teal">{recurringCount} recurring transactions this month</p>
                    </div>
                )}

                {/* Transactions Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border-t-4 border-rc-orange">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-rc-dark">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs text-white uppercase">Description</th>
                                <th className="px-6 py-3 text-left text-xs text-white uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs text-white uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs text-white uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs text-white uppercase">Recurring</th>
                                <th className="px-6 py-3 text-right text-xs text-white uppercase">Amount</th>
                                <th className="px-6 py-3 text-right text-xs text-white uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filtered.map(t => (
                                <tr key={t.id} className="hover:bg-rc-light">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {t.type === 'income' ? <ArrowTrendingUpIcon className="h-5 w-5 text-rc-teal mr-2" /> : <ArrowTrendingDownIcon className="h-5 w-5 text-rc-orange mr-2" />}
                                            <div>
                                                <p className="text-sm font-medium">{t.description}</p>
                                                <p className="text-xs text-gray-500">{t.payment_method}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-rc-light rounded-full text-xs">{t.category}</span></td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{t.date}</td>
                                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(t.status)}`}>{t.status}</span></td>
                                    <td className="px-6 py-4">{t.recurring ? <ArrowPathIcon className="h-5 w-5 text-rc-teal" /> : '-'}</td>
                                    <td className={`px-6 py-4 text-right font-semibold ${getTypeColor(t.type)}`}>
                                        {t.type === 'income' ? '+' : '-'}₱{t.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => setSelectedTransaction(t)} className="text-rc-teal text-sm">View</button>
                                        <button onClick={() => handleDelete(t.id)} className="text-rc-orange text-sm ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Budget Modal */}
                {showBudget && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowBudget(false)} />
                        <div className="bg-white rounded-xl max-w-md w-full mx-4 z-10 p-6">
                            <h3 className="text-lg font-bold text-rc-dark mb-4">Budget vs Actual</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Income Budget</span>
                                        <span className="text-rc-teal">₱{budget.monthly_income_budget.toLocaleString()}</span>
                                    </div>
                                    <div className="h-3 bg-rc-light rounded-full">
                                        <div className="h-3 bg-rc-teal rounded-full" style={{ width: `${(budget.actual_income / budget.monthly_income_budget) * 100}%` }}></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{Math.round((budget.actual_income / budget.monthly_income_budget) * 100)}% of budget used</p>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Expense Budget</span>
                                        <span className="text-rc-orange">₱{budget.monthly_expense_budget.toLocaleString()}</span>
                                    </div>
                                    <div className="h-3 bg-rc-light rounded-full">
                                        <div className="h-3 bg-rc-orange rounded-full" style={{ width: `${(budget.actual_expenses / budget.monthly_expense_budget) * 100}%` }}></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{Math.round((budget.actual_expenses / budget.monthly_expense_budget) * 100)}% of budget used</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Late Fee Calculator Modal */}
                {showLateFeeCalculator && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowLateFeeCalculator(false)} />
                        <div className="bg-white rounded-xl max-w-sm w-full mx-4 z-10 p-6">
                            <h3 className="text-lg font-bold text-rc-dark mb-4">🧮 Late Fee Calculator</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm">Monthly Rent (₱)</label>
                                    <input type="number" defaultValue={15000} className="w-full px-4 py-2 border rounded-lg mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm">Days Overdue</label>
                                    <input type="number" defaultValue={5} className="w-full px-4 py-2 border rounded-lg mt-1" />
                                </div>
                                <div className="bg-rc-light p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Late Fee (2% per day)</p>
                                    <p className="text-2xl font-bold text-rc-orange">₱{calculateLateFee(15000, 5)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}