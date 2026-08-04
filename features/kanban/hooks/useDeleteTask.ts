import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { messages } from "@/messages";
import { Status, ColumnsType } from "@/types/kanban";
import { getQueryClient } from "@/lib/get-query-client";
import { logTaskActivity } from "../handlers/taskActivityHandlers";
import { addActivityToCache } from "@/features/TaskDetailPanel/handlers/cacheHandlers";
import { useCurrentUserQuery } from "@/features/shared/hooks/useCurrentUser";

export const useDeleteTask = ({ workspaceId }: { workspaceId: string }) => {
  const queryClient = getQueryClient();
  const supabase = createClient();
  const { user: currentUser, isPending } = useCurrentUserQuery();
  if (!currentUser && !isPending) throw new Error("User not found");

  const activityUUID = crypto.randomUUID();
  async function deleteTask(data: {
    id: string;
    status: Status;
    title: string | undefined;
    project_id: string;
  }) {
    await logTaskActivity(supabase, {
      activityUUID,
      workspace_id: workspaceId,
      user_id: currentUser!.id,
      action: "TASK_DELETED",
      entity_id: data?.id,
      taskId: data?.id,
      metadata: { taskTitle: data.title, deletedBy: currentUser!.name },
    });

    const { error } = await supabase.from("tasks").delete().eq("id", data.id);

    if (error) throw new Error(error.message);
  }

  const { isPending: mutationPending, mutateAsync } = useMutation({
    mutationFn: deleteTask,

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", data.project_id] });
      const previousData = queryClient.getQueryData<ColumnsType>([
        "tasks",
        data.project_id,
      ]);
      addActivityToCache(queryClient, data.id, {
        activityUUID,
        userId: currentUser!.id,
        userName: currentUser!.name,
        avatarUrl: currentUser!.avatar,
        action: "TASK_DELETED",
        entityId: data.id,
        metadata: { taskTitle: data.title, deletedBy: currentUser!.name },
      });

      queryClient.setQueryData<ColumnsType>(
        ["tasks", data.project_id],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            [data.status]: old[data.status].filter((t) => t.id !== data.id),
          };
        },
      );

      return previousData;
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["tasks", variables.project_id], context);
      toast.error(messages.task.delete.error || err.message);
    },

    onSuccess: () => {
      toast.success(messages.task.delete.success);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.project_id],
      });
    },
  });

  return { deleteTaskPending: mutationPending, deleteTask: mutateAsync };
};
