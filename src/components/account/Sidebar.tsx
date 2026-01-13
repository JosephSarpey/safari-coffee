"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Building2, Settings, ShoppingBag, LogOut, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Coffee, Phone, LucideIcon, StoreIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SidebarItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  type: "user" | "company" | "common";
  children?: { title: string; href: string }[];
};

const sidebarItems: SidebarItem[] = [
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
    title: "Shop",
    href: "/shop",
    icon: StoreIcon,
    type: "user",
    children: [
      { title: "Shop List", href: "/shop" },
      { title: "Cart", href: "/cart" },
      { title: "Checkout", href: "/checkout" },
      { title: "Bulk Purchase", href: "/bulk-purchase" },
      { title: "Applications", href: "/applications" },
    ],
  },
  {
    title: "Bulk Purchase",
    href: "/bulk-purchase",
    icon: StoreIcon,
    type: "company",
  },
  {
    title: "Orders",
    href: "/account/user/orders",
    icon: ShoppingBag,
    type: "user",
  },
  {
    title: "Orders",
    href: "/account/company/orders",
    icon: ShoppingBag,
    type: "company",
  },
  {
    title: "Settings",
    href: "/account/user/settings",
    icon: Settings,
    type: "user",
  },
  {
    title: "Settings",
    href: "/account/company/settings",
    icon: Settings,
    type: "company",
  },
  {
    title: "Addresses",
    href: "/account/user/addresses",
    icon: MapPin,
    type: "user",
  },
  {
    title: "Addresses",
    href: "/account/company/addresses",
    icon: MapPin,
    type: "company",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Phone,
    type: "user",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Phone,
    type: "company",
  },
];

export function AccountSidebar({ type = "user" }: { type?: "user" | "company" }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop minimizing
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile accordion
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  
  const toggleSubmenu = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const activeExpandedItem = sidebarItems.find(item => expandedItems.includes(item.title) && item.children);

  return (
    <div 
      className={cn(
        "bg-[#111] rounded-xl shadow-lg border border-white/10 overflow-hidden md:min-h-[calc(100vh-8rem)] flex flex-col transition-all duration-300 ease-in-out relative",
        isCollapsed ? "md:w-20" : "md:w-64",
        "w-full"
      )}
    >
      {/* Desktop Toggle Button */}
      <button 
        onClick={toggleCollapse}
        className="hidden md:flex absolute top-4 right-4 text-stone-500 hover:text-[#c49b63] z-10 transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      {/* Header - Desktop Only */}
      <div 
        className={cn(
            "bg-[#0a0a0a] text-white cursor-pointer md:cursor-default border-b border-white/5 hidden md:block",
            isCollapsed ? "md:items-center md:justify-center md:p-4" : "p-4 md:p-6"
        )}
      >
        <div className="flex items-center justify-between">
            <h2 className={cn("font-serif font-bold transition-all text-[#c49b63]", isCollapsed ? "md:hidden" : "text-lg md:text-xl")}>
                {isCollapsed ? "Acc" : "My Account"}
            </h2>
        </div>
        <p className={cn("text-stone-500 text-xs md:text-sm mt-1 whitespace-nowrap overflow-hidden transition-all", isCollapsed && "md:hidden")}>
           {isCollapsed ? "" : "Manage your dashboard"}
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-[#111] transition-all duration-300">
        
        {/* --- MOBILE LAYOUT --- */}
        <div className="md:hidden flex flex-col">
            {/* Level 1: Main Items */}
            <div className="flex overflow-x-auto no-scrollbar p-2 gap-2 border-b border-white/5">
                {sidebarItems.map((item) => {
                    if (item.type !== "common" && item.type !== type) return null;
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.children && item.children.some(child => pathname === child.href));
                    const isExpanded = expandedItems.includes(item.title);
                    
                    if (item.children) {
                        return (
                             <button
                                key={item.title}
                                onClick={() => toggleSubmenu(item.title)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-200 whitespace-nowrap text-sm flex-shrink-0",
                                    isActive || isExpanded
                                    ? "bg-[#c49b63] text-black font-bold border-[#c49b63]"
                                    : "bg-white/5 text-stone-400 border-white/10 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{item.title}</span>
                                <ChevronDown className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-180")} />
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-200 whitespace-nowrap text-sm flex-shrink-0",
                                isActive
                                ? "bg-[#c49b63] text-black font-bold border-[#c49b63]"
                                : "bg-white/5 text-stone-400 border-white/10 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Level 2: Submenu (if expanded) */}
            {activeExpandedItem && activeExpandedItem.children && (
                <div className="flex overflow-x-auto no-scrollbar p-2 gap-2 bg-white/5 animate-in slide-in-from-top-2 fade-in">
                    {activeExpandedItem.children.map(child => (
                        <Link
                            key={child.title}
                            href={child.href}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors duration-200 whitespace-nowrap text-xs flex-shrink-0",
                                pathname === child.href
                                ? "bg-[#c49b63]/20 text-[#c49b63] border-[#c49b63]/30 font-medium"
                                : "bg-black/20 text-stone-400 border-white/5 hover:text-white"
                            )}
                        >
                            {child.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>

        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden md:flex flex-col p-4 space-y-2">
            {sidebarItems.map((item) => {
                if (item.type !== "common" && item.type !== type) return null;
                
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.children && item.children.some(child => pathname === child.href));
                const isExpanded = expandedItems.includes(item.title);
                const hasChildren = !!item.children;

                return (
                    <div key={item.title}>
                    {hasChildren ? (
                        <div>
                            <button
                                onClick={() => {
                                    if (isCollapsed) setIsCollapsed(false);
                                    toggleSubmenu(item.title);
                                }}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap min-w-max",
                                    isActive || isExpanded
                                    ? "bg-[#c49b63]/10 text-[#c49b63] font-medium border border-[#c49b63]/20"
                                    : "text-stone-400 hover:bg-white/5 hover:text-white",
                                    isCollapsed && "md:justify-center md:px-2"
                                )}
                                title={isCollapsed ? item.title : ""}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    <span className={cn("transition-opacity duration-200", isCollapsed ? "md:hidden" : "md:block")}>
                                        {item.title}
                                    </span>
                                </div>
                                {!isCollapsed && (
                                    <div className={cn("transition-transform duration-200", isExpanded ? "rotate-180" : "")}>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                )}
                            </button>
                            {/* Desktop Submenu */}
                            <div className={cn(
                                "overflow-hidden transition-all duration-300 ease-in-out",
                                isExpanded && !isCollapsed ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            )}>
                                <div className="ml-9 mt-1 space-y-1 border-l border-white/10 pl-2">
                                    {item.children?.map(child => (
                                        <Link
                                            key={child.title}
                                            href={child.href}
                                            className={cn(
                                                "block px-4 py-2 text-sm rounded-md transition-colors",
                                                pathname === child.href ? "text-[#c49b63] bg-[#c49b63]/5" : "text-stone-500 hover:text-stone-300 hover:bg-white/5"
                                            )}
                                        >
                                            {child.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap min-w-max",
                                isActive
                                ? "bg-[#c49b63]/10 text-[#c49b63] font-medium border border-[#c49b63]/20"
                                : "text-stone-400 hover:bg-white/5 hover:text-white",
                                isCollapsed && "md:justify-center md:px-2"
                            )}
                            title={isCollapsed ? item.title : ""}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span className={cn("transition-opacity duration-200", isCollapsed ? "md:hidden" : "md:block")}>
                                {item.title}
                            </span>
                        </Link>
                    )}
                    </div>
                );
            })}
            
            
        </div>
      </nav>
    </div>
  );
}
