'use client';

import Image from 'next/image';
import { FaReact, FaNodeJs, FaMobileAlt, FaPython } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiAngular, SiFirebase } from 'react-icons/si';
import { Typewriter } from 'react-simple-typewriter';

export default function About() {
  return (
    <section className="about-section">
      <div className="about-flex">
        <div className="about-image">
          <Image
            src="/profile.jpg"
            alt="Vishal Singh"
            width={250}
            height={250}
            className="profile-img"
          />
        </div>

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
                  <h4>Notable Projects</h4>
                  <div className="project-highlights">
                    <div className="project-item">
                      <h5>AutoFlow</h5>
                      <p>Sales automation platform with multi-source data extraction and marketing workflows</p>
                      <span>Next.js | Apollo | TypeScript</span>
                    </div>
                    <div className="project-item">
                      <h5>Earnings Call</h5>
                      <p>AI-powered financial analysis with LLM integration and voice assistant</p>
                      <span>Next.js | AWS | AI Agents</span>
                    </div>
                    <div className="project-item">
                      <h5>OFLEP Connect</h5>
                      <p>WebRTC video conferencing with screen sharing and host controls</p>
                      <span>React Native | WebRTC | Socket.io</span>
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