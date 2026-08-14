import { supabase } from "@/lib/supabase/browser";

export async function getCurrentCredits() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("credits, plan")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data;
}

export async function hasEnoughCredits(cost: number) {
  const profile = await getCurrentCredits();

  if (!profile) return false;

  // Pro users have unlimited usage
  if (profile.plan === "pro") return true;

  return (profile.credits ?? 0) >= cost;
}

export async function deductCredits(cost: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const profile = await getCurrentCredits();

  if (!profile) return false;

  // Don't deduct from Pro users
  if (profile.plan === "pro") return true;

  const remaining = Math.max(
    (profile.credits ?? 0) - cost,
    0
  );

  const { error } = await supabase
    .from("profiles")
    .update({
      credits: remaining,
    })
    .eq("id", user.id);

  if (error) throw error;

  return true;
}