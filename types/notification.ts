import { Role } from "./main";

export type memberFn = {
  receiver_id?: string;
  sender_id: string;
  email?: string;
  full_name?: string;
  task_id?: string;
  comment_id?: string;
  role?: Role;
};

type notificationType = "invitation" | "removed" | "role" | "reply" | "mention";
export type actionType = "pending" | "accepted" | "rejected";

export type notifications = {
  id: string;

  sender: { name: string; id: string };
  workspace_name?: string;
  receiver: { name: string; id: string };

  type: notificationType;
  invitation_id?: string;

  action: actionType;

  title: string;
  // message: string;

  read: boolean;

  task_id?: string;
  comment_id?: string;

  created_at: string;
};
