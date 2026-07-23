import { typeSearch } from "@/features/shared/components/layout/componentsNavbar/SearchComponent";
import { statusType } from "@/types/project";
import { Users, CheckSquare, Settings, File } from "lucide-react";
import { User, Bell, Shield } from "lucide-react";

export const recentSearches = [
  {
    icon: CheckSquare,
    text: "Update user authentication flow",
    type: "task" as typeSearch,
    project: "Website Redesign",
  },
  { icon: File, text: "Website Redesign", type: "project" as typeSearch },
  { icon: Users, text: "Sarah Chen", type: "user" as typeSearch },
];

export const suggestions = [
  {
    icon: CheckSquare,
    text: "Mobile responsive fixes",
    type: "task" as typeSearch,
    project: "Website Redesign",
  },
  {
    icon: CheckSquare,
    text: "API documentation",
    type: "task" as typeSearch,
    project: "API Integration",
  },
  {
    icon: File,
    text: "Database Migration",
    type: "project" as typeSearch,
    status: "At Risk" as statusType,
  },
  {
    icon: Users,
    text: "Mike Johnson",
    type: "user" as typeSearch,
    role: "Developer",
  },
  { icon: Settings, text: "Team Settings", type: "page" as typeSearch },
];

// tabs for settings page
export const tabs = [
  { id: "account", name: "Account", icon: User },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "security", name: "Security", icon: Shield },
];
