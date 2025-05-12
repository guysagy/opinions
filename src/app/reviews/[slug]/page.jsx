import { getReviews } from '@/lib/reviews';
import Heading from '@/components/Heading';

export default async function ReviewPage({ params: { slug }}) {
    const review = await getReviews(slug);
    return (
        <>
            <Heading>{review.title}</Heading>
            <p className="italic pb-2">{review.date}</p>
            <img src={review.image} alt="" 
                width="640" height="360" className="mb-2 rounded">
            </img>
            <article dangerouslySetInnerHTML = {{ __html: review.body }} 
                className="max-w-screen-sm prose prose-slate"
            />
        </>
    );
}