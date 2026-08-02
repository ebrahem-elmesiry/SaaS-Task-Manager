"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "../../features/shared/hooks/Theme/ThemeProvider";
import { Toaster } from "sonner";
import {
  QueryClientProvider,
  HydrationBoundary,
  type DehydratedState,
} from "@tanstack/react-query";
import { Sidebar } from "@/features/shared/components/layout/Sidebar";
import { Header } from "@/features/shared/components/layout/Navbar";
import { getQueryClient } from "@/lib/get-query-client";

export default function Providers({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState: DehydratedState;
}) {
  const queryClient = getQueryClient();
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth/");

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {isAuthPage ? (
            children
          ) : (
            <>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:outline-none"
              >
                Skip to main content
              </a>
              <Sidebar />
              <div className="md:ml-64 flex flex-col min-h-screen">
                <Header />
                <main
                  id="main-content"
                  className="flex-1 p-4 md:p-8 bg-slate-50 dark:bg-slate-900"
                >
                  {children}
                  <Toaster position="bottom-left" expand richColors />
                </main>
              </div>
            </>
          )}
        </ThemeProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
