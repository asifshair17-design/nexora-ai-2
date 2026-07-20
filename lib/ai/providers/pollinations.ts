import axios from "axios";

export async function generatePollinationsImage(
  prompt: string,
  style: string
) {
  const finalPrompt = `${prompt}, ${style} style`;

  // Random seed within Pollinations limit
  const seed = Math.floor(Math.random() * 2147483647);

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    finalPrompt
  )}?width=768&height=768&seed=${seed}&model=sana`;

  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
    validateStatus: () => true,
  });

  if (response.status !== 200) {
    console.error(
      "Pollinations error:",
      Buffer.from(response.data).toString()
    );

    throw new Error(
      Buffer.from(response.data).toString()
    );
  }

  return Buffer.from(response.data);
}