import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { messages } from "@/messages";
import { createClient } from "@/lib/supabase/client";
import { getQueryClient } from "@/lib/get-query-client";
import { useMainContext } from "@/context/MainContext";
import { Comment, Task } from "@/types/kanban";
import {
  addComment,
  addReply,
  deleteComment,
  deleteReply,
} from "../../handlers/commentHandlers";
import { insertMentions } from "../../handlers/mentionHandlers";
import { logCommentActivity } from "../../handlers/activityHandlers";
import {
  addCommentToCache,
  addReplyToCache,
  addActivityToCache,
  removeCommentFromCache,
  removeReplyFromCache,
} from "../../handlers/cacheHandlers";

export function useDeleteCommentMutation(
  taskId: string,
  task: Task | undefined,
) {
  const { currentUser } = useMainContext();
  const { id: user_id, name: user_name, avatar: avatar_url } = currentUser;

  const queryClient = getQueryClient();
  const supabase = createClient();
  const activityUUID = crypto.randomUUID();
  return useMutation({
    mutationFn: async (params: { commentId: string; replyId?: string }) => {
      if (params.replyId) {
        await deleteReply(supabase, { id: params.replyId });
      } else {
        await deleteComment(supabase, { id: params.commentId });
        await logCommentActivity(supabase, {
          activityUUID,
          workspace_id: "7ad0401e-2da4-4336-a5ad-29e071eeaace",
          user_id,
          entity_id: params.commentId,
          taskId,
          action: "COMMENT_DELETED",
        });
      }
    },

    onMutate: async (params) => {
      await queryClient.cancelQueries({ queryKey: ["comments", taskId] });
      const previous = queryClient.getQueryData<Comment[]>([
        "comments",
        taskId,
      ]);

      if (params.replyId) {
        removeReplyFromCache(queryClient, taskId, {
          commentId: params.commentId,
          replyId: params.replyId,
        });
      } else {
        if (!task) throw new Error("Task is required");
        removeCommentFromCache(queryClient, taskId, params.commentId);
        addActivityToCache(queryClient, taskId, {
          activityUUID,
          userId: user_id,
          userName: user_name,
          avatarUrl: avatar_url,
          action: "COMMENT_DELETED",
          entityId: params.commentId,
          task: {
            title: task.title,
            status: task.status,
            project_id: task.project_id,
          },
        });
      }

      return previous;
    },

    onError: (err, _variables, context) => {
      queryClient.setQueryData(["comments", taskId], context);
      toast.error(
        messages.task.comments.delete.error || (err as Error).message,
      );
    },

    onSettled: () => {
      toast.success(messages.task.comments.delete.success);
      queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
    },
  });
}

export function useEditCommentMutation(taskId: string) {
  const queryClient = getQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (params: {
      commentId: string;
      replyId?: string;
      text: string;
    }) => {
      if (params.replyId) {
        const { error } = await supabase
          .from("comment_replies")
          .update({ content: params.text })
          .eq("id", params.replyId);
        if (error) throw new Error(error.message);
      } else {
        const { error } = await supabase
          .from("comments")
          .update({ content: params.text })
          .eq("id", params.commentId);
        if (error) throw new Error(error.message);
      }
    },

    onMutate: async (params) => {
      await queryClient.cancelQueries({ queryKey: ["comments", taskId] });
      const previous = queryClient.getQueryData<Comment[]>([
        "comments",
        taskId,
      ]);

      queryClient.setQueryData<Comment[]>(["comments", taskId], (old) => {
        if (params.replyId) {
          return old?.map((c) =>
            c.id === params.commentId
              ? {
                  ...c,
                  replies: c.replies?.map((r) =>
                    r.id === params.replyId ? { ...r, text: params.text } : r,
                  ),
                }
              : c,
          );
        }
        return old?.map((c) =>
          c.id === params.commentId ? { ...c, text: params.text } : c,
        );
      });

      return previous;
    },

    onError: (err, _variables, context) => {
      queryClient.setQueryData(["comments", taskId], context);
      toast.error(
        messages.task.comments.update.error || (err as Error).message,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
    },
  });
}

export function useAddCommentMutation(taskId: string, task: Task | undefined) {
  const { currentUser } = useMainContext();
  const { id: user_id, name: user_name, avatar: avatar_url } = currentUser;

  const queryClient = getQueryClient();
  const supabase = createClient();

  const activityUUID = crypto.randomUUID();

  return useMutation({
    mutationFn: async (params: {
      text: string;
      id: string;
      reply?: { commentId: string; user_id?: string } | null;
    }) => {
      if (params.reply) {
        await addReply(supabase, {
          id: params.id,
          comment_id: params.reply.commentId,
          user_id,
          content: params.text,
        });
        await insertMentions(supabase, {
          text: params.text,
          entityId: params.id,
          entityType: "reply_id",
        });
      } else {
        await addComment(supabase, {
          id: params.id,
          task_id: taskId,
          user_id,
          content: params.text,
        });
        await insertMentions(supabase, {
          text: params.text,
          entityId: params.id,
          entityType: "comment_id",
        });
        await logCommentActivity(supabase, {
          activityUUID,
          workspace_id: "7ad0401e-2da4-4336-a5ad-29e071eeaace",
          user_id,
          entity_id: params.id,
          taskId,
          action: "COMMENT_ADDED",
        });
      }
    },

    onMutate: async (params) => {
      await queryClient.cancelQueries({ queryKey: ["comments", taskId] });
      const previous = queryClient.getQueryData<Comment[]>([
        "comments",
        taskId,
      ]);

      if (params.reply) {
        addReplyToCache(queryClient, taskId, {
          id: params.id,
          commentId: params.reply.commentId,
          currentUser,
          userId: user_id,
          text: params.text,
          replyUserId: params.reply.user_id,
        });
      } else {
        addCommentToCache(queryClient, taskId, {
          id: params.id,
          currentUser,
          userId: user_id,
          text: params.text,
        });
        if (!task) throw new Error("Task is required");
        addActivityToCache(queryClient, taskId, {
          activityUUID,
          userId: user_id,
          userName: user_name,
          avatarUrl: avatar_url,
          action: "COMMENT_ADDED",
          entityId: params.id,
          task: {
            title: task.title,
            status: task.status,
            project_id: task.project_id,
          },
        });
      }

      return previous;
    },

    onError: (err, _variables, context) => {
      queryClient.setQueryData(["comments", taskId], context);
      toast.error(messages.task.comments.add.error || (err as Error).message);
    },

    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
    },
  });
}
