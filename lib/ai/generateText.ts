import { generateOpenAIText } from "./providers/openaiText";

export async function generateText(
  prompt: string,
  tone: string
) {
  const finalPrompt = `

Write in this tone:

${tone}

User Request:

${prompt}

Return only the final answer.

`;

  return await generateOpenAIText(
    finalPrompt
  );
}