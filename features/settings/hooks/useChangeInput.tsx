import {
  accountDetailsSchema,
  AccountDetailsType,
} from "@/validation/profile.schema";
import React, { useState } from "react";
import { messages } from "@/messages";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { updateEmailAction } from "../actions/updateEmailAction";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import { getQueryClient } from "@/lib/get-query-client";
import { SettingsData } from "@/types/settings";

export default function useChangeInput(initialValue: AccountDetailsType) {
  const currentUser = useCurrentUser();

  const [accountDetail, setAccountDetail] = useState<AccountDetailsType>({
    email: initialValue.email,
    full_name: initialValue.full_name,
    job_title: initialValue.job_title || "",
    about: initialValue.about || "",
    location: initialValue.location || "",
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

  const queryClient = getQueryClient();
  const supabase = createClient();
  const isEmailChange = initialValue.email !== accountDetail.email;

  async function updateAccount({
    accountDetail,
    isEmailChange,
  }: {
    accountDetail: AccountDetailsType;
    isEmailChange: boolean;
  }) {
    const email = accountDetail.email.trim();
    if (isEmailChange) await updateEmailAction(email);

    const { data, error } = await supabase
      .from("profiles")
      .update(accountDetail)
      .eq("id", currentUser?.id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  }

  const { isPending, mutate } = useMutation({
    mutationFn: updateAccount,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["settings"] });
      const previousData = queryClient.getQueryData(["settings"]);
      return { previousData };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["settings"], context?.previousData);
      const errorMsg = variables.isEmailChange
        ? messages.settings.account.emailChangeError
        : messages.settings.account.error || err.message;
      toast.error(errorMsg);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["settings"], (old: SettingsData) => ({
        ...old,
        ...data,
      }));
      if (variables.isEmailChange) {
        toast.success(messages.settings.account.emailConfirm, {
          action: {
            label: "Open Email",
            onClick: () =>
              window.open(
                `https://mail.google.com/mail/u/0/?authuser=${variables.accountDetail.email}`,
                "_blank",
              ),
          },
        });
      } else {
        toast.success(messages.settings.account.success);
      }
      if (data) setAccountDetail(data);
    },
  });

  function handleSave() {
    const result = accountDetailsSchema.safeParse(accountDetail);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    mutate({ accountDetail, isEmailChange });
  }

  const handleCancel = () => setAccountDetail(initialValue);

  return {
    accountDetail,
    handleChange,
    handleSave,
    Loading: isPending,
    photo,
    setPhoto,
    handleCancel,
  };
}
