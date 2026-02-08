"use client";

import { Quote, ChevronLeft, ChevronRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { testimonials as allTestimonials } from "@/data/testimonial";

const testimonials = allTestimonials.slice(0, 6);

function TestimonialAvatar({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  return (
    <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors bg-zinc-800 flex items-center justify-center">
      {!error ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="64px"
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <User className="h-10 w-10 text-primary/40" />
      )}
    </div>
  );
}

export default function TestimonialPreview() {
  const [current, setCurrent] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerView);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  return (
    <section className="section-padding bg-zinc-950 relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 pointer-events-none -skew-x-12 translate-x-1/4" />

      <div className="container relative z-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-great-vibes text-primary text-3xl"
          >
            Testimony
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white"
          >
            Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-light"
          >
            Hear what our partners and clients have to say about the distinct quality and flavor of our beans.
          </motion.p>
        </div>

        <div className="relative group/carousel">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${current * 100}%` }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                  {testimonials.slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView).map((item, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900/50 border border-primary/5 p-8 relative space-y-6 group hover:border-primary/20 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <TestimonialAvatar src={item.image} alt={item.name} />
                        <Quote className="h-8 w-8 text-primary/20 group-hover:text-primary transition-colors" />
                      </div>

                      <p className="text-gray-400 italic text-sm leading-relaxed relative z-10">
                        "{item.text}"
                      </p>

                      <div className="pt-4 border-t border-primary/10">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">{item.name}</h4>
                        <span className="text-primary text-[10px] uppercase font-bold tracking-wider">{item.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 hover:bg-primary hover:text-black transition-colors z-20"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 hover:bg-primary hover:text-black transition-colors z-20"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 w-2 rounded-full transition-colors ${current === idx ? "bg-primary" : "bg-white/20 hover:bg-white/40"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <Link href="/testimonial" className="btn-primary">
            View All Testimonials
          </Link>
          <Link href="https://share.google/x7XsqjOp6IkHnjofy" target="_blank" className="px-8 py-3 border border-primary text-primary uppercase tracking-[0.2em] text-sm hover:bg-primary hover:text-white transition-all duration-300">
            Share Your Story
          </Link>
        </div>
      </div>
    </section>
  );
}
