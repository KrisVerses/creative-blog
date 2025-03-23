import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
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

            {/* a hamburger menu icon */}
            <div className="flex items-center gap-4">
                <button className="text-2xl">
                    {/* svg icon for hamburger menu */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}