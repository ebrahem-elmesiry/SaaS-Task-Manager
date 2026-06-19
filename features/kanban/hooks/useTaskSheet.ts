"use client";

import { useTaskContext } from "@/context/TaskContext";
import { Status } from "@/types/kanban";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";

const comments = [
  {
    id: "1",
    user_name: "Mike Johnson",
    user_id: "10",
    avatar: "MJ",
    text: "We should also consider implementing 2FA for admin accounts. This would add an extra layer of security.",
    created_at: "2026-04-24T10:30:00",
    replies: [
      {
        id: "4",
        text: '<p><span data-type="mention" class="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 px-1.5 py-0.5 rounded font-medium" data-id="2" data-label="Mike Johnson" data-mention-suggestion-char="@">Mike Johnson</span> </p> Okay',
        user_name: "Ahmed Ali",
        user_id: "1",
        avatar: "EB",
        parent_id: "1",
        created_at: "2026-04-24T10:30:00",
      },
    ],
  },
  {
    id: "2",
    user_name: "Sarah Chen",
    user_id: "2",
    avatar: "SC",
    text: "Good progress on the JWT setup! Make sure to add rate limiting to prevent brute force attacks.",
    created_at: "2026-04-24T10:30:00",
    replies: [
      {
        id: "3",
        user_name: "Mike Johnson",
        user_id: "10",
        text: "No Problem",
        avatar: "EB",
        parent_id: "2",
        created_at: "2026-04-24T10:30:00",
      },
    ],
  },
];

// const subtasks = [
//   { id: "s10", title: "Fix navbar", completed: true },
//   { id: "s11", title: "Fix grid layout", completed: true },
// ];
// const activities = [
//   {
//     id: "1",
//     user: "Sarah Chen",
//     action: "marked",
//     target: "Set up JWT authentication",
//     type: "completed",
//     created_at: "2026-04-24T10:30:00",
//     avatar: "SC",
//   },
//   {
//     id: "2",
//     user: "Mike Johnson",
//     action: "added a comment",
//     target: "",
//     type: "comment",
//     created_at: "2026-04-24T10:30:00",
//     avatar: "MJ",
//   },
//   {
//     id: "3",
//     user: "Sarah Chen",
//     action: "changed priority to",
//     target: "High",
//     type: "updated",
//     created_at: "2026-04-24T10:30:00",
//     avatar: "SC",
//   },
//   {
//     id: "4",
//     user: "Emily Davis",
//     action: "assigned",
//     target: "Sarah Chen",
//     type: "assigned",
//     created_at: "2026-04-24T10:30:00",
//     avatar: "ED",
//   },
// ];

export function useTaskSheet() {
  const { selectedTask, setSelectedTask, setTasks, deleteTask } =
    useTaskContext();
  const [isTaskSheetOpen, setIsTaskSheetOpen] = useState(false);

  const handleTaskClick = (taskId: string, status: Status) => {
    // --------------------------------
    // Fetch Data to get Task Details + comments + activities
    // --------------------------------
    setTasks((prev) => ({
      ...prev,
      [status]: prev[status].map((task) =>
        task.id === taskId
          ? {
              ...task,
              comments:
                task.comments && task.comments?.length > 0
                  ? task.comments
                  : comments,
            }
          : task,
      ),
    }));
    setSelectedTask({
      taskId,
      status,
    });
    setIsTaskSheetOpen(true);
  };

  const deleteFn = async (
    selectedTask: { taskId: string; status: Status | undefined } | null,
  ) => {
    if (!selectedTask) return;
    const { taskId, status } = selectedTask;
    if (!status) return;

    const result = await deleteTask(taskId, status);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
  };

  async function handleDelete(
    e: MouseEvent<HTMLButtonElement>,
    setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>,
  ) {
    e.preventDefault();
    await deleteFn(selectedTask);
    setIsDeleteDialogOpen(false);
    setIsTaskSheetOpen(false);
  }

  const closeSheet = () => {
    setIsTaskSheetOpen(false);
    setSelectedTask(null);
  };

  const isTaskDetailsPending = false;

  return {
    handleDelete,
    closeSheet,
    selectedTask,
    handleTaskClick,
    isTaskSheetOpen,
    setIsTaskSheetOpen,
    isTaskDetailsPending,
  };
}
