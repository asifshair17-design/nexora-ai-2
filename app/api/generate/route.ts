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

    const image = await generateImage(
  prompt,
  style,
  size
);

await saveGeneratedImage(
  user.id,
  image,
  prompt
);

await recordUsage(user.id);

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