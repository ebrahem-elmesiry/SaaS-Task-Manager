"use client";

import { ModeToggle } from "@/features/shared/hooks/Theme/useTheme";
import MobileSlideBar from "../Sheets/MobileSidebar";
import { SearchComponent } from "./componentsNavbar/SearchComponent";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import Notification from "./componentsNavbar/Notifications";
import { NotificationsRealtime } from "./componentsNavbar/Notifications/hooks/useNotificationsRealtime";
import Avatar from "../Avatar";

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
