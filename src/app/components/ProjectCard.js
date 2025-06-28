'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

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
                  objectFit: 'cover',
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
              >
                🔗 View
              </a>
            )}
            {images.length > 1 && (
              <button onClick={() => setOpen(true)} className="project-link">
                👁️ Preview
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* 🔍 Modal Preview */}
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {images.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`Preview ${i + 1}`}
                width={300}
                height={350}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: 'auto',
                  marginBottom: '1rem',
                  borderRadius: '0.75rem',
                }}
              />
            ))}
            <button onClick={() => setOpen(false)} className="close-btn">
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
}
