"use client";

import { useState } from "react";
import { RecentTask } from "@/types/profile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useRecentTasks from "../hooks/useRecentTasks";
import RecentTaskList from "./RecentTaskList/RecentTaskList";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

type Props = {
  tasks: RecentTask[];
  userId: string | undefined;
};

export default function RecentTasks({ tasks, userId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: allTasks,
    isLoading,
    error,
    refetch,
  } = useRecentTasks(userId, isOpen);
  const displayTasks = allTasks ?? tasks;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Recent Tasks
        </h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="cursor-pointer text-sm text-indigo-400 hover:text-indigo-500">
              View all
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg! dark:bg-slate-800 max-h-105 overflow-y-auto p-6">
            <DialogHeader>
              <DialogTitle>Recent Tasks</DialogTitle>
            </DialogHeader>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-4 space-y-3">
                <span className="text-sm text-red-600 dark:text-red-400">
                  Failed to load tasks
                </span>
                <div>
                  <Button
                    variant={"link"}
                    size="xl"
                    onClick={() => refetch()}
                    className="no-underline! cursor-pointer"
                  >
                    <RefreshCw />
                    Retry
                  </Button>
                </div>
              </div>
            ) : (
              <RecentTaskList tasks={displayTasks ?? []} />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <RecentTaskList tasks={tasks} />
    </div>
  );
}
