import { LucideIcon } from "lucide-react";

export type BaseProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export type Skill = { id: string; name: string };

export interface SettingsData {
  id: string;
  full_name: string;
  email: string;
  job_title: string;
  about: string;
  location: string;
  avatar_url: string;
  skills: Skill[];
}

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
