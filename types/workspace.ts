import { Assignee } from "./kanban";

export type WorkspaceCardData = {
  id: string;
  name: string;
  slug: string;
  projectsCount: number;
  tasksCount: number;
  members: Assignee[];
};
