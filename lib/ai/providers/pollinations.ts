import axios from "axios";

export async function generatePollinationsImage(
  prompt: string,
  style: string
) {
  const finalPrompt = `${prompt}, ${style} style`;

  const seed = Math.floor(
    Math.random() * 2147483647
  );

  const imageUrl =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(
      finalPrompt
    )}?width=768&height=768&seed=${seed}&nologo=true`;

  console.log("Generating Pollinations image...");
  console.log("Pollinations URL:", imageUrl);

  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
    timeout: 120000,
    validateStatus: () => true,
  });

  console.log(
    "Pollinations status:",
    response.status
  );

  if (response.status !== 200) {
    throw new Error(
      `Pollinations returned status ${response.status}`
    );
  }

  return Buffer.from(response.data);
}