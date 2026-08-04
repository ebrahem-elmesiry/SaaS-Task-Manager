import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { messages } from "@/messages";
import { TaskForm } from "@/validation/task.schema";
import { ColumnsType, Status } from "@/types/kanban";
import { getQueryClient } from "@/lib/get-query-client";
import { useCurrentUserQuery } from "@/features/shared/hooks/useCurrentUser";
import {
  updateTaskBase,
  getCurrentAssignees,
  syncAssignees,
  getCurrentSubtasks,
  syncSubtasks,
} from "../handlers/taskHandlers";
import { updateTaskInCache } from "../handlers/taskCacheHandlers";
import { logTaskActivity } from "../handlers/taskActivityHandlers";
import { addActivityToCache } from "@/features/TaskDetailPanel/handlers/cacheHandlers";
import { useParams } from "next/navigation";

export const useUpdateTask = ({ workspaceId }: { workspaceId: string }) => {
  const { user: currentUser, isPending } = useCurrentUserQuery();
  if (!currentUser && !isPending) throw new Error("User not found");
  const { projectId } = useParams<{ projectId: string }>();
  const queryClient = getQueryClient();
  const supabase = createClient();
  const activityUUID = crypto.randomUUID();

  async function handleUpdateTask(data: TaskForm) {
    await updateTaskBase(supabase, data, projectId);

    const currentSubtasks = await getCurrentSubtasks(supabase, data.id);
    await syncSubtasks(supabase, data.id, currentSubtasks, data.subtasks);

    const currentAssignees = await getCurrentAssignees(supabase, data.id);
    await syncAssignees(supabase, data.id, currentAssignees, data.assignees);

    await logTaskActivity(supabase, {
      activityUUID,
      workspace_id: workspaceId,
      user_id: currentUser!.id,
      entity_id: data.id,
      taskId: data.id,
      action: "TASK_UPDATED",
      metadata: { taskTitle: data.title },
    });
  }

  const { isPending: mutationPending, mutate } = useMutation({
    mutationFn: handleUpdateTask,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", projectId],
      });
      const previousData = queryClient.getQueryData<ColumnsType>([
        "tasks",
        projectId,
      ]);
      updateTaskInCache(queryClient, projectId, newData);
      addActivityToCache(queryClient, newData.id, {
        activityUUID,
        userId: currentUser!.id,
        userName: currentUser!.name,
        avatarUrl: currentUser!.avatar,
        action: "TASK_UPDATED",
        entityId: newData.id,
        task: {
          title: newData.title,
          status: newData.status as Status,
          project_id: projectId,
        },
        metadata: { taskTitle: newData.title },
      });
      return previousData;
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["tasks", projectId], context);
      toast.error(messages.task.update.error || (err as Error).message);
    },

    onSuccess: () => {
      toast.success(messages.task.update.success);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });
    },
  });

  return { updateTaskPending: mutationPending, handleUpdateTask: mutate };
};
