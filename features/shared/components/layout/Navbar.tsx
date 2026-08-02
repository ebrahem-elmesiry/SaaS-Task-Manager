"use client";

import dynamic from "next/dynamic";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/features/shared/hooks/Theme/useTheme";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import Notification from "./componentsNavbar/Notifications";
import { NotificationsRealtime } from "./componentsNavbar/Notifications/hooks/useNotificationsRealtime";
import Avatar from "../Avatar";

const MobileSlideBar = dynamic(
  () => import("../Sheets/MobileSidebar").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <Button
        variant="outline"
        className="md:hidden"
        aria-label="Open navigation menu"
      >
        <span>
          <Menu className="w-5 h-5" />
        </span>
      </Button>
    ),
  },
);

const SearchComponent = dynamic(
  () =>
    import("./componentsNavbar/SearchComponent").then((m) => m.SearchComponent),
  {
    ssr: false,
    loading: () => (
      <button className="max-sm:hidden w-full flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-900 border rounded-lg">
        <Search className="w-4 h-4 text-slate-400" />
        <span className="text-sm text-slate-500">Search...</span>
        <kbd className="ml-auto text-xs max-sm:hidden">⌘K</kbd>
      </button>
    ),
  },
);

export function Header() {
  const currentUser = useCurrentUser();
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 md:px-6 h-16 gap-3">
        {/* Menu Sidebar */}
        <div className="flex items-center gap-4">
          <MobileSlideBar />
        </div>

        {/* SEARCH */}
        <SearchComponent />

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* Toggle Mode */}
          <ModeToggle />
          {/* NOTIFICATIONS */}
          <NotificationsRealtime userId={currentUser?.id} />
          <Notification />
          {/* USER */}
          {currentUser?.id && (
            <Avatar
              size="md"
              user_name={currentUser.name}
              avatar_url={currentUser.avatar}
            />
          )}
        </div>
      </div>
    </header>
  );
}
