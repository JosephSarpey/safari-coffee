"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, MessageCircle } from "lucide-react";

import { blogPosts } from "@/data/blog-posts";

const recentPosts = blogPosts.slice(0, 3);

export default function BlogPreview() {
  return (
    <section className="section-padding bg-black relative">
        <div className="container">
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-great-vibes text-primary text-3xl"
                >
                    Knowledge
                </motion.span>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white"
                >
                    Industry Insights
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 font-light"
                >
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recentPosts.map((post, index) => (
                    <motion.div 
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="group"
                    >
                        <Link href={`/blog/${post.id}`} className="block relative h-64 w-full overflow-hidden">
                             <Image 
                                src={post.image} 
                                alt={post.title} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 33vw"
                             />
                        </Link>
                        
                        <div className="pt-6 space-y-3">
                             <div className="flex items-center space-x-4 text-xs text-gray-400 uppercase tracking-widest font-bold">
                                 <div className="flex items-center gap-1">
                                     <Calendar className="h-3 w-3 text-primary" />
                                     <span>{post.date}</span>
                                 </div>
                                 <div className="flex items-center gap-1">
                                     <User className="h-3 w-3 text-primary" />
                                     <span>{post.author}</span>
                                 </div>
                                 <div className="flex items-center gap-1 group-hover:text-primary transition-colors">
                                     <MessageCircle className="h-3 w-3" />
                                     <span>{post.comments}</span>
                                 </div>
                             </div>

                             <h3 className="text-xl font-bold uppercase tracking-wide">
                                 <Link href={`/blog/${post.id}`} className="text-white hover:text-primary transition-colors">
                                    {post.title}
                                 </Link>
                             </h3>
                             
                             <p className="text-gray-500 text-sm leading-relaxed">
                                 {post.excerpt}
                             </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
}
