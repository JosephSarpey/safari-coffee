"use client";

import { usePathname } from 'next/navigation';

export default function Newsletter() {
  const pathname = usePathname();

  return (
    <div className="container pb-12 mb-12 border-b border-primary/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-black uppercase tracking-widest text-white">Subscribe to our newsletter</h3>
          <p className="font-medium text-gray-400">Get the latest news and updates</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto max-w-xl">
          <input
            type="email"
            placeholder="Enter Email Address"
            className="w-full sm:w-80 bg-zinc-900/50 border border-zinc-700 px-6 py-4 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
          />
          <button className="w-full sm:w-auto bg-primary text-black px-8 py-4 uppercase font-bold text-sm tracking-widest hover:bg-primary/90 transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
