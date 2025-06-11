'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({children, href, prefetch, className}) {
    className = className || '';
    const pathname = usePathname();
    if (pathname === href) {
        return (
            <span className={`${className} text-orange-800`}>{children}</span>
        );
    }
    return (
        <Link href={href} prefetch={prefetch} className={`${className} text-orange-800 hover:underline`}>{children}</Link>
    );
};