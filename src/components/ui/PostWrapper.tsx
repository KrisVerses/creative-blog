'use client';

import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import PostList from './PostList';
import { useSearchParams } from 'next/navigation';

export default function PostWrapper() {
    const [searchTerm, setSearchTerm] = useState('');
    const searchParams = useSearchParams();
    const search = searchParams.get('search');

    // If there's a search query param, update the searchTerm
    useEffect(() => {
        if (search) {
            setSearchTerm(search);
        }
    }, [search]);

    return (
        <>
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            <PostList searchTerm={searchTerm} />
        </>
    );
} 