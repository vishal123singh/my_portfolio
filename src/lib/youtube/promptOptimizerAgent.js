import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export default async function promptOptimizerAgent(rawQuery) {
  try {
    const instruction = `
      Optimize the given prompt for efficient tool calling.

      Given Prompt: ${rawQuery}

      Return your response strictly in the following JSON format:

      {
        "prompt": "<optimized prompt>"
      }
    `;

    const response = await client.chat.completions.create({
      model: "google/gemma-3n-e2b-it:free",
      messages: [{ role: "user", content: instruction }],
      temperature: 0,
    });

    const content = response.choices?.[0]?.message?.content?.trim();
    console.log("content", content);

    if (!content) {
      throw new Error("Empty response from model");
    }

    let optimized;

    if (isValidJSON(content)) {
      optimized = JSON.parse(content);
    } else {
      const match = content.match(/{[^{}]*}/);
      if (match) {
        try {
          optimized = JSON.parse(match[0]);
          console.log("Extracted optimized:", optimized);
        } catch {
          throw new Error(`Failed to parse extracted JSON: ${match[0]}`);
        }
      } else {
        throw new Error(`Model did not return valid JSON: ${content}`);
      }
    }

    return optimized;
  } catch (error) {
    console.error("Prompt optimizer failed:", error);
    return null;
  }
}

function isValidJSON(input) {
  if (typeof input !== "string") return false;
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
}
