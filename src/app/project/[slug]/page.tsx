'use client';

import { allProjects, allPosts, allLogs } from "contentlayer/generated";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format, differenceInDays } from "date-fns";

const ProjectPage = () => {
    const { slug } = useParams();
    const project = allProjects.find(
        (project) => project._raw.sourceFileName.replace(".mdx", "") === slug
    );
    const relatedPosts = project
        ? allPosts.filter((post) => {
            return post.relatedProjects?.includes(project._raw.sourceFileName.replace(".mdx", ""))
        })
        : [];

    const logs = allLogs.filter((log) => {
        return log.projectId === project?._raw.sourceFileName.replace(".mdx", "")
    });

    // Calculate days since project start
    const daysSinceStart = project ? differenceInDays(new Date(), new Date(project.date)) : 0;

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-12">
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
                                <span key={tech} className="bg-slate-100 px-3 py-1 rounded-full text-sm text-slate-700">
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
                            <span className="text-gray-500">
                                Started {project?.date && format(new Date(project.date), 'MMM d, yyyy')}
                            </span>
                        </div>

                        {/* Project Links */}
                        <div className="flex gap-4">
                            {project?.github && (
                                <Link
                                    href={project.github}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6F61] text-white rounded-lg hover:bg-[#FF6F61]/90 transition-colors shadow-sm hover:shadow-md"
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
                            <span className="text-gray-600">since start</span>
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
                                    className="block p-4 border rounded-lg hover:border-[#FF6F61]/50 transition-colors relative"
                                >
                                    <div className="absolute left-[-2.25rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FF6F61] ring-4 ring-white shadow-md shadow-[#FF6F61]/20" />
                                    <p className="text-sm text-gray-500">Day {log.day}</p>
                                    <h3 className="font-medium text-slate-800">{log.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{log.progress}</p>
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
                                <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#FF6F61]/80 transition-colors mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4">{format(new Date(post.date), 'MMM d, yyyy')}</p>
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