import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

const resume = {
  "name": "Vishal Singh",
  "title": "Full-Stack Developer",
  "contact": {
    "email": "bs08081996@gmail.com",
    "phone": "+918210705162",
    "linkedin": "https://linkedin.com/in/vishal-singh-b57b7b109",
    "github": "https://github.com/vishal-singh-jaiinfoway"
  },
  "summary": "Dedicated full-stack web and mobile application developer with hands-on experience in building scalable, high-quality solutions for Android and iOS platforms. Passionate about modern full-stack technologies, mobile development, and delivering user-centric applications.",
  "education": [
    {
      "degree": "Bachelor of Science in Information Technology",
      "institution": "Ranchi University",
      "duration": "2014 – 2017"
    },
    {
      "certification": "10-Month Backend Developer Program"
    }
  ],
  "skills": {
    "languages": ["TypeScript", "JavaScript", "Python"],
    "frontend": ["React", "React Native", "Next.js", "Angular", "Electron.js", "HTML", "CSS"],
    "backend": ["Node.js", "Express.js", "WebRTC", "GraphQL", "AI Agents", "MCP"],
    "databases": ["MySQL", "MongoDB"],
    "orms": ["Sequelize", "Mongoose"],
    "devops": ["AWS", "Git", "Postman", "Jest"],
    "other": ["DSA"]
  },
  "experience": [
    {
      "role": "Software Engineer",
      "company": "Jai Infoway Pvt. Ltd.",
      "duration": "Feb 2023 – Feb 2024",
      "responsibilities": [
        "Developed and maintained web and mobile apps across industries.",
        "Full-stack development from UI to backend APIs.",
        "Collaborated with cross-functional teams to deliver scalable solutions."
      ]
    },
    {
      "role": "Mobile App Developer",
      "company": "Brightcode Pvt. Ltd.",
      "duration": "Mar 2024 – Aug 2024",
      "responsibilities": [
        "Developed and enhanced Android & iOS mobile applications.",
        "Contributed to full web app lifecycle.",
        "Optimized performance and ensured responsive UIs."
      ]
    },
    {
      "role": "Software Engineer (Current)",
      "company": "Jai Infoway Pvt. Ltd.",
      "duration": "Aug 2024 – Present",
      "responsibilities": [
        "Built and deployed web & mobile apps for clients worldwide.",
        "Full-stack development using modern frameworks.",
        "Tailored scalable solutions per client requirements."
      ]
    }
  ],
  "projects": [
    {
      "name": "Earnings Call",
      "type": "Web",
      "link": "https://earnings-call.vercel.app/",
      "techStack": ["Next.js", "TypeScript"],
      "contributions": [
        "AI-powered data processing and visualization.",
        "Real-time sentiment analysis and Q&A.",
        "Earnings transcript generation and uploads.",
        "AI-generated visual reports and voice assistant integration."
      ]
    },
    {
      "name": "AutoFlow",
      "type": "Web",
      "techStack": ["Next.js", "Express.js", "Node.js", "TypeScript", "JavaScript"],
      "contributions": [
        "Built entire app from scratch.",
        "Extracted data from Nasdaq, Google Sheets, LinkedIn, etc.",
        "Apollo.io integration for data enrichment.",
        "Automated marketing campaigns with performance tracking."
      ]
    },
    {
      "name": "Kiddie Kredit App (Mobile)",
      "link": "https://www.kiddiekredit.com/",
      "techStack": ["React Native", "Node.js", "MongoDB", "AWS"],
      "contributions": [
        "End-to-end development.",
        "Task assignment, reward systems, credit simulation.",
        "Braze integration for campaign management.",
        "Push notifications and parental control."
      ]
    },
    {
      "name": "Logik (Client & Driver Apps)",
      "type": "Mobile",
      "techStack": ["React Native", "Node.js", "MongoDB"],
      "contributions": [
        "Vehicle booking and tracking.",
        "Secure payments and user auth.",
        "Smart driver matching and real-time features."
      ]
    },
    {
      "name": "Koodums Chat",
      "type": "Web",
      "link": "https://admin-tool-dev.genaisolutions.ai/",
      "techStack": ["React", "Node.js", "Python", "GCP", "TypeScript"],
      "contributions": [
        "Built MCP client/server to connect AI agents with external tools.",
        "Integrated Google Maps & YouTube.",
        "Designed context-aware memory for LLMs."
      ]
    },
    {
      "name": "SWFI Markets",
      "link": "https://www.xinervatech.com/",
      "techStack": ["Angular", "Node.js", "MongoDB", "MySQL", "Material UI"],
      "contributions": [
        "Developed RESTful APIs and UI.",
        "Unit tested core services."
      ]
    },
    {
      "name": "PetLinx",
      "link": "https://petlinx.com/",
      "techStack": ["Next.js", "Node.js", "PostgreSQL"],
      "contributions": [
        "Built email template editor.",
        "Bug fixing and optimization."
      ]
    },
    {
      "name": "DELIGO",
      "techStack": ["React Native", "Node.js", "MongoDB", "Firebase", "Razorpay"],
      "contributions": [
        "Customer, vendor, delivery, and admin apps.",
        "Real-time tracking, payment, inventory, delivery control.",
        "Role-based access and analytics dashboards."
      ]
    },
    {
      "name": "Intellibooks",
      "link": "https://intellibooks.io/",
      "techStack": ["React", "Electron.js", "Node.js"],
      "contributions": [
        "Cross-platform desktop app for order/inventory/billing.",
        "Hash-based routing and OS adaptations."
      ]
    },
    {
      "name": "OFLEP Connect",
      "techStack": ["React Native", "Node.js", "WebRTC", "Socket.io"],
      "contributions": [
        "Multi-party video calls with screen sharing, reactions.",
        "Host controls, secure meeting links.",
        "Cross-platform video call support."
      ]
    }
  ]
}


export async function POST(req) {
  const { question } = await req.json();

  const prompt = `Answer this question as if you're Vishal’s assistant:
Q: ${question}`;

  const SYSTEM_MESSAGE = {
    role: "system",
    content: `
You are a helpful and engaging AI assistant designed to answer questions about Vishal Singh.

Your responses should sound like you personally know him and should reflect his professional background, skills, experience, and project history as outlined in his resume.

You are allowed to discuss Vishal's personal life **only if** the user identifies themselves as "Ballu". In that case, you may share sweet, informal details described in the "Personal Life" section.

⚠️ Never say that you're answering based on a resume or structured document.

---

Personal Life Rules (Only if user says "I'm Ballu"):
- His girlfriend’s name is Ballu.
- He calls her duldul, albalahi, lelhi, and paglu.
- She calls him soni and loli-poli.
- She loves him a lot, and he loves her just as much.
- She enjoys bars, pubs, and restaurants.
- Her favorite food is sushi ,momo, dhuska, and kosa-chicken.
- She's lovingly called a "kumbhkaran" because she’s too lazy to even order from Blinkit (instant grocery delivery app).

---

Resume JSON:
${JSON.stringify(resume, null, 2)}
`
  };


  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
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
