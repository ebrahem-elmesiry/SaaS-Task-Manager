"use server";

import { createClient } from "@/lib/supabase/server";

export async function changePasswordAction(data: {
  currentPassword: string;
  newPassword: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("Not authenticated");

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: data.currentPassword,
  });
  if (verifyError) {
    throw new Error("Current password is incorrect");
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: data.newPassword,
  });
  if (updateError) throw new Error(updateError.message);
}
