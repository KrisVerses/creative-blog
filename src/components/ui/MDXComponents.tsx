/**
 * MDXComponents.tsx
 * 
 * This file serves two main purposes:
 * 1. Maps basic HTML elements (h1, p, etc.) to styled components
 * 2. Registers custom MDX components for use in .mdx files
 * 
 * Organization Pattern:
 * - Basic HTML elements are defined here for consistent styling
 * - Complex, reusable MDX components are imported from /mdx directory
 * - This separation keeps the code modular and maintainable
 */

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

// Import custom MDX components from /mdx directory
// These are separated for better maintainability and reusability
import { Callout } from "../mdx/Callout";
import { Card } from "../mdx/Card";
import { Steps } from "../mdx/Steps";
import { Info } from "../mdx/Info";
import { Warning } from "../mdx/Warning";
import { Tip } from "../mdx/Tip";

type MDXComponents = {
    [key: string]: React.ComponentType<any>;
};

const MDXComponents: MDXComponents = {
    /**
     * HTML Element Mappings
     * 
     * These stay in MDXComponents.tsx because:
     * 1. They're simple style mappings
     * 2. They're used across all MDX content
     * 3. They don't need complex logic or props
     */

    // Heading hierarchy with consistent styling
    h1: ({ className, ...props }) => (
        <h1
            className={cn(
                "mt-8 scroll-m-20 text-4xl font-bold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }) => (
        <h2
            className={cn(
                "mt-8 scroll-m-20 text-3xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }) => (
        <h3
            className={cn(
                "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h4: ({ className, ...props }) => (
        <h4
            className={cn(
                "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),

    /**
     * Text Elements
     * 
     * Basic text elements that need consistent styling
     * These are kept here because they're fundamental building blocks
     */
    p: ({ className, ...props }) => (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
        />
    ),
    blockquote: ({ className, ...props }) => (
        <blockquote
            className={cn(
                "mt-6 border-l-2 border-slate-300 pl-6 italic [&>*]:text-slate-600",
                className
            )}
            {...props}
        />
    ),
    ul: ({ className, ...props }) => (
        <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
        <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }) => (
        <li className={cn("mt-2", className)} {...props} />
    ),

    /**
     * Interactive Elements
     * 
     * Elements that need special handling (like external links)
     * Stay here because they're part of the basic content structure
     */
    a: ({ className, href, ...props }) => {
        const isExternal = href?.startsWith("http");
        return (
            <Link
                href={href || ""}
                className={cn(
                    "font-medium underline underline-offset-4 hover:text-blue-500",
                    className
                )}
                {...props}
            >
                {props.children}
                {isExternal && (
                    <ExternalLink className="ml-1 inline-block h-4 w-4" />
                )}
            </Link>
        );
    },

    /**
     * Code Elements
     * 
     * Special handling for code blocks and inline code
     */
    code: ({ className, ...props }) => (
        <code
            className={cn(
                "relative rounded bg-slate-100 px-[0.3rem] py-[0.2rem] font-mono text-sm text-slate-800",
                className
            )}
            {...props}
        />
    ),
    pre: ({ className, ...props }) => (
        <pre
            className={cn(
                "mt-6 mb-4 overflow-x-auto rounded-lg bg-slate-900 py-4",
                className
            )}
            {...props}
        />
    ),

    /**
     * Custom MDX Components
     * 
     * These are imported from separate files because:
     * 1. They have more complex logic/props
     * 2. They might be used outside of MDX
     * 3. They benefit from separate testing/maintenance
     */
    Callout,  // Complex UI component with its own props/logic
    Card,     // Reusable card component that might need future enhancements
    Steps,    // Specialized component for step-by-step content
    Info,
    Warning,
    Tip,
};

export default MDXComponents;

/**
 * Example usage of Callout component in MDX files:
 * 
 * ```mdx
 * # My Blog Post
 * 
 * Regular markdown content here...
 * 
 * <Callout type="info">
 *   This is an info callout with a title
 *   <h3>Important Note</h3>
 *   <p>This callout contains both markdown and custom styling</p>
 * </Callout>
 * 
 * <Callout type="warning">
 *   This is a warning callout
 *   <p>You can use any markdown inside callouts</p>
 *   - List items
 *   - **Bold text**
 *   - `code snippets`
 * </Callout>
 * ```
 * 
 * Available Callout types:
 * - info: Blue background for general information
 * - warning: Yellow background for warnings
 * - error: Red background for errors
 * - success: Green background for success messages
 * - tip: Purple background for tips and tricks
 */
