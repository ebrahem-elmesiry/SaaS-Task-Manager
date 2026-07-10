import { z } from "zod";

export const teamMemberSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  avatar_url: z.union([z.string(), z.undefined()]),
});

export const projectSchema = z
  .object({
    id: z.string(),

    name: z.string().min(3, {
      message: "Project name must be at least 3 characters",
    }),

    description: z.string().min(5, {
      message: "Project description must be at least 5 characters",
    }),

    startDate: z
      .date({
        message: "Start date is required",
      })
      .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
        message: "Start date is invalid",
      }),

    endDate: z
      .date({
        message: "End date is required",
      })
      .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
        message: "End date is invalid",
      }),

    team: z.array(teamMemberSchema).min(1, { message: "Team cannot be empty" }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export type ProjectSchemaType = z.infer<typeof projectSchema>;
