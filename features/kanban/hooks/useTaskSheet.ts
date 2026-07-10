"use client";

import { useTaskContext } from "@/context/TaskContext";
import { ColumnsType, Status, Task } from "@/types/kanban";
import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import fetchTasks from "../services/fetchTasks";
import { getQueryClient } from "@/lib/get-query-client";

type ActiveCard = Task & {
  columnId: Status;
};

export function useTaskSheet(projectId: string) {
  const { deleteTask, taskToDelete } = useTaskContext();

  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString() ?? "");
  const isTask = searchParams.has("taskId");
  const isStatus = searchParams.has("status");
  const taskId = searchParams.get("taskId");
  const status = searchParams.get("status") as Status;

  const handleTaskClick = (taskId: string, status: Status) => {
    if (!isTask) {
      params.set("taskId", taskId);
      router.replace(`?${params.toString()}`);
    }
    if (!isStatus) {
      params.set("status", status);
      router.replace(`?${params.toString()}`);
    }
  };

  const queryClient = getQueryClient();
  const {
    data,
    isPending: taskPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => fetchTasks(undefined, projectId),
  });

  async function handleDelete(
    e: MouseEvent<HTMLButtonElement>,
    setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>,
    projectId: string,
  ) {
    e.preventDefault();
    if (!taskToDelete) return;
    const title = data?.[taskToDelete.status].find(
      (t) => t.id === taskToDelete.taskId,
    )?.title;
    await deleteTask({
      id: taskToDelete.taskId,
      title,
      status: taskToDelete.status,
      project_id: projectId,
    });
    setIsDeleteDialogOpen(false);
  }

  const closeSheet = () => {
    params.delete("taskId");
    params.delete("status");
    router.replace(`?${params.toString()}`);
  };

  const parentRef = useRef(null);

  const [activeCard, setActiveCard] = useState<ActiveCard | undefined>(
    undefined,
  );

  function updateTasksCache(
    updater: ColumnsType | ((data: ColumnsType) => ColumnsType),
  ) {
    queryClient.setQueryData<ColumnsType>(["tasks", projectId], (old) => {
      if (typeof updater === "function") {
        return updater(
          old || { todo: [], "in-progress": [], review: [], done: [] },
        );
      }
      return updater;
    });
  }

  const initialTasks = useRef<ColumnsType | null>(null);

  return {
    handleTaskClick,
    status,
    closeSheet,
    taskId,
    handleDelete,
    data,
    taskPending,
    error,
    refetch,
    activeCard,
    setActiveCard,
    parentRef,
    initialTasks,
    updateTasksCache,
  };
}
