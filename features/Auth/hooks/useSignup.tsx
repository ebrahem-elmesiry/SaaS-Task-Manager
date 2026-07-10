"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signupAction } from "../actions/signupAction";
import { messages } from "@/messages";
import { signupSchema } from "@/validation/auth.schema";

type SignupInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export function useSignup() {
  const router = useRouter();

  const { isPending, mutateAsync: signup } = useMutation({
    mutationFn: async (data: SignupInput) => {
      const result = signupSchema.safeParse(data);

      if (!result.success) {
        throw new Error(result.error.issues[0].message);
      }
      const { success, message } = await signupAction(data);
      if (!success) {
        throw new Error(message);
      }
      return { message };
    },

    onSuccess: ({ message }) => {
      toast.success(message);
      router.push("/workspaces");
    },

    onError: (err) => {
      toast.error(err.message || messages.auth.signup.error);
    },
  });
  return { signup, isPending };
}
