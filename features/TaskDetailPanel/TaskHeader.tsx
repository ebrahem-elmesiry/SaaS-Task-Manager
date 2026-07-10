import { X } from "lucide-react";
import TaskActionsMenu from "../shared/components/menus/TaskMenu";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Task } from "@/types/kanban";
import EmptyTaskDetails from "./EmptyTaskDetails";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";

type TaskHeaderProps = {
  onClose: () => void;
  task: Task | undefined;
};

export function TaskHeader({ onClose, task }: TaskHeaderProps) {
  const currentUser = useCurrentUser();

  if (!task) return <EmptyTaskDetails />;

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
      {currentUser?.role !== "member" && (
        <div className="flex items-center gap-2">
          <TaskActionsMenu taskPreview={task} />
        </div>
      )}
    </SheetHeader>
  );
}
