'use client';

import { allProjects, allPosts, allLogs } from "contentlayer/generated";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format, differenceInDays } from "date-fns";
import { getSortedLogs, getSortedPosts } from "@/lib/utils";

const ProjectPage = () => {
    const { slug } = useParams();
    const project = allProjects.find(
        (project) => project._raw.sourceFileName.replace(".mdx", "") === slug
    );

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

    // Calculate days since project start
    const daysSinceStart = differenceInDays(new Date(), new Date(project.date));

    // Loading state while data is being processed
    if (!project || !logs || !relatedPosts) {
        return (
            <div className="max-w-7xl mx-auto p-4 min-h-[50vh]">
                <div className="animate-pulse space-y-8">
                    {/* Skeleton for project header */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="relative aspect-video w-full bg-slate-200 rounded-lg" />
                            <div className="space-y-4">
                                <div className="h-10 bg-slate-200 rounded w-3/4" />
                                <div className="h-20 bg-slate-200 rounded" />
                                <div className="flex gap-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-8 w-24 bg-slate-200 rounded-full" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="bg-slate-50 p-6 rounded-lg h-32" />
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-24 bg-slate-200 rounded-lg" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-12">
            {/* Back to Projects link */}
            <Link
                href="/project"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF6F61] transition-colors group"
            >
                <svg className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Projects</span>
            </Link>

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
                    </div>
                </div>

                {/* Latest Logs and Day Counter */}
                <div className="space-y-8">
                    {/* Day Counter */}
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Project Timeline</h2>
                        <div className="flex items-center gap-4">
                            <div className="bg-[#FF6F61] text-white px-4 py-2 rounded-lg">
                                <span className="text-2xl font-bold">{daysSinceStart}</span>
                                <span className="ml-2">days</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>since start</span>
                            </div>
                        </div>
                    </div>

                    {/* Latest Logs */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Latest Progress</h2>
                        <div className="relative pl-4 border-l-2 border-[#FF6F61] space-y-4">
                            {logs?.map((log) => (
                                <Link
                                    href={`/log/${log._raw.sourceFileName.replace(".mdx", "")}`}
                                    key={log._id}
                                    className="block p-4 border rounded-lg hover:border-[#FF6F61]/50 hover:bg-slate-50/50 transition-all relative group"
                                >
                                    <div className="absolute left-[-2.25rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FF6F61] ring-4 ring-white shadow-md shadow-[#FF6F61]/20 group-hover:scale-110 transition-transform" />
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span>Day {log.day}</span>
                                    </div>
                                    <h3 className="font-medium text-slate-800 group-hover:text-[#FF6F61] transition-colors mt-2">{log.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2 group-hover:text-gray-700 transition-colors">{log.progress}</p>
                                    <div className="flex items-center gap-2 text-[#FF6F61] text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Read more</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Posts Grid */}
            {relatedPosts.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Related Articles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedPosts.map((post) => (
                            <Link
                                href={`/post/${post._raw.sourceFileName.replace(".mdx", "")}`}
                                key={post._id}
                                className="group block p-6 border rounded-lg hover:border-[#FF6F61]/50 transition-colors"
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
    );
}

export default ProjectPage;