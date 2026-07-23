"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logoutAction } from "../actions/logoutAction";
import { messages } from "@/messages";
import { getQueryClient } from "@/lib/get-query-client";

export function useLogout() {
  const router = useRouter();
  const queryClient = getQueryClient();

  const { mutateAsync: logout, isPending } = useMutation({
    mutationFn: async () => {
      return logoutAction();
    },

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      queryClient.removeQueries({ queryKey: ["workspaceMember"] });
      toast.success(messages.auth.logout.success);
      router.push("/auth/Login");
    },

    onError: (err) => {
      toast.error(err.message || messages.auth.logout.error);
    },
  });

  return { isPending, logout };
}
