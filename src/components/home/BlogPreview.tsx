"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, MessageCircle } from "lucide-react";

import { BlogPost } from "@/data/blog-posts";
import { contentApi } from "@/lib/api/content";

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function BlogPreview() {
    const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const blogs = await contentApi.getBlogs();
                setRecentPosts(blogs.slice(0, 3));
            } catch (err: any) {
                console.error("Failed to fetch blog posts:", err);
                setError(err.message || "Failed to load blog posts");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <section className="section-padding bg-black relative">
                <div className="container">
                    <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
                        <span className="font-great-vibes text-primary text-3xl">Knowledge</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white">Industry Insights</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-64 bg-gray-800 rounded"></div>
                                <div className="pt-6 space-y-3">
                                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                                    <div className="h-6 bg-gray-800 rounded w-full"></div>
                                    <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="section-padding bg-black relative">
                <div className="container text-center">
                    <p className="text-red-500">{error}</p>
                </div>
            </section>
        );
    }

    if (recentPosts.length === 0) {
        return null;
    }
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
                        Stay updated with the latest trends and insights in the coffee industry.
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
                                        <span>{formatDate(post.date)}</span>
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
