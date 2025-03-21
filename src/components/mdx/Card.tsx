import { cn } from "@/lib/utils";

interface CardProps {
    className?: string;
    children: React.ReactNode;
    [key: string]: any;
}

export function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-lg border border-slate-200 bg-white p-6 shadow-sm",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
} 