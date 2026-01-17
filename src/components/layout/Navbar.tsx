"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User, LogOut, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { authApi } from "@/lib/api/auth";
import { userApi } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NavLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Shop",
    href: "/shop",
    isDropdown: true,
    children: [
      { name: "Shop List", href: "/shop" },
      { name: "Cart", href: "/cart" },
      { name: "Checkout", href: "/checkout" },
      { name: "Bulk Purchase", href: "/bulk-purchase" },
      { name: "Applications", href: "/applications" },
    ]
  },
  {
    name: "Explore",
    href: "/explore",
    isDropdown: true,
    children: [
      { name: "Service", href: "/service" },
      { name: "Blog", href: "/blog" },
      { name: "Testimonial", href: "/testimonial" },
    ]
  },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const activeUser = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const totalItems = useCartStore((state) => state.totalItems());
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      logout();
      router.push('/login');
    } catch (error) {
      console.error("Logout failed", error);
      logout();
      router.push('/login');
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Sync auth state
    const checkAuth = async () => {
      try {
        const user = await userApi.getProfile();
        useAuthStore.getState().login(user);
      } catch (error) {
        console.error("Failed to check auth state", error);
      }
    };
    checkAuth();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/account")) return null;

  return (
    <nav
      className={cn(
        "font-semibold fixed w-full z-50 transition-all duration-300 md:px-12 py-4",
        scrolled || pathname.includes("/join") || pathname.includes("/login") || pathname.includes("/signup") ? "bg-black/90 py-2 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container relative flex items-center justify-between h-20 md:h-24">
        {/* Brand */}
        <Link href="/" className="flex flex-col items-center z-50">
          <Image src="/images/logo_new.png" alt="Logo" width={100} height={100} />
        </Link>

        {/* Desktop Nav Links (Centered) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
          {NavLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.isDropdown ? (
                <button
                  className={cn(
                    "flex items-center gap-1 text-white hover:text-primary uppercase text-sm tracking-widest transition-colors py-4",
                    (pathname.startsWith(link.href) || link.children?.some(child => pathname.startsWith(child.href))) && "text-primary"
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-black border border-primary/20 p-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-xl">
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
        </div>

        {/* Desktop Right Actions (Auth & Cart) */}
        <div className="hidden lg:flex items-center space-x-8">
          {/* Join Us Link / Auth State */}
          {!pathname.includes("/join") && !pathname.includes("/signup") && !pathname.includes("/login") && (
            isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  href={activeUser?.role === 'COMPANY' ? '/account/company' : '/account/user'}
                  className="flex items-center gap-2 text-white hover:text-primary transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="uppercase text-xs tracking-widest hidden xl:block">
                    {activeUser?.name?.split(' ')[0] || 'Account'}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-500 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center border border-white/20 rounded-full overflow-hidden transition-colors hover:border-primary/50 group">
                <Link
                  href="/login"
                  className="text-white hover:text-primary hover:bg-white/5 uppercase text-xs tracking-widest transition-colors px-4 py-2 border-r border-white/20"
                >
                  LogIn
                </Link>
                <Link
                  href="/join"
                  className={cn(
                    "text-white hover:text-primary hover:bg-white/5 uppercase text-xs tracking-widest transition-colors px-4 py-2",
                    pathname === "/join" && "text-primary"
                  )}
                >
                  Join Us
                </Link>
              </div>
            )
          )}

          <Link href="/cart" className="relative group p-2">
            <ShoppingBag className="text-white group-hover:text-primary transition-colors h-6 w-6" />
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
            <ShoppingBag className="text-white h-6 w-6" />
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
        <div className="lg:hidden fixed inset-0 bg-black/95 z-40 flex flex-col justify-center items-start pl-12 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          {NavLinks.map((link) => (
            <div key={link.name} className="flex flex-col items-start">
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
                    <div className="flex flex-col items-start mt-4 space-y-4 pl-4 animate-in slide-in-from-top-4 border-l border-white/10">
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


          {/* Mobile Auth Links */}
          {!pathname.includes("/join") && !pathname.includes("/login") && !pathname.includes("/signup") && (
            isAuthenticated ? (
              <div className="flex flex-col items-start gap-4 mt-8 pl-0 border-t border-white/10 pt-8 w-full">
                <Link
                  href={activeUser?.role === 'COMPANY' ? '/account/company' : '/account/user'}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-white hover:text-primary transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="uppercase text-lg tracking-widest font-bold">
                    My Account
                  </span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors uppercase text-sm tracking-widest"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center gap-0 mt-4 w-full pr-12">
                <div className="flex items-center w-full max-w-[200px] border border-white/20 rounded-full overflow-hidden">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center text-white hover:text-primary hover:bg-white/5 uppercase text-sm tracking-widest font-bold py-3 border-r border-white/20 transition-all"
                  >
                    LogIn
                  </Link>
                  <Link
                    href="/join"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center text-primary hover:bg-white/5 hover:text-white uppercase text-sm tracking-widest font-bold py-3 transition-all"
                  >
                    Join Us
                  </Link>
                </div>
              </div>
            )
          )}

        </div>
      )}
    </nav>
  );
}
