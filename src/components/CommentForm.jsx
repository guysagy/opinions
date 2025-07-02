'use client';


import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { createCommentAction } from '@/app/reviews/[slug]/actions';

export default function CommentForm({slug, title}) {
    const router = useRouter();
    const [state, setState] = useState({ loading: false, error: null });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setState({loading: true, error: null});
        const form = event.currentTarget;
        const formData = new FormData(form);
        console.log('formData = ', formData);
        try {
            const result = await createCommentAction(formData);
            if (result?.isError) {
                setState({loading: false, error: result.message});
            } else {
                form.reset();
                router.push(`/reviews/${slug}`, { scroll: false });
                setState({loading: false, error: null});
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
                Boolean(state.error) && (
                    <p className="text-red-700">{state.error}</p>
                )
            }
            <button type='submit' disabled={state.loading}
                className="bg-orange-800 rounded px-2 py-1 self-center
                            text-slate-50 w-32 hover:bg-orange-700
                            disabled:bg-slate-500 disabled:cursor-not-allowed">
                Submit
            </button>
        </form>
    );
};