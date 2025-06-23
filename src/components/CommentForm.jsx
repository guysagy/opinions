import { redirect } from 'next/navigation';
import { createComment } from '@/lib/comments';

export default function CommentForm({slug, title}) {
    async function action(formData) {
        'use server';
        console.log('[action]', formData);
        console.log('[action] user: ', formData.get('user'));
        console.log('[action] message: ', formData.get('message'));
        const message = createComment({
            slug,
            user: formData.get('user'), 
            message: formData.get('message'),
        });
        console.log('created: ', message);
        redirect(`/reviews/${slug}`);
    }
    return (
        <form action={action} 
            className="border bg-white flex flex-col gap-2 mt-3 px-3 py-2 rounded">
            <p>
                Already played <strong>{title}</strong> game? Have your say!
            </p>
            <div className="flex">
                <label htmlFor="userField" className="shrink-0 w-32">
                    Your name
                </label>
                <input name='user' id="userField" className="border px-2 py-1 rounded w-48"/>
            </div>
            <div className="flex">
                <label htmlFor="messageField" className="shrink-0 w-32">
                    Your comment
                </label>
                <textarea name='message' id="messageField" className="border px-2 py-1 rounded w-full"/>
            </div>
            <button type='submit'
                className="bg-orange-800 rounded px-2 py-1 self-center
                            text-slate-50 w-32 hover:bg-orange-700">
                Submit
            </button>
        </form>
    );
};