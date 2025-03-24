import { cn } from "@/lib/utils";
import { AlertTriangleIcon } from "lucide-react";

const baseClass = "rounded-lg border px-4 py-3 my-4 text-sm flex items-start gap-3";


export const Warning = ({ children }: { children: React.ReactNode }) => (
    <div className={cn(baseClass, "border-yellow-300 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-100")}>
        <AlertTriangleIcon className="w-5 h-5 mt-0.5" />
        <div>{children}</div>
    </div>
);
