import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { messages } from "@/messages";
import { Status, ColumnsType } from "@/types/kanban";
import { getQueryClient } from "@/lib/get-query-client";
import { logTaskActivity } from "../handlers/taskActivityHandlers";
import { addActivityToCache } from "@/features/TaskDetailPanel/handlers/cacheHandlers";
import { useMainContext } from "@/context/MainContext";

export const useDeleteTask = () => {
  const queryClient = getQueryClient();
  const supabase = createClient();
  const { currentUser } = useMainContext();
  const { id: user_id, name: user_name, avatar: avatar_url } = currentUser;
  const activityUUID = crypto.randomUUID();
  async function deleteTask(data: {
    id: string;
    status: Status;
    project_id: string;
  }) {
    await logTaskActivity(supabase, {
      activityUUID,
      workspace_id: "7ad0401e-2da4-4336-a5ad-29e071eeaace",
      user_id,
      action: "TASK_DELETED",
      entity_id: data?.id,
      taskId: data?.id,
    });

    const { error } = await supabase.from("tasks").delete().eq("id", data.id);

    if (error) throw new Error(error.message);
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: deleteTask,

    onMutate: async (data) => {
      const tasks = queryClient.getQueryData<ColumnsType>([
        "tasks",
        data.project_id,
      ]);
      const title = tasks?.[data.status].find((t) => t.id === data.id)
        ?.title as string;

      await queryClient.cancelQueries({ queryKey: ["tasks", data.project_id] });
      const previousData = queryClient.getQueryData<ColumnsType>([
        "tasks",
        data.project_id,
      ]);

      addActivityToCache(queryClient, data.id, {
        activityUUID,
        userId: user_id,
        userName: user_name,
        avatarUrl: avatar_url,
        action: "TASK_DELETED",
        entityId: data.id,
        task: {
          title,
          status: data.status as Status,
          project_id: data.project_id,
        },
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

  return { deleteTaskPending: isPending, deleteTask: mutateAsync };
};
