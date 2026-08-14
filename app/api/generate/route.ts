import { createServerSupabase } from "@/lib/supabase/server";
import { saveGeneratedImage } from "@/lib/supabase/images";
import { getPlan } from "@/lib/plans/limits";
import { getTodayUsage, recordUsage } from "@/lib/supabase/usage";
import { getCurrentUser } from "@/lib/supabase/auth";
import { NextResponse } from "next/server";
import { generateImage } from "@/lib/ai/generate";
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

    const plan = getPlan(
      user.plan === "pro" ? "pro" : "free"
    );

    const todayUsage = await getTodayUsage(user.id);

    if (todayUsage >= plan.dailyImages) {
      return NextResponse.json(
        {
          error:
            "Daily limit reached. Upgrade to Pro for unlimited generations.",
        },
        { status: 403 }
      );
    }

    const {
      prompt,
      style,
      size,
      provider = "basic",
      type = "image",
    } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const creditCost = getCreditCost(
      provider === "fast" ||
      provider === "pro" ||
      provider === "premium"
        ? provider
        : "basic"
    );

    const isPro = user.plan === "pro";

    // Free users need credits.
    // Pro users are unlimited and don't need credits.
    if (!isPro && user.credits < creditCost) {
      return NextResponse.json(
        { error: "Not enough credits." },
        { status: 403 }
      );
    }

    // ------------------------
    // Build Prompt
    // ------------------------

    let finalPrompt = prompt;

    if (type === "logo") {
      finalPrompt = `
Professional logo.

Style:
${style}

Requirements:

Vector Logo
Transparent Background
Premium Branding
Minimal
High Contrast
Centered

${prompt}
`;
    }

    // ------------------------
    // Generate Image
    // ------------------------

    const imageBuffer = await generateImage(
      finalPrompt,
      style,
      size,
      isPro
    );

    // ------------------------
    // Save Image
    // ------------------------

    const imageUrl = await saveGeneratedImage(
      user.id,
      imageBuffer,
      finalPrompt
    );

    // ------------------------
    // Record Usage
    // ------------------------

    await recordUsage(user.id);

    // IMPORTANT:
    // Credit deduction is handled by the frontend
    // in your current Home page.
    //
    // Do NOT deduct credits here or users would
    // lose credits twice.

    return NextResponse.json({
      success: true,
      image: imageUrl,
      remainingCredits: user.credits,
    });

  } catch (error: any) {
    console.error("Image API Error:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Generation failed",
      },
      { status: 500 }
    );
  }
}