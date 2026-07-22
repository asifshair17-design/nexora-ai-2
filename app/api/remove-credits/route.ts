import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

const ADMIN_EMAIL = "asifshair25@gmail.com";

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabase();

  // Verify logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Verify admin
  if (user.email !== ADMIN_EMAIL) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const { id, amount } = await req.json();

  // Get current credits
  const { data: profile } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", id)
    .single();

  if (!profile) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  // Never allow negative credits
  const newCredits = Math.max(
    0,
    (profile.credits ?? 0) - amount
  );

  const { error } = await supabase
    .from("profiles")
    .update({
      credits: newCredits,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    credits: newCredits,
  });
}