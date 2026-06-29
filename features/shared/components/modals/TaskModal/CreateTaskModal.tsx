"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTaskContext } from "@/context/TaskContext";
import { TaskForm } from "./TaskForm";

export default function CreateTaskModal() {
  const { isOpen, setIsOpen, closeModal, isEdit } = useTaskContext();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button size="xl" variant="purple">
          Create Task
        </Button>
      </DialogTrigger>

      {/* Content */}
      <DialogContent
        onInteractOutside={closeModal}
        className="sm:max-w-lg h-[90%] p-0 bg-white dark:bg-slate-800 [&>button]:hidden"
      >
        <DialogHeader className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {isEdit ? "Update Task" : "Create New Task"}
            </DialogTitle>

            <button
              onClick={closeModal}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <TaskForm />
      </DialogContent>
    </Dialog>
  );
}
