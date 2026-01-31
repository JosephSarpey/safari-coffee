"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";
import { orderApi, Order } from "@/lib/api/order";
import { toast } from "sonner";

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const userOrders = await orderApi.getUserOrders();
        setOrders(userOrders);
      } catch (error: any) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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

  return (
    <div className="bg-black pt-6 pb-12 flex-1">
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white">My Orders</h1>
            <p className="text-stone-400 mt-1">View and manage your order history</p>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-[#111] rounded-xl shadow-lg border border-white/10 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-[#c49b63] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-stone-400">Loading your orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-stone-300">
                  <thead>
                    <tr className="border-b border-white/10 text-stone-500 text-sm">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Items</th>
                      <th className="pb-3 font-medium">Total</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Payment</th>
                      <th className="pb-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4 font-medium text-white">
                          #{order.id.slice(0, 8)}
                        </td>
                        <td className="py-4 text-stone-400">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="py-4 text-stone-400 max-w-xs">
                          <div className="truncate">
                            {order.items.map((item) => item.product.name).join(", ")}
                          </div>
                          <div className="text-xs text-stone-500">
                            {order.items.length} item{order.items.length > 1 ? "s" : ""}
                          </div>
                        </td>
                        <td className="py-4 font-medium text-[#c49b63]">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="py-4">
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium border",
                              getStatusColor(order.status)
                            )}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              order.paymentStatus === "succeeded"
                                ? "text-green-400"
                                : "text-amber-400"
                            )}
                          >
                            {order.paymentStatus === "succeeded" ? "Paid" : order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <Link
                            href={`/account/user/orders/${order.id}`}
                            className="text-[#c49b63] hover:text-white text-xs font-medium border border-[#c49b63]/30 hover:border-white/30 px-3 py-1.5 rounded-full transition-all inline-block"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-500">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
              <p className="text-stone-400 mb-6">Start shopping to see your orders here.</p>
              <Link
                href="/shop"
                className="inline-block bg-[#c49b63] text-black font-bold px-6 py-3 rounded-full hover:bg-white transition-colors"
              >
                Browse Shop
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
