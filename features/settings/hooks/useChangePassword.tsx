import { PasswordState } from "@/types/settings";
import React, { useState } from "react";
import { messages } from "@/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useChangePassword() {
  const [password, setPassword] = useState<PasswordState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  async function handleSubmitPassword(password: PasswordState) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return password;
  }
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: handleSubmitPassword,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["settings-password"],
      });
      const previousData = queryClient.getQueryData(["settings-password"]);
      queryClient.setQueryData(["settings-password"], newData);
      return { previousData };
    },

    onError: (err, context) => {
      queryClient.setQueryData(["settings-password"], context);
      toast.error(messages.settings.password.error || err.message);
    },
    onSuccess: () => {
      toast.success(messages.settings.password.success);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["settings-password"] });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return {
    password,
    handleChange,
    Loading: isPending,
    handleSubmitPassword: mutate,
  };
}
