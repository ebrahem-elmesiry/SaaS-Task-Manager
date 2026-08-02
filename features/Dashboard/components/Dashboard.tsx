import { StatsCards } from "./StatsCards";
import { RecentActivity } from "./RecentActivity";
import { ChartsSection } from "./ChartsSection";
import getDashboardData from "../services/getDashboardData";
import DashboardError from "./DashboardError";
import { formatActivity } from "@/features/TaskDetailPanel/handlers/formatActivity";
import { TrendingUp, Users, CheckCircle2, Clock } from "lucide-react";

export default async function Dashboard({
  range,
  workspace_id,
}: {
  range: string;
  workspace_id: string;
}) {
  const data = await getDashboardData(workspace_id, range);
  if (!data) return <DashboardError />;

  const {
    stats: rawStats,
    badges,
    task_daily,
    task_weekly,
    activity,
    errors,
  } = data;

  const stats = [
    {
      icon: <CheckCircle2 className="text-indigo-600 dark:text-indigo-400" />,
      value: rawStats.completed_tasks,
      label: "Tasks Completed",
      badge: badges.completed_tasks.value,
      badgeColor:
        badges.completed_tasks.trend === "positive"
          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
          : badges.completed_tasks.trend === "negative"
            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
            : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300",
    },
    {
      icon: <Clock className="text-purple-600 dark:text-purple-400" />,
      value: rawStats.in_progress_tasks,
      label: "In Progress",
      badge: badges.in_progress_tasks.value,
      badgeColor:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    },
    {
      icon: <Users className="text-blue-600 dark:text-blue-400" />,
      value: rawStats.team_count,
      label: "Team Members",
      badge: badges.team_count.value,
      badgeColor:
        badges.team_count.trend === "positive"
          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
          : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300",
    },
    {
      icon: <TrendingUp className="text-green-600 dark:text-green-400" />,
      value: rawStats.success_rate,
      label: "Success Rate",
      badge: badges.success_rate.value,
      badgeColor:
        badges.success_rate.trend === "positive"
          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
          : badges.success_rate.trend === "negative"
            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
            : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300",
    },
  ];

  return (
    <div className="space-y-10">
      <StatsCards
        stats={stats}
        isTeamField="fulfilled"
        isTasksField="fulfilled"
      />
      <ChartsSection
        isTaskDailyField={errors.task_daily ? "rejected" : "fulfilled"}
        isTaskWeeklyField={errors.task_weekly ? "rejected" : "fulfilled"}
        taskWeekly={task_weekly}
        statsData={task_daily}
      />
      <RecentActivity
        isAllActivityField={errors.activity ? "rejected" : "fulfilled"}
        allActivity={formatActivity(activity)}
      />
    </div>
  );
}
