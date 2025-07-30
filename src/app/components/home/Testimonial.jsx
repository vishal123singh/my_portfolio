"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const testimonials = [
  {
    id: "testimonial-1",
    text: "This platform completely transformed how we manage our daily workflow. The user interface is clean and intuitive, and the customer support has been outstanding! Highly recommend it to any team looking to streamline their processes.",
    name: "Jessica Carter",
    avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "testimonial-2",
    text: "I've tried dozens of tools, but nothing comes close to this. It helped increase our team's productivity by over 40% in just a few weeks. The analytics features are a game changer, allowing us to make data-driven decisions quickly.",
    name: "Mark Thompson",
    avatar: "/images/testimonial1.jpg", //local images
  },
  {
    id: "testimonial-3",
    text: "I was skeptical at first, but this tool exceeded my expectations. Setup was fast, and we saw immediate benefits across the board.",
    name: "Priya Desai",
    avatar: "/images/testimonial3.jpg",
  },
  {
    id: "testimonial-4",
    text: "I was skeptical at first, but this tool exceeded my expectations. Setup was fast, and we saw immediate benefits across the board.",
    name: "Jean Desai",
    avatar: "", // Fallback to a default avatar if no image is provided
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Testimonial = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", updateCurrent);

    const interval = setInterval(() => {
      api.scrollNext();
    }, 10000); // Slide every 5 seconds

    return () => {
      api.off("select", updateCurrent);
      clearInterval(interval);
    };
  }, [api]);


  return (
    <section className="py-32">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-500 mb-8">
         What Our Clients Say
        </h1>

      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id}>
              <motion.div
                className="container flex flex-col items-center text-center"
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
              >
                <motion.p
                  className="mb-8 max-w-4xl font-medium md:px-8 "
                  variants={fadeUpVariant}
                  transition={{ delay: 0.1 }}
                >
                  &ldquo;{testimonial.text}&rdquo;
                </motion.p>
                <motion.div
                  className="mb-2"
                  variants={fadeUpVariant}
                  transition={{ delay: 0.2 }}
                >
                  {testimonial.avatar ? (
                    <Image 
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full border-4 shadow-md mb-2 object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full border-4 shadow-md mb-2 bg-gray-600 flex items-center justify-center text-xl font-semibold text-white">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                    </div>
                  )}

                </motion.div>
                <motion.p
                  className="mb-1 text-sm font-medium md:text-lg"
                  variants={fadeUpVariant}
                  transition={{ delay: 0.3 }}
                >
                  {testimonial.name}
                </motion.p>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="container flex justify-center py-16">
        {testimonials.map((testimonial, index) => (
          <Button
            key={testimonial.id}
            variant="ghost"
            size="sm"
            onClick={() => {
              api?.scrollTo(index);
            }}
          >
            <motion.div
              layout
              className={`size-2.5 rounded-full transition-all duration-300 ${
                index === current ? "bg-pink-400" : "bg-gray-300"
              }`}
            />
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
