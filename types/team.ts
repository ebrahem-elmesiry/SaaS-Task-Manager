import { MemberFormSchemaType } from "@/validation/team.schema";
import { Role } from "./main";

export type memberStatus = "online" | "offline";
export type Member = {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  avatar: string | undefined;
  status: memberStatus;
  tasksCompleted: number;
  activeProjects: number;
  joinedDate: string;
};

export type MemberForm = Omit<MemberFormSchemaType, "role"> & {
  id: string;
  role: Role | undefined;
};
