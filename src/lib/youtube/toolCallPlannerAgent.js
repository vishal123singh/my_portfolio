import OpenAI from "openai";
import YOUTUBE_TOOLS from "./tools.schema";

const client = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export default async function toolCallPlannerAgent(optimizedPrompt) {
  try {
    const instruction = `
You are an expert tool-calling strategist.

Your job is to generate a plan for calling tools in sequence to fulfill the user's prompt.

---

### ✅ What You Must Do

1. Choose which tools to call (from the list below).
2. Define the order in which they should be used.
3. For each tool, list the arguments:
   - Arguments can come from:
     - The user's original prompt
     - The output of a previous tool (use logical paths based on the tool's output schema)
   - If argument comes from a tool, always specify the JSON "path" to extract it.

---

### ⚠️ Rules

- Use ONLY the tools listed below.
- Do NOT include explanations or extra text.
- Respond ONLY with a **valid JSON array**, following this format:

\`\`\`json
[
  {
    "tool_name": "<tool_name>",
    "tool_arguments": [
      {
        "name": "<argument_name>",
        "source": "prompt" | "<tool_name>",
        "path": "<json_path>" // only required if source is a tool
      }
    ]
  }
]
\`\`\`

---

### 🔧 Tool Definitions

1. **youtube_search_videos**
- 🔍 Description: Search for YouTube videos by keyword
- 📥 Input:
  \`\`\`json
  {
    "query": "string",
    "maxResults": "number (optional, default: 5)"
  }
  \`\`\`
- 📤 Output:
  \`\`\`json
  {
    "result": [
      {
        "title": "string",
        "videoId": "string",
        "channelTitle": "string",
        "publishedAt": "string",
        "thumbnail": "string"
      }
    ]
  }
  \`\`\`

---

2. **youtube_video_details**
- 🔍 Description: Get details of a YouTube video by ID
- 📥 Input:
  \`\`\`json
  {
    "videoId": "string" // must be 11-character YouTube video ID
  }
  \`\`\`
- 📤 Output:
  \`\`\`json
  {
    "result": {
      "title": "string",
      "description": "string",
      "publishedAt": "string",
      "viewCount": "string",
      "likeCount": "string",
      "commentCount": "string",
      "duration": "string",
      "thumbnails": "object",
      "channelTitle": "string",
      "tags": "array of strings"
    }
  }
  \`\`\`

---

### 🔄 Example Output

\`\`\`json
[
  {
    "tool_name": "youtube_search_videos",
    "tool_arguments": [
      { "name": "query", "source": "prompt" }
    ]
  },
  {
    "tool_name": "youtube_video_details",
    "tool_arguments": [
      {
        "name": "videoId",
        "source": "youtube_search_videos",
        "path": "result[0].videoId"
      }
    ]
  }
]
\`\`\`

---

### 📝 User Prompt:
${optimizedPrompt}
`;

    const response = await client.chat.completions.create({
      model: "google/gemma-3n-e2b-it:free",
      messages: [{ role: "user", content: instruction }],
      temperature: 0,
    });

    const content = response.choices?.[0]?.message?.content?.trim();
    console.log("content at toolCallPlannerAgent:", content);

    if (!content) throw new Error("Empty response from model");

    let toolPlan;

    if (isValidJSON(content)) {
      toolPlan = JSON.parse(content);
      console.log("Parsed Valid JSON:", toolPlan);
    } else {
      console.log("Invalid JSON – trying to extract...");
      const regex = /\[[\s\S]*\]/;
      const match = content.match(regex);
      if (match) {
        try {
          toolPlan = JSON.parse(match[0]);
          console.log("Extracted & Parsed JSON:", toolPlan);
        } catch {
          throw new Error("Failed to parse extracted JSON array");
        }
      } else {
        throw new Error(`Model did not return valid JSON: ${content}`);
      }
    }

    if (!Array.isArray(toolPlan)) {
      throw new Error("Tool plan is not an array");
    }

    return toolPlan;
  } catch (error) {
    console.error("toolCallPlannerAgent error:", error.message);
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
