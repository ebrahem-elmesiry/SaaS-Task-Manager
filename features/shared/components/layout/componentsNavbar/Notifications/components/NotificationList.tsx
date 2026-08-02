"use client";

import { useNotifications } from "../hooks/useNotifications";
import NotificationLoading from "./NotificationLoading";
import NotificationError from "./NotificationError";
import NotificationEmpty from "./NotificationEmpty";
import NotificationContent from "./NotificationContent";

export function NotificationList() {
  const { notifications, isPending, error, unreadCount, refetch } =
    useNotifications();

  if (isPending) return <NotificationLoading />;
  if (error) return <NotificationError error={error} refetch={refetch} />;
  if (notifications.length === 0) return <NotificationEmpty />;
  return (
    <NotificationContent notifications={notifications} unreadCount={unreadCount} />
  );
}
