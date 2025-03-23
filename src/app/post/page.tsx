import SearchWrapper from "@/components/SearchWrapper";

function PostIndex() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        All Posts
      </h1>
      <ul className="mt-8 grid grid-cols-2 gap-8">
        <SearchWrapper />
      </ul>
    </div>
  );
}

export default PostIndex;
