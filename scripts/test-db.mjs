import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({
    log: [{emit: 'stdout', level: 'query'}],
});
const comment = await db.comment.create({
    data: {
        slug: 'hades-2018',
        user: 'Alice', 
        message: 'Comment 2',
    }
});
console.log('create:', comment);

const comments = await db.comment.findMany({
    where: { slug: 'hades-2018' }
});
console.log('comments = ',comments);