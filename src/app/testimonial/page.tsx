"use client";

import PageHeader from "@/components/shared/PageHeader";
import { Quote, ChevronLeft, ChevronRight, User } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { testimonials } from "@/data/testimonial";
import Link from "next/link";

function TestimonialAvatar({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  return (
    <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/20 bg-zinc-800 flex items-center justify-center">
      {!error ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="56px"
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <User className="h-8 w-8 text-primary/40" />
      )}
    </div>
  );
}

export default function TestimonialPage() {
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


  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Testimonials" subtitle="Reviews" backgroundImage="/images/safari_coffee_cup.jpg" />

      <section className="section-padding">
        <div className="container">
          <header className="text-center space-y-4 max-w-2xl mx-auto mb-20">
            <span className="font-nothing text-primary text-2xl">Testimony</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white">Our Happy Customers</h2>
            <p className="text-gray-400">
              Hear from our fellow explorers who have experienced the bold flavors of Safari Roast.
            </p>
          </header>

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
                        className="bg-zinc-900 p-8 relative space-y-6 group"
                      >
                        <Quote className="absolute top-8 right-8 h-12 w-12 text-primary/10 group-hover:text-primary transition-colors" />

                        <p className="text-gray-400 italic leading-relaxed relative z-10">
                          "{item.text}"
                        </p>

                        <div className="flex items-center space-x-4 pt-4">
                          <TestimonialAvatar src={item.image} alt={item.name} />
                          <div>
                            <h4 className="text-white font-bold uppercase tracking-widest text-sm">{item.name}</h4>
                            <span className="text-primary text-[10px] uppercase font-black">{item.role}</span>
                          </div>
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
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 hover:bg-primary hover:text-black transition-colors z-20"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 hover:bg-primary hover:text-black transition-colors z-20"
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
        </div>
      </section>

      {/* Google Review CTA */}
      <section className="py-20 bg-zinc-900 border-y border-primary/10">
        <div className="container text-center space-y-8">
          <header className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-widest text-white">Loved Your Experience?</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Your feedback helps us grow and keep providing the best Kenyan safari coffee experience. Share your story on Google!
            </p>
          </header>
          <Link
            href="https://share.google/x7XsqjOp6IkHnjofy"
            target="_blank"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Write a Google Review</span>
            <Quote className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Featured Quote Section */}
      <section className="py-24 bg-primary text-black">
        <div className="container text-center max-w-3xl space-y-6">
          <span className="uppercase text-xs font-black tracking-[0.4em]">Founder's Note</span>
          <h2 className="text-3xl font-black italic">"Our mission is to bring the spirit of the Kenyan safari to every cup of coffee we serve."</h2>
          <div className="h-1 w-20 bg-black mx-auto" />
          <p className="font-bold uppercase tracking-widest text-sm">— Safari Roast Team</p>
        </div>
      </section>
    </div>
  );
}
