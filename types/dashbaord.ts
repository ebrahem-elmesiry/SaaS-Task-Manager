import { Metadata, Status } from "./kanban";

export type statsData = { name: string; tasks: number };
export type weekTask = { name: string; completed: number };

export type DashboardBadge = {
  value: string;
  type: "percentage" | "count";
  trend: "positive" | "negative" | "neutral";
};

export type DashboardData = {
  stats: {
    completed_tasks: number;
    in_progress_tasks: number;
    team_count: number;
    success_rate: number;
  };
  badges: {
    completed_tasks: DashboardBadge;
    in_progress_tasks: DashboardBadge;
    team_count: DashboardBadge;
    success_rate: DashboardBadge;
  };
  task_daily: statsData[];
  task_weekly: weekTask[];
  activity: Array<{
    id: string;
    action: string;
    entity_id: string;
    created_at: string;
    metadata: Metadata | null;
    user_id: string;
    workspace_id: string;
    profiles: { id: string; full_name: string; avatar_url: string } | null;
    tasks: {
      id: string;
      title: string;
      status: Status;
      project_id: string;
    } | null;
  }>;
  errors: {
    task_daily: boolean;
    task_weekly: boolean;
    activity: boolean;
  };
};
