import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/auth";
import { createServerSupabase } from "@/lib/supabase/server";
import { getCreditCost } from "@/lib/credits";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt required" },
        { status: 400 }
      );
    }

    const creditCost = getCreditCost("text");

    if (user.credits < creditCost) {
      return NextResponse.json(
        { error: "Not enough credits." },
        { status: 403 }
      );
    }

    // Temporary AI reply
    const reply = `You asked:

"${prompt}"

This is a temporary AI Chat response.

Later we'll connect OpenAI or OpenRouter here.`;

    const supabase = await createServerSupabase();

    // Deduct credits
    await supabase
      .from("profiles")
      .update({
        credits: user.credits - creditCost,
      })
      .eq("id", user.id);

    // Save chat history
    await supabase
      .from("documents")
      .insert({
        user_id: user.id,
        prompt,
        content: reply,
        type: "Chat",
      });

    return NextResponse.json({
      success: true,
      reply,
      remainingCredits:
        user.credits - creditCost,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error.message || "Chat failed",
      },
      {
        status: 500,
      }
    );
  }
}