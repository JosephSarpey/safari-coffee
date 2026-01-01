"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Building2, Settings, ShoppingBag, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "User Account",
    href: "/account/user",
    icon: User,
    type: "user",
  },
  {
    title: "Company Account",
    href: "/account/company",
    icon: Building2,
    type: "company",
  },
  {
    title: "Orders",
    href: "#",
    icon: ShoppingBag,
    type: "common",
  },
  {
    title: "Settings",
    href: "#",
    icon: Settings,
    type: "common",
  },
];

export function AccountSidebar({ type = "user" }: { type?: "user" | "company" }) {
  const pathname = usePathname();

  return (
    <div className="w-full md:w-64 bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden h-fit">
      <div className="p-6 bg-stone-900 text-white">
        <h2 className="text-xl font-serif font-bold">My Account</h2>
        <p className="text-stone-400 text-sm mt-1">Manage your dashboard</p>
      </div>
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
           // Show item if it's common OR matches the current type
           if (item.type !== "common" && item.type !== type) return null;
           
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
                isActive
                  ? "bg-amber-50 text-amber-700 font-medium"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
        
        <div className="pt-4 mt-4 border-t border-stone-100">
           <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
