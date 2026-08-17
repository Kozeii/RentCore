import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Spinner, Skeleton, Toast } from '@/Components/UI';
import {
    BuildingOfficeIcon, HomeIcon, UserGroupIcon, CurrencyDollarIcon,
    PlusIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon,
    BanknotesIcon, WalletIcon, ChartBarIcon,
    ExclamationCircleIcon, CheckCircleIcon, ClockIcon,
} from '@heroicons/react/24/outline';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [activePeriod, setActivePeriod] = useState('month');

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const stats = [
        { name: 'Total Buildings', value: '4', icon: BuildingOfficeIcon, color: 'bg-rc-orange', change: '+2.5%' },
        { name: 'Total Units', value: '70', icon: HomeIcon, color: 'bg-rc-teal', change: '+5.2%' },
        { name: 'Active Tenants', value: '58', icon: UserGroupIcon, color: 'bg-rc-dark', change: '+3.8%' },
        { name: 'Monthly Income', value: '₱95,000', icon: CurrencyDollarIcon, color: 'bg-rc-orange', change: '+8.1%' },
    ];

    // Line Chart - Cash Flow
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Income',
                data: [75000, 82000, 78000, 88000, 85000, 95000],
                borderColor: '#FF9E20',
                backgroundColor: 'rgba(255, 158, 32, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#FF9E20',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
            {
                label: 'Expenses',
                data: [45000, 50000, 48000, 52000, 50000, 56800],
                borderColor: '#215E61',
                backgroundColor: 'rgba(33, 94, 97, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#215E61',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
        ],
    };

    // Bar Chart - Rent Collection
    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Collected',
                data: [65000, 72000, 68000, 78000, 75000, 85000],
                backgroundColor: 'rgba(255, 158, 32, 0.8)',
                borderColor: '#FF9E20',
                borderWidth: 2,
                borderRadius: 6,
            },
            {
                label: 'Outstanding',
                data: [10000, 8000, 10000, 10000, 10000, 10000],
                backgroundColor: 'rgba(29, 33, 40, 0.6)',
                borderColor: '#1D2128',
                borderWidth: 2,
                borderRadius: 6,
            },
        ],
    };

    // Doughnut - Occupancy
    const doughnutData = {
        labels: ['Occupied', 'Vacant', 'Maintenance'],
        datasets: [{
            data: [62, 6, 2],
            backgroundColor: ['#FF9E20', '#215E61', '#1D2128'],
            borderColor: '#fff',
            borderWidth: 3,
        }],
    };

    // Pie - Expense Distribution
    const pieData = {
        labels: ['Maintenance', 'Utilities', 'Insurance', 'Tax', 'Management'],
        datasets: [{
            data: [18500, 12800, 9800, 8500, 7200],
            backgroundColor: ['#FF9E20', '#215E61', '#1D2128', '#E6850A', '#2A7A7E'],
            borderColor: '#fff',
            borderWidth: 3,
        }],
    };

    const tooltipOptions = {
        backgroundColor: '#1D2128',
        titleColor: '#FF9E20',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { position: 'top', labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: '600' } } },
            tooltip: {
                ...tooltipOptions,
                callbacks: {
                    label: (ctx) => `${ctx.dataset.label}: ₱${ctx.parsed.y.toLocaleString()}`,
                },
            },
        },
        scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: (v) => '₱' + v.toLocaleString() } },
            x: { grid: { display: false } },
        },
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: '600' } } },
            tooltip: {
                ...tooltipOptions,
                callbacks: {
                    label: (ctx) => `${ctx.dataset.label}: ₱${ctx.parsed.y.toLocaleString()}`,
                },
            },
        },
        scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: (v) => '₱' + v.toLocaleString() } },
            x: { grid: { display: false } },
        },
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: '600' } } },
            tooltip: {
                ...tooltipOptions,
                callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed} units` },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: '600' } } },
            tooltip: {
                ...tooltipOptions,
                callbacks: { label: (ctx) => `${ctx.label}: ₱${ctx.parsed.toLocaleString()}` },
            },
        },
    };

    const recentTransactions = [
        { id: 1, desc: 'Rent - John Doe', amount: '+₱15,000', type: 'income', date: 'Jun 15' },
        { id: 2, desc: 'Rent - Jane Smith', amount: '+₱12,000', type: 'income', date: 'Jun 15' },
        { id: 3, desc: 'Plumbing Repair', amount: '-₱4,500', type: 'expense', date: 'Jun 14' },
        { id: 4, desc: 'Rent - Mike Johnson', amount: '+₱18,000', type: 'income', date: 'Jun 13' },
        { id: 5, desc: 'Electricity Bill', amount: '-₱8,000', type: 'expense', date: 'Jun 12' },
    ];

    if (loading) {
        return (
            <AuthenticatedLayout>
                <Head title="Dashboard" />
                <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-xl h-28"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="animate-pulse bg-white rounded-xl h-80"></div>
                        <div className="animate-pulse bg-white rounded-xl h-80"></div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Dashboard</h1>
                        <p className="text-gray-500 mt-1">Property and financial overview</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => showToast('Report exported successfully!')} className="px-4 py-2 bg-rc-teal text-white rounded-lg hover:bg-rc-tealLight">
                            📥 Export Report
                        </button>
                        <Link href="/buildings/create" className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                            <PlusIcon className="h-5 w-5 inline mr-1" /> Add Building
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-orange hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">{stat.name}</p>
                                    <p className="mt-2 text-3xl font-bold text-rc-dark">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-full ${stat.color}`}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center text-sm">
                                <ArrowTrendingUpIcon className="h-4 w-4 text-rc-teal mr-1" />
                                <span className="text-rc-teal font-medium">{stat.change}</span>
                                <span className="text-gray-400 ml-1">vs last month</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Period Filter */}
                <div className="flex gap-2">
                    {['week', 'month', 'year'].map((period) => (
                        <button
                            key={period}
                            onClick={() => setActivePeriod(period)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${activePeriod === period ? 'bg-rc-orange text-white' : 'bg-white text-rc-dark border border-gray-200'}`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Line Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-orange">
                        <h3 className="text-lg font-semibold text-rc-dark mb-4">💹 Cash Flow Analysis</h3>
                        <div className="h-[300px]">
                            <Line data={lineData} options={lineOptions} />
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-teal">
                        <h3 className="text-lg font-semibold text-rc-dark mb-4">📊 Rent Collection</h3>
                        <div className="h-[300px]">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Doughnut */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-dark">
                        <h3 className="text-lg font-semibold text-rc-dark mb-4">🏠 Occupancy Rate</h3>
                        <div className="h-[250px]">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-orange">
                        <h3 className="text-lg font-semibold text-rc-dark mb-4">💰 Expense Distribution</h3>
                        <div className="h-[250px]">
                            <Pie data={pieData} options={pieOptions} />
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-teal">
                        <h3 className="text-lg font-semibold text-rc-dark mb-4">Quick Overview</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between p-3 bg-rc-light rounded-lg">
                                <span className="text-sm">Total Income</span>
                                <span className="font-bold text-rc-teal">₱95,000</span>
                            </div>
                            <div className="flex justify-between p-3 bg-rc-light rounded-lg">
                                <span className="text-sm">Total Expenses</span>
                                <span className="font-bold text-rc-orange">₱56,800</span>
                            </div>
                            <div className="flex justify-between p-3 bg-rc-light rounded-lg">
                                <span className="text-sm">Net Profit</span>
                                <span className="font-bold text-rc-dark">₱38,200</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-orange">
                    <h3 className="text-lg font-semibold text-rc-dark mb-4">Recent Transactions</h3>
                    <div className="space-y-3">
                        {recentTransactions.map((t) => (
                            <div key={t.id} className="flex items-center justify-between p-3 bg-rc-light rounded-lg hover:bg-rc-teal/10 transition-colors">
                                <div className="flex items-center">
                                    {t.type === 'income' ? (
                                        <CheckCircleIcon className="h-5 w-5 text-rc-teal mr-3" />
                                    ) : (
                                        <ExclamationCircleIcon className="h-5 w-5 text-rc-orange mr-3" />
                                    )}
                                    <div>
                                        <p className="text-sm font-medium text-rc-dark">{t.desc}</p>
                                        <p className="text-xs text-gray-500">{t.date}</p>
                                    </div>
                                </div>
                                <span className={`font-semibold ${t.type === 'income' ? 'text-rc-teal' : 'text-rc-orange'}`}>{t.amount}</span>
                            </div>
                        ))}
                    </div>
                    <Link href="/transactions" className="block mt-4 text-center text-sm text-rc-teal hover:text-rc-orange">
                        View All Transactions →
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}