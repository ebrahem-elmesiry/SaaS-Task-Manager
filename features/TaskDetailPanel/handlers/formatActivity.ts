import { formatTimeAgo } from "@/lib/utils";
import { ActivityType, Status } from "@/types/kanban";

type activityDB = {
  action: string;
  created_at: string;
  entity_id: string;
  entity_type: string;
  id: string;
  metadata: null;
  profiles: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
  tasks: { id: string; title: string; status: Status; project_id: string };
  user_id: string;
  workspace_id: string;
};

export function formatActivity(data: activityDB[]): ActivityType[] {
  return data.map((a) => ({
    id: a.id,
    user: {
      id: a.profiles.id,
      full_name: a.profiles.full_name,
      avatar_url: a.profiles.avatar_url,
    },
    action: a.action,
    target: a.entity_id,
    time: formatTimeAgo(a.created_at),
    entity_type: a.entity_type,
    task: {
      id: a.tasks.id,
      title: a.tasks.title,
      status: a.tasks.status,
      project_id: a.tasks.project_id,
    },
  }));
}
