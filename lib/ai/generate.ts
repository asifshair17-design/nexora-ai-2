import { generatePollinationsImage } from "./providers/pollinations";

export async function generateImage(
  prompt: string,
  style: string,
  size: string
) {
  // We'll use "size" later when we support multiple providers.
  console.log("Requested size:", size);

  return generatePollinationsImage(prompt, style);
}