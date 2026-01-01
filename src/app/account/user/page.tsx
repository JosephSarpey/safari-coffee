"use client";

import { AccountSidebar } from "@/components/account/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, MapPin, Package, Clock, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const mockUser = {
  name: "Sarah Johnson",
  email: "sarah.j@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Coffee Lane, Brew City, BC 90210",
  avatar: "/images/testimonial-1.jpg", 
  memberSince: "Jan 2024",
};

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
];

export default function UserAccountPage() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <AccountSidebar type="user" />

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200">
              <div className="flex flex-col md:flex-row items-center gap-6">
                 {/*  Using a placeholder if image is missing, but trying to use one that might exist or a solid color */}
                <div className="w-24 h-24 rounded-full bg-stone-200 overflow-hidden relative border-4 border-amber-100">
                   {/* Fallback to simple icon if image fails to load or not needed for rough draft */}
                   <User className="w-full h-full p-6 text-stone-400" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-serif font-bold text-stone-900">
                    Hello, {mockUser.name}
                  </h1>
                  <p className="text-stone-500 mt-1">
                    Member since {mockUser.memberSince} • Personal Account
                  </p>
                </div>
              </div>
            </div>

            {/* Stats / Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-lg text-amber-700">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Total Orders</p>
                  <p className="text-2xl font-bold text-stone-900">12</p>
                </div>
              </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg text-green-700">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Saved Cards</p>
                  <p className="text-2xl font-bold text-stone-900">2</p>
                </div>
              </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-700">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Next Delivery</p>
                  <p className="text-2xl font-bold text-stone-900">Apr 02</p>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-stone-900">Personal Information</h3>
                  <button className="text-sm text-amber-700 font-medium hover:text-amber-800">Edit</button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-stone-600">
                    <User className="w-5 h-5 text-stone-400" />
                    <span>{mockUser.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600">
                    <Mail className="w-5 h-5 text-stone-400" />
                    <span>{mockUser.email}</span>
                  </div>
                   <div className="flex items-center gap-3 text-stone-600">
                    <MapPin className="w-5 h-5 text-stone-400" />
                    <span>{mockUser.address}</span>
                  </div>
                </div>
              </div>

               {/* Recent Orders - Taking both cols on mobile, one on desk */}
               <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden lg:col-span-2">
                 <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-stone-900">Recent Orders</h3>
                  <Link href="#" className="text-sm text-amber-700 font-medium hover:text-amber-800">View All</Link>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-stone-100 text-stone-500 text-sm">
                          <th className="pb-3 font-medium">Order ID</th>
                          <th className="pb-3 font-medium">Date</th>
                          <th className="pb-3 font-medium">Items</th>
                          <th className="pb-3 font-medium">Total</th>
                          <th className="pb-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {mockOrders.map((order) => (
                          <tr key={order.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/50 transition-colors">
                            <td className="py-4 font-medium text-stone-900">{order.id}</td>
                            <td className="py-4 text-stone-600">{order.date}</td>
                            <td className="py-4 text-stone-600 max-w-xs truncate">{order.items.join(", ")}</td>
                            <td className="py-4 font-medium text-stone-900">{order.total}</td>
                            <td className="py-4">
                              <span className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                order.status === "Delivered" ? "bg-green-100 text-green-700" : 
                                order.status === "Processing" ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-700"
                              )}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


