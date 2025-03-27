import PostWrapper from "@/components/ui/PostWrapper";

function PostIndex() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-4xl lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          All Posts
        </h1>
        <ul className="mt-8 grid grid-cols-1 gap-8">
          <PostWrapper />
        </ul>
      </div>
    </div>
  );
}

export default PostIndex;
