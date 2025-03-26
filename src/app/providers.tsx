"use client"; // Marks this component and its children as client-side components
// This directive tells Next.js that this code should be rendered in the browser, not on the server

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { ColorProvider } from "@/context/ColorContext";

// Create a new QueryClient instance that will manage caching, retries, and updates
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 60 * 1000, // 1 minute
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// Analogy: Think of the QueryClient as a smart librarian in a library.
// 1. Caching: The librarian remembers the books you've recently read (cached data) so that if you need them again, they can quickly hand them to you without having to search the entire library (making another network request).
// 2. Retries: If the librarian can't find a book on the first try (query fails), they will keep looking a few more times (retry mechanism) before giving up.
// 3. Updates: The librarian also keeps track of when new editions of books arrive (data updates) and will replace the old editions with the new ones, ensuring you always have the most up-to-date information.
// This smart librarian (QueryClient) helps improve the performance and reliability of your data fetching in your application.

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ColorProvider>
        {children}
      </ColorProvider>
      <ReactQueryDevtools initialIsOpen={false} /> {/* React Query Devtools  is a tool for debugging and inspecting the state of your queries */}
    </QueryClientProvider>
  );
}

// The QueryClientProvider is a component that provides a QueryClient to your application.
// It is used to manage the caching, retries, and updates of your queries.
// The QueryClient is a smart librarian that helps improve the performance and reliability of your data fetching in your application.
// The ReactQueryDevtools is a tool for debugging and inspecting the state of your queries.
// The initialIsOpen={false} is used to prevent the devtools from being open by default.
