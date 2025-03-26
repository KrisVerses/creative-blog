/**
 * Represents the available category slugs for blog posts.
 * Each slug corresponds to a specific content category.
 */
export type CategorySlug = 'coding' | 'design' | 'health' | 'life' | 'productivity' | 'self-help' | 'travel' | 'writing';

/**
 * Defines the styling properties for a category.
 * Used to maintain consistent visual theming across different content categories.
 */
export type CategoryStyle = {
    /** Background color for the category section */
    background: string;
    /** Accent color used for highlights and emphasis */
    accent: string;
    /** Text color for the category content */
    text: string;
    /** Color used for hover states */
    hover: string;
    /** Pattern or texture URL for background decoration */
    pattern: string;
    /** Base color for card elements */
    card: string;
    /** Optional background color for card elements */
    cardBg?: string;
    /** Optional hover color for card elements */
    cardHover?: string;
    /** Optional text color for card elements */
    cardText?: string;
    /** Optional accent color for card elements */
    cardAccent?: string;
    /** Optional Tailwind CSS background class */
    bgClass?: string;
}; 