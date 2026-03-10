"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import PageHeader from "@/components/shared/PageHeader";
import PaymentForm from "@/components/checkout/PaymentForm";
import { AlertCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function RetryCheckoutContent() {
    const searchParams = useSearchParams();
    const clientSecret = searchParams.get("clientSecret");
    const orderId = searchParams.get("orderId");

    const stripePromise = getStripe();

    const handlePaymentSuccess = () => {
        toast.success("Payment successful! Redirecting...");
    };

    const handlePaymentError = (error: string) => {
        toast.error(error || "Payment failed. Please try again.");
    };

    // Guard: missing params
    if (!clientSecret || !orderId) {
        return (
            <section className="section-padding container">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-zinc-900/50 p-10 border border-red-500/20 text-center">
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-3">Invalid Payment Link</h2>
                        <p className="text-gray-400 mb-8">
                            This payment link is invalid or has expired. Please initiate a new retry from your orders page.
                        </p>
                        <Link
                            href="/account/user/orders"
                            className="btn-primary inline-block text-center"
                        >
                            Back to My Orders
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section-padding container">
            <div className="max-w-2xl mx-auto">
                {/* Order reference banner */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded p-4 mb-8 flex items-start gap-3">
                    <ShoppingBag className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-amber-400 text-sm font-medium">Retrying payment for existing order</p>
                        <p className="text-gray-500 text-xs mt-0.5">
                            Order #{orderId.slice(0, 8).toUpperCase()} · Your items are reserved — complete payment to confirm
                        </p>
                    </div>
                </div>

                <div className="bg-zinc-900/50 p-10 border border-primary/10">
                    <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-8 border-b border-gray-800 pb-6">
                        Complete Your Payment
                    </h3>

                    <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret,
                            appearance: {
                                theme: "night",
                                variables: {
                                    colorPrimary: "#d4af37",
                                    colorBackground: "#18181b",
                                    colorText: "#ffffff",
                                    colorDanger: "#ef4444",
                                    fontFamily: "system-ui, sans-serif",
                                    spacingUnit: "4px",
                                    borderRadius: "4px",
                                },
                            },
                        }}
                    >
                        <PaymentForm
                            amount={0} // Amount is locked in the intent; 0 hides the button label amount
                            onSuccess={handlePaymentSuccess}
                            onError={handlePaymentError}
                        />
                    </Elements>

                    <div className="mt-6 pt-6 border-t border-gray-800">
                        <p className="text-gray-500 text-xs text-center">
                            Your payment is secured by Stripe. No charges from your previous attempt were made.
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link
                        href="/account/user/orders"
                        className="text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                        ← Cancel and return to My Orders
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default function RetryCheckoutPage() {
    return (
        <div className="bg-zinc-950 min-h-screen">
            <PageHeader title="Complete Payment" subtitle="Retry" />
            <Suspense
                fallback={
                    <section className="section-padding container">
                        <div className="max-w-2xl mx-auto text-center py-20">
                            <div className="animate-spin text-4xl mb-4">⏳</div>
                            <p className="text-gray-400">Loading payment form...</p>
                        </div>
                    </section>
                }
            >
                <RetryCheckoutContent />
            </Suspense>
        </div>
    );
}
