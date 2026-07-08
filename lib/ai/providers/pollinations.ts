export async function generatePollinationsImage(
  prompt: string,
  style: string
) {
  const finalPrompt = `${prompt}, ${style} style`;

  const image = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    finalPrompt
  )}?t=${Date.now()}`;

  return image;
}