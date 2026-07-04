import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ActivityType } from "@/types/kanban";
import Link from "next/link";

interface Props {
  action: string;
  activity: ActivityType;
}

export default function ActivityLine({ activity, action }: Props) {
  let done;
  let target;
  let target_id =
    activity.task &&
    `/kanban/${activity.task.project_id}?taskId=${activity.task.id}&status=${activity.task.status ? activity.task.status : activity.metadata?.currentStatus}`;

  const ifTask = activity.task
    ? activity.task.title
    : activity.metadata?.taskTitle || "deleted task";

  switch (action) {
    case "COMMENT_ADDED":
      done = "add comment on ";
      target = ifTask;
      break;
    case "COMMENT_DELETED":
      done = "delete comment on ";
      target = ifTask;
      break;
    case "TASK_CREATED":
      done = "create task ";
      target = ifTask;
      break;
    case "TASK_UPDATED":
      done = "update task ";
      target = ifTask;
      break;
    case "TASK_DELETED":
      done = "delete task ";
      target = ifTask;
      break;
    case "TASK_ASSIGNED":
      done = "assigned task to ";
      target = activity.user.full_name;
      target_id = `/profile/${activity.user.id}`;
      break;
    case "TASK_MOVED":
      done = `move ${ifTask} from `;
      target = `${activity.metadata?.initialStatus} to ${activity.metadata?.currentStatus}`;
      break;
  }

  return (
    <div>
      <p className="text-sm text-slate-900 dark:text-white">
        <Link href={`/profile/${activity.user.id}`} className="font-medium">
          {activity.user.full_name}
        </Link>{" "}
        <span className="text-slate-500">{done}</span>
        {target_id ? (
          <Link href={target_id} className="font-medium">
            {target}
          </Link>
        ) : action === "TASK_DELETED" || action === "COMMENT_DELETED" ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">{target}</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Deleted by {activity.metadata?.deletedBy}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span>{target}</span>
        )}
      </p>

      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
    </div>
  );
}
