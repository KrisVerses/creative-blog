import { allProjects, allLogs, allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

export default function ProjectPage() {
    // Get the most recently updated project as featured
    const featuredProject = allProjects[0];

    // Get related logs for featured project
    const relatedLogs = allLogs
        .filter(log => log.projectId === featuredProject._raw.sourceFileName.replace(".mdx", ""))
        .slice(0, 3);

    // Get related posts for featured project
    const relatedPosts = allPosts
        .filter(post => post.relatedProjects?.includes(featuredProject._raw.sourceFileName.replace(".mdx", "")))
        .slice(0, 2);

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-12">
            {/* Featured Project Section */}
            <section className="relative">
                <h1 className="text-4xl font-bold mb-8">Featured Project</h1>
                <div className="relative aspect-video w-full mb-8">
                    <Image
                        src={featuredProject.image || "/brandImages/3.jpg"}
                        alt={featuredProject.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Project Details */}
                    <div className="space-y-4">
                        <Link href={`/project/${featuredProject._raw.sourceFileName.replace(".mdx", "")}`}>
                            <h2 className="text-3xl font-bold text-slate-800">{featuredProject.title}</h2>
                        </Link>
                        <p className="text-gray-600">{featuredProject.summary}</p>

                        {/* Tech Stack */}
                        <div className="flex gap-2 flex-wrap">
                            {featuredProject.technologies.map((tech) => (
                                <span key={tech} className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                                    <span className="text-sm text-slate-700">{tech}</span>
                                </span>
                            ))}
                        </div>

                        {/* Status Badge */}
                        <div className="inline-block">
                            <span className={`px-3 py-1 rounded-full text-sm ${featuredProject.status === 'completed' ? 'bg-green-100 text-green-800' :
                                featuredProject.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                {featuredProject.status}
                            </span>
                        </div>

                        {/* Links */}
                        <div className="flex gap-4">
                            {featuredProject.github && (
                                <Link
                                    href={featuredProject.github}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6F61] text-white rounded-lg hover:bg-[#FF6F61]/90 transition-colors shadow-sm hover:shadow-md"
                                >
                                    <span>View Source</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </Link>
                            )}
                            {featuredProject.demo && (
                                <Link
                                    href={featuredProject.demo}
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

                    {/* Related Content */}
                    <div className="space-y-6">
                        {/* Latest Logs */}
                        {relatedLogs.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Latest Progress</h3>
                                <div className="relative pl-4 border-l-2 border-[#FF6F61] space-y-4">
                                    {relatedLogs.map(log => (
                                        <Link
                                            href={`/log/${log._raw.sourceFileName.replace(".mdx", "")}`}
                                            key={log._id}
                                            className="block p-4 border rounded-lg hover:border-[#FF6F61]/50 transition-colors relative"
                                        >
                                            <div className="absolute left-[-2.25rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FF6F61] ring-4 ring-white shadow-md shadow-[#FF6F61]/20" />
                                            <p className="text-sm text-gray-500">Day {log.day}</p>
                                            <h4 className="font-medium text-slate-800">{log.title}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{log.progress}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
                                <div className="space-y-4">
                                    {relatedPosts.map(post => (
                                        <Link
                                            href={`/post/${post._raw.sourceFileName.replace(".mdx", "")}`}
                                            key={post._id}
                                            className="block p-4 border rounded-lg hover:border-[#FF6F61]/50 transition-colors"
                                        >
                                            <h4 className="font-medium text-slate-800">{post.title}</h4>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {format(new Date(post.date), 'MMM d, yyyy')}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* A sleek gradient hr element */}
            <hr className="border-t border-gray-200" />

            {/* All Projects Grid */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">All Projects</h2>
                    <div className="flex gap-4">
                        <select className="px-3 py-2 border rounded-md">
                            <option value="all">All Projects</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <select className="px-3 py-2 border rounded-md">
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allProjects.map((project) => (
                        <Link
                            href={`/project/${project._raw.sourceFileName.replace(".mdx", "")}`}
                            key={project._id}
                            className="group relative aspect-video overflow-hidden rounded-lg transform transition-all hover:scale-[1.02]"
                        >
                            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/30 transition-all duration-300" />
                            <Image
                                src={project.image || "/brandImages/3.jpg"}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent">
                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-slate-200 text-sm line-clamp-2">{project.summary}</p>

                                <div className="flex gap-2 mt-3">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <span key={tech} className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
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