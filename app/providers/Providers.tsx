"use client";

import { ThemeProvider } from "../../features/shared/hooks/Theme/ThemeProvider";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { MainProvider } from "@/context/MainContext";
import { currentUserType } from "@/types/main";
import { Sidebar } from "@/features/shared/components/layout/Sidebar";
import { Header } from "@/features/shared/components/layout/Navbar";
import { getQueryClient } from "@/lib/get-query-client";

export default function Providers({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: currentUserType;
}) {
  const queryClient = getQueryClient();
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
          <div className="md:ml-64 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 md:p-8 bg-slate-50 dark:bg-slate-900">
              {children}
              <Toaster position="bottom-left" expand richColors />
            </main>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </MainProvider>
  );
}
