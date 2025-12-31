"use client";

import PageHeader from "@/components/shared/PageHeader";
import { blogPosts } from "@/data/blog-posts";
import { Calendar, MessageCircle, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Read our Blog" subtitle="Blog" />
      
      <section className="section-padding container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
                <article key={post.id} className="group">
                    <Link href={`/blog/${post.id}`} className="block relative h-64 w-full overflow-hidden mb-6">
                        <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </Link>
                    
                    <div className="space-y-3">
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
                </article>
            ))}
        </div>
        
        {/* Pagination (Static) */}
        <div className="flex justify-center mt-16 space-x-2">
            <button className="h-10 w-10 rounded-full bg-primary text-black font-bold flex items-center justify-center">1</button>
            <button className="h-10 w-10 rounded-full bg-transparent border border-white/10 text-white hover:bg-white/10 flex items-center justify-center transition-colors">2</button>
            <button className="h-10 w-10 rounded-full bg-transparent border border-white/10 text-white hover:bg-white/10 flex items-center justify-center transition-colors">3</button>
            <button className="h-10 w-10 rounded-full bg-transparent border border-white/10 text-white hover:bg-white/10 flex items-center justify-center transition-colors">4</button>
            <button className="h-10 w-10 rounded-full bg-transparent border border-white/10 text-white hover:bg-white/10 flex items-center justify-center transition-colors">5</button>
        </div>
      </section>
    </div>
  );
}
