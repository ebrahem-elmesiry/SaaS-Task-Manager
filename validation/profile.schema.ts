import { z } from "zod";

export const accountDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name is too long"),

  email: z.string().email("Invalid email address"),

  jobTitle: z
    .string()
    .min(2, "Job title must be at least 2 characters")
    .max(50, "Job title is too long"),

  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location is too long"),

  bio: z
    .string()
    .max(300, "Bio must be less than 300 characters")
    .optional()
    .or(z.literal("")),
});

export type AccountDetailsType = z.infer<typeof accountDetailsSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((val) => /[!@#$%^&*(),.?\":{}|<>]/.test(val), {
        message: "Password must contain at least one special character",
      }),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });
export type PasswordType = z.infer<typeof passwordSchema>;
