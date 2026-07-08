import { NextResponse } from "next/server";
import { generateImage } from "@/lib/ai/generate";

export async function POST(req: Request) {
  try {
    const { prompt, style, size } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const image = await generateImage(
      prompt,
      style,
      size
    );

    return NextResponse.json({
      image,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}