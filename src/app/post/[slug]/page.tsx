import { allPosts } from "contentlayer/generated";  // Import all posts that ContentLayer has processed
import { useMDXComponent } from "next-contentlayer/hooks";  // Hook to convert MDX code into React components
import MDXComponents from "@/components/ui/MDXComponents";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
function PostPage({ params }: { params: { slug: string } }) {
  // Find the specific post that matches the URL slug
  const post = allPosts.find(
    (post) => post._raw.sourceFileName.replace(".mdx", "") === params.slug
  );

  // If no post found, show error message
  if (!post) {
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
          <h1 className="text-3xl font-bold text-slate-800">Post Not Found</h1>
          <p className="text-gray-600">We couldn't find the post you're looking for.</p>
          <Link
            href="/post"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6F61] text-white rounded-lg hover:bg-[#FF6F61]/90 transition-colors mt-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Posts</span>
          </Link>
        </div>
      </div>
    );
  }

  // Convert the MDX code (stored in post.body.code) into a React component
  const MDXContent = useMDXComponent(post.body.code);

  // Loading state while MDX is being processed
  if (!MDXContent) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:max-w-4xl lg:px-8">
        <div className="animate-pulse space-y-8">
          {/* Skeleton for post header */}
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
          {/* Skeleton for post content */}
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

      {/* a sleek back button */}
      <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Post header */}
      <header className="mb-8">
        <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 mb-4">
          {post.title}
        </h1>
        <div className="max-w-2xl flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span>{Math.ceil(post.readingTime)} min read</span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {post.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-sm border border-gray-200 text-gray-600 
              hover:border-[#FF6F61] hover:bg-[#FF6F61]/5 hover:text-[#FF6F61] 
              transition-all duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Post content */}
      <div className="max-w-7xl mx-auto mt-8 prose prose-lg prose-neutral">
        <MDXContent components={MDXComponents} />
      </div>

      {/* Back to Home link at the bottom */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF6F61] transition-colors group"
        >
          <svg className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>

      {/* a sleek minimal share and copy link button that follows this prompt: Share Buttons or Copy Link
At the bottom of each post: Add a small "Share this" section (Twitter, LinkedIn, copy link button). */}
      {/* <div className="mt-8 flex gap-2">
        <button className="px-4 py-2 bg-gray-100 rounded-full text-sm">
          Share
        </button>
        <button className="px-4 py-2 bg-gray-100 rounded-full text-sm">
          Copy Link
        </button>
      </div> */}
    </article>

  );
}

export default PostPage;

/**
 * Styling Architecture:
 * 
 * 1. prose classes (prose prose-lg):
 *    - Provides consistent typography for standard markdown elements
 *    - Handles spacing, font sizes, and content rhythm
 *    - Applied to: headings, paragraphs, lists, blockquotes, etc.
 * 
 * 2. MDXComponents:
 *    - Enables custom React components in MDX files
 *    - Used for interactive features and component-based content
 *    - Example: <CustomAlert>, <CodePlayground>, interactive buttons
 * 
 * Both work together: prose for typography, MDXComponents for React components
 */
