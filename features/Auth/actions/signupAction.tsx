"use server";

import { createClient } from "@/lib/supabase/server";

type SignupInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export async function signupAction(data: SignupInput) {
  const supabase = await createClient();

  const { error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.firstName + " " + data.lastName,
      },
    },
  });

  if (authError) {
    throw new Error(authError.message);
  }

  return true;
}
