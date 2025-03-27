import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// Interface for breadcrumb items
interface Breadcrumb {
    label: string;
    href: string;
    isLast: boolean;
}

// Props interface for the Breadcrumbs component
interface BreadcrumbsProps {
    homeElement?: JSX.Element;
    separator?: JSX.Element;
    containerClasses?: string;
    listClasses?: string;
    activeClasses?: string;
    capitalizeLinks?: boolean;
}

// Function to generate label from path segment
const generateLabel = (segment: string, capitalize: boolean): string => {
    // Remove any slug parameters or special characters
    const cleanSegment = segment.replace(/[\[\]]/g, '').replace(/-/g, ' ');
    return capitalize
        ? cleanSegment.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : cleanSegment;
};

export default function Breadcrumbs({
    homeElement = <HomeIcon />,
    separator = <Separator />,
    containerClasses = "flex items-center py-4 text-sm",
    listClasses = "flex items-center gap-2",
    activeClasses = "text-[#FF6F61] font-medium",
    capitalizeLinks = true,
}: BreadcrumbsProps) {
    // Get the current pathname
    const pathname = usePathname();

    // Generate breadcrumb items based on the current path
    const breadcrumbs = useMemo(() => {
        // Split pathname into segments and remove empty ones
        const segments = pathname?.split('/').filter(Boolean) || [];

        // Generate array of breadcrumb items
        return segments.map((segment, index) => {
            // Build the href by joining all segments up to current one
            const href = `/${segments.slice(0, index + 1).join('/')}`;
            // Check if this is the last segment
            const isLast = index === segments.length - 1;

            return {
                label: generateLabel(segment, capitalizeLinks),
                href,
                isLast,
            };
        });
    }, [pathname, capitalizeLinks]);

    // If we're on the homepage, don't render breadcrumbs
    if (!breadcrumbs.length) {
        return null;
    }

    return (
        <nav aria-label="Breadcrumb" className={containerClasses}>
            <ol className={listClasses}>
                {/* Home link */}
                <li>
                    <Link
                        href="/"
                        className="text-gray-600 hover:text-[#FF6F61] transition-colors flex items-center gap-1"
                    >
                        {homeElement}
                    </Link>
                </li>

                {/* Render breadcrumb items */}
                {breadcrumbs.map(({ label, href, isLast }, index) => (
                    <li key={href} className="flex items-center gap-2">
                        {separator}
                        {isLast ? (
                            <span className={activeClasses}>{label}</span>
                        ) : (
                            <Link
                                href={href}
                                className="text-gray-600 hover:text-[#FF6F61] transition-colors"
                            >
                                {label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

// Home icon component
function HomeIcon() {
    return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
        </svg>
    );
}

// Separator component
function Separator() {
    return (
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );
} 