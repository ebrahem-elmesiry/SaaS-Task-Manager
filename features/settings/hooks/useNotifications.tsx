import { useState } from "react";
import { messages } from "@/messages";
import { NotificationState } from "@/types/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import { SettingsData } from "@/types/settings";

export default function useNotifications({
  NotificationData,
}: {
  NotificationData: NotificationState;
}) {
  const currentUser = useCurrentUser();
  const [notifications, setNotifications] =
    useState<NotificationState>(NotificationData);

  async function handleChangeNotifications(notifications: NotificationState) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .update({
        invitations_enabled: notifications.invitations_enabled,
        notifications_enabled: notifications.notifications_enabled,
      })
      .eq("id", currentUser?.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: handleChangeNotifications,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["settings"] });
      const previousData = queryClient.getQueryData(["settings"]);
      queryClient.setQueryData(["settings"], (old: SettingsData) => ({
        ...old,
        ...newData,
      }));
      return { previousData };
    },

    onError: (err, _vars, context) => {
      queryClient.setQueryData(["settings"], context?.previousData);
      toast.error(messages.settings.notifications.error || err.message);
    },
    onSuccess: () => {
      toast.success(messages.settings.notifications.success);
    },
  });

  function cancelChanges() {
    setNotifications(NotificationData);
  }

  const toggle = (key: keyof NotificationState) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return {
    notifications,
    toggle,
    handleChangeNotifications: mutate,
    Loading: isPending,
    cancelChanges,
  };
}
