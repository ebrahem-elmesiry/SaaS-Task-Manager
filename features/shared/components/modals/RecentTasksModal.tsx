"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle2, Clock } from "lucide-react";

type Recent = {
  id: number;
  title: string;
  project: string;
  status: string;
  completedDate?: string;
  dueDate?: string;
};

export default function RecentTasksDialog({
  recentTasks,
}: {
  recentTasks: Recent[];
}) {
  const [open, setOpen] = useState(false);

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
          <DialogTitle>Recent Tasks</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                  task.status === "completed"
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-blue-100 dark:bg-blue-900/30"
                }`}
              >
                {task.status === "completed" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 dark:text-white mb-0.5">
                  {task.title}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{task.project}</span>
                  <span>•</span>
                  <span>
                    {task.status === "completed"
                      ? `Completed ${task.completedDate}`
                      : `Due ${task.dueDate}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
