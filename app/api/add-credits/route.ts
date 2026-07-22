import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { ADMIN_EMAIL } from "@/lib/admin";

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabase();

  // Verify logged in user
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

  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", id)
    .single();

  if (fetchError) {
    return NextResponse.json(
      { error: fetchError.message },
      { status: 500 }
    );
  }

  const newCredits = (profile.credits ?? 0) + amount;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      credits: newCredits,
    })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    credits: newCredits,
  });
}