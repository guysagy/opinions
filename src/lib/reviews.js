import { readFile, readdir } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function getFeaturedReview() {
    const reviews = await getReviews();
    return reviews[0];
}

export async function getReview(slug) {
    const text = await readFile(`./src/content/reviews/${slug}.md`, 'utf-8');
    const { content, data: { title, date, image } } = matter(text);
    const body = marked(content);
    return { slug, title, date, image, body };
}

export async function getReviews() {
    const slugs = await getSlugs();
    console.log('getReviews');
    const reviews = [];
    for (const slug of slugs) {
        const review = await getReview(slug);
        reviews.push(review);
    }
    reviews.sort((review1, review2) =>  new Date(review2.date) - new Date(review1.date));
    return reviews;
}

export async function getSlugs() {
    const files = await readdir('./src/content/reviews');
    return files.filter(file => file.endsWith('.md')).map(file => file.slice(0, -'.md'.length));
}
