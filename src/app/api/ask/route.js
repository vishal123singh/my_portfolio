import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

const resume = {
  name: "Vishal Singh",
  title: "Full-Stack Developer",
  skills: ["React", "Node.js", "Next.js", "React Native", "AWS", "MongoDB", "GraphQL"],
  experience: [
    {
      company: "Kiddie Kredit",
      role: "Full-Stack Developer",
      duration: "Mar 2023 – Present",
      contributions: [
        "Developed gamified financial education app for kids",
        "Built scalable backend and integrated gamification logic"
      ]
    },
    {
      company: "AutoFlow",
      role: "Lead Developer",
      duration: "Jul 2022 – Feb 2023",
      contributions: [
        "Built AI-integrated lead generation tools with Apollo.io",
        "Created email workflows and dashboards"
      ]
    }
  ],
  education: "BSc in Information technology"
};

export async function POST(req) {
  const { question } = await req.json();

  const prompt = `Answer this question as if you're Vishal’s assistant:
Q: ${question}`;

  const SYSTEM_MESSAGE = {
    role: "system",
    content: `You are an AI assistant that knows everything about Vishal Singh based on his resume.

Resume JSON:
${JSON.stringify(resume, null, 2)}
`,
  };

  const completion = await openai.chat.completions.create({
    model: "mistralai/mistral-small-3.1-24b-instruct:free",
    messages: [
      SYSTEM_MESSAGE,
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of completion) {
        const text = chunk.choices[0]?.delta?.content || "";
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
