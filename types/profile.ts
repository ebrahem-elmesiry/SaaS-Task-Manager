import { Status } from "./kanban";

export type RecentTask = {
  id: number;
  title: string;
  project: string;
  status: Status;
  completedDate?: string;
  dueDate?: string;
};

export type Project = {
  id: number;
  name: string;
  progress: number;
  total_tasks: number;
};

// Account
export type NotificationState = {
  invitations_enabled: boolean;
  notifications_enabled: boolean;
};
