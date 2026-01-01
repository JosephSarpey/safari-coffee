"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 flex flex-col items-center justify-center">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-700 fade-in">
          <h1 className="mt-10 text-2xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[200%_auto] animate-shine">
            Join the Brew Expedition
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light tracking-wide">
            Choose your path to exclusive benefits, premium coffee, and a community of explorers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"> 
          {/* Customer Card */}
          <Link
            href="/signup"
            className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors duration-500"
          >
            <div className="absolute inset-0">
               <Image
                src="/images/customer_join.png"
                alt="Customer Membership"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div className="bg-primary/20 backdrop-blur-md w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <User className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-black transition-colors" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">
                For Customers
              </h2>
              <p className="text-gray-300 mb-6 line-clamp-2 group-hover:text-white transition-colors">
                Enjoy exclusive discounts, early access to new blends, and track your coffee journey.
              </p>
              <div className="flex items-center text-primary uppercase text-sm font-bold tracking-widest gap-2 group-hover:gap-4 transition-all">
                Join Now <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Company Card */}
          <Link
            href="/join/company"
            className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors duration-500"
          >
            <div className="absolute inset-0">
              <Image
                src="/images/company_join.png"
                alt="Company Membership"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div className="bg-primary/20 backdrop-blur-md w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Building2 className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-black transition-colors" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">
                For Companies
              </h2>
              <p className="text-gray-300 mb-6 line-clamp-2 group-hover:text-white transition-colors">
                Partner with us for bulk supply, corporate gifting, and special coffee events.
              </p>
              <div className="flex items-center text-primary uppercase text-sm font-bold tracking-widest gap-2 group-hover:gap-4 transition-all">
                Partner With Us <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
