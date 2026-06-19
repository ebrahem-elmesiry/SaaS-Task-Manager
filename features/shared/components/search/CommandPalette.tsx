import {
  Search,
  File,
  Users,
  CheckSquare,
  Settings,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const recentSearches = [
    {
      icon: CheckSquare,
      text: "Update user authentication flow",
      type: "Task",
    },
    { icon: File, text: "Website Redesign", type: "Project" },
    { icon: Users, text: "Sarah Chen", type: "User" },
  ];

  const suggestions = [
    {
      icon: CheckSquare,
      text: "Mobile responsive fixes",
      type: "Task",
      project: "Website Redesign",
    },
    {
      icon: CheckSquare,
      text: "API documentation",
      type: "Task",
      project: "API Integration",
    },
    {
      icon: File,
      text: "Database Migration",
      type: "Project",
      status: "At Risk",
    },
    { icon: Users, text: "Mike Johnson", type: "User", role: "Developer" },
    { icon: Settings, text: "Team Settings", type: "Settings" },
  ];

  const filteredSuggestions = search
    ? suggestions.filter((s) =>
        s.text.toLowerCase().includes(search.toLowerCase()),
      )
    : suggestions;

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed top-0 left-0 right-0 flex justify-center pt-20 z-50 px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks, projects, people..."
              className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              autoFocus
            />
            <kbd className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-600">
              ESC
            </kbd>
          </div>

          <div className="max-h-[500px] overflow-y-auto">
            {!search && (
              <div className="p-3">
                <div className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Recent
                </div>
                {recentSearches.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {item.text}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {item.type}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="p-3">
              <div className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                {search ? "Results" : "Suggestions"}
              </div>
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {item.text}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {item.type}
                          {item.project && ` • ${item.project}`}
                          {item.role && ` • ${item.role}`}
                          {item.status && ` • ${item.status}`}
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  No results found
                </div>
              )}
            </div>
          </div>

          <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">
                ↓
              </kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">
                ↵
              </kbd>
              <span>Select</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
