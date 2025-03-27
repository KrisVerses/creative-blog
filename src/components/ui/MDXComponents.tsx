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
 * 
 * FIX for Code Block Rendering Issues:
 * - The code and pre components have been specially configured to work with rehype-prism-plus
 * - Text color is explicitly set to ensure code is visible, fixing the [object Object] issue
 * - Language detection is properly implemented from className properties
 * - Custom wrapper and styling ensure proper display in both light and dark modes
 */

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { MDXComponents as MDXComponentsType } from 'mdx/types';

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

const customComponents: MDXComponentsType = {
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
     * 
     * FIX IMPLEMENTATION:
     * The issue was that code blocks were displaying as "[object Object]" because:
     * 1. ContentLayer with rehype-prism-plus transforms code blocks into complex objects
     * 2. We needed to properly handle both inline code and block code differently
     * 3. Text colors needed to be explicitly set to ensure visibility
     */
    code: ({ className, children, ...props }) => {
        // For inline code: Special case handling for inline `code` 
        // Adding distinct styling to differentiate from code blocks
        // FIX: Check if it's NOT a language-tagged code block
        if (!className?.includes('language-')) {
            return (
                <code
                    className="relative rounded bg-slate-100 px-[0.3rem] py-[0.2rem] font-mono text-sm text-[#FF6F61]"
                    {...props}
                >
                    {children}
                </code>
            );
        }

        // For code blocks (inside pre tags)
        // FIX: Explicitly set text color to white for code blocks
        // This prevents the [object Object] issue by ensuring proper rendering
        return (
            <code className={cn(className, "text-white")} {...props}>
                {children}
            </code>
        );
    },

    pre: ({ className, children, ...props }) => {
        // Extract language from className if available
        // FIX: Properly detect language from the code element's class
        let language = 'text';
        const classStr = String(className || '');

        // FIX: Handle the code element properly by extracting language information
        // This ensures we can display the language badge and apply proper styling
        const codeElement = children as React.ReactElement;
        if (codeElement?.props?.className) {
            const match = /language-(\w+)/.exec(codeElement.props.className);
            if (match) language = match[1];
        }

        return (
            <div className="relative my-6 rounded-lg overflow-hidden">
                {/* Language badge - shows programming language in top corner */}
                {/* FIX: Only show language badge for actual programming languages */}
                {language !== 'text' && (
                    <div className="absolute right-3 top-0 z-[1] rounded-b-sm bg-slate-700 px-2 py-0.5 text-xs font-medium text-white">
                        {language}
                    </div>
                )}

                {/* 
                  * FIX: Apply proper styling to pre element
                  * - Add specific background color that works with Prism.js
                  * - Ensure text is white for visibility
                  * - Use border for better visual separation
                  * - Maintain original classNames for rehype-prism-plus to work
                  */}
                <pre
                    className={cn(
                        "mt-0 mb-0 overflow-x-auto rounded-lg bg-[#0f172a] text-white p-4",
                        "border border-slate-800",
                        classStr
                    )}
                    {...props}
                >
                    {children}
                </pre>
            </div>
        );
    },

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

export default customComponents;

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
