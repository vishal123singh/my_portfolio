'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
  return (
    <section className="contact-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Me
      </motion.h2>

      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Let’s connect — I’m open to freelance, full-time roles, or collaborations!
      </motion.p>

      <motion.div
        className="contact-grid"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          },
          hidden: {}
        }}
      >
        {[
          {
            icon: <FaEnvelope size={24} />,
            text: 'bs08081996@gmail.com',
            href: 'mailto:bs08081996@gmail.com'
          },
          {
            icon: <FaGithub size={24} />,
            text: 'vishal-singh-jaiinfoway',
            href: 'https://github.com/vishal-singh-jaiinfoway'
          },
          {
            icon: <FaLinkedin size={24} />,
            text: 'Vishal Singh',
            href: 'https://linkedin.com/in/vishal-singh-b57b7b109'
          }
        ].map((item, idx) => (
          <motion.a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {item.icon}
            <span>{item.text}</span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
