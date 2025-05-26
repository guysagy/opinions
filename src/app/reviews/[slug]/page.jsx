import Image from 'next/image';
import { getReview, getSlugs } from '@/lib/reviews';
import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';


export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((slug => ({ slug })));
}

export async function generateMetadata(props) {
    const params = await props.params;
    const slug = params.slug;
    const review = await getReview(slug);
    return {
        title: review.title,
        description: `Review of ${review.title}`,
    };
}

export default async function ReviewPage(props) {
    const params = await props.params;
    const slug = params.slug;
    const review = await getReview(slug);
    return (
        <>
            <Heading>{review.title}</Heading>
            <p className="font-semibold pb-2">
                {review.subtitle}
            </p>
            <div className="flex gap-3 items-baseline">
                <p className="italic pb-2">{review.date}</p>
                <ShareLinkButton />
            </div>
            <Image src={review.image} alt="" priority 
                width="640" height="360" className="mb-2 rounded">
            </Image>
            <article dangerouslySetInnerHTML = {{ __html: review.body }} 
                className="max-w-screen-sm prose prose-slate"
            />
        </>
    );
}