import { useMainContext } from "@/context/MainContext";
import { useTaskContext } from "@/context/TaskContext";
import { Comment, Status } from "@/types/kanban";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type ReplyState = {
  commentId: string;
  comment: string;
  name: string;
  user_id?: string;
} | null;

type EditingState = {
  commentId: string;
  replyId?: string;
} | null;

export function useCommentActions(
  status: Status,
  taskId: string,
  // comments: Comment[],
) {
  const { currentUser } = useMainContext();
  const { tasks, setTasks } = useTaskContext();

  const comments = tasks[status].find((task) => task.id === taskId)?.comments;

  const [addComment, setAddComment] = useState("");
  const [editingId, setEditingId] = useState<EditingState>(null);
  const [reply, setReply] = useState<ReplyState>(null);

  const user_id = currentUser.id;
  const user_name = currentUser.name;

  // DELETE
  const handleDelete = (commentId: string, replyId?: string) => {
    setTasks((prev) => {
      const column = prev[status];

      return {
        ...prev,
        [status]: column.map((task) =>
          task.id === taskId
            ? {
                ...task,
                comments: replyId
                  ? task.comments?.map((c) =>
                      c.id === commentId
                        ? {
                            ...c,
                            replies: c.replies?.filter((r) => r.id !== replyId),
                          }
                        : c,
                    )
                  : task.comments?.filter((c) => c.id !== commentId),
              }
            : task,
        ),
      };
    });
  };

  // EDIT INIT
  const handleEditComment = (commentId: string, replyId?: string) => {
    const comment = comments?.find((c) => c.id === commentId);
    if (!comment) return;

    if (replyId) {
      const rep = comment.replies?.find((r) => r.id === replyId);
      setAddComment(rep?.text || "");
      setEditingId({ commentId, replyId });
    } else {
      setAddComment(comment.text);
      setEditingId({ commentId });
    }

    handleCloseReply();
  };

  // EDIT SUBMIT
  const handleSubmitEdit = (commentId: string, replyId?: string) => {
    if (replyId) {
      setTasks((prev) => {
        const column = prev[status];

        return {
          ...prev,
          [status]: column.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  comments: task.comments?.map((c) =>
                    c.id === commentId
                      ? {
                          ...c,
                          replies: c.replies?.map((r) =>
                            r.id === replyId ? { ...r, text: addComment } : r,
                          ),
                        }
                      : c,
                  ),
                }
              : task,
          ),
        };
      });
    } else {
      setTasks((prev) => {
        const column = prev[status];

        return {
          ...prev,
          [status]: column.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  comments: task.comments?.map((c) =>
                    c.id === commentId ? { ...c, text: addComment } : c,
                  ),
                }
              : task,
          ),
        };
      });
    }
    setEditingId(null);
    setAddComment("");
  };

  // ADD COMMENT / REPLY / EDIT ROUTER
  const handleSubmit = () => {
    if (!addComment.trim()) return;
    if (reply) {
      handleAddReply(reply.commentId);
      setAddComment("");
      return;
    }

    if (editingId?.commentId) {
      handleSubmitEdit(editingId.commentId, editingId.replyId);
      return;
    }

    const newComment: Comment = {
      id: uuidv4(),
      user_name,
      user_id,
      text: addComment,
      created_at: new Date().toISOString(),
      avatar: currentUser.avatar || "",
    };

    setTasks((prev) => {
      const column = prev[status];

      return {
        ...prev,
        [status]: column.map((task) =>
          task.id === taskId
            ? {
                ...task,
                comments: [...(task.comments || []), newComment],
              }
            : task,
        ),
      };
    });

    setAddComment("");
  };

  const handleCloseReply = () => {
    setReply(null);
  };
  const handleCloseEdit = () => {
    setEditingId(null);
  };

  // ADD REPLY
  const handleAddReply = (commentId: string) => {
    const newReply: Comment = {
      id: uuidv4(),
      user_name,
      user_id,
      text: addComment,
      created_at: new Date().toISOString(),
      parent_id: commentId,
      avatar: currentUser.avatar || "",
      ...(reply?.user_id && {
        reply_to_user_id: reply.user_id,
      }),
    };

    setTasks((prev) => {
      const column = prev[status];

      return {
        ...prev,
        [status]: column.map((task) =>
          task.id === taskId
            ? {
                ...task,
                comments: task.comments?.map((c) =>
                  c.id === commentId
                    ? {
                        ...c,
                        replies: [...(c.replies || []), newReply],
                      }
                    : c,
                ),
              }
            : task,
        ),
      };
    });

    setReply(null);
  };

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
    editingId,
    reply,
    handleDelete,
    handleEditComment,
    handleSubmit,
    handleSubmitEdit,
    handleMakeReply,
    handleCloseReply,
    setReply,
    setEditingId,
  };
}
