import { Mail, Bell } from "lucide-react";

import { SettingsItem } from "./shared/SettingsItem";
import { SettingSection } from "./shared/SettingsSection";
import useNotifications from "../hooks/useNotifications";
import { NotificationState } from "@/types/profile";
import { ActionButtons } from "@/features/shared/components/ActionButtons";

export function NotificationSettings({
  NotificationData,
}: {
  NotificationData: NotificationState;
}) {
  const {
    notifications,
    toggle,
    handleCheckbox,
    Loading,
    cancelChanges,
    handleChangeNotifications,
  } = useNotifications({
    NotificationData,
  });

  return (
    <div className="space-y-6">
      {/* Email Section */}
      <SettingSection
        title="Email Notifications"
        description="Choose what updates you want to receive via email"
      >
        <SettingsItem
          title="Email Notifications"
          description="Receive notifications via email"
          icon={Mail}
          type="toggle"
          checked={notifications.emailNotifications}
          onToggle={() => toggle("emailNotifications")}
        />

        <SettingsItem
          title="Push Notifications"
          description="Receive push notifications in browser"
          icon={Bell}
          type="toggle"
          checked={notifications.pushNotifications}
          onToggle={() => toggle("pushNotifications")}
        />
      </SettingSection>

      {/* Activity Section */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
        <SettingSection title="Activity Notifications">
          <SettingsItem
            title="Task Updates"
            description="Get notified when tasks are updated"
            type="checkbox"
            checked={notifications.taskUpdates}
            onChange={(val) => handleCheckbox("taskUpdates", val)}
          />

          <SettingsItem
            title="Weekly Digest"
            description="Receive a weekly summary of your activity"
            type="checkbox"
            checked={notifications.weeklyDigest}
            onChange={(val) => handleCheckbox("weeklyDigest", val)}
          />
        </SettingSection>
      </div>

      <ActionButtons
        onCancel={cancelChanges}
        Loading={Loading}
        onSave={() => handleChangeNotifications(notifications)}
      />
    </div>
  );
}
