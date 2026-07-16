import { z } from "zod";

export const memberFormSchema = z.object({
  email: z.email("Invalid email format"),

  role: z.enum(["admin", "member", "manager"]),
});

export type MemberFormSchemaType = z.infer<typeof memberFormSchema>;
