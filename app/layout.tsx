import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers/Providers";
import { createClient } from "@/lib/supabase/server";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "TaskFlow - Task Management",
    template: "%s | TaskFlow",
  },
  description:
    "TaskFlow is a collaborative task management platform for teams.",
  keywords: [
    "task management",
    "project management",
    "team collaboration",
    "productivity",
  ],
  openGraph: {
    title: "TaskFlow - Task Management",
    description: "Collaborative task management platform for teams.",
    type: "website",
    siteName: "TaskFlow",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
  },
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
      className={`${inter.variable} h-full antialiased`}
    >
      <body>
        <Analytics />
        <SpeedInsights />
        <Providers dehydratedState={dehydrate(queryClient)}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
