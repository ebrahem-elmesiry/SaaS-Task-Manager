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

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmitPassword(password);
            e.target.reset();
          }}
          className="space-y-4"
        >
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
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            onChange={handleChange}
          />
          <ActionButtons Loading={Loading} primaryText="Update Password" />
        </form>
      </div>
    </div>
  );
}
