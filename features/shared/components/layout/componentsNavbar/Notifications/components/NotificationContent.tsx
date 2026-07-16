import {
  Loader2,
  Mail,
  MessageSquare,
  Reply,
  Shield,
  UserX,
} from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import { formatMessage } from "../hooks/useNotifications";
import { useMarkNotificationRead } from "../hooks/useMarkNotificationRead";
import type { notifications } from "@/types/notification";
import { Button } from "@/components/ui/button";
import useAcceptInvitation from "../hooks/useAcceptInvitation";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";

const typeConfig: Record<string, { icon: typeof Mail; color: string }> = {
  invitation: { icon: Mail, color: "green" },
  mention: {
    icon: MessageSquare,
    color: "blue",
  },
  reply: { icon: Reply, color: "purple" },
  role: { icon: Shield, color: "orange" },
  removed: { icon: UserX, color: "red" },
};

const colorClasses: Record<string, string> = {
  green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  purple:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  orange:
    "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  red: "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400",
};

export default function NotificationContent({
  notifications,
  unreadCount,
}: {
  notifications: notifications[];
  unreadCount: number;
}) {
  const { mutate } = useMarkNotificationRead();
  const { acceptInvite, acceptPending, rejectInvite, rejectPending } =
    useAcceptInvitation();

  const currentUser = useCurrentUser();
  if (!currentUser) return null;

  const { id: user_id } = currentUser;

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Notifications
          </h2>

          {unreadCount > 0 && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {unreadCount} unread
            </p>
          )}
        </div>

        <Button
          onClick={() =>
            unreadCount > 0 &&
            mutate({ notificationIds: notifications.map((n) => n.id), user_id })
          }
          variant={"link"}
        >
          Mark all read
        </Button>
      </div>

      <div className="max-h-100 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
        {notifications.map((n) => {
          const config = typeConfig[n.type];
          const Icon = config.icon;
          const color = config.color;

          const isInvitation = n.type === "invitation";
          const Wrapper = isInvitation ? "div" : "button";

          return (
            <Wrapper
              key={n.id}
              className={`w-full last:rounded-br-lg last:rounded-bl-lg flex gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition ${
                !n.read ? "bg-indigo-50/50 dark:bg-indigo-950/20" : ""
              }`}
              onClick={() =>
                !n.read &&
                n.receiver.id === currentUser?.id &&
                mutate({ notificationId: n.id, user_id })
              }
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorClasses[color]}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {n.title}
                  </p>

                  {!n.read && n.receiver.id === user_id && (
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5" />
                  )}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {formatMessage(n, user_id)}
                </p>

                {isInvitation &&
                  n.action === "pending" &&
                  n.receiver.id === user_id && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        disabled={acceptPending}
                        onClick={() =>
                          acceptInvite({
                            invitation_id: n.invitation_id,
                            notificationId: n.id,
                          })
                        }
                        variant={"accept"}
                        size={"sm"}
                      >
                        Accept
                        {acceptPending && (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                      </Button>
                      <Button
                        disabled={rejectPending}
                        onClick={() =>
                          rejectInvite({
                            notificationId: n.id,
                            invitation_id: n.invitation_id,
                          })
                        }
                        variant={"decline"}
                        size={"sm"}
                      >
                        Decline
                        {rejectPending && (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                      </Button>
                    </div>
                  )}

                <p className="text-xs text-slate-500 mt-1">
                  {formatTimeAgo(n.created_at)}
                </p>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </>
  );
}
