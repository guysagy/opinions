'use client';

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
    const isClient = useIsClient();
    if (!isClient) {
        return null;
    }
    return (
        <div className="relative w-48">
            <Combobox>
                <ComboboxInput placeholder="Search ..." className="border px-2 py-1 rounded w-full"/>
                <ComboboxOptions className="absolute bg-white py-1 w-full">
                    {
                        reviews.map((review) => {
                            console.log('option = ', review.title);
                            return (
                                <ComboboxOption key={review.slug}>
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