"use strict";

import OpenAI from "openai";

// Initialize OpenAI client using OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

// Structured data about Vishal, his portfolio, and personal details
const contentMap = {
  vishal: {
    name: "Vishal Singh",
    title: "Full-Stack Developer",
    contact: {
      email: "bs08081996@gmail.com",
      phone: "+918210705162",
      linkedin: "https://linkedin.com/in/vishal-singh-b57b7b109",
      github: "https://github.com/vishal-singh-jaiinfoway",
    },
    summary:
      "Dedicated full-stack web and mobile application developer with hands-on experience in building scalable, high-quality solutions for Android and iOS platforms. Passionate about modern full-stack technologies, mobile development, and delivering user-centric applications.",
    education: [
      {
        degree: "Bachelor of Science in Information Technology",
        institution: "Ranchi University",
        period: "2014–2017",
      },
      { certification: "10-Month Backend Developer Program" },
    ],
    skills: {
      languages: ["TypeScript", "JavaScript", "Python"],
      frameworks: [
        "React",
        "React Native",
        "Next.js",
        "Angular",
        "Electron.js",
      ],
      backend: [
        "Node.js",
        "Express.js",
        "GraphQL",
        "WebRTC",
        "AI Agents",
        "MCP",
      ],
      databases: ["MySQL", "MongoDB"],
      devops: ["AWS", "Git", "Postman", "Jest"],
      other: ["DSA"],
      tools: ["GitHub", "Docker", "Cypress", "Firebase", "Apollo.io"],
      ai: ["LLMs (OpenAI, Claude)", "Langchain", "AI Agents"],
    },
    experience: [
      {
        role: "Software Engineer",
        company: "Jai Infoway Pvt. Ltd.",
        duration: "Feb 2023 – Feb 2024",
        responsibilities: [
          "Developed and maintained web and mobile apps across industries.",
          "Full-stack development from UI to backend APIs.",
          "Collaborated with cross-functional teams to deliver scalable solutions.",
        ],
      },
      {
        role: "Mobile App Developer",
        company: "Brightcode Pvt. Ltd.",
        duration: "Mar 2024 – Aug 2024",
        responsibilities: [
          "Developed and enhanced Android & iOS mobile applications.",
          "Contributed to full web app lifecycle.",
          "Optimized performance and ensured responsive UIs.",
        ],
      },
      {
        role: "Software Engineer (Current)",
        company: "Jai Infoway Pvt. Ltd.",
        duration: "Aug 2024 – Present",
        responsibilities: [
          "Built and deployed web & mobile apps for clients worldwide.",
          "Full-stack development using modern frameworks.",
          "Tailored scalable solutions per client requirements.",
        ],
      },
    ],
    projects: [
      {
        name: "Earnings Call",
        type: "Web",
        link: "https://earnings-call.vercel.app/",
        techStack: ["Next.js", "TypeScript"],
        contributions: [
          "AI-powered data processing and visualization.",
          "Real-time sentiment analysis and Q&A.",
          "Earnings transcript generation and uploads.",
          "AI-generated visual reports and voice assistant integration.",
        ],
      },
      {
        name: "AutoFlow",
        type: "Web",
        techStack: [
          "Next.js",
          "Express.js",
          "Node.js",
          "TypeScript",
          "JavaScript",
        ],
        contributions: [
          "Built entire app from scratch.",
          "Extracted data from Nasdaq, Google Sheets, LinkedIn, etc.",
          "Apollo.io integration for data enrichment.",
          "Automated marketing campaigns with performance tracking.",
        ],
      },
      {
        name: "Kiddie Kredit App (Mobile)",
        link: "https://www.kiddiekredit.com/",
        techStack: ["React Native", "Node.js", "MongoDB", "AWS"],
        contributions: [
          "End-to-end development.",
          "Task assignment, reward systems, credit simulation.",
          "Braze integration for campaign management.",
          "Push notifications and parental control.",
        ],
      },
      {
        name: "Logik (Client & Driver Apps)",
        type: "Mobile",
        techStack: ["React Native", "Node.js", "MongoDB"],
        contributions: [
          "Vehicle booking and tracking.",
          "Secure payments and user auth.",
          "Smart driver matching and real-time features.",
        ],
      },
      {
        name: "Koodums Chat",
        type: "Web",
        link: "https://admin-tool-dev.genaisolutions.ai/",
        techStack: ["React", "Node.js", "Python", "GCP", "TypeScript"],
        contributions: [
          "Built MCP client/server to connect AI agents with external tools.",
          "Integrated Google Maps & YouTube.",
          "Designed context-aware memory for LLMs.",
        ],
      },
      {
        name: "SWFI Markets",
        link: "https://www.xinervatech.com/",
        techStack: ["Angular", "Node.js", "MongoDB", "MySQL", "Material UI"],
        contributions: [
          "Developed RESTful APIs and UI.",
          "Unit tested core services.",
        ],
      },
      {
        name: "PetLinx",
        link: "https://petlinx.com/",
        techStack: ["Next.js", "Node.js", "PostgreSQL"],
        contributions: [
          "Built email template editor.",
          "Bug fixing and optimization.",
        ],
      },
      {
        name: "DELIGO",
        techStack: [
          "React Native",
          "Node.js",
          "MongoDB",
          "Firebase",
          "Razorpay",
        ],
        contributions: [
          "Customer, vendor, delivery, and admin apps.",
          "Real-time tracking, payment, inventory, delivery control.",
          "Role-based access and analytics dashboards.",
        ],
      },
      {
        name: "Intellibooks",
        link: "https://intellibooks.io/",
        techStack: ["React", "Electron.js", "Node.js"],
        contributions: [
          "Cross-platform desktop app for order/inventory/billing.",
          "Hash-based routing and OS adaptations.",
        ],
      },
      {
        name: "OFLEP Connect",
        techStack: ["React Native", "Node.js", "WebRTC", "Socket.io"],
        contributions: [
          "Multi-party video calls with screen sharing, reactions.",
          "Host controls, secure meeting links.",
          "Cross-platform video call support.",
        ],
      },
    ],
  },

  website: {
    name: "Vishal's Portfolio Website",
    description:
      "A personal portfolio website for Vishal Singh, showcasing his projects, experience, and skills as a full-stack developer.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Node.js", "MongoDB"],
    features: [
      "Project gallery with details, links, and screenshots",
      "Interactive resume and experience section",
      "Blog section",
      "Responsive design",
      "Downloadable resume",
    ],

    pages: {
      home: "The homepage features a hero section, skills, about, and contact sections.",
      blogs: "A blog section where Vishal shares articles and insights.",
      projects: "A gallery of Vishal's projects with details and links.",
      demo: "UI demos showcasing artistic designs and layouts.",
    },
  },

  personal: {
    girlfriend: "Ballu",
    nicknames: {
      toHer: ["duldul", "albalahi", "lelhi", "paglu"],
      fromHer: ["soni", "loli-poli"],
    },
    favorites: {
      hers: ["sushi", "momo", "dhuska", "kosa-chicken"],
      hobbies: ["bars", "pubs", "restaurants"],
    },
    notes:
      "Ballu is lovingly called a 'kumbhkaran' because she's too lazy even to order from Blinkit.",
  },
};

// Helper: Build system instruction guiding assistant tone & content
function buildSystemInstruction(includePersonal = false) {
  let base =
    `You are Vishal Singh's personal assistant, ViVA (Vishal's Intelligent Virtual Assistant). ` +
    `You have access to JSON data blocks labeled 'vishal', 'website', and 'personal'. ` +
    `When answering, decide which block(s) are relevant to the user's question and use only that information. ` +
    `Do not mention irrelevant data. Respond naturally as if you know him.`;
  if (includePersonal) {
    base += `\nThe user is Ballu, so you may include affectionate personal details.`;
  }
  return base;
}

// API handler
export async function POST(req) {
  try {
    const { question } = await req.json();
    const isBallu = question.includes("Hi,ViVA I am Ballu");

    // Always provide all data blocks; let the model pick
    const dataPayload = { ...contentMap };

    const systemMessage = {
      role: "system",
      content: buildSystemInstruction(isBallu),
    };

    const userMessage = {
      role: "user",
      content: `Here are all data blocks:\n---\n${JSON.stringify(
        dataPayload,
        null,
        2
      )}\n---\nQ: ${question}`,
    };

    // Stream from OpenAI
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [systemMessage, userMessage],
      stream: true,
    });

    // Return streamed response
    const encoder = new TextEncoder();
    return new Response(
      new ReadableStream({
        async start(controller) {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content || "";
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        },
      }),
      { headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  } catch (error) {
    console.error("Handler error:", error);
    return new Response(error, { status: 500 });
  }
}
