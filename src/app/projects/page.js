import ProjectCard from '@/app/components/ProjectCard';


const projects = [
    {
        title: 'Earnings Call',
        description: 'AI-powered insights platform for earnings calls and SEC filings.',
        link: 'https://earnings-call.vercel.app/',
        tags: ['AI', 'Web', 'Next.js', 'AWS'],
        images: [],
        contributions: [
            'Built AI-enabled chat system for earnings call insights',
            'Integrated OpenAI and Anthropic APIs for real-time querying',
            'Developed charting dashboard and data parsing modules',
        ],
    },
    {
        title: 'AutoFlow',
        description: 'Lead generation and outbound marketing platform with Apollo.io integration.',
        link: '#',
        images: [],
        tags: ["Automation", 'Web', 'Next.js'],
        contributions: [
            'Architected backend system for lead automation workflows',
            'Integrated Apollo.io and Notion for data enrichment',
            'Built email sequence tool and analytics dashboard',
        ],
    },
    {
        title: 'PetLinx',
        description: 'Pet grooming and daycare platform with customizable email templates.',
        link: 'https://petlinx.com/',
        images: [],
        tags: ['AI', 'Web', 'Next.js'],
        contributions: [
            'Developed customizable email template engine with preview support',
            'Created booking workflows and business management tools',
            'Worked on PDF export, preview, and storage integrations',
        ],

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

    },
    {
        title: "Koodums Chat",
        description: "AI-powered digital concierge chatbot for hotels offering room services, travel planning, ticket booking,and itinerary management.",
        link: "https://admin-tool-dev.genaisolutions.ai/",
        images: [],
        tags: ['AI Agents', 'Web', 'Node JS', 'Typescript', 'Python', "GCP", "MCP"],
        contributions: [
            'Created AI agent flow for hotel concierge operations',
            'Integrated MCP with OpenAI and LangChain logic',
            'Built tools for chatbot-based service management',
        ],
    },
    {
        title: "SWIFI",
        description: "Big Data platform for extracting and analyzing SEC filings for fintech applications.",
        link: "https://www.xinervatech.com/",
        images: [],
        tags: ['Angular', 'Web', 'Node JS', 'Typescript'],
        contributions: [
            'Built front-end UI using Angular and Material UI',
            'Developed APIs for authentication, storage, and management',
            'Worked on SEC data scraping and visualization',
        ],
    }

];

export default function Projects() {
    return (
        <section>
            <h2 className='mb-4'>Projects</h2>
            <div className="project-grid">
                {projects.map((proj, idx) => (
                    <ProjectCard key={idx} {...proj} />
                ))}
            </div>
        </section>
    );
}
