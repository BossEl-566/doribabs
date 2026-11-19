
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  error: string | null;
};

/**
 * Authenticate a school administrator.
 */
export async function login(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      error: "Please enter your email and password.",
    };
  }

  const supabase = await createClient();

  // Step 1: Sign in with Supabase Auth.
  const { error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  
if (signInError) {
  console.error("SUPABASE LOGIN FAILED:", {
    message: signInError.message,
    code: signInError.code,
    status: signInError.status,
    project: new URL(
      process.env.NEXT_PUBLIC_SUPABASE_URL!
    ).hostname,
  });

  return {
    error: "Authentication failed. Please verify your credentials.",
  };
}


  // Step 2: Verify the authenticated user.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    await supabase.auth.signOut();

    return {
      error: "Unable to verify your account. Please try again.",
    };
  }

  // Step 3: Check administrator membership.
  const { data: administrator, error: adminError } =
    await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

  if (adminError || !administrator) {
    await supabase.auth.signOut();

    return {
      error:
        "This account is not authorised to access the school administration dashboard.",
    };
  }

  // Step 4: Redirect after successful authentication.
  redirect("/admin");
}

/**
 * Sign out the currently authenticated user.
 */
export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/admin/login");
}
