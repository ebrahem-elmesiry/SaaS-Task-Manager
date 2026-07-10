"use client";

import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Users } from "lucide-react";
import { useLogout } from "@/features/Auth/hooks/useLogout";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import Avatar from "../Avatar";

export default function SliderContent() {
  const currentUser = useCurrentUser();
  const { workspaceId } = useParams();
  const { logout } = useLogout();

  const navigation = [
    {
      id: "workspaces",
      link: "/workspaces",
      name: "Workspace",
      icon: LayoutDashboard,
      enabled: true,
    },
    {
      id: "dashboard",
      link: "/dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
      enabled: !!workspaceId,
    },
    {
      id: "projects",
      link: "/projects",
      name: "Projects",
      icon: FolderKanban,
      enabled: !!workspaceId,
    },
    {
      id: "team",
      link: "/team",
      name: "Team",
      icon: Users,
      enabled: !!workspaceId,
    },
    {
      id: "profile",
      link: `/profile`,
      name: "Profile",
      icon: User,
      enabled: true,
    },
  ];

  const pathName = usePathname();
  const getPathName = pathName
    .split("/")
    .filter((f) => f !== workspaceId && f !== currentUser?.id);

  const name = currentUser?.name.split(" ");
  const first_name = name?.[0] || "Unknown";
  const last_name = name?.[1] || "Unknown";

  const full_name =
    first_name[0].toUpperCase() +
    first_name.slice(1) +
    " " +
    last_name[0].toUpperCase() +
    last_name.slice(1);

  function handleLink(link: string, id: string) {
    if (id === "profile") return `/profile/${currentUser?.id}`;
    if (id === "dashboard") return `/dashboard/${workspaceId}`;
    if (id === "workspaces") return `/workspaces`;
    return `/dashboard/${workspaceId}/${link}`;
  }

  const urlLink = getPathName[getPathName.length - 1];

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
        {navigation.map((item) => {
          const Icon = item.icon;

          const link = handleLink(item.link, item.id);

          return (
            <Link
              href={link}
              onClick={(e) => {
                if (!item.enabled) {
                  e.preventDefault();
                }
              }}
              key={item.id}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                ${
                  urlLink === item.id
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                }
                ${
                  item.enabled && !!item.enabled
                    ? ""
                    : "pointer-events-none opacity-50 cursor-not-allowed"
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

        {currentUser && (
          <div className="pt-3">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <Avatar
                avatar_url={currentUser?.avatar}
                user_name={currentUser?.name}
              />

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {full_name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {currentUser?.role}
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
        )}
      </div>
    </>
  );
}
