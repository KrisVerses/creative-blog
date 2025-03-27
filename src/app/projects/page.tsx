'use client';

import { allProjects, allLogs, allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { getSortedProjects, getSortedLogs, getSortedPosts } from "@/lib/utils";
import { useState, useMemo } from "react";

export default function ProjectPage() {
    // State for filters
    const [statusFilter, setStatusFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    // Get the most recently updated project as featured
    const featuredProject = getSortedProjects(allProjects)[0];

    // Get related logs for featured project
    const relatedLogs = getSortedLogs(
        allLogs.filter(log => log.projectId === featuredProject?._raw.sourceFileName.replace(".mdx", ""))
    ).slice(0, 4);

    // Get related posts for featured project
    const relatedPosts = getSortedPosts(
        allPosts.filter(post => post.relatedProjects?.includes(featuredProject._raw.sourceFileName.replace(".mdx", "")))
    ).slice(0, 2);

    // Filter and sort projects
    const filteredProjects = useMemo(() => {
        let projects = [...allProjects];

        // Apply status filter
        if (statusFilter !== 'all') {
            projects = projects.filter(project => project.status === statusFilter);
        }

        // Apply sorting
        projects.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return projects;
    }, [statusFilter, sortOrder]);

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-12">
            {/* Featured Project Section */}
            <section className="relative">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-slate-800">Featured Project</h1>
                <div className="relative aspect-[4/3] sm:aspect-video w-full mb-8 group rounded-lg overflow-hidden">
                    <Image
                        src={featuredProject?.image || "/brandImages/3.jpg"}
                        alt={featuredProject?.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Status Badge - Top Left */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                        <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${featuredProject?.status === 'completed' ? 'bg-green-100 text-green-800' :
                            featuredProject?.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {featuredProject?.status}
                        </span>
                    </div>

                    {/* Project Details Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/75 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8 transition-opacity duration-300">
                        <Link href={`/projects/${featuredProject?._raw.sourceFileName.replace(".mdx", "")}`} className="group/title">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover/title:text-[#FF6F61] transition-colors line-clamp-2">{featuredProject?.title}</h2>
                        </Link>
                        <p className="text-slate-200 mb-3 sm:mb-4 md:mb-6 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed line-clamp-2 sm:line-clamp-3">{featuredProject?.summary}</p>

                        {/* Tech Stack */}
                        <div className="flex gap-1.5 sm:gap-2 flex-wrap mb-3 sm:mb-4 md:mb-6">
                            {featuredProject?.technologies.map((tech) => (
                                <span key={tech} className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                                    <span className="text-xs sm:text-sm font-medium text-white">{tech}</span>
                                </span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-2 sm:gap-4">
                            {featuredProject?.github && (
                                <Link
                                    href={featuredProject?.github}
                                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-[#FF6F61] text-white rounded-lg hover:bg-[#FF6F61]/90 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm sm:text-base"
                                >
                                    <span className="font-medium">View Source</span>
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </Link>
                            )}
                            {featuredProject?.demo && (
                                <Link
                                    href={featuredProject?.demo}
                                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-[#FF6F61] text-white rounded-lg hover:bg-[#FF6F61]/90 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm sm:text-base"
                                >
                                    <span className="font-medium">Live Demo</span>
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* A sleek gradient hr element */}
            <hr className="border-t border-gray-200" />

            {/* All Projects Grid */}
            <section>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">All Projects</h2>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                                className="appearance-none w-full sm:w-auto pl-3 pr-10 py-2.5 bg-white border rounded-lg text-gray-600 text-sm font-medium hover:border-[#FF6F61]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6F61]/20"
                            >
                                <option value="all">All Projects</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative">
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                                className="appearance-none w-full sm:w-auto pl-3 pr-10 py-2.5 bg-white border rounded-lg text-gray-600 text-sm font-medium hover:border-[#FF6F61]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6F61]/20"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <Link
                            href={`/projects/${project._raw.sourceFileName.replace(".mdx", "")}`}
                            key={project._id}
                            className="group relative aspect-video overflow-hidden rounded-lg transform transition-all hover:scale-[1.02]"
                        >
                            <Image
                                src={project.image || "/brandImages/3.jpg"}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Status Badge */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {project.status}
                                </span>
                            </div>
                            {/* Content Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/75 to-transparent flex flex-col justify-end p-6 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF6F61] transition-colors">{project.title}</h3>
                                <p className="text-slate-200 text-sm line-clamp-2 mb-3">{project.summary}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <span key={tech} className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-white">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-white">
                                            +{project.technologies.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}