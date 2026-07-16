"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function TeamError({ refetch }: { refetch: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
        Failed to load team
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Something went wrong. Please try again.
      </p>
      <button
        onClick={refetch}
        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
}
