import ActivityComponent from "@/features/Dashboard/components/ActivityComponent";
import { ActivityType } from "@/types/kanban";

type ActivityLogProps = {
  activities: ActivityType[];
};

export function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
        Activity Log
      </h4>

      <ActivityComponent activities={activities} />
    </div>
  );
}
