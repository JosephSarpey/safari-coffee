"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ShoppingBag, FileText, HelpCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/faqs-data";
import { products } from "@/data/products";

interface SearchResult {
    type: "product" | "blog" | "faq" | "page";
    title: string;
    description?: string;
    href: string;
}

// Static pages to search
const staticPages: SearchResult[] = [
    { type: "page", title: "About Us", description: "Learn about Safari Roast's story and mission", href: "/about" },
    { type: "page", title: "Shop", description: "Browse our premium coffee collection", href: "/shop" },
    { type: "page", title: "Blog", description: "Coffee insights, tips, and news", href: "/blog" },
    { type: "page", title: "Contact", description: "Get in touch with our team", href: "/contact" },
    { type: "page", title: "Services", description: "Our B2B services and capabilities", href: "/service" },
    { type: "page", title: "Applications", description: "Coffee bean applications", href: "/applications" },
    { type: "page", title: "Testimonials", description: "What our customers say", href: "/testimonial" },
    { type: "page", title: "FAQs", description: "Frequently asked questions", href: "/faq" },
    { type: "page", title: "Bulk Purchase", description: "Wholesale and bulk ordering", href: "/bulk-purchase" },
];

// Convert products to search results
const productResults: SearchResult[] = products.map((product) => ({
    type: "product" as const,
    title: product.name,
    description: `${product.roast} Roast - ${product.description.slice(0, 60)}...`,
    href: `/shop/${product.id}`,
}));

// Convert FAQs to search results
const faqResults: SearchResult[] = faqs.flatMap((category) =>
    category.questions.map((q) => ({
        type: "faq" as const,
        title: q.question,
        description: q.answer.slice(0, 100) + "...",
        href: "/faq",
    }))
);

export default function NavbarSearch() {
    const [query, setQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Focus input when expanded
    useEffect(() => {
        if (isExpanded && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isExpanded]);

    // Search logic
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        const searchTerm = query.toLowerCase();

        const timeout = setTimeout(() => {
            // Search products first (highest priority)
            const productMatches = productResults.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchTerm) ||
                    product.description?.toLowerCase().includes(searchTerm)
            );

            const pageMatches = staticPages.filter(
                (page) =>
                    page.title.toLowerCase().includes(searchTerm) ||
                    page.description?.toLowerCase().includes(searchTerm)
            );

            const faqMatches = faqResults
                .filter(
                    (faq) =>
                        faq.title.toLowerCase().includes(searchTerm) ||
                        faq.description?.toLowerCase().includes(searchTerm)
                )
                .slice(0, 3);

            setResults([...productMatches, ...pageMatches, ...faqMatches]);
            setIsLoading(false);
        }, 150);

        return () => clearTimeout(timeout);
    }, [query]);

    const handleSelect = (result: SearchResult) => {
        router.push(result.href);
        setQuery("");
        setIsExpanded(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsExpanded(false);
            setQuery("");
        }
        if (e.key === "Enter" && results.length > 0) {
            handleSelect(results[0]);
        }
    };

    const getIcon = (type: SearchResult["type"]) => {
        switch (type) {
            case "product":
                return <ShoppingBag className="h-4 w-4" />;
            case "blog":
                return <FileText className="h-4 w-4" />;
            case "faq":
                return <HelpCircle className="h-4 w-4" />;
            default:
                return <ArrowRight className="h-4 w-4" />;
        }
    };

    const closeSearch = () => {
        setQuery("");
        setIsExpanded(false);
    };

    return (
        <>
            {/* Search Icon */}
            <button
                onClick={() => setIsExpanded(true)}
                className="text-white hover:text-primary transition-colors p-2"
                aria-label="Search"
            >
                <Search className="h-5 w-5" />
            </button>

            {/* Search Overlay */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-[60] flex flex-col"
                    >
                        {/* Search Header */}
                        <div className="container py-6 lg:py-8 lg:max-w-2xl lg:mx-auto">
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Search products, FAQs, pages..."
                                        className="w-full bg-zinc-900 border border-white/20 rounded-full py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-all"
                                    />
                                </div>
                                <button
                                    onClick={closeSearch}
                                    className="text-white hover:text-primary transition-colors p-2"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        {/* Search Results */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="container lg:max-w-2xl lg:mx-auto">
                                {query.trim() ? (
                                    <>
                                        {isLoading ? (
                                            <div className="py-8 text-center text-gray-400">
                                                <div className="animate-pulse">Searching...</div>
                                            </div>
                                        ) : results.length > 0 ? (
                                            <div className="space-y-2">
                                                {results.map((result, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleSelect(result)}
                                                        className="w-full p-4 flex items-start gap-4 bg-zinc-900 hover:bg-zinc-800 transition-colors text-left rounded-lg"
                                                    >
                                                        <span className="text-primary mt-1">{getIcon(result.type)}</span>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-white font-medium">
                                                                {result.title}
                                                            </div>
                                                            {result.description && (
                                                                <div className="text-gray-500 text-sm mt-1 line-clamp-2">
                                                                    {result.description}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className="text-[10px] uppercase tracking-wider text-gray-600 bg-white/10 px-2 py-1 rounded">
                                                            {result.type}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-8 text-center text-gray-400">
                                                <p>No results for &quot;{query}&quot;</p>
                                                <button
                                                    onClick={() => {
                                                        router.push(`/faq?search=${encodeURIComponent(query)}`);
                                                        closeSearch();
                                                    }}
                                                    className="text-primary text-sm mt-3 hover:underline"
                                                >
                                                    Try searching in FAQs →
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="py-12 text-center text-gray-500">
                                        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>Start typing to search</p>
                                        <p className="text-xs mt-2 text-gray-600">Press ESC to close</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
