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
      linkedin: "https://www.linkedin.com/in/vishal-singh-b57b7b109",
      github: "https://github.com/vishal123singh",
      portfolio: "https://singhvishal.vercel.app/",
    },
    summary:
      "Full-Stack Developer with over 4 years of experience crafting scalable, high-performance web and mobile applications using modern JavaScript technologies. Expert in building full product pipelines from frontend UI to backend services, API integrations, and cloud deployments. Experienced in integrating AI-powered tools such as LLMs, Langchain, and intelligent agents into real-world applications. Proven success in cross-functional teams, Agile environments, and delivering business-centric solutions.",
    education: [
      {
        degree: "Bachelor of Science in Information Technology",
        institution: "Ranchi University",
        period: "2014–2017",
      },
    ],
    certifications: [
      {
        name: "Backend Development",
        issuer: "Relevel",
        duration: "10-Month Program",
      },
    ],
    skills: {
      languages: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
      frontend: ["React", "Next.js", "Angular", "React Native", "Electron.js"],
      backend: [
        "Node.js",
        "Express.js",
        "Nest.js",
        "GraphQL",
        "WebRTC",
        "WebSockets",
      ],
      databases: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
      devops: ["AWS", "GCP", "Docker", "Git", "Postman", "Jest"],
      ai: [
        "OpenAI",
        "Anthropic",
        "Model Context Protocol (MCP)",
        "Prompt Engineering",
        "AI Agents",
        "Langchain",
      ],
      other: [
        "Data Structures & Algorithms (DSA)",
        "Microservices",
        "MVC Architecture",
      ],
    },
    experience: [
      {
        role: "Full-Stack Developer",
        company: "AppCurators Technologies",
        duration: "Aug 2025 – Present",
        responsibilities: [
          "Developed and deployed full-stack web applications for clients in automotive-fintech, gaming, and healthcare using React, Node.js, and Express.js",
          "Built scalable backend services, responsive UIs, and integrated third-party tools (Stripe, vAuto, Quickbooks)",
          "Deployed applications using GCP",
          "Collaborated with cross-functional teams in agile environments to deliver production-ready solutions tailored to diverse client needs",
        ],
      },
      {
        role: "Software Engineer",
        company: "Jai Infoway Pvt. Ltd.",
        duration: "Aug 2024 – July 2025",
        responsibilities: [
          "Developed and deployed full-stack web and mobile applications for clients in fintech, logistics, education, and hospitality using React, React Native, Angular, Node.js, and Express.js",
          "Built scalable backend services, responsive UIs, and integrated third-party tools (Apollo, Braze, Razorpay, Google Maps, YouTube)",
          "Deployed applications using AWS, GCP, and Firebase, implemented CI/CD pipelines, and managed cloud infrastructure for scalability and high availability",
          "Collaborated with cross-functional teams in agile environments to deliver production-ready solutions tailored to diverse client needs",
        ],
      },
      {
        role: "Mobile App Developer",
        company: "Brightcode Pvt. Ltd.",
        duration: "Mar 2024 – Aug 2024",
        responsibilities: [
          "Developed and maintained production-grade mobile applications using React Native, targeting Android and iOS platforms",
          "Integrated third-party services like Firebase (for real-time updates and push notifications) and Razorpay (for secure multi-mode payments)",
          "Collaborated with designers and backend teams to deliver polished, scalable, and user-centric mobile experiences",
        ],
      },
      {
        role: "Software Engineer",
        company: "Jai Infoway Pvt. Ltd.",
        duration: "Feb 2023 – Feb 2024",
        responsibilities: [
          "Developed and deployed full-stack web and mobile applications for clients in fintech, logistics, education, and hospitality using React, React Native, Angular, Node.js, and Express.js",
          "Built scalable backend services, responsive UIs, and integrated third-party tools (Apollo, Braze, Razorpay, Google Maps, YouTube)",
          "Deployed applications using AWS, GCP, and Firebase",
          "Collaborated with cross-functional teams in agile environments to deliver production-ready solutions tailored to diverse client needs",
        ],
      },
      {
        role: "Freelance Full-Stack Developer",
        company: "Self-Employed",
        duration: "Jan 2022 – Jan 2023",
        responsibilities: [
          "Built web applications using React and Node.js for local businesses",
          "Handled complete project lifecycles including UI/UX design, API development, deployment, and client support",
        ],
      },
    ],
    projects: [
      {
        name: "VeloTransact",
        description:
          "Web-based vehicle transaction platform streamlining buying, selling, and trade-in processes for dealers, brokers, and brokerages",
        link: "https://www.velotransact.com/",
        techStack: ["React", "Redux", "Node.js", "GCP"],
        contributions: [
          "Developed end-to-end multi-user web platform with role-based access for admins, dealerships, brokerage firms, and brokers",
          "Built admin dashboard for supervision, commission management, payouts, and reporting",
          "Integrated Stripe payments for secure transactions and automated commission payouts",
          "Implemented real-time updates and notifications for transaction status changes",
          "Developed APIs for vehicle transactions, inventory management, and reporting",
          "Integrated external APIs (vAuto) to sync and manage vehicle inventory",
          "Implemented document and image upload, verification workflows, and audit tracking",
        ],
      },
      {
        name: "Koodums Chat",
        description:
          "AI Agents Builder Platform enabling seamless integration with external tools",
        link: "https://www.koodums.com/",
        techStack: ["React", "Node.js", "Python", "GCP"],
        contributions: [
          "Designed robust MCP client/server framework enabling integration with Google Maps, YouTube, and custom APIs—processing 10,000+ agent tool calls per day with sub-150 ms average execution time",
          "Designed dynamic context-management engine maintaining multi-turn conversational state, reducing prompt token usage by 40% while improving response relevance by 25%",
          "Implemented intelligent prompt-refinement workflows using heuristic and LLM-driven techniques, increasing successful information retrieval rates from 68% to 92% across diverse travel queries",
          "Developed AI agent chaining logic to orchestrate sequential tool invocations (e.g., geocoding → itinerary building → booking suggestions), delivering end-to-end travel assistance in under 200 ms per user request",
        ],
      },
      {
        name: "Aadvico",
        description:
          "E-commerce platform for buying healthy roasted makhana snacks",
        link: "https://aadvico.com/",
        techStack: ["Next.js", "Firebase", "GCP"],
        contributions: [
          "Developed application end-to-end, integrating GCP services and Firebase for backend functionalities",
          "Implemented responsive UI/UX for seamless shopping experience across devices",
          "Integrated secure payment gateways and order management systems",
          "Optimized performance and scalability for high traffic handling",
          "Built admin dashboard for inventory and sales tracking",
          "Implemented user authentication and profile management features",
        ],
      },
      {
        name: "Resiliq",
        description:
          "Full-featured logistics management platform handling end-to-end delivery operations",
        link: "https://www.resiliq.in/",
        techStack: ["React", "Node.js", "Express.js", "AWS"],
        contributions: [
          "Designed and implemented secure HMAC-SHA256 webhook authentication with timestamp validation to prevent replay attacks",
          "Built idempotent order processing system to prevent duplicate order creation and handle payload conflicts safely",
          "Developed automatic AWB generation with client-specific prefixes and dynamic shipment code handling",
          "Implemented intelligent hub and division routing logic based on pincode and store configuration",
          "Engineered support for COD, prepaid, and reverse payment flows with strict validation rules",
          "Designed scalable order schema supporting B2C, B2B, and inventory models",
          "Built comprehensive address management for delivery, pickup, and RTO with geo-coordinates support",
          "Implemented structured validation and error handling (400, 401, 409, 429, 500) for predictable integrations",
          "Integrated rate limiting and request time-window validation for system protection",
          "Designed and implemented logging for order lifecycle",
        ],
      },
      {
        name: "Earnings Call",
        description:
          "AI-powered Financial Intelligence Platform for analyzing company earnings calls",
        link: "https://earnings-call.vercel.app/",
        techStack: ["Next.js", "TypeScript", "AWS", "LLMs"],
        contributions: [
          "End-to-end development of AI tool for analyzing company earnings calls",
          "Integrated real-time sentiment analysis, transcripts, SEC filing extraction, and Q&A capabilities",
          "Developed voice assistant functionality for conversational financial queries",
        ],
      },
      {
        name: "Xinerva",
        description: "Fintech & Social Investment Platform",
        link: "https://www.xinervatech.com/",
        techStack: ["Angular", "Express.js", "MongoDB", "MySQL", "Material UI"],
        contributions: [
          "Engineered collaborative annotation tools—highlight, comment, and share insights on filings—boosting analyst productivity by 45% through inline discussion threads and version history",
          "Built scalable web-scraping pipelines using Puppeteer and Cheerio to ingest 10,000+ data points daily from diverse sources (company websites, regulatory portals, SEC filings), cleaning and normalizing data into MongoDB",
        ],
      },
      {
        name: "Kiddie Kredit",
        description:
          "Financial Education App for Kids with gamified chore-to-credit features",
        link: "https://www.kiddiekredit.com/",
        techStack: [
          "React",
          "React Native",
          "MobX",
          "Node.js",
          "MongoDB",
          "AWS",
        ],
        contributions: [
          "Built chore-to-credit gamified features with parental control, notifications, and reward systems",
          "Implemented mobile push notifications and analytics via Braze SDK",
          "Led full-stack development across web and mobile clients",
          "Product won 43North People's Choice Award (2023) and $1M pitch competition (2024)",
        ],
      },
      {
        name: "Logik",
        description:
          "Logistics & Vehicle Rental Platform with client and driver apps",
        link: "https://play.google.com/store/apps/details?id=com.brightcode.logik",
        techStack: [
          "React Native",
          "Node.js",
          "MongoDB",
          "GCP",
          "Google Maps SDK",
        ],
        contributions: [
          "Developed client and driver mobile apps with real-time booking, tracking, and secure payments",
          "Integrated Google Maps SDK for live vehicle tracking, route optimization, and geolocation-based driver-client matching",
          "Implemented smart vehicle-driver matching algorithms and optimized delivery routes to improve efficiency and reduce travel time",
        ],
      },
      {
        name: "Intellibooks",
        description: "Desktop App for Hotel & Restaurant Management",
        link: "https://intellibooks.io/",
        techStack: ["React", "Electron.js", "Node.js"],
        contributions: [
          "Engineered cross-platform Electron application for Windows, macOS, and Linux, centralizing orders, inventory, and billing into a single UI—reduced staff training time by 40%",
          "Implemented offline-first data layer with automatic sync to cloud backends, ensuring 99.8% uptime and eliminating order capture failures during network outages",
        ],
      },
      {
        name: "AutoFlow",
        description: "Lead Generation & Sales Automation Platform",
        link: "https://vishal-singh-iota.vercel.app/projects/autoflow",
        techStack: ["Next.js", "Express.js", "Node.js", "TypeScript"],
        contributions: [
          "Orchestrated automated lead sourcing pipelines across Nasdaq, Google Sheets, LinkedIn, YC, and Clutch, ingesting and normalizing 5,000+ new prospects per week",
          "Designed enrichment workflows with Apollo.io that appended verified contact details (email, phone, social links) to 100% of imported leads, boosting outreach accuracy and reducing manual research time by 70%",
          "Implemented real-time campaign dashboard for email and voice-drop marketing—track open rates, click-throughs, and call-connect metrics—enabling data-driven optimizations that improved response rates by 30%",
        ],
      },
      {
        name: "RomeSIM",
        description:
          "Global eSIM service provider offering digital mobile connectivity for travelers and businesses",
        link: "https://romesim.com/",
        techStack: ["WordPress"],
        contributions: [
          "Implemented authentication and authorization systems",
          "Enabled multi-country eSIM purchase functionality",
        ],
      },
      {
        name: "DELIGO",
        description:
          "Multi-app logistics platform with customer, vendor, delivery, and admin apps",
        techStack: [
          "React Native",
          "Node.js",
          "MongoDB",
          "Firebase",
          "Razorpay",
        ],
        contributions: [
          "Built complete ecosystem with customer, vendor, delivery, and admin applications",
          "Implemented real-time tracking, payment processing, inventory management, and delivery control",
          "Created role-based access systems and analytics dashboards",
        ],
      },
      {
        name: "OFLEP Connect",
        description:
          "Multi-party video conferencing platform with screen sharing capabilities",
        techStack: ["React Native", "Node.js", "WebRTC", "Socket.io"],
        contributions: [
          "Implemented multi-party video calls with screen sharing and reactions",
          "Built host controls and secure meeting link generation",
          "Delivered cross-platform video call support",
        ],
      },
      {
        name: "PetLinx",
        link: "https://petlinx.com/",
        techStack: ["Next.js", "Node.js", "PostgreSQL"],
        contributions: [
          "Built email template editor",
          "Performed bug fixing and optimization",
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
};

// Helper: Build system instruction guiding assistant tone & content
function buildSystemInstruction() {
  let base =
    `You are Vishal Singh's personal assistant, ViVA (Vishal's Intelligent Virtual Assistant). ` +
    `You have access to JSON data blocks labeled 'vishal', and 'website'. ` +
    `When answering, decide which block(s) are relevant to the user's question and use only that information. ` +
    `Do not mention irrelevant data. Respond naturally as if you know him.`;

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
        2,
      )}\n---\nQ: ${question}`,
    };

    // Stream from OpenAI
    const completion = await openai.chat.completions.create({
      model: "nvidia/nemotron-3-nano-30b-a3b:free",
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
      { headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  } catch (error) {
    console.error("Handler error:", error);
    return new Response(error, { status: 500 });
  }
}
