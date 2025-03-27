'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (searchTerm.trim()) {
            setIsSearching(true);
            try {
                await router.push(`/posts?search=${encodeURIComponent(searchTerm)}`);
                setSearchTerm('');
                setIsOpen(false);
            } catch (err) {
                setError('Failed to perform search. Please try again.');
                console.error('Search error:', err);
            } finally {
                setIsSearching(false);
            }
        }
    };

    const closedIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    );

    const openIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    );

    return (
        <nav className="flex justify-around items-center p-4">
            <div className="flex items-center gap-4">
                <Link href="/" className="text-2xl font-bold">
                    <img src="/brandImages/4.jpg" alt="logo" className="w-16 h-16" />
                </Link>

                {/* a navbar section with social media links */}
                <div className="flex items-center gap-4 border-l-2 border-gray-200 pl-4">
                    <Link
                        href="https://github.com/yourusername"
                        target="_blank"
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                        <FaGithub size={20} />
                    </Link>
                    <Link
                        href="https://twitter.com/yourusername"
                        target="_blank"
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                        <FaTwitter size={20} />
                    </Link>
                    <Link
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                        <FaLinkedin size={20} />
                    </Link>
                </div>
            </div>

            {/* a navbar section with a search bar */}
            <div className="flex items-center gap-4 hidden md:flex">
                <div className="flex items-center gap-6">
                    <ul className="flex items-center gap-4">
                        <li>
                            <Link
                                href="/"
                                className="transform-gpu relative text-gray-400 hover:text-[#FF6F61] inline-block transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#FF6F61] after:transition-all after:duration-300"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/projects"
                                className="transform-gpu relative text-gray-400 hover:text-[#FF6F61] inline-block transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#FF6F61] after:transition-all after:duration-300"
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/posts"
                                className="transform-gpu relative text-gray-400 hover:text-[#FF6F61] inline-block transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#FF6F61] after:transition-all after:duration-300"
                            >
                                Posts
                            </Link>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit} className="flex gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Articles..."
                            className="border border-gray-300 rounded-md p-2 shadow-sm text-gray-800"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSearching}
                        className="bg-[#FF6F61] hover:bg-[#FF6F61]/80 text-white px-4 py-2 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSearching ? (
                            <>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Searching...
                            </>
                        ) : (
                            'Search'
                        )}
                    </button>
                </form>
            </div>

            {/* Hamburger menu */}
            <div className="block md:hidden relative z-10">
                <button
                    className="text-2xl text-slate-800 hover:text-[#FF6F61] transition-colors"
                    onClick={toggleMenu}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    {isOpen ? openIcon : closedIcon}
                </button>
                {isOpen && (
                    <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm">
                        <div className="absolute right-4 top-4 left-4 bg-white rounded-lg shadow-xl p-6 space-y-6 animate-in slide-in-from-top-4 duration-200">
                            {/* Close button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={toggleMenu}
                                    className="text-slate-400 hover:text-[#FF6F61] transition-colors"
                                    aria-label="Close menu"
                                >
                                    <FaTimes size={24} />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="space-y-4">
                                <Link
                                    href="/"
                                    className="block text-lg font-medium text-slate-800 hover:text-[#FF6F61] transition-colors"
                                    onClick={toggleMenu}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/posts"
                                    className="block text-lg font-medium text-slate-800 hover:text-[#FF6F61] transition-colors"
                                    onClick={toggleMenu}
                                >
                                    Posts
                                </Link>
                                <Link
                                    href="/projects"
                                    className="block text-lg font-medium text-slate-800 hover:text-[#FF6F61] transition-colors"
                                    onClick={toggleMenu}
                                >
                                    Projects
                                </Link>
                            </nav>

                            {/* Search Form */}
                            <div className="pt-4 border-t">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search Articles..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setError(null);
                                            }}
                                            className={`w-full px-4 py-3 bg-slate-50 rounded-lg border ${error ? 'border-red-500' : 'border-slate-200'
                                                } text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6F61]/20 focus:border-[#FF6F61]`}
                                        />
                                        {searchTerm && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSearchTerm('');
                                                    setError(null);
                                                }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                    {error && (
                                        <p className="text-sm text-red-500">{error}</p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isSearching}
                                        className="w-full bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSearching ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Searching...
                                            </>
                                        ) : (
                                            'Search'
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Social Links */}
                            <div className="pt-4 border-t">
                                <div className="flex justify-center gap-6">
                                    <Link
                                        href="https://github.com/yourusername"
                                        target="_blank"
                                        className="text-slate-400 hover:text-[#FF6F61] transition-colors"
                                    >
                                        <FaGithub size={24} />
                                    </Link>
                                    <Link
                                        href="https://twitter.com/yourusername"
                                        target="_blank"
                                        className="text-slate-400 hover:text-[#FF6F61] transition-colors"
                                    >
                                        <FaTwitter size={24} />
                                    </Link>
                                    <Link
                                        href="https://linkedin.com/in/yourusername"
                                        target="_blank"
                                        className="text-slate-400 hover:text-[#FF6F61] transition-colors"
                                    >
                                        <FaLinkedin size={24} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
