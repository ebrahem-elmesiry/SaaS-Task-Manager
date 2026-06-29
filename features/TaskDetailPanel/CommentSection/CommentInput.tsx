"use client";

import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { EditorContent } from "@tiptap/react";

import { Assignee, ReplyState } from "@/types/kanban";
import { useCommentEditor } from "@/features/TaskDetailPanel/hooks/comment/useCommentEditor";
import MentionDropdown from "./MentionDropdown";
import ReplyPreview from "./ReplyPreview";

interface Props {
  userAvatar?: string;
  addComment: string;
  setAddComment: Dispatch<SetStateAction<string>>;
  handleSubmit: () => void;
  isEditing: boolean;
  reply: ReplyState;
  handleCloseReply: () => void;
  assignees: Assignee[];
  isDisabled: boolean;
}

export default function CommentInput({
  reply,
  assignees,
  isEditing,
  addComment,
  isDisabled,
  handleSubmit,
  setAddComment,
  handleCloseReply,
  userAvatar = "You",
}: Props) {
  const { editor, suggestionProps, triggerMention, handleFormSubmit } =
    useCommentEditor({
      assignees,
      addComment,
      setAddComment,
      handleSubmit,
    });

  return (
    <form onSubmit={handleFormSubmit} className="flex gap-3 relative">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs shrink-0 select-none">
        {userAvatar}
      </div>

      <div className="flex-1 min-w-0 relative">
        <ReplyPreview reply={reply} handleCloseReply={handleCloseReply} />

        <EditorContent
          editor={editor}
          className="max-w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-indigo-500"
        />

        <MentionDropdown suggestionProps={suggestionProps} />

        <div className="flex items-center justify-between mt-2">
          <Button type="button" variant={"outline"} onClick={triggerMention}>
            <Paperclip className="w-4 h-4 text-slate-400" />
          </Button>

          <Button
            disabled={isDisabled}
            variant="purple"
            className="px-3"
            size={"lg"}
          >
            {isEditing ? "Edit" : "Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
