import { Priority, Status } from "@/types/kanban";
import { clsx, type ClassValue } from "clsx";
import { Crown, Shield, User } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const columnTitles: Record<Status, string> = {
  todo: "Todo",
  "in-progress": "In Progress",
  review: "Review",
  done: "Done",
};

export function formatTimeAgo(date: Date | string) {
  const now = new Date();
  const past = new Date(date);

  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
}

export function formatDate(date: string | Date) {
  const d = new Date(date);

  const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const year = d.getFullYear();

  return `${weekday} ${month} ${year}`;
}

export const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    "Just Started":
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    "In Progress":
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    "At Risk": "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    Completed:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  };
  return colors[status] || colors["In Progress"];
};

export const getColorClasses = (color: Status) => {
  const colors: Record<string, string> = {
    todo: "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300",
    "in-progress":
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    review:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    done: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  };
  return colors[color];
};

export const getPriorityColor = (priority: Priority) => {
  const colors: Record<string, string> = {
    high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
    medium:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    low: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  };
  return colors[priority];
};

export const getRoleIcon = (role: string) => {
  if (role === "Admin") return Crown;
  if (role === "Manager") return Shield;
  return User;
};
export const getRoleColor = (role: string) => {
  if (role === "Admin")
    return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400";
  if (role === "Manager")
    return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
  return "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300";
};
