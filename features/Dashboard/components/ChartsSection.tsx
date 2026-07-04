"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { CustomSelect } from "../../shared/components/controls/CustomSelect";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { DashboardError } from "./DashboardError";

type ChartsSectionProps = {
  statsData: { name: string; tasks: number }[] | undefined;
  taskWeekly: { name: string; completed: number }[] | undefined;
  isTaskDailyField: "rejected" | "fulfilled";
};

const timeOptions = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 3 months", value: "3m" },
];

export function ChartsSection({
  statsData,
  taskWeekly,
  isTaskDailyField,
}: ChartsSectionProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const range = searchParams.get("range") || undefined;
  const { replace } = useRouter();

  useEffect(() => {
    if (!range) {
      replace("/?range=7d", { scroll: false });
    }
  }, [range, replace]);

  function handleAddDate(val: string) {
    params.set("range", val);
    replace(`?${params.toString()}`, { scroll: false });
  }
  if (isTaskDailyField === "rejected") return <DashboardError />;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Bar Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Weekly Activity
          </h2>

          <CustomSelect
            value={range}
            onChange={handleAddDate}
            options={timeOptions}
            className="w-40 text-sm px-3 py-1.5"
          />
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={statsData}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="dark:stroke-slate-700"
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
          Completion Trend
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={taskWeekly}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="dark:stroke-slate-700"
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#10b981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
