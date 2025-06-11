import { searchReviews } from '@/lib/reviews';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const query = request.nextUrl.searchParams.get('query');
    console.log('/api/search: ', request.nextUrl);
    console.log('query: ', query);
    const reviews = await searchReviews(query);
    return NextResponse.json(reviews);
}