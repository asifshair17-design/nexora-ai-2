import { createServerSupabase } from "@/lib/supabase/server";

export async function saveGeneratedImage(
  userId: string,
  imageBuffer: Buffer,
  prompt: string
) {
  const supabase = await createServerSupabase();

  const fileName = `${userId}/${Date.now()}.webp`;

  const { error: uploadError } = await supabase.storage
    .from("generated-images")
    .upload(fileName, imageBuffer, {
      contentType: "image/webp",
    });

  if (uploadError) {
    console.error(uploadError);
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("generated-images")
    .getPublicUrl(fileName);

  const { error } = await supabase
    .from("generated_images")
    .insert({
      user_id: userId,
      image_url: publicUrl,
      prompt,
    });

  if (error) {
    console.error(error);
  }

  return publicUrl;
}