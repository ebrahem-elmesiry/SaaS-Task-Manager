"use server";

import { createClient } from "@/lib/supabase/server";

export default async function fetchSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_current_user_settings");
  if (error) {
    console.error("Error fetching account data:", error);
    return null;
  }
  return data;
}
