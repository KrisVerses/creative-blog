import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find(
    (post) => post._raw.sourceFileName.replace(".mdx", "") === params.slug
  );

  console.log(params);

  if (!post) {
    return <div>Post not found</div>;
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {post.title}
      </h1>
      <div className="mt-8 prose prose-lg">
        <MDXContent />
      </div>
    </div>
  );
}

export default PostPage;
