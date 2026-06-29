import { QueryClient } from "@tanstack/react-query";
import { ColumnsType, Priority, Status, Task } from "@/types/kanban";
import type { TaskForm } from "@/validation/task.schema";
import { formatDate } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

export function addTaskToCache(
  queryClient: QueryClient,
  projectId: string,
  taskId: string,
  newData: TaskForm,
) {
  queryClient.setQueryData<ColumnsType>(["tasks", projectId], (old) => {
    if (!old) return old;
    const status = newData.status as Status;
    const priority = newData.priority as Priority;
    const newTask: Task = {
      id: taskId,
      title: newData.title,
      description: newData.description,
      priority,
      project_id: newData.project_id,
      dueDate: formatDate(newData.dueDate),
      status,
      assignees: newData.assignees,
      subtasks: newData.subtasks,
      commentsCount: 0,
      attachments: 0,
    };
    return {
      ...old,
      [status]: [newTask, ...old[status]],
    };
  });
}

export function updateTaskInCache(
  queryClient: QueryClient,
  projectId: string,
  newData: TaskForm,
) {
  queryClient.setQueryData<ColumnsType>(["tasks", projectId], (old) => {
    if (!old) return old;
    const status = newData.status as Status;
    const priority = newData.priority as Priority;
    const updatedTask: Task = {
      id: newData.id,
      title: newData.title,
      description: newData.description,
      priority,
      project_id: newData.project_id,
      dueDate: formatDate(newData.dueDate),
      status,
      assignees: newData.assignees,
      subtasks: newData.subtasks,
      commentsCount: 0,
      attachments: 0,
    };
    const newState = { ...old };
    for (const key of Object.keys(newState) as Status[]) {
      newState[key] = newState[key].filter((t) => t.id !== newData.id);
    }
    newState[status] = [updatedTask, ...newState[status]];
    return newState;
  });
}

interface Props {
  newStatus: Status;
  setTasks: Dispatch<SetStateAction<ColumnsType>>;
  taskId: string;
}

export function updateTaskStatus({ newStatus, setTasks, taskId }: Props) {
  setTasks((prev) => {
    const updated = { ...prev };
    updated[newStatus] = updated[newStatus].map((t: Task) =>
      t.id === taskId ? { ...t, status: newStatus } : t,
    );
    return updated;
  });
}
