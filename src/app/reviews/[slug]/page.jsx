import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { getReview, getSlugs } from '@/lib/reviews';
import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';
import CommentList from '@/components/CommentList';
import CommentListSkeleton from '@/components/CommentListSkeleton';
import CommentForm from '@/components/CommentForm';
import { Suspense } from 'react';

export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((slug => ({ slug })));
}

export async function generateMetadata(props) {
    const params = await props.params;
    const slug = params.slug;
    const review = await getReview(slug);
    if (!review) {
        notFound();
    }
    return {
        title: review.title,
        description: `Review of ${review.title}`,
    };
}

export default async function ReviewPage(props) {
    const params = await props.params;
    const slug = params.slug;
    const review = await getReview(slug);
    if (!review) {
        notFound();
    }
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
            <section className="border-dashed border-t max-w-sm mt-3 py-3">
                <h2 className="font-bold flex gap-2 items-center text-xl">
                    <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                    Comments
                </h2>
                <CommentForm slug={slug} title={review.title}/>
                <Suspense fallback={<CommentListSkeleton/>}>
                    <CommentList slug={slug}/>
                </Suspense>
            </section>
        </>
    );
}
