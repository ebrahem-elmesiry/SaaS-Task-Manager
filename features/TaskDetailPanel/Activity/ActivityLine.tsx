import { ActivityType } from "@/types/kanban";
import Link from "next/link";

interface Props {
  action: string;
  activity: ActivityType;
}

export default function ActivityLine({ activity, action }: Props) {
  let done;
  let target;
  let target_id = `/kanban/${activity.task.project_id}?taskId=${activity.task.id}&status=${activity.task.status}`;

  switch (action) {
    case "COMMENT_ADDED":
      done = "add comment on";
      target = activity.task.title;
      break;
    case "COMMENT_DELETED":
      done = "delete comment on";
      target = activity.task.title;
      break;
    case "TASK_CREATED":
      done = "create task";
      target = activity.task.title;
      break;
    case "TASK_UPDATED":
      done = "update task";
      target = activity.task.title;
      break;
    case "TASK_DELETED":
      done = "delete task";
      target = activity.task.title;
      break;
    case "TASK_ASSIGNED":
      done = "assigned task to";
      target = activity.user.full_name;
      target_id = `/profile/${activity.user.id}`;
      break;
    case "TASK_MOVED":
      done = "move task to";
      target = activity.task.status;
      break;
  }

  return (
    <div>
      <p className="text-sm text-slate-900 dark:text-white">
        <Link href={`/profile/${activity.user.id}`} className="font-medium">
          {activity.user.full_name}
        </Link>{" "}
        <span className="text-slate-500">{done}</span>{" "}
        <Link href={target_id} className="font-medium">
          {target}
        </Link>
      </p>

      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
    </div>
  );
}
