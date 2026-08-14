export async function generateOpenAIText(
  prompt: string
) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
   model: "mistralai/mistral-small-3.2-24b-instruct:free",

        messages: [
          {
            role: "system",
            content:
              "You are a professional AI writing assistant. Always return high-quality writing.",
          },

          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error?.message || "OpenRouter Error"
    );
  }

  const data = await response.json();

  return data.choices[0].message.content;
}