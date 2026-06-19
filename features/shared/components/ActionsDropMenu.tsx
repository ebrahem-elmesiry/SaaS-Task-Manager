"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";

type Action = {
  label: string;
  onClick: (id: string) => void;
  variant?: "default" | "danger";
  commentId: string;
};

type Props = {
  actions: Action[];
  className?: string;
};

export default function ActionsMenu({ actions, className }: Props) {
  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-opacity">
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </button>
      </DropdownMenuTrigger>

      {/* Menu */}
      <DropdownMenuContent
        align="end"
        className={`${className} p-2 w-44 dark:bg-slate-800`}
      >
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onSelect={() => action.onClick(action.commentId)}
            className={
              action.variant === "danger"
                ? `
                  text-red-500
                  data-[highlighted]:bg-red-100
                  dark:data-[highlighted]:bg-red-900/20
                  focus:text-red-500
                `
                : "data-[highlighted]:bg-slate-200 dark:hover:bg-slate-700"
            }
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
