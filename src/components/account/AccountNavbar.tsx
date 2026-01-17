"use client";

import Link from "next/link";
import { Bell, Search, ShoppingBag, LogOut, User, Globe, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userApi, UserProfile } from "@/lib/api/user";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth-store";
import Image from "next/image";

export function AccountNavbar() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await userApi.getProfile();
        setUser(data);
        useAuthStore.getState().login(data); // Sync global store
      } catch (error) {
        console.error("Failed to load profile in navbar", error);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      useAuthStore.getState().logout();
      router.push('/');
    } catch (error) {
      console.error("Logout failed", error);
      useAuthStore.getState().logout();
      router.push('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-4 md:px-6">
      {/* Left: Brand */}
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2 group">
          {/* logo */}
          <Link href="/">
            <Image src="/images/logo_new.png" alt="Logo" width={100} height={100} priority />
          </Link>
        </div>
        <Link href="/" className="hidden md:flex text-sm text-stone-400 hover:text-white transition-colors items-center gap-2">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">Visit Website</span>
          <span className="sm:hidden">Website</span>
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-stone-400 hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block"></div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-white">
              {user ? (user.companyName || user.name) : 'Loading...'}
            </p>
            <p className="text-xs text-stone-500">
              {user ? (user.role === 'COMPANY' ? 'Partner' : 'Member') : 'Guest'}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-stone-800 border border-white/10 flex items-center justify-center overflow-hidden">
            <User className="w-5 h-5 text-stone-400" />
          </div>
        </div>

        <div className="h-8 w-[1px] bg-white/10 mx-2 hidden sm:block"></div>

        <button
          title="Sign Out"
          onClick={handleLogout}
          className="p-2 text-stone-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
