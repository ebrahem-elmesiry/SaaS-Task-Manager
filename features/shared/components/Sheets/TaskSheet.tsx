import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { TaskDetailPanel } from "../TaskDetailPanel/TaskDetailPanel";
import { TaskHeader } from "../TaskDetailPanel/TaskHeader";
import { ColumnsType, selectedTaskType } from "@/types/kanban";
import { Dispatch, SetStateAction } from "react";

interface TaskSheetProps {
  open: boolean;
  tasks: ColumnsType;
  closeSheet: () => void;
  isTaskDetailsPending: boolean;
  selectedTask: selectedTaskType | null;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export function TaskSheet({
  open,
  tasks,
  closeSheet,
  selectedTask,
  onOpenChange,
  isTaskDetailsPending,
}: TaskSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        onInteractOutside={closeSheet}
        side="right"
        className="w-full! right-0 md:w-150 p-0 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-2xl [&>button]:hidden"
      >
        <VisuallyHidden>
          <SheetTitle>TaskDetails</SheetTitle>
        </VisuallyHidden>
        {/* Header */}
        <TaskHeader onClose={closeSheet} />

        {/* Body */}
        <TaskDetailPanel
          tasks={tasks}
          selectedTask={selectedTask}
          isTaskDetailsPending={isTaskDetailsPending}
        />
      </SheetContent>
    </Sheet>
  );
}
