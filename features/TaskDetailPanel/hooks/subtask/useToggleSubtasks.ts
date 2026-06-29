import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ColumnsType, Status } from "@/types/kanban";
import { getQueryClient } from "@/lib/get-query-client";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { messages } from "@/messages";

type Props = {
  status: Status;
  taskId: string;
  projectId: string;
};

export function useToggleSubtasks({ status, taskId, projectId }: Props) {
  const queryClient = getQueryClient();
  const supabase = createClient();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const { mutate } = useMutation<
    void,
    Error,
    { subtaskId: string; completed: boolean },
    { previous: ColumnsType | undefined }
  >({
    mutationFn: async ({ subtaskId, completed }) => {
      const { error } = await supabase
        .from("subtasks")
        .update({ completed })
        .eq("id", subtaskId);
      if (error) throw new Error(error.message);
    },

    onMutate: async ({ subtaskId, completed }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", projectId] });
      const previous = queryClient.getQueryData<ColumnsType>([
        "tasks",
        projectId,
      ]);

      queryClient.setQueryData<ColumnsType>(["tasks", projectId], (old) => {
        if (!old) return old;
        return {
          ...old,
          [status]: old[status].map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.map((s) =>
                    s.id === subtaskId ? { ...s, completed } : s,
                  ),
                }
              : task,
          ),
        };
      });

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["tasks", projectId], ctx.previous);
      }
      console.log("error", _err);
      toast.error(messages.task.subtask.error);
    },

    onSettled: () => {
      setPendingId(null);
    },
  });

  const toggleSelect = (subtaskId: string) => {
    if (pendingId) return;

    const currentTasks = queryClient.getQueryData<ColumnsType>([
      "tasks",
      projectId,
    ]);
    const targetSubtask = currentTasks?.[status]
      ?.find((t) => t.id === taskId)
      ?.subtasks?.find((s) => s.id === subtaskId);
    if (!targetSubtask) return;

    setPendingId(subtaskId);
    mutate({ subtaskId, completed: !targetSubtask.completed });
  };

  return { toggleSelect, pendingId };
}
