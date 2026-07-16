"use client";

import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications } from "./hooks/useNotifications";
import NotificationLoading from "./components/NotificationLoading";
import NotificationError from "./components/NotificationError";
import NotificationEmpty from "./components/NotificationEmpty";
import NotificationContent from "./components/NotificationContent";

export default function Notification() {
  const { notifications, isPending, error, unreadCount, refetch } =
    useNotifications();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-75 sm:w-96 p-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl"
      >
        {isPending ? (
          <NotificationLoading />
        ) : error ? (
          <NotificationError error={error} refetch={refetch} />
        ) : notifications.length === 0 ? (
          <NotificationEmpty />
        ) : (
          <NotificationContent
            notifications={notifications}
            unreadCount={unreadCount}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
