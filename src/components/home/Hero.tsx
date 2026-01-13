"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/images/hero_kilimanjaro.jpg",
    subtitle: "The Source",
    title: "Forged in Volcanic Fire",
    highlight: "Volcanic Fire",
    description: "Grown in the nutrient-rich volcanic soil of the Great Rift Valley, our beans absorb the earth's raw power."
  },
  {
    id: 2,
    image: "/images/hero_manufacturing.jpg",
    subtitle: "The Process",
    title: "Mastery in Manufacturing",
    highlight: "Manufacturing",
    description: "From cherry selection to artisan roasting, we control every step to ensure distinct, explosive flavor profiles."
  },
  {
    id: 3,
    image: "/images/hero_farmer.jpg",
    subtitle: "The Promise",
    title: "Taste the Spirit of Kenya",
    highlight: "Spirit of Kenya",
    description: "Sharing the bold, untamed soul of African coffee with the world—directly from our home to yours."
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
      ))}

      {/* Content */}
      <div className="container relative z-10 h-full flex items-center justify-center pt-20">
        <div className="max-w-3xl text-center space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="font-great-vibes text-primary text-[30px] block">
                {slides[current].subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-[40px] font-normal leading-tight text-white uppercase tracking-wider">
                {slides[current].title.replace(slides[current].highlight, "")}
                <br />
                <span className="font-josefin font-bold lg:text-[50px]">
                  {slides[current].highlight}
                </span>
              </h1>
              <p className="text-gray-200 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                {slides[current].description}
              </p>

              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <Link href="/join" className="btn-primary">
                  Join the Expedition
                </Link>
                <Link href="/applications" className="btn-white-outline">
                  View Applications
                </Link>
              </div>
            </motion.div> 
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === current ? "bg-primary" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
