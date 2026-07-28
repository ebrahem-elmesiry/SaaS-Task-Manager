import { formatTimeAgo } from "@/lib/utils";
import { ActivityType, Metadata, Status } from "@/types/kanban";

type activityDB = {
  action: string;
  created_at: string;
  entity_id: string;
  id: string;
  metadata: Metadata | null;
  profiles: {
    id: string;
    full_name: string;
    avatar_url: string;
  } | null;
  tasks:
    | { id: string; title: string; status: Status; project_id: string }
    | null;
  user_id: string;
  workspace_id: string;
};

export function formatActivity(data: activityDB[]): ActivityType[] {
  return data.map((a) => ({
    id: a.id,
    user: a.profiles
      ? {
          id: a.profiles.id,
          full_name: a.profiles.full_name,
          avatar_url: a.profiles.avatar_url,
        }
      : { id: "", full_name: "Deleted User", avatar_url: undefined },
    action: a.action,
    target: a.entity_id,
    time: formatTimeAgo(a.created_at),
    task: a.tasks
      ? {
          id: a.tasks.id,
          title: a.tasks.title,
          status: a.tasks.status,
          project_id: a.tasks.project_id,
        }
      : undefined,
    metadata: a.metadata,
    created_at: a.created_at,
  }));
}
