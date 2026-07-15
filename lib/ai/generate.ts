import { generatePollinationsImage } from "./providers/pollinations";

function buildPrompt(
  prompt: string,
  style: string
) {
  const stylePrompts: Record<string, string> = {
    Realistic:
      "ultra realistic, professional photography, 8k, HDR, highly detailed, masterpiece, sharp focus",

    Anime:
      "anime style, vibrant colors, masterpiece, detailed illustration, studio quality",

    Fantasy:
      "epic fantasy artwork, magical atmosphere, cinematic lighting, highly detailed",

    Cyberpunk:
      "cyberpunk city, neon lights, futuristic, cinematic, ultra detailed",

    Pixel:
      "pixel art, retro game style, clean pixels, vibrant colors",

    Cartoon:
      "cartoon style, colorful, Disney quality, cute, smooth illustration",

    Cinematic:
      "cinematic composition, dramatic lighting, movie scene, masterpiece",

    Oil:
      "oil painting, brush strokes, museum quality artwork",
  };

  return `${prompt}, ${
    stylePrompts[style] || stylePrompts.Realistic
  }`;
}

export async function generateImage(
  prompt: string,
  style: string,
  size: string
) {
  console.log("Requested size:", size);

  const enhancedPrompt = buildPrompt(
    prompt,
    style
  );

  return generatePollinationsImage(
    enhancedPrompt,
    style
  );
}