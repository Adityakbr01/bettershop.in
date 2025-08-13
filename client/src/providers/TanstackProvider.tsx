"use client";

import { AdminDashboardSidebar } from "@/components/AdminDashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
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
              const error = err as { response?: { data?: { message?: string } } };
              toast.error(error.response?.data?.message || "Something went wrong");
            }
          }
        }
      })
  );

  return (
    <QueryClientProvider client={client}>
      <SidebarProvider>
        <Toaster position="top-left"
          reverseOrder={false} />
        {children}
      </SidebarProvider>
      <ReactQueryDevtools position="bottom" initialIsOpen={false} />
    </QueryClientProvider>
  );
};
