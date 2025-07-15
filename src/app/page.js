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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ParticlesBackground from './components/ParticlesBackground';

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
  const [launching, setLaunching] = useState(false);
  const router = useRouter();

  const handleLaunch = () => {
    setLaunching(true);
    setTimeout(() => {
      router.push('/projects?land=true');
    }, 1500); // matches animation duration
  };

  return (
    <section className="hero min-h-[90vh] relative overflow-hidden flex items-center justify-center px-4 md:px-8 text-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <ParticlesBackground></ParticlesBackground>
      {/* 💫 Background blobs for visual depth */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-cyan-500 rounded-full opacity-30 blur-3xl z-0"
        animate={{ x: 80, y: 80, scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-pink-500 rounded-full opacity-25 blur-3xl z-0"
        animate={{ x: -60, y: -60, scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror' }}
      />

      <div className="max-w-3xl w-full z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Hi, I'm <span className="highlight text-accent">Vishal Singh</span>
        </h1>

        <p className="typing-line text-base md:text-lg text-slate-400 mb-6">
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

        {/* 💻 Fake Code Block */}
        <motion.div
          className="w-full overflow-x-auto px-4 md:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <pre className="bg-[#1e293b] text-slate-300 text-sm md:text-base p-4 rounded-xl w-max max-w-full whitespace-pre-wrap break-words">
            <code>
              <span className="text-pink-400">// skills.js</span>
              {'\n'}
              <span className="text-blue-400">const</span>{' '}
              <span className="text-green-400">developer</span> = {'{'}{'\n'}
              {'  '}<span className="text-blue-400">name</span>: <span className="text-yellow-300">"Vishal Singh"</span>,{'\n'}
              {'  '}<span className="text-blue-400">stack</span>: [
              <span className="text-yellow-300">"React"</span>,{' '}
              <span className="text-yellow-300">"Node.js"</span>,{' '}
              <span className="text-yellow-300">"Next.js"</span>,{' '}
              <span className="text-yellow-300">"React Native"</span>,{' '}
              <span className="text-yellow-300">"DevOps"</span>
              ]{'\n'}
              {'};'}
            </code>
          </pre>
        </motion.div>

        {/* 🚀 Rocket Launch with Thrust and Smoke */}
        <motion.div
          className="my-6 flex justify-center relative h-16"
          animate={
            launching
              ? { x: 120, y: -240, rotate: -35, scale: 0.7, opacity: 0 }
              : { y: [0, -5, 0] }
          }
          transition={{
            duration: launching ? 1.4 : 1.6,
            ease: 'easeInOut',
            repeat: launching ? 0 : Infinity,
          }}
        >
          <div className="relative">
            {/* 🚀 Rocket */}
            <Rocket size={36} className="text-accent drop-shadow-[0_0_8px_rgba(0,247,255,0.5)]" />

            {/* 🔥 Thrust Flames */}
            {launching && (
              <>
                <motion.div
                  className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[6px] h-[24px] bg-gradient-to-b from-yellow-400 via-orange-500 to-transparent rounded-full blur-sm"
                  animate={{ scaleY: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-300 rounded-full blur-sm"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0.4, 0.8] }}
                  transition={{ repeat: Infinity, duration: 0.25 }}
                />
              </>
            )}

            {/* 💨 Smoke Trail */}
            {launching && (
              <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gray-300 rounded-full blur-sm opacity-50"
                    style={{ left: `${i * 10 - 15}px` }}
                    initial={{ y: 0, opacity: 0.5 }}
                    animate={{
                      y: [0, 25],
                      scale: [1, 1.8],
                      opacity: [0.4, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.15,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>


        <button
          onClick={handleLaunch}
          disabled={launching}
          className="inline-block hero-btn mt-4 bg-accent text-[#0f172a] px-6 py-2 rounded-full font-bold shadow hover:bg-blue-500 transition duration-300"
        >
          🚀 View My Work
        </button>
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
