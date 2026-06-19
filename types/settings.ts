import { LucideIcon } from "lucide-react";

export type BaseProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export type ToggleProps = BaseProps & {
  type: "toggle";
  checked: boolean;
  onToggle: () => void;
};

export type CheckboxProps = BaseProps & {
  type: "checkbox";
  checked: boolean;
  onChange: (value: boolean) => void;
};

export type ClickProps = BaseProps & {
  type: "click";
  onClick: () => void;
};

export type WordProps = BaseProps & {
  type: "word";
  label: string;
  className: string;
  onClick: () => void;
};

export type SettingsItemProps =
  | ToggleProps
  | CheckboxProps
  | ClickProps
  | WordProps;

export type tabType = "account" | "security" | "notifications";

export type PasswordState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
