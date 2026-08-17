import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    BuildingOfficeIcon,
    HomeIcon,
    UserGroupIcon,
    CurrencyDollarIcon,
    PlusIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    BanknotesIcon,
    WalletIcon,
    ChartBarIcon,
    CalendarIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    ClockIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

export default function Dashboard() {
    const [activePeriod, setActivePeriod] = useState('month');

    const stats = [
        { name: 'Total Buildings', value: '4', icon: BuildingOfficeIcon, color: 'bg-rc-orange', change: '+2.5%' },
        { name: 'Total Units', value: '70', icon: HomeIcon, color: 'bg-rc-teal', change: '+5.2%' },
        { name: 'Active Tenants', value: '58', icon: UserGroupIcon, color: 'bg-rc-dark', change: '+3.8%' },
        { name: 'Monthly Income', value: '$20,000', icon: CurrencyDollarIcon, color: 'bg-rc-orange', change: '+8.1%' },
    ];

    // Line Chart - Cash Flow
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Income',
                data: [12000, 15000, 14000, 18000, 16000, 20000],
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
                data: [8000, 9000, 8500, 10000, 9500, 11000],
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
                data: [11000, 13500, 12500, 16000, 14500, 18000],
                backgroundColor: 'rgba(255, 158, 32, 0.8)',
                borderColor: '#FF9E20',
                borderWidth: 2,
                borderRadius: 6,
            },
            {
                label: 'Outstanding',
                data: [1000, 1500, 1500, 2000, 1500, 2000],
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

    // Pie - Expenses
    const pieData = {
        labels: ['Maintenance', 'Utilities', 'Insurance', 'Tax', 'Management'],
        datasets: [{
            data: [3500, 2500, 2000, 1800, 1200],
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
            tooltip: { ...tooltipOptions, callbacks: { label: (ctx) => `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}` } },
        },
        scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: (v) => '$' + v.toLocaleString() } },
            x: { grid: { display: false } },
        },
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: '600' } } },
            tooltip: { ...tooltipOptions, callbacks: { label: (ctx) => `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}` } },
        },
        scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: (v) => '$' + v.toLocaleString() } },
            x: { grid: { display: false } },
        },
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: '600' } } },
            tooltip: { ...tooltipOptions, callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed} units` } },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: '600' } } },
            tooltip: { ...tooltipOptions, callbacks: { label: (ctx) => `${ctx.label}: $${ctx.parsed.toLocaleString()}` } },
        },
    };

    const recentTransactions = [
        { id: 1, desc: 'Rent - John Doe', amount: '+$1,500', type: 'income', date: 'Jun 15' },
        { id: 2, desc: 'Rent - Jane Smith', amount: '+$1,200', type: 'income', date: 'Jun 15' },
        { id: 3, desc: 'Plumbing Repair', amount: '-$450', type: 'expense', date: 'Jun 14' },
        { id: 4, desc: 'Rent - Mike Johnson', amount: '+$1,800', type: 'income', date: 'Jun 13' },
        { id: 5, desc: 'Electricity Bill', amount: '-$800', type: 'expense', date: 'Jun 12' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">Dashboard</h1>
                        <p className="text-gray-500 mt-1">Property and financial overview</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-rc-light">
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
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activePeriod === period ? 'bg-rc-orange text-white' : 'bg-white text-rc-dark border border-gray-200'
                            }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Line Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-orange">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-rc-dark">💹 Cash Flow Analysis</h3>
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="h-[300px]">
                            <Line data={lineData} options={lineOptions} />
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-teal">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-rc-dark">📊 Rent Collection</h3>
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="h-[300px]">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Doughnut */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-dark">
                        <h3 className="text-lg font-semibold text-rc-dark mb-4">🏠 Occupancy Rate</h3>
                        <div className="h-[280px]">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-orange">
                        <h3 className="text-lg font-semibold text-rc-dark mb-4">💰 Expense Distribution</h3>
                        <div className="h-[280px]">
                            <Pie data={pieData} options={pieOptions} />
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Transactions */}
                    <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2 border-t-4 border-rc-orange">
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
                                    <span className={`font-semibold ${t.type === 'income' ? 'text-rc-teal' : 'text-rc-orange'}`}>
                                        {t.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Link href="/transactions" className="block mt-4 text-center text-sm text-rc-teal hover:text-rc-orange">
                            View All Transactions →
                        </Link>
                    </div>

                    {/* Financial Summary */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-rc-teal to-rc-dark rounded-xl p-6 text-white">
                            <BanknotesIcon className="h-8 w-8 opacity-50" />
                            <p className="text-sm opacity-80 mt-2">Total Income</p>
                            <p className="text-3xl font-bold">$95,000</p>
                        </div>
                        <div className="bg-gradient-to-br from-rc-orange to-rc-orangeDark rounded-xl p-6 text-white">
                            <WalletIcon className="h-8 w-8 opacity-50" />
                            <p className="text-sm opacity-80 mt-2">Total Expenses</p>
                            <p className="text-3xl font-bold">$56,800</p>
                        </div>
                        <div className="bg-gradient-to-br from-rc-dark to-gray-800 rounded-xl p-6 text-white">
                            <ChartBarIcon className="h-8 w-8 opacity-50" />
                            <p className="text-sm opacity-80 mt-2">Net Profit</p>
                            <p className="text-3xl font-bold">$38,200</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}