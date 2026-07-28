import { Assignee } from "./kanban";

export type WorkspaceCardData = {
  id: string;
  name: string;
  slug: string;
  role: "admin" | "manager" | "member";
  projectsCount: number;
  tasksCount: number;
  members: Assignee[];
};
