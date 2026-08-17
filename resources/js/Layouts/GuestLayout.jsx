import { Link } from '@inertiajs/react';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-rc-light flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center">
                        <div className="bg-rc-orange p-3 rounded-xl">
                            <BuildingOfficeIcon className="h-8 w-8 text-white" />
                        </div>
                        <span className="ml-3 text-3xl font-bold text-rc-dark">
                            Rent<span className="text-rc-orange">Core</span>
                        </span>
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}