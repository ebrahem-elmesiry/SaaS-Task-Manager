import { createClient } from "@/lib/supabase/client";

type SupabaseClient = ReturnType<typeof createClient>;

export async function addComment(
  supabase: SupabaseClient,
  params: { id: string; task_id: string; user_id: string; content: string },
) {
  const { error } = await supabase.from("comments").insert({
    id: params.id,
    task_id: params.task_id,
    user_id: params.user_id,
    content: params.content,
  });
  if (error) throw new Error(error.message);
}

export async function deleteComment(
  supabase: SupabaseClient,
  params: { id: string },
) {
  const { error } = await supabase.from("comments").delete().eq("id", params.id);
  if (error) throw new Error(error.message);
}

export async function deleteReply(
  supabase: SupabaseClient,
  params: { id: string },
) {
  const { error } = await supabase.from("comment_replies").delete().eq("id", params.id);
  if (error) throw new Error(error.message);
}

export async function addReply(
  supabase: SupabaseClient,
  params: { id: string; comment_id: string; user_id: string; content: string },
) {
  const { error } = await supabase.from("comment_replies").insert({
    id: params.id,
    comment_id: params.comment_id,
    user_id: params.user_id,
    content: params.content,
  });
  if (error) throw new Error(error.message);
}
