"use client";

import { AccountSidebar } from "@/components/account/Sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";

const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-03-15",
    status: "Delivered",
    total: "$45.00",
    items: ["Ethiopian Yirgacheffe (250g)", "Safari Blend (250g)"],
  },
  {
    id: "ORD-2024-002",
    date: "2024-02-28",
    status: "Processing",
    total: "$22.50",
    items: ["Kenya AA (250g)"],
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-10",
    status: "Delivered",
    total: "$68.00",
    items: ["Espresso Roast (1kg)", "Ceramic Mug"],
  },
    {
    id: "ORD-2023-012",
    date: "2023-12-15",
    status: "Delivered",
    total: "$55.00",
    items: ["Holiday Blend (500g)", "Gift Box"],
  },
  {
    id: "ORD-2023-010",
    date: "2023-11-20",
    status: "Cancelled",
    total: "$15.00",
    items: ["Filter Papers (x100)"],
  },
];

export default function UserOrdersPage() {
  return (
    <div className="bg-black pt-6 pb-12 flex-1">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar */}
          <AccountSidebar type="user" />

          {/* Main Content */}
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
                {mockOrders.length > 0 ? (
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
                                <th className="pb-3 font-medium text-right">Action</th>
                            </tr>
                            </thead>
                            <tbody className="text-sm">
                            {mockOrders.map((order) => (
                                <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <td className="py-4 font-medium text-white">{order.id}</td>
                                <td className="py-4 text-stone-400">{order.date}</td>
                                <td className="py-4 text-stone-400 max-w-xs truncate">{order.items.join(", ")}</td>
                                <td className="py-4 font-medium text-[#c49b63]">{order.total}</td>
                                <td className="py-4">
                                    <span className={cn(
                                    "px-2 py-1 rounded-full text-xs font-medium border",
                                    order.status === "Delivered" ? "bg-green-900/20 text-green-400 border-green-900/30" : 
                                    order.status === "Processing" ? "bg-amber-900/20 text-amber-400 border-amber-900/30" : 
                                    order.status === "Cancelled" ? "bg-red-900/20 text-red-400 border-red-900/30" :
                                    "bg-stone-800 text-stone-400 border-stone-700"
                                    )}>
                                    {order.status}
                                    </span>
                                </td>
                                <td className="py-4 text-right">
                                    <Link href={`#`} className="text-[#c49b63] hover:text-white text-xs font-medium border border-[#c49b63]/30 hover:border-white/30 px-3 py-1.5 rounded-full transition-all">
                                        View Details
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
                        <Link href="/shop" className="inline-block bg-[#c49b63] text-black font-bold px-6 py-3 rounded-full hover:bg-white transition-colors">
                            Browse Shop
                        </Link>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
