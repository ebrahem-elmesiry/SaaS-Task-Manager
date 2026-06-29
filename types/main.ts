// export type returnFnWithOptionalMessage = Omit
export type returnFn = Promise<{
  success: boolean;
  message: string | undefined;
}>;

export type Role = "admin" | "manager" | "member";

export type currentUserType = {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
  job_title?: string;
};
