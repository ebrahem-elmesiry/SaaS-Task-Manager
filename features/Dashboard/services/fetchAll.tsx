import { statsData } from "@/types/dashbaord";
import { formatDate } from "@/lib/utils";
import fetchTasks from "@/features/kanban/services/fetchTasks";
import fetchTeam from "@/features/team/services/fetchTeam";
import fetchTasksDaily from "./fetchTasksDaily";
import { ColumnsType } from "@/types/kanban";
import { TrendingUp, Users, CheckCircle2, Clock } from "lucide-react";
import fetchTaskWeekly from "./fetchTaskWeekly";
import fetchActivities from "./fetchActivities";

export default async function fetchAll({ filterDays }: { filterDays: string }) {
  // ── Return values map to Dashboard components ──
  // StatsCards       ← stats, isTeamField, isTasksField
  // ChartsSection    ← taskDaily.data (as statsData), taskWeekly.data, isTaskDailyField
  // RecentActivity   ← allActivity, isAllActivityField
  //
  // get value from Promise.allSettled
  const getPromiseSettledValue = <T,>(res: PromiseSettledResult<T>) =>
    res.status === "fulfilled" ? res.value : null;

  const DAYS_MAP: Record<string, number> = {
    "7d": 7,
    "30d": 30,
    "3m": 90,
  };

  const daysAgo = DAYS_MAP[filterDays] ?? 7;

  // get startOfWeek and endOfWeek
  const date = new Date();
  const startOfWeek = formatDate(date);
  date.setDate(date.getDate() - daysAgo);
  const endOfWeek = date.toISOString().split("T")[0];

  const today = new Date();
  const formatDateToString = (date: Date) => date.toISOString().split("T")[0];
  const week1 = {
    start: formatDateToString(
      new Date(today.getFullYear(), today.getMonth(), 1),
    ),
    end: formatDateToString(new Date(today.getFullYear(), today.getMonth(), 7)),
  };
  const week2 = {
    start: formatDateToString(
      new Date(today.getFullYear(), today.getMonth(), 8),
    ),
    end: formatDateToString(
      new Date(today.getFullYear(), today.getMonth(), 14),
    ),
  };
  const week3 = {
    start: formatDateToString(
      new Date(today.getFullYear(), today.getMonth(), 15),
    ),
    end: formatDateToString(
      new Date(today.getFullYear(), today.getMonth(), 21),
    ),
  };
  const week4 = {
    start: formatDateToString(
      new Date(today.getFullYear(), today.getMonth(), 22),
    ),
    end: formatDateToString(
      new Date(today.getFullYear(), today.getMonth() + 1, 0),
    ),
  };

  // Fetch Data Here
  const [tasks, team, taskDailyFetch, taskWeeklyFetch, getAllActivities] =
    await Promise.allSettled([
      fetchTasks(),
      fetchTeam("7ad0401e-2da4-4336-a5ad-29e071eeaace"),
      fetchTasksDaily(endOfWeek, startOfWeek),
      fetchTaskWeekly(week1, week2, week3, week4),
      fetchActivities(),
    ]);

  // Values
  const completedTasks = getPromiseSettledValue<ColumnsType | undefined>(
    tasks,
  )?.["done"].length;
  const inProgressTasks = getPromiseSettledValue<ColumnsType | undefined>(
    tasks,
  )?.["in-progress"].length;

  const allTasks = Object.values(
    getPromiseSettledValue<ColumnsType | undefined>(tasks) || [],
  ).flat().length;

  const teamCount = getPromiseSettledValue(team)?.data.length;
  const taskDaily = getPromiseSettledValue<{
    data: statsData[];
    success: boolean;
  } | null>(taskDailyFetch);

  const rate = completedTasks ? (completedTasks / allTasks) * 100 : 0;
  const stats = [
    {
      icon: <CheckCircle2 className="text-indigo-600 dark:text-indigo-400" />,
      badge: "+12%",
      badgeColor:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      value: completedTasks || 0,
      label: "Tasks Completed",
    },
    {
      icon: <Clock className="text-purple-600 dark:text-purple-400" />,
      badge: "23 active",
      badgeColor:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
      value: inProgressTasks || 0,
      label: "In Progress",
    },
    {
      icon: <Users className="text-blue-600 dark:text-blue-400" />,
      badge: "+3 new",
      badgeColor:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
      value: teamCount || 0,
      label: "Team Members",
    },
    {
      icon: <TrendingUp className="text-green-600 dark:text-green-400" />,
      badge: "+18%",
      badgeColor:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      value: Number(rate.toFixed(2)),
      label: "Success Rate",
    },
  ];

  const allActivity = getPromiseSettledValue(getAllActivities);
  const taskWeekly = getPromiseSettledValue(taskWeeklyFetch);

  return {
    stats,
    taskDaily,
    taskWeekly,
    allActivity,
    isAllActivityField: getAllActivities.status,
    isTasksField: tasks.status,
    isTeamField: team.status,
    isTaskDailyField: taskDailyFetch.status,
    isTaskWeeklyField: taskWeeklyFetch.status,
  };
}
