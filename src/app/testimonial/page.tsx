"use client";

import PageHeader from "@/components/shared/PageHeader";
import { Quote } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Roger Scott",
    role: "Marketing Manager",
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    image: "/images/person_1.jpg"
  },
  {
    name: "Roger Scott",
    role: "Marketing Manager",
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    image: "/images/person_2.jpg"
  },
  {
    name: "Roger Scott",
    role: "Marketing Manager",
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    image: "/images/person_3.jpg"
  },
  {
    name: "Roger Scott",
    role: "Marketing Manager",
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    image: "/images/person_4.jpg"
  },
  {
    name: "Roger Scott",
    role: "Marketing Manager",
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    image: "/images/person_1.jpg"
  },
  {
    name: "Roger Scott",
    role: "Marketing Manager",
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    image: "/images/person_2.jpg"
  }
];

export default function TestimonialPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Testimonials" subtitle="Reviews" backgroundImage="/images/gallery-2.jpg" />
      
      <section className="section-padding">
        <div className="container">
          <header className="text-center space-y-4 max-w-2xl mx-auto mb-20">
            <span className="font-nothing text-primary text-2xl">Testimony</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white">Our Happy Customers</h2>
            <p className="text-gray-400">
              Hear from our fellow explorers who have experienced the bold flavors of Safari Roast.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900 p-8 relative space-y-6 group"
              >
                <Quote className="absolute top-8 right-8 h-12 w-12 text-primary/10 group-hover:text-primary transition-colors" />
                
                <p className="text-gray-400 italic leading-relaxed relative z-10">
                  "{item.text}"
                </p>

                <div className="flex items-center space-x-4 pt-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-sm">{item.name}</h4>
                    <span className="text-primary text-[10px] uppercase font-black">{item.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
