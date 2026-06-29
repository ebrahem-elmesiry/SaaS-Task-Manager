import { MessageSquare } from "lucide-react";
import { Assignee, ReplyState } from "@/types/kanban";
import CommentInput from "./CommentInput";
import { Dispatch, SetStateAction } from "react";

type EmptyCommentsStateProps = {
  assignees: Assignee[];
  addComment: string;
  setAddComment: Dispatch<SetStateAction<string>>;
  handleSubmit: () => void;
  isEditing: boolean;
  reply: ReplyState;
  handleCloseReply: () => void;
  isDisabled: boolean;
};

export default function EmptyCommentsState({
  assignees,
  addComment,
  setAddComment,
  handleSubmit,
  isEditing,
  reply,
  handleCloseReply,
  isDisabled,
}: EmptyCommentsStateProps) {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3 flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        Comments (0)
      </h4>

      <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-slate-400 dark:text-slate-500" />
        </div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          No comments yet
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-6 max-w-50">
          Be the first to share your thoughts or updates on this task.
        </p>
      </div>

      <CommentInput
        addComment={addComment}
        setAddComment={setAddComment}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        reply={reply}
        handleCloseReply={handleCloseReply}
        assignees={assignees}
        isDisabled={isDisabled}
      />
    </div>
  );
}
