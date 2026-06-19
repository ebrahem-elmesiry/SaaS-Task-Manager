"use client";

import { useState } from "react";
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

type ChartsSectionProps = {
  statsData: { name: string; tasks: number }[];
  progressData: { name: string; completed: number }[];
};

const timeOptions = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 3 months", value: "3m" },
];

export function ChartsSection({ statsData, progressData }: ChartsSectionProps) {
  const [timeRange, setTimeRange] = useState("7d");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Bar Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Weekly Activity
          </h2>

          <CustomSelect
            value={timeRange}
            onChange={setTimeRange}
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
          <LineChart data={progressData}>
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
