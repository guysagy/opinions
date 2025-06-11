'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useIsClient } from '@/lib/hooks';

const reviews = [
    { title: 'Hades', slug: 'hades-2018' },
    { title: 'Fall Guys: Ultimate Knockout', slug: 'fall-guys' },
    { title: 'Black Mesa', slug: 'black-mesa' },
    { title: 'Disco Elysium', slug: 'disco-elysium' },
    { title: 'Dead Cells', slug: 'dead-cells' },
    { title: 'A Way Out - edited', slug: 'a-way-out-2018' }
];

export default function SearchBox() {
    const router = useRouter();
    const isClient = useIsClient();
    const [query, setQuery] = useState('');
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        if (query.length >1) {
            (async () => {
                const response = await fetch('/api/search?query=' + encodeURIComponent(query));
                const reviews = await response.json();
                setReviews(reviews);
            })();
        } else {
            setReviews([]);
        }
    }, [query]);

    const handleChange = (review) => {
        console.log('selected = ', review);
        router.push(`/reviews/${review.slug}`);
    }

    console.log("[SearchBox] query: ", query);
    if (!isClient) {
        return null;
    }
    return (
        <div className="relative w-48">
            <Combobox onChange={handleChange}>
                <ComboboxInput 
                    placeholder="Search ..." className="border px-2 py-1 rounded w-full"
                    value={query} onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxOptions className="absolute bg-white py-1 w-full">
                    {
                        reviews.map((review) => {
                            return (
                                <ComboboxOption key={review.slug} value={review}>
                                    {
                                        ({active}) => (
                                            <span className={`block px-2 truncate w-full ${
                                                active ? 'bg-orange-100' : ''
                                            }`}>
                                                {review.title}
                                            </span>
                                        )
                                    }

                                </ComboboxOption>
                            );
                        })
                    }
                </ComboboxOptions>
            </Combobox>
        </div>
    );
}