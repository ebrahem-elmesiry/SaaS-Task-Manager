import { useState } from "react";
import { messages } from "@/messages";
import { NotificationState } from "@/types/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";

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
      .from("account")
      .update(notifications)
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
      await queryClient.cancelQueries({ queryKey: ["settings-notifications"] });
      const previousData = queryClient.getQueryData(["settings-notifications"]);
      queryClient.setQueryData(["settings-notifications"], newData);
      return { previousData };
    },

    onError: (err, context) => {
      queryClient.setQueryData(["settings-notifications"], context);
      toast.error(messages.settings.notifications.error || err.message);
    },
    onSuccess: () => {
      toast.success(messages.settings.notifications.success);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["settings-notifications"] });
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

  const handleCheckbox = (key: keyof NotificationState, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    notifications,
    toggle,
    handleCheckbox,
    handleChangeNotifications: mutate,
    Loading: isPending,
    cancelChanges,
  };
}
