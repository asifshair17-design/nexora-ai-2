import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style, size } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Enhance the prompt with the selected style
    const finalPrompt = `${prompt}, ${style} style`;

    // (We'll use 'size' later when we move to a model that supports it.)
    console.log("Requested size:", size);

   const image = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?t=${Date.now()}`;

    return NextResponse.json({ image });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}