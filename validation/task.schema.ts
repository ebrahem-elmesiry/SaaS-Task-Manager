import { z } from "zod";
import { teamMemberSchema } from "./project.schema";

// ===== Enums =====
export const prioritySchema = z.enum(["low", "medium", "high"]);

export const statusSchema = z.enum(["todo", "in-progress", "done", "review"]);

// ===== Subtask =====
export const subtaskSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Subtask title is required")
    .max(100, "Subtask title is too long"),

  completed: z.boolean(),
});

// ===== Main Form =====
export const taskFormSchema = z.object({
  id: z.string(),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title is too long"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(1000, "Description is too long"),

  priority: prioritySchema.optional(),

  project_id: z.uuid("You must select a project"),

  subtasks: z.array(subtaskSchema).min(1, "At least one subtask is required"),

  assignees: z
    .array(teamMemberSchema)
    .min(1, "At least one assignee is required"),

  dueDate: z
    .string()
    .refine(
      (val) => !val || new Date(val) > new Date(new Date().toDateString()),
      {
        message: "Due date must be after today",
      },
    ),

  status: statusSchema.optional(),
});

// ===== Type =====
export type TaskForm = z.infer<typeof taskFormSchema>;
