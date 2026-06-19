"use server";

import { createClient } from "@/lib/supabase/server";

export async function loginAction(formData: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return true;
}
