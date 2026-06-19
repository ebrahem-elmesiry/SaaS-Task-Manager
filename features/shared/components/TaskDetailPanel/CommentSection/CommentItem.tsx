import { Button } from "@/components/ui/button";
import ActionsMenu from "../../ActionsDropMenu";
import { Comment } from "@/types/kanban";
import { formatTimeAgo } from "@/lib/utils";
import { useMainContext } from "@/context/MainContext";

type CommentItemProps = {
  // id it's for commentId and replyId
  id: string;
  // commentId only for send commentId instead of send reply id for making reply in same comment
  commentId?: string;
  user_name: string;
  text: string;
  created_at: string;
  avatar: string;
  user_id: string;

  isReply?: boolean;
  replies?: Comment[];

  expanded?: Record<string, boolean>;
  toggleExpandReply?: (id: string) => void;
  isExpandedReply?: Record<string, boolean>;
  toggleExpand: (id: string) => void;
  MAX_LENGTH?: number;

  onEdit: (id: string, replyId?: string) => void;
  onDelete: (id: string, replyId?: string) => void;
  onReply?: (id: string, text: string, name: string, user_id?: string) => void;
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
}: CommentItemProps) {
  const { currentUser } = useMainContext();
  const plainText = text.replace(/<[^>]*>/g, "");
  const isLong = plainText.length > MAX_LENGTH;
  const isExpanded = expanded[id];
  const me = currentUser.id;

  const actions =
    user_id !== me
      ? [
          {
            label: "Reply",
            onClick: () =>
              onReply?.(
                isReply ? commentId || "" : id,
                text,
                user_name,
                isReply ? user_id : "",
              ),
            commentId: id,
          },
        ]
      : [
          {
            label: "Edit",
            onClick: () =>
              onEdit?.(isReply ? commentId || "" : id, isReply ? id : ""),
            commentId: id,
          },
          {
            label: "Delete",
            variant: "danger" as const,
            onClick: () =>
              onDelete?.(isReply ? commentId || "" : id, isReply ? id : ""),
            commentId: id,
          },
          {
            label: "Reply",
            onClick: () =>
              onReply?.(
                isReply ? commentId || "" : id,
                text,
                user_name,
                isReply ? user_id : "",
              ),
            commentId: id,
          },
        ];

  return (
    <div className={`flex gap-3 ${isReply ? "gap-2" : ""}`}>
      {/* Avatar */}
      <div
        className={`rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0
        ${isReply ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-xs"}`}
      >
        {avatar}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div
          className={`rounded-lg relative
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
            ${isLong && !isExpanded ? "line-clamp-3" : ""}`}
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
