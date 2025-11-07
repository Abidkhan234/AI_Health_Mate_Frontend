import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // number of retry attempts
      refetchOnWindowFocus: false, // do not refetch when window gains focus
      refetchOnReconnect: false, // do not refetch when network reconnects
      refetchOnMount: false, // do not refetch when component remounts
      staleTime: 1000 * 60 * 2, // data stays fresh for 2 minutes
      cacheTime: 1000 * 60 * 5, // data stays in cache for 5 minutes
    },
    mutations: {
      retry: 0, // disable retries for mutations
    },
  },
});

export default queryClient