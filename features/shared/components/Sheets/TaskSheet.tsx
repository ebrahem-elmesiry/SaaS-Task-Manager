import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { TaskDetailPanel } from "../../../TaskDetailPanel/TaskDetailPanel";
import { TaskHeader } from "../../../TaskDetailPanel/TaskHeader";
import { Task } from "@/types/kanban";

interface TaskSheetProps {
  taskId: string | null;
  closeSheet: () => void;
  task: Task | undefined;
}

export function TaskSheet({ taskId, task, closeSheet }: TaskSheetProps) {
  const isOpen = !!taskId;
  return (
    <Sheet open={isOpen}>
      <SheetContent
        onInteractOutside={closeSheet}
        side="right"
        className="w-full! right-0 md:w-150 p-0 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-2xl [&>button]:hidden"
      >
        <VisuallyHidden>
          <SheetTitle>TaskDetails</SheetTitle>
        </VisuallyHidden>
        {/* Header */}
        <TaskHeader task={task} onClose={closeSheet} />

        {/* Body */}
        <TaskDetailPanel task={task} />
      </SheetContent>
    </Sheet>
  );
}
