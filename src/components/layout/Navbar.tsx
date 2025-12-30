"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

const NavLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Service", href: "/service" },
  { name: "Menu", href: "/menu" },
  { name: "Reservation", href: "/reservation" },
  { name: "Testimonial", href: "/testimonial" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

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
        <Link href="/" className="flex flex-col items-center">
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
            <Link
              key={link.name}
              href={link.href}
              className="text-white hover:text-primary uppercase text-sm tracking-widest transition-color"
            >
              {link.name}
            </Link>
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
        <div className="lg:hidden flex items-center space-x-4">
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
        <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 border-t border-primary/20 p-8 flex flex-col items-center space-y-6 animate-in fade-in slide-in-from-top-4">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-primary uppercase text-lg tracking-widest font-semibold"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
