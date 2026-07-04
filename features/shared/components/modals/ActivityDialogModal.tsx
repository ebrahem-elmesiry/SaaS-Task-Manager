"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ActivityContent from "@/features/TaskDetailPanel/Activity/ActivityContent";
import ActivityError from "@/features/Dashboard/components/ActivityError";
import { ActivityType } from "@/types/kanban";
import { useGetMoreActivities } from "@/features/Dashboard/hooks/useGetMoreActivities";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  activity: ActivityType[];
}

export default function ActivityDialogModal({ activity }: Props) {
  const [open, setOpen] = useState(false);
  const {
    activity: moreActivity,
    fetchNextPage,
    error,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useGetMoreActivities(activity);
  const format = moreActivity.pages.map((p) => p.activities).flat();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <button className="cursor-pointer text-sm text-indigo-400 hover:text-indigo-500">
          View all
        </button>
      </DialogTrigger>

      {/* Content */}
      <DialogContent className="max-w-lg! dark:bg-slate-800">
        <DialogHeader>
          <DialogTitle>All Activities</DialogTitle>
        </DialogHeader>
        {error && <ActivityError message={error.message} />}
        <ActivityContent activity={format} isRefetching={isRefetching} />
        <Button
          disabled={!hasNextPage}
          variant={"outline"}
          className={`flex items-center gap-2 cursor-pointer hover:opacity-60 duration-200 ${isFetchingNextPage ? "opacity-60" : "opacity-100"}`}
          onClick={() => {
            if (hasNextPage && !isFetchingNextPage)
              fetchNextPage({ cancelRefetch: false });
          }}
        >
          {hasNextPage ? "Load More" : "No More Data"}{" "}
          {isFetchingNextPage && (
            <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
