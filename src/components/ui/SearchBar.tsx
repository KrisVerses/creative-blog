'use client';

interface SearchBarProps {
    searchTerm: string;
    onSearch: (term: string) => void;
}

export default function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
    return (
        <div className="w-full max-w-md">
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
} 