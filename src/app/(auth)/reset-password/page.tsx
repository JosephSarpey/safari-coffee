"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to reset password');
            }

            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-center text-red-500">
                Invalid or missing reset token.
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                </div>
                <h2 className="text-xl font-semibold text-white">Password Reset!</h2>
                <p className="text-gray-400 text-sm">
                    Your password has been successfully updated.
                </p>
                <div className="pt-4">
                    <Link href="/login">
                        <Button className="w-full bg-primary text-black hover:bg-primary/90">
                            Sign In Now
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm text-center">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-xs uppercase tracking-widest text-gray-300">
                        New Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-xs uppercase tracking-widest text-gray-300">
                        Confirm Password
                    </Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-primary text-black hover:bg-primary/90 uppercase tracking-widest font-bold text-sm transition-all"
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Reset Password"
                    )}
                </Button>
            </form>
        </>
    );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-12">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/auth_bg.png"
          alt="Coffee Background"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-md p-8 md:p-12 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold uppercase tracking-widest mb-2 text-primary">
            New Password
          </h1>
          <p className="text-gray-300 text-sm">
            Secure your account with a new password
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
