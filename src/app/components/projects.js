"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Rocket, RocketIcon } from 'lucide-react';
import ProjectCard from '@/app/components/ProjectCard'; // adjust if needed


const projects = [
    {
        title: 'Earnings Call',
        description: 'AI-powered insights platform for earnings calls and SEC filings.',
        link: 'https://earnings-call.vercel.app/',
        tags: ['AI', 'Web', 'Next.js', 'AWS'],
        images: [
            '/projects/screenshots/earnings-call/1.png',
            '/projects/screenshots/earnings-call/2.png',
            '/projects/screenshots/earnings-call/3.png',
            '/projects/screenshots/earnings-call/4.png',
            '/projects/screenshots/earnings-call/5.png',
            '/projects/screenshots/earnings-call/6.png',
            '/projects/screenshots/earnings-call/7.png',
            '/projects/screenshots/earnings-call/8.png',
            '/projects/screenshots/earnings-call/9.png',
            '/projects/screenshots/earnings-call/10.png',
            '/projects/screenshots/earnings-call/11.png',
            '/projects/screenshots/earnings-call/12.png'
        ]
        ,
        contributions: [
            "Developed the application end-to-end, integrating AI-powered data processing and visualization.",
            "Implemented real-time sentiment analysis, Q&A functionality, and transcript generation from earnings calls.",
            "Built features to fetch, upload, and manage earnings calls for multiple companies.",
            "Developed earnings calendar, company performance comparison tools, and AI-generated visual reports.",
            "Integrated SEC filing reports including income statements, balance sheets, and cash flow statements.",
            "Added voice assistant functionality for interactive financial insights."
        ],
        displayImage: '/projects/screenshots/earnings-call/12.png'
    },
    {
        title: "Koodums Chat",
        description: "AI-powered digital concierge chatbot for hotels offering room services, travel planning, ticket booking,and itinerary management.",
        link: "https://admin-tool-dev.genaisolutions.ai/",
        images: [
            '/projects/screenshots/koodums-chat/1.png',
            '/projects/screenshots/koodums-chat/2.png',
            '/projects/screenshots/koodums-chat/3.png'
        ],
        tags: ['AI Agents', 'Node JS', 'Typescript', 'Python', "GCP", "MCP"],
        contributions: [
            "Focused on building the MCP (Model Context Protocol) client and server architecture to connect AI agents with external tools like Google Maps and YouTube.",
            "Implemented MCP servers from scratch to handle tool calls for fetching place details, directions, reviews, photos, YouTube videos, comments, live streams, shorts, channels, and playlists.",
            "Developed prompt optimization logic to clarify incomplete or ambiguous user queries by analyzing conversational context or dynamically requesting missing information from the user.",
            "Designed and implemented context management system to ensure optimal LLM performance by maintaining only the latest 10 conversational turns for efficient memory usage and relevant context injection.",
            "Enabled AI agents to dynamically chain tool calls through MCP servers to enrich user conversations and deliver personalized, context-aware responses.",
            "Collaborated on integration with cloud services for scalable deployment and real-time system performance."
        ],
        displayImage: '/projects/screenshots/koodums-chat/3.png'
    },
    {
        title: "SWIFI",
        description: "Big Data platform for extracting and analyzing SEC filings for fintech applications.",
        link: "https://www.xinervatech.com/",
        images: ['/projects/screenshots/swifi/1.png', '/projects/screenshots/swifi/2.png', '/projects/screenshots/swifi/3.png'],
        tags: ['Angular', 'Web', 'Node JS', 'Typescript'],
        contributions:
            [
                "Developed a web scraper to extract and process investment-grade SEC filings.",
                "Built an annotation tool allowing users to highlight and comment on filing data for collaborative analysis."
            ],

        displayImage: '/projects/screenshots/swifi/1.png'
    },
    {
        title: "OFLEP Connect",
        description: "Video conferencing platform offering HD calls, collaboration tools, and secure virtual meetings for individuals and businesses.",
        link: "#",
        images: [],
        tags: ['React Native', 'Express.js', 'Node.js', 'WebRTC', 'MongoDB', 'Socket.io', 'TypeScript'],
        contributions:
            [
                "Designed and developed high-quality multi-party video calling functionality using WebRTC.",
                "Built core features such as screen sharing, chat, reactions, and meeting scheduling with recording support.",
                "Implemented advanced host controls for muting, video toggling, participant management, and permissions.",
                "Integrated secure, password-protected meeting invites with time-limited access links.",
                "Developed cross-platform solutions to support both mobile (iOS & Android) and web-based participation.",
                "Configured TURN servers for improved call stability and reliability under various network conditions."
            ],
    },
    {
        title: "Intellibooks",
        description: "Cross-platform desktop application for hotel and restaurant owners to manage orders, inventory, and billing operations.",
        link: "https://intellibooks.io/",
        images: ['/projects/screenshots/intellibooks/1.png', '/projects/screenshots/intellibooks/2.png'],
        tags: ['React', ' Electron.js', 'Express.js', 'Node.js', 'TypeScript'],
        contributions:
            [
                "Developed a multi-platform desktop application compatible across various operating systems.",
                "Implemented hash-based routing and platform-specific adaptations for cross-OS compatibility.",
                "Developed modules for order management, stock handling, billing, and reporting."
            ],
        displayImage: '/projects/screenshots/intellibooks/2.png'


    },
    {
        title: 'AutoFlow',
        description: 'Lead generation and outbound marketing platform with Apollo.io integration.',
        link: '#',
        images: [
            '/projects/screenshots/autoflow/1.png',
            '/projects/screenshots/autoflow/2.png',
            '/projects/screenshots/autoflow/3.png',
            '/projects/screenshots/autoflow/4.png',
            '/projects/screenshots/autoflow/5.png',
            '/projects/screenshots/autoflow/6.png',
            '/projects/screenshots/autoflow/7.png',
            '/projects/screenshots/autoflow/8.png',
            '/projects/screenshots/autoflow/9.png',
            '/projects/screenshots/autoflow/10.png',
            '/projects/screenshots/autoflow/11.png',
            '/projects/screenshots/autoflow/12.png',
            '/projects/screenshots/autoflow/13.png',
            '/projects/screenshots/autoflow/14.png',
            '/projects/screenshots/autoflow/15.png',
            '/projects/screenshots/autoflow/16.png'
        ]
        ,
        tags: ["Automation", 'Web', 'Next.js'],
        contributions: [
            "Developed the full application from scratch, handling complete frontend, backend, and integrations.",
            "Implemented multi-source data extraction pipelines from platforms like Nasdaq, Google Sheets, Y Combinator, Clutch, and LinkedIn.",
            "Built enrichment workflows by integrating Apollo.io API to retrieve emails, LinkedIn profiles, and phone numbers for extracted leads.",
            "Designed marketing automation workflows for running email and voice drop campaigns targeting enriched leads.",
            "Enabled seamless campaign management with real-time tracking and performance reporting."
        ],

        displayImage: '/projects/screenshots/autoflow/1.png'
    },
    {
        title: 'PetLinx',
        description: 'Pet grooming and daycare platform with customizable email templates.',
        link: 'https://petlinx.com/',
        images: ['/projects/screenshots/petlinx/1.png', '/projects/screenshots/petlinx/2.png'],
        tags: ['AI', 'Web', 'Next.js'],
        contributions: [
            'Built email template editor for customizable communications.',
            'Performed bug fixing and code optimization for improved performance.'
        ],
        displayImage: '/projects/screenshots/petlinx/1.png'

    },
    {
        title: 'Kiddie Kredit',
        description: 'Financial education mobile app for children. Gamified with task & reward systems.',
        link: 'https://www.kiddiekredit.com/',
        images: [
            '/projects/screenshots/kk/5.png',
            '/projects/screenshots/kk/2.png',
            '/projects/screenshots/kk/4.png',
            '/projects/screenshots/kk/6.png',
            '/projects/screenshots/kk/7.png',
            '/projects/screenshots/kk/8.png',
            '/projects/screenshots/kk/9.png',
            '/projects/screenshots/kk/10.png',
            '/projects/screenshots/kk/12.png',
            '/projects/screenshots/kk/13.png',
            '/projects/screenshots/kk/14.png',
            '/projects/screenshots/kk/15.png'
        ],
        tags: ['React Native', 'Node JS', 'Android', 'IOS', 'Animation'],
        displayImage: '/projects/screenshots/kk/6.png',
        contributions: [
            'Developed gamified task/reward system for children’s financial literacy',
            'Built multi-role support (child, guardian, admin)',
            "End-to-end development of the mobile application.",
            "Built core features such as task assignment, reward systems, credit score simulation, progress tracking, and educational modules.",
            "Integrated Braze for behavior tracking, campaign management, and personalized notifications.",
            "Developed secure authentication, push notifications, and parental controls for data privacy."
        ],
    },
    {
        title: 'DELIGO',
        description: 'End-to-end food & grocery  delivery ecosystem with multi-role apps.',
        images: ["/projects/screenshots/deligo/Screenshot_20240618-183329.png"],
        tags: ['React Native', 'Node JS', 'Android', 'IOS', 'AWS'],
        contributions: [
            "End-to-end development of customer, vendor, delivery partner apps, and admin panel.",
            "Built key modules for order management, real-time tracking, payments, vendor inventory, and delivery partner assignments.",
            "Integrated Razorpay for secure multi-payment options including digital wallets and COD.",
            "Implemented Firebase for real-time updates, push notifications, and seamless order tracking.",
            "Designed role-based access control for secure user, vendor, delivery partner, and admin functionalities.",
            "Built analytics dashboards for performance monitoring, vendor reporting, and transaction management."
        ]

    },
    {
        title: 'Logik',
        description: 'Logistics and vehicle rental platform for seamless delivery services.',
        images: [
            '/projects/screenshots/logik/1.png',
            '/projects/screenshots/logik/3.png',
            '/projects/screenshots/logik/4.png',
            '/projects/screenshots/logik/5.png',
            '/projects/screenshots/logik/6.png',
            '/projects/screenshots/logik/7.png',
            '/projects/screenshots/logik/8.png',
            '/projects/screenshots/logik/9.png',
            '/projects/screenshots/logik/10.png',
            '/projects/screenshots/logik/11.png',
            '/projects/screenshots/logik/12.png',
            '/projects/screenshots/logik/13.png',
            '/projects/screenshots/logik/14.png',
            '/projects/screenshots/logik/15.png',
            '/projects/screenshots/logik/16.png',
            '/projects/screenshots/logik/17.png',
            '/projects/screenshots/logik/18.png',
            '/projects/screenshots/logik/20.png',
            '/projects/screenshots/logik/23.png',
            '/projects/screenshots/logik/24.png',
            '/projects/screenshots/logik/25.png',
            '/projects/screenshots/logik/26.png'

        ],
        tags: ['React Native', 'Node JS', 'Android', 'IOS', 'Tracking', "GCP"],
        displayImage: '/projects/screenshots/logik/15.png',
        contributions: [
            "Fully developed both client and driver applications.",
            "Implemented vehicle booking, real-time tracking, route optimization, invoicing, ride history, and secure payments.",
            "Integrated smart vehicle-driver matching algorithms.",
            "Developed real-time notifications, secure user authentication, and transaction management."
        ]

    }


];



export default function Projects() {
    const searchParams = useSearchParams();
    const shouldLand = searchParams.get('land') === 'true';

    const [showLandingRocket, setShowLandingRocket] = useState(shouldLand);

    useEffect(() => {
        console.log("shouldLand", shouldLand)

        if (shouldLand) {
            const timer = setTimeout(() => setShowLandingRocket(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [shouldLand]);

    return (
        <section id="project-section" className="relative min-h-screen pt-12">
            {/* 🚀 Landing rocket animation */}
            {showLandingRocket && (
                <motion.div
                    initial={{ y: '-100vh', opacity: 0 }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="fixed z-[100] top-0 left-1/2 transform -translate-x-1/2 pointer-events-none"
                >
                    {showLandingRocket && (
                        <motion.div
                            initial={{ y: -300, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
                        >
                            {/* 🚀 Rocket */}
                            <RocketIcon size={32} className="text-accent drop-shadow-[0_0_20px_rgba(0,247,255,0.4)] z-10" />

                            {/* 🔥 Thrust Flame */}
                            <motion.div
                                className="w-3 h-12 bg-gradient-to-b from-yellow-400 via-orange-500 to-transparent rounded-full blur-sm mt-[-4px]"
                                animate={{ scaleY: [1, 1.6, 1], opacity: [0.8, 0.4, 0.8] }}
                                transition={{ duration: 0.25, repeat: Infinity }}
                            />

                            {/* 💨 Smoke Particles */}
                            <div className="relative mt-1">
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute bottom-0 w-3 h-3 bg-gray-300 rounded-full blur-sm opacity-50"
                                        style={{
                                            left: `${i * 10 - 20}px`,
                                        }}
                                        initial={{ y: 0, scale: 1, opacity: 0.4 }}
                                        animate={{
                                            y: [0, -30],
                                            scale: [1, 1.8],
                                            opacity: [0.4, 0],
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            delay: i * 0.2,
                                            repeat: Infinity,
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                </motion.div>
            )}



            <div className="project-grid">
                {projects.map((proj, idx) => (
                    <ProjectCard key={idx} {...proj} />
                ))}
            </div>
        </section>
    );
}

