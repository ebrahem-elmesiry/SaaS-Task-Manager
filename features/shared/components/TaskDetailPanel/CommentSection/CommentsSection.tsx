"use client";

import { MessageSquare } from "lucide-react";
import CommentInput from "./CommentInput";
import { Assignee, Status } from "@/types/kanban";
import { CommentItem } from "./CommentItem";
import { useCommentActions } from "@/features/kanban/hooks/comment/useCommentActions";
import { useCommentUI } from "@/features/kanban/hooks/comment/useCommentUI";

type CommentsSectionProps = {
  status: Status;
  taskId: string;
  assignees: Assignee[];
};

export function CommentsSection({
  status,
  taskId,
  assignees,
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
  } = useCommentActions(
    status,
    taskId,
    // , comments
  );

  const { expanded, isExpandedReply, toggleExpand, toggleExpandReply } =
    useCommentUI();

  return (
    <div>
      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3 flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        Comments ({comments?.length || 0})
      </h4>

      <div className="space-y-4 mb-4">
        {comments?.map((c) => (
          <CommentItem
            key={c.id}
            {...c}
            replies={c.replies}
            expanded={expanded}
            toggleExpand={toggleExpand}
            onEdit={handleEditComment}
            toggleExpandReply={toggleExpandReply}
            onDelete={handleDelete}
            onReply={handleMakeReply}
            isExpandedReply={isExpandedReply}
          />
        ))}
      </div>

      {/* Input */}
      <CommentInput
        addComment={addComment}
        setAddComment={setAddComment}
        handleSubmit={handleSubmit}
        isEditing={!!editingId}
        reply={reply}
        handleCloseReply={handleCloseReply}
        assignees={assignees}
      />
    </div>
  );
}
