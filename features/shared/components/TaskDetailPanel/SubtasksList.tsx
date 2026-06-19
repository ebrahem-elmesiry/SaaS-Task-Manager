"use client";

import { Status, Subtask } from "@/types/kanban";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToggleSubtasks } from "@/features/kanban/hooks/useToggleSubtasks";

type SubtasksListProps = {
  subtasks: Subtask[];
  status: Status;
  taskId: string;
};

export function SubtasksList({ subtasks, status, taskId }: SubtasksListProps) {
  const { toggleSelect } = useToggleSubtasks({
    status,
    taskId,
  });
  const completedSubtasks = subtasks.filter((s) => s.completed).length;
  return (
    <div className="max-h-75 overflow-y-auto">
      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
        Subtasks ({completedSubtasks}/{subtasks.length})
      </h4>

      <div className="space-y-2">
        {subtasks.map((subtask) => {
          return (
            <Label
              htmlFor={subtask.id}
              key={subtask.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
            >
              {/* shadcn checkbox */}
              <Checkbox
                id={subtask.id}
                checked={subtask.completed}
                onCheckedChange={() => toggleSelect(subtask.id)}
              />

              <span
                className={`text-sm flex-1 ${
                  subtask.completed
                    ? "line-through text-slate-400 dark:text-slate-500"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                {subtask.title}
              </span>
            </Label>
          );
        })}
      </div>
    </div>
  );
}
