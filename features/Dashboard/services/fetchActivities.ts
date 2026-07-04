import { formatActivity } from "@/features/TaskDetailPanel/handlers/formatActivity";
import { createClient } from "@/lib/supabase/server";

export default async function fetchActivities() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activity_log")
    .select(
      `*,
    tasks(id,title,status,project_id),
    profiles(id,full_name,avatar_url)
    `,
    )
    .limit(5)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("error comments", error);
    throw new Error(error.message);
  }

  const formatData = formatActivity(data);

  return formatData || [];
}
