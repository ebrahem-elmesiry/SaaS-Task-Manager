// =====================
// CORE TYPES
// =====================

import { TaskForm } from "@/validation/task.schema";

export type Priority = "high" | "medium" | "low";

export type Status = "todo" | "in-progress" | "review" | "done";

export type Assignee = {
  id: string;
  name: string;
  avatar: string;
};

// =====================
// SUBTASKS
// =====================

export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};

// =====================
// ACTIVITY & COMMENTS
// =====================

export type ActivityType = {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar?: string;
};

export type Comment = {
  id: string;
  user_name: string;
  user_id: string;
  text: string;
  created_at: string;
  parent_id?: string;
  avatar: string;
  reply_to_user_id?: string;
  replies?: Comment[];
};

// =====================
// BASE TASK (SOURCE OF TRUTH)
// =====================

export type TaskBase = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  assignees: Assignee[];
};

// =====================
// KANBAN TASK
// =====================

export type Task = TaskBase & {
  // columnId: string;
  subtasks: Subtask[];
  commentsCount: number;
  attachments: number;
  comments?: Comment[];
};

// =====================
// FORM
// =====================

// export type TaskForm = {
//   id: string;
//   title: string;
//   description: string;
//   priority: Priority | null;
//   subtasks: Subtask[];
//   assignees: Assignee[];
//   dueDate: string;
//   status: Status | undefined;
// };

// =====================
// FORM STATE (UI SAFE)
// =====================

export type FormStateTask = Omit<TaskForm, "dueDate"> & {
  dueDate?: Date;
};

// =====================
// COLUMN
// =====================

export type ColumnsType = Record<Status, Task[]>;

// =====================
// TASK PREVIEW (FRONTEND LIGHT DATA)
// =====================

export type TaskPreviewType = TaskBase & {
  status: Status;
  subtasks: Subtask[];
};

// =====================
// STATE
// =====================

export type selectedTaskType = {
  taskId: string;
  status: Status | undefined;
};
