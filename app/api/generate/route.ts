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
      style,
      size,
      provider = "basic",
      type = "image",
    } = body;

    if (!prompt) {
      return NextResponse.json(
        {
          error: "Prompt is required",
        },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();

    const cookieStore = await cookies();

    let visitorId =
      cookieStore.get(
        "nexora_visitor_id"
      )?.value;

    let shouldSetCookie = false;

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      shouldSetCookie = true;
    }

    // ========================================
    // ANONYMOUS USER
    // ========================================

    if (!user) {
      const used =
        await getAnonymousTodayUsage(
          visitorId
        );

      if (
        used >=
        ANONYMOUS_DAILY_LIMIT
      ) {
        const response =
          NextResponse.json(
            {
              error:
                "You have used all 30 free generations for today.",
              code:
                "ANONYMOUS_DAILY_LIMIT",
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
                process.env.NODE_ENV ===
                "production",
              sameSite: "lax",
              maxAge:
                60 * 60 * 24 * 365,
              path: "/",
            }
          );
        }

        return response;
      }

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

      // Anonymous visitors use the basic generator
      const imageBuffer =
        await generateImage(
          finalPrompt,
          style,
          size,
          false
        );

      const imageUrl =
        await saveAnonymousGeneratedImage(
          visitorId,
          imageBuffer
        );

      await recordAnonymousUsage(
        visitorId
      );

      const newUsed =
        used + 1;

      const remaining =
        Math.max(
          0,
          ANONYMOUS_DAILY_LIMIT -
            newUsed
        );

      const response =
        NextResponse.json({
          success: true,
          image: imageUrl,
          anonymous: true,
          used: newUsed,
          remaining,
          dailyLimit:
            ANONYMOUS_DAILY_LIMIT,
        });

      if (shouldSetCookie) {
        response.cookies.set(
          "nexora_visitor_id",
          visitorId,
          {
            httpOnly: true,
            secure:
              process.env.NODE_ENV ===
              "production",
            sameSite: "lax",
            maxAge:
              60 * 60 * 24 * 365,
            path: "/",
          }
        );
      }

      return response;
    }

    // ========================================
    // LOGGED-IN USER
    // ========================================

    const plan = getPlan(
      user.plan === "pro"
        ? "pro"
        : "free"
    );

    const todayUsage =
      await getTodayUsage(
        user.id
      );

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

    // Keep your existing credit calculation
    const {
      getCreditCost,
    } = await import(
      "@/lib/credits"
    );

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
            "Not enough credits.",
        },
        { status: 403 }
      );
    }

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

    const imageBuffer =
      await generateImage(
        finalPrompt,
        style,
        size,
        isPro
      );

    const imageUrl =
      await saveGeneratedImage(
        user.id,
        imageBuffer,
        finalPrompt
      );

    await recordUsage(
      user.id
    );

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
        user.credits,
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
          "Generation failed",
      },
      { status: 500 }
    );
  }
}