"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Search } from "lucide-react";
import Link from "next/link";
import { useSearch } from "./hooks/useSearch";
import { SearchType } from "@/types/search";

export function SearchComponent() {
  const [open, setOpen] = useState(false);
  const {
    search,
    setSearch,
    results,
    isPending,
    selectedIndex,
    handleKeyDown,
  } = useSearch(setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="max-sm:hidden w-full flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-900 border rounded-lg"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-500">Search...</span>
          <kbd className="ml-auto text-xs max-sm:hidden">⌘K</kbd>
        </button>
      </DialogTrigger>

      {/* Content */}
      <DialogContent className="p-0 max-md:max-w-[90%]! max-w-2xl! bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl [&>button]:hidden">
        <VisuallyHidden>
          <DialogTitle className="text-slate-900 dark:text-white">
            Search
          </DialogTitle>
        </VisuallyHidden>
        {/* Header / Input */}
        <div className="flex items-center gap-3 px-4 max-sm:px-2 py-3 border-b border-slate-200 dark:border-slate-700">
          <Search className="w-5 h-5 text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search tasks, projects, people..."
            autoFocus
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />

          <kbd
            onClick={() => setOpen(false)}
            className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 rounded"
          >
            ESC
          </kbd>
        </div>

        {/* Content */}
        <div className="p-3 overflow-y-auto max-h-[60vh]">
          <div className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            Results
            {/* {search ? "Results" : "Suggestions"} */}
          </div>
          {isPending && search ? (
            /* skeleton */
            <div className="space-y-3 px-3 py-2 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            results.map((item: SearchType, i: number) => (
              <Link
                href={item.type === "user" ? `/profile/${item.id}` : ""}
                key={i}
                onClick={() => setOpen(false)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left ${
                  i === selectedIndex
                    ? "bg-slate-100 dark:bg-slate-700/50"
                    : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
                }`}
              >
                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {item.title}
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {item.type === "project" && (
                      <>project • {item.workspace_name}</>
                    )}
                    {item.type === "task" && (
                      <>
                        task • {item.project.name} • {item.status}
                      </>
                    )}
                    {item.type === "user" && (
                      <>
                        user • {item.role} • {item.workspace_name}
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-3 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
              {search
                ? `No results found for "${search}"`
                : "Type to search tasks, projects, or people..."}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>↑ ↓ Navigate</div>
          <div>↵ Select</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
