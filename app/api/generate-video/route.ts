import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/auth";
import { createServerSupabase } from "@/lib/supabase/server";
import { saveGeneratedVideo } from "@/lib/supabase/videos-server";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const {
      prompt,
      style,
      duration,
      resolution,
    } = body;

    if (!prompt) {
      return NextResponse.json(
        {
          error: "Prompt is required",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      await createServerSupabase();

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("credits, plan")
        .eq("id", user.id)
        .single();

    if (!profile) {
      return NextResponse.json(
        {
          error: "Profile not found",
        },
        {
          status: 404,
        }
      );
    }

    const videoCost = 5;

    if (
      profile.plan !== "pro" &&
      profile.credits < videoCost
    ) {
      return NextResponse.json(
        {
          error:
            "You need at least 5 credits.",
        },
        {
          status: 403,
        }
      );
    }

    // Demo video
    const demoVideo =
      "https://www.w3schools.com/html/mov_bbb.mp4";
          // Save video in database
    await saveGeneratedVideo(
      user.id,
      prompt,
      demoVideo,
      style,
      duration,
      resolution
    );

    // Deduct credits ONLY for free users
    if (profile.plan !== "pro") {
      await supabase
        .from("profiles")
        .update({
          credits: profile.credits - videoCost,
        })
        .eq("id", user.id);
    }

    return NextResponse.json({
      success: true,
      video: demoVideo,
      remainingCredits:
        profile.plan === "pro"
          ? profile.credits
          : profile.credits - videoCost,
    });
      } catch (error: any) {
   console.error(JSON.stringify(error, null, 2));

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Video generation failed.",
      },
      {
        status: 500,
      }
    );
  }
}