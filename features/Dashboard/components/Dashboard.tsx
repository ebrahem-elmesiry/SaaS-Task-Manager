import { StatsCards } from "./StatsCards";
import { ChartsSection } from "./ChartsSection";
import { RecentActivity } from "./RecentActivity";
import fetchAll from "../services/fetchAll";

export default async function Dashboard({ range }: { range: string }) {
  const {
    stats,
    taskDaily,
    taskWeekly,
    allActivity,
    isTeamField,
    isTasksField,
    isTaskDailyField,
    isAllActivityField,
  } = await fetchAll({
    filterDays: range,
  });

  return (
    <>
      <StatsCards
        stats={stats}
        isTeamField={isTeamField}
        isTasksField={isTasksField}
      />
      <ChartsSection
        isTaskDailyField={isTaskDailyField}
        taskWeekly={taskWeekly?.data}
        statsData={taskDaily?.data}
      />
      <RecentActivity
        isAllActivityField={isAllActivityField}
        allActivity={allActivity}
      />
    </>
  );
}
