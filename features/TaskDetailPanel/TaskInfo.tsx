import { Label } from "@/components/ui/label";
import { getColorClasses } from "@/lib/utils";
import { Assignee, Status } from "@/types/kanban";
import { Flag, Calendar } from "lucide-react";
import Avatar from "../shared/components/Avatar";

type TaskInfoProps = {
  title: string;
  priority: string;
  status: string;
  assignees: Assignee[];
  dueDate: string;
};

export function TaskInfo({
  title,
  priority,
  status,
  assignees,
  dueDate,
}: TaskInfoProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="px-2.5 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs border border-red-200 dark:border-red-800 flex items-center gap-1">
          <Flag className="w-3 h-3" />
          {priority[0].toLocaleUpperCase() + priority.slice(1)}
        </span>
        <span
          className={`px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs  ${getColorClasses(status as Status)}`}
        >
          {status[0].toUpperCase() + status.slice(1)}
        </span>
        <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-white">
          <Calendar className="w-4 h-4 text-slate-400" />
          {dueDate}
        </div>
      </div>

      <div>
        <Label className="text-xs text-slate-500 dark:text-slate-400 mb-3 block">
          Assignees ({assignees.length})
        </Label>

        <div className="flex flex-col gap-3 max-h-50 overflow-y-auto">
          {assignees.map((user) => (
            <div key={user.id} className="flex items-center gap-1">
              <Avatar
                key={user.id}
                avatar_url={user.avatar_url}
                user_name={user.full_name}
              />
              <span>{user.full_name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
