import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { messages } from "@/messages";
import { TaskForm } from "@/validation/task.schema";
import { ColumnsType, Status } from "@/types/kanban";
import { getQueryClient } from "@/lib/get-query-client";
import { useCurrentUserQuery } from "@/features/shared/hooks/useCurrentUser";
import {
  insertTask,
  insertSubtasks,
  insertAssignees,
} from "../handlers/taskHandlers";
import { addTaskToCache } from "../handlers/taskCacheHandlers";
import { logTaskActivity } from "../handlers/taskActivityHandlers";
import { addActivityToCache } from "../../TaskDetailPanel/handlers/cacheHandlers";
import { useParams } from "next/navigation";

export const useAddTask = ({ workspaceId }: { workspaceId: string }) => {
  const { user: currentUser, isPending } = useCurrentUserQuery();

  const queryClient = getQueryClient();
  const supabase = createClient();
  const { projectId } = useParams<{ projectId: string }>();
  const activityUUID = crypto.randomUUID();
  const taskId = crypto.randomUUID();

  if (!currentUser && !isPending) throw new Error("User not found");

  const { isPending: mutationPending, mutate } = useMutation({
    mutationFn: async (data: TaskForm) => {
      await insertTask(supabase, data, taskId, projectId);
      await insertSubtasks(supabase, taskId, data.subtasks);
      await insertAssignees(supabase, taskId, data.assignees);
      await logTaskActivity(supabase, {
        activityUUID,
        workspace_id: workspaceId,
        user_id: currentUser!.id,
        entity_id: taskId,
        taskId: taskId,
        action: "TASK_CREATED",
        metadata: { taskTitle: data.title },
      });
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", projectId],
      });
      const previousData = queryClient.getQueryData<ColumnsType>([
        "tasks",
        projectId,
      ]);

      addTaskToCache(queryClient, projectId, taskId, newData);
      addActivityToCache(queryClient, taskId, {
        activityUUID,
        userId: currentUser!.id,
        userName: currentUser!.name,
        avatarUrl: currentUser!.avatar,
        action: "TASK_CREATED",
        entityId: taskId,
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
      toast.error(messages.task.create.error || (err as Error).message);
    },

    onSuccess: () => {
      toast.success(messages.task.create.success);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });
    },
  });

  return { addTaskPending: mutationPending, addTask: mutate };
};
