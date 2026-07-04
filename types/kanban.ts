// =====================
// CORE TYPES
// =====================

import { TaskForm } from "@/validation/task.schema";

export type Priority = "high" | "medium" | "low";

export type Status = "todo" | "in-progress" | "review" | "done";

export type Assignee = {
  id: string;
  full_name: string;
  avatar_url: string | null;
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

export type Metadata = {
  initialStatus?: Status;
  currentStatus?: Status;
  taskTitle?: string;
  deletedBy?: string;
};

export type ActivityType = {
  id: string;
  user: { id: string; full_name: string; avatar_url: string | undefined };
  action: string;
  target: string;
  time: string;
  metadata?: Metadata;
  task:
    | { id: string; title: string; status: Status; project_id: string }
    | undefined;
  created_at: string;
};

export type Comment = {
  id: string;
  user_name: string;
  user_id: string;
  text: string;
  created_at: string;
  parent_id?: string;
  avatar: string | undefined;
  reply_to_user_id?: string;
  replies?: Comment[];
};

export type ReplyState = {
  commentId: string;
  comment: string;
  name: string;
  user_id?: string;
} | null;

// =====================
// BASE TASK (SOURCE OF TRUTH)
// =====================

export type TaskBase = {
  id: string;
  title: string;
  project_id: string;
  description: string;
  priority: Priority;
  dueDate: string;
  assignees: Assignee[];
};

// =====================
// KANBAN TASK
// =====================

export type Task = TaskBase & {
  status: Status;
  subtasks: Subtask[];
  commentsCount: number;
  attachments: number;
};

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
