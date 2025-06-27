'use client';

import { createCommentAction } from '@/app/reviews/[slug]/actions';

export default function CommentForm({slug, title}) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        console.log('formData = ', formData);
        const result = await createCommentAction(formData);
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
                <input id="userField" name='user' required maxLength={50}
                    className="border px-2 py-1 rounded w-48"
                />
            </div>
            <div className="flex">
                <label htmlFor="messageField" className="shrink-0 w-32">
                    Your comment
                </label>
                <textarea id="messageField" name='message' required maxLength={500}
                    className="border px-2 py-1 rounded w-full"
                />
            </div>
            <button type='submit'
                className="bg-orange-800 rounded px-2 py-1 self-center
                            text-slate-50 w-32 hover:bg-orange-700">
                Submit
            </button>
        </form>
    );
};