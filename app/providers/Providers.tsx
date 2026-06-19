"use client";

import React, { useState } from "react";
import { ThemeProvider } from "../../features/shared/hooks/Theme/ThemeProvider";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainProvider } from "@/context/MainContext";
import { currentUserType } from "@/types/main";
import { Sidebar } from "@/features/shared/components/layout/Sidebar";
import { Header } from "@/features/shared/components/layout/Navbar";

export default function Providers({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: currentUserType;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  return (
    <MainProvider currentUser={currentUser}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <div className="md:ml-64">
            <Header />
            <main className="p-4 md:p-8 bg-slate-50 dark:bg-slate-900">
              {children}
              <Toaster position="bottom-left" expand richColors />
            </main>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </MainProvider>
  );
}
