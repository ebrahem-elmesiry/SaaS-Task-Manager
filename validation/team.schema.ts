import { z } from "zod";

export const memberFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  email: z.string().email("Invalid email format"),

  role: z.enum(["admin", "member", "manager"]),
});

export type MemberFormSchemaType = z.infer<typeof memberFormSchema>;
