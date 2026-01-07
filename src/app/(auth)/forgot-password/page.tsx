"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { authApi } from "@/lib/api/auth";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        const data = await authApi.forgotPassword({ email });

        // Ideally we don't show the token, but for simulation we might need it if we don't have email sending
        if (data && data.token) {
             console.log('Reset token:', data.token);
        }
        
        setSubmitted(true);
    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

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
            Reset Password
          </h1>
          <p className="text-gray-300 text-sm">
            Enter your email to receive instructions
          </p>
        </div>

        {submitted ? (
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                </div>
                <h2 className="text-xl font-semibold text-white">Check your email</h2>
                <p className="text-gray-400 text-sm">
                    We've sent password reset instructions to <strong>{email}</strong>
                </p>
                <div className="pt-4">
                    <Link href="/login">
                        <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </div>
        ) : (
            <>
                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm text-center">
                        {error}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    "Send Instructions"
                    )}
                </Button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-400">
                    <Link href="/login" className="text-primary hover:text-white transition-colors uppercase tracking-wider font-semibold flex items-center justify-center gap-2">
                        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Login
                    </Link>
                </div>
            </>
        )}
      </div>
    </div>
  );
}
