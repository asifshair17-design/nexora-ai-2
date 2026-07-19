export async function generateStabilityImage(
  prompt: string
) {
  const url =
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(prompt);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Pollinations returned ${response.status}`
      );
    }

    const arrayBuffer = await response.arrayBuffer();

    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Pollinations Error:", error);
    throw error;
  }
}