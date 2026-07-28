import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers/Providers";
import { createClient } from "@/lib/supabase/server";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow - Task Management",
  description:
    "TaskFlow is a collaborative task management platform for teams.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const queryClient = getQueryClient();

  if (user) {
    await queryClient.prefetchQuery({
      queryKey: ["currentUser"],
      queryFn: async () => {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, avatar_url, job_title")
          .eq("id", user.id)
          .single();
        return {
          id: user.id,
          name: profile?.full_name ?? "",
          avatar: profile?.avatar_url || undefined,
          job_title: profile?.job_title ?? undefined,
        };
      },
    });
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body>
        <SpeedInsights />
        <Providers dehydratedState={dehydrate(queryClient)}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
