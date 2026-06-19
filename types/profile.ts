export type UserStat = {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
};

export type RecentTask = {
  id: number;
  title: string;
  project: string;
  status: "completed" | "in-progress";
  completedDate?: string;
  dueDate?: string;
};

export type Project = {
  id: number;
  name: string;
  progress: number;
  tasks: number;
};

// Account
export type NotificationState = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  taskUpdates: boolean;
  weeklyDigest: boolean;
};
