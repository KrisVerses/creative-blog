import { useQuery } from '@tanstack/react-query'
import { allPosts, Post } from 'contentlayer/generated'

/**
 * Custom hook for managing blog posts with search and filtering capabilities
 * Built on top of TanStack Query's useQuery hook for efficient data management
 * 
 * Why use TanStack Query here?
 * 1. Caching: Automatically caches filtered results to prevent unnecessary recalculations
 * 2. State Management: Handles loading, error, and success states automatically
 * 3. Performance: Prevents unnecessary re-renders and provides background updates
 * 4. DevTools: Offers debugging capabilities through ReactQueryDevtools
 */

/**
 * Fetches all blog posts from ContentLayer
 * In a real application, this would typically be an API call
 * We're using ContentLayer's static content for now
 */
const fetchPosts = async (): Promise<Post[]> => {
    // In a real app, this would be an API call
    // For now, we're using the static content from contentlayer
    return allPosts
}

/**
 * Filters posts based on selected tag
 * @param posts - Array of blog posts
 * @param tag - Selected tag to filter by (null means no filter)
 * @returns Filtered array of posts
 */
const filterPostsByTag = (posts: Post[], tag: string | null): Post[] => {
    if (!tag) return posts
    return posts.filter(post => post.tags?.includes(tag))
}

/**
 * Searches through posts based on title, summary, and body content
 * @param posts - Array of blog posts
 * @param searchTerm - Search term to filter by
 * @returns Filtered array of posts matching the search term
 */
const searchPosts = (posts: Post[], searchTerm: string): Post[] => {
    if (!searchTerm) return posts
    const term = searchTerm.toLowerCase()
    return posts.filter(post =>
        post.title.toLowerCase().includes(term) ||
        (post.summary?.toLowerCase() || '').includes(term) ||
        (post.body?.raw?.toLowerCase() || '').includes(term)
    )
}

/**
 * Main hook for managing blog posts with search and filtering
 * Uses TanStack Query's useQuery for efficient data management
 * 
 * @param selectedTag - Currently selected tag for filtering
 * @param searchTerm - Current search term
 * @returns Object containing:
 *   - data: Filtered and searched blog posts
 *   - isLoading: Loading state
 *   - error: Any error that occurred
 */
export function usePosts(selectedTag: string | null = null, searchTerm: string = '') {
    return useQuery({
        // Unique key for this query - changes when filters change
        queryKey: ['posts', selectedTag, searchTerm],

        // Function that fetches and processes the data
        queryFn: async () => {
            // 1. Fetch all posts
            const posts = await fetchPosts()

            // 2. Filter by tag if selected
            const tagFiltered = filterPostsByTag(posts, selectedTag)

            // 3. Search through filtered results
            const searchResults = searchPosts(tagFiltered, searchTerm)

            return searchResults
        },

        // Since we're using static content, we can set a longer stale time
        // This means the data won't be refetched for 5 minutes
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
} 