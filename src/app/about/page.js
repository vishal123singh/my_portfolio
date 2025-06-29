'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaReact, FaNodeJs, FaMobileAlt, FaPython, FaUnlockAlt } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiAngular, SiFirebase } from 'react-icons/si';
import { Typewriter } from 'react-simple-typewriter';

function FlippableProfile() {
  const [code, setCode] = useState('');
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    if (code.trim().toLowerCase() === 'ballu & soni') {
      setFlipped((prev) => !prev); // toggle flip
    }
  };

  return (
    <div className="relative w-48 h-48 perspective mx-auto">
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        {/* Front Image */}
        <div className="flip-card-front">
          <Image
            src="/personal/profile.png"
            alt="Vishal Singh"
            fill
            className="object-cover rounded-full"
          />
        </div>

        {/* Back Image */}
        <div className="flip-card-back">
          <Image
            src="/personal/2.jpg"
            alt="Ballu & Soni"
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>

      {/* Code Input + Icon */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Enter secret code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="px-2 py-1 rounded-md text-sm text-white"
        />
        <button
          onClick={handleFlip}
          className="text-white bg-pink-500 px-3 py-2 rounded-full hover:bg-pink-600"
        >
          <FaUnlockAlt />
        </button>
      </div>

      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 9999px;
          overflow: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}


export default function About() {
  return (
    <section className="about-section">
      <div className="about-flex">
        <FlippableProfile />


        <div className="about-text">
          <h2 className="about-title">Professional Profile</h2>
          <p className="typing-line">
            <Typewriter
              words={[
                'Full-Stack Architect',
                'Cross-Platform Mobile Developer',
                'AI Solutions Engineer',
                'Cloud-Native Developer',
                'LLM Integration',
                'Real-Time Systems Developer'
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </p>
          <p>
            I'm an <span className="highlight">innovative full-stack engineer</span> with 3+ years of experience building scalable web and mobile solutions. My expertise spans AI integration, cloud deployments, and delivering high-performance applications across fintech, logistics, and SaaS domains.
          </p>
          <p>
            Passionate about combining cutting-edge technologies with clean architecture to solve complex business challenges.
          </p>

          <div className="tech-icons">
            <FaReact title="React/React Native" />
            <FaNodeJs title="Node.js" />
            <SiNextdotjs title="Next.js" />
            <SiMongodb title="MongoDB" />
            <SiAngular title="Angular" />
            <SiFirebase title="Firebase" />
            <FaPython title="Python/AI" />
            <FaMobileAlt title="Mobile Development" />
          </div>

          <h3 className="timeline-title">Professional Journey</h3>
          <div className="timeline-container">
            <ul className="timeline">
              <li>
                <div className="timeline-point" />
                <div className="timeline-content">
                  <h4>Software Engineer — <span>Jai Infoway Pvt. Ltd.</span></h4>
                  <p className="timeline-duration">August 2024 – Present</p>
                  <p>Leading full-stack development for global client projects in a product-service hybrid environment.</p>
                  <p><strong>Key Tech:</strong> React, Node.js, AWS, Microservices</p>
                </div>
              </li>

              <li>
                <div className="timeline-point" />
                <div className="timeline-content">
                  <h4>Mobile App Developer — <span>Brightcode Pvt. Ltd.</span></h4>
                  <p className="timeline-duration">March 2024 – August 2024</p>
                  <p>Developed cross-platform mobile applications with optimized performance and responsive UIs.</p>
                  <p><strong>Key Tech:</strong> React Native, Node.js, GCP</p>
                </div>
              </li>

              <li>
                <div className="timeline-point" />
                <div className="timeline-content">
                  <h4>Software Engineer — <span>Jai Infoway Pvt. Ltd.</span></h4>
                  <p className="timeline-duration">February 2023 – February 2024</p>
                  <p>Built client-facing applications end-to-end in Agile teams, from UI to backend services.</p>
                  <p><strong>Key Tech:</strong> Angular, Express.js, MongoDB, MySQL</p>
                </div>
              </li>

              <li>
                <div className="timeline-point" />
                <div className="timeline-content">
                  <h4>Freelance Full-Stack Developer</h4>
                  <p className="timeline-duration">July 2022 – January 2023</p>
                  <p>Delivered complete web solutions for local businesses, handling all development phases.</p>
                  <p><strong>Key Tech:</strong> React, Node.js, REST APIs</p>
                </div>
              </li>

              <li>
                <div className="timeline-point" />
                <div className="timeline-content">
                  <h4 className="text-xl font-semibold mb-3 text-cyan-400">🚀 Notable Projects</h4>
                  <div className="space-y-4">
                    <div className="bg-[#1e293b] p-4 rounded-lg shadow-md border border-[#334155] hover:shadow-cyan-500/10 transition">
                      <h5 className="text-lg font-semibold text-white">AutoFlow</h5>
                      <p className="text-sm text-slate-300 mt-1">
                        Sales automation platform with multi-source data extraction and marketing workflows.
                      </p>
                      <span className="text-xs text-cyan-400 mt-2 block">Next.js • Apollo • TypeScript</span>
                    </div>

                    <div className="bg-[#1e293b] p-4 rounded-lg shadow-md border border-[#334155] hover:shadow-cyan-500/10 transition">
                      <h5 className="text-lg font-semibold text-white">Earnings Call</h5>
                      <p className="text-sm text-slate-300 mt-1">
                        AI-powered financial analysis platform with LLM integration and voice assistant.
                      </p>
                      <span className="text-xs text-cyan-400 mt-2 block">Next.js • AWS • AI Agents</span>
                    </div>

                    <div className="bg-[#1e293b] p-4 rounded-lg shadow-md border border-[#334155] hover:shadow-cyan-500/10 transition">
                      <h5 className="text-lg font-semibold text-white">OFLEP Connect</h5>
                      <p className="text-sm text-slate-300 mt-1">
                        WebRTC video conferencing with screen sharing and real-time host controls.
                      </p>
                      <span className="text-xs text-cyan-400 mt-2 block">React Native • WebRTC • Socket.io</span>
                    </div>
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}