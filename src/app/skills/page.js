'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrainCogIcon } from 'lucide-react';

const skills = {
  'Frontend': [
    'React / React Native',
    'Next.js',
    'Angular',
    'Electron.js',
    'Tailwind CSS',
    'HTML/CSS',
  ],
  'Backend': ['Node.js', 'Express.js', 'GraphQL', 'WebRTC'],
  'DevOps': ['AWS', 'GCP'],
  'AI/ML': ['AI Agents / MCP', 'LLMs (OpenAI, Anthropic, Vertex AI)', 'Langchain'],
  'Tools': ['MongoDB', 'MySQL / PostgreSQL', 'Git / GitHub', 'Firebase', 'Postman / Jest'],
};

export default function SkillsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="skills">
      <h2 className="page-title flex items-center justify-center gap-2">
        <BrainCogIcon color="#f472b6" size={28} />
        My Technical Skills
      </h2>

      <div className="skills-grid">
        {Object.entries(skills).map(([category, items]) => (
          <motion.div
            key={category}
            className="skill-category-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="category-title">{category}</h3>
            <div className="tech-pill-container">
              {items.map((skill, i) => (
                <motion.span
                  key={i}
                  className="tech-pill"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
