import { ProjectSchemaType } from "@/validation/project.schema";
import { Assignee } from "./kanban";

export type statusType =
  | "Just Started"
  | "In Progress"
  | "At Risk"
  | "Completed";

export interface projectCard {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: statusType;
  startDate: string;
  endDate: string;
  team: Assignee[];
  tasks: projectCardTask;
}

type projectCardTask = {
  total: number;
  completed: number;
};

export type FormState = Omit<ProjectSchemaType, "startDate" | "endDate"> & {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
};
