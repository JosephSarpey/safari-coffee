"use client";

import PageHeader from "@/components/shared/PageHeader";
import { contentApi } from "@/lib/api/content";
import { BlogPost } from "@/data/blog-posts";
import { Calendar, MessageCircle, User, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await contentApi.getBlogs();
                setPosts(data);
            } catch (error) {
                toast.error("Failed to load blog posts");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="bg-zinc-950 min-h-screen">
            <PageHeader title="Read our Blog" subtitle="Blog" />

            <section className="section-padding container">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <article key={post.id} className="group">
                                    <Link href={`/blog/${post.id}`} className="block relative h-64 w-full overflow-hidden mb-6">
                                        <Image
                                            src={post.image || '/images/placeholder.jpg'}
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
                                                <span>{new Date(post.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="h-3 w-3 text-primary" />
                                                <span>{post.author}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold uppercase tracking-wide">
                                            <Link href={`/blog/${post.id}`} className="text-white hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </Link>
                                        </h3>

                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {posts.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                No blog posts found.
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}
