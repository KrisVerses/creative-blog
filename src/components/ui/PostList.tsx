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

//TODO: Modularize the post list component: extractSnippet, HighlightedText, tag filter

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
    if (!term) return <p className="mt-4 mb-2 text-gray-800/90">{text}</p>;

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
    if (isLoading) {
        return (
            <div className="space-y-6 w-full min-h-[600px]">
                <div className="h-[72px]">
                    <h3 className="text-lg text-slate-800 font-semibold mb-2">
                        <div className="bg-slate-200 w-40 h-7 rounded animate-pulse" />
                    </h3>
                    <div className="flex gap-2 flex-wrap h-[32px]">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="px-3 py-1.5 rounded-full h-7 w-20 border border-slate-200 bg-slate-50 animate-pulse" />
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-full h-[156px]">
                            <article className="p-4 border rounded-lg h-full">
                                <div className="grid gap-2">
                                    <div className="h-7 bg-slate-200 w-2/3 rounded animate-pulse" />
                                    <div className="h-6 bg-slate-200 w-44 rounded animate-pulse" />
                                    <div className="h-[48px] bg-slate-200 rounded animate-pulse" />
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map((j) => (
                                            <div key={j} className="px-3 py-1.5 rounded-full h-7 w-16 border border-slate-200 bg-slate-50 animate-pulse" />
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6 w-full min-h-[600px]">
                <div>
                    <h3 className="text-lg text-slate-800 font-semibold mb-2">Explore by Tag:</h3>
                    <div className="flex gap-2 flex-wrap min-h-[32px]" />
                </div>

                <div className="min-h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-4 w-full max-w-md px-4">
                        <div className="w-16 h-16 mx-auto mb-4">
                            <svg className="text-[#FF6F61] w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Unable to Load Posts</h2>
                        <p className="text-gray-600">There was an error loading the posts. Please try again later.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-[#FF6F61] text-white rounded-lg hover:bg-[#FF6F61]/90 transition-colors mt-4"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Retry</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full min-h-[600px]">
            <div>
                <h3 className="text-lg text-slate-800 font-semibold mb-2">Explore by Tag:</h3>
                <div className="min-h-[32px]">
                    <TagList
                        selectedTag={selectedTag}
                        onTagSelect={setSelectedTag}
                    />
                </div>
            </div>

            <div className="min-h-[400px]">
                {!posts?.length ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-center">
                        <div className="w-16 h-16 mb-4 text-gray-400">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="animate-pulse">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">No Posts Found</h3>
                        <p className="text-gray-600 max-w-sm">
                            {searchTerm
                                ? `No posts match "${searchTerm}"${selectedTag ? ` with tag "${selectedTag}"` : ''}`
                                : selectedTag
                                    ? `No posts found with tag "${selectedTag}"`
                                    : 'No posts available at the moment.'
                            }
                        </p>
                        {(searchTerm || selectedTag) && (
                            <div className="mt-6 space-y-4">
                                <button
                                    onClick={() => {
                                        setSelectedTag(null);
                                    }}
                                    className="text-[#FF6F61] hover:text-[#FF6F61]/80 transition-colors inline-flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Clear filters
                                </button>
                                {searchTerm && (
                                    <div className="pt-4 border-t">
                                        <p className="text-sm text-gray-600 mb-3">Popular tags you might be interested in:</p>
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {['nextjs', 'react', 'typescript'].map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => setSelectedTag(tag)}
                                                    className="px-3 py-1.5 rounded-full text-sm border border-gray-200 text-gray-600 
                                                    hover:border-[#FF6F61] hover:bg-[#FF6F61]/5 hover:text-[#FF6F61] 
                                                    transition-all duration-200"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post: Post) => (
                            <Link href={post.url} key={post._raw.flattenedPath} className="block group">
                                <article className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 group-hover:border-[#FF6F61]/20">
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-bold text-slate-800 group-hover:text-[#FF6F61] transition-colors">{post.title}</h2>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                                        </div>
                                        <HighlightedText text={post.summary || ''} term={searchTerm} />
                                        {searchTerm && post.body?.raw && (
                                            <div className="mt-4 border-t pt-4 text-sm text-gray-600">
                                                <span className="font-medium">Found in content: </span>
                                                <HighlightedText
                                                    text={extractSnippet(post.body.raw, searchTerm)}
                                                    term={searchTerm}
                                                />
                                            </div>
                                        )}
                                        {/* Tags Section */}
                                        <div className="flex gap-2 pt-2">
                                            {post.tags?.map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1.5 rounded-full text-sm border border-gray-200 text-gray-600 
                                                    hover:border-[#FF6F61] hover:bg-[#FF6F61]/5 hover:text-[#FF6F61] 
                                                    transition-all duration-200 transform hover:scale-102"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 