import { supabase } from "@/lib/supabase/browser";

export async function saveGeneratedVideo(
  userId: string,
  prompt: string,
  videoUrl: string,
  style: string,
  duration: string,
  resolution: string
) {
  const { data, error } = await supabase
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

export async function getUserVideos(userId: string) {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data || [];
}

export async function deleteVideo(id: string) {
  const { error } = await supabase
    .from("videos")
    .delete()
    .eq("id", id);

  if (error) throw error;
}