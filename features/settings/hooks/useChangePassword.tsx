import { PasswordState } from "@/types/settings";
import React, { useState } from "react";
import { messages } from "@/messages";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePasswordAction } from "../actions/changePasswordAction";
import { changePasswordSchema } from "@/validation/auth.schema";

export default function useChangePassword() {
  const [password, setPassword] = useState<PasswordState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: PasswordState) => {
      const result = changePasswordSchema.safeParse(data);
      if (!result.success) {
        throw new Error(result.error.issues[0].message);
      }
      await changePasswordAction({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
    },

    onSuccess: () => {
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success(messages.settings.password.success);
    },

    onError: (err: Error) => {
      toast.error(err.message || messages.settings.password.error);
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
    handleSubmitPassword: mutateAsync,
  };
}
