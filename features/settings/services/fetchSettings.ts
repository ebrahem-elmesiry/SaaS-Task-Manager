"use server";

import { createClient } from "@/lib/supabase/server";

export default async function fetchSettings() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.rpc("get_current_user_settings");
  if (error) {
    console.error("Error fetching account data:", error);
    return null;
  }
  return data;
}
