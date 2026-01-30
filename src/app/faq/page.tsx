"use client";

import PageHeader from "@/components/shared/PageHeader";
import { ChevronDown, Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs, FAQQuestion } from "@/data/faqs-data";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
    searchQuery?: string;
}

function highlightText(text: string, query: string) {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
        regex.test(part) ? (
            <mark key={index} className="bg-primary/30 text-white px-0.5 rounded">
                {part}
            </mark>
        ) : (
            part
        )
    );
}

function FAQItem({ question, answer, isOpen, onClick, searchQuery = "" }: FAQItemProps) {
    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className="text-white font-semibold text-lg pr-4 group-hover:text-primary transition-colors">
                    {highlightText(question, searchQuery)}
                </span>
                <ChevronDown
                    className={`h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-400 pb-6 leading-relaxed">
                            {highlightText(answer, searchQuery)}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQPage() {
    const [openItems, setOpenItems] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleItem = (id: string) => {
        setOpenItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Filter FAQs based on search query
    const filteredFaqs = useMemo(() => {
        if (!searchQuery.trim()) return faqs;

        const query = searchQuery.toLowerCase();

        return faqs
            .map((category) => ({
                ...category,
                questions: category.questions.filter(
                    (item) =>
                        item.question.toLowerCase().includes(query) ||
                        item.answer.toLowerCase().includes(query)
                ),
            }))
            .filter((category) => category.questions.length > 0);
    }, [searchQuery]);

    // Count total matching questions
    const totalMatches = useMemo(() => {
        return filteredFaqs.reduce((acc, cat) => acc + cat.questions.length, 0);
    }, [filteredFaqs]);

    const totalQuestions = useMemo(() => {
        return faqs.reduce((acc, cat) => acc + cat.questions.length, 0);
    }, []);

    const clearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="bg-zinc-950 min-h-screen">
            <PageHeader
                title="FAQs"
                subtitle="Questions & Answers"
                backgroundImage="/images/safari_coffee_cup.jpg"
            />

            <section className="section-padding">
                <div className="container">
                    <header className="text-center space-y-4 max-w-2xl mx-auto mb-10">
                        <span className="font-nothing text-primary text-2xl">Help Center</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-400">
                            Find answers to common questions about our coffee, ordering, brewing, and more.
                        </p>
                    </header>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for questions..."
                                className="w-full bg-zinc-900 border border-white/10 rounded-none py-4 pl-12 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                        {searchQuery && (
                            <p className="text-gray-500 text-sm mt-3 text-center">
                                Found <span className="text-primary font-semibold">{totalMatches}</span> of{" "}
                                {totalQuestions} questions matching &quot;{searchQuery}&quot;
                            </p>
                        )}
                    </div>

                    {/* FAQ Categories */}
                    <div className="max-w-4xl mx-auto space-y-12">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="bg-zinc-900 p-8 md:p-10">
                                    <h3 className="text-primary uppercase text-sm font-black tracking-[0.2em] mb-6">
                                        {category.category}
                                    </h3>
                                    <div>
                                        {category.questions.map((item, itemIndex) => {
                                            const itemId = `${categoryIndex}-${itemIndex}`;
                                            return (
                                                <FAQItem
                                                    key={itemId}
                                                    question={item.question}
                                                    answer={item.answer}
                                                    isOpen={openItems.includes(itemId)}
                                                    onClick={() => toggleItem(itemId)}
                                                    searchQuery={searchQuery}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-gray-500 text-6xl mb-4">🔍</div>
                                <h3 className="text-white text-xl font-bold mb-2">No results found</h3>
                                <p className="text-gray-400 mb-6">
                                    We couldn&apos;t find any questions matching &quot;{searchQuery}&quot;
                                </p>
                                <button
                                    onClick={clearSearch}
                                    className="text-primary hover:text-primary/80 underline transition-colors"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary text-black">
                <div className="container text-center max-w-3xl space-y-6">
                    <span className="uppercase text-xs font-black tracking-[0.4em]">Still Have Questions?</span>
                    <h2 className="text-3xl font-black">We&apos;re Here to Help</h2>
                    <p className="text-black/70">
                        Can&apos;t find the answer you&apos;re looking for? Our team is ready to assist you.
                    </p>
                    <div className="pt-4">
                        <a
                            href="/contact"
                            className="inline-block bg-black text-white px-8 py-4 uppercase text-sm font-black tracking-widest hover:bg-zinc-800 transition-colors"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
