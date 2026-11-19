
import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Verify the current user's Supabase identity
 * and membership in Doribabs admin_users.
 *
 * Use this helper when protecting admin pages
 * and when performing future CMS operations.
 */
export async function requireSchoolAdmin() {
  const supabase = await createClient();

  // Confirm identity with Supabase Auth.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  // Confirm that this user is a school administrator.
  const { data: administrator, error: adminError } =
    await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

  if (adminError || !administrator) {
    redirect("/admin/login?error=access_denied");
  }

  return {
    supabase,
    user,
    administrator,
  };
}
