import { cn } from "@/lib/utils";

const Tag = ({ tag }: { tag: string }) => {
    return (
        <div className={cn(
            // Base styles: shape, color, and spacing
            "rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800",

            // Interactive states: hover and focus styles for accessibility
            "hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        )}>
            {tag}
        </div>
    )
}

export default Tag; 