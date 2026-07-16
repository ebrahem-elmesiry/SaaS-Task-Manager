"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemberContext } from "@/context/TeamContext";
import { Member } from "@/types/team";

import { MoreVertical } from "lucide-react";

export default function TeamActionsMenu({ member }: { member: Member }) {
  const { openDeleteDialog, openEditModal } = useMemberContext();

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
          onClick={() => openEditModal(member)}
          className="data-[highlighted]:bg-slate-200 dark:hover:bg-slate-700"
        >
          Change Role
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => openDeleteDialog(member.id)}
          className="
      text-red-500
      data-[highlighted]:bg-red-200
      dark:hover:bg-red-900/20
      focus:text-red-500
    "
        >
          Remove from Team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
