"use client";

import {
  CheckCircle2,
  MessageSquare,
  UserPlus,
  AlertCircle,
  FileText,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Bell } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "task",
    icon: CheckCircle2,
    color: "green",
    title: "Sarah Chen completed a task",
    message: "Homepage Redesign has been marked as complete",
    time: "2 minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "comment",
    icon: MessageSquare,
    color: "blue",
    title: "New comment on API Integration",
    message: 'Mike Johnson: "We should add rate limiting"',
    time: "15 minutes ago",
    unread: true,
  },
  {
    id: 3,
    type: "member",
    icon: UserPlus,
    color: "purple",
    title: "New team member added",
    message: "Emily Davis joined the Website Redesign project",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 4,
    type: "alert",
    icon: AlertCircle,
    color: "orange",
    title: "Task deadline approaching",
    message: "Database Migration is due in 2 days",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 5,
    type: "document",
    icon: FileText,
    color: "indigo",
    title: "Document uploaded",
    message: "Lisa Anderson uploaded requirements.pdf",
    time: "3 hours ago",
    unread: false,
  },
];

function getColorClasses(color: string) {
  const colors: Record<string, string> = {
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    orange:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    indigo:
      "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
  };

  return colors[color];
}

export default function NotificationCenter() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <Popover>
      {/* Trigger */}
      <PopoverTrigger asChild>
        <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
      </PopoverTrigger>

      {/* Content */}
      <PopoverContent
        align="end"
        className="max-w-96 p-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Notifications
            </h2>

            {unreadCount > 0 && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {unreadCount} unread
              </p>
            )}
          </div>

          <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
            Mark all read
          </button>
        </div>

        {/* List */}
        <div className="max-h-100 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
          {notifications.map((n) => {
            const Icon = n.icon;

            return (
              <button
                key={n.id}
                className={`w-full flex gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition ${
                  n.unread ? "bg-indigo-50/50 dark:bg-indigo-950/20" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getColorClasses(
                    n.color,
                  )}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {n.title}
                    </p>

                    {n.unread && (
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5" />
                    )}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {n.message}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-700">
          <button className="w-full py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition">
            View all notifications
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
