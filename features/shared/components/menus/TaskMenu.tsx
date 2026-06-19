"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTaskContext } from "@/context/TaskContext";
import { TaskPreviewType } from "@/types/kanban";

import { MoreVertical } from "lucide-react";

export default function TaskActionsMenu({
  taskPreview,
}: {
  taskPreview: TaskPreviewType | null;
}) {
  const { handleEditInit, openDeleteDialog } = useTaskContext();

  if (!taskPreview) return;
  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-opacity">
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </button>
      </DropdownMenuTrigger>

      {/* Menu */}
      <DropdownMenuContent align="end" className="p-2 w-44 dark:bg-slate-800">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleEditInit(taskPreview);
          }}
          className="data-[highlighted]:bg-slate-200 dark:hover:bg-slate-700"
        >
          Edit Task
        </DropdownMenuItem>
        {/* <DropdownMenuItem
          onClick={() => deleteTask(taskPreview.id)}
          className="data-[highlighted]:bg-slate-200 dark:hover:bg-slate-700"
        >
          Duplicate
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleCopyLink}
          className="data-[highlighted]:bg-slate-200 dark:hover:bg-slate-700"
        >
          Copy Task ID
        </DropdownMenuItem> */}

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            // if user delete task when he open TaskSheet
            openDeleteDialog(taskPreview.id, taskPreview.status);
          }}
          className="
          text-red-500
          data-[highlighted]:bg-red-200
          dark:hover:bg-red-900/20
          focus:text-red-500
          "
        >
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
