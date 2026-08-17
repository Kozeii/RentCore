import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    HomeIcon, BuildingOfficeIcon, UserGroupIcon, DocumentTextIcon,
    CurrencyDollarIcon, ChatBubbleLeftIcon, Bars3Icon, XMarkIcon,
    ArrowLeftOnRectangleIcon, Cog6ToothIcon, ChartPieIcon, BellIcon,
} from '@heroicons/react/24/outline';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Buildings', href: '/buildings', icon: BuildingOfficeIcon },
        { name: 'Tenants', href: '/tenants', icon: UserGroupIcon },
        { name: 'Documents', href: '/documents', icon: DocumentTextIcon },
        { name: 'Finance', href: '/transactions', icon: CurrencyDollarIcon },
        { name: 'Messages', href: '/messages', icon: ChatBubbleLeftIcon },
    ];

    return (
        <div className="min-h-screen bg-rc-light">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-rc-dark hidden lg:block">
                <div className="flex items-center justify-center h-16 border-b border-gray-700">
                    <div className="bg-rc-orange p-2 rounded-lg">
                        <BuildingOfficeIcon className="h-6 w-6 text-white" />
                    </div>
                    <span className="ml-3 text-xl font-bold text-white">
                        Rent<span className="text-rc-orange">Core</span>
                    </span>
                </div>
                <nav className="mt-6 px-3 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-rc-teal hover:text-white transition-colors"
                        >
                            <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-rc-orange" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-8 w-8 bg-rc-orange rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">{auth?.user?.name?.charAt(0) || 'U'}</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">{auth?.user?.name}</p>
                                <p className="text-xs text-gray-400">{auth?.user?.email}</p>
                            </div>
                        </div>
                        <Link href="/logout" method="post" as="button" className="text-gray-400 hover:text-rc-orange">
                            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
                    <aside className="fixed inset-y-0 left-0 w-64 bg-rc-dark">
                        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
                            <span className="text-xl font-bold text-white">Rent<span className="text-rc-orange">Core</span></span>
                            <button onClick={() => setSidebarOpen(false)}>
                                <XMarkIcon className="h-6 w-6 text-gray-400" />
                            </button>
                        </div>
                        <nav className="mt-6 px-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-rc-teal hover:text-white"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                </div>
            )}

            {/* Main */}
            <div className="lg:pl-64">
                <header className="bg-white shadow-sm sticky top-0 z-30 border-b-2 border-rc-orange">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                            <Bars3Icon className="h-6 w-6 text-rc-dark" />
                        </button>
                        <div className="flex-1" />
                        <span className="text-sm text-rc-dark">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                </header>
                <main className="py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}