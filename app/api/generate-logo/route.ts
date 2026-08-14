import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const finalPrompt = `
Professional logo.

Style: ${style}

Prompt:
${prompt}

Vector logo.
Minimal.
Transparent background.
Premium quality.
    `;

    // -------------------------
    // TEMPORARY MOCK RESPONSE
    // -------------------------
    // We'll connect the real AI next.

    return NextResponse.json({
      success: true,
      image:
        "https://placehold.co/1024x1024/png?text=Nexora+Logo",
      prompt: finalPrompt,
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