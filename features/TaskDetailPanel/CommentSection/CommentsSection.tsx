"use client";

import { MessageSquare } from "lucide-react";
import { Assignee, Status } from "@/types/kanban";
import { CommentItem } from "./CommentItem";
import { useCommentActions } from "@/features/TaskDetailPanel/hooks/comment/useCommentActions";
import { useCommentUI } from "@/features/TaskDetailPanel/hooks/comment/useCommentUI";
import AlertDeleteDialog from "../../shared/components/Alerts/AlertDeleteDialog";
import CommentSectionLoader from "./CommentSectionLoader";
import EmptyCommentsState from "./EmptyCommentsState";
import CommentInput from "./CommentInput";

type CommentsSectionProps = {
  taskId: string;
  status: Status;
  assignees: Assignee[];
  commentsCount: number;
};

export function CommentsSection({
  status,
  taskId,
  assignees,
  commentsCount,
}: CommentsSectionProps) {
  const {
    comments,
    addComment,
    setAddComment,
    handleSubmit,
    handleDelete,
    handleEditComment,
    handleCloseReply,
    handleMakeReply,
    reply,
    editingId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    confirmDelete,
    isDeleting,
    isEditingLoading,
    isAdding,
    isPending,
  } = useCommentActions(taskId, status);

  const { expanded, isExpandedReply, toggleExpand, toggleExpandReply } =
    useCommentUI();

  const isDisabled = isDeleting || isEditingLoading || isAdding;

  if (isPending) return <CommentSectionLoader commentsCount={commentsCount} />;
  if (comments?.length === 0 || !comments)
    return (
      <EmptyCommentsState
        assignees={assignees}
        addComment={addComment}
        setAddComment={setAddComment}
        handleSubmit={handleSubmit}
        isEditing={!!editingId?.commentId}
        reply={reply}
        handleCloseReply={handleCloseReply}
        isDisabled={isDisabled}
      />
    );
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3 flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        Comments ({comments?.length || 0})
      </h4>

      <div className="space-y-4 mb-4">
        {comments.map((c) => (
          <CommentItem
            key={c.id}
            {...c}
            replies={c.replies}
            expanded={expanded}
            isDisabled={isDisabled}
            toggleExpand={toggleExpand}
            onEdit={handleEditComment}
            toggleExpandReply={toggleExpandReply}
            onDelete={handleDelete}
            onReply={handleMakeReply}
            isExpandedReply={isExpandedReply}
            editingId={editingId}
          />
        ))}
      </div>

      <div className={isAdding ? "opacity-50 pointer-events-none" : ""}>
        <CommentInput
          addComment={addComment}
          setAddComment={setAddComment}
          handleSubmit={handleSubmit}
          isEditing={!!editingId?.commentId}
          reply={reply}
          handleCloseReply={handleCloseReply}
          assignees={assignees}
          isDisabled={isDisabled}
        />
      </div>

      <AlertDeleteDialog
        title="Delete this comment?"
        description="This action cannot be undone. This will permanently delete this comment and all related replies from our servers."
        buttonText="Yes, delete comment"
        Loading={isDeleting}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onClick={async () => {
          await confirmDelete();
        }}
      />
    </div>
  );
}
