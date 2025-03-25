import { Post } from "contentlayer/generated";
import Link from "next/link";
import { format } from "date-fns";
import TagList from "./TagList";

interface PostCardProps {
    post: Post;
}

function truncateAtWord(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;

    // Find last space before maxLength to avoid cutting words in middle
    const lastSpace = text.lastIndexOf(' ', maxLength);

    // Cut string at the last complete word
    const truncated = text.substring(0, lastSpace);

    /**
     * Clean up any trailing punctuation before adding ellipsis
     * 
     * /[,;.]$/  => Regular Expression Pattern:
     * [ ]       => Character class: match any ONE character from the options inside
     * ,;.       => The actual characters to match: comma, semicolon, or period
     * $         => Position marker: only match at the END of the string
     * 
     * Examples:
     * "Hello, world,"  => "Hello, world"   (matches and removes trailing comma)
     * "Hello; world;"  => "Hello; world"   (matches and removes trailing semicolon)
     * "Hello. world."  => "Hello. world"   (matches and removes trailing period)
     * "Hello, world"   => "Hello, world"   (no match, no change - no trailing punctuation)
     * "Hello,"         => "Hello"          (removes trailing comma)
     */
    const cleaned = truncated.replace(/[,;.]$/, '');

    // Add ellipsis to show there's more text
    return `${cleaned}...`;
}

/**
 * PostCard Component
 * 
 * Tailwind Group Pattern Explanation:
 * 1. The 'group' class marks an element as a group parent
 * 2. 'group-hover:' classes on children will activate when parent is hovered
 * 3. This pattern enables:
 *    - Coordinated hover states across multiple elements
 *    - Parent-child hover interactions
 *    - Complex hover animations that affect multiple elements
 */
const PostCard = ({ post }: PostCardProps) => {
    return (
        <>
            <li className="group relative flex flex-col space-y-3">
                {/* Date */}
                <p className="text-sm text-gray-500">
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                </p>

                {/* Title - Made clickable with hover effect */}
                <Link
                    href={post.url}
                    className="group-hover:text-blue-600 transition-colors"
                >
                    <h2 className="text-xl font-semibold tracking-tight">
                        {post.title}
                    </h2>
                </Link>

                {/* Summary with ellipsis if too long */}
                {post.summary && (
                    <p className="text-gray-600 line-clamp-2">
                        {truncateAtWord(post.summary, 100)}
                    </p>
                )}

                {/* Read more link - provides additional click target */}
                <Link
                    href={post.url}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors mt-2"
                >
                    Read more →
                </Link>
                <TagList selectedTag={null} onTagSelect={() => { }} />
            </li>
        </>
    );
};

export default PostCard;