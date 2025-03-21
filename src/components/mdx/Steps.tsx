import { cn } from "@/lib/utils";

interface StepsProps {
    className?: string;
    children: React.ReactNode;
    [key: string]: any;
}

export function Steps({ className, children, ...props }: StepsProps) {
    return (
        <div
            className={cn(
                "my-6 ml-6 [&>li]:mt-2 [&>li]:marker:text-slate-400",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
} 