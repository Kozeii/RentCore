import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ href, active, children }) {
    return (
        <Link href={href} className={'block px-4 py-2 text-sm ' + (active ? 'bg-rc-orange text-white' : 'text-rc-dark hover:bg-rc-light')}>
            {children}
        </Link>
    );
}
