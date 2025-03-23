'use client';

import { useState } from 'react'
import { usePosts } from '@/hooks/usePosts'
import TagList from './TagList'
import { Post } from 'contentlayer/generated'
import { format } from 'date-fns'
import Link from 'next/link';

/**
 * PostList Component
 * 
 * A client-side component that displays a list of blog posts with search and filtering capabilities.
 * Uses TanStack Query for efficient data management and caching.
 * 
 * Features:
 * - Search posts by title and summary
 * - Filter posts by tags
 * - Responsive layout with hover effects
 * - Loading and error states
 */

/**
 * Extracts a snippet of text around a search term
 * @param text - The full text to search in
 * @param term - The search term to find
 * @param contextLength - Number of characters to show before/after
 * @returns Snippet of text with the term in context
 */
function extractSnippet(text: string, term: string, contextLength: number = 100): string {
    // Return empty string if either text or search term is missing
    if (!term || !text) return '';

    // Create a case-insensitive regex pattern to find the search term
    const regex = new RegExp(term, 'gi');
    // Check if the term exists in the text
    const match = text.match(regex);
    if (!match) return '';

    // Find the first occurrence of the term (case-insensitive)
    const index = text.toLowerCase().indexOf(term.toLowerCase());

    // Calculate the start and end positions for the snippet
    // start: Go back contextLength characters, but don't go before the start of text
    const start = Math.max(0, index - contextLength);
    // end: Go forward contextLength characters, but don't go past the end of text
    const end = Math.min(text.length, index + term.length + contextLength);

    // Extract the snippet using the calculated positions
    let snippet = text.slice(start, end);

    // Add ellipsis if we're not at the start of the text
    if (start > 0) snippet = '...' + snippet;
    // Add ellipsis if we're not at the end of the text
    if (end < text.length) snippet = snippet + '...';

    return snippet;
}

/**
 * Highlights text that matches the search term
 * @param text - The text to search in
 * @param term - The search term to highlight
 * @returns JSX with highlighted text
 */
function HighlightedText({ text, term }: { text: string; term: string }) {
    if (!term) return <p className="mt-2">{text}</p>;

    const parts = text.split(new RegExp(`(${term})`, 'gi'));

    return (
        <p className="mt-2">
            {parts.map((part, i) =>
                part.toLowerCase() === term.toLowerCase() ? (
                    <span key={i} className="bg-yellow-200 font-medium">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </p>
    );
}

interface PostListProps {
    searchTerm: string;
}

export default function PostList({ searchTerm }: PostListProps) {
    // State for tag filtering and search functionality
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    // Use TanStack Query hook to fetch and filter posts
    // Returns: { data: posts, isLoading, error }
    const { data: posts, isLoading, error } = usePosts(selectedTag, searchTerm)

    // Handle loading and error states
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading posts</div>

    return (
        <div className="space-y-6">
            {/* Tag Filter Section */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Filter by Tag:</h3>
                <TagList
                    selectedTag={selectedTag}
                    onTagSelect={setSelectedTag}
                />
            </div>

            {/* Post List Section */}
            <div className="space-y-4">
                {posts?.map((post: Post) => (
                    <Link href={post.url} key={post._raw.flattenedPath}>
                        <article
                            className="p-4 border rounded-lg hover:shadow-md transition-shadow group my-4"
                        >
                            <h2 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{post.title}</h2>
                            <p className="text-gray-600">{format(new Date(post.date), 'MMMM d, yyyy')}</p>
                            <HighlightedText text={post.summary || ''} term={searchTerm} />
                            {searchTerm && post.body?.raw && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="font-medium">Found in content: </span>
                                    <HighlightedText
                                        text={extractSnippet(post.body.raw, searchTerm)}
                                        term={searchTerm}
                                    />
                                </div>
                            )}
                            {/* Tags Section - Using optional chaining since tags are optional */}
                            <div className="mt-2 flex gap-2">
                                {post.tags?.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
} 