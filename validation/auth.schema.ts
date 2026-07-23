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

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
