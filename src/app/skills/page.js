'use client';

import { useEffect, useState } from 'react';
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

const getTooltipText = (skill) => {
  const map = {
    'React / React Native': 'Used in Kiddie Kredit, Logik, Deligo',
    'Next.js': 'Used in Earnings Call, Petlinx, Autoflow',
    'Angular': 'Used in SWIFI',
    'Electron.js': 'Desktop integration',
    'GraphQL': 'Used in Earnings Call',
    'Node.js': 'Used across all major backend projects',
    'AI Agents / MCP': 'Implemented in Koodums Chat',
    'MongoDB': 'Used in Petlinx, Logik',
    'Firebase': 'Used in Kiddie Kredit',
    'AWS': 'Used in Earnings Call, Deligo',
    'GCP': 'Used in Koodums Chat',
    'Tailwind CSS': 'Used for UI styling across projects',
  };
  return map[skill] || 'Used in multiple projects';
};

export default function SkillsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <section className="skills py-12 px-4 sm:px-8 max-w-6xl mx-auto">
      <h2 className="page-title flex items-center justify-center gap-2 text-3xl font-bold mb-8">
        <BrainCogIcon color="#f472b6" size={28} />
        My Technical Skills
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {['All', ...Object.keys(skills)].map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${activeFilter === category
              ? 'bg-pink-500 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="skills-grid grid gap-8 md:grid-cols-2">
        {Object.entries(skills)
          .filter(([category]) => activeFilter === 'All' || activeFilter === category)
          .map(([category, items]) => (
            <motion.div
              key={category}
              className="skill-category-card bg-slate-800 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="category-title text-xl font-semibold mb-4 text-pink-400">
                {category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {items.map((skill, i) => (
                  <motion.div
                    key={i}
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <span className="tech-pill px-4 py-1 bg-slate-700 text-slate-100 rounded-full text-sm cursor-default hover:bg-pink-500 transition">
                      {skill}
                    </span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 whitespace-nowrap pointer-events-none">
                      {getTooltipText(skill)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
}
