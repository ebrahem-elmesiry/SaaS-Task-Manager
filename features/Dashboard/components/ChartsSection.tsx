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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SectionError } from "./SectionError";

type ChartsSectionProps = {
  statsData: { name: string; tasks: number }[] | null;
  taskWeekly: { name: string; completed: number }[] | null;
  isTaskDailyField: "rejected" | "fulfilled";
  isTaskWeeklyField: "rejected" | "fulfilled";
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
  isTaskWeeklyField,
}: ChartsSectionProps) {
  const searchParams = useSearchParams();
  const { workspaceId } = useParams();
  const params = new URLSearchParams(searchParams.toString());
  const range = searchParams.get("range") || undefined;
  const { replace } = useRouter();

  useEffect(() => {
    if (!range) {
      replace(`/dashboard/${workspaceId}/?range=7d`, {
        scroll: false,
      });
    }
  }, [range, replace, workspaceId]);

  function handleAddDate(val: string) {
    params.set("range", val);
    replace(`?${params.toString()}`, {
      scroll: false,
    });
  }
  const isTaskWeeklyEmpty = taskWeekly?.every((t) => t.completed === 0);
  const isTaskDailyEmpty = statsData?.every((t) => t.tasks === 0);
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

        {statsData === null || isTaskDailyField === "rejected" ? (
          <SectionError />
        ) : isTaskDailyEmpty ? (
          <div className="h-62.5 flex items-center justify-center text-sm text-slate-500">
            No completed tasks in this period
          </div>
        ) : (
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
        )}
      </div>

      {/* Line Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
          Completion Trend
        </h2>

        {taskWeekly === null || isTaskWeeklyField === "rejected" ? (
          <SectionError />
        ) : isTaskWeeklyEmpty ? (
          <div className="h-62.5 flex items-center justify-center text-sm text-slate-500">
            No completion data available
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
