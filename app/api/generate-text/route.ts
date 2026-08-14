import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/auth";
import { getCreditCost } from "@/lib/credits";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { prompt, type } = await req.json();

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

    // Temporary demo response
  const response = await fetch(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
   body: JSON.stringify({
  model: "openai/gpt-4.1-mini",
  max_tokens: 1000,
  temperature: 0.7,
  messages: [
        {
          role: "system",
          content:
            "You are a professional AI writer. Write high-quality content only.",
        },
        {
          role: "user",
          content: `Write a ${type} about:\n\n${prompt}`,
        },
      ],
    }),
  }
);

const ai = await response.json();

if (!response.ok) {
  throw new Error(
    ai.error?.message || "OpenRouter request failed"
  );
}

const generatedText =
  ai.choices?.[0]?.message?.content || "";
    const supabase = await createServerSupabase();

    await supabase
      .from("profiles")
      .update({
        credits: user.credits - creditCost,
      })
      .eq("id", user.id);
await supabase
  .from("documents")
  .insert({
    user_id: user.id,
    prompt,
    content: generatedText,
    type,
  });
    return NextResponse.json({
      success: true,
      text: generatedText,
      remainingCredits:
        user.credits - creditCost,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error.message || "Generation failed",
      },
      {
        status: 500,
      }
    );
  }
}