// Import necessary dependencies
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-css'; // For responsive grid layout with different height items
import { Post, Project } from 'contentlayer/generated'; // Content types from ContentLayer
import { CategorySlug } from '@/types'; // Type for category identifiers
import { useColors } from '@/context/ColorContext'; // Hook for category-specific styling
import Image from 'next/image'; // Next.js optimized image component
import Link from 'next/link'; // Next.js link component
import { highlightText } from '@/lib/utils'; // Utility for search term highlighting
import { format } from 'date-fns';

// Define the content type as either Post or Project
type Content = Post | Project;

// Component props interface
interface MasonryGridProps {
    items: Content[];          // Array of posts or projects to display
    category: CategorySlug;    // Current category identifier
    searchQuery?: string;      // Optional search term for highlighting
}

const MasonryGrid = ({ items, category, searchQuery = '' }: MasonryGridProps) => {
    // Get category-specific styles from the ColorContext
    const { categoryStyles } = useColors();
    const styles = categoryStyles[category];

    // Define responsive breakpoints for the masonry grid
    // Controls how many columns appear at different screen sizes
    const breakpointColumns = {
        default: 3, // Desktop: 3 columns
        1280: 3,    // Large screens
        1024: 2,    // Medium screens
        768: 2,     // Tablet
        640: 1      // Mobile
    };

    return (
        // Masonry grid container with responsive columns
        <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
        >
            {/* Map through content items and create cards */}
            {items.map((content) => (
                <div
                    key={content._id}
                    className={`
            mb-6 break-inside-avoid  // Prevent cards from breaking across columns
            block p-6 rounded-xl     // Card padding and rounded corners
            bg-white                 // White background
            border border-slate-200  // Subtle border
          `}
                >
                    {/* Conditional rendering of content image */}
                    {content.image && (
                        <div className="relative w-full rounded-lg overflow-hidden mb-4">
                            {/* Maintain 16:9 aspect ratio for images */}
                            <div className="relative aspect-[16/9]">
                                <Image
                                    src={content.image}
                                    alt={`Cover for ${content.title}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                    )}
                    {/* Content link wrapper */}
                    <Link href={`/${content.type.toLowerCase() + "s"}/${content.slug}`} className="block">
                        {/* Date display */}
                        <div className="flex items-center gap-2 mb-2 text-sm text-slate-500">
                            <time dateTime={content.date}>
                                {format(new Date(content.date), 'MMMM d, yyyy')}
                            </time>
                            <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                            <span>{content.type}</span>
                        </div>
                        {/* Title with hover effect */}
                        <h3 className="relative inline-block mb-3 group">
                            {/* 
                              Title text span with hover styles
                              - z-10 keeps text above the highlight effect
                              - hover:text-white changes text color on hover
                              - styles.hover applies category-specific hover color
                            */}
                            <span className={`
                relative z-10 text-xl font-semibold
                text-slate-800                      // Dark text for readability
                transition-colors duration-300      // Smooth color transition
              `}>
                                {/* Title text with optional search highlighting */}
                                {searchQuery.trim()
                                    ? highlightText(
                                        content.title,
                                        searchQuery,
                                        `${styles.accent.replace('bg-', 'bg-opacity-10 ')} ${styles.accent.replace('bg-', 'text-')}`
                                    )
                                    : content.title}
                            </span>

                            {/* Background highlight effect */}
                            <span
                                className={`
                                    absolute inset-0 
                                    ${styles.accent} 
                                    opacity-0
                                    group-hover:opacity-15
                                    group-hover:animate-highlight
                                    rounded
                                `}
                                style={{
                                    transform: 'skew(-12deg)',
                                    top: '0%',
                                    height: '100%',
                                    left: '-4px',
                                    right: '-4px',
                                    clipPath: 'inset(0 100% 0 0)',
                                    WebkitClipPath: 'inset(0 100% 0 0)'
                                }}
                            />
                        </h3>
                        {/* Content summary */}
                        <p className={`
              text-slate-600          // Medium contrast text
              line-clamp-3            // Limit to 3 lines
              leading-relaxed         // Comfortable line height
            `}>
                            {/* Summary text with optional search highlighting */}
                            {searchQuery.trim()
                                ? highlightText(
                                    content.summary || '',
                                    searchQuery,
                                    `${styles.accent.replace('bg-', 'bg-opacity-10 ')} ${styles.accent.replace('bg-', 'text-')}`
                                )
                                : content.summary}
                        </p>
                        {/* Read more link */}
                        <div className={`
              mt-4 inline-flex items-center         // Layout for link and icon
              text-sm font-medium                   // Text styling
              text-slate-800                        // Darker text for better contrast
              opacity-90 group-hover:opacity-100    // Higher base opacity
              transition-opacity duration-300       // Smooth opacity transition
            `}>
                            Read more
                            {/* Arrow icon */}
                            <svg
                                className="ml-1 w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </Link>
                </div>
            ))}
        </Masonry>
    );
};

export default MasonryGrid;