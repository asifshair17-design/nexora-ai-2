import { saveGeneratedImage } from "@/lib/supabase/images";
import { getPlan } from "@/lib/plans/limits";
import { getTodayUsage } from "@/lib/supabase/usage";
import { recordUsage } from "@/lib/supabase/usage";
import { getCurrentUser } from "@/lib/supabase/auth";
import { NextResponse } from "next/server";
import { generateImage } from "@/lib/ai/generate";

export async function POST(req: Request) {const user = await getCurrentUser();

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
      error: "Daily limit reached. Upgrade to Pro.",
    },
    {
      status: 403,
    }
  );
}
  try {
    const { prompt, style, size } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }
const imageBuffer = await generateImage(
  prompt,
  style,
  size,
  user.plan === "pro"
);

const imageUrl = await saveGeneratedImage(
  user.id,
  imageBuffer,
  prompt
);

await recordUsage(user.id);

return NextResponse.json({
  image: imageUrl,
});
  } catch (error: any) {
  console.error("FULL ERROR:", error);

  return NextResponse.json(
    {
      error: error?.message || String(error),
    },
    {
      status: 500,
    }
  );
}
}