"use client";

import ActivityError from "./ActivityError";
import ActivityEmpty from "./ActivityEmpty";
import ActivityLoader from "./ActivityLoader";
import { useActivity } from "../hooks/activity/useActivity";
import ActivityContent from "./ActivityContent";

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
      <ActivityContent activity={activity} />
    </>
  );
}
