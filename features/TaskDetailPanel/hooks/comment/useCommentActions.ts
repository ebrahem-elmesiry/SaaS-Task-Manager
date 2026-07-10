import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ColumnsType, Comment, ReplyState, Status } from "@/types/kanban";
import { getQueryClient } from "@/lib/get-query-client";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} from "./useCommentMutations";
import { formatComment } from "../../handlers/formatComment";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

type CommentTargetState = {
  commentId: string;
  replyId?: string;
} | null;

export function useCommentActions(taskId: string, status: Status) {
  const queryClient = getQueryClient();

  async function getCommentFromDB(taskId: string) {
    const supabase = createClient();
    if (!taskId) return [];
    const { data, error } = await supabase
      .from("comments")
      .select(
        `id,content,created_at,
            profiles(id,full_name,avatar_url),
            comment_replies(
            id,content,created_at,
            profiles(id,full_name,avatar_url)
            )
          `,
      )
      .eq("task_id", taskId);
    if (error) {
      console.log("error comments", error);
      throw new Error(error.message);
    }

    const formatData = formatComment(data);
    queryClient.setQueryData<Comment[]>(["comments", taskId], formatData);
    return formatData || [];
  }
  const { data: comments, isPending } = useQuery({
    queryKey: ["comments", taskId],
    queryFn: () => {
      if (taskId) return getCommentFromDB(taskId);
    },
    enabled: !!taskId,
    staleTime: 60 * 1000,
  });

  const [addComment, setAddComment] = useState("");
  const [editingId, setEditingId] = useState<CommentTargetState>(null);
  const [deleteTarget, setDeleteTarget] = useState<CommentTargetState | null>(
    null,
  );
  const [reply, setReply] = useState<ReplyState>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { projectId, workspaceId } = useParams<{
    projectId: string;
    workspaceId: string;
  }>();
  const tasks = queryClient.getQueryData<ColumnsType>(["tasks", projectId]);
  const task = tasks?.[status].find((t) => t.id === taskId);

  const deleteMutation = useDeleteCommentMutation(taskId, task, workspaceId);
  const editMutation = useEditCommentMutation(taskId);
  const addMutation = useAddCommentMutation(taskId, task, workspaceId);

  function handleDelete(commentId: string, replyId?: string) {
    setDeleteTarget({ commentId, replyId });
    setIsDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget);
    setIsDeleteDialogOpen(false);
    setDeleteTarget(null);
  }

  function handleEditComment(commentId: string, replyId?: string) {
    const comment = comments?.find((c) => c.id === commentId);
    if (!comment) return;

    if (replyId) {
      const rep = comment.replies?.find((r) => r.id === replyId);
      if (!rep?.text) return;
      setAddComment(rep?.text);
      setEditingId({ commentId, replyId });
    } else {
      setAddComment(comment.text);
      setEditingId({ commentId });
    }

    handleCloseReply();
  }

  function handleSubmit() {
    if (!addComment.trim()) return;

    if (editingId?.commentId) {
      editMutation.mutate(
        {
          commentId: editingId.commentId,
          replyId: editingId.replyId,
          text: addComment,
        },
        {
          onSuccess: () => {
            setEditingId(null);
            setAddComment("");
          },
        },
      );
      return;
    }

    addMutation.mutate(
      { text: addComment, id: uuidv4(), reply },
      {
        onSuccess: () => {
          setAddComment("");
          setReply(null);
        },
      },
    );
  }

  const handleCloseReply = () => setReply(null);

  const handleCloseEdit = () => setEditingId(null);

  const handleMakeReply = (
    commentId: string,
    text: string,
    name: string,
    user_id?: string,
  ) => {
    setReply({ commentId, comment: text, name, user_id });
    handleCloseEdit();
  };

  return {
    comments,
    addComment,
    setAddComment,
    reply,
    setReply,
    confirmDelete,
    handleDelete,
    handleEditComment,
    handleSubmit,
    handleMakeReply,
    handleCloseReply,
    editingId,
    setEditingId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isDeleting: deleteMutation.isPending,
    isEditingLoading: editMutation.isPending,
    isAdding: addMutation.isPending,
    isPending,
  };
}
