"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Package, ArrowLeft, Calendar, CreditCard, ShoppingBag, MapPin } from "lucide-react";
import { orderApi, Order } from "@/lib/api/order";
import { toast } from "sonner";
import { userApi, UserProfile } from "@/lib/api/user";

export default function CompanyOrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [orderData, userData] = await Promise.all([
                    orderApi.getOrderById(params.id as string),
                    userApi.getProfile()
                ]);

                setOrder(orderData);
                setUser(userData);
            } catch (error: any) {
                console.error("Error fetching order details:", error);
                toast.error(error.message || "Failed to load order details");
                // Redirect back to orders list if order not found or access denied
                if (error.message === 'Access denied' || error.message === 'Order not found') {
                    router.push('/account/company/orders');
                }
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchData();
        }
    }, [params.id, router]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "delivered":
                return "bg-green-900/20 text-green-400 border-green-900/30";
            case "processing":
                return "bg-amber-900/20 text-amber-400 border-amber-900/30";
            case "cancelled":
                return "bg-red-900/20 text-red-400 border-red-900/30";
            case "shipped":
                return "bg-blue-900/20 text-blue-400 border-blue-900/30";
            default:
                return "bg-stone-800 text-stone-400 border-stone-700";
        }
    };

    if (loading) {
        return (
            <div className="bg-black pt-6 pb-12 flex-1 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-[#c49b63] border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-stone-400">Loading order details...</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="bg-black pt-6 pb-12 flex-1 min-h-screen">
            <div className="container mx-auto px-4 lg:px-8 space-y-8">

                {/* Back Button */}
                <Link
                    href="/account/company/orders"
                    className="inline-flex items-center text-stone-400 hover:text-[#c49b63] transition-colors mb-4 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Orders
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">
                                Order #{order.id.slice(0, 8)}
                            </h1>
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium border",
                                getStatusColor(order.status)
                            )}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-stone-400 text-sm flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Placed on {formatDate(order.createdAt)}
                        </p>
                    </div>

                    <div className="flex flex-col items-end">
                        <p className="text-stone-400 text-sm mb-1">Total Amount</p>
                        <p className="text-3xl font-bold text-[#c49b63]">${order.total.toFixed(2)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#111] rounded-xl shadow-lg border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10 flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-[#c49b63]" />
                                <h2 className="text-lg font-bold text-white">Order Items</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-6">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-white/5 last:border-0 last:pb-0 first:pt-0">
                                            <div className="w-16 h-16 bg-zinc-900 rounded-lg flex items-center justify-center border border-white/10 overflow-hidden flex-shrink-0 relative">
                                                {item.product.image ? (
                                                    <Image
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <Package className="w-8 h-8 text-stone-600" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-white font-medium truncate pr-4">{item.product.name}</h3>
                                                <p className="text-sm text-stone-500 capitalize">{item.product.category}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0 w-full sm:w-auto flex sm:block justify-between items-center sm:space-y-1">
                                                <p className="text-stone-400 text-sm">Qty: {item.quantity}</p>
                                                <p className="text-[#c49b63] font-bold">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Payment Info */}
                        <div className="bg-[#111] rounded-xl shadow-lg border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-[#c49b63]" />
                                <h2 className="text-lg font-bold text-white">Payment Info</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-stone-400 text-sm">Payment Method</span>
                                    <span className="text-white font-medium capitalize">{order.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-stone-400 text-sm">Payment Status</span>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded text-xs font-medium",
                                        order.paymentStatus === "succeeded" ? "text-green-400 bg-green-900/20" : "text-amber-400 bg-amber-900/20"
                                    )}>
                                        {order.paymentStatus === "succeeded" ? "Paid" : order.paymentStatus}
                                    </span>
                                </div>
                                <div className="pt-4 border-t border-white/5 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-stone-400 text-sm">Subtotal</span>
                                        <span className="text-white">${order.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-stone-400 text-sm">Shipping</span>
                                        <span className="text-white">$0.00</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-white font-bold">Total</span>
                                        <span className="text-[#c49b63] font-bold text-lg">${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Info (Using User Profile Data as fallback since we don't store Snapshot address in Order model yet) */}
                        <div className="bg-[#111] rounded-xl shadow-lg border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[#c49b63]" />
                                <h2 className="text-lg font-bold text-white">Delivery To</h2>
                            </div>
                            <div className="p-6 text-stone-300 text-sm leading-relaxed">
                                {user ? (
                                    <>
                                        <p className="text-white font-medium mb-1">{user.name}</p>
                                        <p>{user.email}</p>
                                        <p>{user.phoneNumber}</p>
                                        <p className="mt-2">{user.country}</p>
                                    </>
                                ) : (
                                    <p className="text-stone-500 italic">Address information not available</p>
                                )}
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <p className="text-stone-500 text-xs">
                                        Note: This is the current account address. Actual delivery address used for this order might differ.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
