"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });
  const [error, setError] = useState('');
  const [lockoutUntil, setLockoutUntil] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (lockoutUntil) {
        const updateCountdown = () => {
            const now = new Date();
            const diff = lockoutUntil.getTime() - now.getTime();
            
            if (diff <= 0) {
                setLockoutUntil(null);
                setCountdown("");
                setError(""); // Clear error when lockout expires
                return;
            }
            
            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setCountdown(`${minutes}m ${seconds}s`);
        };

        updateCountdown();
        interval = setInterval(updateCountdown, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        const data = await authApi.login(formData);
        const { user } = data;

        // Store user info (keep user info for UI if needed, but no token)
        localStorage.setItem('user', JSON.stringify(user));

        // Update global auth state
        useAuthStore.getState().login(user);

        // Handle success
        if (user.role === 'COMPANY') {
            window.location.href = '/account/company';
        } else {
            window.location.href = '/account/user';
        }
    } catch (err: any) {
        if (err.data && err.data.lockoutUntil) {
            setLockoutUntil(new Date(err.data.lockoutUntil));
            setError(`Account locked. Please wait.`);
        } else {
            setError(err.message);
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/auth_bg.png"
          alt="Coffee Background"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay */}
      </div>

      <div className="relative z-10 w-full max-w-md p-8 md:p-12 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold uppercase tracking-widest mb-2 text-primary">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-sm">
            Sign in to continue your safari
          </p>
        </div>

        {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm text-center">
                {error}
                {countdown && <div className="font-bold mt-1 text-lg">{countdown}</div>}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={!!lockoutUntil}
              className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12 disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs uppercase tracking-widest text-gray-300">
                Password
              </Label>
              <Link href="/forgot-password" className="text-[10px] uppercase tracking-wider text-primary hover:text-white transition-colors">
                Forgot Password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={!!lockoutUntil}
              className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12 disabled:opacity-50"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !!lockoutUntil}
            className="w-full h-12 bg-primary text-black hover:bg-primary/90 uppercase tracking-widest font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : lockoutUntil ? (
                `Locked (${countdown})`
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black/40 px-2 text-gray-400 backdrop-blur-md">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white uppercase tracking-widest font-bold text-sm transition-all"
            onClick={() => window.location.href = 'http://localhost:5000/auth/google'}
          >
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Google
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/join" className="text-primary hover:text-white transition-colors uppercase tracking-wider font-semibold">
            Join Us
          </Link>
        </div>
      </div>
    </div>
  );
}
