'use client';

import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="border-t mt-16 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-5xl lg:px-8">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} KRIS.
                    </p>
                    <div className="flex space-x-6">
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
            </div>
        </footer>
    );
}