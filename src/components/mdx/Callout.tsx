import { cn } from "@/lib/utils";

interface CalloutProps {
    className?: string;
    children: React.ReactNode;
    [key: string]: any;
}

export function Callout({ className, children, ...props }: CalloutProps) {
    return (
        <div
            className={cn(
                "my-6 flex items-start rounded-lg border border-slate-200 bg-slate-50 p-4",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
} 