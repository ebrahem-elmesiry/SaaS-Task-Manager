import { MemberFormSchemaType } from "@/validation/team.schema";
import { Role } from "./main";

export type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  status?: "online" | "offline" | "away";
  tasksCompleted?: number;
  activeProjects?: number;
  joinedDate?: string;
};

export type MemberForm = Omit<MemberFormSchemaType, "role"> & {
  id: string;
  role: Role | undefined;
};
