import { cn } from "@/lib/utils";
import { LightbulbIcon } from "lucide-react";

const baseClass = "rounded-lg border px-4 py-3 my-4 text-sm flex items-start gap-3";


export const Tip = ({ children }: { children: React.ReactNode }) => (
    <div className={cn(baseClass, "border-green-300 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-100")}>
        <LightbulbIcon className="w-5 h-5 mt-0.5" />
        <div>{children}</div>
    </div>
);