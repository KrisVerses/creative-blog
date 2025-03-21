import { cn } from "@/lib/utils";
import { Code2, ExternalLink, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

// Define types for MDX components
type MDXComponents = {
    [key: string]: React.ComponentType<any>;
};

const MDXComponents: MDXComponents = {
    // Headings with custom styling and anchor links
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

    // Paragraphs and text elements
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

    // Links with external link icon
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

    // Code blocks with syntax highlighting
    code: ({ className, ...props }) => (
        <code
            className={cn(
                "relative rounded bg-slate-100 px-[0.3rem] py-[0.2rem] font-mono text-sm",
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

    // Custom components for MDX
    Callout: ({ className, ...props }) => (
        <div
            className={cn(
                "my-6 flex items-start rounded-lg border border-slate-200 bg-slate-50 p-4",
                className
            )}
            {...props}
        />
    ),
    Card: ({ className, ...props }) => (
        <div
            className={cn(
                "rounded-lg border border-slate-200 bg-white p-6 shadow-sm",
                className
            )}
            {...props}
        />
    ),
    Steps: ({ className, ...props }) => (
        <div
            className={cn(
                "my-6 ml-6 [&>li]:mt-2 [&>li]:marker:text-slate-400",
                className
            )}
            {...props}
        />
    ),
};

export default MDXComponents;
