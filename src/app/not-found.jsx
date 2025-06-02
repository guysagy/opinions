import Heading from '@/components/Heading';

export const metadata = {
    title: 'Not Found',
}

export default function NotFoundPage() {
    return (
        <>
            <Heading>Not Found</Heading>
            <p>
                Ooops , the page you requested really really does not exit
            </p>
        </>
    );
}