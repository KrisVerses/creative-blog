'use client';

import { allPosts } from "contentlayer/generated";
import Tag from "./Tag";

interface TagListProps {
    selectedTag: string | null;
    onTagSelect: (tag: string | null) => void;
}

/**
 * Calculate unique tags once, outside the component
 * This optimization:
 * 1. Prevents recalculation on every render
 * 2. Ensures we only show unique tags using Set
 * 3. Moves expensive computation outside the component
 * 4. Takes advantage of the fact that allPosts is static (from contentlayer)
 */
const uniqueTags = Array.from(new Set(allPosts.map((post) => post.tags).flat()));

/**
 * TagList Component
 * Displays a list of unique tags from all blog posts
 * 
 * TypeScript: Using React.FC for proper type checking
 * Performance: Uses pre-calculated uniqueTags
 * React: Includes key prop for efficient list rendering
 */
const TagList: React.FC<TagListProps> = ({ selectedTag, onTagSelect }) => {
    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => onTagSelect(null)}
                className={`px-3 py-1 rounded-full text-sm ${selectedTag === null
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
            >
                All
            </button>
            {uniqueTags.map(tag => (
                <Tag
                    key={tag}
                    tag={tag}
                    isSelected={selectedTag === tag}
                    onClick={() => onTagSelect(tag)}
                />
            ))}
        </div>
    )
}

export default TagList;