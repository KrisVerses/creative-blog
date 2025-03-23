'use client';

import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
        <nav className="flex justify-between items-center p-4">
            <Link href="/" className="text-2xl font-bold">
                <img src="/4.jpg" alt="logo" className="w-16 h-16" />
            </Link>

            {/* a navbar section with social media links */}
            <div className="flex items-center gap-4">
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

            <div className="relative">
                <button className="text-2xl" onClick={toggleMenu}>
                    {isOpen ? openIcon : closedIcon}
                </button>
                {isOpen && (
                    <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg p-4 space-y-4 min-w-[8rem]">
                        <Link href="/" className="text-gray-400 hover:text-gray-500 transition-colors hover:font-semibold duration-300 block">Home</Link>
                        <Link href="/posts" className="text-gray-400 hover:text-gray-500 transition-colors hover:font-semibold duration-300 block">Posts</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
