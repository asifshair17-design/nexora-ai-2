import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createServerSupabase();

  // Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();
console.log("Current API user:", user);
  // Not logged in
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Only your admin email can access
  if (user.email !== "asifshair25@gmail.com") {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

 // Get all users
const { data, error } = await supabase
  .from("profiles")
  .select("id, email, plan, credits, created_at, pro_expires_at")
  .order("created_at", { ascending: false });

if (error) {
  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  );
}

// Add image count for each user
const usersWithCounts = await Promise.all(
  data.map(async (user) => {
    const { count } = await supabase
      .from("images")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

   const { count: favoriteCount } = await supabase
  .from("images")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("user_id", user.id)
  .eq("favorite", true);
const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

const { count: todayUsage } = await supabase
  .from("usage")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("user_id", user.id)
  .gte("created_at", startOfDay.toISOString());
return {
  ...user,
  image_count: count || 0,
  favorite_count: favoriteCount || 0,
  today_usage: todayUsage || 0,
};
  })
);

return NextResponse.json(usersWithCounts);
}