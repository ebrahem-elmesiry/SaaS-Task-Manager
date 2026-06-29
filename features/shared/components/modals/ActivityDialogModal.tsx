"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ActivityComponent from "@/features/TaskDetailPanel/Activity/ActivityComponent";

export default function ActivityDialogModal() {
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
          <DialogTitle>All Activities</DialogTitle>
        </DialogHeader>

        <ActivityComponent />
      </DialogContent>
    </Dialog>
  );
}
