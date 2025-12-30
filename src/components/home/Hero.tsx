"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110" 
        style={{ backgroundImage: "url('/images/bg_1.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="container relative z-10 h-full flex items-center justify-center pt-20">
        <div className="max-w-3xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="font-great-vibes text-primary text-[30px] block">
              Welcome
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[40px] font-normal leading-tight text-white uppercase tracking-wider">
              The Best Coffee <br />
              <span className="font-josefin font-bold lg:text-[50px]">Testing Experience</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              A small river named Duden flows by their place and supplies it with the necessary regelialia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Link href="/menu" className="btn-primary">
              Order Now
            </Link>
            <Link href="/menu" className="btn-white-outline">
              View Menu
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}
