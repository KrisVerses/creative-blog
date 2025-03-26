'use client';

import { useState, useMemo, useEffect } from 'react';
import { allPosts, allProjects } from 'contentlayer/generated';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useColors } from '@/context/ColorContext';
import MasonryGrid from '@/components/MasonryGrid';

type CategorySlug = 'coding' | 'design' | 'health' | 'life' | 'productivity' | 'self-help' | 'travel' | 'writing';

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

// Helper function to highlight search terms
function highlightText(text: string, searchTerm: string) {
    if (!searchTerm.trim()) return text;

    // Escape special regex characters in the search term
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create a regex that matches the search term within words
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
        // Check if this part matches the search term (case-insensitive)
        if (part.toLowerCase() === searchTerm.toLowerCase() || regex.test(part)) {
            return <mark key={i} className="bg-[#FF6F61]/10 text-[#FF6F61] px-1 rounded">{part}</mark>;
        }
        return part;
    });
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const [searchQuery, setSearchQuery] = useState('');
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

    // Filter posts and projects by category and search query
    const filteredContent = useMemo(() => {
        const searchTerms = searchQuery.toLowerCase().split(' ').filter(Boolean);

        const matchesSearchTerms = (text: string) => {
            if (searchTerms.length === 0) return true;
            const normalizedText = text.toLowerCase();
            return searchTerms.every(term => normalizedText.includes(term));
        };

        const posts = allPosts.filter(post =>
            post.category === params.slug &&
            (searchTerms.length === 0 ||
                matchesSearchTerms(post.title) ||
                matchesSearchTerms(post.summary))
        );

        const projects = allProjects.filter(project =>
            project.category === params.slug &&
            (searchTerms.length === 0 ||
                matchesSearchTerms(project.title) ||
                matchesSearchTerms(project.summary))
        );

        return { posts, projects };
    }, [params.slug, searchQuery]);

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

            {/* Search Bar */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="relative">
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