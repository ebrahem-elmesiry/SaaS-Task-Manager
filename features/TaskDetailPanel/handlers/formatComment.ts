import { singular } from "@/lib/utils";
import { Comment } from "@/types/kanban";

type CommentDB = {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    id: string;
    full_name: string;
    avatar_url: string;
  }[];
  comment_replies: {
    id: string;
    content: string;
    created_at: string;
    profiles: {
      id: string;
      full_name: string;
      avatar_url: string;
    }[];
  }[];
};

function normalizeDate(dateStr: string): string {
  if (/[+-]\d{2}:\d{2}$/.test(dateStr) || dateStr.endsWith("Z")) {
    return dateStr;
  }
  return dateStr + "Z";
}

export function formatComment(data: CommentDB[]): Comment[] {
  return (
    data.map((c) => ({
      id: c.id,
      user_name: singular(c.profiles)?.full_name,
      user_id: singular(c.profiles)?.id,
      text: c.content,
      avatar: singular(c.profiles)?.avatar_url,
      created_at: normalizeDate(c.created_at),
      replies: c.comment_replies.map((r) => ({
        id: r.id,
        text: r.content,
        parent_id: c.id,
        user_id: singular(r.profiles)?.id,
        user_name: singular(r.profiles)?.full_name,
        avatar: singular(r.profiles)?.avatar_url,
        created_at: normalizeDate(r.created_at),
      })),
    })) || []
  );
}
