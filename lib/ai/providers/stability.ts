export async function generateStabilityImage(
  prompt: string
) {
  const url =
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(prompt);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to generate image");
  }

  const arrayBuffer = await response.arrayBuffer();

  return Buffer.from(arrayBuffer);
}