"use client";

import { AccountSidebar } from "@/components/account/Sidebar";
import { Building2, Mail, MapPin, Package, FileText, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const mockCompany = {
  name: "Bean Traders Ltd.",
  contactPerson: "James Coffee",
  email: "orders@beantraders.com",
  phone: "+1 (555) 987-6543",
  address: "456 Enterprise Blvd, Commerce City, BC 90210",
  taxId: "TAX-123456789",
  accountType: "Wholesale Partner",
};

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

export default function CompanyAccountPage() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <AccountSidebar type="company" />

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-lg bg-stone-900 flex items-center justify-center border-4 border-amber-100">
                   <Building2 className="w-12 h-12 text-amber-500" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-serif font-bold text-stone-900">
                    {mockCompany.name}
                  </h1>
                  <p className="text-stone-500 mt-1">
                    {mockCompany.accountType} • ID: {mockCompany.taxId}
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
                  <p className="text-sm text-stone-500">Active Orders</p>
                  <p className="text-2xl font-bold text-stone-900">1</p>
                </div>
              </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg text-purple-700">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Invoices Due</p>
                  <p className="text-2xl font-bold text-stone-900">0</p>
                </div>
              </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-700">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Team Members</p>
                  <p className="text-2xl font-bold text-stone-900">3</p>
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-stone-900">Company Information</h3>
                  <button className="text-sm text-amber-700 font-medium hover:text-amber-800">Edit</button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-stone-600">
                    <Building2 className="w-5 h-5 text-stone-400" />
                    <span>{mockCompany.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600">
                     <Users className="w-5 h-5 text-stone-400" />
                    <span>Contact: {mockCompany.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600">
                    <Mail className="w-5 h-5 text-stone-400" />
                    <span>{mockCompany.email}</span>
                  </div>
                   <div className="flex items-center gap-3 text-stone-600">
                    <MapPin className="w-5 h-5 text-stone-400" />
                    <span>{mockCompany.address}</span>
                  </div>
                </div>
              </div>

               {/* Bulk Order History */}
               <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden lg:col-span-2">
                 <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-stone-900">Bulk Order History</h3>
                   <div className="flex gap-4">
                      <Link href="#" className="text-sm text-stone-500 hover:text-stone-900">Download Invoices</Link>
                      <Link href="#" className="text-sm text-amber-700 font-medium hover:text-amber-800">View All</Link>
                   </div>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-stone-100 text-stone-500 text-sm">
                          <th className="pb-3 font-medium">Order ID</th>
                          <th className="pb-3 font-medium">Date</th>
                          <th className="pb-3 font-medium">Details</th>
                          <th className="pb-3 font-medium">Total</th>
                          <th className="pb-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {mockBulkOrders.map((order) => (
                          <tr key={order.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/50 transition-colors">
                            <td className="py-4 font-medium text-stone-900">{order.id}</td>
                            <td className="py-4 text-stone-600">{order.date}</td>
                            <td className="py-4 text-stone-600">{order.items}</td>
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
