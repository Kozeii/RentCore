import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    BuildingOfficeIcon, HomeIcon, UserGroupIcon, CurrencyDollarIcon,
    PlusIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon,
    BanknotesIcon, WalletIcon, ChartBarIcon,
    ExclamationCircleIcon, CheckCircleIcon,
} from '@heroicons/react/24/outline';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

export default function Dashboard() {
    const stats = [
        { name: 'Total Buildings', value: '4', icon: BuildingOfficeIcon, color: 'bg-rc-orange' },
        { name: 'Total Units', value: '70', icon: HomeIcon, color: 'bg-rc-teal' },
        { name: 'Active Tenants', value: '58', icon: UserGroupIcon, color: 'bg-rc-dark' },
        { name: 'Monthly Income', value: '₱95,000', icon: CurrencyDollarIcon, color: 'bg-rc-orange' },
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
                data: [10000, 10000, 10000, 10000, 10000, 10000],
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
                callbacks: {
                    label: (ctx) => `${ctx.label}: ${ctx.parsed} units`,
                },
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
                    <Link href="/buildings/create" className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                        <PlusIcon className="h-5 w-5 inline mr-1" /> Add Building
                    </Link>
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
                        </div>
                    ))}
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Line Chart - Cash Flow */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-orange">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-rc-dark">💹 Cash Flow Analysis</h3>
                            <span className="text-xs text-gray-400">Hover for details</span>
                        </div>
                        <div className="h-[300px]">
                            <Line data={lineData} options={lineOptions} />
                        </div>
                    </div>

                    {/* Bar Chart - Rent Collection */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-teal">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-rc-dark">📊 Rent Collection</h3>
                            <span className="text-xs text-gray-400">Hover for details</span>
                        </div>
                        <div className="h-[300px]">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Doughnut - Occupancy */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-dark">
                        <h3 className="text-lg font-semibold text-rc-dark mb-4">🏠 Occupancy Rate</h3>
                        <div className="h-[250px]">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                            <div>
                                <p className="text-xl font-bold text-rc-orange">62</p>
                                <p className="text-xs text-gray-500">Occupied</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-rc-teal">6</p>
                                <p className="text-xs text-gray-500">Vacant</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-rc-dark">2</p>
                                <p className="text-xs text-gray-500">Maintenance</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-orange">
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

                {/* Financial Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-rc-teal to-rc-dark rounded-xl p-6 text-white">
                        <BanknotesIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Total Income</p>
                        <p className="text-3xl font-bold">₱95,000</p>
                        <p className="text-xs mt-2 opacity-70">↑ 8% from last month</p>
                    </div>
                    <div className="bg-gradient-to-br from-rc-orange to-rc-orangeDark rounded-xl p-6 text-white">
                        <WalletIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Total Expenses</p>
                        <p className="text-3xl font-bold">₱56,800</p>
                        <p className="text-xs mt-2 opacity-70">↓ 2% from last month</p>
                    </div>
                    <div className="bg-gradient-to-br from-rc-dark to-gray-800 rounded-xl p-6 text-white">
                        <ChartBarIcon className="h-8 w-8 opacity-50" />
                        <p className="text-sm opacity-80 mt-2">Net Profit</p>
                        <p className="text-3xl font-bold">₱38,200</p>
                        <p className="text-xs mt-2 opacity-70">↑ 12% from last month</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}