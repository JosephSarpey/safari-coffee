"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { 
    name: "Shop", 
    href: "/shop",
    isDropdown: true,
    children: [
      { name: "Menu", href: "/menu" },
      { name: "Shop List", href: "/shop" },
      { name: "Cart", href: "/cart" },
      { name: "Checkout", href: "/checkout" },
      { name: "Reservation", href: "/reservation" },
    ]
  },
  { name: "Service", href: "/service" },
  { name: "Blog", href: "/blog" },
  { name: "Testimonial", href: "/testimonial" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const totalItems = useCartStore((state) => state.totalItems());
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 md:px-12 py-4",
        scrolled ? "bg-black/90 py-2 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-20 md:h-24">
        {/* Brand */}
        <Link href="/" className="flex flex-col items-center z-50">
          <span className="text-white text-2xl font-bold uppercase tracking-tight leading-none">
            Safari
          </span>
          <span className="text-white/70 text-[10px] uppercase tracking-[0.4em] mt-1 leading-none">
            Coffee
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {NavLinks.map((link) => (
            <div key={link.name} className="relative group">
                {link.isDropdown ? (
                    <button 
                        className={cn(
                            "flex items-center gap-1 text-white hover:text-primary uppercase text-sm tracking-widest transition-colors py-4",
                            pathname.startsWith(link.href) && "text-primary"
                        )}
                    >
                        {link.name}
                        <ChevronDown className="h-3 w-3" />
                    </button>
                ) : (
                    <Link
                        href={link.href}
                        className={cn(
                            "text-white hover:text-primary uppercase text-sm tracking-widest transition-colors",
                            pathname === link.href && "text-primary"
                        )}
                    >
                        {link.name}
                    </Link>
                )}

                {/* Dropdown Menu */}
                {link.isDropdown && (
                    <div className="absolute top-full left-0 w-48 bg-black border border-primary/20 p-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-xl">
                         {link.children?.map((child) => (
                             <Link 
                                key={child.name}
                                href={child.href}
                                className="block text-gray-400 hover:text-white hover:pl-2 uppercase text-xs tracking-widest py-2 transition-all border-b border-gray-800 last:border-0"
                             >
                                 {child.name}
                             </Link>
                         ))}
                    </div>
                )}
            </div>
          ))}
          <Link href="/cart" className="relative group p-2">
            <ShoppingCart className="text-white group-hover:text-primary transition-colors h-6 w-6" />
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Toggle & Cart */}
        <div className="lg:hidden flex items-center space-x-4 z-50">
          <Link href="/cart" className="relative">
            <ShoppingCart className="text-white h-6 w-6" />
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X className="h-8 w-8 text-primary" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/95 z-40 flex flex-col justify-center items-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          {NavLinks.map((link) => (
            <div key={link.name} className="flex flex-col items-center">
                {link.isDropdown ? (
                    <>
                        <button 
                            onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                            className="text-white hover:text-primary uppercase text-2xl tracking-widest font-semibold flex items-center gap-2"
                        >
                            {link.name}
                            <ChevronDown className={cn("h-5 w-5 transition-transform", activeDropdown === link.name ? "rotate-180" : "")} />
                        </button>
                        {activeDropdown === link.name && (
                            <div className="flex flex-col items-center mt-4 space-y-4 animate-in slide-in-from-top-4">
                                {link.children?.map(child => (
                                    <Link
                                        key={child.name}
                                        href={child.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-400 hover:text-white uppercase text-sm tracking-widest"
                                    >
                                        {child.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-primary uppercase text-2xl tracking-widest font-semibold"
                    >
                        {link.name}
                    </Link>
                )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
