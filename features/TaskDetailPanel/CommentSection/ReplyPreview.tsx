import { X } from "lucide-react";

type Reply = {
  name: string;
  comment: string;
};

type ReplyPreviewProps = {
  reply: Reply | null;
  handleCloseReply: () => void;
};

export default function ReplyPreview({
  reply,
  handleCloseReply,
}: ReplyPreviewProps) {
  if (!reply) return null;

  return (
    <div className="mb-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-center">
        <p className="text-xs text-indigo-500 font-medium mb-1">
          Replying to {reply.name ?? "Deleted user"}
        </p>

        <button
          type="button"
          className="cursor-pointer p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-opacity"
          onClick={handleCloseReply}
        >
          <X size={14} />
        </button>
      </div>

      <div
        className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 prose prose-sm dark:prose-invert max-w-none prose-p:m-0"
        dangerouslySetInnerHTML={{
          __html: reply.comment,
        }}
      />
    </div>
  );
}
