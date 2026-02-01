"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { paymentApi } from "@/lib/api/payment";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { clearCart } = useCartStore();
    const { user } = useAuthStore();
    const [paymentIntentId, setPaymentIntentId] = useState<string>("");
    const [isCreatingOrder, setIsCreatingOrder] = useState(true);
    const [orderCreated, setOrderCreated] = useState(false);
    const [orderError, setOrderError] = useState<string>("");

    useEffect(() => {
        const createOrder = async () => {
            const intentId = searchParams.get("payment_intent");

            if (!intentId) {
                setOrderError("No payment information found");
                setIsCreatingOrder(false);
                return;
            }

            setPaymentIntentId(intentId);

            try {
                // First, verify the payment was successful
                const paymentStatus = await paymentApi.getPaymentStatus(intentId);

                if (paymentStatus.status !== "succeeded") {
                    setOrderError("Payment was not successful");
                    setIsCreatingOrder(false);
                    return;
                }

                // Extract cart items from metadata
                const metadata = paymentStatus.metadata;
                const cartItems = metadata.items ? JSON.parse(metadata.items) : [];

                if (!cartItems || cartItems.length === 0) {
                    setOrderError("No items found in payment");
                    setIsCreatingOrder(false);
                    return;
                }

                // Create the order
                const orderData = {
                    paymentIntentId: intentId,
                    total: paymentStatus.amount / 100, // Convert from cents to dollars
                    items: cartItems.map((item: any) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    userId: user?.id || metadata.userId,
                };

                console.log("Creating order with data:", orderData);
                const order = await paymentApi.createOrder(orderData);
                console.log("Order created successfully:", order);

                setOrderCreated(true);

                // Clear the cart after successful order creation
                clearCart();
                toast.success("Order confirmed!");
            } catch (error: any) {
                console.error("Error creating order:", error);

                // Check if error is due to order already existing
                if (error.message?.includes("already exists") || error.message?.includes("Unique constraint")) {
                    // Order already exists, treat as success
                    console.log("Order already exists for this payment, showing success");
                    setOrderCreated(true);
                    clearCart();
                } else {
                    setOrderError(error.message || "Failed to create order");
                    toast.error("Failed to create order. Please contact support with your payment ID.");
                }
            } finally {
                setIsCreatingOrder(false);
            }
        };

        createOrder();
    }, [searchParams, clearCart, user]);

    if (isCreatingOrder) {
        return (
            <div className="bg-zinc-950 min-h-screen">
                <PageHeader title="Processing Order" subtitle="Please Wait" />
                <section className="section-padding container">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-zinc-900/50 p-10 border border-primary/10 text-center">
                            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Creating Your Order...
                            </h2>
                            <p className="text-gray-400">
                                Please wait while we process your order.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    if (orderError) {
        return (
            <div className="bg-zinc-950 min-h-screen">
                <PageHeader title="Order Error" subtitle="Error" />
                <section className="section-padding container">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-zinc-900/50 p-10 border border-primary/10 text-center">
                            <div className="text-6xl mb-4">❌</div>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Something Went Wrong
                            </h2>
                            <p className="text-gray-400 mb-6">{orderError}</p>

                            {paymentIntentId && (
                                <div className="bg-zinc-800/50 border border-gray-800 p-6 rounded mb-8">
                                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                                        Payment ID (save this for support)
                                    </p>
                                    <p className="text-white font-mono text-sm break-all">
                                        {paymentIntentId}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/shop" className="btn-primary inline-block text-center">
                                    Continue Shopping
                                </Link>
                                <Link
                                    href="/contact"
                                    className="border border-primary text-primary px-8 py-3 rounded hover:bg-primary hover:text-zinc-950 transition-colors font-bold uppercase tracking-widest text-sm"
                                >
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="bg-zinc-950 min-h-screen">
            <PageHeader title="Order Complete" subtitle="Success" />

            <section className="section-padding container">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-zinc-900/50 p-10 border border-primary/10 text-center">
                        <div className="mb-8">
                            <CheckCircle className="w-20 h-20 text-primary mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Thank You for Your Order!
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Your payment has been processed successfully and your order has been created.
                            </p>
                        </div>

                        {paymentIntentId && (
                            <div className="bg-zinc-800/50 border border-gray-800 p-6 rounded mb-8">
                                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                                    Payment ID
                                </p>
                                <p className="text-white font-mono text-sm break-all">
                                    {paymentIntentId}
                                </p>
                            </div>
                        )}

                        <div className="space-y-4 text-left mb-8">
                            <div className="border-t border-gray-800 pt-6">
                                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">
                                    What's Next?
                                </h3>
                                <ul className="space-y-3 text-gray-400">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">✓</span>
                                        <span>You will receive an order confirmation email shortly</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">✓</span>
                                        <span>We'll notify you when your order ships</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">✓</span>
                                        <span>Track your order status in your account</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/shop"
                                className="btn-primary inline-block text-center"
                            >
                                Continue Shopping
                            </Link>
                            <Link
                                href="/account/user/orders"
                                className="border border-primary text-primary px-8 py-3 rounded hover:bg-primary hover:text-zinc-950 transition-colors font-bold uppercase tracking-widest text-sm"
                            >
                                View Orders
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
