"use client";

import dynamic from "next/dynamic";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUnreadCount } from "./hooks/useUnreadCount";
import NotificationLoading from "./components/NotificationLoading";

const NotificationList = dynamic(
  () =>
    import("./components/NotificationList").then((m) => m.NotificationList),
  { ssr: false, loading: () => <NotificationLoading /> },
);

export default function Notification() {
  const { data: unreadCount } = useUnreadCount();
  const count = unreadCount ?? 0;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label={`Notifications${count > 0 ? ` (${count} unread)` : ""}`}
          className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          {count > 0 && (
            <span
              aria-live="polite"
              aria-atomic="true"
              className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-75 sm:w-96 p-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl"
      >
        <NotificationList />
      </PopoverContent>
    </Popover>
  );
}
