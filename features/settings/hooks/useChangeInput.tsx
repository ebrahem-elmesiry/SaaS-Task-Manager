import {
  accountDetailsSchema,
  AccountDetailsType,
} from "@/validation/profile.schema";
import React, { useState } from "react";
import { messages } from "@/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";

export default function useChangeInput(initialValue: AccountDetailsType) {
  const currentUser = useCurrentUser();

  const [accountDetail, setAccountDetail] = useState<AccountDetailsType>({
    fullName: initialValue.fullName,
    email: initialValue.email,
    jobTitle: initialValue.jobTitle,
    bio: initialValue.bio,
    location: initialValue.location,
  });
  const [photo, setPhoto] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setAccountDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const queryClient = useQueryClient();
  const supabase = createClient();

  // async function fetchAccount() {
  //   const { data, error } = await supabase
  //     .from("account")
  //     .select()
  //     .eq("id", currentUser.id)
  //     .single();

  //   if (error) {
  //     throw new Error(error.message);
  //   }
  //   setAccountDetail(data);
  //   return data;
  // }

  // const { refetch } = useQuery({
  //   queryKey: ["settings-account"],
  //   queryFn: fetchAccount,
  //   initialData: initialValue,
  // });

  async function updateAccount(accountDetail: AccountDetailsType) {
    const { data, error } = await supabase
      .from("account")
      .update(accountDetail)
      .eq("id", currentUser?.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // refetch();
    return data;
  }

  async function submitAccountDetails() {
    const result = accountDetailsSchema.safeParse(accountDetail);
    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0].message,
      };
    }
    return { success: true, message: messages.settings.account.success };
  }

  const { isPending, mutate } = useMutation({
    mutationFn: updateAccount,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["settings-account"] });
      const previousData = queryClient.getQueryData(["settings-account"]);
      queryClient.setQueryData(["settings-account"], newData);
      return { previousData };
    },
    onError: (err, context) => {
      queryClient.setQueryData(["settings-account"], context);
      toast.error(messages.settings.account.error || err.message);
    },
    onSuccess: (context) => {
      toast.success(messages.settings.account.success);
      setAccountDetail(context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["settings-account"] });
    },
  });

  return {
    accountDetail,
    handleChange,
    submitAccountDetails,
    mutate,
    Loading: isPending,
    photo,
    setPhoto,
  };
}
