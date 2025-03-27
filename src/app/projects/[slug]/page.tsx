'use client';

import { allProjects, allPosts, allLogs } from "contentlayer/generated";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format, differenceInDays } from "date-fns";
import { getSortedLogs, getSortedPosts } from "@/lib/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "@/components/ui/MDXComponents";
import { useState } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const ProjectPage = () => {
    const { slug } = useParams();
    const project = allProjects.find(
        (project) => project._raw.sourceFileName.replace(".mdx", "") === slug
    );

    // Convert the MDX code into a React component
    const MDXContent = project?.body.code ? useMDXComponent(project.body.code) : null;

    // Handle project not found
    if (!project) {
        return (
            <div className="max-w-7xl mx-auto p-4 min-h-[50vh] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto mb-4">
                        <svg className="text-[#FF6F61]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800">Project Not Found</h1>
                    <p className="text-gray-600">We couldn't find the project you're looking for.</p>
                    <Link
                        href="/project"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6F61] text-white rounded-lg hover:bg-[#FF6F61]/90 transition-colors mt-4"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to Projects</span>
                    </Link>
                </div>
            </div>
        );
    }

    const relatedPosts = getSortedPosts(
        allPosts.filter((post) => post.relatedProjects?.includes(project._raw.sourceFileName.replace(".mdx", "")))
    );

    const logs = getSortedLogs(
        allLogs.filter((log) => log.projectId === project._raw.sourceFileName.replace(".mdx", ""))
    );

    // Group logs by day
    const logsByDay = logs.reduce((acc, log) => {
        const day = log.day;
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(log);
        return acc;
    }, {} as Record<number, typeof logs>);

    // Get unique days sorted
    const uniqueDays = Object.keys(logsByDay)
        .map(Number)
        .sort((a, b) => b - a); // Sort descending (newest first)

    // Calculate days since project start
    const daysSinceStart = differenceInDays(new Date(), new Date(project.date));

    // For completed projects, calculate total duration
    const projectDuration = project?.status === 'completed'
        ? differenceInDays(new Date(logs[0]?.date || project.date), new Date(project.date))
        : daysSinceStart;

    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    // Loading state while data is being processed
    if (!project || !logs || !relatedPosts) {
        return (
            <div className="max-w-7xl mx-auto p-4 min-h-[50vh]">
                <div className="animate-pulse space-y-8">
                    {/* Back to Projects Link Skeleton */}
                    <div className="w-32 h-6 bg-slate-200 rounded"></div>

                    {/* Project Header Skeleton */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            {/* Project Image Skeleton */}
                            <div className="relative aspect-video w-full bg-slate-200 rounded-lg" />

                            {/* Project Title and Summary Skeleton */}
                            <div className="space-y-4">
                                <div className="h-10 bg-slate-200 rounded w-3/4" />
                                <div className="h-20 bg-slate-200 rounded" />

                                {/* Tech Stack Skeleton */}
                                <div className="flex gap-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-8 w-24 bg-slate-200 rounded-full" />
                                    ))}
                                </div>

                                {/* Status Badge Skeleton */}
                                <div className="w-24 h-8 bg-slate-200 rounded-full" />

                                {/* Project Links Skeleton */}
                                <div className="flex gap-4">
                                    <div className="w-32 h-10 bg-slate-200 rounded-lg" />
                                    <div className="w-32 h-10 bg-slate-200 rounded-lg" />
                                </div>

                                {/* Pinned Documentation Skeleton */}
                                <div className="mt-6 p-3 border border-slate-200 rounded-lg">
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <div className="w-3 h-3 bg-slate-200 rounded" />
                                        <div className="w-24 h-4 bg-slate-200 rounded" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-slate-200 rounded w-3/4" />
                                        <div className="h-4 bg-slate-200 rounded w-5/6" />
                                        <div className="h-4 bg-slate-200 rounded w-2/3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline and Logs Skeleton */}
                        <div className="space-y-8">
                            {/* Day Counter Skeleton */}
                            <div className="bg-slate-50 p-6 rounded-lg h-32" />

                            {/* Latest Logs Skeleton */}
                            <div className="space-y-4">
                                <div className="h-8 bg-slate-200 rounded w-40" />
                                <div className="relative pl-4 border-l-2 border-slate-200">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="mb-4 p-4 border border-slate-200 rounded-lg">
                                            <div className="absolute left-[-0.5rem] top-1/2 w-4 h-4 rounded-full bg-slate-200" />
                                            <div className="space-y-2">
                                                <div className="h-4 bg-slate-200 rounded w-24" />
                                                <div className="h-6 bg-slate-200 rounded w-3/4" />
                                                <div className="h-4 bg-slate-200 rounded w-5/6" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Timeline Pills Skeleton */}
                            <div className="mt-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-4 h-4 bg-slate-200 rounded" />
                                    <div className="w-32 h-4 bg-slate-200 rounded" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="w-20 h-8 bg-slate-200 rounded-full" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts Skeleton */}
                    <div className="space-y-6">
                        <div className="h-8 bg-slate-200 rounded w-48" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 bg-slate-200 rounded-lg" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-8">
            {/* Breadcrumb Navigation */}
            <Breadcrumbs />

            {/* Project Details */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Project Details card with image, title, and summary */}
                <div className="md:col-span-2 space-y-6">
                    <div className="relative aspect-video w-full">
                        <Image
                            src={project?.image || "/brandImages/3.jpg"}
                            alt={project?.title || "Project Image"}
                            fill
                            className="object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-slate-800">{project?.title}</h1>
                        <p className="text-gray-600">{project?.summary}</p>

                        {/* Tech Stack */}
                        <div className="flex gap-2 flex-wrap">
                            {project?.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1.5 rounded-full text-sm border border-gray-200 text-gray-600 
                                    hover:border-[#FF6F61] hover:bg-[#FF6F61]/5 hover:text-[#FF6F61] 
                                    transition-all duration-200 cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Project Status */}
                        <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${project?.status === 'completed' ? 'bg-green-100 text-green-800' :
                                project?.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                {project?.status}
                            </span>
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span>Started {project?.date && format(new Date(project.date), 'MMMM d, yyyy')}</span>
                            </div>
                        </div>

                        {/* Project Links */}
                        <div className="flex gap-4">
                            {project?.github && (
                                <Link
                                    href={project.github}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6F61] text-white rounded-lg hover:bg-[#FF6F61]/90 transition-colors shadow-sm hover:shadow-md"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>View Source</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </Link>
                            )}
                            {project?.demo && (
                                <Link
                                    href={project.demo}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6F61] text-white rounded-lg hover:bg-[#FF6F61]/90 transition-colors shadow-sm hover:shadow-md"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>Live Demo</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            )}
                        </div>

                        {/* Pinned Documentation Card */}
                        {MDXContent && (
                            <div className="mt-6 p-3 border border-gray-100 rounded-lg bg-white">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                    <span className="text-xs font-medium text-gray-400">Project Overview</span>
                                </div>
                                <div className="prose prose-sm max-w-none">
                                    <MDXContent components={MDXComponents} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Latest Logs and Day Counter */}
                <div className="space-y-8">
                    {/* Day Counter */}
                    <div id="timeline" className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Project Timeline</h2>
                        <div className="flex items-center gap-4">
                            <div className="bg-[#FF6F61] text-white px-4 py-2 rounded-lg">
                                <span className="text-2xl font-bold">{projectDuration}</span>
                                <span className="ml-2">days</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{project?.status === 'completed' ? 'to complete' : 'since start'}</span>
                            </div>
                            {project?.status === 'completed' && (
                                <div className="flex items-center gap-2 text-green-600">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Completed</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Progress Section */}
                    <div id="progress" className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-slate-800">Latest Progress</h2>
                            {logs.length > 4 && (
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-sm text-[#FF6F61] hover:text-[#FF6F61]/80 flex items-center gap-1"
                                >
                                    <span>{isExpanded ? 'Show Less' : `Show ${logs.length - 4} More`}</span>
                                    <svg
                                        className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className="relative pl-4 border-l-2 border-[#FF6F61] space-y-4">
                            {uniqueDays.slice(0, isExpanded ? undefined : 4).map((day) => {
                                const dayLogs = logsByDay[day];
                                const mostRecentLog = dayLogs[0];
                                return (
                                    <Link
                                        key={mostRecentLog._id}
                                        href={`/log/${mostRecentLog._raw.sourceFileName.replace(".mdx", "")}`}
                                        className="block p-4 border rounded-lg hover:border-[#FF6F61]/50 hover:bg-slate-50/50 transition-all relative group"
                                    >
                                        <div className="absolute left-[-2.25rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FF6F61] ring-4 ring-white shadow-md shadow-[#FF6F61]/20 group-hover:scale-110 transition-transform" />
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span>Day {day}</span>
                                            {dayLogs.length > 1 && (
                                                <span className="text-xs text-gray-400">({dayLogs.length} updates)</span>
                                            )}
                                        </div>
                                        <h3 className="font-medium text-slate-800 group-hover:text-[#FF6F61] transition-colors mt-2">{mostRecentLog.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2 group-hover:text-gray-700 transition-colors">{mostRecentLog.progress}</p>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mini Timeline View */}
                        {logs.length > 4 && (
                            <div className="mt-6">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Project Timeline</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {uniqueDays.map((day) => {
                                        const dayLogs = logsByDay[day];
                                        const isMultipleLogs = dayLogs.length > 1;
                                        const isSelected = selectedDay === day;

                                        return (
                                            <div key={day} className="relative">
                                                {isMultipleLogs ? (
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setSelectedDay(isSelected ? null : day)}
                                                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm transition-colors ${isSelected
                                                                ? 'bg-[#FF6F61] text-white hover:bg-[#FF6F61]/90'
                                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                                }`}
                                                        >
                                                            <span>Day {day}</span>
                                                            <span className="ml-1 text-xs">({dayLogs.length})</span>
                                                        </button>
                                                        {isSelected && (
                                                            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                                <div className="p-2">
                                                                    {dayLogs.map((log) => (
                                                                        <Link
                                                                            key={log._id}
                                                                            href={`/log/${log._raw.sourceFileName.replace(".mdx", "")}`}
                                                                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                                                            onClick={() => setSelectedDay(null)}
                                                                        >
                                                                            {log.title}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={`/log/${dayLogs[0]._raw.sourceFileName.replace(".mdx", "")}`}
                                                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm transition-colors ${isExpanded
                                                            ? 'bg-[#FF6F61] text-white hover:bg-[#FF6F61]/90'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        <span>Day {day}</span>
                                                    </Link>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Related Articles */}
                    {relatedPosts.length > 0 && (
                        <div id="articles" className="mt-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Related Articles</h2>
                            <div className="grid gap-4">
                                {relatedPosts.map((post) => (
                                    <Link
                                        href={`/posts/${post._raw.sourceFileName.replace(".mdx", "")}`}
                                        key={post._id}
                                        className="group block p-6 border rounded-lg hover:border-[#FF6F61]/50 transition-colors bg-white"
                                    >
                                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#FF6F61] transition-colors mb-2">
                                            {post.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                                        </div>
                                        <p className="text-gray-600 line-clamp-2">{post.summary}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* create a hr gradient line */}
            <hr className="border-t border-gray-200" />
        </div>
    );
}

export default ProjectPage;