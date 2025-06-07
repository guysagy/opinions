import NavLink from '@/components/NavLink';

export default function NavBar() {
    return (
        <nav>
            <ul className='flex gap-2'>
                <li>
                    <NavLink className="font-bold font-orbitron" href="/" prefetch={false}>Indie Gamer</NavLink>
                </li>
                <li className="ml-auto">
                    <NavLink href="/reviews" prefetch={false}>Reviews</NavLink>
                </li>
                <li>
                    <NavLink href="/about" prefetch={false}>About</NavLink>
                </li>
            </ul>
        </nav>
    );
}
