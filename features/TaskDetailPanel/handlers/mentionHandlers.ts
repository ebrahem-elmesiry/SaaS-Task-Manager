import { createClient } from "@/lib/supabase/client";

type SupabaseClient = ReturnType<typeof createClient>;

export function extractMentionedIds(html: string): string[] {
  const regex = /data-id="([^"]+)"/g;
  const matches = [...html.matchAll(regex)];
  return [...new Set(matches.map((m) => m[1]))];
}

export async function insertMentions(
  supabase: SupabaseClient,
  params: {
    text: string;
    entityId: string;
    entityType: "comment_id" | "reply_id";
  },
) {
  const mentionedIds = extractMentionedIds(params.text);
  if (mentionedIds.length === 0) return;

  const { error } = await supabase.from("mentions").insert(
    mentionedIds.map((mentioned_user_id) => ({
      [params.entityType]: params.entityId,
      mentioned_user_id,
    })),
  );
  if (error) throw new Error(error.message);
}
