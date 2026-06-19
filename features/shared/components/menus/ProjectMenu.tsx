"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { projectCard } from "@/types/project";
import { Dispatch, SetStateAction } from "react";

interface Props {
  editData: projectCard;
  onEdit: (project: projectCard) => void;
  setProjectId: Dispatch<SetStateAction<string>>;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ProjectActionsMenu({
  editData,
  onEdit,
  setIsDeleteDialogOpen,
  setProjectId,
}: Props) {
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
        onClick={(e) => e.preventDefault()}
        align="end"
        className="p-2 w-44 dark:bg-slate-800"
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEdit(editData);
          }}
          className=" dark:hover:bg-slate-700"
        >
          Edit Project
        </DropdownMenuItem>

        {/* <DropdownMenuItem
          onClick={handleCopyLink}
          className="hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          Copy LinK
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleArchive();
          }}
          className="hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          Archive
        </DropdownMenuItem> */}

        <DropdownMenuItem
          onClick={async (e) => {
            e.stopPropagation();
            setIsDeleteDialogOpen(true);
            setProjectId(editData.id);
            // await handleDeleteProject(editData.id);
          }}
          className="
          text-red-500
          dark:hover:bg-red-900/20
          hover:bg-red-900/20
          "
          // focus:text-red-500
          // focus:bg-red-900/20
        >
          Delete Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
