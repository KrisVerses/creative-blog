import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Post, Project, Log } from "contentlayer/generated";
import React from 'react';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getSortedPosts(posts: Post[]) {
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getSortedProjects(projects: Project[]) {
    return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getSortedLogs(logs: Log[]) {
    return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function highlightText(text: string, searchTerm: string, accentClass?: string): React.ReactNode {
    if (!searchTerm.trim()) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, i) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark
                key={i}
                className={`px-1 rounded ${accentClass || 'bg-[#FF6F61]/10 text-[#FF6F61]'}`}
            >
                {part}
            </mark>
        ) : part
    );
} 