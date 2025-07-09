import { getComments } from '@/lib/comments';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const CommentList = async ({ slug }) => {
    const comments = await getComments(slug);
    if (comments.length === 0) {
        return (<p className='italic mt-3'>No comments yet.</p>);
    }
    return (
        <ul className="border border-gray-300 mt-3 rounded-2">
            {
                comments.map((comment) => (
                    <li key={comment.id}
                        className="border-b border-gray-300 px-3 py-2 last:border-none odd:bg-orange-100">
                        <div className="flex gap-3 pb-1 text-slate-500">
                            <UserCircleIcon className="h-6 w-6" />
                            {comment.user}
                        </div>
                        <p className="italic">
                            {comment.message}
                        </p>
                    </li>
                ))
            }
        </ul>
    );
};

export default CommentList;
