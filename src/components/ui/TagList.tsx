'use client';

import { useMemo, useState } from 'react';
import { allPosts } from "contentlayer/generated";
import Tag from "./Tag";

interface TagListProps {
    selectedTag: string | null;
    onTagSelect: (tag: string | null) => void;
    isLoading?: boolean;
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
const TagList: React.FC<TagListProps> = ({ selectedTag, onTagSelect, isLoading = false }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Loading skeleton state
    if (isLoading) {
        return (
            <div className="flex flex-wrap gap-2 items-center min-h-[88px]">
                {/* First row */}
                <div className="h-8 w-16 bg-slate-200 rounded-full animate-pulse" /> {/* "All" button */}
                {[...Array(6)].map((_, i) => (
                    <div key={`row1-${i}`} className="h-8 w-24 bg-slate-200 rounded-full animate-pulse" />
                ))}
                {/* Second row */}
                <div className="w-full" />
                {[...Array(5)].map((_, i) => (
                    <div key={`row2-${i}`} className="h-8 w-20 bg-slate-200 rounded-full animate-pulse" />
                ))}
            </div>
        );
    }

    // Get unique tags and their counts
    const tagCounts = useMemo(() => {
        const counts: { [key: string]: number } = {};
        allPosts.forEach(post => {
            post.tags?.forEach(tag => {
                counts[tag] = (counts[tag] || 0) + 1;
            });
        });
        return counts;
    }, []);

    // Sort tags by count (most used first)
    const sortedTags = useMemo(() => {
        return Object.entries(tagCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([tag]) => tag);
    }, [tagCounts]);

    // Calculate how many tags are hidden
    const remainingTags = sortedTags.length - 10;
    const displayedTags = isExpanded ? sortedTags : sortedTags.slice(0, 10);

    return (
        <div className="flex flex-wrap gap-2 items-center">
            <button
                onClick={() => onTagSelect(null)}
                className={`px-3 py-1 rounded-full text-sm ${selectedTag === null
                    ? 'bg-[#FF6F61]/80 text-white'
                    : 'bg-gray-100 hover:bg-[#FF6F61] hover:text-white'
                    }`}
            >
                All
            </button>
            {displayedTags.map(tag => {
                const isSelected = selectedTag === tag;
                return (
                    <button
                        key={tag}
                        onClick={() => onTagSelect(isSelected ? null : tag)}
                        className={`
                            group inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm 
                            border transition-all duration-200 transform hover:scale-102
                            ${isSelected
                                ? 'border-[#FF6F61] bg-[#FF6F61]/5 text-[#FF6F61]'
                                : 'border-gray-200 text-gray-600 hover:border-[#FF6F61] hover:bg-[#FF6F61]/5 hover:text-[#FF6F61]'
                            }
                        `}
                    >
                        <span>{tag}</span>
                        <span className={`
                            text-xs px-1.5 py-0.5 rounded-full transition-colors
                            ${isSelected
                                ? 'bg-[#FF6F61]/10 text-[#FF6F61]'
                                : 'bg-gray-100 text-gray-500 group-hover:bg-[#FF6F61]/10 group-hover:text-[#FF6F61]'
                            }
                        `}>
                            {tagCounts[tag]}
                        </span>
                        {isSelected && (
                            <span className="ml-1 text-[#FF6F61] hover:text-[#FF6F61]/80" onClick={(e) => {
                                e.stopPropagation();
                                onTagSelect(null);
                            }}>
                                ×
                            </span>
                        )}
                    </button>
                );
            })}
            {remainingTags > 0 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border border-gray-200 text-gray-600 
                        hover:border-[#FF6F61] hover:bg-[#FF6F61]/5 hover:text-[#FF6F61] transition-all duration-200"
                >
                    {isExpanded ? (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            <span>Show Less</span>
                        </>
                    ) : (
                        <>
                            <span>+{remainingTags} more</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </>
                    )}
                </button>
            )}
        </div>
    )
}

export default TagList;