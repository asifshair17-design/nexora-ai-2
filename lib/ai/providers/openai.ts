import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateOpenAIImage(
  prompt: string
) {
  const result = await client.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024",
  });

  const image = result.data?.[0];

  if (!image?.b64_json) {
    throw new Error("No image returned from OpenAI");
  }

  return Buffer.from(image.b64_json, "base64");
}