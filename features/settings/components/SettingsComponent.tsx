"use client";

import { NotificationSettings } from "./NotificationSettings";
import { SecuritySettings } from "./SecuritySettings";
import Tabs from "./Tabs";
import { useSearchParams } from "next/navigation";
import { tabType } from "@/types/settings";
import { useQuery } from "@tanstack/react-query";
import { AccountSettings } from "./Account/AccountSettings";
import { SettingsSkeleton } from "@/features/shared/components/loading/SettingsSkeleton";
import fetchSettings from "../services/fetchSettings";
import { tabs } from "@/constant/arrays";

export default function SettingsComponent() {
  const { data, isPending } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  const searchParams = useSearchParams();
  const activeTab: tabType = (searchParams.get("tab") as tabType) ?? "account";
  if (isPending) return <SettingsSkeleton />;

  const notificationSettings = {
    notifications_enabled: data.notifications_enabled,
    invitations_enabled: data.invitations_enabled,
  };
  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <Tabs tabs={tabs} activeTab={activeTab} />

        <div className="p-6">
          {activeTab === "account" && <AccountSettings data={data} />}

          {activeTab === "notifications" && (
            <NotificationSettings notificationSettings={notificationSettings} />
          )}

          {activeTab === "security" && <SecuritySettings />}
        </div>
      </div>
    </>
  );
}
