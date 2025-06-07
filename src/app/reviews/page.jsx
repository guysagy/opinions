import Image from 'next/image';
import Heading from '@/components/Heading';
import PaginationBar from '@/components/PaginationBar';
import SearchBox from '@/components/SearchBox';
import Link from 'next/link';
import { getReviews } from '@/lib/reviews';

export const revalidate = 30;

export const metadata = {
    title: 'Reviews',
}

const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }) {
    let { page } = await searchParams;
    page = parsePageParam(page);
    const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
    console.log('[ReviewsPage] reviews: ', reviews.map((review) => { return {title: review.title, slug: review.slug}; }));
    return (
        <>
            <Heading>Reviews</Heading>
            <div className="flex justify-between pb-3">
                <PaginationBar url='/reviews' page={page} pageCount={pageCount}/>
                <SearchBox/>
            </div>
            <ul className="flex flex-row flex-wrap gap-3">
            {
                reviews.map((review, index) => (
                    <li className="bg-white border border-gray-500 rounded shadow w-80 hover:shadow-xl"
                        key={review.slug}>
                        <Link href={`/reviews/${review.slug}`}>
                            <Image src={review.image} alt="" priority={index === 0}
                                width="320" height="180" className="rounded-t" />
                            <h2 className="font-semibold font-orbitron py-1 text-center">
                                {review.title}
                            </h2>
                        </Link>
                    </li>
                ))
            }
            </ul>
        </>
    );
}

function parsePageParam(paramValue) {
    if (paramValue) {
        const page = parseInt(paramValue, 10);
        if (isFinite(page) && page > 0) {
            return page;
        }
    }
    return 1;
}