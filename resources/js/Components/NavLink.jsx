import { Link } from '@inertiajs/react';

export default function NavLink({ href, active, children }) {
    return (
        <Link href={href} className={'px-4 py-2 rounded-lg text-sm font-medium ' + (active ? 'bg-rc-orange text-white' : 'text-rc-dark hover:bg-rc-light')}>
            {children}
        </Link>
    );
}
