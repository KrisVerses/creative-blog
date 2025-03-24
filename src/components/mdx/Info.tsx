import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";

const baseClass = "rounded-lg border px-4 py-3 my-4 text-sm flex items-start gap-3";

export const Info = ({ children }: { children: React.ReactNode }) => (
    <div className={cn(
        baseClass,
        "border-blue-300 bg-blue-50 text-blue-800"
    )}>
        <InfoIcon className="w-5 h-5 mt-0.5" />
        <div>{children}</div>
    </div>
);

