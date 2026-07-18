import axios from "axios";
import FormData from "form-data";

export async function generateStabilityImage(
  prompt: string
) {
  const payload = {
    prompt,
    output_format: "webp",
  };

  const response = await axios.postForm(
    "https://api.stability.ai/v2beta/stable-image/generate/ultra",
    axios.toFormData(payload, new FormData()),
    {
      validateStatus: undefined,
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        Accept: "image/*",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(
      `${response.status}: ${Buffer.from(response.data).toString()}`
    );
  }

  return Buffer.from(response.data);
}