import { createServerSupabase } from "./server";

export async function getCurrentUser() {
  try {
    const supabase = await createServerSupabase();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // No login = anonymous visitor
    if (error) {
      if (
        error.message === "Auth session missing!" ||
        error.name === "AuthSessionMissingError"
      ) {
        return null;
      }

      console.error("Auth error:", error);
      return null;
    }

    if (!user) {
      return null;
    }

    // Get profile
    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select("credits, plan")
        .eq("id", user.id)
        .single();

    if (profileError) {
      console.error(
        "Profile error:",
        profileError.message
      );

      return null;
    }

    return {
      id: user.id,
      email: user.email,
      credits: profile?.credits ?? 0,
      plan: profile?.plan ?? "free",
    };
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}