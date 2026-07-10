import { Status, Task } from "@/types/kanban";
import { move } from "@dnd-kit/helpers";
import { isSortable } from "@dnd-kit/react/sortable";
import { columnTitles } from "@/lib/utils";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/react";
import { getQueryClient } from "@/lib/get-query-client";
import { createClient } from "@/lib/supabase/client";
import { Dispatch, RefObject, SetStateAction } from "react";
import { logTaskActivity } from "./taskActivityHandlers";
import { addActivityToCache } from "@/features/TaskDetailPanel/handlers/cacheHandlers";
import { currentUserType } from "@/types/main";
import { updateTaskStatus } from "./taskCacheHandlers";
import { updateTaskStatusDB } from "./taskHandlers";
import { toast } from "sonner";
import { messages } from "@/messages";

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
  setTasks: Dispatch<SetStateAction<TasksState>>;
}) {
  const { source } = event.operation;
  if (!isSortable(source)) return;

  setTasks((tasks) => move(tasks, event));
}

/* =========================
  3. DRAG END
========================= */
export async function handleDragEndFn({
  tasks,
  event,
  activeCard,
  initialTasks,
  setTasks,
  setActiveCard,
  currentUser,
  workspaceId,
}: {
  tasks: TasksState;
  event: DragEndEvent;
  activeCard?: ActiveCard;
  initialTasks: RefObject<TasksState | null>;
  setTasks: Dispatch<SetStateAction<TasksState>>;
  setActiveCard: (card?: ActiveCard) => void;
  currentUser: currentUserType | null;
  workspaceId: string;
}) {
  if (!currentUser) throw new Error("User not found");
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
  const { group: column, id: taskId } = source;
  const status = column as Status;
  const task = tasks[status].find((t) => t.id === taskId);
  const group = source?.data?.columnId as Status;
  const initialGroup = activeCard?.columnId;

  setActiveCard(undefined);

  if (group !== initialGroup && task) {
    const newStatus = group as Status;
    const columnTitle = columnTitles[newStatus] as Status;
    const queryClient = getQueryClient();
    // update status in cache
    updateTaskStatus({ newStatus, setTasks, taskId: task.id });

    const supabase = createClient();
    try {
      // update status in DB
      await updateTaskStatusDB({
        newStatus,
        taskId: task.id,
      });
      toast.success(messages.taskMove.success(columnTitle));
    } catch (error) {
      console.log("error", error);
      queryClient.invalidateQueries({ queryKey: ["tasks", task.project_id] });
      toast.error(messages.taskMove.error(newStatus));
    }

    const activityUUID = crypto.randomUUID();
    const { id: user_id, name: user_name, avatar: avatar_url } = currentUser;
    await logTaskActivity(supabase, {
      activityUUID,
      workspace_id: workspaceId,
      user_id,
      entity_id: task.id,
      taskId: task.id,
      action: "TASK_MOVED",
      metadata: {
        currentStatus: newStatus,
        initialStatus: initialGroup as Status,
        taskTitle: task.title,
      },
    });
    addActivityToCache(queryClient, task.id, {
      activityUUID,
      userId: user_id,
      userName: user_name,
      avatarUrl: avatar_url,
      action: "TASK_MOVED",
      entityId: task.id,
      task: {
        title: task.title,
        status: task.status,
        project_id: task.project_id,
      },
      metadata: {
        currentStatus: newStatus,
        initialStatus: initialGroup as Status,
        taskTitle: task.title,
      },
    });
  }
}
