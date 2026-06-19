import { UserStat } from "@/types/profile";

type Props = {
  stats: UserStat[];
};

export default function ProfileStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const colorClasses = {
          "Tasks Completed":
            "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
          "In Progress":
            "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
          "Active Projects":
            "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
        };

        return (
          <div
            key={stat.label}
            className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  colorClasses[stat.label as keyof typeof colorClasses]
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
