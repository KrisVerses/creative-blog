"use client"; // Marks this component and its children as client-side components
// This directive tells Next.js that this code should be rendered in the browser, not on the server

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new QueryClient instance that will manage caching, retries, and updates
const queryClient = new QueryClient();

// Analogy: Think of the QueryClient as a smart librarian in a library.
// 1. Caching: The librarian remembers the books you've recently read (cached data) so that if you need them again, they can quickly hand them to you without having to search the entire library (making another network request).
// 2. Retries: If the librarian can't find a book on the first try (query fails), they will keep looking a few more times (retry mechanism) before giving up.
// 3. Updates: The librarian also keeps track of when new editions of books arrive (data updates) and will replace the old editions with the new ones, ensuring you always have the most up-to-date information.
// This smart librarian (QueryClient) helps improve the performance and reliability of your data fetching in your application.

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
