'use client';

import { FaTimes } from "react-icons/fa";

interface SearchBarProps {
    searchTerm: string;
    onSearch: (term: string) => void;
}

export default function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
    return (
        <div className="w-full max-w-md relative">
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Only show clear button when there's text */}
            {searchTerm && (
                <button
                    onClick={() => onSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
} 