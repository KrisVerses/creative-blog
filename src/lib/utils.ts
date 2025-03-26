/**
 * Utility functions for handling class names in the application
 * This file provides a helper function to merge Tailwind CSS classes
 * while handling conflicts and conditional classes properly
 */

// clsx is a utility for constructing className strings conditionally
// It helps join multiple class names together and handles conditional classes
import { type ClassValue, clsx } from "clsx";

// tailwind-merge intelligently merges Tailwind CSS classes without style conflicts
// It handles cases where classes might override each other
import { twMerge } from "tailwind-merge";

import { Post } from "contentlayer/generated";

/**
 * Combines multiple class names into a single string
 * Handles conditional classes and resolves Tailwind CSS conflicts
 * 
 * @param inputs - Array of class names, objects, or arrays to merge
 * @returns A single string of merged class names
 * 
 * Example usage:
 * cn("text-red-500", isActive && "text-blue-500", "font-bold")
 * 
 * This function is used throughout the application to:
 * 1. Merge multiple class names
 * 2. Handle conditional classes
 * 3. Resolve Tailwind CSS conflicts
 * 4. Maintain proper class specificity
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getSortedPosts(posts: Post[]) {
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
} 