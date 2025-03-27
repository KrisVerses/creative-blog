'use client';

import { useState, useMemo, useEffect } from 'react';
import { allPosts, allProjects } from 'contentlayer/generated';
import { Search, SortDesc } from 'lucide-react';
import { FaTimes } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import { useColors } from '@/context/ColorContext';
import MasonryGrid from '@/components/ui/MasonryGrid';

type CategorySlug = 'coding' | 'design' | 'health' | 'life' | 'productivity' | 'self-help' | 'travel' | 'writing';
type SortOption = 'date' | 'title';
type SortDirection = 'asc' | 'desc';

const categories = [
    { name: 'Coding', slug: 'coding' as CategorySlug },
    { name: 'Design', slug: 'design' as CategorySlug },
    { name: 'Health', slug: 'health' as CategorySlug },
    { name: 'Life', slug: 'life' as CategorySlug },
    { name: 'Productivity', slug: 'productivity' as CategorySlug },
    { name: 'Self-Help', slug: 'self-help' as CategorySlug },
    { name: 'Travel', slug: 'travel' as CategorySlug },
    { name: 'Writing', slug: 'writing' as CategorySlug },
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('date');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const { categoryStyles, setCurrentCategory } = useColors();
    const category = categories.find(cat => cat.slug === params.slug);

    if (!category || !(params.slug in categoryStyles)) {
        notFound();
    }

    const styles = categoryStyles[params.slug as CategorySlug];

    // Set the current category when the component mounts
    useEffect(() => {
        setCurrentCategory(params.slug as CategorySlug);
        return () => setCurrentCategory(null);
    }, [params.slug, setCurrentCategory]);

    // Filter and sort content
    const filteredContent = useMemo(() => {
        const searchTerms = searchQuery.toLowerCase().split(' ').filter(Boolean);

        const matchesSearchTerms = (text: string) => {
            if (searchTerms.length === 0) return true;
            const normalizedText = text.toLowerCase();
            return searchTerms.every(term => normalizedText.includes(term));
        };

        // Helper function to sort content
        const sortContent = <T extends { date: string; title: string }>(items: T[]) => {
            return [...items].sort((a, b) => {
                if (sortBy === 'date') {
                    const comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
                    return sortDirection === 'desc' ? comparison : -comparison;
                } else {
                    const comparison = a.title.localeCompare(b.title);
                    return sortDirection === 'desc' ? -comparison : comparison;
                }
            });
        };

        // Filter and sort posts
        const posts = sortContent(
            allPosts.filter(post =>
                post.category === params.slug &&
                (searchTerms.length === 0 ||
                    matchesSearchTerms(post.title) ||
                    matchesSearchTerms(post.summary))
            )
        );

        // Filter and sort projects
        const projects = sortContent(
            allProjects.filter(project =>
                project.category === params.slug &&
                (searchTerms.length === 0 ||
                    matchesSearchTerms(project.title) ||
                    matchesSearchTerms(project.summary))
            )
        );

        return { posts, projects };
    }, [params.slug, searchQuery, sortBy, sortDirection]);

    // Toggle sort direction
    const toggleSortDirection = () => {
        setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Category Header */}
            <div className="border-b">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                                <span className="relative inline-block px-2">
                                    <span className="text-slate-800 relative z-10">{category.name}</span>
                                    <span
                                        className={`absolute inset-0 ${styles.accent} opacity-[0.15]`}
                                        style={{
                                            transform: 'skew(-12deg)',
                                            top: '8%',
                                            height: '88%',
                                            left: '-2px',
                                            right: '-2px'
                                        }}
                                    />
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl">
                                Explore {category.name.toLowerCase()} content, including articles, projects, and resources.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                                <p className="text-2xl font-bold text-slate-800">{allPosts.filter(p => p.category === params.slug).length}</p>
                                <p className="text-sm text-gray-600">Total Posts</p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                                <p className="text-2xl font-bold text-slate-800">{allProjects.filter(p => p.category === params.slug).length}</p>
                                <p className="text-sm text-gray-600">Total Projects</p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                                <p className="text-2xl font-bold text-slate-800">{filteredContent.posts.length}</p>
                                <p className="text-sm text-gray-600">Filtered Posts</p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                                <p className="text-2xl font-bold text-slate-800">{filteredContent.projects.length}</p>
                                <p className="text-sm text-gray-600">Filtered Projects</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Sort Controls */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search Bar */}
                    <div className="relative flex-grow">
                        <label htmlFor="category-search" className="sr-only">
                            Search in {category.name}
                        </label>
                        <input
                            id="category-search"
                            type="text"
                            placeholder={`Search in ${category.name}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 pl-12 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6F61]/30 focus:border-[#FF6F61] text-slate-800 placeholder:text-gray-400"
                            aria-label={`Search in ${category.name}`}
                        />
                        <Search
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                            aria-hidden="true"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Clear search"
                            >
                                <FaTimes size={16} />
                            </button>
                        )}
                    </div>

                    {/* Sort Controls */}
                    <div className="flex gap-2">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6F61]/30 focus:border-[#FF6F61]"
                        >
                            <option value="date">Sort by Date</option>
                            <option value="title">Sort by Title</option>
                        </select>
                        <button
                            onClick={toggleSortDirection}
                            className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-2"
                            aria-label={`Sort ${sortDirection === 'desc' ? 'descending' : 'ascending'}`}
                        >
                            <SortDesc
                                className={`transform transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''
                                    }`}
                                size={20}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                {/* Posts Section */}
                {filteredContent.posts.length > 0 && (
                    <section aria-labelledby="posts-heading" className="mb-12">
                        <h2 id="posts-heading" className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                            Posts
                            <span className="text-sm font-normal px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                                {filteredContent.posts.length}
                            </span>
                        </h2>
                        <MasonryGrid items={filteredContent.posts} category={params.slug as CategorySlug} searchQuery={searchQuery} />
                    </section>
                )}

                {/* Projects Section */}
                {filteredContent.projects.length > 0 && (
                    <section aria-labelledby="projects-heading">
                        <h2 id="projects-heading" className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                            Projects
                            <span className="text-sm font-normal px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                                {filteredContent.projects.length}
                            </span>
                        </h2>
                        <MasonryGrid items={filteredContent.projects} category={params.slug as CategorySlug} searchQuery={searchQuery} />
                    </section>
                )}

                {/* Empty State */}
                {filteredContent.posts.length === 0 && filteredContent.projects.length === 0 && (
                    <div className="text-center py-16" role="status" aria-live="polite">
                        <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                            <Search className="text-slate-400" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-slate-800">
                            No content found
                        </h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            {searchQuery
                                ? `No ${category.name.toLowerCase()} content matches your search. Try adjusting your search terms.`
                                : `No ${category.name.toLowerCase()} content is available yet. Check back soon for updates!`}
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}