"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { formatActivity } from "@/features/TaskDetailPanel/handlers/formatActivity";
import { ActivityType } from "@/types/kanban";

async function getActivityFromDB(cursor: string | null) {
  const supabase = createClient();
  let query = supabase
    .from("activity_log")
    .select(
      `*,
        tasks(id,title,status,project_id),
        profiles(id,full_name,avatar_url)
        `,
    )
    .order("created_at", { ascending: false })
    .limit(5);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  const { data, error } = await query;
  if (error) {
    console.log("error comments", error);
    throw new Error(error.message);
  }
  const activities = formatActivity(data);
  const getLastActivity =
    data.length > 0 ? activities?.[activities?.length - 1].created_at : null;
  return { activities, nextCursor: getLastActivity };
}

export function useGetMoreActivities(initialData: ActivityType[]) {
  const {
    data: activity,
    isFetchingNextPage,
    fetchNextPage,
    error,
    hasNextPage,
    isRefetching,
  } = useInfiniteQuery<{
    activities: ActivityType[];
    nextCursor: string | null;
  }>({
    queryKey: ["activity", "all"],
    queryFn: ({ pageParam }) => getActivityFromDB(pageParam as string | null),
    staleTime: 10 * 1000,
    initialData: {
      pages: [
        {
          activities: initialData,
          nextCursor: initialData[initialData.length - 1].created_at ?? null,
        },
      ],
      pageParams: [null],
    },
    initialPageParam: null,
    getNextPageParam: (lastCursor) => lastCursor.nextCursor,
  });

  return {
    activity,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}
