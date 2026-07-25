import { LucideIcon } from "lucide-react";
import { Status } from "./kanban";

type SearchProjectResult = {
  type: "project";
  id: string;
  icon: LucideIcon;
  title: string;
  workspace_id: string;
  workspace_name: string;
};

type SearchTaskResult = {
  type: "task";
  id: string;
  icon: LucideIcon;
  title: string;
  project: { id: string; name: string };
  workspace_id: string;
  status: Status;
};

type SearchUserResult = {
  type: "user";
  id: string;
  icon: LucideIcon;
  title: string;
  role: string;
  workspace_name: string;
};

export type SearchType =
  | SearchProjectResult
  | SearchTaskResult
  | SearchUserResult;

export type GlobalSearchParams = {
  searchText: string;
  workspaceId?: string | null;
};
