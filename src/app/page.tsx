import Image from 'next/image';
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link';
import { format } from 'date-fns';
import { getSortedPosts } from '@/lib/utils';

function HomeIndex() {
  const posts = getSortedPosts(allPosts).slice(0, 3);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-8">
        {/* Featured Project - Full width on mobile, 2/3 on desktop */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-800">Featured Project</h1>
          <div className="relative aspect-video w-full mb-6">
            <Image
              src="/brandImages/3.jpg"
              alt="Large Image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <Link
            href={`/post/${posts?.[0]?._raw.sourceFileName.replace(".mdx", "")}`}
            className="block group cursor-pointer"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800 group-hover:text-[#FF6F61]/80 transition-colors">
              {posts?.[0]?.title}
            </h2>
          </Link>
          <p className="text-gray-500 mb-4">{posts?.[0]?.summary}</p>


          <div className="flex flex-wrap gap-4 items-center">
            <p className="text-gray-500 italic">{posts?.[0]?.date && format(posts[0].date, 'MMM d, yyyy')}</p>
            <Link href={`/project/${posts?.[0]?.relatedProjects?.[0]}`}>
              <button className="bg-[#FF6F61] hover:bg-[#FF6F61]/80 text-white px-4 py-2 rounded-md shadow-sm">View Project</button>
            </Link>
          </div>
        </div>

        {/* Latest Posts - Full width on mobile, 1/3 on desktop */}
        <div className="mt-8 lg:mt-0">
          <h3 className="text-xl font-semibold text-gray-500 mb-6">Latest Posts</h3>
          <div className="space-y-6">
            {posts?.map(post => (
              <Link
                href={`/post/${post._raw.sourceFileName.replace(".mdx", "")}`}
                key={post._id}
                className="group block"
              >
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-[#FF6F61]/80 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 italic mb-2">{format(post.date, 'MMM d, yyyy')}</p>
                  <p className="text-gray-500 line-clamp-2">{post.summary}</p>
                </div>
              </Link>
            ))}
            <Link
              href="/post"
              className="inline-flex items-center gap-2 text-sm text-gray-600 font-semibold hover:text-[#FF6F61]/80 transition-colors"
            >
              View All Posts →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeIndex;