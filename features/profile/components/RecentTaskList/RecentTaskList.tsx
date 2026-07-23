import { CheckCircle2, Clock } from "lucide-react";
import { RecentTask } from "@/types/profile";

type Props = {
  tasks: RecentTask[];
};

export default function RecentTaskList({ tasks }: Props) {
  if (tasks.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
        No recent tasks
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <div
            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
              task.status === "done"
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-blue-100 dark:bg-blue-900/30"
            }`}
          >
            {task.status === "done" ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            ) : (
              <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-900 dark:text-white mb-0.5">
              {task.title}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{task.project}</span>
              <span>•</span>
              <span>
                {task.status === "done"
                  ? `Completed ${task.dueDate}`
                  : `Due ${task.dueDate}`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
