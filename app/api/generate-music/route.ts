import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      prompt,
      style,
      mood,
      duration,
    } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Music prompt is required." },
        { status: 400 }
      );
    }

    console.log("🎵 Demo music request:", {
      userId: user.id,
      prompt,
      style,
      mood,
      duration,
    });

    return NextResponse.json({
      success: true,
      message: "Demo music generated successfully.",
      audio: "/audio/demo-music.wav",
    });
  } catch (error: any) {
    console.error("Music API Error:", error);

    return NextResponse.json(
      {
        error: error?.message || "Music generation failed.",
      },
      { status: 500 }
    );
  }
}
