import Avatar from "@/features/shared/components/Avatar";
import Link from "next/link";
import ActivityLine from "./ActivityLine";
import { ActivityType } from "@/types/kanban";
import { Loader2 } from "lucide-react";

interface Props {
  isRefetching?: boolean;
  activity: ActivityType[] | undefined;
}

export default function ActivityContent({ activity, isRefetching }: Props) {
  if (!activity || activity?.length === 0) return "there is no activity";
  if (isRefetching) return <Loader2 className="w-4 h-4 animate-spin" />;
  return (
    <>
      <div
        style={{ scrollbarWidth: "none" }}
        className="space-y-4 max-h-100 overflow-y-auto pr-2"
      >
        {activity &&
          activity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-700 last:border-0"
            >
              <Link href={`/profile/${activity.user.id}`}>
                <Avatar
                  avatar_url={activity.user.avatar_url}
                  user_name={activity.user.full_name}
                />
              </Link>
              <ActivityLine activity={activity} action={activity.action} />
            </div>
          ))}
      </div>
    </>
  );
}
