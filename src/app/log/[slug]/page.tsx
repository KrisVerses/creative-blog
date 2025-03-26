'use client';

import { allLogs, allProjects } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "@/components/ui/MDXComponents";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function LogPage({ params }: { params: { slug: string } }) {
    // Find the specific log that matches the URL slug
    const log = allLogs.find(
        (log) => log._raw.sourceFileName.replace(".mdx", "") === params.slug
    );

    // If no log found, show error message
    if (!log) {
        return (
            <div className="max-w-7xl mx-auto p-4 min-h-[50vh] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto mb-4">
                        <svg className="text-[#FF6F61] w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800">Log Not Found</h1>
                    <p className="text-gray-600">We couldn't find the log entry you're looking for.</p>
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

    // Get the related project
    const project = allProjects.find(
        (project) => project._raw.sourceFileName.replace(".mdx", "") === log.projectId
    );

    // Convert the MDX code into a React component
    const MDXContent = useMDXComponent(log.body.code);

    // Loading state while MDX is being processed
    if (!MDXContent) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:max-w-4xl lg:px-8">
                <div className="animate-pulse space-y-8">
                    {/* Skeleton for log header */}
                    <div className="space-y-4">
                        <div className="h-12 bg-slate-200 rounded w-3/4" />
                        <div className="flex justify-between items-center">
                            <div className="h-6 bg-slate-200 rounded w-32" />
                            <div className="h-6 bg-slate-200 rounded w-24" />
                        </div>
                        <div className="flex gap-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-8 w-20 bg-slate-200 rounded-full" />
                            ))}
                        </div>
                    </div>
                    {/* Skeleton for log content */}
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-4 bg-slate-200 rounded w-full" />
                        ))}
                        <div className="h-4 bg-slate-200 rounded w-2/3" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <article className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:max-w-4xl lg:px-8">
            {/* Back to project link */}
            <Link
                href={`/project/${project?._raw.sourceFileName.replace(".mdx", "")}`}
                className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Project
            </Link>

            {/* Log header */}
            <header className="mb-8">
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-[#FF6F61]/10 text-[#FF6F61]">Day {log.day}</span>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <time>{format(new Date(log.date), 'MMMM d, yyyy')}</time>
                    </div>
                </div>

                <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 mb-4">
                    {log.title}
                </h1>

                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Progress Summary</h2>
                    <p className="text-gray-600">{log.progress}</p>
                </div>

                {log.challenges && log.challenges.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-slate-800">Challenges Faced</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {log.challenges.map((challenge, index) => (
                                <li key={index}>{challenge}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </header>

            {/* Log content */}
            <div className="max-w-7xl mx-auto mt-8 prose prose-lg prose-neutral">
                <MDXContent components={MDXComponents} />
            </div>

            {/* Back to project link at the bottom */}
            <div className="mt-12 pt-6 border-t border-gray-200">
                <Link
                    href={`/project/${project?._raw.sourceFileName.replace(".mdx", "")}`}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF6F61] transition-colors group"
                >
                    <svg className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Project</span>
                </Link>
            </div>
        </article>
    );
}

export default LogPage; 