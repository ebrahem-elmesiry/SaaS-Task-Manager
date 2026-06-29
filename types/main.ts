// export type returnFnWithOptionalMessage = Omit

export type Role = "admin" | "manager" | "member";

export type currentUserType = {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
  job_title?: string;
};
