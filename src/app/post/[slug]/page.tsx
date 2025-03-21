import { allPosts } from "contentlayer/generated";  // Import all posts that ContentLayer has processed
import { useMDXComponent } from "next-contentlayer/hooks";  // Hook to convert MDX code into React components

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
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {post.title}
      </h1>
      {/* Render the MDX content with Tailwind's typography styles */}
      <div className="mt-8 prose prose-lg">
        <MDXContent />
      </div>
    </div>
  );
}

export default PostPage;
