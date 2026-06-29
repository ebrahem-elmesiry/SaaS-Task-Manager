"use client";

import { ModeToggle } from "@/features/shared/hooks/Theme/useTheme";
import MobileSlideBar from "../Sheets/MobileSidebar";
import { SearchComponent } from "./componentsNavbar/SearchComponent";
import NotificationCenter from "./componentsNavbar/Notifications";
import { useMainContext } from "@/context/MainContext";
import { getAvatarName } from "@/lib/utils";

export function Header() {
  const { currentUser } = useMainContext();
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
          <NotificationCenter />

          {/* USER */}
          {currentUser.id && (
            <div className="hidden md:flex items-center ml-2 pl-2 border-l">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">
                {currentUser.avatar || getAvatarName(currentUser.name)}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
