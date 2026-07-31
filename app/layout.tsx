import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers/Providers";
import { dehydrate } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { getQueryClient } from "@/lib/get-query-client";

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
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body>
        <Analytics />
        <SpeedInsights />
        <Providers dehydratedState={dehydrate(getQueryClient())}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
