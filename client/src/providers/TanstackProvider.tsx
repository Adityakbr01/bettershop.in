"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getErrorMessage } from "@/utils/api-error";
import toast, { Toaster } from 'react-hot-toast';


export const TanstackProvider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 10000
          },
          mutations: {
            onError: (err: Error) => {
              toast.error(err.message)
            }
          }
        }
      })
  );

  return (
    <QueryClientProvider client={client}>
      <Toaster position="top-right"
        reverseOrder={false} />
      {children}
      <ReactQueryDevtools position="bottom" initialIsOpen={false} />
    </QueryClientProvider>
  );
};
