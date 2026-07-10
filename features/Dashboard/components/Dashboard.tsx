import { StatsCards } from "./StatsCards";
import { ChartsSection } from "./ChartsSection";
import { RecentActivity } from "./RecentActivity";
import fetchAll from "../services/fetchAll";
import DashboardError from "./DashboardError";

export default async function Dashboard({
  range,
  workspace_id,
}: {
  range: string;
  workspace_id: string;
}) {
  const {
    stats,
    taskDaily,
    taskWeekly,
    projectErr,
    allActivity,
    isTeamField,
    isTasksField,
    isTaskDailyField,
    isTaskWeeklyField,
    isAllActivityField,
  } = await fetchAll({
    workspace_id,
    filterDays: range,
  });
  if (projectErr) return <DashboardError />;
  return (
    <>
      <StatsCards
        stats={stats}
        isTeamField={isTeamField}
        isTasksField={isTasksField}
      />
      <ChartsSection
        isTaskDailyField={isTaskDailyField}
        isTaskWeeklyField={isTaskWeeklyField}
        taskWeekly={taskWeekly}
        statsData={taskDaily}
      />
      <RecentActivity
        isAllActivityField={isAllActivityField}
        allActivity={allActivity}
      />
    </>
  );
}
