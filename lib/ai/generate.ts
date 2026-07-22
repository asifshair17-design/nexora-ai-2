import { generatePollinationsImage } from "./providers/pollinations";
import { generateOpenAIImage } from "./providers/openai";

function buildPrompt(
  prompt: string,
  style: string
) {
  const stylePrompts: Record<string, string> = {
    Realistic:
      "ultra realistic, professional photography, 8k, HDR, masterpiece",

    Anime:
      "anime style, vibrant colors, detailed illustration",

    Fantasy:
      "epic fantasy artwork, magical atmosphere",

    Cyberpunk:
      "cyberpunk, neon lights, futuristic",

    Pixel:
      "pixel art, retro game",

    Cartoon:
      "cartoon style, colorful",

    Cinematic:
      "cinematic lighting, movie scene",

    Oil:
      "oil painting, museum quality",
  };

  return `${prompt}, ${
    stylePrompts[style] || stylePrompts.Realistic
  }`;
}

export async function generateImage(
  prompt: string,
  style: string,
  size: string,
  isPro: boolean
) {
  const enhancedPrompt = buildPrompt(prompt, style);

  if (isPro) {
    console.log("⭐ Using OpenAI Image API");
    return await generateOpenAIImage(enhancedPrompt);
  }

  console.log("🆓 Using Pollinations AI");
  return await generatePollinationsImage(
    enhancedPrompt,
    style
  );
}