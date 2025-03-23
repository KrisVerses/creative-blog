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
                            <p className="mt-2">{post.summary}</p>
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