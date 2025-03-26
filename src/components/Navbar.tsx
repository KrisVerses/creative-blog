'use client';

import Link from 'next/link';
import { useColors } from '@/context/ColorContext';

export default function Navbar() {
    const { currentCategory, categoryStyles } = useColors();
    const styles = currentCategory ? categoryStyles[currentCategory] : null;

    return (
        <nav className={`sticky top-0 z-50 w-full transition-colors duration-300 ${styles ? `${styles.bg} ${styles.pattern}` : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className={`text-2xl font-bold ${styles ? 'text-white' : 'text-gray-900'}`}
                        >
                            KRIS
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/projects"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${styles
                                ? 'text-white/90 hover:text-white hover:bg-white/10'
                                : 'text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/posts"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${styles
                                ? 'text-white/90 hover:text-white hover:bg-white/10'
                                : 'text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            Posts
                        </Link>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Articles..."
                                className={`px-4 py-2 rounded-md text-sm ${styles
                                    ? 'bg-white/10 border border-white/20 text-white placeholder:text-white/50'
                                    : 'bg-gray-100 text-gray-900 placeholder:text-gray-500'
                                    } focus:outline-none focus:ring-2 ${styles
                                        ? 'focus:ring-white/30'
                                        : 'focus:ring-blue-500'
                                    }`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
} 