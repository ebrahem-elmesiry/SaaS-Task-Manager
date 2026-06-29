import { createClient } from "@/lib/supabase/client";

type SupabaseClient = ReturnType<typeof createClient>;

export async function logCommentActivity(
  supabase: SupabaseClient,
  params: {
    activityUUID: string;
    workspace_id: string;
    user_id: string;
    entity_id: string;
    taskId: string;
    action: string;
  },
) {
  const { error } = await supabase.from("activity_log").insert({
    id: params.activityUUID,
    workspace_id: params.workspace_id,
    user_id: params.user_id,
    action: params.action,
    entity_id: params.entity_id,
    taskId: params.taskId,
  });
  if (error) throw new Error(error.message);
}
