import { ReactNode } from "react";

type StatItem = {
  icon: ReactNode;
  badge: string;
  badgeColor: string;
  value: string;
  label: string;
};

type StatsCardsProps = {
  items: StatItem[];
};

export async function StatsCards({ items }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900/30 rounded-lg flex items-center justify-center">
              {item.icon}
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full ${item.badgeColor}`}
            >
              {item.badge}
            </span>
          </div>

          <div className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">
            {item.value}
          </div>

          <div className="text-sm text-slate-500 dark:text-slate-400">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
