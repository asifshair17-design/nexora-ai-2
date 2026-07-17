import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { id, amount } = await req.json();

  const supabase = await createServerSupabase();

  // Get current credits
  const { data: user } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", id)
    .single();

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  // Never allow negative credits
  const newCredits = Math.max(0, user.credits - amount);

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
  });
}