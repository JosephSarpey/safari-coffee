"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";

export default function CompanyJoinPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle success
      console.log("Company signup submitted");
    }, 2000);
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
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-2xl p-8 md:p-12 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold uppercase tracking-widest mb-2 text-primary">
            Corporate Partnership
          </h1>
          <p className="text-gray-400 text-sm">
            Join our network of premium coffee partners
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="companyName" className="text-xs uppercase tracking-widest text-gray-300">
              Company Name
            </Label>
            <Input
              id="companyName"
              placeholder="Safari Enterprises Ltd."
              required
              className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactName" className="text-xs uppercase tracking-widest text-gray-300">
              Contact Person
            </Label>
            <Input
              id="contactName"
              placeholder="Jane Smith"
              required
              className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-300">
              Business Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="partnerships@company.com"
              required
              className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxId" className="text-xs uppercase tracking-widest text-gray-300">
              Tax ID / VAT Number
            </Label>
            <Input
              id="taxId"
              placeholder="Optional"
              className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12"
            />
          </div>

           <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-gray-300">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              required
              className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
             <Label htmlFor="password" className="text-xs uppercase tracking-widest text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              required
              className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12"
            />
          </div>

          <div className="md:col-span-2 pt-4">
            <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary text-black hover:bg-primary/90 uppercase tracking-widest font-bold text-sm transition-all"
            >
                {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                "Submit Application"
                )}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already a partner?{" "}
          <Link href="/login" className="text-primary hover:text-white transition-colors uppercase tracking-wider font-semibold">
            Partner Login
          </Link>
        </div>

        <div className="mt-4 text-center">
            <Link href="/join" className="text-xs text-gray-600 hover:text-gray-400 transition-colors flex items-center justify-center gap-1 group">
                <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to selection
            </Link>
        </div>
      </div>
    </div>
  );
}
