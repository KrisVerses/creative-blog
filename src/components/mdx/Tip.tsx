import { cn } from "@/lib/utils";
import { LightbulbIcon } from "lucide-react";

interface TipProps {
    className?: string;
    children: React.ReactNode;
}

const baseClass = "rounded-lg border px-4 py-3 my-4 text-sm flex items-start gap-3";

export const Tip = ({ className, children }: TipProps) => (
    <div className={cn(baseClass, "border-green-300 bg-green-50 text-green-800", className)}>
        <LightbulbIcon className="w-5 h-5 mt-0.5" />
        <div>{children}</div>
    </div>
);