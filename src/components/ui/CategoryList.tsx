'use client';

import Link from 'next/link';
import { useState } from 'react';
const categories = [
    { name: 'Coding', slug: 'coding' },
    { name: 'Design', slug: 'design' },
    { name: 'Health', slug: 'health' },
    { name: 'Life', slug: 'life' },
    { name: 'Productivity', slug: 'productivity' },
    { name: 'Self-Help', slug: 'self-help' },
    { name: 'Travel', slug: 'travel' },
    { name: 'Writing', slug: 'writing' },
];

const CategoryList = () => {
    const [showAll, setShowAll] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState(4);

    const handleShowAll = () => {
        setShowAll(!showAll);
        setVisibleCategories(showAll ? 4 : categories.length);
    };

    return (
        <div className="flex flex-wrap justify-center flex-wrap gap-1.5">
            {categories.slice(0, visibleCategories).map((category) => (
                <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="px-3 py-2 text-md bg-[#98F7CF] text-slate-900 border border-b-2 border-slate-800 hover:bg-[#ff8c81]/90 transition-colors font-semibold"
                >
                    {category.name}
                </Link>
            ))}
            <button
                className="px-3 py-1 text-sm bg-[#98F7CF] text-slate-900 rounded-full border border-b-2 border-slate-800 hover:bg-[#ff8c81]/90 transition-colors font-semibold"
                aria-label="More categories"
                onClick={handleShowAll}
            >
                {showAll ? 'Show Less' : '...'}
            </button>
        </div>
    );
}

export default CategoryList;