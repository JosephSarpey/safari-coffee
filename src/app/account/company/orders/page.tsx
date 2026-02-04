"use client";


import Link from "next/link";
import { cn } from "@/lib/utils";
import { Package, Download } from "lucide-react";

import { useEffect, useState } from "react";
import { orderApi, Order } from "@/lib/api/order";
import { Loader2 } from "lucide-react";

export default function CompanyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const response = await orderApi.getUserOrders(page, limit);
        setOrders(response.data);
        setTotalPages(response.meta.totalPages);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [page]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#c49b63] animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Company Orders</h1>
          <p className="text-stone-400 mt-1">Manage bulk purchases and invoices</p>
        </div>
        <button className="flex items-center gap-2 bg-[#c49b63]/10 text-[#c49b63] border border-[#c49b63]/20 px-4 py-2 rounded-lg hover:bg-[#c49b63]/20 transition-colors text-sm font-medium">
          <Download className="w-4 h-4" />
          Download All Invoices
        </button>
      </div>

      {/* Orders List */}
      <div className="bg-stone-900/60 backdrop-blur-sm rounded-xl shadow-xl border border-white/5 overflow-hidden">
        {orders.length > 0 ? (
          <div className="flex flex-col h-full">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-stone-300">
                  <thead>
                    <tr className="border-b border-white/5 text-stone-500 text-sm">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Items</th>
                      <th className="pb-3 font-medium">Total</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Invoice</th>
                      <th className="pb-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="py-4 font-medium text-white">{order.id.slice(0, 8)}...</td>
                        <td className="py-4 text-stone-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="py-4 text-stone-400 max-w-xs truncate">
                          {order.items.map(item => item.product.name).join(", ")}
                        </td>
                        <td className="py-4 font-medium text-[#c49b63]">${order.total.toFixed(2)}</td>
                        <td className="py-4">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium border",
                            order.status === "Delivered" ? "bg-green-900/20 text-green-400 border-green-900/30" :
                              order.status === "Processing" ? "bg-amber-900/20 text-amber-400 border-amber-900/30" : "bg-stone-800 text-stone-400 border-stone-700"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-stone-400 hover:text-white transition-colors text-xs flex items-center justify-end gap-1 w-full">
                            <Download className="w-3 h-3" />
                            PDF
                          </button>
                        </td>
                        <td className="py-4 text-right">
                          <Link href={`/account/company/orders/${order.id}`} className="text-[#c49b63] hover:text-white text-xs font-medium border border-[#c49b63]/30 hover:border-white/30 px-3 py-1.5 rounded-full transition-all">
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-sm text-stone-400">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-white/5 text-stone-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-white/5 text-stone-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-500">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No bulk orders yet</h3>
            <p className="text-stone-400 mb-6">Contact us to start your first bulk order.</p>
            <Link href="/contact" className="inline-block bg-[#c49b63] text-black font-bold px-6 py-3 rounded-full hover:bg-white transition-colors">
              Contact Sales
            </Link>
          </div>
        )}
      </div>
    </>

  );
}
