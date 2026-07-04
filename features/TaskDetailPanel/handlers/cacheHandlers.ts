import { QueryClient } from "@tanstack/react-query";
import { ActivityType, Comment, Metadata, Status } from "@/types/kanban";
import { formatTimeAgo } from "@/lib/utils";
import type { currentUserType } from "@/types/main";

type actionType =
  | "COMMENT_ADDED"
  | "COMMENT_DELETED"
  | "TASK_CREATED"
  | "TASK_UPDATED"
  | "TASK_DELETED"
  | "TASK_ASSIGNED"
  | "TASK_MOVED";

export function addCommentToCache(
  queryClient: QueryClient,
  taskId: string,
  params: {
    id: string;
    currentUser: currentUserType;
    userId: string;
    text: string;
  },
) {
  const newComment: Comment = {
    id: params.id,
    user_name: params.currentUser.name,
    user_id: params.userId,
    text: params.text,
    created_at: new Date().toISOString(),
    avatar: params.currentUser.avatar,
  };
  queryClient.setQueryData<Comment[]>(["comments", taskId], (old) => {
    return [...(old || []), newComment];
  });
}

export function addReplyToCache(
  queryClient: QueryClient,
  taskId: string,
  params: {
    id: string;
    commentId: string;
    currentUser: currentUserType;
    userId: string;
    text: string;
    replyUserId?: string;
  },
) {
  const newReply: Comment = {
    id: params.id,
    user_name: params.currentUser.name,
    user_id: params.userId,
    text: params.text,
    created_at: new Date().toISOString(),
    parent_id: params.commentId,
    avatar: params.currentUser.avatar,
    ...(params.replyUserId && { reply_to_user_id: params.replyUserId }),
  };
  queryClient.setQueryData<Comment[]>(["comments", taskId], (old) => {
    return old?.map((c) =>
      c.id === params.commentId
        ? { ...c, replies: [...(c.replies || []), newReply] }
        : c,
    );
  });
}

type ActivityWithoutCreatedAt = Omit<ActivityType, "created_at">;
export function addActivityToCache(
  queryClient: QueryClient,
  taskId: string,
  params: {
    action: actionType;
    activityUUID: string;
    userId: string;
    userName: string;
    avatarUrl: string | undefined;
    entityId: string;
    task?: { title: string; status: Status; project_id: string };
    metadata?: Metadata;
  },
) {
  const newActivity = {
    id: params.activityUUID,
    user: {
      id: params.userId,
      full_name: params.userName,
      avatar_url: params.avatarUrl,
    },
    action: params.action,
    target: params.entityId,
    time: formatTimeAgo(new Date().toISOString()),
    task: params.task
      ? {
          id: taskId,
          title: params.task?.title,
          status: params.task?.status,
          project_id: params.task?.project_id,
        }
      : undefined,
    metadata: params.metadata,
  };
  queryClient.setQueryData<ActivityWithoutCreatedAt[]>(
    ["activity", taskId],
    (old) => {
      return [...(old || []), newActivity];
    },
  );
}

export function removeCommentFromCache(
  queryClient: QueryClient,
  taskId: string,
  commentId: string,
) {
  queryClient.setQueryData<Comment[]>(["comments", taskId], (old) => {
    return old?.filter((c) => c.id !== commentId);
  });
}

export function removeReplyFromCache(
  queryClient: QueryClient,
  taskId: string,
  params: { commentId: string; replyId: string },
) {
  queryClient.setQueryData<Comment[]>(["comments", taskId], (old) => {
    return old?.map((c) =>
      c.id === params.commentId
        ? {
            ...c,
            replies: c.replies?.filter((r) => r.id !== params.replyId),
          }
        : c,
    );
  });
}
