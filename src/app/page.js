'use client';

import { motion } from 'framer-motion';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
  SiGit,
  SiPython,
  SiGraphql,
  SiFirebase,
  SiAmazon,
} from 'react-icons/si';
import { Typewriter } from 'react-simple-typewriter';
import { Rocket } from 'lucide-react';

const skills = [
  { icon: <SiJavascript color="#f7df1e" />, label: 'JavaScript' },         // Yellow
  { icon: <SiTypescript color="#3178c6" />, label: 'TypeScript' },        // Blue
  { icon: <SiPython color="#3776ab" />, label: 'Python' },                // Blue
  { icon: <SiReact color="#61dafb" />, label: 'React / React Native' },   // Cyan
  { icon: <SiNextdotjs color="#ffffff" />, label: 'Next.js' },            // White/neutral
  { icon: <SiNodedotjs color="#339933" />, label: 'Node.js' },            // Green
  { icon: <SiGraphql color="#e535ab" />, label: 'GraphQL' },              // Pink
  { icon: <SiMongodb color="#47a248" />, label: 'MongoDB' },              // Green
  { icon: <SiMysql color="#00758f" />, label: 'MySQL' },                  // Blue
  { icon: <SiPostgresql color="#336791" />, label: 'PostgreSQL' },        // Blue
  { icon: <SiFirebase color="#ffca28" />, label: 'Firebase' },            // Orange
  { icon: <SiAmazon color="#ff9900" />, label: 'AWS' },                   // Orange
  { icon: <SiGit color="#f05032" />, label: 'Git' },                      // Orange-red
  { icon: <SiTailwindcss color="#38bdf8" />, label: 'Tailwind CSS' },     // Cyan
];



function HomeHero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Hi, I'm <span className="highlight">Vishal Singh</span>
        </h1>

        <p className="typing-line">
          <Typewriter
            words={[
              'Full Stack Developer',
              'Mobile App Creator',
              'AI Integrator',
              'Always Learning',
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </p>

        {/* ✨ Fake code block animation */}
        <motion.pre
          className="code-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <code>
            <span className="code-comment">// skills.js</span>
            <br />
            <span className="code-key">const</span>{' '}
            <span className="code-var">developer</span> = {'{'}
            <br />
            &nbsp;&nbsp;<span className="code-key">name</span>: <span className="code-str">"Vishal Singh"</span>,
            <br />
            &nbsp;&nbsp;<span className="code-key">stack</span>: [
            <span className="code-str">"React"</span>,{' '}
            <span className="code-str">"Node.js"</span>,{' '}
            <span className="code-str">"Next.js"</span>,{' '}
            <span className="code-str">"React Native"</span>,{' '}
            <span className="code-str">"DevOps"</span>
            ]
            <br />
            {'};'}
          </code>
        </motion.pre>

        <div className="mt-4 flex justify-center">
          <Rocket className="text-accent animate-bounce" size={32} />
        </div>

        <a href="/projects" className="hero-btn mt-6">🚀 View My Work</a>
      </div>
    </section>
  );
}



export default function Home() {
  return (
    <>
      <HomeHero></HomeHero>

      <section className="skills">
        <h2 className="page-title">My Skills</h2>
        <motion.div
          className="skills-icon-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              className="skill-icon-box"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="icon text-4xl mb-2">{skill.icon}</div>
              <p>{skill.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
