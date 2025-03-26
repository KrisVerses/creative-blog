'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(searchTerm);
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/post?search=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
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
                                href="/project"
                                className="transform-gpu relative text-gray-400 hover:text-[#FF6F61] inline-block transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#FF6F61] after:transition-all after:duration-300"
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/post"
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
                            className="border border-gray-300 rounded-md p-2 shadow-sm"
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
                        className="bg-[#FF6F61] hover:bg-[#FF6F61]/80 text-white px-4 py-2 rounded-md shadow-sm"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Hamburger menu */}
            <div className="bloock md:hidden relative z-10">
                <button className="text-2xl" onClick={toggleMenu}>
                    {isOpen ? openIcon : closedIcon}
                </button>
                {isOpen && (
                    <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg p-4 space-y-4 min-w-[8rem]">
                        <Link href="/" className="text-gray-400 hover:text-gray-500 transition-colors hover:font-semibold duration-300 block">Home</Link>
                        <Link href="/post" className="text-gray-400 hover:text-gray-500 transition-colors hover:font-semibold duration-300 block">Posts</Link>
                        <Link href="/project" className="text-gray-400 hover:text-gray-500 transition-colors hover:font-semibold duration-300 block">Projects</Link>
                        <form onSubmit={handleSubmit}>
                            <input type="text" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder="Search" className="border border-gray-300 rounded-md p-2" />
                        </form>
                    </div>
                )}
            </div>
        </nav>
    );
}
