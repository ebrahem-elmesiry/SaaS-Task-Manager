import { ActivityType } from "@/types/kanban";
import Link from "next/link";

export default function ActivityComponent({
  activities,
}: {
  activities: ActivityType[];
}) {
  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="space-y-4 max-h-100 overflow-y-auto pr-2"
    >
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-700 last:border-0"
        >
          <Link
            href={`/profile`}
            className={`w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center`}
          >
            <div className="w-2 h-2 rounded-full bg-slate-500" />
          </Link>

          <div>
            <p className="text-sm text-slate-900 dark:text-white">
              <Link href={`/profile`} className="font-medium">
                {activity.user}
              </Link>{" "}
              <span className="text-slate-500">{activity.action}</span>{" "}
              <Link href={`/kanban`} className="font-medium">
                {activity.target}
              </Link>
            </p>

            <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
