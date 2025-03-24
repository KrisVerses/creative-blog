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
    return <div>Post not found</div>;
  }

  // Convert the MDX code (stored in post.body.code) into a React component
  // This is where the magic happens - MDX content becomes interactive React components
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:max-w-5xl lg:px-8">

      {/* a sleek back button */}
      <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Post header */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex justify-between gap-2">
          <time className="text-sm text-gray-500">
            {format(new Date(post.date), 'MMMM d, yyyy')}
          </time>
          {/* {post.readingTime} minutes read */}
          <span className="text-sm text-gray-500">
            {Math.ceil(post.readingTime)} minutes read
          </span>
        </div>
        <div className="mt-2 flex gap-2">
          {post.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Post content */}
      <div className="mt-8 prose prose-lg prose-neutral">
        <MDXContent components={MDXComponents} />
      </div>
      {/* a sleek minimal share and copy link button that follows this prompt: Share Buttons or Copy Link
At the bottom of each post: Add a small “Share this” section (Twitter, LinkedIn, copy link button). */}
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
