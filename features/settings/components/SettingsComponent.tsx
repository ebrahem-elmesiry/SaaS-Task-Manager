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
          {activeTab === "account" && (
            <div id="tabpanel-account" role="tabpanel" aria-labelledby="tab-account">
              <AccountSettings data={data} />
            </div>
          )}

          {activeTab === "notifications" && (
            <div id="tabpanel-notifications" role="tabpanel" aria-labelledby="tab-notifications">
              <NotificationSettings notificationSettings={notificationSettings} />
            </div>
          )}

          {activeTab === "security" && (
            <div id="tabpanel-security" role="tabpanel" aria-labelledby="tab-security">
              <SecuritySettings />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
