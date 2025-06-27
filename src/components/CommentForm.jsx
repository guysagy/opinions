'use client';


import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { createCommentAction } from '@/app/reviews/[slug]/actions';

export default function CommentForm({slug, title}) {
    const router = useRouter();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        const form = event.currentTarget;
        const formData = new FormData(form);
        console.log('formData = ', formData);
        try {
            const result = await createCommentAction(formData);
            if (result?.isError) {
                setError(result);
            } else {
                form.reset();
                router.push(`/reviews/${slug}`, { scroll: false });
            }
        } catch (error) {
            console.log('[CommentForm] error : ', error);
        }
    }

    return (
        <form onSubmit={handleSubmit} 
            className="border bg-white flex flex-col gap-2 mt-3 px-3 py-2 rounded">
            <p>
                Already played <strong>{title}</strong> game? Have your say!
            </p>
            <input type='hidden' name='slug' value={slug} />
            <div className="flex">
                <label htmlFor="userField" className="shrink-0 w-32">
                    Your name
                </label>
                <input id="userField" name='user'  maxLength={50}
                    className="border px-2 py-1 rounded w-48"
                />
            </div>
            <div className="flex">
                <label htmlFor="messageField" className="shrink-0 w-32">
                    Your comment
                </label>
                <textarea id="messageField" name='message'  maxLength={500}
                    className="border px-2 py-1 rounded w-full"
                />
            </div>
            {
                Boolean(error) && (
                    <p className="text-red-700">{error.message}</p>
                )
            }
            <button type='submit'
                className="bg-orange-800 rounded px-2 py-1 self-center
                            text-slate-50 w-32 hover:bg-orange-700">
                Submit
            </button>
        </form>
    );
};