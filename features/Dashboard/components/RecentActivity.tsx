import { Activity } from "lucide-react";
import { ActivityType } from "@/types/kanban";
import ActivityComponent from "./ActivityComponent";
import ActivityDialogModal from "@/features/shared/components/modals/ActivityDialogModal";

export function RecentActivity({ activities }: { activities: ActivityType[] }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Recent Activity
          </h2>
        </div>

        <ActivityDialogModal activities={activities} />
      </div>

      <ActivityComponent activities={activities} />
    </div>
  );
}
