import { Status, Task } from "@/types/kanban";
import { move } from "@dnd-kit/helpers";
import { isSortable } from "@dnd-kit/react/sortable";
import { toast } from "sonner";
import { messages } from "@/messages";
import { columnTitles } from "@/lib/utils";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/react";

type ActiveCard = Task & {
  columnId: Status;
};

type TasksState = Record<Status, Task[]>;

/* =========================
  1. DRAG START
========================= */
export function handleDragStartFn({
  event,
  tasks,
  setActiveCard,
  setInitialTasks,
}: {
  event: DragStartEvent;
  tasks: TasksState;
  setActiveCard: (card?: ActiveCard) => void;
  setInitialTasks: (tasks: TasksState) => void;
}) {
  setInitialTasks(tasks);

  const { source } = event.operation;
  if (!isSortable(source)) return;

  const { group: column, id: taskId } = source;
  const status = column as Status;

  const task = tasks[status].find((t) => t.id === taskId);

  if (task) {
    setActiveCard({ ...task, columnId: status });
  }
}

/* =========================
  2. DRAG OVER
========================= */
export function handleDragOverFn({
  event,
  setTasks,
}: {
  event: DragOverEvent;
  setTasks: React.Dispatch<React.SetStateAction<TasksState>>;
}) {
  const { source } = event.operation;
  if (!isSortable(source)) return;

  setTasks((tasks) => move(tasks, event));
}

/* =========================
  3. DRAG END
========================= */
export function handleDragEndFn({
  event,
  activeCard,
  initialTasks,
  setTasks,
  setActiveCard,
}: {
  event: DragEndEvent;
  activeCard?: ActiveCard;
  initialTasks: React.MutableRefObject<TasksState | null>;
  setTasks: React.Dispatch<React.SetStateAction<TasksState>>;
  setActiveCard: (card?: ActiveCard) => void;
}) {
  // rollback if canceled
  if (event.canceled && initialTasks.current) {
    setTasks(initialTasks.current);
    setActiveCard(undefined);
    return;
  }

  const { source } = event.operation;
  if (!isSortable(source)) {
    setActiveCard(undefined);
    return;
  }

  const group = source?.data?.columnId as Status;
  const initialGroup = activeCard?.columnId;

  if (group !== initialGroup) {
    const columnTitle = columnTitles[group] as Status;
    toast.success(messages.taskMove.success(columnTitle));
  }

  setActiveCard(undefined);

  // TODO: API update here
}
