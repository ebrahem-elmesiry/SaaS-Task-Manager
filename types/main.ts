export type Role = "admin" | "manager" | "member";

export type currentUserType = {
  id: string;
  name: string;
  role: Role;
  avatar: string | undefined;
  job_title?: string;
  workspace: string;
};
