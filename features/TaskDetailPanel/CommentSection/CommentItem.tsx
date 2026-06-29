import { Button } from "@/components/ui/button";
import ActionsMenu from "../../shared/components/ActionsDropMenu";
import { Comment } from "@/types/kanban";
import { formatTimeAgo } from "@/lib/utils";
import { useMainContext } from "@/context/MainContext";
import Avatar from "@/features/shared/components/Avatar";

type CommentItemProps = {
  // id it's for commentId and replyId
  id: string;
  // commentId only for send commentId instead of send reply id for making reply in same comment
  commentId?: string;
  user_name: string;
  text: string;
  created_at: string;
  avatar: string | undefined;
  user_id: string;

  isReply?: boolean;
  replies?: Comment[];

  expanded?: Record<string, boolean>;
  toggleExpandReply?: (id: string) => void;
  isExpandedReply?: Record<string, boolean>;
  toggleExpand: (id: string) => void;
  MAX_LENGTH?: number;
  isDisabled: boolean;
  onEdit: (id: string, replyId?: string) => void;
  onDelete: (id: string, replyId?: string) => void;
  onReply: (id: string, text: string, name: string, user_id?: string) => void;
  editingId: { commentId: string; replyId?: string } | null;
};

export function CommentItem({
  id,
  user_name,
  text,
  created_at,
  avatar,
  user_id,
  isReply = false,
  replies,
  expanded = {},
  commentId,
  toggleExpand,
  MAX_LENGTH = 200,
  onEdit,
  onDelete,
  onReply,
  isExpandedReply,
  toggleExpandReply,
  isDisabled,
  editingId,
}: CommentItemProps) {
  const { currentUser } = useMainContext();
  const plainText = text.replace(/<[^>]*>/g, "");
  const isLong = plainText.length > MAX_LENGTH;
  const isExpanded = expanded[id];
  const me = currentUser.id;

  const safeCommentId = commentId ?? id;

  const actions =
    user_id !== me
      ? [
          {
            label: "Reply",
            onClick: () =>
              onReply(
                safeCommentId,
                text,
                user_name,
                isReply ? user_id : undefined,
              ),
            commentId: id,
          },
        ]
      : [
          {
            label: "Edit",
            onClick: () => onEdit(safeCommentId, isReply ? id : undefined),
            commentId: id,
          },
          {
            label: "Delete",
            variant: "danger" as const,
            onClick: () => onDelete(safeCommentId, isReply ? id : undefined),
            commentId: id,
          },
          {
            label: "Reply",
            onClick: () =>
              onReply(
                safeCommentId,
                text,
                user_name,
                isReply ? user_id : undefined,
              ),
            commentId: id,
          },
        ];

  return (
    <div className={`flex gap-3 ${isReply ? "gap-2" : ""}`}>
      {/* Avatar */}
      <Avatar avatar_url={avatar} user_name={user_name} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div
          className={`rounded-lg relative
            ${editingId?.commentId === id && isDisabled ? "opacity-50 pointer-events-none" : ""}
          ${
            isReply
              ? "bg-slate-100 dark:bg-slate-700/40 p-2"
              : "bg-slate-50 dark:bg-slate-700/50 p-3"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className={`font-medium text-slate-900 dark:text-white
              ${isReply ? "text-xs" : "text-sm"}`}
            >
              {user_name}
            </span>

            <ActionsMenu actions={actions} />
          </div>
          <div
            className={`text-slate-700 break-all dark:text-slate-300 prose prose-sm dark:prose-invert max-w-none prose-p:m-0
            ${isReply ? "text-xs mt-1" : "text-sm"}
            ${isLong && !isExpanded ? "line-clamp-3" : ""}
            `}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          {isLong && (
            <Button
              variant="link"
              onClick={() => toggleExpand(id)}
              className="text-xs text-indigo-500 pl-0"
            >
              {isExpanded ? "Show less" : "Show more"}
            </Button>
          )}
          <p
            className={`text-slate-400 text-right
            ${isReply ? "text-[10px]" : "text-xs"}`}
          >
            {formatTimeAgo(created_at)}
          </p>
        </div>
        {!isReply && (replies?.length || 0 > 0) && (
          <Button
            variant="link"
            onClick={() => toggleExpandReply?.(id)}
            className="text-xs text-indigo-500 pl-0 mt-1"
          >
            {isExpandedReply?.[id]
              ? "Hide replies"
              : `View replies (${replies?.length})`}
          </Button>
        )}
        {/* Replies */}
        {isExpandedReply?.[id] && !isReply && replies && replies.length > 0 && (
          <div className="mt-3 space-y-3 pl-4 border-l border-slate-200 dark:border-slate-700">
            {replies.map((r) => (
              <CommentItem
                key={r.id}
                {...r}
                isReply
                isDisabled={isDisabled}
                editingId={editingId}
                commentId={r.parent_id}
                expanded={expanded}
                onDelete={onDelete}
                onEdit={onEdit}
                toggleExpand={toggleExpand}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
