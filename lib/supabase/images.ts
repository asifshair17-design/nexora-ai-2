import { createServerSupabase } from "@/lib/supabase/server";

export async function saveGeneratedImage(
  userId: string,
  imageUrl: string,
  prompt: string
) {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from("generated_images")
    .insert({
      user_id: userId,
      image_url: imageUrl,
      prompt,
    });

  if (error) {
    console.error("Failed to save image:", error);
  }
}