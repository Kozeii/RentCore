import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { NotificationBell, GlobalSearch, DarkModeToggle, useKeyboardShortcuts } from '@/Components/UI';
import {
    HomeIcon, BuildingOfficeIcon, UserGroupIcon, DocumentTextIcon,
    CurrencyDollarIcon, ChatBubbleLeftIcon, Bars3Icon, XMarkIcon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useKeyboardShortcuts();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, shortcut: 'Ctrl+D' },
        { name: 'Buildings', href: '/buildings', icon: BuildingOfficeIcon, shortcut: 'Ctrl+B' },
        { name: 'Tenants', href: '/tenants', icon: UserGroupIcon, shortcut: 'Ctrl+T' },
        { name: 'Documents', href: '/documents', icon: DocumentTextIcon },
        { name: 'Finance', href: '/transactions', icon: CurrencyDollarIcon, shortcut: 'Ctrl+F' },
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
                    <span className="ml-3 text-xl font-bold text-white">Rent<span className="text-rc-orange">Core</span></span>
                </div>
                <nav className="mt-6 px-3 space-y-1">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="group flex items-center px-3 py-2.5 text-sm rounded-lg text-gray-300 hover:bg-rc-teal hover:text-white">
                            <item.icon className="mr-3 h-5 w-5 group-hover:text-rc-orange" />
                            <span className="flex-1">{item.name}</span>
                            {item.shortcut && <span className="text-xs text-gray-500">{item.shortcut}</span>}
                        </Link>
                    ))}
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-8 w-8 bg-rc-orange rounded-full flex items-center justify-center text-white">{auth?.user?.name?.charAt(0)}</div>
                            <div className="ml-3">
                                <p className="text-sm text-white">{auth?.user?.name}</p>
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
                        <div className="flex justify-between h-16 px-4 items-center">
                            <span className="text-white font-bold">Rent<span className="text-rc-orange">Core</span></span>
                            <button onClick={() => setSidebarOpen(false)}><XMarkIcon className="h-6 w-6 text-gray-400" /></button>
                        </div>
                        <nav className="mt-6 px-3 space-y-1">
                            {navigation.map(item => (
                                <Link key={item.name} href={item.href} className="flex items-center px-3 py-2.5 text-gray-300 hover:bg-rc-teal rounded-lg" onClick={() => setSidebarOpen(false)}>
                                    <item.icon className="mr-3 h-5 w-5" />{item.name}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                </div>
            )}

            {/* Mobile Bottom Nav */}
            <div className="fixed bottom-0 inset-x-0 bg-rc-dark lg:hidden z-30">
                <div className="grid grid-cols-6">
                    {navigation.map(item => (
                        <Link key={item.name} href={item.href} className="p-2 text-center text-gray-400">
                            <item.icon className="h-5 w-5 mx-auto" />
                            <span className="text-[10px]">{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:pl-64 pb-16 lg:pb-0">
                <header className="bg-white shadow-sm sticky top-0 z-30 border-b-2 border-rc-orange">
                    <div className="flex items-center justify-between h-16 px-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Bars3Icon className="h-6 w-6" /></button>
                        <div className="hidden md:block"><GlobalSearch /></div>
                        <div className="flex-1" />
                        <div className="flex items-center gap-3">
                            <DarkModeToggle />
                            <NotificationBell />
                            <span className="hidden sm:block text-sm text-rc-dark">{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </header>
                <main className="py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}