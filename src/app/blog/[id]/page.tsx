"use client";

import PageHeader from "@/components/shared/PageHeader";
import { contentApi } from "@/lib/api/content";
import { BlogPost } from "@/data/blog-posts";
import { Calendar, User, Search, Tag, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BlogDetailPage() {
    const params = useParams();

    const id = params.id as string;

    const [post, setPost] = useState<BlogPost | null>(null);
    const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch the specific post
                const [postData, allPosts] = await Promise.all([
                    contentApi.getBlog(id).catch(() => null),
                    contentApi.getBlogs().catch(() => [])
                ]);

                if (!postData) {
                    // handle not found in render or redirect
                    setPost(null);
                } else {
                    setPost(postData);
                    // Filter recent posts: exclude current one, take top 3
                    const otherPosts = allPosts.filter(p => String(p.id) !== id).slice(0, 3);
                    setRecentPosts(otherPosts);
                }

            } catch (error) {
                console.error("Failed to fetch blog details", error);
                toast.error("Failed to load blog details");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="bg-zinc-950 min-h-screen">
                <PageHeader title="Loading..." subtitle="Blog Details" />
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </div>
        );
    }

    if (!post) {
        return notFound();
    }

    return (
        <div className="bg-zinc-950 min-h-screen">
            <PageHeader title={post.title} subtitle="Blog Details" />

            <section className="section-padding container">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative h-[400px] w-full overflow-hidden">
                            <Image src={post.image || '/images/placeholder.jpg'} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-wide text-white">{post.title}</h2>

                        <div className="flex items-center space-x-4 text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-white/10 pb-8">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" />
                                <span>{post.author}</span>
                            </div>

                        </div>

                        <div
                            className="prose prose-invert prose-lg max-w-none text-gray-400 font-light leading-relaxed prose-p:mb-6 prose-headings:text-white prose-headings:uppercase prose-headings:tracking-widest"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <div className="pt-8 border-t border-white/10 flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-4 py-1 border border-white/10 text-gray-400 text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors cursor-pointer">
                                    {tag}
                                </span>
                            ))}
                        </div>



                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-12 h-fit sticky top-32">
                        {/* Search */}
                        <div className="relative">
                            <input type="text" placeholder="Search..." className="w-full bg-transparent border border-white/10 p-4 pr-12 text-white focus:border-primary outline-none transition-colors placeholder:text-gray-500" />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                        </div>

                        {/* Categories */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold uppercase tracking-widest text-white">Categories</h3>
                            <ul className="space-y-2">
                                {["Coffee", "Drinks", "Food", "Places", "Uncategorized"].map(cat => (
                                    <li key={cat}>
                                        <a href="#" className="flex justify-between text-gray-400 hover:text-primary transition-colors py-2 border-b border-white/5 text-sm uppercase tracking-wider">
                                            <span>{cat}</span>
                                            <span className="text-white/30">(12)</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recent Blog */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold uppercase tracking-widest text-white">Recent Blog</h3>
                            <div className="space-y-6">
                                {recentPosts.map(post => (
                                    <div key={post.id} className="flex gap-4 group cursor-pointer">
                                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden">
                                            <Image src={post.image || '/images/placeholder.jpg'} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="80px" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-white font-bold uppercase tracking-widest text-sm leading-tight group-hover:text-primary transition-colors">
                                                <Link href={`/blog/${post.id}`}>{post.title}</Link>
                                            </h4>
                                            <div className="flex items-center gap-4 text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{new Date(post.date).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    <span>{post.author}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tag Cloud */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold uppercase tracking-widest text-white">Tag Cloud</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Dish", "Menu", "Food", "Sweet", "Tasty", "Delicious", "Desserts", "Drinks"].map(tag => (
                                    <a key={tag} href="#" className="px-3 py-1 border border-white/10 text-gray-400 text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary transition-colors">
                                        {tag}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Paragraph */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold uppercase tracking-widest text-white">Paragraph</h3>
                            <p className="text-gray-400 font-light text-sm leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos fugit cupiditate numquam!
                            </p>
                        </div>

                    </aside>
                </div>
            </section>
        </div>
    );
}
