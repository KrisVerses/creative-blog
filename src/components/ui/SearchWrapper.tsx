'use client';

import { useState } from 'react';
import SearchBar from './SearchBar';
import PostList from './PostList';

export default function SearchWrapper() {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <>
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            <PostList searchTerm={searchTerm} />
        </>
    );
} 