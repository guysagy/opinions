import { readFile, readdir } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function getReview(slug) {
    const text = await readFile(`./src/content/reviews/${slug}.md`, 'utf-8');
    const { content, data: { title, date, image } } = matter(text);
    const body = marked(content);
    return { slug, title, date, image, body };
}

export async function getReviews() {
    const files = await readdir('./src/content/reviews');
    const slugs = files.filter(file => file.endsWith('.md')).map(file => file.slice(0, -'.md'.length));
    console.log('slugs = ', slugs);
    const reviews = [];
    for (const slug of slugs) {
        const review = await getReview(slug);
        reviews.push(review);
    }
    console.log('reviews = ', reviews);
    return reviews;
}
