import { allPosts } from "contentlayer/generated";  // Import all posts that ContentLayer has processed
import { useMDXComponent } from "next-contentlayer/hooks";  // Hook to convert MDX code into React components
import MDXComponents from "@/components/ui/MDXComponents";
import { format } from "date-fns";

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
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      {/* Post header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          {post.title}
        </h1>
        <time className="text-sm text-gray-500">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </time>
      </header>

      {/* Post content */}
      <div className="mt-8 prose prose-lg">
        <MDXContent components={MDXComponents} />
      </div>
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
