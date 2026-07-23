import { Mail, Bell } from "lucide-react";

import { SettingsItem } from "./shared/SettingsItem";
import { SettingSection } from "./shared/SettingsSection";
import useNotifications from "../hooks/useNotifications";
import { ActionButtons } from "@/features/shared/components/ActionButtons";

interface SettingsData {
  notifications_enabled: boolean;
  invitations_enabled: boolean;
}

export function NotificationSettings({
  notificationSettings,
}: {
  notificationSettings: SettingsData;
}) {
  const {
    notifications,
    toggle,
    Loading,
    cancelChanges,
    handleChangeNotifications,
  } = useNotifications({
    NotificationData: notificationSettings,
  });

  return (
    <div className="space-y-6">
      <SettingSection
        title="Activity Notifications"
        description="Get notified about activity in your workspaces"
      >
        <SettingsItem
          title="Activity Notifications"
          description="Receive notifications about activity in your workspaces."
          icon={Mail}
          type="toggle"
          checked={notifications.notifications_enabled}
          onToggle={() => toggle("notifications_enabled")}
        />

        <SettingsItem
          title="Workspace Invitations"
          description="You won't receive new workspace invitations while this is turned off."
          icon={Bell}
          type="toggle"
          checked={notifications.invitations_enabled}
          onToggle={() => toggle("invitations_enabled")}
        />
      </SettingSection>

      <ActionButtons
        onCancel={cancelChanges}
        Loading={Loading}
        onSave={() => handleChangeNotifications(notifications)}
      />
    </div>
  );
}
