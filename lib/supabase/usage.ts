import { createServerSupabase } from "./server";

// ==========================================
// CONSTANTS
// ==========================================

const DAILY_LIMIT = 30;

// ==========================================
// LOGGED-IN USER USAGE
// ==========================================

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

  return data;
}

export async function getTodayUsage(userId: string) {
  const supabase = await createServerSupabase();

  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

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

export async function getRemainingUsage(userId: string) {
  const used = await getTodayUsage(userId);

  return {
    used,
    remaining: Math.max(
      0,
      DAILY_LIMIT - used
    ),
  };
}

// ==========================================
// ANONYMOUS VISITOR USAGE
// ==========================================

export async function recordAnonymousUsage(
  visitorId: string
) {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from("anonymous_usage")
    .insert({
      visitor_id: visitorId,
    });

  if (error) {
    throw error;
  }
}

export async function getAnonymousTodayUsage(
  visitorId: string
) {
  const supabase = await createServerSupabase();

  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("anonymous_usage")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("visitor_id", visitorId)
    .gte(
      "created_at",
      startOfDay.toISOString()
    );

  if (error) {
    throw error;
  }

  return count ?? 0;
}

export async function getAnonymousRemainingUsage(
  visitorId: string
) {
  const used =
    await getAnonymousTodayUsage(
      visitorId
    );

  return {
    used,
    remaining: Math.max(
      0,
      DAILY_LIMIT - used
    ),
  };
}