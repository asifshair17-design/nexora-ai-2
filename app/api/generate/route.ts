import {
  saveGeneratedImage,
  saveAnonymousGeneratedImage,
} from "@/lib/supabase/images";

import {
  getTodayUsage,
  recordUsage,
  getAnonymousTodayUsage,
  recordAnonymousUsage,
} from "@/lib/supabase/usage";

import { getCurrentUser } from "@/lib/supabase/auth";
import { getPlan } from "@/lib/plans/limits";
import { generateImage } from "@/lib/ai/generate";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const ANONYMOUS_DAILY_LIMIT = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      prompt,
      style = "Realistic",
      size = "Square",
      provider = "basic",
      type = "image",
    } = body;

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        {
          error: "Prompt is required.",
        },
        { status: 400 }
      );
    }

    // Get current logged-in user if available
    const user = await getCurrentUser();

    const cookieStore = await cookies();

    // =====================================================
    // CREATE / GET ANONYMOUS VISITOR ID
    // =====================================================

    let visitorId =
      cookieStore.get("nexora_visitor_id")?.value;

    let shouldSetCookie = false;

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      shouldSetCookie = true;
    }

    // =====================================================
    // ANONYMOUS USER
    // NO LOGIN REQUIRED
    // 30 GENERATIONS PER DAY
    // =====================================================

    if (!user) {
      const used = await getAnonymousTodayUsage(
        visitorId
      );

      console.log(
        "Anonymous visitor:",
        visitorId,
        "Used:",
        used,
        "Limit:",
        ANONYMOUS_DAILY_LIMIT
      );

      // Already used 30
      if (used >= ANONYMOUS_DAILY_LIMIT) {
        const response = NextResponse.json(
          {
            success: false,
            error:
              "You have used all 30 free image generations for today.",
            code: "ANONYMOUS_DAILY_LIMIT",
            remaining: 0,
            requiresLogin: true,
          },
          { status: 403 }
        );

        if (shouldSetCookie) {
          response.cookies.set(
            "nexora_visitor_id",
            visitorId,
            {
              httpOnly: true,
              secure:
                process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 60 * 60 * 24 * 365,
              path: "/",
            }
          );
        }

        return response;
      }

      // ===================================================
      // PREPARE PROMPT
      // ===================================================

      let finalPrompt = prompt.trim();

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

      // ===================================================
      // GENERATE IMAGE
      // ===================================================

      const imageBuffer = await generateImage(
        finalPrompt,
        style,
        size,
        false
      );

      // ===================================================
      // SAVE ANONYMOUS IMAGE
      // ===================================================

      const imageUrl =
        await saveAnonymousGeneratedImage(
          visitorId,
          imageBuffer
        );

      // ===================================================
      // RECORD USAGE
      // ===================================================

      await recordAnonymousUsage(
        visitorId
      );

      const newUsed = used + 1;

      const remaining = Math.max(
        0,
        ANONYMOUS_DAILY_LIMIT - newUsed
      );

      // ===================================================
      // RESPONSE
      // ===================================================

      const response = NextResponse.json({
        success: true,
        image: imageUrl,
        anonymous: true,
        used: newUsed,
        remaining,
        dailyLimit: ANONYMOUS_DAILY_LIMIT,
      });

      // ===================================================
      // SAVE VISITOR COOKIE
      // ===================================================

      if (shouldSetCookie) {
        response.cookies.set(
          "nexora_visitor_id",
          visitorId,
          {
            httpOnly: true,
            secure:
              process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
          }
        );
      }

      return response;
    }

    // =====================================================
    // LOGGED-IN USER
    // =====================================================

    const plan = getPlan(
      user.plan === "pro"
        ? "pro"
        : "free"
    );

    const todayUsage =
      await getTodayUsage(user.id);

    if (
      todayUsage >=
      plan.dailyImages
    ) {
      return NextResponse.json(
        {
          error:
            "Daily limit reached. Upgrade to Pro for more generations.",
        },
        { status: 403 }
      );
    }

    const isPro =
      user.plan === "pro";

    // =====================================================
    // CREDIT SYSTEM
    // =====================================================

    const {
      getCreditCost,
    } = await import("@/lib/credits");

    const creditCost =
      getCreditCost(
        provider === "fast" ||
        provider === "pro" ||
        provider === "premium"
          ? provider
          : "basic"
      );

    if (
      !isPro &&
      user.credits < creditCost
    ) {
      return NextResponse.json(
        {
          error:
            "Not enough credits. Upgrade to Pro.",
        },
        { status: 403 }
      );
    }

    // =====================================================
    // PREPARE PROMPT
    // =====================================================

    let finalPrompt = prompt.trim();

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

    // =====================================================
    // GENERATE LOGGED-IN IMAGE
    // =====================================================

    const imageBuffer =
      await generateImage(
        finalPrompt,
        style,
        size,
        isPro
      );

    // =====================================================
    // SAVE IMAGE
    // =====================================================

    const imageUrl =
      await saveGeneratedImage(
        user.id,
        imageBuffer,
        finalPrompt
      );

    // =====================================================
    // RECORD USAGE
    // =====================================================

    await recordUsage(user.id);

    const updatedUsage =
      todayUsage + 1;

    return NextResponse.json({
      success: true,
      image: imageUrl,
      anonymous: false,
      used: updatedUsage,
      remaining: Math.max(
        0,
        plan.dailyImages -
          updatedUsage
      ),
      remainingCredits:
        Math.max(
          0,
          user.credits - creditCost
        ),
    });

  } catch (error: any) {
    console.error(
      "Image API Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Generation failed.",
      },
      { status: 500 }
    );
  }
}