import axios from "axios";

export async function generatePollinationsImage(
  prompt: string,
  style: string
) {
  const finalPrompt = `${prompt}, ${style} style`;

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    finalPrompt
  )}?width=1024&height=1024&seed=${Date.now()}`;

  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      validateStatus: () => true,
    });

    if (response.status !== 200) {
      console.log(
        "Pollinations Error:",
        Buffer.from(response.data).toString()
      );

      throw new Error(
        Buffer.from(response.data).toString()
      );
    }

    return Buffer.from(response.data);
  } catch (err: any) {
    console.log("FULL ERROR:", err);

    throw err;
  }
}