import { createServerSupabase } from "./server";

export async function getCurrentUser() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, pro_expires_at")
    .eq("id", user.id)
    .single();

  let plan = profile?.plan ?? "free";

  // Automatically downgrade expired Pro users
  if (
    plan === "pro" &&
    profile?.pro_expires_at &&
    new Date(profile.pro_expires_at) < new Date()
  ) {
    await supabase
      .from("profiles")
      .update({
        plan: "free",
        pro_expires_at: null,
      })
      .eq("id", user.id);

    plan = "free";
  }

  return {
    ...user,
    plan,
  };
}