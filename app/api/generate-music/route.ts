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

    /*
     * Music generation provider will be connected here.
     *
     * For now we return a clear response so we can
     * test the complete frontend → API connection.
     */

    console.log("🎵 Music request:", {
      userId: user.id,
      prompt,
      style,
      mood,
      duration,
    });

    return NextResponse.json({
      success: true,
      message: "Music API connection is ready.",
      audio: null,
    });
  } catch (error: any) {
    console.error("Music API Error:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Music generation failed.",
      },
      {
        status: 500,
      }
    );
  }
}