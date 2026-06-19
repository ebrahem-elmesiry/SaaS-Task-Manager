import { Lock } from "lucide-react";
import { SettingsItem } from "./shared/SettingsItem";
import { SettingSection } from "./shared/SettingsSection";
import useChangePassword from "../hooks/useChangePassword";
import InputField from "@/features/shared/components/controls/InputField";
import { ActionButtons } from "@/features/shared/components/ActionButtons";

export function SecuritySettings() {
  const { handleChange, Loading, handleSubmitPassword, password } =
    useChangePassword();

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
          Change Password
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Update your password to keep your account secure
        </p>

        <div className="space-y-4">
          <InputField
            label="Current Password"
            name="currentPassword"
            type="password"
            placeholder="Enter current password"
            onChange={handleChange}
          />

          <InputField
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            onChange={handleChange}
          />

          <InputField
            label="Confirm New Password"
            name="confirmNewPassword"
            type="password"
            placeholder="Confirm new password"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 2FA */}
      <div className="border-t border-slate-200 dark:border-slate-700" />
      <SettingSection title="Two-Factor Authentication">
        <SettingsItem
          title="Enable 2FA"
          description="Add an extra layer of security to your account"
          icon={Lock}
          type="click"
          onClick={() => {}}
        />
      </SettingSection>
      <div className="border-t border-slate-200 dark:border-slate-700" />
      {/* Active Sessions */}
      <SettingSection title="Active Sessions">
        <SettingsItem
          title="MacBook Pro - Chrome"
          description="San Francisco, CA • Current session"
          type="word"
          onClick={() => {}}
          label="Active"
          className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full"
        />
        <SettingsItem
          title="iPhone 14 - Safari"
          description="San Francisco, CA • 2 hours ago"
          type="word"
          onClick={() => {}}
          label="Revoke"
          className="text-red-600 dark:text-red-400 hover:underline"
        />
      </SettingSection>
      <ActionButtons
        Loading={Loading}
        onSave={() => handleSubmitPassword(password)}
        primaryText="Update Password"
      />
    </div>
  );
}
