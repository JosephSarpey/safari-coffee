"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="bg-primary/5 section-padding relative">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Content */}
          <div className="bg-primary p-8 md:p-12 flex flex-col justify-center">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-8"
             >
                <div className="space-y-4">
                    <span className="font-great-vibes text-black/60 text-3xl">Get In Touch</span>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-black mb-8">Partner With Us</h2>
                    <p className="text-black/70 leading-relaxed max-w-md font-light">
                        Interested in wholesale opportunities, white labeling, or have a general inquiry? 
                        We would love to discuss how we can bring the true taste of Kenya to your business.
                    </p>
                </div>
                
                <div>
                     <Link 
                        href="/contact" 
                        className="inline-block bg-black text-white px-8 py-4 uppercase font-bold text-sm tracking-widest hover:bg-zinc-900 transition-colors"
                     >
                        Contact Us
                     </Link>
                </div>
             </motion.div>
          </div>

          {/* Image Side */}
          <div className="hidden lg:block relative min-h-[500px]">
             <div 
                className="absolute inset-0 bg-cover bg-center h-full w-full"
                style={{ backgroundImage: "url('/images/bg_1.jpg')" }}
             >
                 <div className="absolute inset-0 bg-black/20" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
