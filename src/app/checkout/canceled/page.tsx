"use client";

import PageHeader from "@/components/shared/PageHeader";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutCanceledPage() {
    return (
        <div className="bg-zinc-950 min-h-screen">
            <PageHeader title="Payment Canceled" subtitle="Checkout" />

            <section className="section-padding container">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-zinc-900/50 p-10 border border-primary/10 text-center">
                        <div className="mb-8">
                            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Payment Canceled
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Your payment was canceled and no charges were made.
                            </p>
                        </div>

                        <div className="bg-zinc-800/50 border border-gray-800 p-6 rounded mb-8">
                            <p className="text-gray-400 text-sm leading-relaxed">
                                If you experienced any issues during checkout, please don't hesitate
                                to contact our support team. We're here to help!
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/cart"
                                className="btn-primary inline-block text-center"
                            >
                                Return to Cart
                            </Link>
                            <Link
                                href="/shop"
                                className="border border-primary text-primary px-8 py-3 rounded hover:bg-primary hover:text-zinc-950 transition-colors font-bold uppercase tracking-widest text-sm"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
