import { Priority, Status } from "@/types/kanban";
import { clsx, type ClassValue } from "clsx";
import { Crown, Shield, User } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function singular<T>(value: T | T[]): T {
  return Array.isArray(value) ? value[0] : value;
}

export function getAvatarName(name: string) {
  if (!name) return;
  const [f, l] = name.split(" ") || "Unknown";
  const avatar_name = (f[0] + l[0]).toUpperCase();
  return avatar_name;
}

export function getProjectStatus(
  progress: number,
  dueDate: string,
): "Just Started" | "In Progress" | "At Risk" | "Completed" {
  if (progress === 100) {
    return "Completed";
  }

  const daysRemaining =
    (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);

  if (daysRemaining <= 3 && progress < 80) {
    return "At Risk";
  }

  if (progress <= 10) {
    return "Just Started";
  }

  return "In Progress";
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
  if (seconds < 60) return `${seconds} second${seconds === 1 ? "" : "s"} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

// export function formatTimeAgo(date: Date | string) {
//   const now = new Date();
//   const past = new Date(date);

//   const diffMs = now.getTime() - past.getTime();

//   const seconds = Math.floor(diffMs / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);

//   if (seconds < 60) return `${seconds} seconds ago`;
//   if (minutes < 60) return `${minutes} minutes ago`;
//   if (hours < 24) return `${hours} hours ago`;
//   return `${days} days ago`;
// }

export function formatDate(date: string | Date) {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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
