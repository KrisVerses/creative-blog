import Image from 'next/image';
import { allPosts, Post } from 'contentlayer/generated'
import Link from 'next/link';
import { format } from 'date-fns';

function HomeIndex() {
    const posts = allPosts.slice(0, 3);
    return (
        <div>
            <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto mt-8">
                <div className="col-span-2 mx-auto">
                    <h1 className="text-4xl font-bold my-4 text-slate-800">Featured Project</h1>
                    <Image src="/brandImages/3.jpg" alt="Large Image" height={600} width={600} />
                    <h2 className="text-2xl font-bold my-4 text-slate-800">{posts[0].title}</h2>
                    <p className="text-gray-500">{posts[0].summary}</p>
                    <p className="text-gray-500 italic mt-2">{format(posts[0].date, 'MMM d, yyyy')}</p>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-col gap-4">
                        <p className="text-gray-500">Latest Posts</p>
                        {posts.map(post => {
                            return (
                                <Link href={`/post/${post._raw.sourceFileName.replace(".mdx", "")}`} key={post._id} className="group">
                                    <div className="flex gap-2 border-b border-gray-200 pb-4">
                                        <div className="flex flex-col gap-2">
                                            <div>
                                                <h2 className="text-2xl font-bold text-slate-800 group-hover:text-[#FF6F61]/80 transition-colors">{post.title}</h2>
                                                <p className="text-gray-500 italic mt-2">{format(post.date, 'MMM d, yyyy')}</p>
                                            </div>
                                            <p className="text-gray-500">{post.summary}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                        <div className="flex flex-col gap-4">
                            <Link
                                href="/post"
                                className="inline-flex items-center gap-2 my-4 text-sm text-gray-600 font-semibold hover:text-[#FF6F61]/80 transition-colors"
                            >
                                View All Posts →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeIndex;