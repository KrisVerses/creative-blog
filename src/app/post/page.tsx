import SearchWrapper from "@/components/ui/SearchWrapper";

function PostIndex() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-5xl lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          All Posts
        </h1>
        <ul className="mt-8 grid grid-cols-1 gap-8">
          <SearchWrapper />
        </ul>
      </div>
    </div>
  );
}

export default PostIndex;
