'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ExternalLink, Eye } from 'lucide-react';

export default function ProjectCard({
  title,
  description,
  link,
  images = [],
  tags = [],
  displayImage = null,
  contributions = [],
}) {
  const [open, setOpen] = useState(false);
  const [currentContribution, setCurrentContribution] = useState(0);
  const swiperRef = useRef(null);

  // Contributions carousel
  useEffect(() => {
    if (contributions.length > 1) {
      const interval = setInterval(() => {
        setCurrentContribution((prev) => (prev + 1) % contributions.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [contributions]);

  return (
    <>
      <motion.div
        className="project-card"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        onMouseEnter={() => swiperRef.current?.autoplay?.start()}
        onMouseLeave={() => swiperRef.current?.autoplay?.stop()}
      >
        <div className="project-image-wrapper">
          {/* {images.length > 1 ? (
            <Swiper
              modules={[Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                swiper.autoplay?.stop(); // 🔐 Ensure autoplay doesn't start on load
              }}
              loop
              className="swiper-preview"
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="slide-image">
                    <Image
                      src={src}
                      alt={`Slide ${idx + 1}`}
                      fill
                      sizes="100%"
                      style={{ objectFit: 'cover', borderRadius: '1rem' }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

          ) : displayImage ? (
            <div className="slide-image">
              <Image
                src={displayImage}
                alt={title}
                fill
                sizes="100%"
                style={{
                  objectFit: 'cover',
                  borderTopLeftRadius: '1rem',
                  borderTopRightRadius: '1rem',
                }}
              />
            </div>
          ) : (
            <div className="project-image-placeholder">No Image</div>
          )} */}



          {displayImage ? (
            <div className="slide-image">
              <Image
                src={displayImage}
                alt={title}
                fill
                sizes="100%"
                style={{
                  objectFit: displayImage.includes('kk') || displayImage.includes('logik') ? 'cover' : 'cover',
                  borderTopLeftRadius: '1rem',
                  borderTopRightRadius: '1rem',
                }}
              />
            </div>
          ) : (
            <div className="project-image-placeholder">No Image</div>
          )}
        </div>

        <div className="project-details">
          <h3>{title}</h3>
          <p>{description}</p>

          {/* 👇 Contribution Carousel */}
          {contributions.length > 0 && (
            <div className="contribution-carousel">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentContribution}
                  className="contribution-slide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  • {contributions[currentContribution]}
                </motion.p>
              </AnimatePresence>
            </div>
          )}

          <div className="tag-container">
            {tags.map((tag, i) => (
              <span key={i} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="project-actions">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <ExternalLink size={18} /> View
              </a>
            )}
            {images.length > 1 && (
              <button
                onClick={() => setOpen(true)}
                className="project-link"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Eye size={18} /> Preview
              </button>
            )}
          </div>

        </div>
      </motion.div>

      {/* 🔍 Modal Preview */}
      {open && (
        <div
          className="modal-backdrop"
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '2rem',
          }}
        >
          {/* ✖ Close button at top-right of modal wrapper */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: '#00f7ff',
              color: '#0f172a',
              border: 'none',
              borderRadius: '50%',
              width: '2.25rem',
              height: '2.25rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem',
              boxShadow: '0 0 8px rgba(0, 247, 255, 0.3)',
              zIndex: 10000,
            }}
          >
            ✖
          </button>

          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#1e293b',
              padding: '1.5rem',
              borderRadius: '1rem',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            {images.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`Preview ${i + 1}`}
                width={800}
                height={500}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  maxWidth: '700px',
                  maxHeight: '80vh',
                  height: 'auto',
                  marginBottom: '1rem',
                  borderRadius: '0.75rem',
                  display: 'block',
                  marginInline: 'auto',
                }}
              />

            ))}
          </div>
        </div>
      )}

    </>
  );
}
