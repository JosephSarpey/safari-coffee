"use client";

import { AccountSidebar } from "@/components/account/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, MapPin, Package, Clock, CreditCard, Loader2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { userApi, UserProfile } from "@/lib/api/user";

// Mock orders can stay for now until order API is ready
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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  useEffect(() => {
    if (token) {
        localStorage.setItem('access_token', token);
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
    }

    const loadProfile = async () => {
      try {
        const data = await userApi.getProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to load profile", error);
        // functional error handling or redirect to login could go here
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  if (loading) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
    );
  }

  if (!user) {
      return (
          <div className="min-h-screen bg-black flex items-center justify-center text-white">
              <div className="text-center">
                  <p className="mb-4">Failed to load profile.</p>
                  <Link href="/login" className="text-primary hover:underline">Return to Login</Link>
              </div>
          </div>
      );
  }

  return (
    <div className="bg-black pt-6 pb-12 flex-1">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar */}
          <AccountSidebar type="user" />

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Header */}
            <div className="bg-[#111] rounded-xl p-8 shadow-lg border border-white/10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                 {/*  Using a placeholder if image is missing, but trying to use one that might exist or a solid color */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zinc-800 overflow-hidden relative border-2 border-[#c49b63] flex-shrink-0">
                    {/* Fallback to simple icon if image fails to load or not needed for rough draft */}
                    <User className="w-full h-full p-5 md:p-6 text-stone-500" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-serif font-bold text-white">
                    Hello, {user.name}
                  </h1>
                  <p className="text-stone-400 mt-1">
                    Member since {new Date(user.createdAt).getFullYear()} • Personal Account
                  </p>
                </div>
              </div>
            </div>

            {/* Stats / Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#111] p-6 rounded-xl shadow-lg border border-white/10 flex items-center gap-4">
                <div className="p-3 bg-[#c49b63]/10 rounded-lg text-[#c49b63]">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-400">Total Orders</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
              </div>
               <div className="bg-[#111] p-6 rounded-xl shadow-lg border border-white/10 flex items-center gap-4">
                <div className="p-3 bg-[#c49b63]/10 rounded-lg text-[#c49b63]">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-400">Saved Cards</p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
              </div>
               <div className="bg-[#111] p-6 rounded-xl shadow-lg border border-white/10 flex items-center gap-4">
                <div className="p-3 bg-[#c49b63]/10 rounded-lg text-[#c49b63]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-400">Next Delivery</p>
                  <p className="text-2xl font-bold text-white">Apr 02</p>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#111] rounded-xl shadow-lg border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">Personal Information</h3>
                  <Link href="/account/user/settings" className="text-sm text-[#c49b63] font-medium hover:text-white transition-colors">Edit</Link>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-stone-300">
                    <User className="w-5 h-5 text-[#c49b63]" />
                    <span>{user.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-300">
                    <Mail className="w-5 h-5 text-[#c49b63]" />
                    <span>{user.email}</span>
                  </div>
                   <div className="flex items-center gap-3 text-stone-300">
                    <MapPin className="w-5 h-5 text-[#c49b63]" />
                    <span>{user.phoneNumber || 'No phone number'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-300">
                    <Globe className="w-5 h-5 text-[#c49b63]" />
                    <span>{user.country || 'No country'}</span>
                  </div>
                   <div className="flex items-center gap-3 text-stone-300">
                    <User className="w-5 h-5 text-[#c49b63]" />
                    <span className="capitalize">{user.gender || 'Not specified'}</span>
                  </div>
                </div>
              </div>

               {/* Recent Orders - Taking both cols on mobile, one on desk */}
               <div className="bg-[#111] rounded-xl shadow-lg border border-white/10 overflow-hidden lg:col-span-2">
                 <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">Recent Orders</h3>
                  <Link href="/account/user/orders" className="text-sm text-[#c49b63] font-medium hover:text-white transition-colors">View All</Link>
                </div>
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
                                order.status === "Processing" ? "bg-amber-900/20 text-amber-400 border-amber-900/30" : "bg-stone-800 text-stone-400 border-stone-700"
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


