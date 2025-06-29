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
            'Built AI-enabled chat system for earnings call insights',
            'Integrated OpenAI and Anthropic APIs for real-time querying',
            'Developed charting dashboard and data parsing modules',
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
        tags: ['AI Agents', 'Web', 'Node JS', 'Typescript', 'Python', "GCP", "MCP"],
        contributions: [
            'Created AI agent flow for hotel concierge operations',
            'Integrated MCP with OpenAI and LangChain logic',
            'Built tools for chatbot-based service management',
        ],
        displayImage: '/projects/screenshots/koodums-chat/3.png'
    },
    {
        title: "SWIFI",
        description: "Big Data platform for extracting and analyzing SEC filings for fintech applications.",
        link: "https://www.xinervatech.com/",
        images: ['/projects/screenshots/swifi/1.png', '/projects/screenshots/swifi/2.png', '/projects/screenshots/swifi/3.png'],
        tags: ['Angular', 'Web', 'Node JS', 'Typescript'],
        contributions: [
            'Built front-end UI using Angular and Material UI',
            'Developed APIs for authentication, storage, and management',
            'Worked on SEC data scraping and visualization',
        ],
        displayImage: '/projects/screenshots/swifi/1.png'
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
            'Architected backend system for lead automation workflows',
            'Integrated Apollo.io and Notion for data enrichment',
            'Built email sequence tool and analytics dashboard',
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
            'Developed customizable email template engine with preview support',
            'Created booking workflows and business management tools',
            'Worked on PDF export, preview, and storage integrations',
        ],
        displayImage: '/projects/screenshots/petlinx/1.png'

    },
    {
        title: 'Kiddie Kredit',
        description: 'Financial education mobile app for children. Gamified with task & reward systems.',
        link: 'https://www.kiddiekredit.com/',
        images: [
            '/projects/screenshots/kk/5.png',
            '/projects/screenshots/kk/1.png',
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
            'Integrated Firebase and in-app notification logic',
        ],
    },
    {
        title: 'DELIGO',
        description: 'End-to-end food & grocery  delivery ecosystem with multi-role apps.',
        images: ["/projects/screenshots/deligo/Screenshot_20240618-183329.png"],
        tags: ['React Native', 'Node JS', 'Android', 'IOS', 'AWS'],
        contributions: [
            'Built vendor, delivery, and customer-facing mobile apps',
            'Implemented live order tracking and delivery status updates',
            'Managed authentication and vendor dashboards',
        ],
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
            'Designed vehicle rental & logistics mobile app interface',
            'Integrated location tracking and booking system',
            'Built admin tools for managing orders and users',
        ],
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

