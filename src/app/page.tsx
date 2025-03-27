import Image from 'next/image';
import { allPosts, allProjects, allLogs, Post, Log } from 'contentlayer/generated'
import Link from 'next/link';
import { format } from 'date-fns';
import { getSortedPosts, getSortedProjects, getSortedLogs } from '@/lib/utils';

function HomeIndex() {
  // Get the most recent project as featured
  const featuredProject = getSortedProjects(allProjects)[0];

  // Get the 3 most recent posts
  const latestPosts = getSortedPosts(allPosts).slice(0, 3);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-8">
        {/* Featured Project - Full width on mobile, 2/3 on desktop */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-800">Featured Project</h1>
          <div className="relative aspect-video w-full mb-6">
            <Image
              src={featuredProject?.image || "/brandImages/3.jpg"}
              alt={featuredProject?.title || "Featured Project"}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <Link
            href={`/projects/${featuredProject?._raw.sourceFileName.replace(".mdx", "")}`}
            className="block group cursor-pointer"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800 group-hover:text-[#FF6F61] transition-colors">
              {featuredProject?.title}
            </h2>
          </Link>
          <p className="text-gray-600 mb-4">{featuredProject?.summary}</p>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{featuredProject?.date && format(new Date(featuredProject.date), 'MMMM d, yyyy')}</span>
            </div>
            <Link href={`/projects/${featuredProject?._raw.sourceFileName.replace(".mdx", "")}`}>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6F61] text-white rounded-lg hover:bg-[#FF6F61]/90 transition-colors shadow-sm hover:shadow-md">
                <span>View Project</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Latest Posts - Full width on mobile, 1/3 on desktop */}
        <div className="mt-8 lg:mt-0">
          <h3 className="text-xl font-semibold text-gray-500 mb-6">Latest Posts</h3>
          <div className="space-y-6">
            {latestPosts.map(post => (
              <Link
                href={`/posts/${post._raw.sourceFileName.replace(".mdx", "")}`}
                key={post._id}
                className="group block"
              >
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-[#FF6F61] transition-colors mb-2">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">{post.summary}</p>
                </div>
              </Link>
            ))}
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 text-sm text-gray-600 font-semibold hover:text-[#FF6F61] transition-colors group"
            >
              View All Posts
              <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeIndex;