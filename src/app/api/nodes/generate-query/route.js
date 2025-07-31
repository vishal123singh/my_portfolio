// app/api/generate-query/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export async function POST(request) {
  try {
    const { dbType, operation, prompt, schema, tables } = await request.json();

    if (!dbType || !operation || !prompt) {
      return NextResponse.json(
        { error: "Missing required fields (dbType, operation, prompt)" },
        { status: 400 }
      );
    }

    let systemPrompt = `You are a senior ${dbType} database engineer. Generate a valid ${dbType} ${operation} query based on the user's request.`;

    if (schema && tables) {
      systemPrompt += `\n\nDatabase Schema:\n${JSON.stringify(
        { schema, tables },
        null,
        2
      )}`;
    }

    if (operation === "read") {
      systemPrompt += `\n\nFor read operations, include appropriate filtering, sorting, and projection if mentioned.`;
    } else if (operation === "write") {
      systemPrompt += `\n\nFor write operations, ensure all required fields are included and data types match the schema.`;
    }

    // Format-enforcing examples and constraints
    systemPrompt += `
- Only output the final query, no explanation.
- For MongoDB, always return raw JSON (without markdown/code block formatting).
- For SQL, return valid SQL as a string.
- Do not wrap the response with \`\`\` or any extra content.

Examples:
SQL:
SELECT * FROM users WHERE age > 30 ORDER BY created_at DESC;

MongoDB:
{ "collection": "users", "filter": { "age": { "$gt": 30 } }, "sort": { "created_at": -1 } }
`;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    let responseContent = completion.choices[0]?.message?.content?.trim();
    if (!responseContent) {
      throw new Error("AI response is empty");
    }

    // Remove code blocks and sanitize
    responseContent = responseContent.replace(/^```[a-z]*\n?|```$/g, "").trim();

    let parsedQuery;

    if (dbType.toLowerCase() === "mongodb") {
      try {
        parsedQuery = JSON.parse(responseContent);
      } catch (err) {
        throw new Error("AI returned invalid JSON: " + responseContent);
      }
    } else {
      // For SQL or others, return as string
      parsedQuery = responseContent;
    }

    return NextResponse.json({
      success: true,
      query: parsedQuery,
      dbType,
      operation,
    });
  } catch (error) {
    console.error("Error generating query:", error);
    return NextResponse.json(
      { error: "Failed to generate query", details: error.message },
      { status: 500 }
    );
  }
}
