"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function SwiperGallery({ images }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="w-full"
      >
        {images.map((src, i) => {
          const isMobileImage = /kk|deligo|logik|oflep/i.test(src);

          return (
            <SwiperSlide key={i}>
              <div className="relative aspect-[16/9] w-full">
                {/* Background */}
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover blur-xl scale-110 opacity-30"
                  priority={i === 0}
                />

                {/* Foreground */}
                {isMobileImage ? (
                  /* 📱 Mobile Presentation */
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="relative h-[85%] aspect-[9/19] rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-black">
                      <Image
                        src={src}
                        alt={`Mobile screenshot ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
                    <div className="relative w-full max-w-[1400px] h-[85%] rounded-xl overflow-hidden shadow-2xl bg-black/40 backdrop-blur-md border border-white/10">
                      <Image
                        src={src}
                        alt={`Web screenshot ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 1400px"
                        className="object-contain"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
