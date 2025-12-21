// React Icons
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";

import {
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiElectron,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiGraphql,
  SiWebrtc,
  SiPython,
  SiFastapi,
  SiAmazon,
  SiGooglecloud,
  SiDocker,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiRedis,
  SiElastic,
  SiOpenai,
  SiLangchain,
} from "react-icons/si";

// Lucide Icons
import {
  Code,
  Server,
  Cpu,
  Database,
  Languages,
  BrainCircuit,
  Sparkles,
  Link2,
  Handshake,
  FileText,
  CreditCard,
  Upload,
  LayoutDashboard,
  Search,
  User,
  ShieldCheck,
  ClipboardList,
  Bell,
  Cloud,
  Plug,
  Smartphone,
  Settings,
  ShoppingCart,
  Package,
  BadgeCheck,
  Phone,
  Navigation,
  Bot,
  Layers,
  Gauge,
  BarChart2,
  TrendingUp,
  GitPullRequest,
  Speaker,
  MessageSquare,
  Users,
  Hand,
  Monitor,
  Video,
  ServerCog,
  Mail,
  Activity,
  Repeat,
} from "lucide-react";

const projects = [
  {
    title: "Velotransact",
    slug: "velotransact",
    description: "Smarter Vehicle Transactions Platform.",
    link: "https://velotransact.ontheweb.app/",
    tags: [
      "GCP",
      "Web",
      "React",
      "Firebase",
      "Node JS",
      "Express JS",
      "MongoDB",
    ],
    images: [
      "/projects/screenshots/velotransact/1.png",
      "/projects/screenshots/velotransact/2.png",
      "/projects/screenshots/velotransact/3.png",
      "/projects/screenshots/velotransact/4.png",
      "/projects/screenshots/velotransact/5.png",
      "/projects/screenshots/velotransact/6.png",
      "/projects/screenshots/velotransact/7.png",
      "/projects/screenshots/velotransact/8.png",
      "/projects/screenshots/velotransact/9.png",
      "/projects/screenshots/velotransact/10.png",
      "/projects/screenshots/velotransact/11.png",
    ],
    features: [
      {
        title: "Inventory & Dealer Integrations",
        icon: <Link2 size={20} />,
        description:
          "Manage vehicle inventory through integrations with vAuto, HomeNet, and other dealer systems, ensuring real-time sync and accuracy.",
      },
      {
        title: "Broker Transaction Management",
        icon: <Handshake size={20} />,
        description:
          "Approve broker transactions, manage trade-ins, loyalty discounts, and coordinate delivery workflows with full transparency.",
      },
      {
        title: "Purchase & Trade-in Submissions",
        icon: <FileText size={20} />,
        description:
          "Submit vehicle purchases and trade-ins, upload required documents, track equity, and manage approvals in one streamlined flow.",
      },
      {
        title: "Payment & Commission Tracking",
        icon: <CreditCard size={20} />,
        description:
          "Track payments, commissions, and broker payouts with detailed status updates and historical records.",
      },
      {
        title: "Document Upload & Approval Flow",
        icon: <Upload size={20} />,
        description:
          "Secure document uploads with approval workflows, ensuring compliance and audit-ready records.",
      },
      {
        title: "Dealer & Broker Dashboards",
        icon: <LayoutDashboard size={20} />,
        description:
          "Dedicated dashboards for dealers and brokers, providing real-time visibility into inventory, transactions, and payments.",
      },
      {
        title: "Advanced Search & Filtering",
        icon: <Search size={20} />,
        description:
          "Powerful search and filtering tools to quickly find vehicles, transactions, customers, and documents.",
      },
      {
        title: "Customer Purchase Portal",
        icon: <User size={20} />,
        description:
          "Customer-facing portal to manage purchases, trade-ins, document submissions, and transaction status.",
      },
      {
        title: "Secure Authentication & Roles",
        icon: <ShieldCheck size={20} />,
        description:
          "Role-based access control with secure authentication to protect sensitive dealer, broker, and customer data.",
      },
      {
        title: "Audit Logs & Activity Tracking",
        icon: <ClipboardList size={20} />,
        description:
          "Complete audit logs and activity tracking for compliance, transparency, and operational accountability.",
      },
      {
        title: "Automated Notifications",
        icon: <Bell size={20} />,
        description:
          "Automated email and real-time notifications for approvals, payments, document updates, and status changes.",
      },
      {
        title: "Cloud Infrastructure",
        icon: <Cloud size={20} />,
        description:
          "Cloud-hosted architecture using GCP and Firebase, ensuring scalability, reliability, and performance.",
      },
      {
        title: "Third-party API Integrations",
        icon: <Plug size={20} />,
        description:
          "Seamless integration with third-party APIs to extend platform capabilities and automate workflows.",
      },
      {
        title: "Responsive Cross-device Design",
        icon: <Smartphone size={20} />,
        description:
          "Fully responsive design optimized for both mobile and desktop usage across dealer and broker teams.",
      },
      {
        title: "Admin Controls & Compliance Oversight",
        icon: <Settings size={20} />,
        description:
          "Admin-level controls for managing users, enforcing policies, and maintaining regulatory compliance.",
      },
    ],

    contributions: [],
    displayImage: "/projects/screenshots/velotransact/3.png",
  },

  {
    title: "Aadvico",
    slug: "aadvico",
    description:
      "Aadvico’s website is an e-commerce platform for buying healthy roasted makhana snacks, with product browsing, shopping cart, account login, order management, health benefit details, and support contact info.",
    link: "https://www.aadvico.com/",
    tags: ["GCP", "Web", "Next.js", "Firebase"],
    images: [
      "/projects/screenshots/aadvico/1.png",
      "/projects/screenshots/aadvico/2.png",
      "/projects/screenshots/aadvico/3.png",
      "/projects/screenshots/aadvico/4.png",
      "/projects/screenshots/aadvico/5.png",
      "/projects/screenshots/aadvico/6.png",
      "/projects/screenshots/aadvico/7.png",
      "/projects/screenshots/aadvico/8.png",
      "/projects/screenshots/aadvico/9.png",
    ],

    features: [
      {
        title: "Online Shopping Platform",
        icon: <ShoppingCart size={20} />,
        description:
          "Browse and buy healthy roasted makhana directly from the website. Products are listed with prices and Add to Cart functionality.",
      },
      {
        title: "Product Catalog",
        icon: <Package size={20} />,
        description:
          "Multiple makhana flavors including Pudina (Mint), Prasad (fasting/rituals), and Salt & Pepper. Each product highlights gluten-free, plant-based, non-GMO, and calcium-rich benefits.",
      },
      {
        title: "Shopping Cart & Checkout",
        icon: <CreditCard size={20} />,
        description:
          "Users can add products to the cart and complete checkout when ready to purchase.",
      },
      {
        title: "Account Login & Order Management",
        icon: <User size={20} />,
        description:
          "Login and sign-up functionality for users to manage accounts and view past orders.",
      },
      {
        title: "Product Benefits Information",
        icon: <BadgeCheck size={20} />,
        description:
          "Clearly highlights health benefits such as gluten-free, non-GMO, plant-based, and calcium-rich ingredients.",
      },
      {
        title: "Contact & Support",
        icon: <Phone size={20} />,
        description:
          "Dedicated contact page with company address, phone number, and email for customer support.",
      },
      {
        title: "Simple Navigation",
        icon: <Navigation size={20} />,
        description:
          "Easy-to-use navigation menu including Home, Products, Orders, Cart, Contact, and Login/Sign-up.",
      },
    ],

    contributions: [
      "Developed the application end-to-end, integrating GCP services and Firebase for backend functionalities.",
      "Implemented responsive UI/UX for seamless shopping experience across devices.",
      "Integrated secure payment gateways and order management systems.",
      "Optimized performance and scalability for high traffic handling.",
      "Built admin dashboard for inventory and sales tracking.",
      "Implemented user authentication and profile management features.",
    ],
    displayImage: "/projects/screenshots/aadvico/2.png",
  },

  {
    title: "Koodums Chat",
    slug: "koodums-chat",
    description:
      "AI-powered digital concierge chatbot for hotels offering room services, travel planning, ticket booking,and itinerary management.",
    link: "https://admin-tool-dev.genaisolutions.ai/",
    images: [
      "/projects/screenshots/koodums-chat/1.png",
      "/projects/screenshots/koodums-chat/2.png",
      "/projects/screenshots/koodums-chat/3.png",
    ],
    tags: ["AI Agents", "Node JS", "Typescript", "Python", "GCP", "MCP"],

    features: [
      {
        title: "AI-Driven Travel Assistance",
        icon: <Bot size={20} />,
        description:
          "Conversational AI interface providing travel assistance and hotel room services through natural language interactions.",
      },
      {
        title: "External Tool Integrations (MCP)",
        icon: <Plug size={20} />,
        description:
          "MCP-based integration with external tools such as Google Maps and YouTube to enhance responses with real-time data and rich content.",
      },
      {
        title: "Intelligent Prompt Refinement",
        icon: <Sparkles size={20} />,
        description:
          "Automatically refines incomplete or ambiguous user queries to generate accurate and context-aware responses.",
      },
      {
        title: "Dynamic Context Management",
        icon: <Layers size={20} />,
        description:
          "Maintains and manages conversation history dynamically to ensure coherent, multi-turn LLM interactions.",
      },
      {
        title: "Scalable High-Performance Architecture",
        icon: <Gauge size={20} />,
        description:
          "Designed for scalability and performance, enabling efficient handling of concurrent chatbot conversations.",
      },
    ],

    contributions: [
      "Focused on building the MCP (Model Context Protocol) client and server architecture to connect AI agents with external tools like Google Maps and YouTube.",
      "Implemented MCP servers from scratch to handle tool calls for fetching place details, directions, reviews, photos, YouTube videos, comments, live streams, shorts, channels, and playlists.",
      "Developed prompt optimization logic to clarify incomplete or ambiguous user queries by analyzing conversational context or dynamically requesting missing information from the user.",
      "Designed and implemented context management system to ensure optimal LLM performance by maintaining only the latest 10 conversational turns for efficient memory usage and relevant context injection.",
      "Enabled AI agents to dynamically chain tool calls through MCP servers to enrich user conversations and deliver personalized, context-aware responses.",
      "Collaborated on integration with cloud services for scalable deployment and real-time system performance.",
    ],
    displayImage: "/projects/screenshots/koodums-chat/3.png",
  },
  {
    title: "SWIFI",
    slug: "swifi",
    description:
      "Big Data platform for extracting and analyzing SEC filings for fintech applications.",
    link: "https://www.xinervatech.com/",
    images: [
      "/projects/screenshots/swifi/1.png",
      "/projects/screenshots/swifi/2.png",
      "/projects/screenshots/swifi/3.png",
    ],
    tags: ["Angular", "Web", "Node JS", "Typescript"],
    contributions: [
      "Developed a web scraper to extract and process investment-grade SEC filings.",
      "Built an annotation tool allowing users to highlight and comment on filing data for collaborative analysis.",
    ],

    displayImage: "/projects/screenshots/swifi/1.png",
  },
  {
    title: "Kiddie Kredit",
    slug: "kiddie-kredit",
    description:
      "Financial education mobile app for children. Gamified with task & reward systems.",
    link: "https://play.google.com/store/apps/details?id=com.kiddiekredit.app&pcampaignid=web_share",
    images: [
      "/projects/screenshots/kk/5.png",
      "/projects/screenshots/kk/2.png",
      "/projects/screenshots/kk/4.png",
      "/projects/screenshots/kk/6.png",
      "/projects/screenshots/kk/7.png",
      "/projects/screenshots/kk/8.png",
      "/projects/screenshots/kk/9.png",
      "/projects/screenshots/kk/10.png",
      "/projects/screenshots/kk/12.png",
      "/projects/screenshots/kk/13.png",
      "/projects/screenshots/kk/14.png",
      "/projects/screenshots/kk/15.png",
    ],
    tags: ["React Native", "Node JS", "Android", "IOS", "Animation"],
    displayImage: "/projects/screenshots/kk/6.png",
    contributions: [
      "Developed gamified task/reward system for children’s financial literacy",
      "Built multi-role support (child, guardian, admin)",
      "End-to-end development of the mobile application.",
      "Built core features such as task assignment, reward systems, credit score simulation, progress tracking, and educational modules.",
      "Integrated Braze for behavior tracking, campaign management, and personalized notifications.",
      "Developed secure authentication, push notifications, and parental controls for data privacy.",
    ],
  },
  {
    title: "Earnings Call",
    slug: "earnings-call",
    description:
      "AI-powered insights platform for earnings calls and SEC filings.",
    link: "https://earnings-call.vercel.app/",
    tags: ["AI", "Web", "Next.js", "AWS"],
    images: [
      "/projects/screenshots/earnings-call/1.png",
      "/projects/screenshots/earnings-call/2.png",
      "/projects/screenshots/earnings-call/3.png",
      "/projects/screenshots/earnings-call/4.png",
      "/projects/screenshots/earnings-call/5.png",
      "/projects/screenshots/earnings-call/6.png",
      "/projects/screenshots/earnings-call/7.png",
      "/projects/screenshots/earnings-call/8.png",
      "/projects/screenshots/earnings-call/9.png",
      "/projects/screenshots/earnings-call/10.png",
      "/projects/screenshots/earnings-call/11.png",
      "/projects/screenshots/earnings-call/12.png",
    ],

    features: [
      {
        title: "AI-Powered Earnings Call Analysis",
        icon: <BarChart2 size={20} />,
        description:
          "Leverages AI to automatically analyze earnings calls, extracting key insights and trends for investors and analysts.",
      },
      {
        title: "Sentiment Analysis & Real-Time Graphs",
        icon: <TrendingUp size={20} />,
        description:
          "Provides sentiment scoring and real-time visualizations to quickly assess market reactions and investor sentiment.",
      },
      {
        title: "Earnings Call Transcripts & Uploads",
        icon: <FileText size={20} />,
        description:
          "Allows users to upload and access detailed transcripts of earnings calls for review and reference.",
      },
      {
        title: "Company Comparisons & Financial Reports",
        icon: <Layers size={20} />,
        description:
          "Compare multiple companies side-by-side with comprehensive financial reports and performance metrics.",
      },
      {
        title: "SEC Filings Integration",
        icon: <GitPullRequest size={20} />,
        description:
          "Integrates directly with SEC filings to provide accurate, up-to-date financial documentation.",
      },
      {
        title: "Voice Assistant for Conversational Queries",
        icon: <Speaker size={20} />,
        description:
          "Interact with the platform using voice commands for instant answers to complex financial queries.",
      },
    ],

    contributions: [
      "Developed the application end-to-end, integrating AI-powered data processing and visualization.",
      "Implemented real-time sentiment analysis, Q&A functionality, and transcript generation from earnings calls.",
      "Built features to fetch, upload, and manage earnings calls for multiple companies.",
      "Developed earnings calendar, company performance comparison tools, and AI-generated visual reports.",
      "Integrated SEC filing reports including income statements, balance sheets, and cash flow statements.",
      "Added voice assistant functionality for interactive financial insights.",
    ],
    displayImage: "/projects/screenshots/earnings-call/12.png",
  },
  {
    title: "Logik",
    slug: "logik",
    link: "https://play.google.com/store/apps/details?id=com.brightcode.logik&pcampaignid=web_share",
    description:
      "Logistics and vehicle rental platform for seamless delivery services.",
    images: [
      "/projects/screenshots/logik/14.png",
      "/projects/screenshots/logik/1.png",
      "/projects/screenshots/logik/18.png",
      "/projects/screenshots/logik/3.png",
      "/projects/screenshots/logik/25.png",
      "/projects/screenshots/logik/26.png",
      "/projects/screenshots/logik/27.png",
      "/projects/screenshots/logik/28.png",
      "/projects/screenshots/logik/29.png",
      "/projects/screenshots/logik/4.png",
      "/projects/screenshots/logik/5.png",
      "/projects/screenshots/logik/6.png",
      "/projects/screenshots/logik/7.png",
      "/projects/screenshots/logik/8.png",
      "/projects/screenshots/logik/9.png",
      "/projects/screenshots/logik/10.png",
      "/projects/screenshots/logik/11.png",
      "/projects/screenshots/logik/12.png",
      "/projects/screenshots/logik/13.png",
      "/projects/screenshots/logik/15.png",
      "/projects/screenshots/logik/16.png",
      "/projects/screenshots/logik/17.png",
      "/projects/screenshots/logik/20.png",
      "/projects/screenshots/logik/23.png",
      "/projects/screenshots/logik/24.png",
    ],
    tags: ["React Native", "Node JS", "Android", "IOS", "Tracking", "GCP"],
    displayImage: "/projects/screenshots/logik/14.png",
    contributions: [
      "Fully developed both client and driver applications.",
      "Implemented vehicle booking, real-time tracking, route optimization, invoicing, ride history, and secure payments.",
      "Integrated smart vehicle-driver matching algorithms.",
      "Developed real-time notifications, secure user authentication, and transaction management.",
    ],
  },
  {
    title: "OFLEP Connect",
    slug: "oflep-connect",
    description:
      "Video conferencing platform offering HD calls, collaboration tools, and secure virtual meetings for individuals and businesses.",
    link: null,
    images: [
      "/projects/screenshots/oflep/1.png",
      "/projects/screenshots/oflep/2.png",
      "/projects/screenshots/oflep/4.png",
      "/projects/screenshots/oflep/5.png",
      "/projects/screenshots/oflep/7.png",
      "/projects/screenshots/oflep/8.png",
      "/projects/screenshots/oflep/11.png",
      "/projects/screenshots/oflep/12.png",
      "/projects/screenshots/oflep/13.png",
      "/projects/screenshots/oflep/15.png",
    ],
    tags: [
      "React Native",
      "Express.js",
      "Node.js",
      "WebRTC",
      "MongoDB",
      "Socket.io",
      "TypeScript",
    ],

    features: [
      {
        title: "Real-Time Chat & Reactions",
        icon: <MessageSquare size={20} />,
        description:
          "Participants can chat, send emojis, and react in real time during calls for better engagement and communication.",
      },
      {
        title: "Multi-Participant Grid Layout",
        icon: <Users size={20} />,
        description:
          "Supports up to 10 participants in a responsive grid layout, ensuring everyone is visible and can interact seamlessly.",
      },
      {
        title: "Raise-Hand Feature",
        icon: <Hand size={20} />,
        description:
          "Organize discussions with a raise-hand feature, allowing participants to signal questions or comments without interrupting the flow.",
      },
      {
        title: "Screen Sharing & Host Moderation",
        icon: <Monitor size={20} />,
        description:
          "Hosts can moderate sessions, manage participants, and share screens securely for presentations or demonstrations.",
      },
      {
        title: "Cross-Platform Video Calls",
        icon: <Video size={20} />,
        description:
          "Supports Web and Mobile platforms, enabling seamless video calls across devices with high-quality performance.",
      },
    ],

    contributions: [
      "Designed and developed high-quality multi-party video calling functionality using WebRTC.",
      "Built core features such as screen sharing, chat, reactions, and meeting scheduling with recording support.",
      "Implemented advanced host controls for muting, video toggling, participant management, and permissions.",
      "Integrated secure, password-protected meeting invites with time-limited access links.",
      "Developed cross-platform solutions to support both mobile (iOS & Android) and web-based participation.",
      "Configured TURN servers for improved call stability and reliability under various network conditions.",
    ],
    displayImage: "/projects/screenshots/oflep/1.png",
  },
  {
    title: "Intellibooks",
    slug: "intellibooks",
    description:
      "Cross-platform desktop application for hotel and restaurant owners to manage orders, inventory, and billing operations.",
    link: "https://intellibooks.io/",
    images: [
      "/projects/screenshots/intellibooks/1.png",
      "/projects/screenshots/intellibooks/2.png",
    ],
    tags: ["React", " Electron.js", "Express.js", "Node.js", "TypeScript"],
    contributions: [
      "Developed a multi-platform desktop application compatible across various operating systems.",
      "Implemented hash-based routing and platform-specific adaptations for cross-OS compatibility.",
      "Developed modules for order management, stock handling, billing, and reporting.",
    ],
    displayImage: "/projects/screenshots/intellibooks/2.png",
  },
  {
    title: "AutoFlow",
    slug: "autoflow",
    description:
      "Lead generation and outbound marketing platform with Apollo.io integration.",
    link: null,
    images: [
      "/projects/screenshots/autoflow/1.png",
      "/projects/screenshots/autoflow/2.png",
      "/projects/screenshots/autoflow/3.png",
      "/projects/screenshots/autoflow/4.png",
      "/projects/screenshots/autoflow/5.png",
      "/projects/screenshots/autoflow/6.png",
      "/projects/screenshots/autoflow/7.png",
      "/projects/screenshots/autoflow/8.png",
      "/projects/screenshots/autoflow/9.png",
      "/projects/screenshots/autoflow/10.png",
      "/projects/screenshots/autoflow/11.png",
      "/projects/screenshots/autoflow/12.png",
      "/projects/screenshots/autoflow/13.png",
      "/projects/screenshots/autoflow/14.png",
      "/projects/screenshots/autoflow/15.png",
      "/projects/screenshots/autoflow/16.png",
    ],
    tags: ["Automation", "Web", "Next.js", "Node.js", "Express.js"],

    features: [
      {
        title: "Multi-Platform Data Extraction",
        icon: <ServerCog size={20} />,
        description:
          "Collect leads and company data from multiple sources including Nasdaq, YCombinator, Google Sheets, LinkedIn, and Clutch efficiently.",
      },
      {
        title: "Automated Data Enrichment",
        icon: <Database size={20} />,
        description:
          "Enhance lead data automatically using Apollo.io, retrieving emails, LinkedIn URLs, phone numbers, and other contact information.",
      },
      {
        title: "Outbound Marketing Campaigns",
        icon: <Mail size={20} />,
        description:
          "Run email campaigns and voice drops to reach potential leads effectively, directly from the platform.",
      },
      {
        title: "Campaign Performance Monitoring",
        icon: <Activity size={20} />,
        description:
          "Track and analyze the performance of campaigns, manage leads, and optimize outreach strategies based on real-time insights.",
      },
      {
        title: "End-to-End Automation",
        icon: <Repeat size={20} />,
        description:
          "Streamline the entire lead generation process, from discovery to outreach, reducing manual work and increasing efficiency.",
      },
    ],

    contributions: [
      "Developed the full application from scratch, handling complete frontend, backend, and integrations.",
      "Implemented multi-source data extraction pipelines from platforms like Nasdaq, Google Sheets, Y Combinator, Clutch, and LinkedIn.",
      "Built enrichment workflows by integrating Apollo.io API to retrieve emails, LinkedIn profiles, and phone numbers for extracted leads.",
      "Designed marketing automation workflows for running email and voice drop campaigns targeting enriched leads.",
      "Enabled seamless campaign management with real-time tracking and performance reporting.",
    ],

    displayImage: "/projects/screenshots/autoflow/1.png",
  },

  {
    title: "PetLinx",
    slug: "petlinx",
    description:
      "Pet grooming and daycare platform with customizable email templates.",
    link: "https://petlinx.com/",
    images: [
      "/projects/screenshots/petlinx/1.png",
      "/projects/screenshots/petlinx/2.png",
    ],
    tags: ["AI", "Web", "Next.js"],
    contributions: [
      "Built email template editor for customizable communications.",
      "Performed bug fixing and code optimization for improved performance.",
    ],
    displayImage: "/projects/screenshots/petlinx/1.png",
  },

  // {
  //   title: "DELIGO",
  //   slug: "deligo",
  //   description:
  //     "End-to-end food & grocery  delivery ecosystem with multi-role apps.",
  //   images: [
  //     "/projects/screenshots/deligo/4.png",
  //     "/projects/screenshots/deligo/1.png",
  //     "/projects/screenshots/deligo/6.png",
  //     "/projects/screenshots/deligo/2.png",
  //     "/projects/screenshots/deligo/9.png",
  //     "/projects/screenshots/deligo/10.png",
  //     "/projects/screenshots/deligo/11.png",
  //     "/projects/screenshots/deligo/12.png",
  //     "/projects/screenshots/deligo/13.png",
  //   ],
  //   tags: ["React Native", "Node JS", "Android", "IOS", "AWS"],
  //   contributions: [
  //     "End-to-end development of customer, vendor, delivery partner apps, and admin panel.",
  //     "Built key modules for order management, real-time tracking, payments, vendor inventory, and delivery partner assignments.",
  //     "Integrated Razorpay for secure multi-payment options including digital wallets and COD.",
  //     "Implemented Firebase for real-time updates, push notifications, and seamless order tracking.",
  //     "Designed role-based access control for secure user, vendor, delivery partner, and admin functionalities.",
  //     "Built analytics dashboards for performance monitoring, vendor reporting, and transaction management.",
  //   ],
  //   displayImage: "/projects/screenshots/deligo/4.png",
  // },
];

const techStack = [
  { icon: FaReact, color: "#61DAFB", name: "React" },
  { icon: SiNextdotjs, color: "#FFFFFF", name: "Next.js" },
  { icon: FaNodeJs, color: "#339933", name: "Node.js" },
  { icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
  { icon: SiMongodb, color: "#47A248", name: "MongoDB" },
  { icon: SiAngular, color: "#DD0031", name: "Angular" },
  { icon: SiFirebase, color: "#FFCA28", name: "Firebase" },
  { icon: FaPython, color: "#3776AB", name: "Python" },
];

const experiences = [
  {
    title: "Software Engineer",
    company: "Jai Infoway Pvt. Ltd.",
    duration: "August 2024 – July 2025",
    description:
      "Leading full-stack development for global client projects in a product-service hybrid environment.",
    tech: "React • Node.js • AWS • Microservices",
  },
  {
    title: "Mobile App Developer",
    company: "Brightcode Pvt. Ltd.",
    duration: "March 2024 – August 2024",
    description:
      "Developed cross-platform mobile applications with optimized performance and responsive UIs.",
    tech: "React Native • Node.js • GCP",
  },
  {
    title: "Software Engineer",
    company: "Jai Infoway Pvt. Ltd.",
    duration: "February 2023 – February 2024",
    description:
      "Built client-facing applications end-to-end in Agile teams, from UI to backend services.",
    tech: "Angular • Express.js • MongoDB • MySQL",
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "",
    duration: "July 2022 – January 2023",
    description:
      "Delivered complete web solutions for local businesses, handling all development phases.",
    tech: "React • Node.js • REST APIs",
  },
];

const keyProjects = [
  {
    name: "Koodums Chat",
    description: "Generative AI Agents Builder.",
    tech: "React • Node.js • TypeScript • Python • Vertex AI • GCP • Express.js",
  },
  {
    name: "Earnings Call",
    description:
      "AI-powered financial analysis platform with LLM integration and voice assistant.",
    tech: "Next.js • AWS • AI Agents",
  },
  {
    name: "Kiddie-Kredit",
    description:
      "Financial education mobile app for children. Gamified with task & reward systems.",
    tech: "React Native • Node.js • Socket.io",
  },
];

const categories = [
  {
    title: "Frontend",
    icon: Code,
    color: "#38bdf8",
    skills: [
      { icon: <SiReact className="text-[#61dafb]" />, name: "React" },
      { icon: <SiNextdotjs className="text-white" />, name: "Next.js" },
      { icon: <SiAngular className="text-[#dd1b16]" />, name: "Angular" },
      {
        icon: <SiElectron className="text-[#47848F]" />,
        name: "Electron.js",
      },
      {
        icon: <SiJavascript className="text-[#f7df1e]" />,
        name: "JavaScript",
      },
      {
        icon: <SiTypescript className="text-[#3178c6]" />,
        name: "TypeScript",
      },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "#4ade80",
    skills: [
      { icon: <SiNodedotjs className="text-[#339933]" />, name: "Node.js" },
      { icon: <SiGraphql className="text-[#e10098]" />, name: "GraphQL" },
      { icon: <SiExpress className="text-white" />, name: "Express.js" },
      { icon: <SiNestjs className="text-[#e0234e]" />, name: "Nest.js" },
      { icon: <SiWebrtc className="text-[#333]" />, name: "WebRTC" },
      { icon: <SiFastapi className="text-[#009688]" />, name: "FastAPI" },
    ],
  },
  {
    title: "AI/ML",
    icon: BrainCircuit,
    color: "#c084fc",
    skills: [
      { icon: <Sparkles className="text-[#a78bfa]" />, name: "LLMs" },
      { icon: <SiLangchain className="text-[#5c2d91]" />, name: "LangChain" },
      { icon: <SiOpenai className="text-[#10a37f]" />, name: "OpenAI" },
    ],
  },
  {
    title: "Cloud/DevOps",
    icon: Cpu,
    color: "#f59e0b",
    skills: [
      { icon: <SiAmazon className="text-[#ff9900]" />, name: "AWS" },
      { icon: <SiGooglecloud className="text-[#4285f4]" />, name: "GCP" },
      {
        icon: <SiAmazon className="text-[#0078d7]" />,
        name: "Azure",
      },
      { icon: <SiDocker className="text-[#0db7ed]" />, name: "Docker" },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    color: "#f472b6",
    skills: [
      { icon: <SiMongodb className="text-[#47a248]" />, name: "MongoDB" },
      { icon: <SiMysql className="text-[#00758f]" />, name: "MySQL" },
      {
        icon: <SiPostgresql className="text-[#336791]" />,
        name: "PostgreSQL",
      },
      { icon: <SiFirebase className="text-[#ffca28]" />, name: "Firebase" },
      { icon: <SiRedis className="text-[#005571]" />, name: "Redis" },
      { icon: <SiElastic className="text-[#003b57]" />, name: "Elastic" },
    ],
  },
  {
    title: "Languages",
    icon: Languages,
    color: "#ec4899",
    skills: [
      {
        icon: <SiTypescript className="text-[#3178c6]" />,
        name: "TypeScript",
      },
      {
        icon: <SiJavascript className="text-[#f7df1e]" />,
        name: "JavaScript",
      },
      { icon: <SiPython className="text-[#3776ab]" />, name: "Python" },
    ],
  },
];

export { projects, techStack, keyProjects, experiences, categories };
