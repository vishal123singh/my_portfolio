import OpenAI from "openai";

export const runtime = "edge"; // IMPORTANT for streaming

// Initialize OpenAI client using OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export async function POST(req) {
  const { command, lastMessage, conversation, userName } = await req.json();

  const prompt = buildPrompt({
    command,
    lastMessage,
    conversation,
    userName,
  });

  const stream = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    stream: true,
    messages: prompt,
    temperature: 0.4,
  });

  console.log("stream", stream);

  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices?.[0]?.delta?.content;
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}

/* ---------------- PROMPT BUILDER ---------------- */

function buildPrompt({ command, lastMessage, conversation, userName }) {
  return [
    {
      role: "system",
      content: `
You are FireChat AI, a private writing assistant inside a real-time chat.

Your job:
- Help the user craft a reply
- Never send messages automatically
- Suggest replies only
- Be concise, natural, and human
- Match the conversation tone
- Do NOT mention being an AI
- Do NOT repeat the original message
- Output plain text only
- Separate suggestions with "---"

If the request is unclear, infer intent intelligently.
      `.trim(),
    },
    {
      role: "user",
      content: `
User: ${userName}

Conversation:
${conversation.map((m) => `${m.sender}: ${m.text}`).join("\n")}

Last message to reply to:
"${lastMessage}"

Command:
"${command}"

Give 3 suggested replies.
      `.trim(),
    },
  ];
}
