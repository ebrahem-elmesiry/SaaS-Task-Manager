import { z } from "zod";

const email = z.email("Invalid email address");
const password = z.string().min(8, "Password must be at least 8 characters");

export const loginSchema = z.object({
  email,
  password,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const signupSchema = loginSchema.extend({
  firstName: z
    .string()
    .min(2)
    .regex(/^[A-Za-z\s]+$/, "Name must not contain symbols"),

  lastName: z
    .string()
    .min(2)
    .regex(/^[A-Za-z\s]+$/, "Name must not contain symbols"),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
