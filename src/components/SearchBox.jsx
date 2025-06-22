'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useDebounce } from 'use-debounce';
import { useIsClient } from '@/lib/hooks';


export default function SearchBox() {
    const router = useRouter();
    const isClient = useIsClient();
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 300);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        if (debouncedQuery.length >1) {
            const controller = new AbortController();
            (async () => {
                const url = '/api/search?query=' + encodeURIComponent(debouncedQuery);
                const response = await fetch(url, { signal: controller.signal });
                const reviews = await response.json();
                setReviews(reviews);
            })();
            return () => controller.abort();
        } else {
            setReviews([]);
        }
    }, [debouncedQuery]);

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
                <ComboboxOptions className="absolute bg-white py-1 w-full empty:invisible">
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