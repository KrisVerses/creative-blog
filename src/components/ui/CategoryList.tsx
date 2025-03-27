'use client';

import { allPosts, allProjects } from 'contentlayer/generated';
import Link from 'next/link';
import { useState, useMemo } from 'react';

const categories = [
    { name: 'Coding', slug: 'coding' },
    { name: 'Design', slug: 'design' },
    { name: 'Health', slug: 'health' },
    { name: 'Life', slug: 'life' },
    { name: 'Productivity', slug: 'productivity' },
    { name: 'Self-Help', slug: 'self-help' },
    { name: 'Travel', slug: 'travel' },
    { name: 'Writing', slug: 'writing' },
] as const;

const CategoryList = () => {
    const [showAll, setShowAll] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState(4);

    // Memoize the category counts to prevent recalculation on every render
    const categoriesWithCounts = useMemo(() => {
        const getCategoryCount = (category: string) => {
            const postCount = allPosts.filter(post => post.category === category).length;
            const projectCount = allProjects.filter(project => project.category === category).length;
            return postCount + projectCount;
        };

        return categories
            .map(category => ({
                ...category,
                count: getCategoryCount(category.slug)
            }))
            .sort((a, b) => b.count - a.count);
    }, []); // Empty dependency array since allPosts and allProjects are static

    const handleShowAll = () => {
        setShowAll(!showAll);
        setVisibleCategories(showAll ? 4 : categories.length);
    };

    return (
        <div className="flex flex-wrap justify-center gap-1.5">
            {categoriesWithCounts
                .slice(0, visibleCategories)
                .map(({ name, slug, count }) => (
                    <Link
                        key={slug}
                        href={`/category/${slug}`}
                        className="px-3 py-2 text-md bg-[#98F7CF] text-slate-900 border border-b-2 border-slate-800 hover:bg-[#ff8c81]/90 transition-colors font-semibold inline-flex items-center gap-1"
                    >
                        {name}
                    </Link>
                ))}
            <button
                className="px-3 py-1 text-sm bg-[#98F7CF] text-slate-900 rounded-full border border-b-2 border-slate-800 hover:bg-[#ff8c81]/90 transition-colors font-semibold"
                aria-label={showAll ? "Show fewer categories" : "Show more categories"}
                onClick={handleShowAll}
            >
                {showAll ? 'Show Less' : '...'}
            </button>
        </div>
    );
};

export default CategoryList;