"use client";


import { Building2, Mail, MapPin, Package, FileText, Settings, Users, Loader2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { userApi, UserProfile } from "@/lib/api/user";
import { useAuthStore } from "@/store/auth-store";

// Mock bulk orders can stay until backend is integrated
const mockBulkOrders = [
  {
    id: "BLK-2024-050",
    date: "2024-03-10",
    status: "Processing",
    total: "$1,250.00",
    items: "50kg Ethiopian Yirgacheffe",
  },
  {
    id: "BLK-2024-042",
    date: "2024-02-15",
    status: "Delivered",
    total: "$850.00",
    items: "30kg Safari Blend",
  },
  {
    id: "BLK-2024-035",
    date: "2024-01-20",
    status: "Delivered",
    total: "$2,100.00",
    items: "80kg Espresso Roast",
  },
];

function CompanyAccountPageContent() {
  const [company, setCompany] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Auth is handled via httpOnly cookies - no need for token in URL
        const data = await userApi.getProfile();
        setCompany(data);
        useAuthStore.getState().login(data); // Sync global store
      } catch (error: any) {
        console.error("Failed to load profile", error);
        setError(error.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center max-w-md px-6">
          <p className="mb-4 text-red-400">{error}</p>
          <Link href="/login" className="text-primary hover:underline">Return to Login</Link>
          <button
            onClick={() => window.location.reload()}
            className="block mt-4 mx-auto text-sm text-gray-400 hover:text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!company) {
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
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div className="bg-stone-900/60 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-black/40 flex items-center justify-center border-2 border-[#c49b63] flex-shrink-0 text-[#c49b63]">
              <Building2 className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-serif font-bold text-white">
                {company.companyName || company.name}
              </h1>
              <p className="text-stone-400 mt-1">
                Wholesale Partner
              </p>
            </div>
          </div>
        </div>

        {/* Stats / Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-stone-900/60 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/5 flex items-center gap-4">
            <div className="p-3 bg-[#c49b63]/10 rounded-lg text-[#c49b63]">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-stone-400">Active Orders</p>
              <p className="text-2xl font-bold text-white">1</p>
            </div>
          </div>
          <div className="bg-stone-900/60 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/5 flex items-center gap-4">
            <div className="p-3 bg-[#c49b63]/10 rounded-lg text-[#c49b63]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-stone-400">Invoices Due</p>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
          </div>
          <div className="bg-stone-900/60 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/5 flex items-center gap-4">
            <div className="p-3 bg-[#c49b63]/10 rounded-lg text-[#c49b63]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-stone-400">Team Members</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-stone-900/60 backdrop-blur-sm rounded-xl shadow-xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Company Information</h3>
              <Link href="/account/company/settings" className="text-sm text-[#c49b63] font-medium hover:text-white transition-colors">Edit</Link>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-stone-300">
                <Building2 className="w-5 h-5 text-[#c49b63]" />
                <span>{company.companyName}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <Users className="w-5 h-5 text-[#c49b63]" />
                <span>Contact: {company.name}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <Mail className="w-5 h-5 text-[#c49b63]" />
                <span>{company.email}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <MapPin className="w-5 h-5 text-[#c49b63]" />
                <span>{company.phoneNumber || 'No phone number'}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <Globe className="w-5 h-5 text-[#c49b63]" />
                <span>{company.country || 'No country'}</span>
              </div>
            </div>
          </div>

          {/* Bulk Order History */}
          <div className="bg-stone-900/60 backdrop-blur-sm rounded-xl shadow-xl border border-white/5 overflow-hidden lg:col-span-2">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Bulk Order History</h3>
              <div className="flex gap-4">
                <Link href="/account/company/orders" className="text-sm text-stone-400 hover:text-white transition-colors">Download Invoices</Link>
                <Link href="/account/company/orders" className="text-sm text-[#c49b63] font-medium hover:text-white transition-colors">View All</Link>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-stone-300">
                  <thead>
                    <tr className="border-b border-white/5 text-stone-500 text-sm">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Details</th>
                      <th className="pb-3 font-medium">Total</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {mockBulkOrders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="py-4 font-medium text-white">{order.id}</td>
                        <td className="py-4 text-stone-400">{order.date}</td>
                        <td className="py-4 text-stone-400">{order.items}</td>
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

  );
}

export default function CompanyAccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>}>
      <CompanyAccountPageContent />
    </Suspense>
  );
}
