import Link from 'next/link';
import Heading from '@/components/Heading';

export default function HomePage() {
    console.log('[HomePage] rendering');
    return (
        <>
            <Heading>Indie Gamer</Heading>
            <p className="pb-3">
                Only the best indie games, reviewed for you.
            </p>
            <div className="bg-white border border-gray-500 rounded shadow w-80 hover:shadow-xl sm:w-full">
                <Link className="flex flex-col sm:flex-row" href="/reviews/stardew-valley">
                    <img src="/images/stardew-valley.jpg" alt="" 
                        width="320" height="180" className="rounded-t sm:rounded-l sm:rounded-r-none" />
                    <h2 className="font-semibold font-orbitron py-1 text-center sm:px-2">
                        Stardew Valley
                    </h2>
                </Link>
            </div>
        </>
    );
}
