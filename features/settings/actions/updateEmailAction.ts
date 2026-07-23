"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateEmailAction(newEmail: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("Not authenticated");

  const { error: updateError } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: `http://localhost:3000/settings`,
    },
  );
  if (updateError) {
    console.log("updateError", updateError);
    throw new Error(updateError.message);
  }
}
