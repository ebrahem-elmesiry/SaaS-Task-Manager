"use client";

import Link from "next/link";
import ActivityLine from "./ActivityLine";
import ActivityError from "./ActivityError";
import ActivityEmpty from "./ActivityEmpty";
import ActivityLoader from "./ActivityLoader";
import Avatar from "@/features/shared/components/Avatar";
import { useActivity } from "../hooks/activity/useActivity";

export default function ActivityComponent() {
  const { activity, isPending, error, refetch } = useActivity();

  if (activity?.length === 0) return <ActivityEmpty />;
  if (error) return <ActivityError onRetry={refetch} />;
  if (isPending) return <ActivityLoader />;

  return (
    <>
      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
        Activity Log
      </h4>
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
