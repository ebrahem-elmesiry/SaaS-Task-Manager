import { typeSearch } from "@/features/shared/components/layout/componentsNavbar/SearchComponent";
import { statusType } from "@/types/project";
import { Users, CheckSquare, Settings, File } from "lucide-react";

export const teamMembers = [
  {
    id: "bc02c0f6-4224-4ac2-98f7-d211cfac6cdd",
    full_name: "ahmed mohamed",
    avatar_url: "",
  },
  {
    id: "60187dee-182d-454e-a5b9-d02f6562b436",
    full_name: "mohamed ahmed",
    avatar_url: "",
  },
];

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
