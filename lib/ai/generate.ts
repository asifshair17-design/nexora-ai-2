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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateImage(
  prompt: string,
  style: string,
  size: string,
  isPro: boolean
) {
  const enhancedPrompt = buildPrompt(prompt, style);

  // ==========================================
  // PRO USERS
  // ==========================================

  if (isPro) {
    console.log("⭐ Using OpenAI Image API");

    return await generateOpenAIImage(
      enhancedPrompt
    );
  }

  // ==========================================
  // FREE / ANONYMOUS USERS
  // ==========================================

  console.log("🆓 Using Pollinations AI");

  let lastError: unknown = null;

  // Try up to 3 times if the AI backend is busy
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(
        `Pollinations attempt ${attempt}/3`
      );

      const result =
        await generatePollinationsImage(
          enhancedPrompt,
          style
        );

      return result;

    } catch (error) {
      lastError = error;

      console.error(
        `Pollinations attempt ${attempt} failed:`,
        error
      );

      // Wait before trying again
      if (attempt < 3) {
        await sleep(3000);
      }
    }
  }

  // All attempts failed
  throw new Error(
    "The free AI image service is temporarily busy. Please try again in a few seconds."
  );
}