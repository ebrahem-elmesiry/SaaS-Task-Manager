"use client";

import { User, Bell, Shield } from "lucide-react";
import { useState } from "react";
import { NotificationSettings } from "./NotificationSettings";
import { SecuritySettings } from "./SecuritySettings";
import Tabs from "./Tabs";
import { useSearchParams } from "next/navigation";
import { NotificationState } from "@/types/profile";
import { tabType } from "@/types/settings";
import { AccountDetailsType } from "@/validation/profile.schema";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { AccountSettings } from "./Account/AccountSettings";
import { SettingsSkeleton } from "@/features/shared/components/loading/SettingsSkeleton";

interface Props {
  accountData: AccountDetailsType;
  skillsProp: string[];
  NotificationData: NotificationState;
  avatar: string;
  isPending: boolean;
}

export default function SettingsComponent({
  accountData,
  skillsProp,
  NotificationData,
  avatar,
  isPending,
}: Props) {
  const tabs = [
    { id: "account", name: "Account", icon: User },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Security", icon: Shield },
  ];

  // const { data,error } = useQuery({
  //   queryKey: ["settings-data"],
  //   queryFn: async () => {}
  // });

  const searchParams = useSearchParams();
  const activeTab: tabType = (searchParams.get("tab") as tabType) ?? "account";
  if (isPending) return <SettingsSkeleton />;
  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <Tabs tabs={tabs} activeTab={activeTab} />

        <div className="p-6">
          {activeTab === "account" && (
            <AccountSettings
              avatar={avatar}
              accountData={accountData}
              skillsProp={skillsProp}
            />
          )}

          {activeTab === "notifications" && (
            <NotificationSettings NotificationData={NotificationData} />
          )}

          {activeTab === "security" && <SecuritySettings />}
        </div>
      </div>
    </>
  );
}
