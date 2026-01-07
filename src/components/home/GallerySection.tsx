"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const images = [
  "/images/gallery_roasting.jpg",
  "/images/gallery_sacks.jpg",
  "/images/gallery_cupping.jpg",
  "/images/gallery_green_beans.jpg",
];

export default function GallerySection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {images.map((img, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative h-64 md:h-80 w-full group overflow-hidden bg-black"
        >
          <Image 
            src={img} 
            alt={`Gallery ${index + 1}`} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Search className="text-white h-8 w-8" />
          </div>
        </motion.div>
      ))}
    </section>
  );
}
