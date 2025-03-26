import { Post } from "contentlayer/generated";
import Link from "next/link";
import { format } from "date-fns";
import TagList from "./TagList";
import { useColors } from '@/context/ColorContext';
import { CategorySlug } from '@/types';

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
    const { categoryStyles } = useColors();
    const styles = categoryStyles[post.category as CategorySlug];

    return (
        <>
            <li className="relative flex flex-col space-y-3">
                {/* Date */}
                <p className="text-sm text-gray-500">
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                </p>

                {/* Title - Made clickable with hover effect */}
                <Link href={post.url} className="block">
                    <h2 className="relative inline-block mb-3 group">
                        <span className={`
                            relative z-10 text-xl font-semibold 
                            text-slate-800
                            transition-colors duration-300
                            ${styles.hover}
                        `}>
                            {post.title}
                        </span>
                        {/* Category-colored background that appears on hover */}
                        <span
                            className={`
                                absolute inset-0 
                                ${styles.accent}
                                opacity-0
                                group-hover:opacity-15
                                transition-all duration-300
                                rounded
                            `}
                            style={{
                                transform: 'skew(-12deg)',
                                top: '0%',
                                height: '100%',
                                left: '-4px',
                                right: '-4px'
                            }}
                        />
                    </h2>
                </Link>

                {/* Summary with ellipsis if too long */}
                {post.summary && (
                    <p className="text-gray-600 line-clamp-2">
                        {truncateAtWord(post.summary, 100)}
                    </p>
                )}

                {/* Read more link with app accent color */}
                <Link
                    href={post.url}
                    className="mt-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-[#FF6F61] transition-colors"
                >
                    Read more
                    <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
                <TagList selectedTag={null} onTagSelect={() => { }} />
            </li>
        </>
    );
};

export default PostCard;