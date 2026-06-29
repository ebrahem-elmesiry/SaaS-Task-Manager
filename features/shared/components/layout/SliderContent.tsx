"use client";

import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Users } from "lucide-react";
import { useLogout } from "@/features/Auth/hooks/useLogout";
import { useMainContext } from "@/context/MainContext";

export default function SliderContent() {
  const { currentUser } = useMainContext();

  const navigation = [
    {
      id: "dashboard",
      link: "/",
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "projects",
      link: "/projects",
      name: "Projects",
      icon: FolderKanban,
    },
    { id: "team", link: "/team", name: "Team", icon: Users, adminOnly: true },
    {
      id: "profile",
      link: `/profile/${currentUser.id}`,
      name: "Profile",
      icon: User,
    },
  ];

  const filteredNavigation = navigation.filter((item) => {
    if (
      item.adminOnly &&
      !(currentUser?.role === "admin" || currentUser?.role === "manager")
    ) {
      return false;
    }
    return true;
  });

  const pathName = usePathname();
  const { logout } = useLogout();

  return (
    <>
      <div className="flex items-center gap-2 p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white rounded" />
        </div>
        <span className="text-lg font-semibold text-slate-900 dark:text-white">
          TaskFlow
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {filteredNavigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              href={item.link}
              key={item.id}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                ${
                  pathName === item.link
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-1">
        <Link
          href={`/settings`}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>

        <div className="pt-3">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                John Doe
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                Admin
              </div>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
