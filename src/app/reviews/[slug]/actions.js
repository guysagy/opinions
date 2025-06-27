'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createComment } from '@/lib/comments';

export async function createCommentAction(formData) {
    const data = {
        slug: formData.get('slug'),
        user: formData.get('user'), 
        message: formData.get('message'),
    };

    const error = validate(data);
    if (error) {
        return { isError: true, message: error };
    }

    try {
        const message = await createComment(data);
        revalidatePath(`/reviews/${data.slug}`);
        return { isError: false, message };
    } catch(error) {
        console.log('[createCommentAction] createComment error : ', error);
    }
}

function validate(data) {
    if (!data.user) {
        return 'Name field is required';
    }
    if (data.user.length > 50) {
        return 'Name field cannot be longer than 50 characters';
    }
    if (!data.message) {
        return 'Comment field is required';
    }
    if (data.message.length > 500) {
        return 'Comment field cannot be longer than 500 characters';
    }
}