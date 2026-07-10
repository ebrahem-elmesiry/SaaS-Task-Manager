import { ReactNode } from "react";
import { SectionError } from "./SectionError";

type StatItem = {
  icon: ReactNode;
  value: number;
  label: string;
};
interface StatsCardsProps {
  stats: StatItem[];
  isTasksField: "rejected" | "fulfilled";
  isTeamField: "rejected" | "fulfilled";
}

export async function StatsCards({
  stats,
  isTasksField,
  isTeamField,
}: StatsCardsProps) {
  if (isTasksField === "rejected" || isTeamField === "rejected")
    return <SectionError />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="mb-4 flex-between">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900/30 rounded-lg flex items-center justify-center">
              {item.icon}
            </div>
            <div className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">
              {item.label === "Success Rate" ? item.value + "%" : item.value}
            </div>
          </div>

          <div className="text-sm text-slate-500 dark:text-slate-400">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
