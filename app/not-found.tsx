"use client";

import Link from "next/link";

export default function notFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 transition-colors duration-300 bg-[#F8F9FC] dark:bg-[#0B1320]">
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-64 h-64 rounded-full blur-3xl opacity-20 bg-[#4F46E5] dark:bg-[#6366F1]" />

        <div className="relative text-center">
          <h1 className="text-9xl font-black tracking-tight select-none bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#818CF8] dark:from-[#6366F1] dark:to-[#A5B4FC]">
            404
          </h1>
        </div>
      </div>

      <div className="text-center max-w-md z-10">
        <h2 className="text-3xl font-bold mb-3 tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
          Page Not Found
        </h2>
        <p className="text-base mb-8 text-[#64748B] dark:text-[#94A3B8]">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been moved, deleted, or never existed in TaskFlow.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-xs sm:max-w-none z-10">
        <Link
          href={"/"}
          className="px-6 py-3 text-sm font-semibold rounded-xl text-white shadow-md shadow-indigo-500/10 transition-all duration-200 bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5]"
        >
          Go Back Home
        </Link>

        <button
          onClick={handleGoBack}
          className="px-6 py-3 text-sm font-semibold rounded-xl border transition-all duration-200 bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9] dark:bg-[#111C2A] dark:border-[#1E293B] dark:text-[#F8FAFC] dark:hover:bg-[#17253A]"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
