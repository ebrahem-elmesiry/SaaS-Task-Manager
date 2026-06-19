import { X } from "lucide-react";
import TaskActionsMenu from "../menus/TaskMenu";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useTaskContext } from "@/context/TaskContext";

type TaskHeaderProps = {
  onClose: () => void;
};

export function TaskHeader({ onClose }: TaskHeaderProps) {
  const useRole = "admin";
  const { selectedTask, tasks } = useTaskContext();

  if (!selectedTask || !selectedTask.status) return;

  const task = tasks[selectedTask.status].find(
    (col) => col.id === selectedTask.taskId,
  );

  const taskPreview = task
    ? {
        ...task,
        status: selectedTask.status,
      }
    : null;

  return (
    <SheetHeader className="flex items-center flex-row justify-between p-6 py-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>
        <SheetTitle className="text-lg font-semibold text-slate-900 dark:text-white">
          Task Details
        </SheetTitle>
      </div>
      {useRole === "admin" && (
        <div className="flex items-center gap-2">
          <TaskActionsMenu taskPreview={taskPreview} />
        </div>
      )}
    </SheetHeader>
  );
}
