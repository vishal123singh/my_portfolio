"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Rocket,
  MousePointerClick,
  Settings,
  Zap,
  LayoutDashboard,
  Brain,
  Server,
  GitBranch,
  Cpu,
} from "lucide-react";
import Image from "next/image";

const techIcons = [
  {
    name: "Node.js",
    src: "/tech/nodejs.svg",
    icon: <Server className="w-8 h-8 text-green-500" />,
  },
  {
    name: "LangChain",
    src: "/tech/langchain.png",
    icon: <GitBranch className="w-8 h-8 text-blue-400" />,
  },
  {
    name: "OpenAI",
    src: "/tech/openai.svg",
    icon: <Brain className="w-8 h-8 text-purple-400" />,
  },
  {
    name: "TypeScript",
    src: "/tech/typescript.svg",
    icon: <Code className="w-8 h-8 text-blue-500" />,
  },
  {
    name: "TailwindCSS",
    src: "/tech/tailwind.svg",
    icon: <Cpu className="w-8 h-8 text-teal-400" />,
  },
];

const featureCards = [
  {
    icon: <LayoutDashboard className="w-8 h-8" />,
    title: "Node-based Flow",
    desc: "Visually design AI logic with modular nodes.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "LLM Tooling",
    desc: "Chain OpenAI, LangChain, and custom tools in seconds.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Instant Preview",
    desc: "Test your agents in-browser before exporting.",
    color: "from-teal-500 to-emerald-600",
  },
];

export default function AIAgentBuilderPage() {
  return (
    <div className="text-white bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              x: Math.random() * 1000 - 500,
              y: Math.random() * 1000 - 500,
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              width: `${5 + Math.random() * 15}px`,
              height: `${5 + Math.random() * 15}px`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#60a5fa" : "#34d399"
              }, transparent)`,
            }}
          />
        ))}
      </div>

      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
      </div>

      {/* HERO SECTION */}
      <section className="min-h-screen px-6 py-24 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 0.15,
              scale: 1,
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute inset-0 m-auto w-[800px] h-[800px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-[160px]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-gray-800 border border-gray-700"
          >
            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400/20" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-pink-500 text-transparent bg-clip-text">
              AI Agent Builder
            </span>
            <br />
            <span className="text-2xl md:text-4xl font-medium bg-gradient-to-r from-gray-300 to-gray-400 text-transparent bg-clip-text">
              Visual Workflow Creation
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Build, test, and deploy LLM-based agents with a drag-and-drop
            interface. Create complex workflows in minutes, not hours.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/ai-agent-builder"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all text-white text-lg font-medium flex items-center gap-2 shadow-lg shadow-purple-500/20"
            >
              Launch Builder
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#how-it-works"
              className="px-6 py-3.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all text-white text-lg font-medium flex items-center gap-2"
            >
              See How It Works
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="relative z-10 w-full max-w-6xl mx-auto mt-16"
        >
          <div className="relative rounded-3xl overflow-visible border border-gray-800 shadow-2xl">
            {/* Blurred Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md z-0 rounded-3xl" />

            {/* Demo Image */}
            <Image
              src="/images/viva.png"
              alt="AI Agent Builder Demo"
              width={1200}
              height={700}
              className="w-full h-auto relative z-10 rounded-3xl"
            />

            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute top-2 right-2 z-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-3 py-1.5 text-sm font-medium shadow-xl"
            >
              Drag & Drop
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-2 left-2 z-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg px-3 py-1.5 text-sm font-medium shadow-xl"
            >
              Real-time Preview
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="py-24 px-6 text-center max-w-6xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              How It Works
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Build complex AI agents in three simple steps without writing
            complex code
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            {
              icon: <MousePointerClick className="w-10 h-10 text-purple-400" />,
              title: "Visual Assembly",
              desc: "Add nodes like Input, OpenAI, LangChain, Webhook, and connect them with intuitive drag-and-drop.",
              delay: 0.2,
            },
            {
              icon: <Zap className="w-10 h-10 text-yellow-400" />,
              title: "Chain Agents",
              desc: "Connect tools, logic, and memory into reusable workflows or standalone agents with intelligent linking.",
              delay: 0.4,
            },
            {
              icon: <Rocket className="w-10 h-10 text-pink-500" />,
              title: "Deploy Anywhere",
              desc: "Export workflows as Node.js microservices, serverless functions, or integrate directly into your backend.",
              delay: 0.6,
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.6, delay: step.delay }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl overflow-hidden relative"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gray-800 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-gray-950 to-transparent z-0" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text">
                Powerful Features
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to build production-ready AI agents
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featureCards.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${feature.color} rounded-2xl p-px shadow-xl`}
              >
                <div className="bg-gradient-to-b from-gray-900 to-gray-950 h-full rounded-2xl p-6">
                  <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-800 rounded-2xl p-8 text-left max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">
                  Advanced Capabilities
                </h3>
                <ul className="space-y-3">
                  {[
                    "Multi-agent collaboration workflows",
                    "Long-term memory integration",
                    "Real-time data streaming",
                    "Automated error handling",
                    "Version control for agents",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <span className="ml-3 text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-1 rounded-xl">
                <div className="bg-gray-900 rounded-lg p-4">
                  <Image
                    src="/images/viva.png"
                    alt="Agent Diagram"
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black z-0" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Built With Modern Stack
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Leveraging the best tools for high-performance AI development
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-12">
            {techIcons.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center group"
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="mb-4 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl border border-gray-800 shadow-lg"
                >
                  {tech.icon}
                </motion.div>
                <p className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
                  {tech.name}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-800 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to start building?
                </h3>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/ai-agent-builder"
                  className="inline-flex px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all text-white text-lg font-medium items-center gap-2 shadow-lg shadow-purple-500/20"
                >
                  Create Your First Agent
                  <Rocket className="w-5 h-5" />
                </motion.a>
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-1 rounded-xl">
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
