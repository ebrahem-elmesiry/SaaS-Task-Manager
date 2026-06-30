"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "../actions/loginAction";
import { messages } from "@/messages";
import { loginSchema } from "@/validation/auth.schema";

type LoginInput = {
  email: string;
  password: string;
};

export function useLogin() {
  const router = useRouter();

  const { isPending, mutateAsync: login } = useMutation({
    mutationFn: async (data: LoginInput) => {
      const result = loginSchema.safeParse(data);

      if (!result.success) {
        throw new Error(result.error.issues[0].message);
      }

      const { success, message } = await loginAction(data);
      if (!success) {
        throw new Error(message);
      }
      return { message };
    },

    onSuccess: ({ message }) => {
      toast.success(message);
      router.push("/");
    },

    onError: (err: Error) => {
      toast.error(err.message || messages.auth.login.error);
    },
  });
  return { isPending, login };
}
