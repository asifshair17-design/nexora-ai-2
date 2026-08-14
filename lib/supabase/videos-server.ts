import { createServerSupabase } from "@/lib/supabase/server";

export async function saveGeneratedVideo(
  userId: string,
  prompt: string,
  videoUrl: string,
  style: string,
  duration: string,
  resolution: string
) {
  const server = await createServerSupabase();

  const { data, error } = await server
    .from("videos")
    .insert({
      user_id: userId,
      prompt,
      video_url: videoUrl,
      style,
      duration,
      resolution,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}