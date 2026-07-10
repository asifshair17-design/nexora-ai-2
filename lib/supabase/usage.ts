import { createServerSupabase } from "./server";

export async function recordUsage(userId: string) {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("usage")
    .insert({
      user_id: userId,
    })
    .select();

  if (error) {
    throw error;
  }
}

export async function getTodayUsage(userId: string) {
  const supabase = await createServerSupabase();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("usage")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId)
    .gte("created_at", startOfDay.toISOString());

  if (error) {
    throw error;
  }

  return count ?? 0;
}

// 👇 Add this new function
export async function getRemainingUsage(userId: string) {
  const used = await getTodayUsage(userId);

  return {
    used,
    remaining: Math.max(0, 20 - used),
  };
}