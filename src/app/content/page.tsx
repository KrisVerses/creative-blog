import { allPosts } from "contentlayer/generated";
import Link from "next/link";

function PostIndex() {
    const posts = allPosts.sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                All Posts
            </h1>
            <ul className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {posts.map((post) => (
                    <li key={post._id}>
                        <Link href={post.url}>{post.body.raw}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default PostIndex;